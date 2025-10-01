"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/utils";
import { DefaultAnimeCard } from "../_components/DefaultAnimeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterState {
  years: string[];
  seasons: string[];
  genres: string[];
  studios: string[];
  formats: string[];
  airingStatus: string[];
}

// FilterSidebar Component (reusable for both desktop and mobile)
function FilterSidebar({
  openSections,
  toggleSection,
  filters,
  toggleFilter,
  showAllGenres,
  setShowAllGenres,
}: {
  openSections: {
    year: boolean;
    season: boolean;
    genres: boolean;
    studio: boolean;
    format: boolean;
    airingStatus: boolean;
  };
  toggleSection: (
    section: "year" | "season" | "genres" | "studio" | "format" | "airingStatus"
  ) => void;
  filters: FilterState;
  toggleFilter: (category: keyof FilterState, value: string) => void;
  showAllGenres: boolean;
  setShowAllGenres: (show: boolean) => void;
}) {
  const allGenres = [
    "Fantasy",
    "Drama",
    "Comedy",
    "Adventure",
    "Sports",
    "Action",
    "Romance",
    "Sci-Fi",
    "Mystery",
    "Horror",
    "Slice of Life",
    "Supernatural",
  ];

  const displayedGenres = showAllGenres ? allGenres : allGenres.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Year Filter */}
      <Collapsible
        open={openSections.year}
        onOpenChange={() => toggleSection("year")}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold">
          <span>Year</span>
          {openSections.year ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="2020-filter"
              checked={filters.years.includes("2020")}
              onCheckedChange={() => toggleFilter("years", "2020")}
            />
            <label
              htmlFor="2020-filter"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              2020
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="2022-filter"
              checked={filters.years.includes("2022")}
              onCheckedChange={() => toggleFilter("years", "2022")}
            />
            <label
              htmlFor="2022-filter"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              2022
            </label>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Season Filter */}
      <Collapsible
        open={openSections.season}
        onOpenChange={() => toggleSection("season")}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold">
          <span>Season</span>
          {openSections.season ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3">
          {["Winter", "Spring", "Summer", "Fall"].map((season) => (
            <div key={season} className="flex items-center space-x-2">
              <Checkbox
                id={`${season}-filter`}
                checked={filters.seasons.includes(season.toLowerCase())}
                onCheckedChange={() =>
                  toggleFilter("seasons", season.toLowerCase())
                }
              />
              <label
                htmlFor={`${season}-filter`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {season}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Genres Filter */}
      <Collapsible
        open={openSections.genres}
        onOpenChange={() => toggleSection("genres")}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold">
          <span>Genres</span>
          {openSections.genres ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3">
          {displayedGenres.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <Checkbox
                id={`${genre}-filter`}
                checked={filters.genres.includes(genre)}
                onCheckedChange={() => toggleFilter("genres", genre)}
              />
              <label
                htmlFor={`${genre}-filter`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {genre}
              </label>
            </div>
          ))}
          <button
            onClick={() => setShowAllGenres(!showAllGenres)}
            className="text-sm text-primary hover:underline"
          >
            {showAllGenres ? "View Less" : "View All"}
          </button>
        </CollapsibleContent>
      </Collapsible>

      {/* Studio Filter */}
      <Collapsible
        open={openSections.studio}
        onOpenChange={() => toggleSection("studio")}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold">
          <span>Studio</span>
          {openSections.studio ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <p className="text-sm text-muted-foreground">No filters applied</p>
        </CollapsibleContent>
      </Collapsible>

      {/* Format Filter */}
      <Collapsible
        open={openSections.format}
        onOpenChange={() => toggleSection("format")}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold">
          <span>Format</span>
          {openSections.format ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <p className="text-sm text-muted-foreground">No filters applied</p>
        </CollapsibleContent>
      </Collapsible>

      {/* Airing Status Filter */}
      <Collapsible
        open={openSections.airingStatus}
        onOpenChange={() => toggleSection("airingStatus")}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold">
          <span>Airing Status</span>
          {openSections.airingStatus ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <p className="text-sm text-muted-foreground">No filters applied</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default function Catalog() {
  const [sortBy, setSortBy] = useState("popularity");
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(15);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    year: true,
    season: true,
    genres: true,
    studio: false,
    format: false,
    airingStatus: false,
  });

  const [filters, setFilters] = useState<FilterState>({
    years: [],
    seasons: ["spring"],
    genres: ["Comedy"],
    studios: [],
    formats: [],
    airingStatus: [],
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["catalog-anime"],
    queryFn: () =>
      fetcher("https://api.jikan.moe/v4/seasons/2020/spring?sfw&limit=25"),
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const animeData = data?.data || [];
  const displayedAnime = animeData.slice(0, displayLimit);

  return (
    <div className="min-h-screen bg-background pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Catalog</h1>
          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="size-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[350px] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar
                    openSections={openSections}
                    toggleSection={toggleSection}
                    filters={filters}
                    toggleFilter={toggleFilter}
                    showAllGenres={showAllGenres}
                    setShowAllGenres={setShowAllGenres}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Sort By
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px] sm:w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="w-64 flex-shrink-0 hidden md:block">
            <FilterSidebar
              openSections={openSections}
              toggleSection={toggleSection}
              filters={filters}
              toggleFilter={toggleFilter}
              showAllGenres={showAllGenres}
              setShowAllGenres={setShowAllGenres}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {isLoading ? (
                <>
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="aspect-[3/4] rounded-lg" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}
                </>
              ) : error ? (
                <div className="col-span-full text-center text-muted-foreground">
                  Error loading anime
                </div>
              ) : (
                displayedAnime.map((anime: any, index: number) => (
                  <DefaultAnimeCard
                    key={index}
                    title={anime.title}
                    year={anime.year}
                    genre={anime.genres[0]?.name || "Unknown"}
                    image_url={anime.images.jpg.image_url}
                    score={anime.score || 0}
                  />
                ))
              )}
            </div>

            {/* Show More Button */}
            {!isLoading &&
              !error &&
              displayedAnime.length < animeData.length && (
                <Button
                  className="w-full mt-6"
                  onClick={() => setDisplayLimit((prev) => prev + 15)}
                >
                  Show More
                </Button>
              )}
          </main>
        </div>
      </div>
    </div>
  );
}
