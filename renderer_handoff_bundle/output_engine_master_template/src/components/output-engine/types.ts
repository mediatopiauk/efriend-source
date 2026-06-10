/**
 * Output Engine — typed wizard data contract
 *
 * Every section component takes a slice of WizardData. Sections render null
 * when their slice is empty, so MasterTemplate can compose without branching.
 */

export type Preset = "modern" | "minimal" | "bold" | "classic" | "playful" | "corporate";

export type GrowModule =
  | "voiceAI" | "chatbot" | "booking" | "reviews" | "crm" | "members"
  | "seoCoach" | "email" | "sms" | "social" | "print" | "invoicing";

export interface BrandData {
  businessName: string;
  tagline?: string;
  primaryColor: string;       // hex — drives --site-primary
  ctaColor?: string;          // optional — defaults to derived warm accent
  logo?: { kind: "image"; src: string } | { kind: "text"; mark: string };
  industry?: string;
  founded?: number;
  location?: string;          // free-text, e.g. "Clifton, Bristol"
}

export interface NavLink { label: string; href: string }
export interface StructureData {
  navLinks: NavLink[];
  footerColumns: { heading: string; links: NavLink[] }[];
  primaryCTA: { label: string; href: string };
}

export interface ServiceItem {
  name: string;
  description: string;
  price: string;              // pre-formatted, e.g. "£52"
  duration?: string;          // e.g. "90 min"
  imageUrl?: string;
}

export interface ProcessStep { title: string; body: string }
export interface FAQItem { question: string; answer: string }
export interface Testimonial {
  body: string;
  author: string;
  meta?: string;
  rating?: number;            // 1–5; default 5
}
export interface StatItem { value: string; label: string }

export interface AudiencePain { title: string; body: string }

export interface ContentData {
  heroEyebrow?: string;
  heroHeadline: string;
  heroDescription: string;
  heroImage?: string;
  heroTrustBullets?: string[];

  trustLogos?: { name: string; src?: string; style?: "serif" | "tight" | "spaced" }[];

  problemEyebrow?: string;
  problemHeadline?: string;
  problemLede?: string;
  pains?: AudiencePain[];

  services: ServiceItem[];
  processSteps?: ProcessStep[];

  aboutEyebrow?: string;
  aboutHeadline?: string;
  aboutStory?: string;
  aboutBody?: string;
  aboutImage?: string;
  aboutMeta?: { value: string; label: string }[];

  stats?: StatItem[];
  testimonials?: Testimonial[];
  faqs?: FAQItem[];

  socialPosts?: { platform: string; body: string; imageUrl?: string; ago: string }[];

  ctaBlockHeadline?: string;
  ctaBlockBody?: string;

  ctaBarMessage?: string;
}

export interface ConnectionsData {
  phone?: string;
  email?: string;
  address?: string;
  hours?: { day: string; value: string }[];
  socials?: { name: string; href: string }[];
}

export interface ModulesData {
  enabled: GrowModule[];
  reviewsLiveCount?: number;
  reviewsAverage?: number;    // out of 5
  bookingLeadTimeDays?: number;
}

export interface WizardData {
  preset: Preset;
  brand: BrandData;
  structure: StructureData;
  content: ContentData;
  connections: ConnectionsData;
  modules: ModulesData;
}
