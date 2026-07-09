import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/features/home/components/section-heading";
import SpotlightCard from "@/features/home/components/spotlight-card";
import type { HomePageContent } from "@/features/home/types";

type TestimonialsSectionProps = {
  section: HomePageContent["testimonials"];
};

export function TestimonialsSection({ section }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading title={section.title} description={section.description} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {section.items.map((item) => (
            <SpotlightCard
              key={`${item.name}-${item.role}`}
              className="h-full rounded-2xl"
              spotlightColor="rgba(34, 211, 238, 0.22)"
            >
              <Card className="h-full rounded-[inherit] border border-slate-200/80 bg-white/95 shadow-[0_4px_20px_rgba(0,66,97,0.08)] backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="text-sm tracking-[0.3em] text-amber-400">★★★★★</div>
                  <blockquote className="mt-5 text-base leading-7 text-slate-600">“{item.quote}”</blockquote>
                  <div className="mt-8">
                    <p className="text-lg font-semibold text-brand-accent">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.role}</p>
                  </div>
                </CardContent>
              </Card>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
