import type { State, ResponseData } from "src/types/types";

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: ResponseData }
  | { type: "FETCH_ERROR" }
  | { type: "SET_NEED_RELOAD"; payload: boolean }
  | { type: "SET_PAGE"; payload: number };

function H_basicReducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      const { data, page, limit, totalHeroes, totalPages } = action.payload;
      return {
        ...state,
        heroData: data,
        paginationData: { page, limit, totalHeroes, totalPages },
        isError: false,
        isLoading: false,
        isNeedReload: false,
      };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, isError: true, isNeedReload: false };
    case "SET_NEED_RELOAD":
      return { ...state, isNeedReload: action.payload };
    case "SET_PAGE":
      return {
        ...state,
        paginationData: {
          ...state.paginationData,
          page: action.payload,
        },
        isNeedReload: true,
      };
    default:
      return state;
  }
}

export default H_basicReducer;
