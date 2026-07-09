import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StarBorder from "@/components/ui/star-border";
import { SectionHeading } from "@/features/home/components/section-heading";
import type { HomePageContent } from "@/features/home/types";

type PlansSectionProps = {
  section: HomePageContent["plans"];
};

export function PlansSection({ section }: PlansSectionProps) {
  return (
    <section id="pricing" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading title={section.title} description={section.description} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {section.items.map((plan) => {
            const featured = Boolean(plan.featured);
            const cardContent = (
              <CardContent className="flex h-full flex-col p-8">
                <div>
                  <h3 className={featured ? "text-4xl font-semibold text-white" : "text-4xl font-semibold text-brand-accent"}>
                    {plan.name}
                  </h3>
                  <p className={featured ? "mt-4 text-base leading-7 text-slate-100" : "mt-4 text-base leading-7 text-slate-600"}>
                    {plan.description}
                  </p>
                </div>

                <div className={featured ? "mt-8 border-t border-white/15 pt-8" : "mt-8 border-t border-slate-200 pt-8"}>
                  <div className="flex items-end gap-2">
                    <span className={featured ? "text-5xl font-bold text-white" : "text-5xl font-bold text-brand-accent"}>
                      {plan.price}
                    </span>
                    <span className={featured ? "pb-1 text-lg text-slate-100/90" : "pb-1 text-lg text-slate-500"}>
                      {plan.priceSuffix}
                    </span>
                  </div>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className={featured ? "mt-0.5 size-5 text-cyan-200" : "mt-0.5 size-5 text-brand-blue"} />
                      <span className={featured ? "text-base text-white" : "text-base text-slate-700"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <Button
                    asChild
                    className={[
                      "h-12 w-full rounded-xl border text-base font-semibold [a]:hover:bg-transparent",
                      featured
                        ? "border-brand-blue bg-brand-blue text-white hover:border-cyan-300 hover:bg-transparent hover:text-white"
                        : "border-slate-200 bg-white text-brand-accent hover:border-cyan-300 hover:bg-white hover:text-brand-blue",
                    ].join(" ")}
                  >
                    <Link href="#contact">{plan.cta}</Link>
                  </Button>
                </div>
              </CardContent>
            );

            return (
              <div key={plan.name} className="relative h-full">
                {plan.badge ? (
                  <div className="absolute inset-x-0 -top-4 z-10 flex justify-center">
                    <span className="rounded-full bg-brand-blue px-4 py-1 text-sm font-semibold text-white">
                      {plan.badge}
                    </span>
                  </div>
                ) : null}

                {featured ? (
                  <StarBorder
                    as="div"
                    color="rgba(34, 211, 238, 1)"
                    speed="5s"
                    thickness={3}
                    className="block h-full rounded-3xl shadow-[0_16px_40px_rgba(20,104,139,0.18)]"
                    innerClassName="h-full rounded-3xl border-white/20 bg-gradient-to-b from-[#6f9ab0] via-[#5f8ca1] to-[#4a768c] text-left"
                  >
                    {cardContent}
                  </StarBorder>
                ) : (
                  <Card
                    className={[
                      "relative h-full overflow-visible rounded-3xl border p-0 shadow-[0_4px_20px_rgba(0,66,97,0.08)]",
                      "border-slate-200 bg-slate-50 text-slate-900",
                    ].join(" ")}
                  >
                    {cardContent}
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
