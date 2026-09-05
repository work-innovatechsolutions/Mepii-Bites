export interface Category {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  badge?: string;
  count: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Roasted Makhana",
    slug: "roasted-makhana",
    shortDescription: "Featherlight popped water-lily seeds slow-roasted in cold-pressed oils.",
    description: "Slow roasted, never fried. Our signature Pudhina, Peri Peri, and Salt & Pepper foxnuts combine airy crunch with fresh Indian herbs and spices.",
    image: "/products/makhana-pudhina.png",
    badge: "Fan Favourite",
    count: 4
  },
  {
    id: "cat-2",
    name: "Millet & Quinoa Crisps",
    slug: "millet-and-quinoa-crisps",
    shortDescription: "Crunchy Quinoa fingers, chips, ragi, jowar puffs, and vacuum-cooked veggies.",
    description: "Packed with fiber and plant nutrition. Made from whole quinoa, ragi, jowar, and farm-fresh beetroot, slow roasted and vacuum-cooked for serious crunch lovers.",
    image: "/products/quinoa-finger-peri-peri.png",
    badge: "Supergrain Power",
    count: 10
  },
  {
    id: "cat-3",
    name: "Nuts & Seeds",
    slug: "nuts-and-seeds",
    shortDescription: "Authentic Kerala Nendran banana chips roasted with fresh pudhina and pepper.",
    description: "Sun-ripened Nendran bananas sliced paper-thin and slow-roasted in cold-pressed coconut oil with mint and Malabar pepper.",
    image: "/products/banana-chips-salt-pepper.png",
    badge: "Kerala Special",
    count: 2
  },
  {
    id: "cat-4",
    name: "Trail Mixes",
    slug: "trail-mixes",
    shortDescription: "Authentic cocktail mixture and crunchy millet bhujia sev with peri-peri kick.",
    description: "Traditional Indian evening namkeen elevated with ancient millets, roasted nuts, curry leaves, and spicy African bird's eye chilli.",
    image: "/products/cocktail-mixture.png",
    badge: "High Crunch",
    count: 2
  },
  {
    id: "cat-5",
    name: "Healthy Bites",
    slug: "healthy-bites",
    shortDescription: "Chocolate & strawberry quinoa straws for guilt-free sweet cravings.",
    description: "Crunchy puffed supergrain straws delicately enrobed in single-origin dark chocolate and freeze-dried strawberry cream.",
    image: "/products/quinoa-straws-chocolate.png",
    badge: "Clean Sweet",
    count: 2
  },
  {
    id: "cat-6",
    name: "Curated Combos",
    slug: "curated-combos",
    shortDescription: "Multi-jar binge bundles & luxury festive gift boxes featuring all client jars.",
    description: "Save up to 21% with our most requested Mepii Bites festive gift boxes and party snacking hampers.",
    image: "/hero.png",
    badge: "Save Up To 21%",
    count: 2
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
