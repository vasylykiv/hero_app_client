import type { HeroState, HeroInstance } from "src/types/types";

type Action = { type: "FETCH_START" } | { type: "FETCH_SUCCESS"; payload: HeroInstance } | { type: "FETCH_ERROR" } | { type: "SET_NEED_RELOAD"; payload: boolean };

function H_heroReducer(state: HeroState, action: Action): HeroState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        heroData: { ...action.payload },
        isError: false,
        isLoading: false,
        isNeedReload: false,
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, isError: true, isNeedReload: false };
    case "SET_NEED_RELOAD":
      return { ...state, isNeedReload: action.payload };
    default:
      return state;
  }
}

export default H_heroReducer;
