import { useContext } from "react";
import { DistpatchFunction, PaginationDataContext } from "src/hooks/context/H_mainContext";

import U_paginationGenerate from "../../utils/U_paginationGenerate";

import type { PaginationInstance } from "src/types/types";

import "./C_pagination.css";

function C_Pagination() {
  const paginationData: PaginationInstance = useContext(PaginationDataContext);
  const dispatch = useContext(DistpatchFunction);
  const pages = U_paginationGenerate(paginationData.page, paginationData.totalPages);

  function onClick(page: string | number) {
    if (dispatch) {
      dispatch({ type: "SET_PAGE", payload: Number(page) });
    }
  }
  return (
    <div className="pagination">
      <div className="pagination__wrapper">
        <div className="pagination__content">
          {pages.map((page, id) =>
            page === "..." ? (
              <span className="pagination__dots" key={id}>
                ...
              </span>
            ) : (
              <button
                className={page === paginationData.page ? "pagination__buttons pagination__current" : "pagination__buttons"}
                disabled={page === paginationData.page}
                onClick={() => onClick(page)}
                key={id}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default C_Pagination;
