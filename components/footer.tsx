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
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-background text-foreground">
      {/* Top CTA band */}
      <div className="bg-primary px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <p className="text-lg font-bold text-primary-foreground">
              Need medical assistance?
            </p>
            <p className="text-sm text-primary-foreground/70">
              Our team is available 24/7 for emergencies.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:028251-6922"
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/25"
            >
              <Phone className="h-4 w-4" />
              (02) 8251-6922
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary-foreground/90"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Main body — light bg so logo is visible */}
      <div className="relative border-t border-border bg-card overflow-hidden">
        {/* Dot grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Floating accent shapes */}
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-bl-[80px] bg-primary/3" />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full border border-primary/8" />
        <div className="pointer-events-none absolute right-1/3 top-12 h-6 w-6 rotate-45 rounded-sm border border-primary/10" />
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
            {/* Brand */}
            <div className="lg:col-span-4">
              <Link href="/" className="mb-5 inline-block">
                <img
                  src="/metrodocs-logo-new.png"
                  alt="Metro Docs Hospital"
                  className="h-12 w-auto"
                />
              </Link>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Delivering compassionate, world-class healthcare with
                cutting-edge technology and trusted medical professionals
                dedicated to your well-being.
              </p>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Quick Links
              </p>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-primary"
                    >
                      <ChevronRight className="h-3 w-3 shrink-0 opacity-0 transition-all group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Departments */}
            <div className="lg:col-span-3">
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Departments
              </p>
              <ul className="space-y-2.5">
                {departments.map((dept) => (
                  <li key={dept.name}>
                    <Link
                      href={dept.href}
                      className="group flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-primary"
                    >
                      <ChevronRight className="h-3 w-3 shrink-0 opacity-0 transition-all group-hover:opacity-100" />
                      {dept.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <p className="mb-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Contact Us
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm leading-snug text-foreground/70">
                    156 Marick Dr, Santo Domingo,
                    <br />
                    Cainta, 1900 Rizal
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-sm text-foreground/70">
                    <p>(02) 8251-6922</p>
                    <p>(02) 8532-6505</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground/70">
                    info@metrodocshospital.com.ph
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-sm text-foreground/70">
                    <p>Mon: 8:00 AM – 8:00 PM</p>
                    <p>Wed & Fri: 7:00 AM – 7:00 PM</p>
                    <p>Tue, Thu & Sat: 6:00 AM – 6:00 PM</p>
                    <p className="mt-1 font-semibold text-primary">
                      Hospital: 24/7
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground md:flex-row">
            <div className="flex items-center gap-1.5">
              <p>
                &copy; {new Date().getFullYear()} Metro Rizal Doctors Hospital.
                All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href="/privacy"
                className="transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <span className="mx-2 opacity-30">·</span>
              <Link
                href="/terms"
                className="transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
