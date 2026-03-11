import type { Job, Benefit } from "./types"

const jobs: Job[] = [
  {
    id: 1,
    position: "Registered Nurse - ICU",
    department: "Intensive Care",
    type: "Full-time",
    location: "Main Campus",
    description:
      "Join our critical care team as an ICU Registered Nurse. You'll provide direct patient care to critically ill patients, working collaboratively with physicians and other healthcare professionals.",
    requirements: ["Valid RN license", "BSN preferred", "2+ years ICU experience", "BLS and ACLS certification", "Strong critical thinking skills"],
    benefits: ["Competitive salary", "Health, dental, and vision insurance", "401(k) with employer match", "Tuition reimbursement", "Flexible scheduling"],
  },
  {
    id: 2,
    position: "Radiologic Technologist",
    department: "Radiology",
    type: "Full-time",
    location: "Main Campus",
    description:
      "Perform diagnostic imaging examinations including X-rays, CT scans, and fluoroscopy procedures. Work with state-of-the-art imaging equipment in a supportive team environment.",
    requirements: ["ARRT certification", "State licensure", "1+ years experience preferred", "Knowledge of radiation safety", "Excellent patient care skills"],
    benefits: ["Competitive salary", "Comprehensive benefits package", "Continuing education support", "Career advancement opportunities", "Modern equipment training"],
  },
  {
    id: 3,
    position: "Medical Technologist",
    department: "Laboratory",
    type: "Full-time",
    location: "Main Campus",
    description:
      "Perform clinical laboratory testing in areas including chemistry, hematology, microbiology, and blood bank. Ensure accuracy and quality of all test results.",
    requirements: ["ASCP certification", "Bachelor's degree in Medical Technology", "Strong attention to detail", "Quality assurance experience", "Ability to work independently"],
    benefits: ["Competitive compensation", "Full benefits package", "Professional development", "Day and evening shifts available", "Collaborative work environment"],
  },
  {
    id: 4,
    position: "Administrative Staff - Patient Services",
    department: "Administration",
    type: "Full-time",
    location: "Main Campus",
    description:
      "Provide exceptional customer service to patients and visitors. Handle patient registration, scheduling, and general administrative duties in a fast-paced healthcare environment.",
    requirements: ["High school diploma required", "Associate's degree preferred", "Healthcare experience a plus", "Strong communication skills", "Proficiency in Microsoft Office"],
    benefits: ["Competitive hourly rate", "Health benefits", "Paid time off", "Growth opportunities", "Monday-Friday schedule"],
  },
  {
    id: 5,
    position: "Physical Therapist",
    department: "Rehabilitation",
    type: "Full-time",
    location: "Main Campus",
    description:
      "Evaluate and treat patients with injuries, illnesses, or disabilities to improve movement and manage pain. Develop personalized treatment plans and work with a multidisciplinary team.",
    requirements: ["Doctor of Physical Therapy (DPT)", "State licensure", "Strong manual therapy skills", "Experience with various patient populations", "Excellent interpersonal skills"],
    benefits: ["Competitive salary", "Full benefits package", "CEU allowance", "Mentorship program", "Work-life balance"],
  },
  {
    id: 6,
    position: "Emergency Room Nurse",
    department: "Emergency",
    type: "Full-time",
    location: "Main Campus",
    description:
      "Provide nursing care in our busy emergency department. Triage patients, administer treatments, and collaborate with emergency physicians to deliver quality care.",
    requirements: ["Valid RN license", "BLS, ACLS, PALS certifications", "1+ years ER experience preferred", "Ability to work under pressure", "Flexible availability including nights/weekends"],
    benefits: ["Premium shift differentials", "Comprehensive benefits", "Sign-on bonus available", "Continuing education", "Career ladder program"],
  },
]

const benefits: Benefit[] = [
  { icon: "Heart", title: "Health & Wellness", description: "Comprehensive medical, dental, and vision coverage for you and your family." },
  { icon: "GraduationCap", title: "Education Support", description: "Tuition reimbursement and continuing education opportunities." },
  { icon: "Users", title: "Work-Life Balance", description: "Flexible scheduling, generous PTO, and parental leave programs." },
  { icon: "Shield", title: "Retirement Benefits", description: "401(k) plan with employer matching to secure your future." },
]

export function getJobs(): Job[] {
  return jobs
}

export const JOB_DEPARTMENT_FILTERS = ["All", "Intensive Care", "Radiology", "Laboratory", "Administration", "Rehabilitation", "Emergency"] as const

export function getJobDepartmentFilters(): string[] {
  return [...JOB_DEPARTMENT_FILTERS]
}

export function getBenefits(): Benefit[] {
  return benefits
}
