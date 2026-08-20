const PLACEHOLDER_IMAGE = "https://placehold.co/600x800/e2e2e2/808080?text=Image+Coming+Soon";

export const products = [
  {
    sku: "ESS-TSH-001",
    name: "Essential Cotton T-Shirt",

    description:
      "A soft and comfortable cotton t-shirt designed for everyday wear with a clean and versatile look.",

    price: 1499,

    size: ["S", "M", "L", "XL", "XXL"],

    highlights: [
      "100% premium cotton",
      "Soft and breathable fabric",
      "Regular comfortable fit",
      "Suitable for everyday wear",
      "Easy to maintain",
    ],

    image: [
      { side: "front", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/front" },
      { side: "back", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/back" },
      { side: "left", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/left" },
      { side: "right", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/right" },
      {
        side: "detail",
        url: "https://res.cloudinary.com/dk6bcwjlg/image/upload/cotton_t-shirt_uve51p.png",
        publicId: "cotton_t-shirt_uve51p",
      },
    ],

    stock: 80,

    collections: ["Everyday Essentials", "Classic Collection"],
    isActive: true,
  },

  {
    sku: "ESS-LIN-002",
    name: "Relaxed Linen Shirt",

    description:
      "A lightweight linen shirt with a relaxed silhouette, perfect for casual and smart-casual occasions.",

    price: 2499,

    size: ["S", "M", "L", "XL"],

    highlights: [
      "Premium linen blend",
      "Lightweight and breathable",
      "Relaxed fit",
      "Button-down design",
      "Ideal for warm weather",
    ],

    image: [
      { side: "front", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/front" },
      { side: "back", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/back" },
      { side: "left", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/left" },
      { side: "right", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/right" },
      {
        side: "detail",
        url: "https://res.cloudinary.com/dk6bcwjlg/image/upload/linen_cjruf0.jpg",
        publicId: "linen_cjruf0",
      },
    ],

    stock: 45,

    collections: ["Everyday Essentials", "New Arrivals"],
    isActive: true,
  },

  {
    sku: "NEW-HOD-003",
    name: "Urban Oversized Hoodie",

    description:
      "A modern oversized hoodie featuring a relaxed fit and premium fleece construction for everyday comfort.",

    price: 2999,

    size: ["S", "M", "L", "XL", "XXL"],

    highlights: [
      "Premium fleece fabric",
      "Oversized modern fit",
      "Soft inner lining",
      "Adjustable hood",
      "Kangaroo front pocket",
    ],

    image: [
      { side: "front", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/front" },
      { side: "back", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/back" },
      { side: "left", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/left" },
      { side: "right", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/right" },
      {
        side: "detail",
        url: "https://res.cloudinary.com/dk6bcwjlg/image/upload/Screenshot_2026-08-20_184218_g2p0le.png",
        publicId: "Screenshot_2026-08-20_184218_g2p0le",
      },
    ],

    stock: 35,

    collections: ["New Arrivals", "Everyday Essentials"],
    isActive: true,
  },

  {
    sku: "PRE-BLZ-004",
    name: "Premium Tailored Blazer",

    description:
      "A sophisticated tailored blazer crafted for a polished and premium appearance on formal occasions.",

    price: 5999,

    size: ["S", "M", "L", "XL"],

    highlights: [
      "Premium tailored fabric",
      "Structured silhouette",
      "Modern slim fit",
      "High-quality lining",
      "Suitable for formal occasions",
    ],

    image: [
      { side: "front", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/front" },
      { side: "back", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/back" },
      { side: "left", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/left" },
      { side: "right", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/right" },
      {
        side: "detail",
        url: "https://res.cloudinary.com/dk6bcwjlg/image/upload/blazer_spyfrz.jpg",
        publicId: "blazer_spyfrz",
      },
    ],

    stock: 20,

    collections: ["Premium Collection"],
    isActive: true,
  },

  {
    sku: "CLA-TRS-005",
    name: "Classic Straight Fit Trousers",

    description:
      "Timeless straight-fit trousers designed with a clean silhouette and versatile styling for everyday and formal wear.",

    price: 2799,

    size: ["S", "M", "L", "XL", "XXL"],

    highlights: [
      "Classic straight fit",
      "Comfortable waistband",
      "Durable fabric",
      "Clean tailored appearance",
      "Versatile styling",
    ],

    image: [
      { side: "front", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/front" },
      { side: "back", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/back" },
      { side: "left", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/left" },
      { side: "right", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/right" },
      {
        side: "detail",
        url: "https://res.cloudinary.com/dk6bcwjlg/image/upload/trouser_naltdj.jpg",
        publicId: "trouser_naltdj",
      },
    ],

    stock: 55,

    collections: ["Classic Collection", "Everyday Essentials"],
    isActive: true,
  },

  {
    sku: "PRE-OSJ-006",
    name: "Premium Overshirt Jacket",

    description:
      "A contemporary premium overshirt combining the structure of a jacket with the comfort of a casual shirt.",

    price: 4499,

    size: ["M", "L", "XL", "XXL"],

    highlights: [
      "Premium heavyweight fabric",
      "Modern relaxed fit",
      "Durable construction",
      "Multiple utility pockets",
      "Layer-friendly design",
    ],

    image: [
      { side: "front", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/front" },
      { side: "back", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/back" },
      { side: "left", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/left" },
      { side: "right", url: PLACEHOLDER_IMAGE, publicId: "products/essential-cotton-tshirt/right" },
      {
        side: "detail",
        url: "https://res.cloudinary.com/dk6bcwjlg/image/upload/overshirt_b49ypc.jpg",
        publicId: "overshirt_b49ypc",
      },
    ],

    stock: 28,

    collections: ["Premium Collection", "New Arrivals"],
    isActive: true,
  },
];
