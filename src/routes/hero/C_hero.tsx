import { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

import H_heroReducer from "../../hooks/reducer/H_heroReduser.js";
import { H_HeroProvider } from "../../hooks/context/H_mainContext.js";

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
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(H_heroReducer, initialState);
  const [modalOpen, isModalOpen] = useState<boolean>(false);

  const image = state.heroData.images_url;

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

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);

  return (
    <div className="heropage">
      <div className="heropage__wrapper">
        <div className="heropage__content">
          <H_HeroProvider heroData={state.heroData}>
            <h1 className="heropage__nickname">Nickname: {state.heroData.nickname}</h1>
            <h2 className="heropage__name">Real name: {state.heroData.real_name}</h2>
            <hr />

            <p className="heropage_descr">
              Origin description: <span>c{state.heroData.origin_description}</span>
            </p>

            <p className="heropage__phrase">
              Catch phrase: <span>{state.heroData.catch_phrase}</span>
            </p>
            <p className="heropage__superpovers">
              Superpowers: <span>{state.heroData.superpowers}</span>
            </p>
            <hr />
            <div className="heropage__images">
              <span>Hero images</span>
              <div className="heropage__images_wrapper">
                {image &&
                  image[0] !== null &&
                  image.map((image) => (
                    <div key={image} className="heropage__image">
                      <img src={image as string} alt="hero image" />
                    </div>
                  ))}
              </div>
            </div>
            <hr />

            <div onClick={() => isModalOpen(true)} className="heropage__buttons">
              <div className="heropage__open_modal">
                <span>Edit</span>
              </div>

              <div onClick={deleteHandle} className="heropage__delete_hero">
                <span>Delete</span>
              </div>
            </div>

            {modalOpen && (
              <div>
                <div>
                  <div>
                    <div>
                      <C_HeroFormModal heroData={state.heroData} closeModal={isModalOpen} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </H_HeroProvider>
        </div>
      </div>
    </div>
  );
}

export default C_Hero;
