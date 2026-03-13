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
  ShieldCheck,
  Award,
  Calendar,
  SlidersHorizontal,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getJobs, getJobDepartmentFilters } from "@/lib/mock-api";
import type { Job } from "@/lib/mock-api";
import { useRecaptcha } from "@/hooks/use-recaptcha";

const DESKTOP_PAGE_SIZE = 6;
const MOBILE_PAGE_SIZE = 3;

// ─── 1. APPLY MODAL ───
function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const { token, ref: recaptchaRef } = useRecaptcha();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/40 backdrop-blur-sm"
    >
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative z-10 w-full sm:max-w-4xl bg-white sm:rounded-[2rem] rounded-t-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] sm:max-h-[90vh]"
      >
        <div className="hidden md:flex w-[300px] bg-[#68A32B] p-10 text-white flex-col justify-between shrink-0">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-2">
              Applying For
            </p>
            <h2 className="text-3xl font-black leading-tight mb-10">
              {job.position}
            </h2>
            <div className="space-y-5 mb-12 text-sm font-medium">
              <div className="flex items-center gap-4">
                <Briefcase size={18} /> {job.department}
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={18} /> {job.location}
              </div>
              <div className="flex items-center gap-4">
                <Clock size={18} /> {job.type}
              </div>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-4">
              What to prepare
            </p>
            <ul className="space-y-2 text-[13px] font-medium">
              <li className="flex items-center gap-3">
                <ChevronRight size={14} /> Updated resume/CV
              </li>
              <li className="flex items-center gap-3">
                <ChevronRight size={14} /> Valid contact info
              </li>
              <li className="flex items-center gap-3">
                <ChevronRight size={14} /> Cover letter (optional)
              </li>
            </ul>
          </div>
          <p className="text-[11px] text-white/70 font-medium">
            Your data is handled securely and will not be shared.
          </p>
        </div>

        <div className="md:hidden bg-[#68A32B] px-6 py-5 text-white flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
              Applying for
            </p>
            <h2 className="text-lg font-black leading-tight">{job.position}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-white/15">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 bg-white p-6 md:p-12 overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hidden md:block"
          >
            <X size={22} />
          </button>
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <CheckCircle size={72} className="text-[#68A32B] mb-6" />
              <h3 className="text-2xl font-bold text-gray-900">
                Application Submitted!
              </h3>
              <p className="text-gray-500 mt-2 mb-8 text-sm">
                We'll be in touch soon.
              </p>
              <Button
                onClick={onClose}
                className="bg-[#68A32B] rounded-xl px-12 h-12"
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 hidden md:block">
                <h3 className="text-2xl font-bold">Your Application</h3>
                <p className="text-gray-500 text-sm">
                  Fill in the details below to apply
                </p>
              </div>
              <div className="mt-2 md:mt-0 mb-6">
                <h3 className="text-lg font-bold md:hidden">
                  Your Application
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  className="border border-gray-200 bg-gray-50 p-3.5 rounded-xl text-sm outline-none w-full"
                  placeholder="First Name"
                />
                <input
                  className="border border-gray-200 bg-gray-50 p-3.5 rounded-xl text-sm outline-none w-full"
                  placeholder="Last Name"
                />
                <input
                  className="border border-gray-200 bg-gray-50 p-3.5 rounded-xl text-sm outline-none w-full sm:col-span-2"
                  placeholder="Email Address"
                />
                <input
                  className="border border-gray-200 bg-gray-50 p-3.5 rounded-xl text-sm outline-none w-full sm:col-span-2"
                  placeholder="Phone Number"
                />
              </div>
              <div className="mb-4 border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col items-center bg-gray-50 cursor-pointer">
                <Upload size={22} className="text-[#68A32B] mb-2" />
                <p className="text-sm font-bold">Click to upload resume</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                  PDF, DOC, DOCX — MAX 5MB
                </p>
              </div>
              <textarea
                className="w-full border border-gray-200 bg-gray-50 p-4 rounded-xl text-sm h-24 resize-none mb-6 outline-none"
                placeholder="Cover Letter (optional)"
              />
              <div className="flex items-center justify-between gap-4">
                <div ref={recaptchaRef} className="scale-90 origin-left" />
                <Button
                  onClick={() => setSubmitted(true)}
                  className="bg-[#68A32B] h-12 px-8 rounded-xl text-sm font-bold shadow-lg shadow-[#68A32B]/20 shrink-0"
                >
                  <Briefcase size={16} className="mr-2" /> Submit Application
                </Button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── 2. JOB DETAILS MODAL ───
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
      <div className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative z-10 w-full sm:max-w-5xl sm:max-h-[90vh] max-h-[95vh] bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="bg-[#68A32B] px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shrink-0">
              <ShieldCheck size={11} /> {job.department}
            </div>
            <h2 className="text-base sm:text-xl font-black text-white tracking-tight truncate">
              {job.position}
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={onApply}
              className="bg-white text-[#68A32B] hover:bg-gray-100 font-bold px-4 sm:px-6 py-2 rounded-xl shadow-md text-xs sm:text-sm"
            >
              Apply
            </Button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          <div className="sm:w-2/5 border-b sm:border-b-0 sm:border-r border-gray-100 overflow-y-auto p-5 sm:p-8 flex flex-col gap-4 sm:gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                Role Overview
              </p>
              <p className="text-sm sm:text-lg leading-relaxed text-gray-500 font-medium">
                {job.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: MapPin, label: job.location },
                { icon: Clock, label: job.type },
                { icon: Briefcase, label: "2+ Years" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-500"
                >
                  <item.icon size={11} className="text-[#68A32B]" />{" "}
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            <div className="p-5 sm:p-8">
              <h4 className="font-bold mb-4 flex items-center gap-2 text-[#68A32B] text-xs sm:text-sm uppercase tracking-wide">
                <CheckCircle size={14} /> Requirements
              </h4>
              <ul className="grid grid-cols-1 gap-2.5 sm:gap-3">
                {job.requirements.map((r, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-xs sm:text-sm text-gray-500 font-medium"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#68A32B]/50" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 sm:p-8">
              <h4 className="font-bold mb-4 flex items-center gap-2 text-gray-800 text-xs sm:text-sm uppercase tracking-wide">
                <Award size={14} /> Benefits
              </h4>
              <ul className="grid grid-cols-1 gap-2.5 sm:gap-3">
                {job.benefits.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-xs sm:text-sm text-gray-500 font-medium"
                  >
                    <CheckCircle
                      size={13}
                      className="text-[#68A32B]/60 shrink-0 mt-0.5"
                    />
                    {b}
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

// ─── 3. JOB CARD ───
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
      className="group flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm transition-all hover:shadow-xl hover:border-[#68A32B]/30"
    >
      <div>
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-[#1a3c2a] group-hover:text-[#68A32B] transition-colors leading-tight">
            {job.position}
          </h3>
          <span className="shrink-0 rounded-full bg-[#68A32B]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#68A32B]">
            {job.type}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-3 font-medium">
          <MapPin size={14} className="text-[#68A32B]/60" /> {job.location}
        </div>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 font-medium">
          {job.description}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50 gap-2">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
          <Calendar size={12} className="text-[#68A32B]/40" /> Dec 21, 2025
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpen}
            className="rounded-xl border border-gray-200 px-3 sm:px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Details
          </button>
          <button
            onClick={onApply}
            className="rounded-xl bg-[#68A32B] px-3 sm:px-4 py-2 text-xs font-bold text-white hover:bg-[#598d24] transition-colors shadow-lg shadow-[#68A32B]/20"
          >
            Apply Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── PAGINATION CONTROLS ───
function PaginationControls({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 rounded-xl border border-gray-100 px-4 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={14} /> Prev
      </button>
      <span className="text-xs font-black text-gray-700">
        {currentPage} / {totalPages || 1}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1.5 rounded-xl border border-gray-100 px-4 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        Next <ChevronRight size={14} />
      </button>
    </div>
  );
}

// ─── 4. MAIN CAREERS PAGE ───
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

  // Detect mobile via window width
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

  // Reset to page 1 when filters/search/screen size change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedDept, isMobile]);

  const paginatedJobs = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const handleFilterChange = (dept: string) => {
    setSelectedDept(dept);
    setShowMobileFilters(false);
  };

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
              supportive environment.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="min-h-screen bg-[#F8FAF8] py-10 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-[1400px]">
          {/* ── MOBILE FILTER BAR ── */}
          <div className="lg:hidden mb-5 flex items-center gap-3">
            <div className="relative flex-1">
              <input
                className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-4 pr-10 text-sm outline-none focus:ring-2 ring-[#68A32B]/20 shadow-sm"
                placeholder="Search positions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                size={16}
              />
            </div>
            <button
              onClick={() => setShowMobileFilters((v) => !v)}
              className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-bold shadow-sm transition-colors ${
                showMobileFilters
                  ? "bg-[#68A32B] border-[#68A32B] text-white"
                  : "bg-white border-gray-200 text-gray-600"
              }`}
            >
              <SlidersHorizontal size={14} /> Filter
            </button>
          </div>

          {/* ── MOBILE FILTER DROPDOWN ── */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden mb-5"
              >
                <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Department
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-100 bg-gray-50 py-3 px-4 text-sm outline-none font-bold text-gray-700"
                    value={selectedDept}
                    onChange={(e) => handleFilterChange(e.target.value)}
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── MAIN LAYOUT ── */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* SIDEBAR — desktop only */}
            <aside className="hidden lg:block w-[300px] shrink-0">
              <div className="sticky top-10 rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
                <div className="space-y-8">
                  <div>
                    <label className="mb-3 block text-xs font-black uppercase tracking-widest text-gray-400">
                      Search
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-2xl border border-gray-100 bg-gray-50 py-3 pl-4 pr-12 text-sm outline-none focus:ring-2 ring-[#68A32B]/20 transition-all"
                        placeholder="Search positions..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                      <Search
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
                        size={18}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-3 block text-xs font-black uppercase tracking-widest text-gray-400">
                      Department
                    </label>
                    <select
                      className="w-full rounded-2xl border border-gray-100 bg-gray-50 py-3.5 px-4 text-sm outline-none focus:ring-2 ring-[#68A32B]/20 appearance-none font-bold text-gray-700"
                      value={selectedDept}
                      onChange={(e) => handleFilterChange(e.target.value)}
                    >
                      {departments.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Desktop pagination in sidebar */}
                  <div>
                    <label className="mb-3 block text-xs font-black uppercase tracking-widest text-gray-400">
                      Page
                    </label>
                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPrev={handlePrev}
                      onNext={handleNext}
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* JOB GRID */}
            <div className="flex-1 flex flex-col gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentPage}-${selectedDept}-${query}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-2"
                >
                  {paginatedJobs.map((j) => (
                    <JobCard
                      key={j.id}
                      job={j}
                      onOpen={() => setViewingJob(j)}
                      onApply={() => setApplyJob(j)}
                    />
                  ))}
                  {filtered.length === 0 && (
                    <div className="col-span-full py-16 text-center rounded-3xl bg-white border border-dashed border-gray-200">
                      <Briefcase
                        size={36}
                        className="mx-auto text-gray-200 mb-4"
                      />
                      <p className="text-gray-400 font-bold text-sm">
                        No positions found.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Mobile pagination — below cards */}
              {totalPages > 1 && (
                <div className="lg:hidden">
                  <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPrev={handlePrev}
                      onNext={handleNext}
                    />
                  </div>
                </div>
              )}
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
