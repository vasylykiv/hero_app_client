import axios from "axios";

import { useEffect } from "react";

import { useForm, Controller } from "react-hook-form";

import C_ImageInput from "./image_input/C_imageInput";

import type { HeroInstance, PreviewFile, HeroFormValues } from "../../types/types";

import "./C_modal.css";

function C_Modal({ heroData, closeModal }: { heroData: HeroInstance | null; closeModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const isEditMode = !!heroData; //Create or edit trigger

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<HeroFormValues>({
    defaultValues: {
      ...(isEditMode ? heroData : {}),
      images_url: [],
    },
  });

  useEffect(() => {
    if (isEditMode && heroData?.images_url) {
      async function fetchImageFile(url: string): Promise<PreviewFile | null> {
        try {
          if (!url) return null;
          const response = await axios.get(url, { responseType: "blob" });
          const blob = response.data as Blob;
          const filename = url.split("/").pop();

          if (!filename) return null;

          const file = new File([blob], filename, { type: blob.type });
          return Object.assign(file, { preview: URL.createObjectURL(file) });
        } catch (error) {
          console.error(`Failed to load image from ${url}`, error);
          return null;
        }
      }

      async function initializeImages() {
        const imageFilesPromises = heroData!.images_url.map(fetchImageFile);
        const settledFiles = await Promise.all(imageFilesPromises);

        const validFiles = settledFiles.filter(Boolean) as PreviewFile[];

        if (validFiles.length > 0) {
          setValue("images_url", validFiles);
        }
      }

      initializeImages();
    }
  }, [isEditMode, heroData, setValue]);

  // Request to server
  async function onSubmit(data: HeroFormValues) {
    try {
      const formData = new FormData();
      formData.append("nickname", data.nickname);
      formData.append("real_name", data.real_name);
      formData.append("origin_description", data.origin_description);
      if (data.superpowers) formData.append("superpowers", data.superpowers);
      if (data.catch_phrase) formData.append("catch_phrase", data.catch_phrase);

      if (data.images_url && data.images_url.length > 0) {
        data.images_url.forEach((file) => {
          formData.append("images", file);
        });
      }

      if (isEditMode) {
        const queryAction = data.images_url.length > 0 ? "change" : "delete";
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
                <input
                  className={`modal__field_input ${errors.real_name ? "modal__field_input_err" : ""}`}
                  {...register("nickname", { required: "This field is required", maxLength: { value: 20, message: "Maximum 20 characters" } })}
                />
                {errors.nickname && <span style={{ color: "red" }}>{errors.nickname.message}</span>}
              </div>

              <div className="modal__field">
                <label className="modal__field_name">
                  Real name <span>*</span>
                </label>
                <input
                  className={`modal__field_input ${errors.real_name ? "modal__field_input_err" : ""}`}
                  {...register("real_name", { required: "This field is required", maxLength: { value: 20, message: "Maximum 20 characters" } })}
                />
                {errors.real_name && <span style={{ color: "red" }}>{errors.real_name.message}</span>}
              </div>

              <div className="modal__field">
                <label className="modal__field_name">
                  Description <span>*</span>
                </label>
                <textarea
                  className={`modal__field_input modal__field_textarea ${errors.origin_description ? "modal__field_input_err" : ""}`}
                  {...register("origin_description", { required: "This field is required", minLength: { value: 6, message: "Minimun 6 characters" } })}
                />
                {errors.origin_description && <span style={{ color: "red" }}>{errors.origin_description.message}</span>}
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
                <Controller
                  name="images_url"
                  control={control}
                  render={({ field, fieldState }) => (
                    <C_ImageInput
                      value={field.value}
                      onChange={(files) => {
                        setValue("images_url", files, { shouldValidate: true });
                      }}
                      setError={setError}
                      clearErrors={clearErrors}
                      error={fieldState.error?.message}
                    />
                  )}
                />
                {errors.images_url && <span style={{ color: "red" }}>{errors.images_url.message}</span>}
              </div>

              <div className="modal__submit">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (isEditMode ? "Saving..." : "Adding...") : isEditMode ? "Save changes" : "Add hero"}
                </button>
              </div>
            </div>
          </form>
          <button className="modal__close" onClick={() => closeModal(false)}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}

export default C_Modal;
