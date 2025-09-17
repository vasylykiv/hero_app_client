import type { Dispatch } from "react";

// For responsed data
export interface PaginationInstance {
  page: number;
  limit: number;
  totalHeroes: number;
  totalPages: number;
}

export interface HeroesInstance {
  id: string;
  nickname: string;
  real_name: string | null;
  origin_description: string | null;
  image_url: string;
}

export interface HeroInstance {
  id?: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers?: string;
  catch_phrase?: string;
  images_url?: string[];
}

export interface ResponseData extends PaginationInstance {
  data: HeroesInstance[];
  message: string;
  paginationData: PaginationInstance;
}
// ______________________________________________

// For Context Provider
export interface MainProviderProps {
  children: React.ReactNode;
  heroData: HeroesInstance[];
  paginationData: PaginationInstance;
  dispatch: Dispatch<Action>;
}

export interface HeroProviderProps {
  children: React.ReactNode;
  heroData: HeroInstance;
}
// ______________________________________________

// For reducer
type State = {
  heroData: HeroesInstance[];
  paginationData: PaginationInstance;
  isLoading: boolean;
  isError: boolean;
  isNeedReload: boolean;
};

type HeroState = {
  heroData: HeroInstance;
  isLoading: boolean;
  isError: boolean;
  isNeedReload: boolean;
};

export type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: ResponseData }
  | { type: "FETCH_ERROR" }
  | { type: "SET_NEED_RELOAD"; payload: boolean }
  | { type: "SET_PAGE"; payload: number };

export type HeroAction = { type: "FETCH_START" } | { type: "FETCH_SUCCESS"; payload: HeroesInstance[] } | { type: "FETCH_ERROR" } | { type: "SET_NEED_RELOAD"; payload: boolean };
// ______________________________________________
