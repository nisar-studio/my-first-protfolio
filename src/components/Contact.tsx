import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { profile } from "../data/profile";
import { useCopyToClipboard } from "../lib/hooks";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

type Fields = { name: string; email: string; subject: string; message: string };
type FieldName = keyof Fields;
type Errors = Partial<Record<FieldName, string>>;

const emptyFields: Fields = { name: "", email: "", subject: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please add your name (at least 2 characters).";
  if (!emailPattern.test(values.email.trim()))
    errors.email = "Please add a valid email address, e.g. name@company.com.";
  if (values.subject.trim().length < 3) errors.subject = "Please add a short subject line.";
  if (values.message.trim().length < 15)
    errors.message = "Please write at least 15 characters so I have something to reply to.";
  return errors;
}

function buildMessage(values: Fields) {
  return `Subject: ${values.subject.trim()}\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`;
}

function buildMailto(values: Fields) {
  const subject = encodeURIComponent(`${values.subject.trim()} — via portfolio`);
  const body = encodeURIComponent(buildMessage(values));
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

export function Contact() {
  const [values, setValues] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "invalid" | "handoff">("idle");
  const [draftHref, setDraftHref] = useState("");
  const { copied, copy } = useCopyToClipboard();
  const { copied: messageCopied, copy: copyMessage } = useCopyToClipboard();
  const handoffHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "handoff") handoffHeadingRef.current?.focus();
  }, [status]);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const fieldRefs: Record<FieldName, RefObject<HTMLInputElement | HTMLTextAreaElement | null>> = {
    name: nameRef,
    email: emailRef,
    subject: subjectRef,
    message: messageRef,
  };

  const update = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      setStatus("invalid");
      fieldRefs[firstInvalid].current?.focus();
      return;
    }
    const href = buildMailto(values);
    setDraftHref(href);
    setStatus("handoff");
    window.location.href = href;
  };

  const reset = () => {
    setValues(emptyFields);
    setErrors({});
    setStatus("idle");
    setDraftHref("");
  };

  const contactLinks = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      Icon: Mail,
      external: false,
    },
    {
      label: "LinkedIn",
      value: "mohammednisaruddin",
      href: profile.linkedin,
      Icon: Linkedin,
      external: true,
    },
    {
      label: "GitHub",
      value: "nisar-studio",
      href: profile.github,
      Icon: Github,
      external: true,
    },
  ];

  return (
    <Section
      id="contact"
      eyebrow="07 — Contact"
      title={
        <>
          Have an idea? <span className="font-serif italic font-normal text-muted">Let&apos;s build</span>{" "}
          something.
        </>
      }
      description="I'm open to AI/ML internships, freelance builds and open-source collaboration. If you have a problem worth a careful technical answer, I'd like to hear it."
    >
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="flex h-full flex-col gap-4">
            <div className="panel p-6 sm:p-7">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-faint">
                Direct lines
              </p>
              <ul className="mt-4 divide-y divide-line">
                {contactLinks.map(({ label, value, href, Icon, external }) => (
                  <li key={label} className="flex items-center gap-3 py-3 first:pt-1">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-panel text-muted">
                      <Icon aria-hidden="true" size={15} strokeWidth={1.75} />
                    </span>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer noopener" : undefined}
                      className="group min-w-0 flex-1"
                    >
                      <span className="block text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                        {label}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 truncate text-[0.85rem] text-ink transition-colors group-hover:text-violet">
                        {value}
                        <ArrowUpRight
                          aria-hidden="true"
                          size={12}
                          className="shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                        {external ? <span className="sr-only">(opens in a new tab)</span> : null}
                      </span>
                    </a>
                    {label === "Email" ? (
                      <button
                        type="button"
                        onClick={() => copy(profile.email)}
                        className="icon-link h-8 w-8"
                        aria-label={copied ? "Email address copied" : "Copy email address"}
                      >
                        {copied ? (
                          <Check aria-hidden="true" size={13} className="text-cyan" />
                        ) : (
                          <Copy aria-hidden="true" size={13} />
                        )}
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-[0.78rem] text-muted">
                <MapPin aria-hidden="true" size={14} className="text-faint" />
                {profile.location}
              </p>
              <span aria-live="polite" className="sr-only">
                {copied ? "Email address copied to clipboard." : ""}
              </span>
            </div>

            <div
              className="panel flex items-start gap-3 border-cyan/20 p-5"
              style={{ backgroundColor: "color-mix(in srgb, var(--cyan) 6%, transparent)" }}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan/30 text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              </span>
              <p className="text-[0.8rem] leading-relaxed text-muted">
                Currently building AI-integrated products and open to internships. Best reached by email —
                I read everything that is not a template.
              </p>
            </div>

            <div className="panel p-6 sm:p-7">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-faint">
                A good fit if you need
              </p>
              <ul className="mt-3.5 space-y-2.5">
                {[
                  "An AI feature grounded in your own data",
                  "A Python or full-stack build taken end to end",
                  "An extra pair of hands on an ML or open-source project",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.83rem] leading-relaxed text-muted">
                    <ArrowUpRight aria-hidden="true" size={13} className="mt-1 shrink-0 text-violet" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="panel p-6 sm:p-7">
            {status === "handoff" ? (
              <div role="status" aria-live="polite" className="flex h-full flex-col justify-center py-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-cyan">
                  <CheckCircle2 aria-hidden="true" size={20} />
                </span>
                <h3
                  ref={handoffHeadingRef}
                  tabIndex={-1}
                  className="mt-5 text-xl font-medium tracking-[-0.02em] text-ink outline-none"
                >
                  Your email draft is ready
                </h3>
                <p className="mt-2 max-w-md text-[0.88rem] leading-relaxed text-muted">
                  Your email app should have opened with the message filled in. Nothing has been sent
                  from this page — press send in your email app to reach me at{" "}
                  <span className="text-ink/90">{profile.email}</span>.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <a href={draftHref} className="btn btn-primary">
                    <Mail aria-hidden="true" size={15} />
                    Open draft again
                  </a>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => copyMessage(buildMessage(values))}
                  >
                    {messageCopied ? (
                      <Check aria-hidden="true" size={15} className="text-cyan" />
                    ) : (
                      <Copy aria-hidden="true" size={15} />
                    )}
                    {messageCopied ? "Copied" : "Copy message"}
                  </button>
                </div>
                <p className="mt-4 text-[0.75rem] leading-relaxed text-faint">
                  No email app opened? Copy the message above and send it to {profile.email}, or write to
                  me directly.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 self-start text-[0.8rem] font-medium text-violet hover:opacity-80"
                >
                  Write another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[0.95rem] font-medium text-ink">Send a message</h3>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-faint">
                    email handoff
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-[0.75rem] font-medium text-muted">
                      Name <span className="text-faint">(required)</span>
                    </label>
                    <input
                      ref={nameRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="field"
                      placeholder="Your name"
                      value={values.name}
                      onChange={(event) => update("name", event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      maxLength={80}
                    />
                    {errors.name ? (
                      <p id="contact-name-error" className="mt-1.5 text-[0.72rem] text-[#f0616d]">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-[0.75rem] font-medium text-muted">
                      Email <span className="text-faint">(required)</span>
                    </label>
                    <input
                      ref={emailRef}
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="field"
                      placeholder="you@company.com"
                      value={values.email}
                      onChange={(event) => update("email", event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      maxLength={120}
                    />
                    {errors.email ? (
                      <p id="contact-email-error" className="mt-1.5 text-[0.72rem] text-[#f0616d]">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="contact-subject" className="mb-1.5 block text-[0.75rem] font-medium text-muted">
                    Subject <span className="text-faint">(required)</span>
                  </label>
                  <input
                    ref={subjectRef}
                    id="contact-subject"
                    name="subject"
                    type="text"
                    className="field"
                    placeholder="Internship, project, or collaboration"
                    value={values.subject}
                    onChange={(event) => update("subject", event.target.value)}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    maxLength={120}
                  />
                  {errors.subject ? (
                    <p id="contact-subject-error" className="mt-1.5 text-[0.72rem] text-[#f0616d]">
                      {errors.subject}
                    </p>
                  ) : null}
                </div>

                <div className="mt-4">
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <label htmlFor="contact-message" className="text-[0.75rem] font-medium text-muted">
                      Message <span className="text-faint">(required)</span>
                    </label>
                    <span className="font-mono text-[0.62rem] text-faint">
                      {values.message.length}/2000
                    </span>
                  </div>
                  <textarea
                    ref={messageRef}
                    id="contact-message"
                    name="message"
                    rows={5}
                    className="field resize-y"
                    placeholder="A little context about what you're building or what you need."
                    value={values.message}
                    onChange={(event) => update("message", event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
                    maxLength={2000}
                  />
                  {errors.message ? (
                    <p id="contact-message-error" className="mt-1.5 text-[0.72rem] text-[#f0616d]">
                      {errors.message}
                    </p>
                  ) : (
                    <p id="contact-message-hint" className="mt-1.5 text-[0.7rem] text-faint">
                      Plain text is perfect — no need for a formal pitch.
                    </p>
                  )}
                </div>

                <button type="submit" className="btn btn-primary mt-5 w-full">
                  <Send aria-hidden="true" size={15} />
                  Prepare email
                </button>

                <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-faint">
                  This form does not send anything by itself. It opens your email app with a draft
                  addressed to {profile.email}.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
