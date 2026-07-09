"use client";

import type { MouseEvent } from "react";
import { useState, useTransition } from "react";
import { Check, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buildMobileCardItems, MobileCardNav } from "@/features/home/components/mobile-card-nav";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { HomePageContent } from "@/features/home/types";

type HomeHeaderProps = {
  brand: string;
  homeHref: string;
  nav: HomePageContent["nav"];
};

export function HomeHeader({ brand, homeHref, nav }: HomeHeaderProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const mobileCardItems = buildMobileCardItems(nav);
  const localeMeta: Record<string, { label: string; image: string }> = {
    en: { label: "English", image: "/imgs/lang-en.svg" },
    ar: { label: "العربية", image: "/imgs/lang_ar.webp" },
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      return;
    }

    const target = document.querySelector<HTMLElement>(href);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.pushState(null, "", href);
  };

  const navigateToSection = (href: string) => {
    if (!href.startsWith("#")) {
      return;
    }

    const target = document.querySelector<HTMLElement>(href);

    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.pushState(null, "", href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-2.5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-slate-200 bg-white/65 px-3 py-2 shadow-sm backdrop-blur-xl backdrop-saturate-150 sm:px-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-brand-accent transition hover:bg-slate-200"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isPending}
                  className="h-9 rounded-full border border-slate-200 bg-slate-100 px-2.5 text-sm font-semibold text-brand-accent hover:bg-slate-200"
                >
                  {localeMeta[locale].image ? (
                    <Image
                      src={localeMeta[locale].image}
                      alt={localeMeta[locale].label}
                      width={18}
                      height={18}
                      className="size-4.5 rounded-full object-cover"
                    />
                  ) : null}
                  <ChevronDown className="size-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-40 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_16px_30px_rgba(15,23,42,0.08)]"
              >
                {routing.locales.map((nextLocale) => {
                  const isActive = locale === nextLocale;
                  const { image, label } = localeMeta[nextLocale];

                  return (
                    <DropdownMenuItem
                      key={nextLocale}
                      onClick={() => {
                        startTransition(() => {
                          router.replace(pathname, { locale: nextLocale });
                        });
                      }}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-slate-700"
                    >
                      <span className="flex items-center gap-2">
                        {image ? (
                          <Image
                            src={image}
                            alt={label}
                            width={18}
                            height={18}
                            className="size-4.5 rounded-full object-cover"
                          />
                        ) : null}
                        <span>{label}</span>
                      </span>
                      {isActive ? <Check className="size-4 text-brand-blue" /> : null}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link
            href={homeHref}
            className="flex shrink-0 items-center rounded-full bg-slate-100 p-1 transition hover:opacity-90"
            aria-label={brand}
          >
            <Image
              src="/imgs/logo.webp"
              alt={brand}
              width={40}
              height={40}
              className="size-9 rounded-full object-cover sm:size-10"
              loading="eager"
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-800 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="whitespace-nowrap transition hover:text-brand-blue"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isPending}
                  className="h-9 rounded-full border border-slate-200 bg-slate-100 px-2.5 text-sm font-semibold text-brand-accent hover:bg-slate-200 sm:px-3"
                >
                  {localeMeta[locale].image ? (
                    <Image
                      src={localeMeta[locale].image}
                      alt={localeMeta[locale].label}
                      width={18}
                      height={18}
                      className="size-4.5 rounded-full object-cover"
                    />
                  ) : null}
                  <span className="hidden sm:inline">{localeMeta[locale].label}</span>
                  <ChevronDown className="size-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_16px_30px_rgba(15,23,42,0.08)]"
              >
                {routing.locales.map((nextLocale) => {
                  const isActive = locale === nextLocale;
                  const { image, label } = localeMeta[nextLocale];

                  return (
                    <DropdownMenuItem
                      key={nextLocale}
                      onClick={() => {
                        startTransition(() => {
                          router.replace(pathname, { locale: nextLocale });
                        });
                      }}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-slate-700"
                    >
                      <span className="flex items-center gap-2">
                        {image ? (
                          <Image
                            src={image}
                            alt={label}
                            width={18}
                            height={18}
                            className="size-4.5 rounded-full object-cover"
                          />
                        ) : null}
                        <span>{label}</span>
                      </span>
                      {isActive ? <Check className="size-4 text-brand-blue" /> : null}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <MobileCardNav
          isOpen={isMobileMenuOpen}
          setIsOpen={setIsMobileMenuOpen}
          items={mobileCardItems}
          onNavigate={navigateToSection}
        />
      </div>
    </header>
  );
}
