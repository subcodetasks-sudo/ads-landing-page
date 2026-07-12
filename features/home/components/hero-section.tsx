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
  className = "",
}: {
  images: string[];
  direction: "up" | "down";
  className?: string;
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

      const isHorizontal = window.innerWidth < 768;
      const distance = isHorizontal
        ? element.scrollWidth / 4
        : element.scrollHeight / 4;

      if (distance <= 0) {
        return;
      }

      animation = element.animate(
        direction === "up"
          ? [
              { transform: "translate3d(0, 0, 0)" },
              { transform: isHorizontal ? `translate3d(-${distance}px, 0, 0)` : `translate3d(0, -${distance}px, 0)` },
            ]
          : [
              { transform: isHorizontal ? `translate3d(-${distance}px, 0, 0)` : `translate3d(0, -${distance}px, 0)` },
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

  // Always repeat 4 times to prevent gaps in horizontal layout and avoid hydration mismatch warnings.
  const displayImages = [...images, ...images, ...images, ...images];

  return (
    <div 
      dir="ltr"
      className={`relative w-full h-[12.5rem] sm:h-[16rem] md:h-[26rem] overflow-hidden rounded-[1.25rem] md:rounded-[1.75rem] shadow-[0_20px_60px_rgba(20,104,139,0.14)] lg:h-[36rem] ${className}`}
    >
      <div 
        ref={trackRef} 
        dir="ltr"
        className="flex flex-row md:flex-col gap-3 md:gap-4 p-2 md:p-3 will-change-transform w-max md:w-full"
      >
        {displayImages.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative shrink-0 h-[11rem] sm:h-[14rem] md:h-auto md:w-full aspect-[9/16] overflow-hidden rounded-[0.875rem] md:rounded-[1.25rem] border border-sky-100 bg-white shadow-sm"
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 768px) 30vw, (max-width: 1024px) 50vw, 22vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {/* Vertical gradients (Desktop) */}
      <div className="hidden md:block pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-white via-white/85 to-transparent" />
      <div className="hidden md:block pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-white via-white/85 to-transparent" />
      
      {/* Horizontal gradients (Mobile) */}
      <div className="block md:hidden pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-white via-white/85 to-transparent" />
      <div className="block md:hidden pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-white via-white/85 to-transparent" />
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
            className={`max-w-2xl flex-1 lg:flex-[0.7] lg:max-w-lg xl:max-w-xl order-2 lg:order-1 ${isRtl ? "text-right" : "text-left"}`}
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
              className={`mt-10 flex flex-col gap-4 sm:flex-row sm:items-center ${isRtl ? "items-end sm:justify-start" : "items-start sm:justify-start"
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

          <div className="flex w-full flex-1 lg:flex-[1.3] flex-col items-center order-1 lg:order-2">
            <div
              className={`mx-auto w-full max-w-[42rem] lg:max-w-none ${
                isRtl
                  ? "md:[transform:perspective(1400px)_rotateY(18deg)_rotateX(10deg)_rotateZ(-5deg)] md:[transform-origin:center_left]"
                  : "md:[transform:perspective(1400px)_rotateY(-18deg)_rotateX(10deg)_rotateZ(5deg)] md:[transform-origin:center_right]"
              }`}
            >
              <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4">
                {marqueeColumns.map((images, index) => (
                  <HeroMarqueeColumn
                    key={index}
                    images={images}
                    direction={index % 2 === 0 ? "up" : "down"}
                    className={index === 2 ? "hidden md:block" : ""}
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
