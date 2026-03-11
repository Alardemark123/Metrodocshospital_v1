import Link from "next/link";
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
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
    <footer className="bg-foreground text-background">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-base font-bold leading-tight text-background">
                  metrodocshospital
                </p>
                <p className="text-xs text-background/50">Hospital</p>
              </div>
            </Link>

            <p className="mb-6 text-sm leading-relaxed text-background/60">
              Delivering compassionate, world-class healthcare with cutting-edge
              technology and trusted medical professionals dedicated to your
              well-being.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 text-background/70 transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-background/40">
              Quick Links
            </p>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1 text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div className="lg:col-span-3">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-background/40">
              Departments
            </p>
            <ul className="space-y-2">
              {departments.map((dept) => (
                <li key={dept.name}>
                  <Link
                    href={dept.href}
                    className="group flex items-center gap-1 text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                    {dept.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-background/40">
              Contact Us
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/20">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm leading-snug text-background/70">
                  156 Marick Dr, Santo Domingo,
                  <br />
                  Cainta, 1900 Rizal
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/20">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="text-sm text-background/70">
                  <p>(02) 8251-6922</p>
                  <p>(02) 8532-6505</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/20">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm text-background/70">
                  info@metrodocshospital.com.ph
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/20">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="text-sm text-background/70">
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

      {/* Divider */}
      <div className="border-t border-background/10" />

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-background/40 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} metrodocshospital. All rights
            reserved.
          </p>
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
    </footer>
  );
}
