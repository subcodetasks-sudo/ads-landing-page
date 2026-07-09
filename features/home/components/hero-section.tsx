"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDirection } from "@/components/ui/direction";
import type { HomePageContent } from "@/features/home/types";
import DotField from "./dot-field";

type HeroSectionProps = {
  hero: HomePageContent["hero"];
};

const heroMarqueeImages = [
  "/imgs/alsqoor-realestate.sa_ar.png",
  "/imgs/drnadasalma.com_en.png",
  "/imgs/rabwa.art_.png",
  "/imgs/seatourism.sa__type=hotels.png",
  "/imgs/WhatsApp Image 2026-07-09 at 2.51.33 PM.jpeg",
  "/imgs/WhatsApp Image 2026-07-09 at 2.53.49 PM.jpeg",
  "/imgs/WhatsApp Image 2026-07-09 at 2.56.03 PM.jpeg",
  "/imgs/WhatsApp Image 2026-07-09 at 3.02.07 PM.jpeg",
];

const marqueeColumns = [
  heroMarqueeImages.slice(0, 3),
  heroMarqueeImages.slice(3, 6),
  heroMarqueeImages.slice(6),
];

function HeroMarqueeColumn({
  images,
  direction,
}: {
  images: string[];
  direction: "up" | "down";
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = trackRef.current;

    if (!element) {
      return;
    }

    let animation: Animation | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const startAnimation = () => {
      animation?.cancel();

      const distance = element.scrollHeight / 2;

      if (distance <= 0) {
        return;
      }

      animation = element.animate(
        direction === "up"
          ? [
              { transform: "translate3d(0, 0, 0)" },
              { transform: `translate3d(0, -${distance}px, 0)` },
            ]
          : [
              { transform: `translate3d(0, -${distance}px, 0)` },
              { transform: "translate3d(0, 0, 0)" },
            ],
        {
          duration: direction === "up" ? 26000 : 30000,
          easing: "linear",
          iterations: Infinity,
        },
      );
    };

    startAnimation();

    resizeObserver = new ResizeObserver(() => {
      startAnimation();
    });
    resizeObserver.observe(element);

    return () => {
      animation?.cancel();
      resizeObserver?.disconnect();
    };
  }, [direction, images]);

  return (
    <div className="relative h-[22rem] overflow-hidden rounded-[1.75rem] shadow-[0_20px_60px_rgba(20,104,139,0.14)] lg:h-[32rem]">
      <div ref={trackRef} className="flex flex-col gap-4 p-3 will-change-transform">
        {[...images, ...images].map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative h-48 overflow-hidden rounded-[1.25rem] border border-sky-100 bg-white shadow-sm lg:h-60"
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 1024px) 50vw, 22vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-white via-white/85 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-white via-white/85 to-transparent" />
    </div>
  );
}

export function HeroSection({ hero }: HeroSectionProps) {
  const direction = useDirection() ?? "ltr";
  const isRtl = direction === "rtl";

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-white">
      <div className="absolute inset-0">
        <DotField
          dotRadius={2}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={550}
          gradientFrom="rgba(20, 104, 139, 0.7)"
          gradientTo="rgba(22, 83, 110, 0.55)"
          glowColor="rgba(16, 79, 106, 0.75)"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-white/45" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div
          dir={direction}
          className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16"
        >
          <div
            dir={direction}
            className={`max-w-2xl flex-1 lg:max-w-xl xl:max-w-2xl ${isRtl ? "text-right" : "text-left"}`}
          >
            <span className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5 text-sm font-semibold text-brand-blue">
              {hero.badge}
            </span>

            <div className="mt-8 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight text-brand-accent sm:text-5xl lg:text-6xl">
                {hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {hero.description}
              </p>
            </div>

            <div
              className={`mt-10 flex flex-col gap-4 sm:flex-row sm:items-center ${
                isRtl ? "items-end sm:justify-start" : "items-start sm:justify-start"
              }`}
            >
              <Button
                asChild
                className="h-12 rounded-full bg-brand-blue px-7 text-base font-semibold text-white hover:bg-brand-accent"
              >
                <Link href="#contact">{hero.primaryCta}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-slate-200 px-7 text-base font-semibold text-brand-accent hover:bg-slate-50"
              >
                <Link href="#work">{hero.secondaryCta}</Link>
              </Button>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col items-center">
            <div
              className="mx-auto w-full max-w-[34rem] transform-3d lg:max-w-none"
              style={{
                transform: isRtl
                  ? "perspective(1400px) rotateY(18deg) rotateX(10deg) rotateZ(-5deg)"
                  : "perspective(1400px) rotateY(-18deg) rotateX(10deg) rotateZ(5deg)",
                transformOrigin: isRtl ? "center left" : "center right",
              }}
            >
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                {marqueeColumns.map((images, index) => (
                  <HeroMarqueeColumn
                    key={index}
                    images={images}
                    direction={index % 2 === 0 ? "up" : "down"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
