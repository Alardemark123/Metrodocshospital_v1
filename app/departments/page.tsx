"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { 
  Siren, 
  ScanLine, 
  Activity, 
  Pill, 
  Baby, 
  HeartPulse,
  FlaskConical,
  ArrowRight,
  Phone,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"

const departments = [
  {
    id: "emergency",
    icon: Siren,
    name: "Emergency Department",
    description: "Our 24/7 emergency department is equipped to handle all medical emergencies with rapid response teams, trauma specialists, and state-of-the-art equipment.",
    features: ["24/7 availability", "Trauma care", "Cardiac emergencies", "Pediatric emergencies"],
    color: "bg-red-500/10 text-red-600",
    bgGradient: "from-red-500/20 to-red-500/5",
  },
  {
    id: "radiology",
    icon: ScanLine,
    name: "Radiology",
    description: "Advanced diagnostic imaging services including MRI, CT scans, X-rays, ultrasound, and nuclear medicine for accurate diagnosis and treatment planning.",
    features: ["MRI & CT scans", "Digital X-ray", "Ultrasound", "Mammography"],
    color: "bg-blue-500/10 text-blue-600",
    bgGradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    id: "rehabilitation",
    icon: Activity,
    name: "Rehabilitation",
    description: "Comprehensive physical therapy and rehabilitation programs to help patients recover strength, mobility, and independence after surgery, injury, or illness.",
    features: ["Physical therapy", "Occupational therapy", "Speech therapy", "Cardiac rehab"],
    color: "bg-primary/10 text-primary",
    bgGradient: "from-primary/20 to-primary/5",
  },
  {
    id: "internal-medicine",
    icon: Pill,
    name: "Internal Medicine",
    description: "Expert diagnosis and management of adult diseases, chronic conditions, and complex medical cases by our team of experienced internists.",
    features: ["Chronic disease management", "Preventive care", "Health screenings", "Adult immunizations"],
    color: "bg-purple-500/10 text-purple-600",
    bgGradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    id: "pediatrics",
    icon: Baby,
    name: "Pediatrics",
    description: "Specialized healthcare for infants, children, and adolescents, from routine check-ups to complex pediatric conditions, in a child-friendly environment.",
    features: ["Well-child visits", "Vaccinations", "Developmental care", "Pediatric specialists"],
    color: "bg-pink-500/10 text-pink-600",
    bgGradient: "from-pink-500/20 to-pink-500/5",
  },
  {
    id: "cardiology",
    icon: HeartPulse,
    name: "Cardiology",
    description: "Comprehensive heart care from prevention to intervention, including diagnostic testing, cardiac catheterization, and heart failure management.",
    features: ["ECG & Echo", "Stress testing", "Cardiac catheterization", "Heart failure clinic"],
    color: "bg-red-500/10 text-red-600",
    bgGradient: "from-red-500/20 to-red-500/5",
  },
  {
    id: "laboratory",
    icon: FlaskConical,
    name: "Laboratory",
    description: "State-of-the-art diagnostic laboratory providing accurate and timely test results to support clinical decision-making and patient care.",
    features: ["Blood tests", "Pathology", "Microbiology", "Rapid results"],
    color: "bg-teal-500/10 text-teal-600",
    bgGradient: "from-teal-500/20 to-teal-500/5",
  },
]

function DepartmentCard({ department, index }: { department: typeof departments[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      id={department.id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group scroll-mt-24"
    >
      <div className={`overflow-hidden rounded-3xl bg-gradient-to-br ${department.bgGradient} border border-border p-8 transition-all hover:shadow-lg`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${department.color}`}>
            <department.icon className="h-8 w-8" />
          </div>
          
          <div className="flex-1">
            <h2 className="mb-3 text-2xl font-bold text-foreground">{department.name}</h2>
            <p className="mb-4 text-muted-foreground">{department.description}</p>
            
            <div className="mb-6 flex flex-wrap gap-2">
              {department.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full bg-background/80 px-3 py-1 text-sm text-foreground"
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/doctors" className="gap-2">
                  Find a Doctor
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Book Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function DepartmentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-accent py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Our Departments
            </span>
            <h1 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl">
              Specialized Medical Departments
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Our hospital features specialized departments staffed by expert physicians and equipped with cutting-edge technology to provide comprehensive care for all your medical needs.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>24/7 Emergency Services</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Departments List */}
      <section className="bg-background py-20 lg:py-32">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col gap-8">
            {departments.map((department, index) => (
              <DepartmentCard key={department.id} department={department} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-primary-foreground md:text-4xl">
            Need Help Finding the Right Department?
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Our patient services team is here to guide you to the right specialist for your needs.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact" className="gap-2">
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
