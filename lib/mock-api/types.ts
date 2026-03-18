export { slugify, getDoctorBySlug } from "./doctors";

export interface Doctor {
  slug: any;
  id: number;
  name: string;
  specialty: string;
  department: string;
  experience: string;
  rating: number;
  education: string;
  bio: string;
  fullBio?: string;
  awards?: string[];
  languages?: string[];
  availability?: string;
  image?: string;
}

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  readTime: string;
  author?: string;
  image?: string;
  subImages?: string[];
  featured?: boolean;
  breadcrumblabel?: string;
}

export interface Department {
  slug: any;
  id: string;
  icon: string;
  name: string;
  excerpt?: string;
  description: string;
  features: string[];
  color: string;
  image?: string;
  subimage?: string[];
  bgGradient: string;
}

export interface DepartmentPreview {
  icon: string;
  name: string;
  description: string;
  color: string;
  href: string;
}

export interface Job {
  id: number;
  position: string;
  department: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface Value {
  icon: string;
  title: string;
  description: string;
}

export interface Facility {
  name: string;
  href: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  department: string;
  rating: number;
  quote: string;
  date: string;
}

export interface Highlight {
  title: string;
  value: string;
}

export interface Section {
  title: string;
  description: string;
  images?: string[];
}

export interface FacilityPageProps {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  features: string[];
  highlights: {
    title: string;
    value: string;
  }[];
  images?: string[];
  sections?: Section[];
  sections2?: Section[];
  breadcrumblabel?: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
}
