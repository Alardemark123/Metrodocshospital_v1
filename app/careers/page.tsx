"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  X,
  Upload,
  CheckCircle,
  ChevronRight,
  Calendar,
  SlidersHorizontal,
  ChevronLeft,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getJobs, getJobDepartmentFilters } from "@/lib/mock-api";
import type { Job } from "@/lib/mock-api";
import { useRecaptcha } from "@/hooks/use-recaptcha";

const DESKTOP_PAGE_SIZE = 6;
const MOBILE_PAGE_SIZE = 3;

// ——— 1. APPLY MODAL ———
function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { token, ref: recaptchaRef } = useRecaptcha();
  const [showDetails, setShowDetails] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Please verify you are human via reCAPTCHA.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="absolute inset-0 z-0" onClick={onClose} />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative z-10 w-full sm:max-w-4xl bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row max-h-[95vh] sm:max-h-[90vh] pointer-events-auto overflow-hidden"
      >
        {/* --- MOBILE HEADER & ACCORDION (Visible < 768px) --- */}
        <div className="md:hidden bg-[#5aa61b] text-white shrink-0">
          <div className="px-6 py-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">
                  Applying For
                </p>
                <h2 className="text-xl font-black">{job.position}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Accordion Trigger */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-4 flex items-center gap-2 text-[11px] font-bold uppercase bg-black/10 px-3 py-2 rounded-xl transition-colors active:bg-black/20"
            >
              {showDetails ? "Hide Job Details" : "View Job Details"}
              <motion.div animate={{ rotate: showDetails ? 180 : 0 }}>
                <ChevronRight size={14} className="rotate-90" />
              </motion.div>
            </button>
          </div>

          {/* Collapsible Content */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-black/5"
              >
                <div className="px-6 pb-6 pt-2 space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
                      <Briefcase size={12} /> {job.department}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
                      <MapPin size={12} /> {job.location}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase opacity-60 mb-2 border-b border-white/10 pb-1">
                      Requirements
                    </p>
                    <ul className="space-y-1.5">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="text-xs flex gap-2 opacity-90">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-white shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Sidebar (Desktop) */}
        <div className="hidden md:flex w-[300px] bg-[#5aa61b] p-10 text-white flex-col justify-between shrink-0">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-2">
              Applying For
            </p>
            <h2 className="text-3xl font-black leading-tight mb-6">
              {job.position}
            </h2>

            {/* Info List */}
            <div className="space-y-4 text-sm font-medium border-b border-white/20 pb-6 mb-6">
              <div className="flex items-center gap-4">
                <Briefcase size={16} /> {job.department}
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={16} /> {job.location}
              </div>
              <div className="flex items-center gap-4">
                <Clock size={16} /> {job.type}
              </div>
            </div>

            {/* Requirements Mapping */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-3">
                Key Requirements
              </p>
              <ul className="space-y-2">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <li key={index} className="text-xs flex gap-2 opacity-90">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-white shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white p-6 md:p-12 overflow-y-auto">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <CheckCircle size={72} className="text-[#5aa61b] mb-6" />
              <h3 className="text-2xl font-bold text-gray-900">
                Application Submitted!
              </h3>
              <Button
                onClick={onClose}
                className="mt-8 bg-[#5aa61b] rounded-xl px-12 h-12"
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="mb-2">
                <h3 className="text-xl md:text-2xl font-bold">
                  Your Application
                </h3>
                <p className="text-gray-500 text-sm">
                  Fill in the details below
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border border-gray-200 bg-gray-50 p-3.5 rounded-xl text-sm outline-none w-full"
                  placeholder="First Name"
                  required
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border border-gray-200 bg-gray-50 p-3.5 rounded-xl text-sm outline-none w-full"
                  placeholder="Last Name"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border border-gray-200 bg-gray-50 p-3.5 rounded-xl text-sm outline-none w-full sm:col-span-2"
                  placeholder="Email Address"
                  required
                />
              </div>

              <label className="relative border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col items-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                <input
                  type="file"
                  required
                  className="absolute inset-0 opacity-0 cursor-pointer z-0"
                  onChange={handleFileChange}
                />
                <div className="relative z-10 flex flex-col items-center pointer-events-none">
                  {fileName ? (
                    <>
                      <FileText size={22} className="text-[#5aa61b] mb-2" />
                      <p className="text-sm font-bold text-gray-700">
                        {fileName}
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload size={22} className="text-[#5aa61b] mb-2" />
                      <p className="text-sm font-bold">
                        Upload Resume (Required)
                      </p>
                    </>
                  )}
                </div>
              </label>

              <textarea
                className="w-full border border-gray-200 bg-gray-50 p-4 rounded-xl text-sm h-24 resize-none outline-none"
                placeholder="Cover Letter (optional)"
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                <div className="flex justify-center sm:justify-start w-full sm:w-auto">
                  <div className="relative z-[70] pointer-events-auto min-h-[78px] min-w-[302px]">
                    <div
                      ref={recaptchaRef}
                      className="scale-90 sm:scale-100 origin-left"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!token || isSubmitting}
                  className={`w-full sm:w-auto h-12 px-8 rounded-xl text-sm font-bold shadow-lg transition-all
                    ${!token ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-[#5aa61b] text-white hover:opacity-90"}`}
                >
                  {isSubmitting ? "Sending..." : "Submit Application"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
// ——— 2. JOB DETAILS MODAL ———
function JobDetailsModal({
  job,
  onApply,
  onClose,
}: {
  job: Job;
  onApply: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-md"
    >
      <div className="absolute inset-0 z-0" onClick={onClose} />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative z-10 w-full sm:max-w-5xl sm:max-h-[90vh] max-h-[95vh] bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col pointer-event-auto"
      >
        <div className="bg-[#5aa61b] px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-3 shrink-0 text-white">
          <h2 className="text-base sm:text-xl font-black truncate">
            {job.position}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              onClick={onApply}
              className="bg-white text-[#5aa61b] hover:bg-gray-100 font-bold px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm"
            >
              Apply
            </Button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/15 hover:bg-white/25"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          <div className="sm:w-2/5 border-b sm:border-r border-gray-100 overflow-y-auto p-5 sm:p-8">
            <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">
              Role Overview
            </p>
            <p className="text-sm sm:text-lg leading-relaxed text-gray-500 font-medium mb-6">
              {job.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border px-3 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50">
                {job.location}
              </span>
              <span className="rounded-full border px-3 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50">
                {job.type}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
            <div>
              <h4 className="font-bold mb-4 flex items-center gap-2 text-[#5aa61b] text-xs uppercase">
                <CheckCircle size={14} /> Requirements
              </h4>
              <ul className="space-y-3">
                {job.requirements.map((r, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-xs sm:text-sm text-gray-500 font-medium"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5aa61b]/50" />{" "}
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ——— 3. JOB CARD ———
function JobCard({
  job,
  onOpen,
  onApply,
}: {
  job: Job;
  onOpen: () => void;
  onApply: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm transition-all hover:shadow-xl hover:border-[#5aa61b]/30"
    >
      <div>
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-[#1a3c2a] group-hover:text-[#5aa61b] transition-colors">
            {job.position}
          </h3>
          <span className="shrink-0 rounded-full bg-[#5aa61b]/10 px-3 py-1 text-[10px] font-bold uppercase text-[#5aa61b]">
            {job.type}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-4">
          {job.description}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase">
          <Calendar size={12} /> Dec 21, 2025
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpen}
            className="rounded-xl border px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50"
          >
            Details
          </button>
          <button
            onClick={onApply}
            className="rounded-xl bg-[#5aa61b] px-3 py-2 text-xs font-bold text-white shadow-lg shadow-[#5aa61b]/20"
          >
            Apply Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ——— PAGINATION ———
function PaginationControls({ currentPage, totalPages, onPrev, onNext }: any) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold text-gray-500 disabled:opacity-30"
      >
        <ChevronLeft size={14} /> Prev
      </button>
      <span className="text-xs font-black text-gray-700">
        {currentPage} / {totalPages || 1}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold text-gray-500 disabled:opacity-30"
      >
        Next <ChevronRight size={14} />
      </button>
    </div>
  );
}

// ——— 4. MAIN CAREERS PAGE ———
export default function CareersPage() {
  const jobs = getJobs();
  const departments = Array.from(
    new Set(["All", ...getJobDepartmentFilters()]),
  );

  const [selectedDept, setSelectedDept] = useState("All");
  const [query, setQuery] = useState("");
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const pageSize = isMobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;
  const filtered = jobs.filter(
    (j) =>
      (selectedDept === "All" || j.department === selectedDept) &&
      j.position.toLowerCase().includes(query.toLowerCase()),
  );
  const totalPages = Math.ceil(filtered.length / pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedDept, isMobile]);

  const paginatedJobs = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent py-16 sm:py-20 lg:py-28">
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
            <h1 className="mb-4 text-balance text-3xl sm:text-4xl font-bold text-foreground md:text-5xl">
              Build Your Career With Us
            </h1>
            <p className="text-pretty text-sm sm:text-base text-muted-foreground md:text-lg">
              Join dedicated healthcare professionals committed to making a
              difference. Competitive benefits, growth opportunities, and a
              supportive environment. (This list uses mock data and can be
              updated with real job opening)
            </p>
          </motion.div>
        </div>
      </section>

      <div className="min-h-screen bg-[#F8FAF8] py-10 px-4">
        <div className="mx-auto max-w-[1400px]">
          <div className="lg:hidden mb-5 flex gap-3">
            <div className="relative flex-1">
              <input
                className="w-full rounded-2xl border bg-white py-3 pl-4 pr-10 text-sm outline-none"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                size={16}
              />
            </div>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={`p-3 rounded-2xl border ${showMobileFilters ? "bg-[#5aa61b] text-white" : "bg-white text-gray-600"}`}
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-[300px]">
              <div className="sticky top-10 space-y-8 bg-white p-8 rounded-3xl border">
                <div>
                  <label className="text-xs font-black uppercase text-gray-400 block mb-2">
                    Search
                  </label>
                  <input
                    className="w-full rounded-2xl border bg-gray-50 p-3 text-sm outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search positions..."
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase text-gray-400 block mb-2">
                    Department
                  </label>
                  <select
                    className="w-full rounded-2xl border bg-gray-50 p-3 text-sm font-bold"
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  onNext={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                />
              </div>
            </aside>

            <div className="flex-1 grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2 h-fit">
              <AnimatePresence mode="wait">
                {paginatedJobs.map((j) => (
                  <JobCard
                    key={j.id}
                    job={j}
                    onOpen={() => setViewingJob(j)}
                    onApply={() => setApplyJob(j)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {viewingJob && (
            <JobDetailsModal
              job={viewingJob}
              onClose={() => setViewingJob(null)}
              onApply={() => {
                setApplyJob(viewingJob);
                setViewingJob(null);
              }}
            />
          )}
          {applyJob && (
            <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
