"use client";

import { Navbar } from "./_components/Navbar";
import { CollectionCard } from "./_components/CollectionCard";
import { TrendingSection } from "./_components/TrendingSection";
import { MostPopularSection } from "./_components/MostPopularSection";
import { Footer } from "./_components/Footer";
import { HeroSection } from "./_components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* Add responsive spacing for the extended hero section */}
      <div className="h-32 sm:h-40 md:h-48 lg:h-56"></div>

      {/* Featured Collections Section */}
      <section className="py-16 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Featured Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CollectionCard
              title="The Best Mystical Anime"
              images={[
                "/dandadan-poster.webp",
                "/dandadan-poster.webp",
                "/dandadan-poster.webp",
              ]}
            />
            <CollectionCard
              title="Top 20 Romance Anime"
              images={[
                "/dandadan-poster.webp",
                "/dandadan-poster.webp",
                "/dandadan-poster.webp",
              ]}
            />
            <CollectionCard
              title="The Best Classic Animes"
              images={[
                "/dandadan-poster.webp",
                "/dandadan-poster.webp",
                "/dandadan-poster.webp",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Trending Anime Section */}
      <TrendingSection />

      {/* Most Popular Anime Section */}
      <MostPopularSection />

      {/* Footer Section */}
    </>
  );
}
