"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Search,
  ChevronRight,
  Calendar,
  Bookmark,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  getDepartmentBySlug,
  getDepartments,
  slugify,
} from "@/lib/mock-api/departments";
import { getNews } from "@/lib/mock-api/news";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";

export default function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const allDepartments = getDepartments();
  const department = getDepartmentBySlug(slug);
  const recentNews = getNews().slice(0, 5);

  if (!department)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0a2e1a] mb-4">
            Unit Not Found
          </h1>
          <Button asChild className="bg-[#5CA51B]">
            <Link href="/departments">Return to Departments</Link>
          </Button>
        </div>
      </div>
    );

  // ─── NAVIGATION LOGIC ───
  const currentIndex = allDepartments.findIndex((d) => d.id === department.id);
  const prevDept =
    allDepartments[
      (currentIndex - 1 + allDepartments.length) % allDepartments.length
    ];
  const nextDept = allDepartments[(currentIndex + 1) % allDepartments.length];

  return (
    <div className="bg-[#f7f9f7] min-h-screen pb-24">
      <div className="mx-auto max-w-7xl px-4 pt-10">
        {/* 1. BREADCRUMBS */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Departments", href: "/departments" },
              { label: department.name },
            ]}
            className="text-slate-400"
          />
        </motion.div>

        {/* 2. HEADER */}
        <motion.header
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#5CA51B]/10 text-[#5CA51B] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CA51B]" />
            Specialized Medical Unit
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0a2e1a] leading-tight max-w-2xl">
            {department.name}
          </h1>
          <p className="mt-3 text-sm text-slate-400 italic">
            &nbsp;·&nbsp; Specialized Medical Units
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* ─── LEFT COLUMN ─── */}
          <main className="lg:col-span-8 space-y-10">
            {/* 4. FEATURED IMAGE */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-3xl overflow-hidden shadow-md border border-slate-100"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={department.image || "/placeholder.jpg"}
                  alt={department.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* 3. DESCRIPTION (Clean, No Container) */}
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="py-4" // Simple padding instead of a card
            >
              <div className="flex items-center gap-2 mb-6 text-[#5CA51B]">
                <Bookmark size={14} />
                <p className="text-[10px] font-bold uppercase tracking-widest">
                  About the unit
                </p>
              </div>
              <p className="text-[17px] leading-relaxed text-slate-600">
                {department.description}
              </p>
            </motion.section>

            {/* 5. FULL-WIDTH NAVIGATION (Pushed to Edges) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="w-full border-y border-slate-100 py-12 my-12 flex justify-between items-center"
            >
              {/* Previous Button - Pushed to Far Left */}
              <Link
                href={`/departments/${slugify(prevDept.name)}`}
                className="group flex items-center gap-3 sm:gap-5 transition-all text-left"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#5CA51B] group-hover:border-[#5CA51B] transition-all shrink-0">
                  <ArrowLeft
                    size={18}
                    className="text-[#0a2e1a] group-hover:text-white transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  {/* Label: smaller on mobile */}
                  <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 leading-none">
                    Previous Unit
                  </span>
                  {/* Title: base size is smaller, grows on sm screens */}
                  <span className="text-sm sm:text-xl font-bold text-[#0a2e1a] group-hover:text-[#5CA51B] transition-colors leading-tight">
                    {prevDept.name}
                  </span>
                </div>
              </Link>

              {/* Next Button - Pushed to Far Right */}
              <Link
                href={`/departments/${slugify(nextDept.name)}`}
                className="group flex items-center gap-3 sm:gap-5 transition-all text-right"
              >
                <div className="flex flex-col items-end">
                  {/* Label: smaller on mobile */}
                  <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 leading-none">
                    Next Unit
                  </span>
                  {/* Title: base text-sm for mobile, text-xl for 640px+ */}
                  <span className="text-sm sm:text-xl font-bold text-[#0a2e1a] group-hover:text-[#5CA51B] transition-colors leading-tight">
                    {nextDept.name}
                  </span>
                </div>
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#5CA51B] group-hover:border-[#5CA51B] transition-all shrink-0">
                  <ArrowRight
                    size={18}
                    className="text-[#0a2e1a] group-hover:text-white transition-colors"
                  />
                </div>
              </Link>
            </motion.div>

            {/* 8. RELATED UNITS */}
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8"
            >
              <h3 className="text-xl font-bold text-[#0a2e1a] mb-8">
                Related Units
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {allDepartments
                  .filter((d) => d.id !== department.id)
                  .slice(0, 2)
                  .map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/departments/${slugify(rel.name)}`}
                      className="group block rounded-2xl overflow-hidden border border-slate-100 hover:border-[#5CA51B]/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={rel.image || ""}
                          alt={rel.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e1a]/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="text-white font-bold text-sm">
                            {rel.name}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </motion.section>
          </main>

          {/* ─── SIDEBAR ─── */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 h-fit">
            {/* SEARCH */}
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search unit..."
                  className="w-full rounded-2xl border-none bg-slate-50 p-4 pl-12 text-sm font-medium focus:ring-2 focus:ring-[#5CA51B]/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* CATEGORIES CARD */}
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-[#0a2e1a] mb-6 border-l-4 border-[#5CA51B] pl-4">
                Categories
              </h3>
              <div className="space-y-1.5">
                {allDepartments.map((dept) => {
                  const isActive = dept.name === department.name;
                  return (
                    <Link
                      key={dept.id}
                      href={`/departments/${slugify(dept.name)}`}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all ${
                        isActive
                          ? "bg-[#5CA51B] text-white shadow-lg"
                          : "text-slate-600 hover:bg-slate-50 hover:text-[#5CA51B]"
                      }`}
                    >
                      <span className="font-bold">{dept.name}</span>
                      <ChevronRight
                        size={14}
                        className={isActive ? "opacity-100" : "opacity-30"}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* RECENT POSTS CARD */}
            <div className="rounded-3xl bg-white p-8 shadow-xl text-green-800 overflow-hidden relative">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#5CA51B]/10 blur-2xl" />
              <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                <Calendar size={18} className="text-shadow-green-700" />
                Recent Updates
              </h3>
              <div className="space-y-6">
                {recentNews.map((post) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className="group block"
                  >
                    <h4 className="text-xs font-bold uppercase text-primary leading-snug transition-colors">
                      {post.title}
                    </h4>
                    <p className="mt-1.5 text-[12px] font-semibold text-green-700 uppercase">
                      {post.date}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
