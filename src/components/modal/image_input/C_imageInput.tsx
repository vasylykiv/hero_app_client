import Dropzone from "react-dropzone";
import { useCallback } from "react";

import type { HeroFormValues, PreviewFile } from "src/types/types";
import type { UseFormSetError, UseFormClearErrors } from "react-hook-form";
import type { FileRejection } from "react-dropzone";

import "./C_imageInput.css";

interface ImageInputProps {
  value: PreviewFile[];
  onChange: (files: PreviewFile[]) => void;
  error?: string;
  setError: UseFormSetError<HeroFormValues>;
  clearErrors: UseFormClearErrors<HeroFormValues>;
}

function C_ImageInput({ value = [], onChange, setError, clearErrors }: ImageInputProps) {
  const onDropAccepted = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const firstRejection = fileRejections[0];
        const errorCode = firstRejection.errors[0].code;

        let message = "File not accepted";
        if (errorCode === "file-invalid-type") {
          message = "Only PNG and JPG files are allowed.";
        }

        setError("images_url", { type: "manual", message });
        return;
      }

      if (value.length + acceptedFiles.length > 5) {
        setError("images_url", { type: "manual", message: "You can upload up to 5 files." });
        return;
      }

      clearErrors("images_url");

      const newFilesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      onChange([...value, ...newFilesWithPreview]);
    },
    [value, onChange, setError, clearErrors]
  );

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, currentImageId: number) => {
    e.stopPropagation();
    const fileToDelete = value[currentImageId];
    if (fileToDelete) {
      URL.revokeObjectURL(fileToDelete.preview);
    }

    const newFiles = value.filter((_, imageId) => imageId !== currentImageId);
    onChange(newFiles);
  };

  console.log(value);
  return (
    <Dropzone onDrop={onDropAccepted} accept={{ "image/*": [".png", ".jpg"] }}>
      {({ getRootProps, getInputProps, isDragReject, isDragActive }) => {
        const isFocused = isDragActive || value.length > 0;

        return (
          <div
            {...getRootProps({
              className: `modal__field_images_area ${isFocused ? "modal__field_images--focused" : ""} ${isDragReject ? "modal__field_images--reject" : ""}`,
            })}
          >
            <input
              {...getInputProps({
                className: "modal__field_images_area",
              })}
            />
            <div className={"modal__field_images_previews"}>
              {value.length > 0 ? (
                value.map((image, index) => {
                  return (
                    <div className="modal__field_images_preview" key={image.name + index}>
                      <img src={image.preview} width={100} height={100} style={{ objectFit: "contain" }} alt="preview" />
                      <button onClick={(e) => handleDelete(e, index)}>&times;</button>
                    </div>
                  );
                })
              ) : (
                <>
                  <p className="modal__field_images_placeholder">Drag files here or click to select</p>
                </>
              )}
            </div>
          </div>
        );
      }}
    </Dropzone>
  );
}

export default C_ImageInput;
