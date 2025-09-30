interface CollectionCardProps {
  title: string;
  images: string[];
}

export const CollectionCard = ({ title, images }: CollectionCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative bg-zinc-900 backdrop-blur-sm rounded-xl p-6 h-[280px] overflow-hidden border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-6 text-center relative z-10">
          {title}
        </h3>

        {/* Overlapping Images Container */}
        <div className="relative h-[180px] flex items-center justify-center">
          <div
            className="absolute w-40 h-60 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 -bottom-28 border-6 border-zinc-900"
            style={{
              transform: `translateX(0px) rotate(0deg)`,
              zIndex: 10,
            }}
          >
            <img
              src={images[0]}
              alt="Anime collection"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute w-40 h-60 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 -bottom-28 border-6 border-zinc-900"
            style={{
              transform: `translateX(-64px) translateY(-16px) rotate(-12deg)`,
              zIndex: 1,
            }}
          >
            <img
              src={images[0]}
              alt="Anime collection"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute w-40 h-60 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 -bottom-28 border-6 border-zinc-900"
            style={{
              transform: `translateX(64px) translateY(24px) rotate(12deg)`,
              zIndex: 11,
            }}
          >
            <img
              src={images[0]}
              alt="Anime collection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
