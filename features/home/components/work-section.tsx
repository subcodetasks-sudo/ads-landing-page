"use client";

import CircularGallery from "@/features/home/components/circular-gallery";
import { SectionHeading } from "@/features/home/components/section-heading";
import type { HomePageContent } from "@/features/home/types";

type WorkSectionProps = {
  section: HomePageContent["work"];
};

function getProjectImage(title: string, index: number): string {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes("fintech") || titleLower.includes("مالية")) {
    return "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&h=700&q=80";
  }
  if (titleLower.includes("healthcare") || titleLower.includes("صحية")) {
    return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&h=700&q=80";
  }
  if (titleLower.includes("logistics") || titleLower.includes("لوجستية")) {
    return "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&h=700&q=80";
  }

  // Fallback to high-quality business/tech visuals
  const fallbacks = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&h=700&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&h=700&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&h=700&q=80"
  ];
  return fallbacks[index % fallbacks.length];
}

export function WorkSection({ section }: WorkSectionProps) {
  const galleryItems = section.items.map((item, index) => {
    return {
      image: getProjectImage(item.title, index),
      text: item.title,
      description: item.description,
    };
  });

  return (
    <section id="work" className="w-full bg-white py-20">
      <div className="px-6 lg:px-8">
        <SectionHeading title={section.title} description={section.description} />
      </div>

      <div className="mt-18 overflow-x-clip px-0 md:px-6 lg:px-8">
        <CircularGallery
          items={galleryItems}
          bend={2.5}
          textColor="#f8fafc"
          borderRadius={0.1}
          scrollEase={0.12}
          scrollSpeed={1.6}
          font="700 24px Inter"
          fontUrl="https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap"
        />
      </div>
    </section>
  );
}
