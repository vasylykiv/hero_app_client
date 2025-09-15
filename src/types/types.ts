export type ResonseData = {
  message: string;
  page: number;
  limit: number;
  totalHeroes: number;
  totalPages: number;
  data: HeroInstance[];
};

export type HeroInstance = {
  id: string;
  nickname: string;
  real_name: string | null;
  origin_description: string | null;
  superpowers: string | null;
  catch_phrase: string | null;
  images_url: string[] | [];
};
