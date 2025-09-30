"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Bookmark } from "lucide-react";
import Image from "next/image";
import { DefaultAnimeCard } from "./DefaultAnimeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["special-for-you-anime"],
    queryFn: () => fetcher("https://api.jikan.moe/v4/seasons/now?sfw&limit=12"),
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerPage(2); // mobile
      else if (width < 768) setItemsPerPage(3); // sm
      else if (width < 1024) setItemsPerPage(4); // md
      else if (width < 1280) setItemsPerPage(5); // lg
      else setItemsPerPage(6); // xl
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const animeData = data?.data || [];
  const totalPages =
    animeData.length > 0 ? Math.ceil(animeData.length / itemsPerPage) : 1;

  const paginate = (newDirection: number) => {
    setCurrentPage((prev) => {
      let next = prev + newDirection;
      if (next >= totalPages) next = 0;
      if (next < 0) next = totalPages - 1;
      return next;
    });
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
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

      {/* Main Banner */}
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

      {/* Special For You Section */}
      <section className="absolute -bottom-32 sm:-bottom-40 md:-bottom-48 lg:-bottom-56 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">
            Special For You
          </h2>

          <div className="relative group/carousel">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              {isLoading || !data ? (
                // Show skeleton loading cards
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center text-muted-foreground py-8">
                  Error loading anime
                </div>
              ) : (
                <motion.div
                  key={currentPage}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    opacity: { duration: 0.2 },
                  }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 cursor-grab active:cursor-grabbing relative"
                >
                  {animeData
                    .slice(
                      currentPage * itemsPerPage,
                      (currentPage + 1) * itemsPerPage
                    )
                    .map((anime: any, index: number) => (
                      <motion.div
                        key={`${currentPage}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                          delay: index * 0.05,
                        }}
                      >
                        <DefaultAnimeCard
                          title={anime.title}
                          year={anime.year}
                          genre={anime.genres[0]?.name || "Unknown"}
                          image_url={anime.images.jpg.image_url}
                          score={anime.score}
                        />
                      </motion.div>
                    ))}
                </motion.div>
              )}
            </div>

            {/* Navigation Arrows - Desktop */}
            {!isLoading && !error && animeData.length > itemsPerPage && (
              <>
                <motion.button
                  onClick={() => paginate(-1)}
                  className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-6 bg-foreground hover:bg-foreground p-3 rounded-full cursor-pointer group-hover/carousel:opacity-100 opacity-0 transition-opacity duration-300 z-10 items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="size-4 text-background" />
                </motion.button>

                <motion.button
                  onClick={() => paginate(1)}
                  className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-6 bg-foreground hover:bg-foreground p-3 rounded-full cursor-pointer group-hover/carousel:opacity-100 opacity-0 transition-opacity duration-300 z-10 items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next slide"
                >
                  <ArrowRight className="size-4 text-background" />
                </motion.button>
              </>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};
