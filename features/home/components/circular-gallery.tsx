"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocale } from "next-intl";

export type CircularGalleryItem = {
  image: string;
  text: string;
  description?: string;
};

export interface CircularGalleryProps {
  items?: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

const FALLBACK_ITEMS: CircularGalleryItem[] = [
  {
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=900&h=700&q=80",
    text: "Bridge",
    description: "A bold visual concept presented in a curved gallery layout.",
  },
  {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&h=700&q=80",
    text: "Desk Setup",
    description: "A polished project card with image-first storytelling.",
  },
  {
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&h=700&q=80",
    text: "Waterfall",
    description: "Smooth interaction with a prominent center focus.",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function CircularGallery({
  items = FALLBACK_ITEMS,
  textColor = "#ffffff",
  borderRadius = 0.08,
  font,
  fontUrl,
  scrollSpeed = 2,
  scrollEase = 0.08,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const targetIndexRef = useRef(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dragStartX = useRef<number | null>(null);
  const dragStartTarget = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  const wheelTimeoutRef = useRef<number | null>(null);
  
  const locale = useLocale();
  const isRtl = locale === "ar";

  useEffect(() => {
    if (!fontUrl) {
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = fontUrl;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [fontUrl]);

  const normalizedItems = useMemo(() => {
    return items.length > 0 ? items : FALLBACK_ITEMS;
  }, [items]);

  const updateDOM = useCallback((activeVal: number) => {
    const total = normalizedItems.length;
    itemRefs.current.forEach((el, index) => {
      if (!el) return;

      const rawOffset = index - activeVal;
      const wrappedOffset =
        rawOffset > total / 2
          ? rawOffset - total
          : rawOffset < -total / 2
          ? rawOffset + total
          : rawOffset;
      const clampedOffset = clamp(wrappedOffset, -2, 2);
      const absOffset = Math.abs(clampedOffset);
      const rotate = clampedOffset * 8;
      const scale = 1 - absOffset * 0.1;
      const opacity = 1 - absOffset * 0.18;
      const zIndex = 10 - Math.round(absOffset * 2);
      const isActive = absOffset < 0.5;

      el.style.transform = `translate(-50%, -50%) translateX(calc(${clampedOffset} * var(--gallery-gap))) translateY(calc(${absOffset} * var(--gallery-translate-y))) rotate(${rotate}deg) scale(${scale})`;
      el.style.opacity = `${opacity}`;
      el.style.zIndex = `${zIndex}`;
      el.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }, [normalizedItems.length]);

  const startAnimation = () => {
    if (animationFrameRef.current !== null) return;

    const total = normalizedItems.length;
    const animate = () => {
      const current = activeIndexRef.current;
      const target = targetIndexRef.current;

      let diff = target - current;
      // Shortest path circular difference
      diff = ((diff + total / 2) % total + total) % total - total / 2;

      const next = current + diff * scrollEase;

      if (Math.abs(diff) < 0.001) {
        activeIndexRef.current = ((target % total) + total) % total;
        updateDOM(activeIndexRef.current);
        animationFrameRef.current = null;
      } else {
        activeIndexRef.current = (next % total + total) % total;
        updateDOM(activeIndexRef.current);
        animationFrameRef.current = window.requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);
  };

  // Initialize styling on mount
  useEffect(() => {
    updateDOM(activeIndexRef.current);
    
    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      if (wheelTimeoutRef.current !== null) {
        window.clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [normalizedItems, updateDOM]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const delta = event.deltaY === 0 ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 3) {
      return;
    }

    // Scroll speed / sensitivity (RTL scrolls naturally with physical mouse movement direction)
    const sensitivity = 0.002 * scrollSpeed;
    targetIndexRef.current += delta * sensitivity;

    startAnimation();

    if (wheelTimeoutRef.current !== null) {
      window.clearTimeout(wheelTimeoutRef.current);
    }

    wheelTimeoutRef.current = window.setTimeout(() => {
      const total = normalizedItems.length;
      const snappedTarget = Math.round(targetIndexRef.current);
      targetIndexRef.current = ((snappedTarget % total) + total) % total;
      activeIndexRef.current = ((activeIndexRef.current % total) + total) % total;
      startAnimation();
      wheelTimeoutRef.current = null;
    }, 150) as unknown as number;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
    dragStartTarget.current = targetIndexRef.current;
    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    startAnimation();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const distance = event.clientX - dragStartX.current;
    
    // Map drag distance in pixels to carousel index.
    // md: [--gallery-gap: 28rem] (448px), mobile: [--gallery-gap: 16rem] (256px)
    const gapInPx = window.innerWidth >= 768 ? 448 : 256;
    
    // Physical drag: moving cursor right increases visual offsets, which means targetIndex decreases.
    // In RTL, the physical drag direction is the same sincetranslateX behaves physically.
    const deltaIndex = -distance / gapInPx;
    
    targetIndexRef.current = dragStartTarget.current + deltaIndex;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    dragStartX.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);

    const total = normalizedItems.length;
    const snappedTarget = Math.round(targetIndexRef.current);
    targetIndexRef.current = ((snappedTarget % total) + total) % total;
    activeIndexRef.current = ((activeIndexRef.current % total) + total) % total;

    startAnimation();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const directionMultiplier = isRtl ? -1 : 1;
    const total = normalizedItems.length;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      targetIndexRef.current = ((Math.round(targetIndexRef.current) + 1 * directionMultiplier) % total + total) % total;
      startAnimation();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      targetIndexRef.current = ((Math.round(targetIndexRef.current) - 1 * directionMultiplier) % total + total) % total;
      startAnimation();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-0 h-192 w-full overflow-hidden rounded-[2rem] bg-transparent isolation-isolate [--gallery-gap:16rem] [--gallery-translate-y:4.5rem] md:[--gallery-gap:28rem] md:[--gallery-translate-y:5.5rem]"
      role="region"
      aria-label="Project gallery. Use Left and Right Arrow keys to navigate."
      tabIndex={0}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white/35 to-transparent" />

      <div className="relative h-full w-full">
        {normalizedItems.map((item, index) => {
          return (
            <button
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              key={`${item.text}-${index}`}
              type="button"
              onClick={() => {
                targetIndexRef.current = index;
                startAnimation();
              }}
              className="absolute left-1/2 top-[64%] h-96 w-72 md:h-116 md:w-92 -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 text-left"
              style={{
                opacity: 0,
              }}
            >
              <article
                className="flex h-full overflow-hidden border border-white/60 bg-white/70 shadow-[0_20px_60px_rgba(14,116,144,0.18)] backdrop-blur-md transition-transform duration-300"
                style={{ borderRadius: `${borderRadius * 24}rem` }}
              >
                <div className="relative h-full w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.text} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/78 via-slate-900/24 to-sky-100/14" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="rounded-[1.5rem] border border-white/20 bg-slate-950/45 p-5 shadow-lg backdrop-blur-md">
                      <h3
                        className="text-2xl font-semibold leading-tight"
                        style={{
                          color: textColor,
                          fontFamily: font ? font.split(/\s+/).slice(-1).join(" ").replaceAll('"', "") : undefined,
                        }}
                      >
                        {item.text}
                      </h3>
                      {item.description ? (
                        <p className="mt-3 text-sm leading-6 text-sky-50/90">{item.description}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            </button>
          );
        })}
      </div>
    </div>
  );
}
