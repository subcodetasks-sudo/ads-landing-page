import type { SectionIntro } from "@/features/home/types";

export function SectionHeading({ title, description }: SectionIntro) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-semibold tracking-tight text-brand-accent sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
    </div>
  );
}
