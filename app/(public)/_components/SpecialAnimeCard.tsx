import { Badge } from "@/components/ui/badge";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";

interface SpecialAnimeCardProps {
  title: string;
  year: string;
  genre: string;
  image_url: string;
}

export const SpecialAnimeCard = ({
  title,
  year,
  genre,
  image_url,
}: SpecialAnimeCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2 sm:mb-3">
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />

        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 transition-opacity duration-300 group-hover:opacity-0">
          <h3 className="text-xs sm:text-sm font-medium text-white mb-1 line-clamp-2 ">
            {title}
          </h3>
          <p className="text-xs text-white/80">
            {year}, {genre}
          </p>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-zinc-800 py-2 px-4 rounded-br-lg rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2 items-center">
            <Star className="size-3" />
            <span className="text-sm">9.8</span>
          </div>
        </div>

        <div className="absolute bottom-6 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <div className="flex items-center justify-center gap-2">
            <button className="flex items-center rounded-full bg-zinc-800 hover:bg-zinc-900 p-[12px] cursor-pointer duration-300 transition-all">
              <ThumbsUp className="size-4" />
            </button>
            <button className="flex items-center rounded-full bg-zinc-800 hover:bg-zinc-900 p-[12px] cursor-pointer duration-300 transition-all">
              <ThumbsDown className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
