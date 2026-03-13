"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "/about",
    dropdown: [
      { name: "Our Mission", href: "/about" },
      { name: "Rehab Room", href: "/about/rehab-room" },
      { name: "Radiology Room", href: "/about/radiology-room" },
      { name: "Emergency Room", href: "/about/emergency-room" },
      { name: "Second Floor", href: "/about/second-floor" },
      { name: "Third Floor", href: "/about/third-floor" },
      { name: "Fourth Floor", href: "/about/fourth-floor" },
    ],
  },
  { name: "Departments", href: "/departments" },
  { name: "Doctors", href: "/doctors" },
  { name: "News & Events", href: "/news" },
  { name: "Careers", href: "/careers" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string, dropdown?: { href: string }[]) => {
    if (href === "/") return pathname === "/";
    if (pathname.startsWith(href)) return true;
    if (dropdown?.some((d) => pathname.startsWith(d.href))) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="flex items-center gap-5 text-xs">
            <a
              href="tel:028251-6922"
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>(02) 8251-6922 | (02) 8532-6505</span>
            </a>
            <span className="hidden h-3 w-px bg-primary-foreground/30 sm:block" />
            <div className="hidden items-center gap-1.5 sm:flex">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs">24/7 Emergency Services</span>
            </div>
          </div>
          <p className="hidden text-xs text-primary-foreground/80 sm:block">
            Quality health services. Affordable for all.
          </p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <img
              src="/metrodocs-logo-new.png"
              alt="Metro Docs Hospital"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href, item.dropdown);
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.dropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                  onClick={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180" : ""}`}
                      />
                    )}
                    {/* Active underline */}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full z-50 min-w-[210px] overflow-hidden rounded-xl border border-border bg-card shadow-lg"
                      >
                        {/* Dropdown header accent */}
                        <div className="h-0.5 w-full bg-primary" />
                        <div className="p-1.5">
                          {item.dropdown.map((subItem) => {
                            const subActive =
                              pathname === subItem.href ||
                              pathname.startsWith(subItem.href + "/");
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => setActiveDropdown(null)}
                                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                                  subActive
                                    ? "bg-primary/10 font-semibold text-primary"
                                    : "text-card-foreground hover:bg-accent"
                                }`}
                              >
                                <ChevronRight
                                  className={`h-3 w-3 shrink-0 ${subActive ? "text-primary" : "text-muted-foreground"}`}
                                />
                                {subItem.name}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button size="sm" asChild>
                <Link href="/contact">Book Appointment</Link>
              </Button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent lg:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-border bg-background lg:hidden"
            >
              <div className="px-4 pb-5 pt-3">
                {navItems.map((item) => {
                  const active = isActive(item.href, item.dropdown);
                  const mobileOpen = mobileDropdown === item.name;

                  return (
                    <div
                      key={item.name}
                      className="border-b border-border last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          onClick={() => {
                            setIsOpen(false);
                            setMobileDropdown(null);
                          }}
                          className={`flex-1 py-3 text-sm font-medium transition-colors ${
                            active ? "text-primary" : "text-foreground"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {active && (
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            )}
                            {item.name}
                          </span>
                        </Link>
                        {item.dropdown && (
                          <button
                            onClick={() =>
                              setMobileDropdown(mobileOpen ? null : item.name)
                            }
                            className="p-2 text-muted-foreground"
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Mobile dropdown */}
                      <AnimatePresence>
                        {item.dropdown && mobileOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mb-3 ml-4 flex flex-col gap-1 border-l-2 border-primary/20 pl-3">
                              {item.dropdown.map((subItem) => {
                                const subActive = pathname === subItem.href;
                                return (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`rounded-lg py-1.5 pl-2 text-sm transition-colors ${
                                      subActive
                                        ? "font-semibold text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                  >
                                    {subItem.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <Button asChild className="mt-4 w-full">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Book Appointment
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
