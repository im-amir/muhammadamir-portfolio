import { contact } from "@/data/content";

// Shared by the client form and the server action so both enforce the same rules.

export type ContactField = "name" | "email" | "budget" | "message";

export type ContactInput = Record<ContactField, string>;

export type ContactErrors = Partial<Record<ContactField, string>>;

export const contactLimits = {
  name: 100,
  email: 200,
  message: 5000,
  messageMin: 10,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readContactForm(formData: FormData): ContactInput {
  const get = (key: ContactField) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return {
    name: get("name"),
    email: get("email"),
    budget: get("budget"),
    message: get("message"),
  };
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};

  if (!input.name) errors.name = "Please enter your name.";
  else if (input.name.length > contactLimits.name) errors.name = "Name is too long.";

  if (!input.email) errors.email = "Please enter your email.";
  else if (input.email.length > contactLimits.email || !EMAIL_PATTERN.test(input.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!contact.budgets.includes(input.budget)) errors.budget = "Please choose a budget range.";

  if (input.message.length < contactLimits.messageMin) {
    errors.message = `Please write at least ${contactLimits.messageMin} characters.`;
  } else if (input.message.length > contactLimits.message) {
    errors.message = "Message is too long.";
  }

  return errors;
}
