"use client";

import { Navbar } from "./_components/Navbar";
import { CollectionCard } from "./_components/CollectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bookmark } from "lucide-react";
import Image from "next/image";
import { DefaultAnimeCard } from "./_components/DefaultAnimeCard";
import { useSpecialForYouAnime } from "@/lib/anime";
import { TrendingSection } from "./_components/TrendingSection";
import { Skeleton } from "@/components/ui/skeleton";
import { MostPopularSection } from "./_components/MostPopularSection";
import { Footer } from "./_components/Footer";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const {
    data: specialAnimeData,
    error: specialAnimeError,
    isLoading: specialAnimeLoading,
  } = useSpecialForYouAnime([
    "Dandadan",
    "Solo Leveling",
    "The Water Magician",
    "Demon Slayer Infinite Castle",
    "Grand blue",
    "Kubo won't let me be invisible",
  ]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] sm:h-[75vh] md:h-[80vh] min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/dandadan-poster.webp"
            alt="Dandadan"
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-12 sm:pt-16 font-geist-sans">
          <div className="max-w-2xl w-full">
            <Badge variant="outline" className="mb-3 sm:mb-4">
              Fall 2024
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 text-balance">
              Dandadan Season 1
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 text-pretty">
              While the mission to exorcise Jin "Jiji" Enjouji's family home is
              underway, things are not going as expected. Momo Ayase narrowly
              evades an attempted abduction while Ken "Okarun" Takakura and Jiji
              are ambushed by the Kitou family—the unsettling landlords of the
              cursed estate.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
              >
                Learn More
              </Button>
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full sm:w-auto"
              >
                <Bookmark className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        </div>

        <section className="absolute -bottom-32 sm:-bottom-40 md:-bottom-48 lg:-bottom-56 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">
              Special For You
            </h2>

            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 group/carousel">
              {specialAnimeLoading || !specialAnimeData ? (
                // Show skeleton loading cards
                <>
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
                  ))}
                </>
              ) : specialAnimeError ? (
                <div className="col-span-full text-center text-muted-foreground">
                  Error loading anime
                </div>
              ) : (
                specialAnimeData.map((anime: any, index: number) => (
                  <DefaultAnimeCard
                    key={index}
                    title={anime.title}
                    year={anime.year}
                    genre={anime.genres[0].name}
                    image_url={anime.images.jpg.image_url}
                    score={anime.score}
                  />
                ))
              )}

              <button className="absolute top-1/2 -translate-y-1/2 -right-6 bg-foreground p-[12px] rounded-full cursor-pointer group-hover/carousel:opacity-100 opacity-0 transition-opacity duration-300">
                <ArrowRight className="size-4 text-muted" />
              </button>
            </div>
          </div>
        </section>
      </section>
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
      <Footer />
    </main>
  );
}
