import type { Department, DepartmentPreview } from "./types";

const departments: Omit<Department, "slug">[] = [
  {
    id: "radiology",
    icon: "Siren",
    name: "Radiology",
    excerpt:
      "To deliver quality imaging services with outmost compassion and with an absolute commitment to patient care as our first priority.",
    description:
      "To deliver quality imaging services with outmost compassion and with an absolute commitment to patient care as our first priority.",
    features: [
      "24/7 availability",
      "Trauma care",
      "Cardiac emergencies",
      "Pediatric emergencies",
    ],
    color: "bg-red-500/10 text-red-600",
    image: "/departments/FRD_5342-300x200.jpg",
    subimage: [
      "/departments/FRD_5340-300x200.jpg",
      "/departments/FRD_5339-300x200.jpg",
    ],
    bgGradient: "from-red-500/20 to-red-500/5",
  },
  {
    id: "Nursing",
    icon: "ScanLine",
    name: "Nursing Services",
    excerpt:
      "To provide excellent and compassionate quality and holistic service to all patients under our care.",
    description:
      "To provide excellent and compassionate quality and holistic service to all patients under our care.",
    features: ["MRI & CT scans", "Digital X-ray", "Ultrasound", "Mammography"],
    color: "bg-blue-500/10 text-blue-600",
    image: "/departments/6.png",
    subimage: ["/departments/FRD_5232-1-1024x683.jpg"],
    bgGradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    id: "ER",
    icon: "Activity",
    name: "Emergency Room",
    excerpt:
      "Our goal is to provide timely, life-saving emergency care to patients in a patient-focused manner. We aim to make a positive impact on the well-being of the individuals we serve by adopting a holistic approach.",
    description:
      "To deliver life-saving and patient-focused emergency care on well-timed manner through a holistic approach that makes a difference in the well-being of the patients we serve.",
    features: [
      "Physical therapy",
      "Occupational therapy",
      "Speech therapy",
      "Cardiac rehab",
    ],
    image: "/departments/3.png",
    subimage: [
      "/departments/EMERGENCY-ROOM-1024x683.jpg",
      "/departments/FRD_5307-300x200.jpg",
      "/departments/FRD_5308-300x200.jpg",
      "/departments/FRD_5310-1-300x200.jpg",
      "/departments/FRD_5314-300x200.jpg",
      "/departments/FRD_5315-300x200.jpg",
    ],
    color: "bg-primary/10 text-primary",
    bgGradient: "from-primary/20 to-primary/5",
  },
  {
    id: "PM",
    icon: "Pill",
    name: "Pharmacy",
    description:
      "To provide pharmaceutical care to all patients through the responsible provision of drug therapy: for achieving positive patient outcomes that improve the quality of life of our patients.",
    features: [
      "Chronic disease management",
      "Preventive care",
      "Health screenings",
      "Adult immunizations",
    ],
    image: "/departments/Pharmacy-768x1024.jpg",
    subimage: ["/departments/Pharmacy-768x1024.jpg"],
    color: "bg-purple-500/10 text-purple-600",
    bgGradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    id: "LB",
    icon: "Baby",
    name: "Laboratory",
    description:
      "To build innovative and technological systems that offer responsive services to patients and doctors through fast, accurate, affordable Laboratory test.",
    features: [
      "Well-child visits",
      "Vaccinations",
      "Developmental care",
      "Pediatric specialists",
    ],
    color: "bg-pink-500/10 text-pink-600",
    image: "/departments/5.png",
    subimage: ["/departments/5.png"],
    bgGradient: "from-pink-500/20 to-pink-500/5",
  },
  {
    id: "OPD",
    icon: "HeartPulse",
    name: "Outpatients Department",
    description:
      "To provide high-quality, patient care to individuals seeking outpatient medical treatment in a convenient, accessible, and affordable for all.",
    features: [
      "ECG & Echo",
      "Stress testing",
      "Cardiac catheterization",
      "Heart failure clinic",
    ],
    color: "bg-red-500/10 text-red-600",
    image: "/departments/Opd-768x1024.jpg",
    subimage: ["/departments/Opd-768x1024.jpg"],
    bgGradient: "from-red-500/20 to-red-500/5",
  },
  {
    id: "Info",
    icon: "FlaskConical",
    name: "Admitting / Information",
    description:
      "The foundation of excellent customer care and satisfaction begins with the establishment of a strong hospital-patient relationship.",
    features: ["Blood tests", "Pathology", "Microbiology", "Rapid results"],
    color: "bg-teal-500/10 text-teal-600",
    image: "/departments/Untitled.png",
    subimage: ["/departments/Untitled.png"],
    bgGradient: "from-teal-500/20 to-teal-500/5",
  },
  {
    id: "HMO",
    icon: "FlaskConical",
    name: "Philhealth / HMO",
    description:
      "The augmentation of healthcare support will enhance the optimization of healthcare claims for services.",
    features: ["Blood tests", "Pathology", "Microbiology", "Rapid results"],
    color: "bg-teal-500/10 text-teal-600",
    image: "/departments/1.png",
    subimage: ["/departments/1.png"],
    bgGradient: "from-teal-500/20 to-teal-500/5",
  },
  {
    id: "Accounting",
    icon: "FlaskConical",
    name: "Accounting",
    description:
      "Accounting plays a crucial role in supporting and benefiting patients within a hospital setting. By effectively managing financial resources, accounting helps ensure that hospitals can provide high-quality patient care and services.",
    features: ["Blood tests", "Pathology", "Microbiology", "Rapid results"],
    color: "bg-teal-500/10 text-teal-600",
    image: "/departments/Accounting.png",
    subimage: ["/departments/Accounting.png"],
    bgGradient: "from-teal-500/20 to-teal-500/5",
  },
];

export function getDepartments(): Department[] {
  return departments.map((dept) => ({
    ...dept,
    slug: slugify(dept.name),
  })) as Department[];
}

export function getDepartmentFilters(): string[] {
  return [
    "All",
    "Cardiology",
    "Internal Medicine",
    "Pediatrics",
    "Rehabilitation",
    "Emergency",
    "Radiology",
    "Laboratory",
  ];
}

export function getDepartmentsPreview(): DepartmentPreview[] {
  return departments.map((d) => ({
    icon: d.icon,
    name: d.name,
    description:
      d.id === "emergency"
        ? "24/7 emergency care with rapid response teams ready to handle any medical crisis."
        : d.id === "radiology"
          ? "Advanced imaging services including MRI, CT scans, X-rays, and ultrasound."
          : d.id === "rehabilitation"
            ? "Comprehensive physical therapy and rehabilitation programs for recovery."
            : d.id === "internal-medicine"
              ? "Expert diagnosis and treatment of adult diseases and chronic conditions."
              : d.id === "pediatrics"
                ? "Specialized healthcare for infants, children, and adolescents."
                : d.id === "cardiology"
                  ? "Comprehensive heart care from prevention to advanced interventions."
                  : "State-of-the-art diagnostic testing with quick and accurate results.",
    color: d.color,
    href: `/departments#${d.id}`,
  }));
}
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function getDepartmentBySlug(slug: string) {
  const departments = getDepartments();
  return departments.find((dept) => slugify(dept.name) === slug);
}
