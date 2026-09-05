export interface ProductSize {
  label: string;
  grams: string;
  price: number;
}

export interface ProductNutrition {
  calories: number;
  protein: string;
  carbs: string;
  fiber: string;
  fat: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  images: [string, string];
  sizes: ProductSize[];
  tags: string[];
  ingredients: string[];
  nutrition: ProductNutrition;
  dietary: string[];
  flavor: "Spicy" | "Tangy" | "Savory" | "Sweet" | "Classic Salted";
  featured?: boolean;
  bestseller?: boolean;
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "mepii-01",
    name: "Mepii Bites Makhana (Pudhina)",
    slug: "makhana-pudhina",
    category: "Roasted Makhana",
    shortDescription: "Signature slow-roasted foxnuts tossed in refreshing sun-dried mint and Himalayan rock salt.",
    description: "The crown jewel of Mepii Bites. Hand-harvested lotus seeds (foxnuts) slow-roasted to peak crunchiness in cold-pressed oils, infused with aromatic sun-dried garden pudhina (mint), crushed rock salt, roasted cumin, and black pepper. Featherlight on the stomach, crisp on the palate, and 100% roasted.",
    price: 229,
    originalPrice: 279,
    discount: 18,
    rating: 4.9,
    reviewCount: 384,
    images: [
      "/products/makhana-pudhina.png",
      "/products/gallery/banana-chips-pudina-2.jpeg"
    ],
    sizes: [
      { label: "80g Jar", grams: "80g Reusable Jar", price: 229 },
      { label: "160g Pack", grams: "2 x 80g Jars", price: 419 },
      { label: "320g Jumbo", grams: "4 x 80g Jars", price: 749 }
    ],
    tags: ["Real Product", "Bestseller", "Mint Fresh", "Light On Gut", "Source of Fiber"],
    ingredients: ["Roasted Foxnuts (Makhana)", "Cold-Pressed Oil", "Pudhina (Mint Leaves) Powder", "Rock Salt", "Roasted Cumin", "Black Pepper"],
    nutrition: {
      calories: 112,
      protein: "4.0g",
      carbs: "17.5g",
      fiber: "3.9g",
      fat: "2.8g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Roasted Not Fried", "Light on Gut", "Zero Palm Oil"],
    flavor: "Tangy",
    featured: true,
    bestseller: true,
    inStock: true
  },
  {
    id: "mepii-02",
    name: "Mepii Bites Quinoa Finger (Peri Peri)",
    slug: "quinoa-finger-peri-peri",
    category: "Millet & Quinoa Crisps",
    shortDescription: "Crunchy golden quinoa fingers layered with fiery African bird's eye peri-peri seasoning.",
    description: "Snack happy with our signature Quinoa Fingers! Crafted from ancient Peruvian quinoa grain, baked and roasted to unmatched crunchiness, then generously tumbled with spicy African bird's eye chilli, tangy lemon zest, and rock salt. The undisputed party favorite.",
    price: 249,
    originalPrice: 299,
    discount: 17,
    rating: 4.9,
    reviewCount: 295,
    images: [
      "/products/quinoa-finger-peri-peri.png",
      "/products/gallery/quinoa-finger-peri-peri-2.jpeg"
    ],
    sizes: [
      { label: "100g Jar", grams: "100g Jar", price: 249 },
      { label: "200g Pack", grams: "2 x 100g Jars", price: 459 },
      { label: "400g Stash", grams: "4 x 100g Jars", price: 829 }
    ],
    tags: ["Real Product", "Bestseller", "Spicy Kick", "High Fiber", "Supergrain"],
    ingredients: ["Quinoa Flour", "Whole Grain Cereals", "Peri Peri Seasoning (Red Chilli, Garlic, Onion, Paprika)", "Sunflower Oil (misted)", "Himalayan Pink Salt"],
    nutrition: {
      calories: 122,
      protein: "4.8g",
      carbs: "18.2g",
      fiber: "4.6g",
      fat: "3.1g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Roasted & Baked", "Zero Palm Oil", "Trans Fat Free"],
    flavor: "Spicy",
    featured: true,
    bestseller: true,
    inStock: true
  },
  {
    id: "mepii-03",
    name: "Mepii Bites Quinoa Chips",
    slug: "quinoa-chips",
    category: "Millet & Quinoa Crisps",
    shortDescription: "Ultra-crisp popped quinoa crisps seasoned with artisanal chatpata herb blend.",
    description: "Upgrade your chip cravings without the oil slick! Whole grain quinoa roasted into featherweight crunchy chips dusted with a mouthwatering Indian spice blend. Crunchy, tangy, and deeply satisfying.",
    price: 219,
    originalPrice: 269,
    discount: 19,
    rating: 4.8,
    reviewCount: 218,
    images: [
      "/products/quinoa-chips.png",
      "/products/gallery/quinoa-chips-2.png"
    ],
    sizes: [
      { label: "90g Jar", grams: "90g Reusable Jar", price: 219 },
      { label: "180g Duo", grams: "2 x 90g Jars", price: 399 }
    ],
    tags: ["Real Product", "High Crunch", "Superfood", "Light Snack"],
    ingredients: ["Quinoa Flour", "Tapioca Starch", "Chaat Masala Blend", "Rock Salt", "Cold-Pressed Vegetable Oil"],
    nutrition: {
      calories: 116,
      protein: "3.6g",
      carbs: "17.0g",
      fiber: "3.4g",
      fat: "3.0g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Zero Trans Fat", "No Preservatives"],
    flavor: "Tangy",
    featured: true,
    bestseller: true,
    inStock: true
  },
  {
    id: "mepii-04",
    name: "Mepii Bites Ragi Chips",
    slug: "ragi-chips",
    category: "Millet & Quinoa Crisps",
    shortDescription: "Calcium-rich Himalayan finger millet chips infused with southern curry spices.",
    description: "Ancient Indian nutrition in every crunch! Made from certified finger millet (Ragi), recognized as nature's richest plant source of calcium and dietary fiber. Roasted to golden perfection with tempered curry leaves, cumin, and sea salt.",
    price: 219,
    originalPrice: 269,
    discount: 19,
    rating: 4.8,
    reviewCount: 176,
    images: [
      "/products/ragi-chips.png",
      "/products/gallery/ragi-chips-2.jpeg"
    ],
    sizes: [
      { label: "90g Jar", grams: "90g Jar", price: 219 },
      { label: "180g Duo", grams: "2 x 90g Jars", price: 399 }
    ],
    tags: ["Real Product", "Calcium Rich", "Millet Power", "Iron Source"],
    ingredients: ["Finger Millet (Ragi Flour)", "Rice Bran Oil (misted)", "Curry Leaf Seasoning", "Sea Salt", "Dry Mango"],
    nutrition: {
      calories: 110,
      protein: "3.2g",
      carbs: "18.5g",
      fiber: "4.8g",
      fat: "2.4g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "High Calcium", "Diabetic Friendly"],
    flavor: "Savory",
    featured: true,
    bestseller: false,
    inStock: true
  },
  {
    id: "mepii-05",
    name: "Mepii Bites Quinoa Straws (Chocolate)",
    slug: "quinoa-straws-chocolate",
    category: "Healthy Bites",
    shortDescription: "Crispy roasted quinoa straws enrobed in decadent single-origin dark chocolate.",
    description: "Who said clean snacking can't be intensely chocolatey? Airy quinoa straws extruded and baked to snap, then delicately coated in single-origin Indian dark chocolate. Satisfies your sweet tooth with zero guilt and zero palm oil.",
    price: 269,
    originalPrice: 329,
    discount: 18,
    rating: 5.0,
    reviewCount: 342,
    images: [
      "/products/quinoa-straws-chocolate.png",
      "/products/gallery/quinoa-straws-chocolate-2.jpeg"
    ],
    sizes: [
      { label: "100g Jar", grams: "100g Jar", price: 269 },
      { label: "200g Pack", grams: "2 x 100g Jars", price: 499 }
    ],
    tags: ["Real Product", "Bestseller", "Dark Chocolate", "Dessert Crunch"],
    ingredients: ["Quinoa Flour", "Dark Cocoa (65%)", "Raw Cane Sugar", "Cocoa Butter", "Natural Vanilla"],
    nutrition: {
      calories: 135,
      protein: "3.9g",
      carbs: "19.0g",
      fiber: "3.1g",
      fat: "4.8g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "No Palm Oil", "Clean Sweet"],
    flavor: "Sweet",
    featured: true,
    bestseller: true,
    inStock: true
  },
  {
    id: "mepii-06",
    name: "Mepii Bites Quinoa Straws (Strawberry)",
    slug: "quinoa-straws-strawberry",
    category: "Healthy Bites",
    shortDescription: "Crunchy puffed quinoa straws dusted with real Mahabaleshwar strawberry cream.",
    description: "A delightful fruity crunch loved by kids and adults alike! Crispy puffed supergrain straws coated with naturally freeze-dried strawberry powder and velvety dairy cream. Sweet, tangy, and dangerously poppable.",
    price: 269,
    originalPrice: 329,
    discount: 18,
    rating: 4.9,
    reviewCount: 198,
    images: [
      "/products/quinoa-straws-strawberry.png",
      "/products/gallery/quinoa-straws-strawberry-2.jpeg"
    ],
    sizes: [
      { label: "100g Jar", grams: "100g Jar", price: 269 },
      { label: "200g Pack", grams: "2 x 100g Jars", price: 499 }
    ],
    tags: ["Real Product", "Berry Crunch", "Kids Favorite", "Fruity Sweet"],
    ingredients: ["Quinoa Flour", "Freeze-Dried Strawberry Powder", "Milk Solids", "Raw Sugar", "Cocoa Butter"],
    nutrition: {
      calories: 130,
      protein: "3.5g",
      carbs: "19.5g",
      fiber: "2.9g",
      fat: "4.2g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "No Artificial Colors", "Zero Palm Oil"],
    flavor: "Sweet",
    featured: false,
    bestseller: false,
    inStock: true
  },
  {
    id: "mepii-07",
    name: "Mepii Bites Makhana (Peri Peri)",
    slug: "makhana-peri-peri",
    category: "Roasted Makhana",
    shortDescription: "Signature jumbo foxnuts coated in fiery peri peri spice with tangy citrus notes.",
    description: "Crisp popped lotus seeds slow-roasted in cold-pressed oil and dusted with our secret peri-peri blend of bird's eye chilli, garlic, oregano, and lemon zest. A flavor bomb that keeps your fingers coming back for more.",
    price: 239,
    originalPrice: 289,
    discount: 17,
    rating: 4.9,
    reviewCount: 312,
    images: [
      "/products/makhana-peri-peri.png",
      "/products/gallery/makhana-peri-peri-2.jpeg"
    ],
    sizes: [
      { label: "80g Jar", grams: "80g Jar", price: 239 },
      { label: "160g Duo", grams: "2 x 80g Jars", price: 439 }
    ],
    tags: ["Real Product", "Spicy Kick", "Roasted Foxnuts", "Fan Favorite"],
    ingredients: ["Roasted Foxnuts", "Peri Peri Spices (Chilli, Onion, Garlic)", "Himalayan Salt", "Cold Pressed Oil"],
    nutrition: {
      calories: 115,
      protein: "4.1g",
      carbs: "17.0g",
      fiber: "4.0g",
      fat: "2.9g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Roasted Not Fried", "Zero Palm Oil"],
    flavor: "Spicy",
    featured: true,
    bestseller: true,
    inStock: true
  },
  {
    id: "mepii-08",
    name: "Mepii Bites Makhana (Salt & Pepper)",
    slug: "makhana-salt-pepper",
    category: "Roasted Makhana",
    shortDescription: "Purist roasted foxnuts seasoned with crushed tellicherry peppercorns and pink salt.",
    description: "The timeless classic. Jumbo Grade-A makhana roasted to crisp perfection and seasoned simply with freshly ground Tellicherry black pepper and pink rock salt. Light, pure, and infinitely snackable.",
    price: 229,
    originalPrice: 279,
    discount: 18,
    rating: 4.8,
    reviewCount: 245,
    images: [
      "/products/makhana-salt-pepper.png",
      "/products/gallery/makhana-salt-pepper-2.jpeg"
    ],
    sizes: [
      { label: "80g Jar", grams: "80g Jar", price: 229 },
      { label: "160g Duo", grams: "2 x 80g Jars", price: 419 }
    ],
    tags: ["Real Product", "Festive Jar", "Classic Crunch", "Pepper Kick"],
    ingredients: ["Roasted Foxnuts", "Tellicherry Black Pepper", "Himalayan Pink Salt", "Cold Pressed Oil"],
    nutrition: {
      calories: 110,
      protein: "4.0g",
      carbs: "17.2g",
      fiber: "3.8g",
      fat: "2.6g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Roasted Not Fried", "Zero Added Sugar"],
    flavor: "Classic Salted",
    featured: false,
    bestseller: true,
    inStock: true
  },
  {
    id: "mepii-09",
    name: "Mepii Bites Makhan Crispies",
    slug: "makhan-crispies",
    category: "Roasted Makhana",
    shortDescription: "Ultra-crunchy bite-sized makhana crispies layered with savory chaat aromatics.",
    description: "A playful, addictive take on foxnuts! Extruded and roasted into crunchy little pillows, infused with roasted cumin, mango powder, and black salt. Melts in your mouth with an intoxicating savory burst.",
    price: 219,
    originalPrice: 269,
    discount: 19,
    rating: 4.8,
    reviewCount: 184,
    images: [
      "/products/makhan-crispies.png",
      "/products/gallery/makhan-crispies-2.jpeg"
    ],
    sizes: [
      { label: "80g Jar", grams: "80g Jar", price: 219 },
      { label: "160g Duo", grams: "2 x 80g Jars", price: 399 }
    ],
    tags: ["Real Product", "Chaat Masala", "Super Crunch", "Tea Time"],
    ingredients: ["Puffed Makhana Meal", "Edible Vegetable Oil", "Amchur", "Black Salt", "Cumin"],
    nutrition: {
      calories: 114,
      protein: "3.8g",
      carbs: "17.6g",
      fiber: "3.5g",
      fat: "2.8g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Trans Fat Free", "Snack Happy Stay Mepii"],
    flavor: "Tangy",
    featured: false,
    bestseller: false,
    inStock: true
  },
  {
    id: "mepii-10",
    name: "Mepii Bites Banana Chips (Pudina)",
    slug: "banana-chips-pudina",
    category: "Nuts & Seeds",
    shortDescription: "Crispy Kerala Nendran banana wafers infused with fresh mint and mountain rock salt.",
    description: "Direct from Kerala! Authentic sun-ripened Nendran raw bananas sliced paper-thin, crisp-roasted to golden brilliance, and tossed in garden pudhina powder and sea salt. Refreshingly crispy.",
    price: 219,
    originalPrice: 269,
    discount: 19,
    rating: 4.9,
    reviewCount: 220,
    images: [
      "/products/banana-chips-pudina.png",
      "/products/gallery/banana-chips-pudina-2.jpeg"
    ],
    sizes: [
      { label: "100g Jar", grams: "100g Jar", price: 219 },
      { label: "200g Duo", grams: "2 x 100g Jars", price: 399 }
    ],
    tags: ["Real Product", "Kerala Special", "Minty Crunch", "Nendran Banana"],
    ingredients: ["Raw Nendran Bananas", "Cold Pressed Coconut & Sunflower Oil", "Pudhina Powder", "Rock Salt"],
    nutrition: {
      calories: 128,
      protein: "1.9g",
      carbs: "18.4g",
      fiber: "3.2g",
      fat: "5.1g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Zero Palm Oil", "No Preservatives"],
    flavor: "Tangy",
    featured: true,
    bestseller: true,
    inStock: true
  },
  {
    id: "mepii-11",
    name: "Mepii Bites Banana Chips (Salt & Pepper)",
    slug: "banana-chips-salt-pepper",
    category: "Nuts & Seeds",
    shortDescription: "Traditional Kerala golden banana wafers seasoned with coarse black pepper and rock salt.",
    description: "The gold standard of banana chips. Pure Nendran banana rounds fried in cold-pressed oil, drained, and hand-tumbled with cracked Malabar black peppercorns and pink salt.",
    price: 219,
    originalPrice: 269,
    discount: 19,
    rating: 4.8,
    reviewCount: 195,
    images: [
      "/products/banana-chips-salt-pepper.png",
      "/products/gallery/banana-chips-salt-pepper-2.jpeg"
    ],
    sizes: [
      { label: "100g Jar", grams: "100g Jar", price: 219 },
      { label: "200g Duo", grams: "2 x 100g Jars", price: 399 }
    ],
    tags: ["Real Product", "Pepper Twist", "Traditional Taste", "Crispy Rounds"],
    ingredients: ["Nendran Banana", "Malabar Black Pepper", "Rock Salt", "Vegetable Oil"],
    nutrition: {
      calories: 126,
      protein: "1.8g",
      carbs: "18.2g",
      fiber: "3.1g",
      fat: "5.0g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Trans Fat Free", "Authentic Sourcing"],
    flavor: "Classic Salted",
    featured: false,
    bestseller: false,
    inStock: true
  },
  {
    id: "mepii-12",
    name: "Mepii Bites Beetroot Chips",
    slug: "beetroot-chips",
    category: "Millet & Quinoa Crisps",
    shortDescription: "Ruby-red vacuum cooked beetroot crisps dusted with chatpata masala.",
    description: "Real farm-grown beetroots vacuum-cooked at low temperatures to lock in their natural deep ruby color, natural nitrates, and earthy sweetness. Lightly seasoned with dry mango and rock salt.",
    price: 249,
    originalPrice: 299,
    discount: 17,
    rating: 4.9,
    reviewCount: 234,
    images: [
      "/products/beetroot-chips.png",
      "/products/gallery/beetroot-chips-2.jpeg"
    ],
    sizes: [
      { label: "90g Jar", grams: "90g Jar", price: 249 },
      { label: "180g Duo", grams: "2 x 90g Jars", price: 469 }
    ],
    tags: ["Real Product", "Festive Jar", "Vacuum Cooked", "Ruby Red"],
    ingredients: ["Farm Fresh Beetroot", "Cold-Pressed Vegetable Oil", "Himalayan Rock Salt", "Amchur", "Chaat Spices"],
    nutrition: {
      calories: 118,
      protein: "2.4g",
      carbs: "16.8g",
      fiber: "5.1g",
      fat: "3.2g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Trans Fat Free", "No Preservatives"],
    flavor: "Tangy",
    featured: true,
    bestseller: true,
    inStock: true
  },
  {
    id: "mepii-13",
    name: "Mepii Bites Broccoli Chips",
    slug: "broccoli-chips",
    category: "Millet & Quinoa Crisps",
    shortDescription: "Crunchy green broccoli florets vacuum-cooked to crispy perfection with sea salt.",
    description: "Eat your greens the delicious way! Real whole broccoli florets gently vacuum-cooked to preserve their chlorophyll, vitamins, and antioxidants. Crispy, airy, and seasoned with sea salt and garlic.",
    price: 269,
    originalPrice: 329,
    discount: 18,
    rating: 4.9,
    reviewCount: 165,
    images: [
      "/products/broccoli-chips.png",
      "/products/gallery/broccoli-chips-2.png"
    ],
    sizes: [
      { label: "80g Jar", grams: "80g Jar", price: 269 },
      { label: "160g Duo", grams: "2 x 80g Jars", price: 499 }
    ],
    tags: ["Real Product", "Green Superfood", "Vacuum Cooked", "Antioxidants"],
    ingredients: ["Fresh Broccoli Florets", "Edible Vegetable Oil", "Sea Salt", "Garlic Powder"],
    nutrition: {
      calories: 112,
      protein: "4.2g",
      carbs: "14.0g",
      fiber: "6.0g",
      fat: "3.0g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Keto Friendly", "High Fiber"],
    flavor: "Savory",
    featured: false,
    bestseller: false,
    inStock: true
  },
  {
    id: "mepii-14",
    name: "Mepii Bites Mix Veg Chips",
    slug: "mix-veg-chips",
    category: "Millet & Quinoa Crisps",
    shortDescription: "A rainbow medley of vacuum-cooked sweet potato, carrot, okra, and green beans.",
    description: "A colorful garden crunch! Premium assorted vegetables vacuum-cooked to seal in their natural colors, fibers, and nutrients. An extraordinary crunchy snack without grease.",
    price: 259,
    originalPrice: 319,
    discount: 19,
    rating: 4.9,
    reviewCount: 204,
    images: [
      "/products/mix-veg-chips.png",
      "/products/gallery/mix-veg-chips-2.jpeg"
    ],
    sizes: [
      { label: "100g Jar", grams: "100g Jar", price: 259 },
      { label: "200g Duo", grams: "2 x 100g Jars", price: 489 }
    ],
    tags: ["Real Product", "Rainbow Veggies", "Vacuum Cooked", "High Fiber"],
    ingredients: ["Sweet Potato", "Carrot", "Green Beans", "Okra", "Cold Pressed Oil", "Rock Salt"],
    nutrition: {
      calories: 120,
      protein: "2.8g",
      carbs: "17.4g",
      fiber: "5.4g",
      fat: "3.4g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "No Preservatives", "Zero Trans Fat"],
    flavor: "Savory",
    featured: true,
    bestseller: false,
    inStock: true
  },
  {
    id: "mepii-15",
    name: "Mepii Bites Oats Chips",
    slug: "oats-chips",
    category: "Millet & Quinoa Crisps",
    shortDescription: "Heart-healthy rolled oats crisps baked with herbs, thyme, and roasted garlic.",
    description: "Who knew oats could taste this incredible? Baked into ultra-thin wavy crisps with whole grain rolled oats, enriched with thyme, oregano, and garlic. Great for heart health and cholesterol balance.",
    price: 219,
    originalPrice: 269,
    discount: 19,
    rating: 4.8,
    reviewCount: 145,
    images: [
      "/products/oats-chips.png",
      "/products/gallery/oats-chips-2.jpeg"
    ],
    sizes: [
      { label: "90g Jar", grams: "90g Jar", price: 219 },
      { label: "180g Duo", grams: "2 x 90g Jars", price: 399 }
    ],
    tags: ["Real Product", "Heart Health", "Baked Crisps", "Herb Seasoning"],
    ingredients: ["Rolled Oats Flour", "Rice Flour", "Olive Oil mist", "Herb Seasoning (Thyme, Oregano)", "Sea Salt"],
    nutrition: {
      calories: 115,
      protein: "4.0g",
      carbs: "17.0g",
      fiber: "4.2g",
      fat: "2.6g"
    },
    dietary: ["100% Vegetarian", "Beta-Glucan Rich", "Baked Not Fried", "Zero Palm Oil"],
    flavor: "Savory",
    featured: false,
    bestseller: false,
    inStock: true
  },
  {
    id: "mepii-16",
    name: "Mepii Bites Jowar Puff (BBQ)",
    slug: "jowar-puff-bbq",
    category: "Millet & Quinoa Crisps",
    shortDescription: "Air-popped Indian sorghum puffs glazed with smoky hickory BBQ spices and paprika.",
    description: "Crafted from wholesome Indian sorghum (jowar), air-popped for a featherlight melt-in-mouth crunch and dusted with rich barbecue spices, garlic, onion, and sea salt. 100% roasted, trans fat free, and packed with goodness.",
    price: 199,
    originalPrice: 249,
    discount: 20,
    rating: 4.8,
    reviewCount: 215,
    images: [
      "/products/jowar-puff-bbq.png",
      "/products/gallery/jowar-puff-bbq-2.jpeg"
    ],
    sizes: [
      { label: "100g Jar", grams: "100g Jar", price: 199 },
      { label: "200g Pack", grams: "2 x 100g Jars", price: 379 }
    ],
    tags: ["Real Product", "Festive Jar", "Roasted", "BBQ Flavor", "Trans Fat Free"],
    ingredients: ["Popped Jowar (Sorghum)", "BBQ Spice Seasoning", "Sunflower Oil (misted)", "Rock Salt", "Paprika"],
    nutrition: {
      calories: 108,
      protein: "3.8g",
      carbs: "18.0g",
      fiber: "4.2g",
      fat: "1.9g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Roasted Not Fried", "No Preservatives"],
    flavor: "Savory",
    featured: true,
    bestseller: true,
    inStock: true
  },
  {
    id: "mepii-17",
    name: "Mepii Bites Corn Waffers (Cream & Onion)",
    slug: "corn-waffers-cream-onion",
    category: "Millet & Quinoa Crisps",
    shortDescription: "Golden lattice corn wafers dusted with velvety sour cream and spring onion herbs.",
    description: "Crispy waffle-cut corn wafers baked to golden perfection and seasoned with rich creamy herbs, chives, and sweet spring onion. Light, airy, and impossibly crunchy.",
    price: 199,
    originalPrice: 249,
    discount: 20,
    rating: 4.8,
    reviewCount: 164,
    images: [
      "/products/corn-waffers-cream-onion.png",
      "/products/gallery/corn-waffers-cream-onion-2.jpeg"
    ],
    sizes: [
      { label: "85g Jar", grams: "85g Jar", price: 199 },
      { label: "170g Pack", grams: "2 x 85g Jars", price: 379 }
    ],
    tags: ["Real Product", "Festive Jar", "Cream & Onion", "Lattice Crunch"],
    ingredients: ["Corn Meal", "Cream & Onion Seasoning", "Parsley", "Chives", "Himalayan Salt", "Edible Vegetable Oil (misted)"],
    nutrition: {
      calories: 114,
      protein: "3.1g",
      carbs: "17.2g",
      fiber: "2.8g",
      fat: "3.0g"
    },
    dietary: ["100% Vegetarian", "Trans Fat Free", "No Preservatives", "Made With Goodness"],
    flavor: "Savory",
    featured: true,
    bestseller: false,
    inStock: true
  },
  {
    id: "mepii-18",
    name: "Mepii Bites Corn Waffers (Sweet & Thai)",
    slug: "corn-waffers-sweet-thai",
    category: "Millet & Quinoa Crisps",
    shortDescription: "Lattice corn wafers infused with sweet Thai chilli, lemongrass, and kaffir lime zest.",
    description: "An irresistible East-Asian crunch fusion! Baked lattice corn wafers coated in sweet Thai red chilli, fragrant lemongrass, and kaffir lime zest. Sweet, tangy, and subtly spicy.",
    price: 199,
    originalPrice: 249,
    discount: 20,
    rating: 4.9,
    reviewCount: 182,
    images: [
      "/products/corn-waffers-sweet-thai.png",
      "/products/gallery/corn-waffers-sweet-thai-2.jpeg"
    ],
    sizes: [
      { label: "85g Jar", grams: "85g Jar", price: 199 },
      { label: "170g Pack", grams: "2 x 85g Jars", price: 379 }
    ],
    tags: ["Real Product", "Sweet & Thai", "Zesty Lime", "Lattice Crunch"],
    ingredients: ["Corn Meal", "Sweet Thai Seasoning", "Lemongrass", "Red Chilli", "Sea Salt"],
    nutrition: {
      calories: 116,
      protein: "3.0g",
      carbs: "17.5g",
      fiber: "2.7g",
      fat: "3.1g"
    },
    dietary: ["100% Vegetarian", "Trans Fat Free", "No Preservatives", "Snack Happy Stay Mepii"],
    flavor: "Tangy",
    featured: false,
    bestseller: false,
    inStock: true
  },
  {
    id: "mepii-19",
    name: "Mepii Bites CockTail Mixture",
    slug: "cocktail-mixture",
    category: "Trail Mixes",
    shortDescription: "A festive royal medley of roasted pulses, boondi pearls, nuts & aromatic curry leaves.",
    description: "The classic Indian cocktail mixture elevated for modern wellness. Roasted pulses, crisp golden boondi, slow-roasted peanuts, cashews, and fresh fried curry leaves blended with signature aromatic spices.",
    price: 219,
    originalPrice: 269,
    discount: 19,
    rating: 4.9,
    reviewCount: 310,
    images: [
      "/products/cocktail-mixture.png",
      "/products/gallery/cocktail-mixture-2.jpeg"
    ],
    sizes: [
      { label: "150g Jar", grams: "150g Jar", price: 219 },
      { label: "300g Pack", grams: "2 x 150g Jars", price: 399 }
    ],
    tags: ["Real Product", "Festive Jar", "Party Favorite", "Crunch Delight"],
    ingredients: ["Roasted Bengal Gram", "Peanuts", "Cashews", "Curry Leaves", "Chilli & Coriander Spices", "Rock Salt"],
    nutrition: {
      calories: 138,
      protein: "5.2g",
      carbs: "14.5g",
      fiber: "3.6g",
      fat: "5.8g"
    },
    dietary: ["100% Vegetarian", "No Preservatives", "Trans Fat Free", "Snack Happy Stay Mepii"],
    flavor: "Spicy",
    featured: true,
    bestseller: true,
    inStock: true
  },
  {
    id: "mepii-20",
    name: "Mepii Bites Millet Bhujia (Peri Peri)",
    slug: "millet-bhujia-peri-peri",
    category: "Trail Mixes",
    shortDescription: "Fiber-rich ancient millet sev tossed in hot African bird's eye peri-peri spice.",
    description: "India's beloved bhujia sev re-invented! Made from nutrient-dense millets rather than refined flour, roasted with hot African bird's eye chilli, tangy amchur, and pink salt. All the nostalgic crunch, none of the grease.",
    price: 219,
    originalPrice: 269,
    discount: 19,
    rating: 4.9,
    reviewCount: 278,
    images: [
      "/products/millet-bhujia-peri-peri.png",
      "/products/gallery/millet-bhujia-peri-peri-2.jpeg"
    ],
    sizes: [
      { label: "120g Jar", grams: "120g Jar", price: 219 },
      { label: "240g Duo", grams: "2 x 120g Jars", price: 399 }
    ],
    tags: ["Real Product", "Millet Bhujia", "Spicy Peri Peri", "High Fiber"],
    ingredients: ["Millet Flour (Kodo & Barnyard)", "Gram Flour", "Peri Peri Seasoning", "Cold Pressed Oil", "Rock Salt"],
    nutrition: {
      calories: 125,
      protein: "4.5g",
      carbs: "16.0g",
      fiber: "4.0g",
      fat: "4.2g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Zero Palm Oil", "Trans Fat Free"],
    flavor: "Spicy",
    featured: true,
    bestseller: true,
    inStock: true
  },
  {
    id: "mepii-21",
    name: "Mepii Royal Festive Hamper (All 5 Jars)",
    slug: "royal-festive-hamper",
    category: "Curated Combos",
    shortDescription: "Luxury magnetic gift box featuring all 5 festive jars from the campaign banner.",
    description: "The crown jewel festive gift box! Includes full-sized jars of Jowar Puff BBQ, Makhana Salt & Pepper, Beetroot Chips, CockTail Mixture, and Corn Waffers Cream & Onion. Elegantly packaged with a handwritten festive greeting card.",
    price: 999,
    originalPrice: 1249,
    discount: 20,
    rating: 5.0,
    reviewCount: 412,
    images: [
      "/hero.png",
      "/products/gallery/whatsapp-image-2026-06-24-at-13-15-59.jpeg"
    ],
    sizes: [
      { label: "5 Jars Hamper", grams: "5 Full Sized Jars", price: 999 },
      { label: "Deluxe + Diya", grams: "5 Jars + Brass Diya", price: 1499 }
    ],
    tags: ["Festive Special", "Save 20%", "5 Full Jars", "Luxury Hamper"],
    ingredients: ["Jowar Puff BBQ", "Makhana Salt & Pepper", "Beetroot Chips", "CockTail Mixture", "Corn Waffers Cream & Onion"],
    nutrition: {
      calories: 118,
      protein: "4.2g",
      carbs: "16.5g",
      fiber: "4.0g",
      fat: "3.4g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Roasted Not Fried", "Pure Ingredients"],
    flavor: "Savory",
    featured: true,
    bestseller: true,
    inStock: true
  },
  {
    id: "mepii-22",
    name: "Mepii Weekend Binge Box (7 Bestsellers)",
    slug: "weekend-party-box",
    category: "Curated Combos",
    shortDescription: "7 bestselling supergrain jars & crisps for binge-watching and family gatherings.",
    description: "The ultimate variety box! Includes Makhana Pudhina, Quinoa Finger Peri Peri, Quinoa Chips, Ragi Chips, Quinoa Straws Chocolate, Banana Chips Pudina, and Millet Bhujia. Guaranteed to satisfy every craving in the house.",
    price: 1499,
    originalPrice: 1899,
    discount: 21,
    rating: 5.0,
    reviewCount: 640,
    images: [
      "/hero.png",
      "/products/quinoa-finger-peri-peri.png"
    ],
    sizes: [
      { label: "7 Jars", grams: "7 Full Size Snacks", price: 1499 },
      { label: "Deluxe Hamper", grams: "7 Gourmet Jars + Dip", price: 2499 }
    ],
    tags: ["Best Value", "Save 21%", "7 Snacks Pack", "Party Hamper"],
    ingredients: ["Pudhina Makhana", "Quinoa Finger", "Quinoa Chips", "Ragi Chips", "Quinoa Straws Chocolate", "Banana Chips", "Millet Bhujia"],
    nutrition: {
      calories: 125,
      protein: "5.5g",
      carbs: "15.0g",
      fiber: "3.8g",
      fat: "4.5g"
    },
    dietary: ["100% Vegetarian", "Gluten-Free", "Roasted Not Fried", "Snack Happy Stay Mepii"],
    flavor: "Spicy",
    featured: true,
    bestseller: true,
    inStock: true
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getBestsellers(): Product[] {
  return PRODUCTS.filter((p) => p.bestseller);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}
