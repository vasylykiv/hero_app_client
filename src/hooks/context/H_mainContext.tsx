import { createContext } from "react";
import type { Dispatch } from "react";
import type { HeroesInstance, HeroInstance, PaginationInstance, MainProviderProps, HeroProviderProps, Action } from "src/types/types";

const paginationData = { page: 1, limit: 6, totalHeroes: 0, totalPages: 1 };

export const HeroesDataContext = createContext<HeroesInstance[]>([]);
export const HeroDataContext = createContext<HeroInstance["images_url"]>([""]);
export const PaginationDataContext = createContext<PaginationInstance>(paginationData);
export const DistpatchFunction = createContext<Dispatch<Action> | undefined>(undefined);

export function H_MainProvider({ children, ...props }: MainProviderProps) {
  return (
    <PaginationDataContext.Provider value={props.paginationData}>
      <HeroesDataContext.Provider value={props.heroData}>
        <DistpatchFunction value={props.dispatch}>{children}</DistpatchFunction>
      </HeroesDataContext.Provider>
    </PaginationDataContext.Provider>
  );
}

export function H_HeroProvider({ children, ...props }: HeroProviderProps) {
  return <HeroDataContext.Provider value={props.heroData.images_url}>{children}</HeroDataContext.Provider>;
}
