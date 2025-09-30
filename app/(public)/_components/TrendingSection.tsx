"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { DefaultAnimeCard } from "./DefaultAnimeCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const TrendingSection = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["trending-anime"],
    queryFn: () => fetcher("https://api.jikan.moe/v4/top/anime?limit=6"),
  });

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Trending Now
        </h2>

        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {isLoading ? (
            // Show loading skeleton
            <>
              {[...Array(10)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-[2/3] rounded-lg" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </>
          ) : error ? (
            <div className="col-span-full text-center text-muted-foreground">
              Error loading trending anime
            </div>
          ) : (
            data?.data?.map((anime: any) => (
              <DefaultAnimeCard
                title={anime.title}
                year={anime.year}
                genre={anime.genres[0].name}
                image_url={anime.images.jpg.image_url}
                score={anime.score}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
