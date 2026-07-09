import Link from "next/link";
import type { FooterContent } from "@/features/home/types";

type SiteFooterProps = {
  footer: FooterContent;
};

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <footer className="bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <div className="text-2xl font-semibold tracking-tight text-brand-accent">{footer.brand}</div>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{footer.description}</p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500">
          {footer.links.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-brand-blue">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
