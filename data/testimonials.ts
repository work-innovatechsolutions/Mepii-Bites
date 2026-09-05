export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  productPurchased: string;
  verified: boolean;
  avatarBg: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Riya Mathur",
    city: "Bandra, Mumbai",
    rating: 5,
    comment: "The Mepii Bites Makhana Pudhina is next level! The mint flavor is so crisp and aromatic, and love the clear reusable jar. My entire team at work is hooked now.",
    productPurchased: "Makhana (Pudhina)",
    verified: true,
    avatarBg: "bg-terracotta"
  },
  {
    id: "test-2",
    name: "Arjun Srinivasan",
    city: "Indiranagar, Bengaluru",
    rating: 5,
    comment: "The Quinoa Finger Peri Peri has the perfect crunch without being greasy. It genuinely feels light on the gut like the jar says. Replacing all our fried snacks with Mepii Bites.",
    productPurchased: "Quinoa Finger (Peri Peri)",
    verified: true,
    avatarBg: "bg-sage"
  },
  {
    id: "test-3",
    name: "Neha Kapoor",
    city: "Defence Colony, Delhi",
    rating: 5,
    comment: "The Quinoa Straws with Chocolate are pure genius. My kids crave chocolate in the evening and this gives them ancient grains with real cocoa. Snack Happy Stay Mepii!",
    productPurchased: "Quinoa Straws (Chocolate)",
    verified: true,
    avatarBg: "bg-mango"
  },
  {
    id: "test-4",
    name: "Kabir Varma",
    city: "Koregaon Park, Pune",
    rating: 5,
    comment: "The Ragi Chips surprised me the most. Usually ragi snacks taste chalky or heavy, but Mepii made them as light as wafers with that chatpata desi kick.",
    productPurchased: "Wholesome Ragi Chips",
    verified: true,
    avatarBg: "bg-cocoa"
  },
  {
    id: "test-5",
    name: "Ananya Iyer",
    city: "Jubilee Hills, Hyderabad",
    rating: 5,
    comment: "Ordered the Movie Night Binge Box for our weekend binge. The Pudhina Makhana + Quinoa Chips combo disappeared before intermission. 10/10 recommend.",
    productPurchased: "Movie Night Binge Box",
    verified: true,
    avatarBg: "bg-sage-dark"
  }
];
