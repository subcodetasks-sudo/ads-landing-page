import type { HomePageContent } from "@/features/home/types";

type StructuredDataProps = {
  locale: string;
  brand: HomePageContent["brand"];
  hero: HomePageContent["hero"];
  whyChooseUs: HomePageContent["whyChooseUs"];
  work: HomePageContent["work"];
  plans: HomePageContent["plans"];
  contact: HomePageContent["contact"];
  testimonials: HomePageContent["testimonials"];
};

export function HomeStructuredData({
  locale,
  brand,
  hero,
  whyChooseUs,
  work,
  plans,
  contact,
  testimonials,
}: StructuredDataProps) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: brand,
      description: hero.description,
      slogan: hero.title,
      email: "hello@subcode.co",
      knowsAbout: whyChooseUs.items.map((item) => item.title),
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: brand,
      serviceType: whyChooseUs.items.map((item) => item.title),
      description: whyChooseUs.description,
      areaServed: locale === "ar" ? "السعودية والمنطقة العربية" : "Saudi Arabia and the wider MENA region",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: plans.title,
        itemListElement: plans.items.map((plan) => ({
          "@type": "Offer",
          name: plan.name,
          description: plan.description,
          itemOffered: {
            "@type": "Service",
            name: plan.name,
            description: plan.features.join(", "),
          },
        })),
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@subcode.co",
        availableLanguage: locale === "ar" ? ["Arabic", "English"] : ["English", "Arabic"],
      },
      review: testimonials.items.map((item) => ({
        "@type": "Review",
        reviewBody: item.quote,
        author: {
          "@type": "Person",
          name: item.name,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
        },
      })),
      makesOffer: work.items.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.description,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: contact.title,
      description: contact.description,
      about: {
        "@type": "Organization",
        name: brand,
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
