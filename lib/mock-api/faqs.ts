import type { FAQ } from "./types"

const faqs: FAQ[] = [
  {
    question: "How do I schedule an appointment?",
    answer:
      "You can schedule an appointment by calling our main line at +1 (555) 123-4567, using our online contact form, or visiting our hospital in person.",
  },
  {
    question: "What insurance plans do you accept?",
    answer:
      "We accept most major insurance plans. Please contact our billing department to verify your specific coverage before your visit.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Please bring a valid photo ID, your insurance card, a list of current medications, and any relevant medical records or test results.",
  },
  {
    question: "Do you offer telehealth appointments?",
    answer:
      "Yes, we offer telehealth consultations for certain conditions and follow-up visits. Ask about virtual appointment options when scheduling.",
  },
]

export function getFaqs(): FAQ[] {
  return faqs
}
