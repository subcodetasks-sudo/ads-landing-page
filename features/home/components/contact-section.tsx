"use client";

import { useState } from "react";
import BorderGlow from "@/components/ui/border-glow";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { HomePageContent } from "@/features/home/types";

type ContactSectionProps = {
  section: HomePageContent["contact"];
};

export function ContactSection({ section }: ContactSectionProps) {
  const [selectedService, setSelectedService] = useState<string>("");

  return (
    <section id="contact" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-brand-accent sm:text-4xl">{section.title}</h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{section.description}</p>
        </div>

        <BorderGlow
          className="mx-auto mt-12 max-w-3xl border border-slate-200/50 p-8 sm:p-10"
          edgeSensitivity={30}
          glowColor="198 75 45"
          backgroundColor="#ffffff"
          borderRadius={24}
          glowRadius={30}
          glowIntensity={0.8}
          coneSpread={30}
          animated={true}
          colors={["#0ea5e9", "#14688B", "#2dd4bf"]}
          fillOpacity={0.15}
        >
          <form action="/api/contact" method="post" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-brand-accent">
                  {section.form.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder={section.form.namePlaceholder}
                  className="h-11 w-full rounded-md border border-slate-200 px-4 text-base text-slate-900 outline-none transition focus:border-brand-blue"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-brand-accent">
                  {section.form.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={section.form.emailPlaceholder}
                  className="h-11 w-full rounded-md border border-slate-200 px-4 text-base text-slate-900 outline-none transition focus:border-brand-blue"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-brand-accent">
                  {section.form.phoneLabel}
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  placeholder={section.form.phonePlaceholder}
                  className="h-11 w-full rounded-md border border-slate-200 px-4 text-base text-slate-900 outline-none transition focus:border-brand-blue"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="projectType" className="text-sm font-semibold text-brand-accent">
                  {section.form.serviceLabel}
                </label>
                <input
                  type="hidden"
                  name="projectType"
                  value={selectedService}
                  required={selectedService === ""}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-brand-blue text-left flex items-center justify-between"
                    >
                      <span className={selectedService ? "text-slate-900" : "text-slate-400"}>
                        {selectedService
                          ? section.form.serviceOptions.find((opt) => opt.value === selectedService)?.label
                          : section.form.servicePlaceholder}
                      </span>
                      <svg
                        className="h-4 w-4 opacity-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
                    {section.form.serviceOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSelectedService(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-brand-accent">
                {section.form.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={section.form.messagePlaceholder}
                className="w-full rounded-md border border-slate-200 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-blue"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-blue px-6 text-base font-semibold text-white transition hover:bg-brand-accent"
            >
              {section.form.submitLabel}
            </button>
          </form>
        </BorderGlow>
      </div>
    </section>
  );
}
