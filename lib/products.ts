export type Product = {
  id: string
  slug: string
  name: string
  brand: string
  price: number
  category: 'Coats' | 'Knitwear' | 'Shirts' | 'Trousers' | 'Shoes' | 'Bags' | 'Accessories'
  color: string
  colors: string[]
  sizes: string[]
  image: string
  isNew?: boolean
  description: string
  details: string[]
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'wool-cashmere-overcoat',
    name: 'Wool and Cashmere Overcoat',
    brand: 'Atelier Verdun',
    price: 1890,
    category: 'Coats',
    color: 'Camel',
    colors: ['Camel', 'Charcoal'],
    sizes: ['44', '46', '48', '50', '52'],
    image: '/products/overcoat.png',
    isNew: true,
    description:
      'A timeless single-breasted overcoat cut from a sumptuous wool and cashmere blend in a warm camel tone. Tailored in Italy with a clean, elongated silhouette.',
    details: [
      '90% virgin wool, 10% cashmere',
      'Notch lapels, single-breasted front',
      'Fully lined, two front flap pockets',
      'Made in Italy',
    ],
  },
  {
    id: '2',
    slug: 'cashmere-crewneck-sweater',
    name: 'Cashmere Crewneck Sweater',
    brand: 'Mira Knitwear',
    price: 420,
    category: 'Knitwear',
    color: 'Charcoal',
    colors: ['Charcoal', 'Camel'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/products/knit-sweater.png',
    description:
      'Spun from pure grade-A Mongolian cashmere, this crewneck offers featherweight warmth with a refined hand-feel that softens with every wear.',
    details: ['100% grade-A cashmere', 'Ribbed crewneck, cuffs and hem', 'Dry clean only', 'Made in Scotland'],
  },
  {
    id: '3',
    slug: 'cotton-oxford-shirt',
    name: 'Cotton Oxford Shirt',
    brand: 'Cole & Hart',
    price: 180,
    category: 'Shirts',
    color: 'White',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/products/white-shirt.png',
    description:
      'A wardrobe cornerstone. This crisp white oxford is woven from long-staple cotton and finished with a button-down collar and mother-of-pearl buttons.',
    details: ['100% long-staple cotton', 'Button-down collar', 'Mother-of-pearl buttons', 'Machine washable'],
  },
  {
    id: '4',
    slug: 'tailored-wool-trousers',
    name: 'Tailored Wool Trousers',
    brand: 'Atelier Verdun',
    price: 360,
    category: 'Trousers',
    color: 'Charcoal',
    colors: ['Charcoal'],
    sizes: ['30', '32', '34', '36', '38'],
    image: '/products/wool-trousers.png',
    description:
      'Sharply tailored trousers in a fine charcoal wool, cut with a straight leg and a clean, flat front for a polished finish.',
    details: ['100% virgin wool', 'Straight leg, flat front', 'Side and back pockets', 'Made in Italy'],
  },
  {
    id: '5',
    slug: 'leather-low-top-sneakers',
    name: 'Leather Low-Top Sneakers',
    brand: 'Marlowe',
    price: 295,
    category: 'Shoes',
    color: 'White',
    colors: ['White'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    image: '/products/leather-sneakers.png',
    isNew: true,
    description:
      'Minimalist low-top sneakers handcrafted from supple Italian calf leather, set on a tonal rubber sole for understated everyday luxury.',
    details: ['Italian calf leather upper', 'Rubber outsole', 'Leather lining', 'Handcrafted in Portugal'],
  },
  {
    id: '6',
    slug: 'leather-weekender-bag',
    name: 'Leather Weekender Bag',
    brand: 'Saddler',
    price: 980,
    category: 'Bags',
    color: 'Brown',
    colors: ['Brown'],
    sizes: ['One Size'],
    image: '/products/leather-bag.png',
    description:
      'A generously proportioned holdall in full-grain vegetable-tanned leather that develops a rich patina over time. Built for the discerning traveller.',
    details: ['Full-grain vegetable-tanned leather', 'Brass hardware', 'Detachable shoulder strap', 'Made in England'],
  },
  {
    id: '7',
    slug: 'tortoiseshell-sunglasses',
    name: 'Tortoiseshell Sunglasses',
    brand: 'Lens & Co',
    price: 240,
    category: 'Accessories',
    color: 'Tortoise',
    colors: ['Tortoise'],
    sizes: ['One Size'],
    image: '/products/sunglasses.png',
    description:
      'Hand-polished acetate sunglasses in a classic tortoiseshell finish with gradient lenses offering full UV protection.',
    details: ['Hand-polished acetate frame', 'CR-39 gradient lenses', '100% UV protection', 'Made in Italy'],
  },
  {
    id: '8',
    slug: 'automatic-steel-watch',
    name: 'Automatic Steel Watch',
    brand: 'Horloge',
    price: 2450,
    category: 'Accessories',
    color: 'Steel',
    colors: ['Steel'],
    sizes: ['One Size'],
    image: '/products/watch.png',
    isNew: true,
    description:
      'A precision Swiss automatic movement housed in a brushed stainless steel case, finished with a hand-stitched leather strap.',
    details: ['Swiss automatic movement', 'Brushed stainless steel case', 'Sapphire crystal', '50m water resistance'],
  },
  {
    id: '9',
    slug: 'washed-denim-jacket',
    name: 'Washed Denim Jacket',
    brand: 'Marlowe',
    price: 320,
    category: 'Coats',
    color: 'Indigo',
    colors: ['Indigo'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/products/denim-jacket.png',
    description:
      'A classic trucker jacket in washed indigo selvedge denim with a relaxed fit and antique-finish hardware.',
    details: ['100% selvedge cotton denim', 'Antique-finish buttons', 'Chest and side pockets', 'Made in Japan'],
  },
  {
    id: '10',
    slug: 'printed-silk-scarf',
    name: 'Printed Silk Scarf',
    brand: 'Mira Knitwear',
    price: 165,
    category: 'Accessories',
    color: 'Burgundy',
    colors: ['Burgundy'],
    sizes: ['One Size'],
    image: '/products/silk-scarf.png',
    description:
      'A lustrous silk twill scarf featuring an archival print in burgundy and cream, hand-rolled at the edges.',
    details: ['100% silk twill', 'Hand-rolled edges', 'Archival print', 'Made in Italy'],
  },
  {
    id: '11',
    slug: 'suede-chelsea-boots',
    name: 'Suede Chelsea Boots',
    brand: 'Marlowe',
    price: 540,
    category: 'Shoes',
    color: 'Brown',
    colors: ['Brown'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    image: '/products/chelsea-boots.png',
    description:
      'Elegant chelsea boots in soft brown suede with elasticated side panels and a leather sole, Goodyear-welted for longevity.',
    details: ['Premium suede upper', 'Goodyear-welted leather sole', 'Elasticated side gussets', 'Made in England'],
  },
  {
    id: '12',
    slug: 'merino-wool-rollneck',
    name: 'Merino Wool Rollneck',
    brand: 'Mira Knitwear',
    price: 280,
    category: 'Knitwear',
    color: 'Camel',
    colors: ['Camel', 'Charcoal'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/products/knit-sweater.png',
    description:
      'A fine-gauge merino rollneck offering elegant warmth beneath tailoring or worn alone. Naturally temperature-regulating.',
    details: ['100% extra-fine merino wool', 'Fine-gauge knit', 'Roll neck', 'Machine washable'],
  },
  {
    id: '13',
    slug: 'drakes-striped-shirt',
    name: 'Striped Cotton Oxford Shirt',
    brand: "Drake's",
    price: 240,
    category: 'Shirts',
    color: 'Red',
    colors: ['Red', 'White'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/products/w2000_q60.webp',
    isNew: true,
    description:
      "A classic button-down collar shirt from Drake's, crafted from breathable cotton with clean red and white stripes. Finished with a chest pocket and mother-of-pearl buttons.",
    details: ['100% cotton', 'Button-down collar', 'Chest patch pocket', 'Made in England'],
  },
  {
    id: '14',
    slug: 'charcoal-denim-trousers',
    name: 'Charcoal Denim Trousers',
    brand: 'Atelier Verdun',
    price: 310,
    category: 'Trousers',
    color: 'Charcoal',
    colors: ['Charcoal'],
    sizes: ['30', '32', '34', '36', '38'],
    image: '/products/w2000_q60 (1).webp',
    description:
      'Cut from a durable structured cotton twill denim, these charcoal five-pocket trousers feature a straight-leg cut for an elegant daily wardrobe option.',
    details: ['100% cotton denim', 'Five-pocket design', 'Straight leg', 'Made in Italy'],
  },
  {
    id: '15',
    slug: 'bode-plaid-wool-jacket',
    name: 'Plaid Wool Shirt-Jacket',
    brand: 'Bode',
    price: 620,
    category: 'Coats',
    color: 'Red',
    colors: ['Red'],
    sizes: ['M', 'L', 'XL'],
    image: '/products/w2000_q60 (2).webp',
    isNew: true,
    description:
      'Taking inspiration from vintage workwear, this Bode shirt-jacket is tailored from a soft plaid wool blend. Designed with a camp collar and front patch pockets.',
    details: ['80% wool, 20% nylon', 'Camp collar, button front', 'Two lower front patch pockets', 'Dry clean only'],
  },
  {
    id: '16',
    slug: 'inis-meain-zip-cardigan',
    name: 'Knitted Zip-Up Cardigan',
    brand: 'Inis Meáin',
    price: 580,
    category: 'Knitwear',
    color: 'Beige',
    colors: ['Beige'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/products/w2000_q60 (3).webp',
    description:
      'Knitted on the Aran Islands, this beige zip-up cardigan features a heavy-gauge texture with subtle oatmeal flecks. Finished with a two-way zip closure and ribbed trims.',
    details: ['100% merino wool', 'Two-way zip closure', 'Oatmeal fleck texture', 'Made in Ireland'],
  },
  {
    id: '17',
    slug: 'marlowe-suede-sneakers-brown',
    name: 'Brown Suede Sneakers',
    brand: 'Marlowe',
    price: 280,
    category: 'Shoes',
    color: 'Brown',
    colors: ['Brown'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    image: '/products/w2000_q60 (4).webp',
    description:
      'Premium brown suede low-top sneakers featuring contrast stitching, white laces, and a thick off-white vulcanized rubber sole for daily casual wear.',
    details: ['Premium suede upper', 'Vulcanized rubber sole', 'Leather lining', 'Handcrafted in Portugal'],
  },
  {
    id: '18',
    slug: 'kiton-knit-polo-shirt',
    name: 'Knit Cotton Polo Shirt',
    brand: 'Kiton',
    price: 680,
    category: 'Shirts',
    color: 'Steel',
    colors: ['Steel'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/products/w2000_q60 (5).webp',
    isNew: true,
    description:
      'Exquisitely crafted by Kiton in Italy, this light lavender-grey polo shirt is knitted from premium long-staple cotton for a luxurious and breathable fit.',
    details: ['100% premium cotton', 'Three-button placket', 'Ribbed collar and cuffs', 'Made in Italy'],
  },
]

export const categories = [
  'Coats',
  'Knitwear',
  'Shirts',
  'Trousers',
  'Shoes',
  'Bags',
  'Accessories',
] as const

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getRelated(product: Product) {
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}
