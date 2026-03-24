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
    <footer className="bg-primary/95 text-white pt-20 md:pt-28">
      {/* Main body */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pb-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12 text-center md:text-left items-center md:items-start">
            {/* Logo */}
            <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
              <Link href="/" className=" flex items-center shrink-0 self-start md:self-auto">
                <div className="h-16 w-16 flex items-center justify-center p-1 bg-white rounded-full shrink-0">
                  <img
                    src="/metro-logo-2.png"
                    alt="Metro Rizal Doctors Hospital"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="ml-3 flex flex-col items-start">   
                  <span className="text-base font-bold text-white leading-none drop-shadow-sm text-left">
                    Metro Rizal
                  </span>
                  <span className="text-base font-bold text-white opacity-90 leading-none mt-1 tracking-wider drop-shadow-sm text-left">
                    Doctors Hospital
                  </span>
                </div>
              </Link>

              <p className="mb-3 mt-3 text-sm font-medium leading-relaxed text-white max-w-xs drop-shadow-sm">
                Delivering compassionate, world-class healthcare with cutting-edge technology and trusted medical professionals.
              </p>
               {/* Follow us */}
              <div className="flex gap-2 justify-center md:justify-start mt-1">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    target="_black"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffffff33] text-white transition-all shadow-sm hover:bg-white hover:text-primary hover:shadow-md hover:-translate-y-1"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-white drop-shadow-sm">
                Quick Links
              </p>
              <ul className="space-y-1.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-center md:justify-start gap-2 text-sm font-medium text-white transition-all hover:text-white hover:translate-x-1 hover:drop-shadow-md duration-300"
                    >
                      <ChevronRight className="hidden md:block h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:opacity-100 text-white" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Departments */}
            <div className="lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-white drop-shadow-sm">
                Departments
              </p>
              <ul className="space-y-1.5">
                {departments.map((dept) => (
                  <li key={dept.name}>
                    <Link
                      href={dept.href}
                      className="group flex items-center justify-center md:justify-start gap-2 text-sm font-medium text-white transition-all hover:text-white hover:translate-x-1 hover:drop-shadow-md duration-300"
                    >
                      <ChevronRight className="hidden md:block h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:opacity-100 text-white" />
                      {dept.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-white drop-shadow-sm">
                Contact Us
              </p>
              <ul className="space-y-2">
                <li className="flex flex-col items-center md:flex-row md:items-start gap-3 text-center md:text-left group">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ffffff33] transition-colors group-hover:bg-white">
                    <MapPin className="h-4 w-4 text-white transition-colors group-hover:text-primary" />
                  </div>
                  <span className="text-sm font-medium leading-relaxed text-white">
                    {contact.address}
                  </span>
                </li>
                <li className="flex flex-col items-center md:flex-row md:items-start gap-3 text-center md:text-left group">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ffffff33] transition-colors group-hover:bg-white">
                    <Phone className="h-4 w-4 text-white transition-colors group-hover:text-primary" />
                  </div>
                  <div className="text-sm font-medium leading-relaxed text-white">
                    {phones.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </li>
                <li className="flex flex-col items-center md:flex-row md:items-start gap-3 text-center md:text-left group">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ffffff33] transition-colors group-hover:bg-white">
                    <Mail className="h-4 w-4 text-white transition-colors group-hover:text-primary" />
                  </div>
                  <span className="text-sm font-medium leading-relaxed text-white">
                    {contact.email}
                  </span>
                </li>
                <li className="flex flex-col items-center md:flex-row md:items-start gap-3 text-center md:text-left group">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ffffff33] transition-colors group-hover:bg-white">
                    <Clock className="h-4 w-4 text-white transition-colors group-hover:text-primary" />
                  </div>
                  <div className="text-sm font-medium leading-relaxed text-white">
                    {hours.map((h) => (
                      <p
                        key={h.label}
                        className={
                          h.highlight 
                          ? "inline-block rounded-md bg-white text-primary px-2 py-0.5 text-xs font-bold mb-1 shadow-sm"
                          : "text-sm text-white"}
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
      <div className="border-t border-white/20 bg-black/10 py-4 text-center text-xs font-medium text-white/90">
        © {new Date().getFullYear()} Metro Rizal Doctors Hospital. All rights reserved.
        <span className="ml-2 inline-block mt-1 sm:mt-0">
          Developed by{" "}
          <a 
            href="https://www.apgitsolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-bold hover:underline transition-all"
          >
            AP Global IT Solutions, Inc.
          </a>
        </span>
      </div>
    </footer>
  );
}
