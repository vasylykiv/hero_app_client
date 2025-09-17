import Dropzone from "react-dropzone";
import { HeroDataContext } from "src/hooks/context/H_mainContext";
import { useContext, useEffect, useState, useCallback } from "react";

import axios from "axios";

import type { HeroInstance } from "src/types/types";

interface PreviewFile extends File {
  preview: string;
}

function C_ImageInput({ isEdit, onFilesChange }: { isEdit: boolean; onFilesChange: React.Dispatch<React.SetStateAction<File[]>> }) {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const imagesOnPage = useContext<HeroInstance["images_url"]>(HeroDataContext) || [];

  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  useEffect(() => {
    if (isEdit) {
      try {
        async function fetch(url: string) {
          if (url.length <= 0) return;
          const response = await axios.get(url, { responseType: "blob" });

          const blob = response.data as Blob;
          const filename = url.split("/").pop()!;

          const blobFile = new File([blob], filename, { type: blob.type });

          return Object.assign(blobFile, {
            preview: URL.createObjectURL(blobFile),
          });
        }

        async function storeCreatedImages(): Promise<void> {
          const resultFiles = await Promise.all(imagesOnPage.map((image) => fetch(image).catch(() => null)));

          if (resultFiles?.length > 0) setFiles(resultFiles as any);
        }

        storeCreatedImages();
      } catch (error) {
        console.error(error);
      }
    }

    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [isEdit, imagesOnPage]);

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => {
      const availableSlots = 5 - prevFiles.length;

      if (availableSlots <= 0) {
        return prevFiles;
      }
      const filesToAdd = acceptedFiles.slice(0, availableSlots);

      const newFilesWithPreview = filesToAdd.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      return [...prevFiles, ...newFilesWithPreview];
    });
  }, []);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, currentImageId: number) => {
    e.stopPropagation();
    const fileToDelete = files[currentImageId];
    if (fileToDelete) {
      URL.revokeObjectURL(fileToDelete.preview);
    }

    setFiles((prevFiles) => prevFiles.filter((_, imageId) => imageId !== currentImageId));
  };

  console.log(files);

  return (
    <Dropzone onDrop={onDropAccepted} accept={{ "image/*": [".png", ".jpg"] }}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps({
            className: "modal__field_images_area",
            // ${isFocused ? "modal__field_images--focused" : ""}
            // ${isDragAccept ? "modal__field_images--accept" : ""}
            // ${isDragReject ? "modal__field_images--reject" : ""}
          })}
        >
          <input
            {...getInputProps({
              className: "modal__field_images_area",
            })}
          />
          <div className={"modal__field_images_previews"}>
            {files.length > 0 ? (
              files.map((image, index) => {
                return (
                  <div key={image.name + index}>
                    <img src={image.preview} width={100} height={100} style={{ objectFit: "contain" }} alt="preview" />
                    <button onClick={(e) => handleDelete(e, index)}>&times; {/* Це символ "хрестик" */}</button>
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
      )}
    </Dropzone>
  );
}

export default C_ImageInput;
