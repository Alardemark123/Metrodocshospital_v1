"use client"

import { motion } from "framer-motion"
import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Star, GraduationCap, Clock, Award, Calendar, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Cardiology",
    department: "Cardiology",
    experience: "15+ years",
    rating: 4.9,
    education: "Harvard Medical School",
    bio: "Board-certified cardiologist specializing in interventional cardiology and heart failure management.",
    fullBio: "Dr. Sarah Chen is a renowned cardiologist with over 15 years of experience in diagnosing and treating complex cardiovascular conditions. She completed her medical degree at Harvard Medical School and her cardiology fellowship at Massachusetts General Hospital. Dr. Chen specializes in interventional cardiology, heart failure management, and preventive cardiology. She has published numerous research papers and is known for her patient-centered approach to care.",
    awards: ["Best Cardiologist Award 2024", "Excellence in Patient Care 2023", "Research Innovation Award 2022"],
    languages: ["English", "Mandarin"],
    availability: "Mon, Wed, Fri: 9AM - 5PM",
  },
  {
    id: 2,
    name: "Dr. Michael Roberts",
    specialty: "Neurology",
    department: "Internal Medicine",
    experience: "12+ years",
    rating: 4.8,
    education: "Johns Hopkins University",
    bio: "Expert in neurological disorders including stroke, epilepsy, and movement disorders.",
    fullBio: "Dr. Michael Roberts is a board-certified neurologist specializing in stroke care, epilepsy management, and movement disorders. He graduated from Johns Hopkins University School of Medicine and completed his residency at Cleveland Clinic. With over 12 years of experience, Dr. Roberts has helped thousands of patients manage complex neurological conditions. He is passionate about patient education and takes time to ensure his patients understand their conditions and treatment options.",
    awards: ["Neurologist of the Year 2023", "Patient Choice Award 2022"],
    languages: ["English", "Spanish"],
    availability: "Tue, Thu: 10AM - 6PM",
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    specialty: "Pediatrics",
    department: "Pediatrics",
    experience: "10+ years",
    rating: 4.9,
    education: "Stanford University",
    bio: "Dedicated pediatrician with expertise in child development and pediatric infectious diseases.",
    fullBio: "Dr. Emily Watson is a compassionate pediatrician dedicated to providing exceptional care for children from infancy through adolescence. She earned her medical degree from Stanford University and completed her pediatric residency at Children's Hospital of Philadelphia. Dr. Watson specializes in child development, pediatric infectious diseases, and preventive care. She is known for her warm, friendly approach that puts both children and parents at ease.",
    awards: ["Top Pediatrician 2024", "Community Care Excellence 2023"],
    languages: ["English"],
    availability: "Mon - Fri: 8AM - 4PM",
  },
  {
    id: 4,
    name: "Dr. James Miller",
    specialty: "Orthopedic Surgery",
    department: "Rehabilitation",
    experience: "18+ years",
    rating: 4.7,
    education: "Yale School of Medicine",
    bio: "Renowned orthopedic surgeon specializing in joint replacement and sports medicine.",
    fullBio: "Dr. James Miller is a highly skilled orthopedic surgeon with 18 years of experience in joint replacement surgery and sports medicine. He graduated from Yale School of Medicine and completed his orthopedic surgery residency at Hospital for Special Surgery in New York. Dr. Miller has performed thousands of successful joint replacement surgeries and is recognized for his expertise in minimally invasive techniques that promote faster recovery.",
    awards: ["Excellence in Orthopedic Surgery 2024", "Innovation in Joint Replacement 2023"],
    languages: ["English", "French"],
    availability: "Mon, Wed, Thu: 9AM - 5PM",
  },
  {
    id: 5,
    name: "Dr. Maria Garcia",
    specialty: "Emergency Medicine",
    department: "Emergency",
    experience: "14+ years",
    rating: 4.8,
    education: "UCLA Medical School",
    bio: "Emergency medicine specialist with extensive trauma care experience.",
    fullBio: "Dr. Maria Garcia is a board-certified emergency medicine physician with 14 years of experience in acute care and trauma management. She earned her medical degree from UCLA Medical School and completed her emergency medicine residency at Los Angeles County Hospital. Dr. Garcia is known for her calm demeanor under pressure and her ability to make quick, accurate diagnoses. She has been instrumental in developing protocols that have improved patient outcomes in our emergency department.",
    awards: ["Emergency Physician of the Year 2024", "Trauma Care Excellence 2023"],
    languages: ["English", "Spanish", "Portuguese"],
    availability: "Rotating shifts - 24/7 Emergency Coverage",
  },
  {
    id: 6,
    name: "Dr. David Kim",
    specialty: "Radiology",
    department: "Radiology",
    experience: "11+ years",
    rating: 4.6,
    education: "Columbia University",
    bio: "Diagnostic radiologist with expertise in MRI and CT imaging interpretation.",
    fullBio: "Dr. David Kim is an expert diagnostic radiologist with 11 years of experience in medical imaging. He graduated from Columbia University College of Physicians and Surgeons and completed his radiology residency at NYU Langone Medical Center. Dr. Kim specializes in MRI and CT interpretation, with particular expertise in neuroimaging and oncologic imaging. He is committed to providing accurate, timely diagnoses that guide effective treatment plans.",
    awards: ["Excellence in Diagnostic Imaging 2023", "Research Achievement Award 2022"],
    languages: ["English", "Korean"],
    availability: "Mon - Fri: 7AM - 3PM",
  },
  {
    id: 7,
    name: "Dr. Jennifer Lee",
    specialty: "Internal Medicine",
    department: "Internal Medicine",
    experience: "9+ years",
    rating: 4.8,
    education: "University of Pennsylvania",
    bio: "Internal medicine physician focused on preventive care and chronic disease management.",
    fullBio: "Dr. Jennifer Lee is a dedicated internal medicine physician with 9 years of experience in adult primary care. She graduated from the University of Pennsylvania Perelman School of Medicine and completed her residency at UCSF Medical Center. Dr. Lee is passionate about preventive medicine and helping patients manage chronic conditions such as diabetes, hypertension, and heart disease. She believes in building long-term relationships with her patients to achieve optimal health outcomes.",
    awards: ["Patient Satisfaction Award 2024", "Primary Care Excellence 2023"],
    languages: ["English", "Cantonese"],
    availability: "Mon, Tue, Thu, Fri: 9AM - 5PM",
  },
  {
    id: 8,
    name: "Dr. Robert Thompson",
    specialty: "Laboratory Medicine",
    department: "Laboratory",
    experience: "16+ years",
    rating: 4.7,
    education: "Duke University",
    bio: "Clinical pathologist ensuring accurate diagnostic testing and quality assurance.",
    fullBio: "Dr. Robert Thompson is a board-certified clinical pathologist with 16 years of experience in laboratory medicine. He earned his medical degree from Duke University School of Medicine and completed his pathology residency at Mayo Clinic. Dr. Thompson oversees all laboratory operations, ensuring the highest standards of accuracy and quality in diagnostic testing. His expertise helps physicians make informed decisions about patient care through reliable test results.",
    awards: ["Laboratory Excellence Award 2024", "Quality Assurance Achievement 2023"],
    languages: ["English"],
    availability: "Mon - Fri: 8AM - 4PM",
  },
]

export default function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const doctor = doctors.find((d) => d.id === parseInt(id))

  if (!doctor) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Doctor Not Found</h1>
          <Button asChild>
            <Link href="/doctors">Back to Doctors</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-accent py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Link
            href="/doctors"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Doctors
          </Link>

          <div className="grid items-start gap-12 lg:grid-cols-3">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {doctor.department}
              </span>
              <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">{doctor.name}</h1>
              <p className="mb-6 text-xl text-primary">{doctor.specialty}</p>

              <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">{doctor.fullBio}</p>

              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl bg-card p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Education</p>
                    <p className="font-medium text-card-foreground">{doctor.education}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-card p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-medium text-card-foreground">{doctor.experience}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/contact">
                    <Calendar className="h-5 w-5" />
                    Book Appointment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2">
                  <a href="tel:+15551234567">
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Awards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">Awards & Recognition</h3>
              </div>
              <ul className="space-y-2">
                {doctor.awards.map((award) => (
                  <li key={award} className="text-sm text-muted-foreground">
                    {award}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-4 text-lg font-semibold text-card-foreground">Languages Spoken</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">Availability</h3>
              </div>
              <p className="text-sm text-muted-foreground">{doctor.availability}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
