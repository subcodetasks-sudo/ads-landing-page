import type { Metadata } from "next";

type Translator = (key: string) => string;

export function buildHomeMetadata(locale: string, t: Translator): Metadata {
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: t("metadata.keywords")
      .split(",")
      .map((keyword) => keyword.trim()),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      type: "website",
      locale,
      siteName: t("brand"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.title"),
      description: t("metadata.description"),
    },
  };
}
