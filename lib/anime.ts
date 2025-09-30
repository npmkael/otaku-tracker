import { useQuery } from "@tanstack/react-query";
import { defaultAnimeSchema } from "./jikanSchemas";

const specialAnimeFetch = async (title: string) => {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}&limit=1`
  );

  const json = await res.json();
  const parsed = defaultAnimeSchema.parse(json);
  return parsed.data[0];
};

// Helper function to add delay between requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useSpecialForYouAnime(titles: string[]) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["anime-list", ...titles],
    queryFn: async () => {
      const results = [];
      // Fetch sequentially with 400ms delay between requests (respects 3 req/sec limit)
      for (const title of titles) {
        const anime = await specialAnimeFetch(title);
        results.push(anime);
        // Add delay between requests, except for the last one
        if (title !== titles[titles.length - 1]) {
          await delay(400);
        }
      }
      return results;
    },
    enabled: titles.length > 0,
  });

  return { data, error, isLoading };
}
