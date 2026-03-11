import type { NewsArticle } from "./types"

const news: NewsArticle[] = [
  {
    id: 1,
    slug: "new-cardiac-wing-opening",
    title: "metrodocshospital Opens State-of-the-Art Cardiac Wing",
    excerpt: "Our new cardiac care facility features the latest technology in heart health, including advanced catheterization labs and cardiac imaging.",
    content: `
      <p>metrodocshospital Hospital is proud to announce the grand opening of our new state-of-the-art Cardiac Care Wing, a significant milestone in our commitment to providing exceptional cardiovascular care to our community.</p>
      
      <h2>World-Class Facilities</h2>
      <p>The new wing spans over 50,000 square feet and features the latest advancements in cardiac care technology. Key highlights include:</p>
      <ul>
        <li>Two advanced cardiac catheterization laboratories</li>
        <li>State-of-the-art cardiac imaging center</li>
        <li>Dedicated cardiac intensive care unit with 20 beds</li>
        <li>Modern patient rooms designed for comfort and recovery</li>
        <li>Advanced telemetry monitoring systems</li>
      </ul>
      
      <h2>Expert Team</h2>
      <p>Our cardiac care team has expanded to include some of the region's most experienced cardiologists, cardiac surgeons, and specialized nursing staff. Led by Dr. Sarah Chen, our team is committed to providing personalized, comprehensive care for patients with all types of heart conditions.</p>
      
      <h2>Community Impact</h2>
      <p>This expansion will allow us to serve an additional 5,000 cardiac patients annually, reducing wait times and ensuring more community members have access to life-saving cardiac care close to home.</p>
      
      <p>We invite the community to join us for our open house event on March 15th, where you can tour the new facilities and meet our cardiac care team.</p>
    `,
    category: "Hospital News",
    date: "2026-03-08",
    readTime: "4 min read",
    author: "metrodocshospital Communications",
    image: "/news/cardiac-wing.jpg",
    featured: true,
  },
  {
    id: 2,
    slug: "community-health-fair",
    title: "Annual Community Health Fair This Weekend",
    excerpt: "Join us for free health screenings, wellness workshops, and family activities at our annual community health fair.",
    content: `
      <p>metrodocshospital Hospital invites the entire community to our Annual Health Fair this weekend! This free event offers valuable health resources, screenings, and fun activities for the whole family.</p>
      
      <h2>Event Details</h2>
      <p>Date: Saturday, March 10th & Sunday, March 11th<br>
      Time: 10:00 AM - 4:00 PM<br>
      Location: metrodocshospital Hospital Main Campus</p>
      
      <h2>Free Health Screenings</h2>
      <ul>
        <li>Blood pressure checks</li>
        <li>Blood glucose testing</li>
        <li>BMI assessments</li>
        <li>Vision and hearing tests</li>
        <li>Skin cancer screenings</li>
      </ul>
      
      <h2>Wellness Workshops</h2>
      <p>Throughout the weekend, our healthcare professionals will be hosting informative workshops on:</p>
      <ul>
        <li>Healthy eating on a budget</li>
        <li>Managing stress and anxiety</li>
        <li>Exercise for all ages</li>
        <li>Heart health basics</li>
        <li>Diabetes prevention</li>
      </ul>
      
      <h2>Family Activities</h2>
      <p>Kids will love our dedicated children's area featuring face painting, a teddy bear clinic, and interactive health games. Don't miss the opportunity to meet our therapy dogs!</p>
      
      <p>No registration required. All are welcome!</p>
    `,
    category: "Events",
    date: "2026-03-05",
    readTime: "2 min read",
    author: "Events Team",
    image: "/news/health-fair.jpg",
    featured: false,
  },
  {
    id: 3,
    slug: "dr-chen-award",
    title: "Dr. Sarah Chen Receives Excellence in Cardiology Award",
    excerpt: "Our chief cardiologist has been recognized for her outstanding contributions to cardiovascular research and patient care.",
    content: `
      <p>We are thrilled to announce that Dr. Sarah Chen, Chief of Cardiology at metrodocshospital Hospital, has been awarded the prestigious Excellence in Cardiology Award by the American Heart Association.</p>
      
      <h2>A Well-Deserved Recognition</h2>
      <p>This award recognizes Dr. Chen's exceptional contributions to cardiovascular research and patient care over her 15-year career. Her pioneering work in interventional cardiology has improved outcomes for thousands of patients.</p>
      
      <h2>Research Contributions</h2>
      <p>Dr. Chen has published over 50 peer-reviewed research papers and has been instrumental in developing new techniques for minimally invasive cardiac procedures. Her research on heart failure management has been adopted by hospitals nationwide.</p>
      
      <h2>Patient-Centered Care</h2>
      <p>"This award belongs to our entire cardiac team," said Dr. Chen upon receiving the honor. "Every day, I'm inspired by my colleagues' dedication to our patients. Together, we're making a difference in people's lives."</p>
      
      <p>Please join us in congratulating Dr. Chen on this remarkable achievement!</p>
    `,
    category: "Awards",
    date: "2026-03-01",
    readTime: "3 min read",
    author: "metrodocshospital Communications",
    image: "/news/award.jpg",
    featured: false,
  },
  {
    id: 4,
    slug: "new-pediatric-program",
    title: "Launching New Pediatric Development Program",
    excerpt: "metrodocshospital is proud to announce a comprehensive pediatric development program designed to support children with developmental delays and their families.",
    content: `
      <p>metrodocshospital Hospital is excited to launch our new comprehensive Pediatric Development Program, designed to support children with developmental delays and their families through early intervention services.</p>
      
      <h2>Program Overview</h2>
      <p>Our multidisciplinary team of pediatric specialists will provide comprehensive evaluations and personalized treatment plans for children from birth to age 5. The program addresses developmental concerns in areas including:</p>
      <ul>
        <li>Speech and language development</li>
        <li>Motor skills development</li>
        <li>Social and emotional development</li>
        <li>Cognitive development</li>
        <li>Adaptive behavior skills</li>
      </ul>
      
      <h2>Expert Team</h2>
      <p>The program brings together developmental pediatricians, speech-language pathologists, occupational therapists, physical therapists, and child psychologists to provide coordinated care.</p>
      
      <p>For more information or to schedule a consultation, please contact our Pediatric Development Center at (555) 123-4567.</p>
    `,
    category: "Hospital News",
    date: "2026-02-25",
    readTime: "5 min read",
    author: "Pediatrics Department",
    featured: false,
  },
  {
    id: 5,
    slug: "flu-season-tips",
    title: "Staying Healthy During Flu Season: Expert Tips",
    excerpt: "Our infectious disease specialists share their top recommendations for staying healthy this flu season.",
    content: `
      <p>With flu season in full swing, our infectious disease specialists want to share important tips to help you and your family stay healthy.</p>
      
      <h2>Get Vaccinated</h2>
      <p>The flu vaccine remains the most effective way to protect yourself and others. It's not too late to get vaccinated! metrodocshospital offers flu shots at all our locations, no appointment necessary.</p>
      
      <h2>Practice Good Hygiene</h2>
      <ul>
        <li>Wash your hands frequently with soap and water for at least 20 seconds</li>
        <li>Avoid touching your face, especially your eyes, nose, and mouth</li>
        <li>Cover coughs and sneezes with a tissue or your elbow</li>
        <li>Stay home when you're sick</li>
      </ul>
      
      <h2>Boost Your Immune System</h2>
      <ul>
        <li>Get adequate sleep (7-9 hours for adults)</li>
        <li>Eat a balanced diet rich in fruits and vegetables</li>
        <li>Exercise regularly</li>
        <li>Manage stress through relaxation techniques</li>
      </ul>
      
      <p>If you develop flu symptoms, contact your healthcare provider promptly. Antiviral medications work best when started within 48 hours of symptom onset.</p>
    `,
    category: "Health Tips",
    date: "2026-02-20",
    readTime: "4 min read",
    author: "Dr. Jennifer Lee",
    featured: false,
  },
  {
    id: 6,
    slug: "emergency-room-expansion",
    title: "Emergency Room Expansion Complete",
    excerpt: "Our emergency department expansion project is now complete, adding 12 new treatment bays and reducing average wait times by 40%.",
    content: "<p>Our emergency department expansion project is now complete, adding 12 new treatment bays and reducing average wait times by 40%. The new facilities include dedicated pediatric emergency rooms.</p>",
    category: "Hospital News",
    date: "2026-02-15",
    readTime: "3 min read",
    author: "metrodocshospital Communications",
    featured: false,
  },
  {
    id: 7,
    slug: "volunteer-recognition",
    title: "Celebrating Our Hospital Volunteers",
    excerpt: "This National Volunteer Week, we honor the dedicated individuals who give their time to support our patients and staff.",
    content: "<p>This National Volunteer Week, we honor the dedicated individuals who give their time to support our patients and staff. Our volunteers contribute over 10,000 hours annually to metrodocshospital.</p>",
    category: "Community",
    date: "2026-02-10",
    readTime: "3 min read",
    author: "Volunteer Services",
    featured: false,
  },
  {
    id: 8,
    slug: "mental-health-awareness",
    title: "Mental Health Awareness Month Activities",
    excerpt: "Join us throughout May for special events and workshops focused on mental health awareness.",
    content: "<p>Join us throughout May for special events and workshops focused on mental health awareness. Topics include stress management, mindfulness, and when to seek professional help.</p>",
    category: "Events",
    date: "2026-02-05",
    readTime: "2 min read",
    author: "Behavioral Health",
    featured: false,
  },
]

export function getNews(): NewsArticle[] {
  return news
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return news.find((a) => a.slug === slug)
}

export const NEWS_CATEGORIES = ["All", "Hospital News", "Events", "Awards", "Health Tips", "Community"] as const

export function getNewsCategories(): string[] {
  return [...NEWS_CATEGORIES]
}
