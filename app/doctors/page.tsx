"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { slugify } from "@/lib/mock-api";
import {
  Search,
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

// ---------- Pagination Component (Stay in Section Style) ----------
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex-1 rounded-full border border-gray-100 bg-primary py-2 text-[11px] font-bold text-white transition-all"
      >
        Prev
      </button>

      <span className="text-[11px] font-bold text-gray-500 min-w-[40px] text-center">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="flex-1 rounded-full border border-gray-100 bg-primary py-2 text-[11px] font-bold text-white transition-all"
      >
        Next
      </button>
    </div>
  );
}

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
        <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/60">
            <Image
              src={imgSrc}
              alt={`Photo of ${doctor.name}`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgSrc("/doctors/placeholder-doctor.jpg")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute left-3 top-3">
              <span className="rounded-full border border-primary/30 bg-[#68A32B] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                {doctor.department}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-base font-bold leading-tight text-white">
                {doctor.name}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-white/70">
                {doctor.specialty}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 text-xs text-muted-foreground">
            <p className="line-clamp-1 flex-1">{doctor.bio}</p>
            <ArrowRight className="h-3.5 w-3.5 text-primary" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function DoctorsPage() {
  const doctors = getDoctors();
  const departments = Array.from(
    new Set(["All", ...getDoctorDepartmentFilters()]),
  );
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 1. THIS REF IS KEY TO STAYING IN SECTION
  const gridRef = useRef<HTMLDivElement>(null);
  const DOCTORS_PER_PAGE = useDoctorsPerPage();

  // 2. IMPROVED SCROLL LOGIC
  const scrollToGrid = () => {
    if (gridRef.current) {
      // scrolls the top of the grid to the top of the screen
      // block: "start" ensures we stay in the grid view
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
    // Don't scroll on search usually, as it feels jarring while typing
  };

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

      {/* Main Grid Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="sticky top-24 space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      className="w-full rounded-xl border border-input bg-background py-2 pl-8 pr-3 text-sm"
                      placeholder="Find a doctor..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Department
                  </label>
                  <select
                    className="w-full rounded-xl border border-input bg-background p-2 text-sm outline-none"
                    value={selectedDepartment}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* INTEGRATED SIDEBAR PAGINATION */}
                <div>
                  <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Page
                  </label>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page);
                      scrollToGrid(); // Keeps you in the grid section
                    }}
                  />
                </div>
              </div>
            </aside>

            {/* Grid Content - Targeted by gridRef */}
            <div ref={gridRef} className="flex-1 scroll-mt-24">
              {paginatedDoctors.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedDoctors.map((doc, i) => (
                    <DoctorCard key={doc.id} doctor={doc} index={i} />
                  ))}
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed text-muted-foreground">
                  No doctors found.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
