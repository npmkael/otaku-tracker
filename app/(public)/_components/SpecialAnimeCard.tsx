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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4">
          <h3 className="text-xs sm:text-sm font-medium text-white mb-1 line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-white/80">
            {year}, {genre}
          </p>
        </div>
      </div>
    </div>
  );
};
