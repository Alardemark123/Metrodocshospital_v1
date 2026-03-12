"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { slugify } from "@/lib/mock-api";
import {
  Search,
  Star,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDoctors, getDoctorDepartmentFilters } from "@/lib/mock-api";
import type { Doctor } from "@/lib/mock-api";
import Image from "next/image";

function useDoctorsPerPage() {
  const [perPage, setPerPage] = useState(6);
  useEffect(() => {
    const update = () => setPerPage(window.innerWidth < 768 ? 3 : 6);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perPage;
}

function DoctorCard({ doctor, index }: { doctor: Doctor; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [imgSrc, setImgSrc] = useState("/doctors/placeholder-doctor.jpg");

  useEffect(() => {
    const isExternal = doctor.image?.startsWith("http");
    setImgSrc(
      isExternal
        ? "/doctors/placeholder-doctor.jpg"
        : doctor.image || "/doctors/placeholder-doctor.jpg",
    );
  }, [doctor.image]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={`/doctors/${slugify(doctor.name)}`}
        className="group block h-full"
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/60">
            <Image
              src={imgSrc}
              alt={`Photo of ${doctor.name}`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgSrc("/doctors/placeholder-doctor.jpg")}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

            {/* Rating badge */}
            {doctor.rating > 0 && (
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 shadow backdrop-blur-sm">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold text-foreground">
                  {doctor.rating}
                </span>
              </div>
            )}

            {/* Department pill */}
            <div className="absolute left-3 top-3">
              <span className="rounded-full border border-primary/30 bg-primary/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {doctor.department}
              </span>
            </div>

            {/* Bottom name + specialty + experience */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-base font-bold leading-tight text-white">
                {doctor.name}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-white/70">
                {doctor.specialty}
              </p>
              {doctor.experience && doctor.experience !== "0" && (
                <span className="mt-2 inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm">
                  {doctor.experience}
                </span>
              )}
            </div>
          </div>

          {/* Info footer */}
          <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
            <p className="line-clamp-1 text-xs text-muted-foreground flex-1">
              {doctor.bio}
            </p>
            <span className="shrink-0 rounded-full bg-primary/10 p-1.5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    if (currentPage <= 3) return pages.slice(0, 5);
    if (currentPage >= totalPages - 2) return pages.slice(totalPages - 5);
    return pages.slice(currentPage - 3, currentPage + 2);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-sm text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            1
          </button>
          {visiblePages[0] > 2 && (
            <span className="px-1 text-sm text-muted-foreground">…</span>
          )}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-medium transition-all ${
            currentPage === page
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-card text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          {page}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-1 text-sm text-muted-foreground">…</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-sm text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function DoctorsPage() {
  const doctors = getDoctors();
  const departments = getDoctorDepartmentFilters();
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const DOCTORS_PER_PAGE = useDoctorsPerPage();

  const scrollToGrid = () => {
    setTimeout(() => {
      if (gridRef.current) {
        const top =
          gridRef.current.getBoundingClientRect().top + window.scrollY - 170;
        window.scrollTo({
          top: Math.min(top, document.body.scrollHeight - window.innerHeight),
          behavior: "smooth",
        });
      }
    }, 50);
  };

  const handleDepartmentChange = (dept: string) => {
    setSelectedDepartment(dept);
    setCurrentPage(1);
    setIsSidebarOpen(false);
    scrollToGrid();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    scrollToGrid();
  };

  const clearFilters = () => {
    setSelectedDepartment("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const isFiltered = selectedDepartment !== "All" || searchQuery !== "";

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesDepartment =
      selectedDepartment === "All" || doctor.department === selectedDepartment;
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const totalPages = Math.ceil(filteredDoctors.length / DOCTORS_PER_PAGE);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * DOCTORS_PER_PAGE,
    currentPage * DOCTORS_PER_PAGE,
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
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
              <Stethoscope className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Our Medical Team
              </span>
            </div>
            <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
              Meet Our Expert Doctors
            </h1>
            <p className="text-pretty text-base text-muted-foreground md:text-lg">
              Board-certified physicians dedicated to providing exceptional,
              compassionate care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main ── */}
      <section className="bg-background py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-8">
            {/* ── Sidebar ── */}
            <aside className="hidden w-56 shrink-0 lg:block">
              <div className="sticky top-[160px] overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="border-b border-border bg-secondary/50 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      Filters
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  {/* Search */}
                  <div className="mb-4">
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Name or specialty..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full rounded-lg border border-input bg-background py-2 pl-8 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => handleSearch("")}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Department
                    </label>
                    <div className="flex max-h-72 flex-col gap-0.5 overflow-y-auto pr-1">
                      {departments.map((dept) => (
                        <button
                          key={dept}
                          onClick={() => handleDepartmentChange(dept)}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            selectedDepartment === dept
                              ? "bg-primary font-semibold text-primary-foreground"
                              : "text-foreground hover:bg-accent"
                          }`}
                        >
                          <span>{dept}</span>
                          {selectedDepartment === dept && (
                            <span className="ml-2 h-1.5 w-1.5 rounded-full bg-primary-foreground/70" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isFiltered && (
                      <motion.button
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        onClick={clearFilters}
                        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <X className="h-3.5 w-3.5" />
                        Clear Filters
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </aside>

            {/* ── Mobile filter button ── */}
            <div className="fixed bottom-6 right-6 z-50 lg:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
              >
                <Filter className="h-4 w-4" />
                {isFiltered ? "Filters •" : "Filter"}
              </motion.button>
            </div>

            {/* ── Mobile drawer ── */}
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 lg:hidden"
                >
                  <div
                    className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                  />
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="absolute bottom-0 left-0 right-0 rounded-t-2xl border-t border-border bg-card p-6 shadow-xl"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-lg font-semibold">Filters</span>
                      <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Name or specialty..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="grid max-h-56 grid-cols-2 gap-2 overflow-y-auto pb-1">
                      {departments.map((dept) => (
                        <button
                          key={dept}
                          onClick={() => handleDepartmentChange(dept)}
                          className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                            selectedDepartment === dept
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground hover:bg-accent"
                          }`}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>
                    {isFiltered && (
                      <button
                        onClick={clearFilters}
                        className="mt-4 w-full rounded-lg border border-border py-2 text-sm text-muted-foreground hover:bg-accent"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Grid ── */}
            <div ref={gridRef} className="min-w-0 flex-1 scroll-mt-8">
              {/* Toolbar */}
              <div className="mb-6 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                <p className="text-sm text-muted-foreground">
                  {isFiltered ? (
                    <>
                      <span className="font-semibold text-foreground">
                        {filteredDoctors.length}
                      </span>{" "}
                      doctor{filteredDoctors.length !== 1 ? "s" : ""} found
                      <span className="ml-1 text-primary">
                        {selectedDepartment !== "All"
                          ? `· ${selectedDepartment}`
                          : ""}
                        {searchQuery ? `· "${searchQuery}"` : ""}
                      </span>
                    </>
                  ) : (
                    "Showing all doctors"
                  )}
                </p>
                {isFiltered && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    <X className="h-3.5 w-3.5" />
                    Clear
                  </button>
                )}
              </div>

              {paginatedDoctors.length > 0 ? (
                <>
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {paginatedDoctors.map((doctor, index) => (
                      <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        index={index}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-8 flex flex-col items-center gap-3">
                      <p className="text-xs text-muted-foreground">
                        Page {currentPage} of {totalPages} &nbsp;·&nbsp; Showing{" "}
                        {(currentPage - 1) * DOCTORS_PER_PAGE + 1}–
                        {Math.min(
                          currentPage * DOCTORS_PER_PAGE,
                          filteredDoctors.length,
                        )}{" "}
                        of {filteredDoctors.length}
                      </p>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                          setCurrentPage(page);
                          scrollToGrid();
                        }}
                      />
                    </div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center"
                >
                  <div className="mb-4 rounded-full bg-secondary p-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="mb-1 font-semibold text-foreground">
                    No doctors found
                  </p>
                  <p className="mb-5 text-sm text-muted-foreground">
                    Try adjusting your search or filters.
                  </p>
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="pointer-events-none absolute -left-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-primary-foreground/10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-balance text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to Book an Appointment?
            </h2>
            <p className="mb-8 text-primary-foreground/80">
              Schedule a consultation with one of our expert physicians today.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Book Appointment</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
