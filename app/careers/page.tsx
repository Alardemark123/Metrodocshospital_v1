"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  X,
  Upload,
  FileText,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getJobs,
  getJobDepartmentFilters,
  getBenefits,
  ICON_MAP,
} from "@/lib/mock-api";
import type { Job } from "@/lib/mock-api";

// ---------- Apply Modal (wide, no scroll, 2-column) ----------
function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null as File | null,
  });
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.resume) e.resume = "Please attach your resume";
    if (!captchaChecked) e.captcha = "Please verify you are not a robot";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSubmitted(true);
  };

  const set = (name: string, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — wide 2-col, fixed height */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-card shadow-2xl"
      >
        {submitted ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center justify-center px-10 py-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 14 }}
              className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
            >
              <CheckCircle className="h-10 w-10 text-primary" />
            </motion.div>
            <h3 className="mb-2 text-2xl font-bold text-card-foreground">
              Application Submitted!
            </h3>
            <p className="mb-2 text-muted-foreground">
              Thank you for applying for{" "}
              <span className="font-semibold text-foreground">
                {job.position}
              </span>
              .
            </p>
            <p className="mb-8 text-sm text-muted-foreground">
              We'll review your application and get back to you shortly.
            </p>
            <Button onClick={onClose} size="lg">
              Close
            </Button>
          </div>
        ) : (
          <div className="flex h-full">
            {/* Left col — job info sidebar */}
            <div className="hidden w-64 shrink-0 flex-col justify-between bg-primary p-6 md:flex">
              <div>
                <div className="mb-6">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">
                    Applying for
                  </p>
                  <h2 className="text-lg font-bold leading-snug text-primary-foreground">
                    {job.position}
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                    <Briefcase className="h-4 w-4 shrink-0" />
                    {job.department}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                    <Clock className="h-4 w-4 shrink-0" />
                    {job.type}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">
                    What to prepare
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "Updated resume/CV",
                      "Valid contact info",
                      "Cover letter (optional)",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-xs text-primary-foreground/80"
                      >
                        <ChevronRight className="h-3 w-3 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-xs text-primary-foreground/50">
                Your data is handled securely and will not be shared.
              </p>
            </div>

            {/* Right col — form */}
            <div className="flex flex-1 flex-col">
              {/* Form header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h3 className="font-bold text-card-foreground">
                    Your Application
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Fill in the details below to apply
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form body — 2 columns inside */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {/* First name */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      First Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Juan"
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      className={`w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${errors.firstName ? "border-red-400" : "border-input focus:border-primary"}`}
                    />
                    {errors.firstName && (
                      <p className="mt-0.5 text-xs text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last name */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      Last Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="dela Cruz"
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      className={`w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${errors.lastName ? "border-red-400" : "border-input focus:border-primary"}`}
                    />
                    {errors.lastName && (
                      <p className="mt-0.5 text-xs text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="juan@email.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={`w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${errors.email ? "border-red-400" : "border-input focus:border-primary"}`}
                    />
                    {errors.email && (
                      <p className="mt-0.5 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      Phone <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+63 912 345 6789"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={`w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${errors.phone ? "border-red-400" : "border-input focus:border-primary"}`}
                    />
                    {errors.phone && (
                      <p className="mt-0.5 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Resume upload — full width */}
                  <div className="col-span-2">
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      Resume / CV <span className="text-primary">*</span>
                    </label>
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed px-4 py-3 transition-colors hover:bg-accent/20 ${
                        errors.resume
                          ? "border-red-400"
                          : form.resume
                            ? "border-primary bg-primary/5"
                            : "border-border"
                      }`}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          setForm((f) => ({ ...f, resume: file }));
                          setErrors((er) => ({ ...er, resume: "" }));
                        }}
                      />
                      {form.resume ? (
                        <>
                          <FileText className="h-5 w-5 shrink-0 text-primary" />
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-primary">
                              {form.resume.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Click to change file
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload className="h-5 w-5 shrink-0 text-muted-foreground" />
                          <div>
                            <p className="text-xs font-semibold text-foreground">
                              Click to upload resume
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PDF, DOC, DOCX — max 5MB
                            </p>
                          </div>
                        </>
                      )}
                    </label>
                    {errors.resume && (
                      <p className="mt-0.5 text-xs text-red-500">
                        {errors.resume}
                      </p>
                    )}
                  </div>

                  {/* Cover letter — full width */}
                  <div className="col-span-2">
                    <label className="mb-1 block text-xs font-semibold text-foreground">
                      Cover Letter{" "}
                      <span className="text-xs font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us why you're a great fit..."
                      value={form.coverLetter}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, coverLetter: e.target.value }))
                      }
                      className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* reCAPTCHA + Submit — full width */}
                  <div className="col-span-2 flex items-start justify-between gap-4">
                    {/* reCAPTCHA */}
                    <div className="flex-1">
                      <div
                        className={`flex items-center justify-between rounded-lg border p-3 ${
                          errors.captcha
                            ? "border-red-400 bg-red-50/20"
                            : "border-border bg-secondary/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setCaptchaChecked((c) => !c);
                              setErrors((er) => ({ ...er, captcha: "" }));
                            }}
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
                              captchaChecked
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted-foreground bg-background"
                            }`}
                          >
                            {captchaChecked && (
                              <svg
                                viewBox="0 0 12 12"
                                className="h-3 w-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <polyline points="1,6 4.5,9.5 11,2" />
                              </svg>
                            )}
                          </button>
                          <span className="text-sm text-foreground">
                            I am not a robot
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="flex h-9 w-9 items-center justify-center rounded bg-[#f9f9f9]">
                            <span className="text-center text-[7px] font-bold leading-tight text-[#4a90d9]">
                              reCAPTCHA
                            </span>
                          </div>
                          <span className="text-[8px] text-muted-foreground">
                            Privacy · Terms
                          </span>
                        </div>
                      </div>
                      {errors.captcha && (
                        <p className="mt-0.5 text-xs text-red-500">
                          {errors.captcha}
                        </p>
                      )}
                    </div>

                    {/* Submit button */}
                    <Button
                      className="h-full min-h-[52px] gap-2 px-6"
                      onClick={handleSubmit}
                    >
                      <Briefcase className="h-4 w-4" />
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ---------- Job List Item ----------
function JobListItem({
  job,
  isSelected,
  onClick,
}: {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35 }}
      onClick={onClick}
      className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
        isSelected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-card hover:border-primary/40 hover:bg-accent/30"
      }`}
    >
      <div className="mb-1.5 flex flex-wrap gap-1.5">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
            isSelected
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary"
          }`}
        >
          {job.type}
        </span>
      </div>
      <h3
        className={`mb-1 text-sm font-bold ${isSelected ? "text-primary" : "text-card-foreground"}`}
      >
        {job.position}
      </h3>
      <p className="text-xs text-muted-foreground">{job.department}</p>
      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3" />
        {job.location}
      </div>
    </motion.button>
  );
}

// ---------- Job Detail Panel ----------
function JobDetail({ job, onApply }: { job: Job; onApply: () => void }) {
  return (
    <motion.div
      key={job.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="border-b border-border bg-secondary/30 px-6 py-5">
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {job.type}
          </span>
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground">
            {job.department}
          </span>
        </div>
        <h2 className="mb-1 text-2xl font-bold text-card-foreground">
          {job.position}
        </h2>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary/70" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-primary/70" />
            {job.type}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5 text-primary/70" />
            {job.department}
          </span>
        </div>
      </div>
      <div
        className="overflow-y-auto px-6 py-5"
        style={{ maxHeight: "calc(100vh - 340px)" }}
      >
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          {job.description}
        </p>
        <div className="mb-6 grid gap-5 sm:grid-cols-2">
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-card-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Requirements
            </h4>
            <ul className="space-y-2">
              {job.requirements.map((req, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-card-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Benefits
            </h4>
            <ul className="space-y-2">
              {job.benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Button className="gap-2" onClick={onApply}>
          <Briefcase className="h-4 w-4" />
          Apply for This Position
        </Button>
      </div>
    </motion.div>
  );
}

// ---------- Main Page ----------
export default function CareersPage() {
  const jobs = getJobs();
  const departments = getJobDepartmentFilters();
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] ?? null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  const isFiltered = selectedDepartment !== "All" || searchQuery !== "";

  const filteredJobs = jobs.filter((job) => {
    const matchesDepartment =
      selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesSearch =
      job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedDepartment("All");
    setSearchQuery("");
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
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Join Our Team
              </span>
            </div>
            <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
              Build Your Career With Us
            </h1>
            <p className="text-pretty text-base text-muted-foreground md:text-lg">
              Join dedicated healthcare professionals committed to making a
              difference. Competitive benefits, growth opportunities, and a
              supportive environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-secondary/40 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6">
            <h2 className="mb-1 text-2xl font-bold text-foreground">
              Open Positions
            </h2>
            <p className="text-sm text-muted-foreground">
              {isFiltered
                ? `${filteredJobs.length} result${filteredJobs.length !== 1 ? "s" : ""} found`
                : `${jobs.length} positions available`}
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Left panel */}
            <div className="w-full lg:w-80 xl:w-96 lg:shrink-0">
              <div className="mb-3 rounded-xl border border-border bg-card p-3 shadow-sm">
                <div className="relative mb-2.5">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search positions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-8 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        selectedDepartment === dept
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-accent"
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {isFiltered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 border-t border-border pt-2"
                    >
                      <button
                        onClick={clearFilters}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                      >
                        <X className="h-3 w-3" /> Clear filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-2 lg:max-h-[calc(100vh-320px)] lg:overflow-y-auto lg:pr-1">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div key={job.id}>
                      <JobListItem
                        job={job}
                        isSelected={selectedJob?.id === job.id}
                        onClick={() =>
                          setSelectedJob(
                            selectedJob?.id === job.id ? null : job,
                          )
                        }
                      />
                      {/* Mobile inline detail — opens right below clicked job */}
                      <div className="lg:hidden">
                        <AnimatePresence>
                          {selectedJob?.id === job.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pt-2">
                                <JobDetail
                                  job={job}
                                  onApply={() => setApplyJob(job)}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-card py-10 text-center">
                    <Search className="mb-2 h-5 w-5 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">
                      No positions found
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-2 text-xs text-primary underline"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right panel desktop */}
            <div className="hidden flex-1 lg:block">
              {selectedJob ? (
                <div className="sticky top-6">
                  <JobDetail
                    job={selectedJob}
                    onApply={() => setApplyJob(selectedJob)}
                  />
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border bg-card text-muted-foreground">
                  <p className="text-sm">Select a position to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-background py-14">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
              Why Work With Us
            </h2>
            <p className="text-sm text-muted-foreground">
              We invest in our employees because they are our greatest asset.
            </p>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {getBenefits().map((benefit, index) => {
              const BenefitIcon = ICON_MAP[benefit.icon];
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    {BenefitIcon && (
                      <BenefitIcon className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <h3 className="mb-1.5 font-semibold text-card-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-primary-foreground md:text-4xl">
            {"Don't See the Right Position?"}
          </h2>
          <p className="mb-8 text-sm text-primary-foreground/80 md:text-base">
            Submit your resume and we will contact you when a matching
            opportunity becomes available.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Submit Your Resume</Link>
          </Button>
        </div>
      </section>

      {/* Apply Modal */}
      <AnimatePresence>
        {applyJob && (
          <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
