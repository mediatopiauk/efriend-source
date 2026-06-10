/**
 * Output Engine — public exports.
 * Import the whole template: `import { MasterTemplate } from '@/components/output-engine'`
 * Import a single section: `import { HeroSection } from '@/components/output-engine'`
 */
export * from "./types";
export { MasterTemplate } from "./MasterTemplate";

export { SiteNav } from "./sections/SiteNav";
export { JumpNav } from "./sections/JumpNav";
export { HeroSection } from "./sections/HeroSection";
export { TrustBar } from "./sections/TrustBar";
export { ProblemSection } from "./sections/ProblemSection";
export { ServicesGrid } from "./sections/ServicesGrid";
export { ProcessSection } from "./sections/ProcessSection";
export { BookingInline } from "./sections/BookingInline";
export { AboutSection } from "./sections/AboutSection";
export { SocialProofSection } from "./sections/SocialProofSection";
export { FAQSection } from "./sections/FAQSection";
export { LatestPosts } from "./sections/LatestPosts";
export { CTABlock } from "./sections/CTABlock";
export { CTABar } from "./sections/CTABar";
export { SiteFooter } from "./sections/SiteFooter";

export { VoiceAIWidget } from "./widgets/VoiceAIWidget";
export { ChatbotWidget } from "./widgets/ChatbotWidget";

export { brightsideFixture } from "./fixtures/brightside";
