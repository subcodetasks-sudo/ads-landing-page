"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Headphones, Sparkles, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDirection } from "@/components/ui/direction";
import CardSwap, { Card as SwapCard, type CardSwapHandle } from "@/features/home/components/card-swap";
import type { HomePageContent } from "@/features/home/types";

const featureIcons = [Workflow, Sparkles, Headphones] as const;

type WhyChooseUsSectionProps = {
  section: HomePageContent["whyChooseUs"];
};

export function WhyChooseUsSection({ section }: WhyChooseUsSectionProps) {
  const direction = useDirection() ?? "ltr";
  const isRtl = direction === "rtl";
  const cardSwapRef = useRef<CardSwapHandle>(null);

  const PreviousIcon = isRtl ? ArrowRight : ArrowLeft;
  const NextIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section id="services" className="relative overflow-x-clip bg-white/95">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white via-white/85 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div
          dir={direction}
          className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16"
        >
          <div
            dir={direction}
            className={`max-w-3xl lg:max-w-xl xl:max-w-2xl ${isRtl ? "text-right lg:mr-0" : "text-left"}`}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-brand-accent sm:text-4xl">
              {section.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{section.description}</p>
          </div>

          <div className="flex flex-1 flex-col items-center">
            <div className="relative h-90 w-full sm:h-105 md:h-120 lg:h-135">
              <div className="absolute inset-0 mx-auto max-w-[320px] sm:max-w-95 md:max-w-110 lg:max-w-125">
                <CardSwap
                  ref={cardSwapRef}
                  width="100%"
                  height="100%"
                  cardDistance={20}
                  verticalDistance={14}
                  delay={5000}
                  pauseOnHover={false}
                  skewAmount={0}
                  easing="elastic"
                  direction={direction}
                >
                  {section.items.map((item, index) => {
                    const Icon = featureIcons[index % featureIcons.length];

                    return (
                      <SwapCard
                        key={item.title}
                        dir={direction}
                        customClass={`overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_20px_20px_rgba(14,116,144,0.18)] backdrop-blur-md ${isRtl ? "text-right" : "text-left"}`}
                      >
                        <div
                          dir={direction}
                          className={`flex h-full flex-col bg-linear-to-b from-white/75 via-sky-50/50 to-white/40 p-5 ${isRtl ? "items-end text-right" : "items-start text-left"}`}
                        >
                          <div className="flex h-full flex-col rounded-[1.5rem] border border-white/20 bg-slate-950/45 p-6 text-sky-50 shadow-lg backdrop-blur-md">
                            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/12 text-sky-50">
                              <Icon className="size-5" />
                            </div>
                            <h3 className="mt-6 text-2xl font-semibold text-white">{item.title}</h3>
                            <p className="mt-4 text-base leading-7 text-sky-50/90">{item.description}</p>
                          </div>
                        </div>
                      </SwapCard>
                    );
                  })}
                </CardSwap>
              </div>
            </div>
            <div className={`mt-6 flex w-full max-w-[320px] gap-3 sm:mt-7 sm:max-w-95 md:max-w-110 lg:max-w-125 ${isRtl ? "justify-start sm:justify-start" : "justify-end sm:justify-end"} max-sm:justify-center`}>
              <Button
                type="button"
                variant="outline"
                size="icon-lg"
                className="size-11 rounded-full border-white/60 bg-white/70 shadow-[0_20px_60px_rgba(14,116,144,0.12)] backdrop-blur-md sm:size-12"
                onClick={() => cardSwapRef.current?.previous()}
                aria-label={isRtl ? "Show next card" : "Show previous card"}
              >
                <PreviousIcon className="size-5 text-brand-accent" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-lg"
                className="size-11 rounded-full border-white/60 bg-white/70 shadow-[0_20px_60px_rgba(14,116,144,0.12)] backdrop-blur-md sm:size-12"
                onClick={() => cardSwapRef.current?.next()}
                aria-label={isRtl ? "Show previous card" : "Show next card"}
              >
                <NextIcon className="size-5 text-brand-accent" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
