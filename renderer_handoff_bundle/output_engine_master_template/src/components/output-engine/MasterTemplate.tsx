/**
 * Output Engine — Master Template
 *
 * Page-level composition for the rendered customer site. One template, six
 * preset configs (toggled via `data-preset` on <body>). Section order is
 * locked; sections that return null are skipped without affecting rhythm.
 *
 * Earned dark moments: Hero (§2) + CTABlock (§10). Footer is chrome.
 */
import * as React from "react";
import type { WizardData } from "./types";

import { SiteNav } from "./sections/SiteNav";
import { JumpNav } from "./sections/JumpNav";
import { HeroSection } from "./sections/HeroSection";
import { TrustBar } from "./sections/TrustBar";
import { ProblemSection } from "./sections/ProblemSection";
import { ServicesGrid } from "./sections/ServicesGrid";
import { ProcessSection } from "./sections/ProcessSection";
import { BookingInline } from "./sections/BookingInline";
import { AboutSection } from "./sections/AboutSection";
import { SocialProofSection } from "./sections/SocialProofSection";
import { FAQSection } from "./sections/FAQSection";
import { LatestPosts } from "./sections/LatestPosts";
import { CTABlock } from "./sections/CTABlock";
import { CTABar } from "./sections/CTABar";
import { SiteFooter } from "./sections/SiteFooter";

import { VoiceAIWidget } from "./widgets/VoiceAIWidget";
import { ChatbotWidget } from "./widgets/ChatbotWidget";

import "./styles/master-template.css";

interface Props { data: WizardData }

export const MasterTemplate: React.FC<Props> = ({ data }) => {
  const enabled = new Set(data.modules.enabled);
  const brandStyle: React.CSSProperties = {
    // The customer's brand colour drives --site-primary across every preset.
    ["--site-primary" as any]: data.brand.primaryColor,
    ["--site-cta" as any]: data.brand.ctaColor || "#c2410c",
  };

  return (
    <div data-preset={data.preset} style={brandStyle}>
      <SiteNav brand={data.brand} structure={data.structure} connections={data.connections} />
      <JumpNav />

      <HeroSection brand={data.brand} content={data.content} structure={data.structure} />
      <TrustBar logos={data.content.trustLogos} />
      <ProblemSection content={data.content} />
      <ServicesGrid content={data.content} />
      <ProcessSection steps={data.content.processSteps} />
      {enabled.has("booking") && <BookingInline data={data} />}
      <AboutSection content={data.content} connections={data.connections} />
      <SocialProofSection content={data.content} modules={data.modules} />
      <FAQSection faqs={data.content.faqs} connections={data.connections} />
      {enabled.has("social") && <LatestPosts posts={data.content.socialPosts} />}
      <CTABlock content={data.content} connections={data.connections} structure={data.structure} />
      <CTABar message={data.content.ctaBarMessage} emailModuleEnabled={enabled.has("email")} />
      <SiteFooter brand={data.brand} structure={data.structure} connections={data.connections} />

      {enabled.has("voiceAI") && <VoiceAIWidget />}
      {enabled.has("chatbot") && <ChatbotWidget />}
    </div>
  );
};
