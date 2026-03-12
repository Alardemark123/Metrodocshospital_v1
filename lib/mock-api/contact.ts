// lib/mock-api/contact.ts
import type { ContactInfo } from "./types";

const contactInfo: ContactInfo = {
  address: "156 Marick Dr, Santo Domingo, Cainta, 1900 Rizal",
  phone: "(02) 8251-6922",
  email: "info@metrodocshospital.com.ph",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.2891259326566!2d121.11406389999999!3d14.582593999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c79a34684977%3A0xc72a0d49769f9a9!2sMetro%20Rizal%20Doctors%20Hospital!5e0!3m2!1sen!2sph!4v1773343270848!5m2!1sen!2sph",
};

export const extraPhones: string[] = ["(02) 8251-6922", "(02) 8532-6505"];

export const officeHours: {
  label: string;
  hours: string;
  highlight?: boolean;
}[] = [
  { label: "Mon", hours: "8:00 AM – 8:00 PM" },
  { label: "Wed & Fri", hours: "7:00 AM – 7:00 PM" },
  { label: "Tue, Thu & Sat", hours: "6:00 AM – 6:00 PM" },
  { label: "Hospital", hours: "24/7", highlight: true },
];

export function getContactInfo(): ContactInfo {
  return contactInfo;
}

export function getExtraPhones(): string[] {
  return extraPhones;
}

export function getOfficeHours() {
  return officeHours;
}
