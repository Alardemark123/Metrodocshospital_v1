// Mock API shared types (icon fields are string keys for ICON_MAP)

export interface Doctor {
  id: number
  name: string
  specialty: string
  department: string
  experience: string
  rating: number
  education: string
  bio: string
  fullBio?: string
  awards?: string[]
  languages?: string[]
  availability?: string
  image?: string
}

export interface NewsArticle {
  id: number
  slug: string
  title: string
  excerpt: string
  content?: string
  category: string
  date: string
  readTime: string
  author?: string
  image?: string
  featured?: boolean
}

export interface Department {
  id: string
  icon: string
  name: string
  description: string
  features: string[]
  color: string
  bgGradient: string
}

export interface DepartmentPreview {
  icon: string
  name: string
  description: string
  color: string
  href: string
}

export interface Job {
  id: number
  position: string
  department: string
  type: string
  location: string
  description: string
  requirements: string[]
  benefits: string[]
}

export interface Benefit {
  icon: string
  title: string
  description: string
}

export interface Value {
  icon: string
  title: string
  description: string
}

export interface Facility {
  name: string
  href: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface Service {
  icon: string
  title: string
  description: string
  href: string
}

export interface Testimonial {
  id: number
  name: string
  quote: string
}
