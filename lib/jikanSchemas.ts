import { z } from "zod";

export const defaultAnimeSchema = z.object({
  data: z.array(
    z.object({
      title: z.string(),
      year: z.number().nullable(),
      score: z.number(),
      genres: z.array(
        z.object({
          name: z.string(),
        })
      ),
      images: z.object({
        jpg: z.object({
          image_url: z.string(),
        }),
      }),
    })
  ),
});
