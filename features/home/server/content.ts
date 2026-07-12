import type { HomePageContent } from "@/features/home/types";

type Translator = (key: string) => string;

export function buildHomePageContent(locale: string, t: Translator): HomePageContent {
  return {
    brand: t("brand"),
    homeHref: locale === "ar" ? "/" : `/${locale}`,
    nav: [
      { label: t("nav.services"), href: "#services" },
      { label: t("nav.work"), href: "#work" },
      { label: t("nav.pricing"), href: "#pricing" },
      { label: t("nav.testimonials"), href: "#testimonials" },
      { label: t("nav.contact"), href: "#contact" },
    ],
    hero: {
      badge: t("hero.badge"),
      title: t("hero.title"),
      description: t("hero.description"),
      primaryCta: t("hero.primaryCta"),
      secondaryCta: t("hero.secondaryCta"),
    },
    whyChooseUs: {
      title: t("whyChooseUs.title"),
      description: t("whyChooseUs.description"),
      items: [
        {
          title: t("whyChooseUs.items.0.title"),
          description: t("whyChooseUs.items.0.description"),
        },
        {
          title: t("whyChooseUs.items.1.title"),
          description: t("whyChooseUs.items.1.description"),
        },
        {
          title: t("whyChooseUs.items.2.title"),
          description: t("whyChooseUs.items.2.description"),
        },
        {
          title: t("whyChooseUs.items.3.title"),
          description: t("whyChooseUs.items.3.description"),
        },
        {
          title: t("whyChooseUs.items.4.title"),
          description: t("whyChooseUs.items.4.description"),
        },
        {
          title: t("whyChooseUs.items.5.title"),
          description: t("whyChooseUs.items.5.description"),
        },
        {
          title: t("whyChooseUs.items.6.title"),
          description: t("whyChooseUs.items.6.description"),
        },
        {
          title: t("whyChooseUs.items.7.title"),
          description: t("whyChooseUs.items.7.description"),
        },
      ],
    },
    work: {
      title: t("work.title"),
      description: t("work.description"),
      cta: t("work.cta"),
      items: [
        {
          title: t("work.items.0.title"),
          description: t("work.items.0.description"),
        },
        {
          title: t("work.items.1.title"),
          description: t("work.items.1.description"),
        },
        {
          title: t("work.items.2.title"),
          description: t("work.items.2.description"),
        },
      ],
    },
    plans: {
      title: t("plans.title"),
      description: t("plans.description"),
      includesLabel: t("plans.includesLabel"),
      items: [
        {
          name: t("plans.items.0.name"),
          description: t("plans.items.0.description"),
          cta: t("plans.items.0.cta"),
          features: Array.from({ length: 8 }, (_, index) => t(`plans.items.0.features.${index}`)),
        },
        {
          name: t("plans.items.1.name"),
          description: t("plans.items.1.description"),
          cta: t("plans.items.1.cta"),
          featured: true,
          badge: t("plans.items.1.badge"),
          featuresIntro: t("plans.items.1.featuresIntro"),
          features: Array.from({ length: 8 }, (_, index) => t(`plans.items.1.features.${index}`)),
        },
        {
          name: t("plans.items.2.name"),
          description: t("plans.items.2.description"),
          note: t("plans.items.2.note"),
          cta: t("plans.items.2.cta"),
          features: Array.from({ length: 9 }, (_, index) => t(`plans.items.2.features.${index}`)),
        },
      ],
    },
    testimonials: {
      title: t("testimonials.title"),
      description: t("testimonials.description"),
      items: [
        {
          quote: t("testimonials.items.0.quote"),
          name: t("testimonials.items.0.name"),
          role: t("testimonials.items.0.role"),
        },
        {
          quote: t("testimonials.items.1.quote"),
          name: t("testimonials.items.1.name"),
          role: t("testimonials.items.1.role"),
        },
        {
          quote: t("testimonials.items.2.quote"),
          name: t("testimonials.items.2.name"),
          role: t("testimonials.items.2.role"),
        },
      ],
    },
    contact: {
      title: t("contact.title"),
      description: t("contact.description"),
      form: {
        nameLabel: t("contact.form.nameLabel"),
        namePlaceholder: t("contact.form.namePlaceholder"),
        emailLabel: t("contact.form.emailLabel"),
        emailPlaceholder: t("contact.form.emailPlaceholder"),
        phoneLabel: t("contact.form.phoneLabel"),
        phonePlaceholder: t("contact.form.phonePlaceholder"),
        serviceLabel: t("contact.form.serviceLabel"),
        servicePlaceholder: t("contact.form.servicePlaceholder"),
        serviceOptions: [
          { value: "mvp-development", label: t("contact.form.serviceOptions.0") },
          { value: "full-cycle-build", label: t("contact.form.serviceOptions.1") },
          { value: "enterprise-scale", label: t("contact.form.serviceOptions.2") },
        ],
        messageLabel: t("contact.form.messageLabel"),
        messagePlaceholder: t("contact.form.messagePlaceholder"),
        submitLabel: t("contact.form.submitLabel"),
      },
    },
    finalCta: {
      title: t("contact.title"),
      description: t("contact.description"),
      primaryCta: t("contact.form.submitLabel"),
      secondaryCta: t("nav.services"),
    },
    footer: {
      brand: t("brand"),
      description: t("footer.description"),
      links: [
        { label: t("footer.links.0"), href: "#" },
        { label: t("footer.links.1"), href: "#" },
        { label: t("footer.links.2"), href: "#" },
        { label: t("footer.links.3"), href: "#contact" },
      ],
    },
  };
}
