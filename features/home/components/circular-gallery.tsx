"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useDirection } from "@/components/ui/direction";

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

function getGalleryGapPx(container: HTMLElement) {
  const gap = getComputedStyle(container).getPropertyValue("--gallery-gap").trim();

  if (gap.endsWith("rem")) {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return parseFloat(gap) * rootFontSize;
  }

  if (gap.endsWith("px")) {
    return parseFloat(gap);
  }

  return window.innerWidth >= 768 ? 448 : 256;
}

function stopAnimationFrame(animationFrameRef: { current: number | null }) {
  if (animationFrameRef.current !== null) {
    window.cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
  }
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
  
  const direction = useDirection() ?? "ltr";

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
    const maxIndex = Math.max(total - 1, 0);
    const settledActive = clamp(activeVal, 0, maxIndex);

    itemRefs.current.forEach((el, index) => {
      if (!el) return;

      const offset = index - settledActive;
      const clampedOffset = clamp(offset, -2, 2);
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

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) return;

    const total = normalizedItems.length;
    const maxIndex = Math.max(total - 1, 0);
    const animate = () => {
      const current = activeIndexRef.current;
      const target = clamp(targetIndexRef.current, 0, maxIndex);
      targetIndexRef.current = target;

      const diff = target - current;
      const next = current + diff * scrollEase;

      if (Math.abs(diff) < 0.001) {
        activeIndexRef.current = target;
        targetIndexRef.current = target;
        updateDOM(activeIndexRef.current);
        animationFrameRef.current = null;
      } else {
        activeIndexRef.current = next;
        updateDOM(activeIndexRef.current);
        animationFrameRef.current = window.requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);
  }, [normalizedItems.length, scrollEase, updateDOM]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      const isHorizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const isShiftVertical = event.shiftKey && Math.abs(event.deltaY) > Math.abs(event.deltaX);

      // Keep vertical wheel for page scrolling; use horizontal (or shift+wheel) for the gallery.
      if (!isHorizontal && !isShiftVertical) {
        return;
      }

      const delta = isHorizontal ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < 3) {
        return;
      }

      event.preventDefault();

      const sensitivity = 0.002 * scrollSpeed;
      const maxIndex = Math.max(normalizedItems.length - 1, 0);
      targetIndexRef.current = clamp(
        targetIndexRef.current - delta * sensitivity,
        0,
        maxIndex,
      );
      startAnimation();

      if (wheelTimeoutRef.current !== null) {
        window.clearTimeout(wheelTimeoutRef.current);
      }

      wheelTimeoutRef.current = window.setTimeout(() => {
        const maxIndex = Math.max(normalizedItems.length - 1, 0);
        targetIndexRef.current = clamp(Math.round(targetIndexRef.current), 0, maxIndex);
        startAnimation();
        wheelTimeoutRef.current = null;
      }, 150) as unknown as number;
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [normalizedItems.length, scrollSpeed, startAnimation]);

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

  const goToIndex = useCallback(
    (index: number) => {
      const maxIndex = Math.max(normalizedItems.length - 1, 0);
      targetIndexRef.current = clamp(index, 0, maxIndex);
      startAnimation();
    },
    [normalizedItems.length, startAnimation],
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    stopAnimationFrame(animationFrameRef);
    dragStartX.current = event.clientX;
    dragStartTarget.current = targetIndexRef.current;
    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || dragStartX.current === null) return;

    const container = containerRef.current;
    if (!container) return;

    const distance = event.clientX - dragStartX.current;
    const gapInPx = getGalleryGapPx(container);
    const maxIndex = Math.max(normalizedItems.length - 1, 0);
    const deltaIndex = -distance / gapInPx;

    targetIndexRef.current = clamp(dragStartTarget.current + deltaIndex, 0, maxIndex);
    activeIndexRef.current = targetIndexRef.current;
    updateDOM(activeIndexRef.current);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    dragStartX.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);

    const maxIndex = Math.max(normalizedItems.length - 1, 0);
    targetIndexRef.current = clamp(Math.round(targetIndexRef.current), 0, maxIndex);
    startAnimation();
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    handlePointerUp(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToIndex(Math.round(activeIndexRef.current) + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToIndex(Math.round(activeIndexRef.current) - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-0 mx-auto h-144 w-full max-w-full touch-pan-y overflow-hidden rounded-[2rem] bg-transparent isolation-isolate [--gallery-gap:min(16rem,78vw)] [--gallery-translate-y:4.5rem] md:h-160 md:[--gallery-gap:28rem] md:[--gallery-translate-y:5.5rem]"
      dir="ltr"
      role="region"
      aria-label="Project gallery. Use Left and Right Arrow keys to navigate."
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
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
                goToIndex(index);
              }}
              className="absolute top-1/2 left-1/2 h-96 w-72 cursor-pointer border-0 bg-transparent p-0 will-change-transform md:h-116 md:w-92"
              style={{
                opacity: 0,
              }}
            >
              <article
                className="flex h-full overflow-hidden border border-white/60 bg-white/70 shadow-[0_20px_60px_rgba(14,116,144,0.18)] backdrop-blur-md"
                style={{ borderRadius: `${borderRadius * 24}rem` }}
              >
                <div className="relative h-full w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.text} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/78 via-slate-900/24 to-sky-100/14" />
                  <div className="absolute inset-x-0 bottom-0 p-6" dir={direction}>
                    <div className="rounded-[1.5rem] border border-white/20 bg-slate-950/45 p-5 text-start shadow-lg backdrop-blur-md">
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
