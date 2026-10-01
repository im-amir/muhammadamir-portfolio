"use client";

import { useActionState, useState, type FormEvent } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { contact } from "@/data/content";
import {
  contactLimits,
  readContactForm,
  validateContact,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact-schema";
import { buttonStyles } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Field, fieldClass } from "./Field";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const [clientErrors, setClientErrors] = useState<ContactErrors | null>(null);

  // Client errors are cleared on each valid submit, so server errors show after.
  const errors = clientErrors ?? (state.status === "error" ? state.errors : undefined) ?? {};
  const values = state.status === "error" ? state.values : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const found = validateContact(readContactForm(new FormData(event.currentTarget)));
    if (Object.keys(found).length > 0) {
      event.preventDefault();
      setClientErrors(found);
      const firstInvalid = Object.keys(found)[0] as ContactField;
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setClientErrors(null);
  }

  if (state.status === "success") {
    return (
      <div role="status" className="flex items-start gap-3 rounded-2xl border border-accent bg-accent-soft p-6">
        <Icon name="check" className="mt-0.5 size-5 shrink-0 text-accent" />
        <p className="font-medium">{contact.successMessage}</p>
      </div>
    );
  }

  const describedBy = (field: ContactField) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={contactLimits.name}
            defaultValue={values?.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={fieldClass}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={contactLimits.email}
            defaultValue={values?.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field id="budget" label="Budget" error={errors.budget}>
        <select
          id="budget"
          name="budget"
          required
          defaultValue={values?.budget ?? ""}
          aria-invalid={Boolean(errors.budget)}
          aria-describedby={describedBy("budget")}
          className={fieldClass}
        >
          <option value="" disabled>
            Select a range
          </option>
          {contact.budgets.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={contactLimits.messageMin}
          maxLength={contactLimits.message}
          defaultValue={values?.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className={fieldClass}
        />
      </Field>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && !clientErrors && (
        <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className={`${buttonStyles.primary} w-full sm:w-auto disabled:opacity-60`}>
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
