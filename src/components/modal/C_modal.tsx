import axios from "axios";

import { useForm } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import C_ImageInput from "./image_input/C_imageInput";

import type { HeroInstance } from "../../types/types";
import { heroFormSchema } from "./hero.schema";
import type { HeroFormValues } from "./hero.schema";

function C_Modal({ heroData }: { heroData: HeroInstance | null }) {
  const isEditMode = !!heroData; //Create or edit trigger

  const defaultValues = isEditMode
    ? {
        // Edit mode
        nickname: heroData.nickname,
        real_name: heroData.real_name,
        origin_description: heroData.origin_description,
        superpowers: heroData.superpowers || "",
        catch_phrase: heroData.catch_phrase || "",
        images_url: heroData.images_url || [],
      }
    : {
        // Create
        nickname: "",
        real_name: "",
        origin_description: "",
        superpowers: "",
        catch_phrase: "",
        images_url: [],
      };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<HeroFormValues>({ resolver: zodResolver(heroFormSchema), defaultValues });

  // Convert url to file type
  async function convertUrlToFile(item: string | File, index: number): Promise<File> {
    if (item instanceof File) return item;
    try {
      const response = await axios.get(item, { responseType: "blob" });
      const blob = response.data as Blob;
      const fileExtension = item.split(".").pop()?.toLowerCase() || "jpg";
      return new File([blob], `existing-image-${index}.${fileExtension}`, { type: blob.type });
    } catch (error) {
      console.error(`Failed to load image from URL: ${item}`, error);
      throw new Error(`Failed to process existing image: ${index + 1}.`);
    }
  }

  // Request to server
  async function onSubmit(data: HeroFormValues) {
    try {
      const allFiles: File[] = await Promise.all((data.images_url ?? []).map((item, index) => convertUrlToFile(item, index)));

      const formData = new FormData();
      formData.append("nickname", data.nickname);
      formData.append("real_name", data.real_name);
      formData.append("origin_description", data.origin_description);
      if (data.superpowers) formData.append("superpowers", data.superpowers);
      if (data.catch_phrase) formData.append("catch_phrase", data.catch_phrase);

      allFiles.forEach((file) => {
        formData.append("images", file);
      });

      if (isEditMode) {
        const queryAction = allFiles.length > 0 ? "change" : "delete";
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
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <h2>{isEditMode && heroData ? `Edit: ${heroData.nickname}` : "Add"}</h2>
      <div>
        <div>
          <label>Nickname *</label>
          <input {...register("nickname")} />
          {errors.nickname && <p>{errors.nickname.message}</p>}
        </div>

        <div>
          <label>Real name *</label>
          <input {...register("real_name")} />
          {errors.real_name && <p>{errors.real_name.message}</p>}
        </div>

        <div>
          <label>Origin description *</label>
          <textarea {...register("origin_description")} />
          {errors.origin_description && <p>{errors.origin_description.message}</p>}
        </div>

        <div>
          <label>Superpowers</label>
          <input {...register("superpowers")} />
        </div>

        <div>
          <label>Catch phrase</label>
          <input {...register("catch_phrase")} />
        </div>

        <div>
          <label>Images</label>
          <C_ImageInput control={control} name="images_url" />
        </div>

        <div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (isEditMode ? "Saving..." : "Adding...") : isEditMode ? "Save changes" : "Add hero"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default C_Modal;
