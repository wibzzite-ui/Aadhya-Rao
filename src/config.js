/**
 * ============================================================
 * AADHYA RAO BEAUTY — SITE CONFIGURATION
 * ============================================================
 * 
 * All configurable business values and portfolio data.
 * Update these values when connecting real business details.
 * 
 * ============================================================
 */

const base = import.meta.env.BASE_URL || '/';

export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const SITE_CONFIG = {
  // Brand Identity
  brandName: 'Aadhya Rao',
  brandTitle: 'Makeup Artist & Bridal Beauty Specialist',
  brandTagline: 'Your features. Your story. Your kind of beautiful.',
  
  // Main Artist Portrait Configuration
  heroPortrait: {
    src: getAssetUrl('images/aadhya-portrait.jpg'),
    alt: 'Aadhya Rao, makeup artist in Bengaluru',
    expectedPath: 'public/images/aadhya-portrait.jpg',
  },

  // Location Reference (Bengaluru, India)
  location: {
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    serviceArea: 'Bengaluru & travel upon request',
    mapsUrl: 'https://www.google.com/maps/place/Bengaluru,+Karnataka,+India',
  },

  // Instagram Profile (Configurable)
  instagram: {
    handle: '@aadhyarao.beauty',
    url: 'https://instagram.com', // Update with verified profile URL
    isConfigured: false,
  },

  // WhatsApp Business (Configurable)
  whatsapp: {
    phoneNumber: '', // Set WhatsApp business number (e.g. '919876543210')
    defaultMessage: 'Hello Aadhya! I would like to enquire about makeup services for an upcoming occasion.',
    isConfigured: false,
  },

  // Contact Form (Configurable)
  contact: {
    endpoint: '', // Configure Formspree or custom API endpoint
    isConfigured: false,
  },
};

/**
 * Curated Six Portfolio Projects (Completely separate from artist portrait)
 * Concept projects curated for distinct occasions, lighting, and moods.
 */
export const PORTFOLIO_PROJECTS = [
  {
    id: 'modern-bride',
    title: 'The Modern Bride',
    category: 'Bridal',
    image: getAssetUrl('images/modern-minimal.jpg'),
    alt: 'The Modern Bride — refined, luminous Indian bridal makeup with understated elegance',
    shortDescription: 'Refined, understated bridal styling with skin-first radiance and delicate definition.',
    fullDescription: 'A study in contemporary elegance — sheer, buildable coverage, soft champagne accents on the eyes, and a finish that allows your natural skin texture to glow through ceremony and celebrations.',
    approach: 'Skin-first prep with luminous hydration, subtle sculpt, and soft warm neutrals tailored to the bridal palette.',
    details: ['Luminous skin-first finish', 'Soft champagne eye accent', 'Tailored brow definition', 'Hydrating neutral lip'],
  },
  {
    id: 'rose-first-light',
    title: 'Rose at First Light',
    category: 'Engagement',
    image: getAssetUrl('images/rose-gold-engagement.jpg'),
    alt: 'Rose at First Light — romantic engagement makeup with warm rose gold undertones',
    shortDescription: 'Romantic engagement beauty with warm rose gold tones and dewy, effortless luminosity.',
    fullDescription: 'Designed for intimate celebratory light — warm rose-gold metallic tones on the lids, soft flush on the cheeks, and a fresh, dewy complexion that feels both celebratory and intimately personal.',
    approach: 'Layered rosy luminescence with fine micro-shimmer that catches natural sunlight and studio flash alike.',
    details: ['Rose-gold micro-metallic wash', 'Flushed dewy cheeks', 'Natural flutter lash', 'Soft satin rose lip'],
  },
  {
    id: 'study-in-gold',
    title: 'A Study in Gold',
    category: 'Reception',
    image: getAssetUrl('images/golden-hour.jpg'),
    alt: 'A Study in Gold — warm golden hour reception makeup with sculpted elegance',
    shortDescription: 'Warm golden radiance, sculpted bone structure, and seamless transition into evening celebration.',
    fullDescription: 'Formulated for evening lights and celebration — warm amber and gold highlights balance deep definition, creating a commanding yet harmonious presence across stage and reception floor.',
    approach: 'Dimensional highlighting focused on the high planes of the face, complemented by rich warm undertones and defined liner.',
    details: ['Dimensional golden glow', 'Sculpted cheekbone definition', 'Defined kohl framing', 'Warm terracotta lip'],
  },
  {
    id: 'soft-focus',
    title: 'Soft Focus',
    category: 'Occasion',
    image: getAssetUrl('images/party-look.jpg'),
    alt: 'Soft Focus — effortless occasion makeup with warm bronze notes and velvety radiance',
    shortDescription: 'Effortless occasion makeup with glowing skin, soft bronze tones, and versatile elegance.',
    fullDescription: 'Glamour without heaviness — soft-focus diffusion across the skin, warm bronze eye shading, and individual lash clusters for an easy, elevated finish suited to sangeets, cocktail dinners, or festive evenings.',
    approach: 'Lightweight perfecting base paired with seamless blending so you feel like the most confident version of yourself.',
    details: ['Soft-focus velvet skin', 'Warm bronze gradient', 'Feathered brow finish', 'Nude satin lip'],
  },
  {
    id: 'after-dark-edit',
    title: 'The After-Dark Edit',
    category: 'Editorial',
    image: getAssetUrl('images/smoky-eye.jpg'),
    alt: 'The After-Dark Edit — expressive editorial beauty with modern smoky definition',
    shortDescription: 'Expressive editorial artistry featuring rich smoky definition and intentional modern contrast.',
    fullDescription: 'Creative expression meeting modern editorial aesthetics — smoky, smudged kohl eyes contrasted with glass-like skin and quiet lips. A look crafted with deliberate restraint and artistic intensity.',
    approach: 'Deep jewel and charcoal diffusion with high-shine high points, celebrating symmetry and raw mood.',
    details: ['Smoky kohl diffusion', 'Minimal glass skin', 'Understated nude lip', 'Editorial lighting balance'],
  },
  {
    id: 'tradition-reframed',
    title: 'Tradition, Reframed',
    category: 'Bridal',
    image: getAssetUrl('images/traditional-bride.jpg'),
    alt: 'Tradition, Reframed — classic South Asian bridal elegance reimagined with modern lightness',
    shortDescription: 'Classic ceremonial Indian bridal beauty honoring traditional heritage with a breathable, modern finish.',
    fullDescription: 'A respectful homage to bridal heritage — rich ceremonial vermilion, intricate gold jewellery, and classic eye definition reimagined with contemporary lightness so the makeup feels fresh, weightless, and enduring through hours of rituals.',
    approach: 'Long-wearing ritual-resistant formulation with precise liner work and rich lip definition balanced against supple skin.',
    details: ['Ritual-ready long wear', 'Precise winged kohl', 'Classic ceremonial red lip', 'Seamless jewellery integration'],
  },
];

