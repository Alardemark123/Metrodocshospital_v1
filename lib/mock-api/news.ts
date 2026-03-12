import type { NewsArticle } from "./types";

const news: NewsArticle[] = [
  {
    id: 1,
    slug: "The-Grand-Launch-of-the-Bright-Smile-Project",
    title:
      "BRIGHT SMILE: HELPING PATIENTS WITH CLEFT LIP AND PALATE - GRAND LAUNCHING",
    excerpt:
      "Our new cardiac care facility features the latest technology in heart health, including advanced catheterization labs and cardiac imaging.",
    content: `<p>A New Partnership for a Bright Smile: The Academy for Research and Clinical Dentistry, Metro Rizal Doctors Hospital and Health Services Cooperative, and the Philippine Dental Association – Rizal Dental Chapter unite in a shared mission to transform the lives of patients with cleft lip and palate. Together, they aim to bring brighter smiles and brighter futures to those in need.</p>
<p>IN PHOTO (L-R): Dr. Joy Bautista, President of Academy for Research and Clinical Dentistry; Dr. Neil Andrew De Lumen, Chairman of the Board of Metro Rizal Doctors Hospital and Health Services Cooperative; Dr. Joseph Villafuerte, Chairman of the Bright Smile Project; and Dr. Sixto Cruz III of the Philippine Dental Association – Rizal Dental Chapter.</p>`,
    category: "Hospital News",
    date: "2025-04-04",
    readTime: "4 min read",
    author: "Admin",
    image: "/news/6-1024x768.jpg",
    subImages: [
      "/news/1-scaled.jpg",
      "/news/2-scaled.jpg",
      "/news/3-scaled.jpg",
      "/news/4-scaled.jpg",
      "/news/5-scaled.jpg",
      "/news/6-scaled.jpg",
    ],
    featured: true,
  },
  {
    id: 2,
    slug: "Heart-Station",
    title: "Heart Station",
    excerpt:
      "Unlocking Heart Health at Metro Rizal Doctors Hospital! 🏥💓 Introducing our new Heart Station...",
    content: `
     Unlocking Heart Health at Metro Rizal Doctors Hospital! 🏥💓 Introducing our new Heart Station – Your Center for Cardiac Care Excellence. For inquiries and appointments, call now at 02 8251-6922 | 02 8532-6505 Your heart deserves the best!
    `,
    category: "Events",
    date: "2024-01-04",
    readTime: "1 min read",
    author: "Admin",
    image: "/news/Final-Draft-for-Heart-Station-1005x1024.jpg",
    featured: false,
  },
  {
    id: 3,
    slug: "GASTROSCOPY-AND-COLONOSCOPY-PACKAGE",
    title: "GASTROSCOPY AND COLONOSCOPY PACKAGE",
    excerpt:
      "Experience comprehensive care for your digestive health with our Gastroscopy and Colonoscopy package, now available at Metro Rizal Doctors Hospital",
    content: `
      Experience comprehensive care for your digestive health with our Gastroscopy and Colonoscopy package, now available at Metro Rizal Doctors Hospital. Prioritize your well-being with advanced screenings and expert medical attention.  
    `,
    category: "Events",
    date: "2023-12-04",
    readTime: "1 min read",
    author: "Admin",
    image: "/news/Gastroscopy-997x1024.jpg",
    featured: false,
  },
  {
    id: 4,
    slug: "Halloween",
    title: "Halloween",
    excerpt: "#MRDHHSC_HalloweenFUN",
    content: `
      Join us on October 27th for a spook-tacular ‘Trick or Treat’ Metro Rizal Doctors Hospital! Let’s fill the day with smiles and laughter as we make Halloween extra special for the little ones. 🍭
      #MRDHHSC_HalloweenFUN
    `,
    category: "Events",
    date: "2023-10-27",
    readTime: "1 min read",
    author: "Admin",
    image: "/news/HALLOWEEN-1024x576.jpg",
    featured: false,
  },
  {
    id: 5,
    slug: "MRDHHSC-20th-FOUNDING-ANNIVERSARY-MOBILE-LEGENDS-TOURNAMENT",
    title: "MRDHHSC 20th FOUNDING ANNIVERSARY “MOBILE LEGENDS TOURNAMENT",
    excerpt:
      "Get Ready to Battle! Join us in a thrilling Mobile Legends tournament game as we celebrate the 20th Founding Anniversary of Metro Rizal Doctors Hospital.",
    content: `
     MOBILE LEGENDS TOURNAMENT
    🎮🏆 Get Ready to Battle! Join us in a thrilling Mobile Legends tournament game as we celebrate the 20th Founding Anniversary of Metro Rizal Doctors Hospital. It’s not just about health; it’s about teamwork and fun! Let the games begin! 🎉👾
    #MRDHHSC20thAnniversary
    #MobileLegendsTournament
    #GamingCelebration“
    `,
    category: "Events",
    date: "2024-09-04",
    readTime: "4 min read",
    author: "Admin",
    image: "/news/viber_image_2023-09-04_16-36-06-595-1024x576.jpg",
    featured: false,
  },
  {
    id: 6,
    slug: "emergency-room-expansion",
    title: "Emergency Room Expansion Complete",
    excerpt:
      "Celebrating 20th Years of Caring! In honor of Metro Rizal Doctors’ 20th Anniversary, we’re offering FREE consultations to our amazing community. Your health is our priority, today and always. Join us in this special celebration! #MRDHHSC20thAnniversary #FreeConsultations",
    content:
      "🎉 Celebrating 20th Years of Caring! 🏥🌟In honor of Metro Rizal Doctors’ 20th Anniversary, we’re offering FREE consultations to our amazing community. Your health is our priority, today and always.Join us in this special celebration! 🩺❤️#MRDHHSC20thAnniversary #FreeConsultations",
    category: "Events",
    date: "2023-09-04",
    readTime: "1 min read",
    author: "Admin",
    image: "/news/FREE-CONSULTATION-1024x576.jpg",
    featured: false,
  },
];

export function getNews(): NewsArticle[] {
  return news;
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return news.find((a) => a.slug === slug);
}

export const NEWS_CATEGORIES = [
  "All",
  "Hospital News",
  "Events",
  "Awards",
  "Health Tips",
  "Community",
] as const;

export function getNewsCategories(): string[] {
  return [...NEWS_CATEGORIES];
}
