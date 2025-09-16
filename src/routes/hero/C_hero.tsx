import { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

import H_heroReducer from "../../hooks/reducer/H_heroReduser.js";

import U_fetchHeroData from "../../utils/U_fetchHeroData.js";

import C_HeroFormModal from "../../components/modal/C_modal.js";

import type { HeroInstance, HeroState } from "src/types/types";

import "./C_hero.css";

const initialState: HeroState = {
  heroData: { id: "", nickname: "", real_name: "", origin_description: "", superpowers: "", catch_phrase: "", images_url: [] },
  isLoading: false,
  isError: false,
  isNeedReload: true,
};

function C_Hero() {
  const params = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(H_heroReducer, initialState);
  const navigate = useNavigate();
  const [modalOpen, isModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (state.isNeedReload) {
      dispatch({ type: "FETCH_START" });

      async function fetch() {
        try {
          const fetchedData: HeroInstance | undefined = await U_fetchHeroData(params.id!);

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

  async function deleteHandle() {
    await axios.delete(`http://localhost:3001/api/delete_hero/${params.id}`);
    navigate("/");
  }

  return (
    <div>
      <div>
        <div>
          <h1>{state.heroData.nickname}</h1>
          <h2>{state.heroData.real_name}</h2>
          <p>{state.heroData.origin_description}</p>
          <p>{state.heroData.catch_phrase}</p>
          <p>{state.heroData.superpowers}</p>
          <div>{state.heroData.images_url && state.heroData.images_url.map((image) => <img key={image as string} src={image as string} alt="hero image" />)}</div>

          <div>
            <button onClick={() => isModalOpen(true)}>Edit</button>
          </div>

          <div>
            <button onClick={deleteHandle}>Delete</button>
          </div>

          {modalOpen && (
            <div>
              <div>
                <div>
                  <div>
                    <C_HeroFormModal heroData={state.heroData} />
                  </div>
                  <button onClick={() => isModalOpen(false)}>Close</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default C_Hero;