/**
 * Curated Services (Simple list without invented fixed prices)
 */
export const SERVICES = [
  {
    id: 'bridal',
    title: 'Bridal Makeup',
    tagline: 'Ceremonial & wedding morning',
    description: 'Comprehensive bridal beauty shaped around your facial architecture, skin undertone, and wedding ensemble. Tailored for comfort through long ceremonies and flawless camera presence.',
    image: getAssetUrl('images/traditional-bride.jpg'),
    alt: 'Bridal makeup styling',
  },
  {
    id: 'engagement',
    title: 'Engagement & Pre-Wedding',
    tagline: 'Intimate ceremonies & celebrations',
    description: 'Romantic, radiant makeup designed to celebrate your milestone. Balanced for daylight ceremonies or candlelit evenings with luminous, breathable skin.',
    image: getAssetUrl('images/rose-gold-engagement.jpg'),
    alt: 'Engagement makeup styling',
  },
  {
    id: 'reception',
    title: 'Reception Glamour',
    tagline: 'High-impact evening styling',
    description: 'A striking, transformed evening look with sculpted depth and statement features designed to command the room under ballroom and banquet lighting.',
    image: getAssetUrl('images/royal-reception.jpg'),
    alt: 'Reception makeup styling',
  },
  {
    id: 'occasion',
    title: 'Occasion & Sangeet',
    tagline: 'Celebrations, sangeets & cocktails',
    description: 'Effortless, dance-proof glamour for family celebrations, milestone parties, and festive occasions. Polished, expressive, and tailored to you.',
    image: getAssetUrl('images/party-look.jpg'),
    alt: 'Occasion and celebration styling',
  },
  {
    id: 'editorial',
    title: 'Editorial & Creative',
    tagline: 'Fashion shoots & conceptual briefs',
    description: 'Distinctive makeup artistry for fashion campaigns, editorial shoots, and creative visual projects with precise technical execution.',
    image: getAssetUrl('images/smoky-eye.jpg'),
    alt: 'Editorial and creative makeup',
  },
  {
    id: 'consultation',
    title: 'Consultation & Look Design',
    tagline: 'One-on-one personalized planning',
    description: 'An intimate discussion to map out your aesthetic direction, discuss skin preparation routines, review outfit swatches, and design your bespoke look.',
    image: getAssetUrl('images/artist-portrait.jpg'),
    alt: 'Personal consultation session',
  },
];
