import axios from "axios";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import C_ImageInput from "./image_input/C_imageInput";

import type { HeroInstance } from "../../types/types";
import type { HeroFormValues } from "./hero.schema";

import "./C_modal.css";

function C_Modal({ heroData }: { heroData: HeroInstance | null }) {
  const isEditMode = !!heroData; //Create or edit trigger

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<HeroFormValues>({ ...(isEditMode ? { defaultValues: heroData! } : {}) });

  useEffect(() => {
    setValue("images_url", imageFiles, { shouldValidate: true, shouldDirty: true });
  }, [imageFiles, setValue]);

  // Request to server
  async function onSubmit(data: HeroFormValues) {
    try {
      const formData = new FormData();
      formData.append("nickname", data.nickname);
      formData.append("real_name", data.real_name);
      formData.append("origin_description", data.origin_description);
      if (data.superpowers) formData.append("superpowers", data.superpowers);
      if (data.catch_phrase) formData.append("catch_phrase", data.catch_phrase);

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      if (isEditMode) {
        const queryAction = imageFiles.length > 0 ? "change" : "delete";
        await axios.put(`http://localhost:3001/api/change_hero/${heroData.id}?action=${queryAction}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`http://localhost:3001/api/add_hero`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      window.location.reload();
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      alert(`Failed to submit form: ${errorMessage}`);
    }
  }

  const onError = (errors: any) => console.log("Validation errors:", errors);

  return (
    <div className="modal">
      <div className="modal__wrapper">
        <div className="modal__content">
          <form className="modal__form" onSubmit={handleSubmit(onSubmit, onError)}>
            <h2 className="modal__title">{isEditMode && heroData ? `Edit information about hero: ${heroData.nickname}` : "Add new hero"}</h2>
            <div className="modal__fields">
              <div className="modal__field">
                <label className="modal__field_name">
                  Nickname <span>*</span>
                </label>
                <input className="modal__field_input" {...register("nickname")} />
                {errors.nickname && <p>{errors.nickname.message}</p>}
              </div>

              <div className="modal__field">
                <label className="modal__field_name">
                  Real name <span>*</span>
                </label>
                <input className="modal__field_input" {...register("real_name")} />
                {errors.real_name && <p>{errors.real_name.message}</p>}
              </div>

              <div className="modal__field">
                <label className="modal__field_name">
                  Description <span>*</span>
                </label>
                <textarea className="modal__field_input modal__field_textarea" {...register("origin_description")} />
                {errors.origin_description && <p>{errors.origin_description.message}</p>}
              </div>

              <div className="modal__field modal__field_not-required">
                <label className="modal__field_name">Superpowers</label>
                <input className="modal__field_input" {...register("superpowers")} />
              </div>

              <div className="modal__field modal__field_not-required">
                <label className="modal__field_name">Phrase</label>
                <input className="modal__field_input" {...register("catch_phrase")} />
              </div>

              <div className="modal__field modal__field_images modal__field_not-required">
                <label className="modal__field_name">Images</label>
                <C_ImageInput isEdit={isEditMode} onFilesChange={setImageFiles} />
                {errors.images_url && <p>{errors.images_url.message}</p>}
              </div>

              <div>
                <button className="modal__submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (isEditMode ? "Saving..." : "Adding...") : isEditMode ? "Save changes" : "Add hero"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default C_Modal;
