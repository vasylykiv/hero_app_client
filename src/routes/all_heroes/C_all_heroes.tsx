import { useEffect, useReducer, useState } from "react";

import C_HeroList from "../../components/hero_list/C_heroList.js";
import C_Pagination from "../../components/pagination/C_pagination.js";
import C_Modal from "../../components/modal/C_modal.js";

import { H_MainProvider } from "../../hooks/context/H_mainContext.js";
import H_basicReducer from "../../hooks/reducer/H_heroesReduser.js";

import U_fechData from "../../utils/U_fechData.js";

import type { ResponseData, State } from "src/types/types";

import "./C_all_heroes.css";

const initialState: State = {
  heroData: [],
  paginationData: { page: 1, limit: 6, totalHeroes: 0, totalPages: 1 },
  isLoading: false,
  isError: false,
  isNeedReload: true,
};

const AllHeroes = () => {
  const [state, dispatch] = useReducer(H_basicReducer, initialState);
  const [modalOpen, isModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (state.isNeedReload) {
      dispatch({ type: "FETCH_START" });

      async function fetch() {
        try {
          const fetchedData: ResponseData | undefined = await U_fechData(state.paginationData.page);

          if (fetchedData) {
            dispatch({ type: "FETCH_SUCCESS", payload: fetchedData });
          }
        } catch (error) {
          dispatch({ type: "FETCH_ERROR" });
        }
      }

      fetch();
    }
  }, [state.isNeedReload]);

  return (
    <div className="heroapp">
      <div className="heroapp__wrapper">
        <div className="heroapp__content">
          <h1 className="heroapp__title">Hero List</h1>
          <div className="heroapp__main">
            {!state.isError ? (
              <H_MainProvider paginationData={state.paginationData} heroData={state.heroData} dispatch={dispatch}>
                <C_HeroList />
                <div className="heroapp__button_add-new">
                  <button onClick={() => isModalOpen(true)}>Add new</button>
                </div>
                {modalOpen && (
                  <div>
                    <div>
                      <div>
                        <div>
                          <C_Modal heroData={null} />
                        </div>
                        <button onClick={() => isModalOpen(false)}>Close</button>
                      </div>
                    </div>
                  </div>
                )}
                <C_Pagination />
              </H_MainProvider>
            ) : (
              <div>Error</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllHeroes;
