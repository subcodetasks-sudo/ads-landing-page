"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { NavItem } from "@/features/home/types";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

type MobileCardNavProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  items: CardNavItem[];
  onNavigate: (href: string) => void;
};

export function MobileCardNav({ isOpen, setIsOpen, items, onNavigate }: MobileCardNavProps) {
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const setCardRef = (index: number) => (element: HTMLDivElement | null) => {
    if (element) {
      cardsRef.current[index] = element;
    }
  };

  const itemsSerialized = JSON.stringify(items);

  useLayoutEffect(() => {
    const navElement = navRef.current;

    if (!navElement) {
      return;
    }

    const calculateHeight = () => {
      const content = navElement.querySelector<HTMLElement>("[data-card-nav-content]");

      if (!content) {
        return 0;
      }

      return content.scrollHeight;
    };

    gsap.set(navElement, { height: 0, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 24, opacity: 0 });

    const timeline = gsap.timeline({ paused: true });

    timeline.to(navElement, {
      height: calculateHeight,
      duration: 0.38,
      ease: "power3.out",
    });

    timeline.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.32,
        ease: "power3.out",
        stagger: 0.06,
      },
      "-=0.16",
    );

    tlRef.current = timeline;

    const handleResize = () => {
      if (isOpen) {
        gsap.set(navElement, { height: calculateHeight() });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      timeline.kill();
      tlRef.current = null;
    };
  }, [itemsSerialized]);

  useLayoutEffect(() => {
    const timeline = tlRef.current;
    if (!timeline) return;

    if (isOpen) {
      timeline.play();
    } else {
      timeline.reverse();
    }
  }, [isOpen]);

  const handleClick = (href: string) => {
    onNavigate(href);
    setIsOpen(false);
  };

  return (
    <div
      ref={navRef}
      className="w-full overflow-hidden lg:hidden"
      aria-hidden={!isOpen}
    >
      <div
        data-card-nav-content
        className="grid gap-2 pt-3 pb-1"
      >
        {items.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            ref={setCardRef(index)}
            className="rounded-[1.35rem] border border-white/50 px-4 py-3 shadow-[0_12px_24px_rgba(15,23,42,0.04)]"
            style={{ backgroundColor: item.bgColor, color: item.textColor }}
          >
            <div className="mb-2 text-base font-semibold tracking-tight">
              {item.label}
            </div>
            <div className="flex flex-col gap-1">
              {item.links.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  aria-label={link.ariaLabel}
                  onClick={() => handleClick(link.href)}
                  className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-left text-sm font-medium transition hover:bg-white/10"
                >
                  <ArrowUpRight className="size-4 shrink-0" />
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function buildMobileCardItems(nav: NavItem[]): CardNavItem[] {
  const groups = [
    {
      label: "Explore",
      bgColor: "#16536E",
      textColor: "#FFFFFF",
      indexes: [0, 1],
    },
    {
      label: "Plans",
      bgColor: "#1E6886",
      textColor: "#FFFFFF",
      indexes: [2, 3],
    },
    {
      label: "Connect",
      bgColor: "#EFF6FF",
      textColor: "#16536E",
      indexes: [4],
    },
  ];

  return groups.map((group) => ({
    label: group.label,
    bgColor: group.bgColor,
    textColor: group.textColor,
    links: group.indexes
      .map((index) => nav[index])
      .filter((item): item is NavItem => Boolean(item))
      .map((item) => ({
        label: item.label,
        href: item.href,
        ariaLabel: item.label,
      })),
  }));
}
