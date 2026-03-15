import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  Heart,
} from "lucide-react";

import {
  getContactInfo,
  getExtraPhones,
  getOfficeHours,
} from "@/lib/mock-api/contact";
const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Departments", href: "/departments" },
  { name: "Doctors", href: "/doctors" },
  { name: "News & Events", href: "/news" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const departments = [
  { name: "Emergency Department", href: "/departments#emergency" },
  { name: "Cardiology", href: "/departments#cardiology" },
  { name: "Radiology", href: "/departments#radiology" },
  { name: "Pediatrics", href: "/departments#pediatrics" },
  { name: "Internal Medicine", href: "/departments#internal-medicine" },
  { name: "Rehabilitation", href: "/departments#rehabilitation" },
];

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/metrorizaldoctors",
  },
];
const contact = getContactInfo();
const phones = getExtraPhones();
const hours = getOfficeHours();

export function Footer() {
  return (
    <footer className="bg-background text-foreground">
      {/* Top CTA band */}
      <div className="bg-primary px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-primary-foreground">
              Need medical assistance?
            </p>
            <p className="text-sm text-primary-foreground/70">
              Our team is available 24/7 for emergencies.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <a
              href="tel:028251-6922"
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/25"
            >
              <Phone className="h-4 w-4" />
              (02) 8251-6922
            </a>
          </div>
        </div>
      </div>

      {/* Main body */}
      <div className="relative border-t border-border bg-card overflow-hidden">
        {/* Background accents */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 text-center md:text-left items-center md:items-start">
            {/* Brand */}
            <div className="lg:col-span-4 flex flex-col items-center md:items-start">
              <Link href="/" className="mb-2 inline-block">
                <img
                  src="/metrodocs-logo-new.png"
                  alt="Metro Docs Hospital"
                  className="h-20 w-auto"
                />
              </Link>
              <p className="mb-3 text-sm leading-relaxed text-gray-600 text-center md:text-left">
                Delivering compassionate, world-class healthcare with cutting-edge technology 
                and trusted medical professionals dedicated to your well-being.
              </p>
               {/* Follow us */}
               <p className="mt-3 mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Follow Us on Social Media
              </p>
              <div className="flex gap-2 justify-center md:justify-start">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    target="_black"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Quick Links
              </p>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-center md:justify-start gap-1.5 text-sm text-foreground/70 transition-colors hover:text-primary"
                    >
                      <ChevronRight className="hidden md:block h-3 w-3 shrink-0 opacity-0 transition-all group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Departments */}
            <div className="lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Departments
              </p>
              <ul className="space-y-2.5">
                {departments.map((dept) => (
                  <li key={dept.name}>
                    <Link
                      href={dept.href}
                      className="group flex items-center justify-center md:justify-start gap-1.5 text-sm text-foreground/70 transition-colors hover:text-primary"
                    >
                      <ChevronRight className="hidden md:block h-3 w-3 shrink-0 opacity-0 transition-all group-hover:opacity-100" />
                      {dept.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Contact Us
              </p>
              <ul className="space-y-4">
                <li className="flex flex-col items-center md:flex-row md:items-start gap-3 text-center md:text-left">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary transition-colors">
                    <MapPin className="h-4 w-4 text-white transition-colors hover:text-primary-foreground" />
                  </div>
                  <span className="text-sm leading-snug text-foreground/70">
                    {contact.address}
                  </span>
                </li>
                <li className="flex flex-col items-center md:flex-row md:items-start gap-3 text-center md:text-left">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary transition-colors">
                    <Phone className="h-4 w-4 text-white transition-colors hover:text-primary-foreground" />
                  </div>
                  <div className="text-sm leading-snug text-foreground/70">
                    {phones.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </li>
                <li className="flex flex-col items-center md:flex-row md:items-start gap-3 text-center md:text-left">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary transition-colors">
                    <Mail className="h-4 w-4 text-white transition-colors hover:text-primary-foreground" />
                  </div>
                  <span className="text-sm leading-snug text-foreground/70">
                    {contact.email}
                  </span>
                </li>
                <li className="flex flex-col items-center md:flex-row md:items-start gap-3 text-center md:text-left">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary transition-colors">
                    <Clock className="h-4 w-4 text-white transition-colors hover:text-primary-foreground" />
                  </div>
                  <div className="text-sm leading-snug text-foreground/70">
                    {hours.map((h) => (
                      <p
                        key={h.label}
                        className={
                          h.highlight 
                          ? "inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white"
                          : "text-sm text-foreground/70"}
                      >
                        {h.highlight ? `Hospital: ${h.hours}` : `${h.label}: ${h.hours}`}
                      </p>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-border py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Metro Rizal Doctors Hospital. All rights reserved.
        <span className="ml-2">
          Developed by{" "}
          <a 
            href="https://www.apgitsolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            AP Global IT Solutions, Inc.
          </a>
        </span>
      </div>
    </footer>
  );
}

