import { createContext } from "react";
import type { Dispatch } from "react";
import type { HeroesInstance, PaginationInstance, MainProviderProps, Action } from "src/types/types";

const paginationData = { page: 1, limit: 6, totalHeroes: 0, totalPages: 1 };

export const HeroDataContext = createContext<HeroesInstance[]>([]);
export const PaginationDataContext = createContext<PaginationInstance>(paginationData);
export const DistpatchFunction = createContext<Dispatch<Action> | undefined>(undefined);

function C_MainProvider({ children, ...props }: MainProviderProps) {
  return (
    <PaginationDataContext.Provider value={props.paginationData}>
      <HeroDataContext.Provider value={props.heroData}>
        <DistpatchFunction value={props.dispatch}>{children}</DistpatchFunction>
      </HeroDataContext.Provider>
    </PaginationDataContext.Provider>
  );
}

export default C_MainProvider;
