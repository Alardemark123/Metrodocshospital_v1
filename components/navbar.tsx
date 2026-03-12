"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Phone, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(02) 8251-6922 | (02) 8532-6505</span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <Clock className="h-4 w-4" />
              <span>24/7 Emergency Services</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">We provide quality health services. Affordable for all.</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">
                <img src="metrodocs-logo-new.png" alt="Logo" /></span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="h-4 w-4" />}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full z-50 min-w-[200px] rounded-lg border border-border bg-card p-2 shadow-lg"
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block rounded-md px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild>
              <Link href="/contact">Book Appointment</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border bg-background lg:hidden"
            >
              <div className="flex flex-col px-4 py-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-3 text-foreground"
                      onClick={() => !item.dropdown && setIsOpen(false)}
                    >
                      {item.name}
                      {item.dropdown && <ChevronDown className="h-4 w-4" />}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 flex flex-col border-l border-border pl-4">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="py-2 text-sm text-muted-foreground hover:text-foreground"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button asChild className="mt-4">
                  <Link href="/contact">Book Appointment</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
