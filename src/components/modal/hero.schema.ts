import { z } from "zod";

export const heroFormSchema = z.object({
  nickname: z.string().min(1, "Required field"),
  real_name: z.string().min(1, "Required field"),
  origin_description: z.string().min(1, "Required field"),
  superpowers: z.string().optional(),
  catch_phrase: z.string().optional(),
  images_url: z.optional(
    z.preprocess((arg) => {
      if (!Array.isArray(arg)) return [];
      return arg.filter((item) => item != null);
    }, z.array(z.union([z.instanceof(File), z.string()]), { message: "Input must be a File or a URL string" }).max(5, "Maximum 5 images"))
  ),
});

export type HeroFormValues = z.infer<typeof heroFormSchema>;
