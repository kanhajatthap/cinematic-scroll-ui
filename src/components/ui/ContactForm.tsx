"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const PROJECT_TYPES = [
  "Website Design",
  "Website Development",
  "WordPress",
  "E-commerce",
  "UI/UX Design",
  "Performance / SEO",
  "Other",
];

const EMAIL = "kanhajatthap@gmail.com";

type FieldName = "name" | "email" | "projectType" | "message" | "website";

interface FormValues {
  name: string;
  email: string;
  projectType: string;
  message: string;
  website: string;
}

const EMPTY_VALUES: FormValues = {
  name: "",
  email: "",
  projectType: "",
  message: "",
  website: "",
};

function validate(values: FormValues): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please tell me your name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }
  if (!values.projectType) {
    errors.projectType = "Choose a project type.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Give me at least a sentence or two about the project.";
  }

  return errors;
}

const INPUT_BASE =
  "peer w-full rounded-xl border bg-fg/[0.03] px-4 pb-2.5 pt-6 text-[15px] text-ivory outline-none transition-all duration-300 placeholder-transparent";

const INPUT_OK =
  "border-fg/10 hover:border-fg/20 focus:border-champagne focus:shadow-[0_0_0_3px_rgba(198,162,120,0.14)]";

const INPUT_ERROR =
  "border-[#E07A7A]/45 focus:border-[#E07A7A] focus:shadow-[0_0_0_3px_rgba(224,122,122,0.10)]";

const LABEL_BASE =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-fg/45 transition-all duration-300";

