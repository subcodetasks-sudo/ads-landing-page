import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  buildHomeMetadata,
  buildHomePageContent,
  ContactSection,
  HeroSection,
  HomeHeader,
  HomeStructuredData,
  PlansSection,
  SiteFooter,
  TestimonialsSection,
  WhyChooseUsSection,
  WorkSection,
} from "@/features/home";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  return buildHomeMetadata(locale, t);
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const content = buildHomePageContent(locale, t);

  return (
    <>
      <HomeStructuredData
        locale={locale}
        brand={content.brand}
        hero={content.hero}
        whyChooseUs={content.whyChooseUs}
        work={content.work}
        plans={content.plans}
        contact={content.contact}
        testimonials={content.testimonials}
      />
      <main className="w-full overflow-x-hidden bg-white text-slate-900">
        <HomeHeader
          brand={content.brand}
          homeHref={content.homeHref}
          nav={content.nav}
        />
        <HeroSection hero={content.hero} />
        <WhyChooseUsSection section={content.whyChooseUs} />
        <WorkSection section={content.work} />
        <PlansSection section={content.plans} />
        <TestimonialsSection section={content.testimonials} />
        <ContactSection section={content.contact} />
      </main>
      <SiteFooter footer={content.footer} />
    </>
  );
}