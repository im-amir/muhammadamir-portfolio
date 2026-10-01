"use server";

import { Resend } from "resend";
import { profile } from "@/data/content";
import {
  readContactForm,
  validateContact,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact-schema";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; errors?: ContactErrors; values?: ContactInput };

// Resend's shared test sender works without domain setup, but only delivers to
// the Resend account owner's address. Use a verified domain in production.
const DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real users never see or fill this field, bots usually do.
  if (formData.get("company")) return { status: "success" };

  const values = readContactForm(formData);
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; contact form cannot send email.");
    return {
      status: "error",
      message: `Sorry, the form is unavailable right now. Please email me at ${profile.email}.`,
      values,
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM,
    to: process.env.CONTACT_TO_EMAIL ?? profile.email,
    replyTo: values.email,
    subject: `New project inquiry from ${values.name}`,
    // Plain text only, so user input can't inject HTML into the email.
    text: [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Budget: ${values.budget}`,
      "",
      values.message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend failed to send contact email:", error);
    return {
      status: "error",
      message: `Something went wrong sending your message. Please try again or email me at ${profile.email}.`,
      values,
    };
  }

  return { status: "success" };
}
