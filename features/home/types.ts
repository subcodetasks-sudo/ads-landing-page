export type NavItem = {
  label: string;
  href: string;
};

export type HeroContent = {
  badge: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
};

export type SectionIntro = {
  title: string;
  description: string;
};

export type Feature = {
  title: string;
  description: string;
};

export type Project = {
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type Plan = {
  name: string;
  description: string;
  price: string;
  priceSuffix: string;
  cta: string;
  featured?: boolean;
  badge?: string;
  features: string[];
};

export type ContactSection = {
  title: string;
  description: string;
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    servicePlaceholder: string;
    serviceOptions: { value: string; label: string }[];
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
  };
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterContent = {
  brand: string;
  description: string;
  links: FooterLink[];
};

export type FinalCta = {
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
};

export type HomePageContent = {
  brand: string;
  homeHref: string;
  nav: NavItem[];
  hero: HeroContent;
  whyChooseUs: SectionIntro & { items: Feature[] };
  work: SectionIntro & { items: Project[]; cta: string };
  plans: SectionIntro & { items: Plan[] };
  testimonials: SectionIntro & { items: Testimonial[] };
  contact: ContactSection;
  finalCta: FinalCta;
  footer: FooterContent;
};
