/**
 * Brightside Dog Grooming — canonical fixture for the master template.
 * Use this in component tests and Storybook stories.
 */
import type { WizardData } from "../types";

export const brightsideFixture: WizardData = {
  preset: "modern",
  brand: {
    businessName: "Brightside Dog Grooming",
    tagline: "Calm, careful grooming on Whiteladies Road",
    primaryColor: "#0d7a70",
    ctaColor: "#c2410c",
    logo: { kind: "text", mark: "B" },
    industry: "Pet care",
    founded: 2019,
    location: "Clifton, Bristol",
  },
  structure: {
    navLinks: [
      { label: "Services", href: "#services" },
      { label: "How it works", href: "#process" },
      { label: "About", href: "#about" },
      { label: "Book", href: "#booking" },
      { label: "FAQ", href: "#faq" },
    ],
    footerColumns: [
      { heading: "Visit", links: [
        { label: "14 Whiteladies Rd", href: "#" },
        { label: "Clifton, Bristol", href: "#" },
        { label: "BS8 2LD", href: "#" },
        { label: "Get directions →", href: "https://maps.google.com" },
      ] },
      { heading: "Hours", links: [
        { label: "Mon · Closed", href: "#" },
        { label: "Tue–Fri · 8am–5pm", href: "#" },
        { label: "Sat · 9am–4pm", href: "#" },
        { label: "Sun · Closed", href: "#" },
      ] },
      { heading: "Site", links: [
        { label: "Services", href: "#services" },
        { label: "About", href: "#about" },
        { label: "Reviews", href: "#testimonials" },
        { label: "Book", href: "#booking" },
      ] },
      { heading: "Legal", links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Cookies", href: "#" },
        { label: "Accessibility", href: "#" },
      ] },
    ],
    primaryCTA: { label: "Book a slot", href: "#booking" },
  },
  content: {
    heroEyebrow: "Clifton, Bristol · Since 2019",
    heroHeadline: "Grooming your dog will actually enjoy.",
    heroDescription:
      "Small-batch sessions, no cages, no rush. We're a quiet two-person studio on Whiteladies Road — and we book up two weeks ahead, so plan early.",
    heroTrustBullets: [
      "Cage-free studio",
      "4.9 ★ on Google (236 reviews)",
      "Insured & first-aid trained",
    ],
    trustLogos: [
      { name: "Bristol Post", style: "serif" },
      { name: "DogsToday", style: "tight" },
      { name: "CLIFTON LIFE", style: "spaced" },
      { name: "Pet Pro UK" },
      { name: "The Grooming Co.", style: "serif" },
    ],
    problemEyebrow: "Why we do it differently",
    problemHeadline: "You shouldn't have to apologise to your dog after a groom.",
    problemLede:
      "Most high-street groomers run a conveyor belt — eight dogs deep, cages, dryers blasting. The dog comes home wired, you feel guilty, and the cycle repeats every six weeks.",
    pains: [
      { title: "Cages and concrete floors", body: "Most studios kennel dogs between bath and dry. We don't — your dog is on the table or with us, and that's it." },
      { title: "One groomer, six dogs at once", body: "Industry average is 6–8 dogs in a session. We take two at a time, max. Less noise, less waiting, calmer dogs." },
      { title: "\"Just trim the eyes\" becomes £85", body: "We quote the price up front and stick to it. If your dog needs more time, we tell you before we start — never after." },
    ],
    services: [
      { name: "Full groom", description: "Bath, blow-dry, breed-specific cut, nails, ears, paw-pad trim. Our most-booked service.", price: "£52", duration: "90 min" },
      { name: "Bath & tidy", description: "For dogs in between full grooms. Bath, blow-dry, face and feet tidy, nails. Keeps coats out of trouble.", price: "£32", duration: "45 min" },
      { name: "Puppy intro", description: "A gentle first session for under-six-months. Lots of stops, treats, no clipper near the face. Sets habits early.", price: "£28", duration: "30 min" },
      { name: "Hand-strip", description: "For terriers, schnauzers, and other wire-coated breeds. Done by hand, the way the coat actually wants.", price: "£65", duration: "By breed" },
      { name: "Senior dog", description: "Slower pace, more breaks, anti-slip mats, low-temp dryers. For dogs who'd rather be home.", price: "£48", duration: "75 min" },
      { name: "Nail clip & file", description: "Walk-in friendly when we have a gap. Quick, calm, no fuss. Great for dogs who hate full grooms.", price: "£15", duration: "15 min" },
    ],
    processSteps: [
      { title: "Book online", body: "Pick a service, pick a slot. Takes about 90 seconds. No deposit on first bookings." },
      { title: "Drop-off chat", body: "Five minutes when you arrive — coat condition, any sore spots, the cut you want." },
      { title: "Calm session", body: "Two dogs in the studio at most. We text you when we start the dryer so you know we're nearly done." },
      { title: "Pickup & care notes", body: "You leave with brushing notes, the date of the next recommended groom, and a calmer dog." },
    ],
    aboutEyebrow: "About Brightside",
    aboutHeadline: "Two groomers, six years, a thousand-odd dogs.",
    aboutStory:
      "Brightside started in 2019 when Hannah moved her City & Guilds-qualified setup out of her kitchen and into a small unit on Whiteladies Road. Ellie joined a year later. We've stayed deliberately small — we'd rather know your dog's name than fit ten more in.",
    aboutBody:
      "We groom the way we'd want someone to groom our own dogs: slowly, with breaks, with care for older joints and nervous puppies. We refuse jobs that aren't kind — if your dog hates dryers, we'll towel-dry. If they panic on the table, we stop.",
    aboutMeta: [
      { value: "2019", label: "Founded" },
      { value: "1,200+", label: "Dogs groomed" },
      { value: "2", label: "Groomers, max at once" },
    ],
    stats: [
      { value: "4.9/5", label: "Across 236 Google reviews" },
      { value: "1,200+", label: "Dogs groomed since 2019" },
      { value: "94%", label: "Of clients rebook within 8 weeks" },
      { value: "2wks", label: "Average lead time" },
    ],
    testimonials: [
      { rating: 5, body: "Best groom Pip's ever had. He came home calm, tail wagging, and didn't shake himself off for an hour like he usually does. Hannah listens — that's the difference.", author: "Sarah M.", meta: "Cockapoo · regular since 2022" },
      { rating: 5, body: "Took my anxious rescue here after three other groomers refused to finish. They went at her pace, did half a groom, called me back the next week to finish. Worth every penny.", author: "James R.", meta: "Lurcher rescue · Bedminster" },
      { rating: 5, body: "Honest pricing. Quick, friendly, and they actually showed me how to maintain his coat between visits. Hard to find this level of care on a Bristol high street these days.", author: "Priya T.", meta: "Mini schnauzer · Redland" },
    ],
    faqs: [
      { question: "How far ahead do I need to book?", answer: "About two weeks for full grooms, less for bath & tidy. We hold a few short-notice slots each week for puppies and emergency mats — call us if you're stuck." },
      { question: "Do you take aggressive or anxious dogs?", answer: "We take anxious dogs as a speciality — quiet studio, longer slots, towel-dry options. We don't take dogs that need to be muzzled or sedated. If you're not sure, send a message and we'll be honest about whether we're the right fit." },
      { question: "What's your cancellation policy?", answer: "Free cancellation up to 24 hours before. Inside 24 hours we charge 50%. Repeated late cancels and we'll have a chat — we're a two-person studio, every slot matters." },
      { question: "Do you do pick-up and drop-off?", answer: "Not regularly, but we have a delivery partner for clients who can't drive — £8 each way within BS6, BS7, BS8 postcodes. Ask when booking." },
      { question: "What vaccinations do you require?", answer: "Up-to-date on DHP and Lepto, please. We don't require kennel cough but recommend it. Bring your card on the first visit and we'll keep a copy on file." },
    ],
    socialPosts: [
      { platform: "Instagram", body: "Meet Margot, a 14-year-old Westie who's been coming since week one. Senior groom, slow pace, two snack breaks. ❤", ago: "2 days ago" },
      { platform: "Instagram", body: "Two new puppy intro slots opened up next Thursday. Six-month-olds and under, perfect for first-timers. Link in bio.", ago: "1 week ago" },
      { platform: "Facebook", body: "Closed this Bank Holiday Monday — back Tuesday from 9am. We've squeezed an extra slot in on Wednesday for anyone who got stuck.", ago: "2 weeks ago" },
    ],
    ctaBlockHeadline: "Book a slot, or just come and meet us.",
    ctaBlockBody:
      "Drop in any weekday before 11am and we'll show you around the studio. We do free 10-minute meet-the-groomer sessions for nervous dogs — no commitment.",
    ctaBarMessage: "One email a month. Slot drops, dog-care tips, no spam.",
  },
  connections: {
    phone: "0117 555 0142",
    email: "hello@brightsidedogs.co.uk",
    address: "14 Whiteladies Road,\nClifton, Bristol BS8 2LD",
    hours: [{ day: "Tue–Sat", value: "8am–5pm" }],
    socials: [
      { name: "IG", href: "#" },
      { name: "FB", href: "#" },
      { name: "G", href: "#" },
    ],
  },
  modules: {
    enabled: ["voiceAI", "chatbot", "booking", "reviews", "email", "social"],
    reviewsLiveCount: 236,
    reviewsAverage: 4.9,
    bookingLeadTimeDays: 14,
  },
};
