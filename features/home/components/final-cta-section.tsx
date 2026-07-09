import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { FinalCta } from "@/features/home/types";

type FinalCtaSectionProps = {
  section: FinalCta;
};

export function FinalCtaSection({ section }: FinalCtaSectionProps) {
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-[2rem] bg-brand-accent px-8 py-14 text-center text-white shadow-[0_20px_60px_rgba(16,76,102,0.18)] lg:px-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{section.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
            {section.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-full bg-white px-7 text-base font-semibold text-brand-accent hover:bg-slate-100"
            >
              <Link href="mailto:hello@subcode.co?subject=New%20Project%20Inquiry">{section.primaryCta}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/40 bg-transparent px-7 text-base font-semibold text-white hover:bg-white/10"
            >
              <Link href="#services">{section.secondaryCta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
