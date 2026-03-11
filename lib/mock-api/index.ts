// Types
export type {
  Doctor,
  NewsArticle,
  Department,
  DepartmentPreview,
  Job,
  Benefit,
  Value,
  Facility,
  FAQ,
  Feature,
  Service,
  Testimonial,
} from "./types"

// Doctors
export { getDoctors, getDoctorById, getDoctorDepartmentFilters, DOCTOR_DEPARTMENT_FILTERS } from "./doctors"

// News
export { getNews, getNewsBySlug, getNewsCategories, NEWS_CATEGORIES } from "./news"

// Departments
export { getDepartments, getDepartmentFilters, getDepartmentsPreview } from "./departments"

// Jobs
export { getJobs, getJobDepartmentFilters, getBenefits, JOB_DEPARTMENT_FILTERS } from "./jobs"

// About
export { getValues, getFacilities } from "./about"

// FAQs
export { getFaqs } from "./faqs"

// Home
export { getFeatures, getServices, getTestimonials } from "./home"

// Icons (for client components that need to render icons)
export { ICON_MAP } from "./icons"
