"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFaqs } from "@/lib/mock-api";
import {
  getContactInfo,
  getExtraPhones,
  getOfficeHours,
} from "@/lib/mock-api/contact";
import { useRecaptcha } from "@/hooks/use-recaptcha";

const contact = getContactInfo();
const phones = getExtraPhones();
const hours = getOfficeHours();

function FaqItem({
  faq,
  index,
}: {
  faq: { question: string; answer: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      viewport={{ once: true }}
      className={`overflow-hidden rounded-xl border transition-colors ${open ? "border-primary/40 bg-card" : "border-border bg-card"}`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span
          className={`text-sm font-semibold ${open ? "text-primary" : "text-card-foreground"}`}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-colors ${open ? "text-primary" : "text-muted-foreground"}`}
          />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="border-t border-border px-5 pb-4 pt-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    token: recaptchaToken,
    ref: recaptchaRef,
    reset: resetRecaptcha,
  } = useRecaptcha();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formState.name.trim()) e.name = "Required";
    if (!formState.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
      e.email = "Invalid email";
    if (!formState.subject) e.subject = "Please select a subject";
    if (!formState.message.trim()) e.message = "Required";
    if (!recaptchaToken) e.recaptcha = "Please complete the reCAPTCHA";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validation Check
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Prepare Data
      const data = new FormData();
      data.append("type", "contact");
      data.append("name", formState.name);
      data.append("email", formState.email);
      data.append("phone", formState.phone);
      data.append("subject", formState.subject);
      data.append("message", formState.message);

      // Add the reCAPTCHA token if you are using one
      if (recaptchaToken) data.append("token", recaptchaToken);

      // 3. Single Fetch Request
      const res = await fetch("/api/apply", {
        method: "POST",
        body: data,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error ?? "Failed to send message");
      }

      // 4. Success State
      setIsSubmitted(true);
      if (resetRecaptcha) resetRecaptcha();

      // 5. Reset Form after a delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setErrors({});
      }, 4000);
    } catch (err: any) {
      console.error("Submission Error:", err);
      setErrors({
        message: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      // 6. Always stop the loading state
      setIsSubmitting(false);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent py-20 lg:py-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent/30 blur-2xl" />
        <div className="relative mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Contact Us
              </span>
            </div>
            <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
              {"We're Here to Help"}
            </h1>
            <p className="text-pretty text-base text-muted-foreground md:text-lg">
              Have questions or need to schedule an appointment? Reach out and
              our team will respond promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-secondary/30 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MapPin, label: "Address", lines: [contact.address] },
              { icon: Phone, label: "Phone", lines: phones },
              { icon: Mail, label: "Email", lines: [contact.email] },
              {
                icon: Clock,
                label: "Office Hours",
                lines: hours.map((h) =>
                  h.highlight
                    ? `Hospital: ${h.hours}`
                    : `${h.label}: ${h.hours}`,
                ),
              },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-start rounded-2xl border border-border bg-card px-5 py-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <div className="absolute left-0 top-0 h-1 w-12 rounded-tl-2xl bg-primary/40 transition-all duration-300 group-hover:w-full group-hover:rounded-tr-2xl group-hover:bg-primary/30" />
                <div className="mb-4 mt-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {card.label}
                </p>
                <div className="space-y-1">
                  {card.lines.map((line, j) => (
                    <p
                      key={j}
                      className={`text-sm leading-snug ${j === 0 ? "font-semibold text-foreground" : "text-muted-foreground"} ${card.label === "Office Hours" && line.startsWith("Hospital") ? "mt-1 font-semibold text-primary" : ""}`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="bg-background pb-16 pt-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="sticky top-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div
                  className="relative aspect-[3/4] overflow-hidden"
                  suppressHydrationWarning
                >
                  <iframe
                    src={contact.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full"
                    suppressHydrationWarning
                  />
                </div>
                <div className="divide-y divide-border">
                  {phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\D/g, "")}`}
                      className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-accent"
                    >
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {p}
                      </span>
                    </a>
                  ))}
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-accent"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {contact.email}
                    </span>
                  </a>
                  <p className="flex items-start gap-3 px-5 py-3.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {contact.address}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="border-b border-border bg-secondary/30 px-6 py-5">
                  <h2 className="font-bold text-card-foreground">
                    Send Us a Message
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 14 }}
                          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                        >
                          <CheckCircle className="h-8 w-8 text-primary" />
                        </motion.div>
                        <h3 className="mb-2 text-xl font-bold text-card-foreground">
                          Message Sent!
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Thank you for reaching out. We will respond shortly.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-foreground">
                              Full Name <span className="text-primary">*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formState.name}
                              onChange={handleChange}
                              placeholder="Juan dela Cruz"
                              className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${errors.name ? "border-red-400" : "border-input focus:border-primary"}`}
                            />
                            {errors.name && (
                              <p className="mt-1 text-xs text-red-500">
                                {errors.name}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-foreground">
                              Email <span className="text-primary">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formState.email}
                              onChange={handleChange}
                              placeholder="juan@email.com"
                              className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${errors.email ? "border-red-400" : "border-input focus:border-primary"}`}
                            />
                            {errors.email && (
                              <p className="mt-1 text-xs text-red-500">
                                {errors.email}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-foreground">
                              Phone{" "}
                              <span className="text-xs font-normal text-muted-foreground">
                                (optional)
                              </span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formState.phone}
                              onChange={handleChange}
                              placeholder="+63 912 345 6789"
                              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="mb-1.5 block text-xs font-semibold text-foreground">
                              Subject <span className="text-primary">*</span>
                            </label>
                            <select
                              name="subject"
                              value={formState.subject}
                              onChange={handleChange}
                              className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${errors.subject ? "border-red-400" : "border-input focus:border-primary"}`}
                            >
                              <option value="">Select a subject</option>
                              <option value="appointment">
                                Schedule an Appointment
                              </option>
                              <option value="general">General Inquiry</option>
                              <option value="billing">Billing Question</option>
                              <option value="feedback">Feedback</option>
                              <option value="careers">
                                Career Opportunity
                              </option>
                              <option value="other">Other</option>
                            </select>
                            {errors.subject && (
                              <p className="mt-1 text-xs text-red-500">
                                {errors.subject}
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold text-foreground">
                            Message <span className="text-primary">*</span>
                          </label>
                          <textarea
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="How can we help you?"
                            className={`w-full resize-none rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${errors.message ? "border-red-400" : "border-input focus:border-primary"}`}
                          />
                          {errors.message && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.message}
                            </p>
                          )}
                        </div>

                        {/* reCAPTCHA */}
                        <div>
                          <div ref={recaptchaRef} />
                          {errors.recaptcha && (
                            <p className="mt-1 text-xs text-red-500">
                              {errors.recaptcha}
                            </p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting} // Disables clicking
                          className={`gap-2 transition-colors ${
                            isSubmitting
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-[#5aa61b]"
                          }`}
                        >
                          {isSubmitting ? (
                            <>Submitting...</>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-destructive py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <h3 className="text-base font-bold text-destructive-foreground">
                Medical Emergency?
              </h3>
              <p className="text-sm text-destructive-foreground/80">
                For life-threatening emergencies, call 911 or visit our
                Emergency Room immediately.
              </p>
            </div>
            <Button variant="secondary" size="lg" asChild className="shrink-0">
              <a href="tel:911">Call 911</a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground">
              Find quick answers to common questions.
            </p>
          </motion.div>
          <div className="space-y-2">
            {getFaqs().map((faq, index) => (
              <FaqItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