const LABEL_FLOAT =
  "peer-focus:top-3.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-3.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:text-champagne/85";

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message ? (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="mt-2 pl-1 text-xs text-[#E07A7A]"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

function FieldReveal({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ContactForm() {
  const reduce = useReducedMotion();
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const soft = (duration: number) => (reduce ? { duration: 0 } : { duration, ease: [0.22, 1, 0.36, 1] as const });

  const setField =
    (field: FieldName) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const next = { ...values, [field]: e.target.value };
      setValues(next);
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setStatus("idle");
  };

  const firstName = values.name.trim().split(/\s+/)[0] || "there";

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={soft(0.7)}
            className="relative overflow-hidden rounded-3xl border border-champagne/30 px-8 py-16 text-center sm:px-12"
            style={{
              background:
                "linear-gradient(165deg, rgba(198,162,120,0.08), var(--glass-b))",
              boxShadow: "var(--shadow-card), var(--shadow-card-inset)",
            }}
          >
            <svg viewBox="0 0 52 52" className="mx-auto h-14 w-14" aria-hidden="true">
              <motion.circle
                cx="26"
                cy="26"
                r="24"
                fill="none"
                stroke="#C6A278"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={reduce ? { duration: 0 } : { duration: 0.7, ease: "easeOut" }}
              />
              <motion.path
                d="M16 27 l7 7 l13 -14"
                fill="none"
                stroke="#C6A278"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.5, delay: 0.55, ease: "easeOut" }
                }
              />
            </svg>

            <h3
              className="mt-8 text-3xl font-bold tracking-tight text-ivory"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Message sent, <span className="gold-text italic">{firstName}</span>.
            </h3>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-fg/55">
              Your note is on its way. I&apos;ll get back to you within 24 hours —
              usually much sooner.
            </p>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-champagne/70">
              Prefer email?{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-champagne underline-offset-4 transition-colors hover:text-ivory hover:underline"
              >
                {EMAIL}
              </a>
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-10 rounded-full border border-fg/10 px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/50 transition-all duration-300 hover:border-champagne/40 hover:text-champagne"
            >
              Send another note
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={false}
            exit={{ opacity: 0, y: 14 }}
            transition={soft(0.35)}
            className="relative rounded-3xl border border-fg/10 p-6 sm:p-9 lg:p-10"
            style={{
              background: "var(--glass-a)",
              boxShadow: "var(--shadow-card), var(--shadow-card-inset)",
            }}
          >
            <div className="mb-9 flex items-center gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-champagne">
                Project Inquiry
              </p>
              <span className="h-px flex-1 bg-gradient-to-r from-champagne/40 to-transparent" />
            </div>

            <div
              aria-hidden="true"
              className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
            >
              <label htmlFor="cf-website">Website</label>
              <input
                id="cf-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={setField("website")}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FieldReveal delay={0.05}>
                <div>
                  <div className="relative">
                    <input
                      id="cf-name"
                      type="text"
                      placeholder=" "
                      autoComplete="name"
                      value={values.name}
                      onChange={setField("name")}
                      aria-invalid={Boolean(errors.name)}
                      className={`${INPUT_BASE} ${errors.name ? INPUT_ERROR : INPUT_OK}`}
                    />
                    <label
                      htmlFor="cf-name"
                      className={`${LABEL_BASE} ${LABEL_FLOAT}`}
                    >
                      Name
                    </label>
                  </div>
                  <FieldError message={errors.name} />
                </div>
              </FieldReveal>

              <FieldReveal delay={0.12}>
                <div>
                  <div className="relative">
                    <input
                      id="cf-email"
                      type="email"
                      placeholder=" "
                      autoComplete="email"
                      value={values.email}
                      onChange={setField("email")}
                      aria-invalid={Boolean(errors.email)}
                      className={`${INPUT_BASE} ${errors.email ? INPUT_ERROR : INPUT_OK}`}
                    />
                    <label
                      htmlFor="cf-email"
                      className={`${LABEL_BASE} ${LABEL_FLOAT}`}
                    >
                      Email
                    </label>
                  </div>
                  <FieldError message={errors.email} />
                </div>
              </FieldReveal>
            </div>

            <div className="mt-5">
              <FieldReveal delay={0.19}>
                <div>
                  <div className="group">
                    <label
                      htmlFor="cf-type"
                      className={`mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                        errors.projectType ? "text-[#E07A7A]" : "text-champagne"
                      }`}
                    >
                      Project Type
                    </label>
                    <div className="relative">
                      <select
                        id="cf-type"
                        value={values.projectType}
                        onChange={setField("projectType")}
                        aria-invalid={Boolean(errors.projectType)}
                        className={`w-full appearance-none rounded-xl border bg-fg/[0.03] px-4 py-3.5 pr-11 text-[15px] outline-none transition-all duration-300 ${
                          values.projectType ? "text-ivory" : "text-fg/45"
                        } ${errors.projectType ? INPUT_ERROR : INPUT_OK}`}
                      >
                        <option value="" disabled hidden>
                          Choose a service area
                        </option>
                        {PROJECT_TYPES.map((p) => (
                          <option key={p} value={p} className="bg-[var(--panel)] text-ivory">
                            {p}
                          </option>
                        ))}
                      </select>
                      <svg
                        viewBox="0 0 12 8"
                        className="pointer-events-none absolute right-4 top-1/2 h-2 w-3.5 -translate-y-1/2 text-champagne transition-transform duration-300 group-focus-within:rotate-180"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 1.5 L6 6.5 L11 1.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <FieldError message={errors.projectType} />
                </div>
              </FieldReveal>
            </div>

            <div className="mt-5">
              <FieldReveal delay={0.26}>
                <div>
                  <div className="relative">
                    <textarea
                      id="cf-message"
                      rows={5}
                      placeholder=" "
                      value={values.message}
                      onChange={setField("message")}
                      aria-invalid={Boolean(errors.message)}
                      className={`peer w-full resize-none rounded-xl border bg-fg/[0.03] px-4 pb-3 pt-7 text-[15px] leading-relaxed text-ivory outline-none transition-all duration-300 placeholder-transparent ${
                        errors.message ? INPUT_ERROR : INPUT_OK
                      }`}
                    />
                    <label
                      htmlFor="cf-message"
                      className={`pointer-events-none absolute left-4 top-5 text-[15px] text-fg/45 transition-all duration-300 peer-focus:top-4 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:text-champagne/85`}
                    >
                      Message
                    </label>
                  </div>
                  <FieldError message={errors.message} />
                </div>
              </FieldReveal>
            </div>

            <div className="mt-8">
              <FieldReveal delay={0.33}>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative flex h-14 w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full text-[13px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:shadow-[0_14px_40px_rgba(198,162,120,0.35)] disabled:cursor-wait"
                  style={{
                    background: "linear-gradient(120deg, #C6A278, #a9865c)",
                    color: "#0F0F10",
                    boxShadow: "0 10px 30px rgba(198,162,120,0.25)",
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-fg/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {status === "loading" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0F0F10]/25 border-t-[#0F0F10]" />
                      Sending note
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 8 L14 8 M9 3 L14 8 L9 13"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>

                <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-fg/35">
                  No spam — I reply within 24 hours
                </p>
              </FieldReveal>
            </div>

            <AnimatePresence>
              {status === "error" ? (
                <motion.p
                  key="submit-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 text-center text-xs text-[#E07A7A]"
                >
                  Something went wrong sending your message. Please try again or
                  email me directly at{" "}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="underline underline-offset-4 transition-colors hover:text-fg"
                  >
                    {EMAIL}
                  </a>
                  .
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}