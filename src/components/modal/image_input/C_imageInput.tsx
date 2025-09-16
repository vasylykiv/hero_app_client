import Dropzone from "react-dropzone";
import { useController } from "react-hook-form";
import type { HeroFormValues } from "../hero.schema";

import type { UseControllerProps } from "react-hook-form";

function C_ImageInput(props: UseControllerProps<HeroFormValues, "images_url">) {
  const { field, fieldState } = useController({ ...props, defaultValue: [] });

  function removeImage(index: number) {
    const updatedImages = [...(field.value ?? [])];
    updatedImages.splice(index, 1);
    field.onChange(updatedImages);
  }

  function accepted(acceptedFiles: any) {
    const currentFiles = field.value ?? [];
    const availableSlots = 5 - currentFiles.length;
    if (availableSlots <= 0) return;
    const filesToAdd = acceptedFiles.slice(0, availableSlots);
    field.onChange([...currentFiles, ...filesToAdd]);
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number) {
    e.stopPropagation();
    removeImage(i);
  }

  return (
    <Dropzone onDrop={(acceptedFiles) => accepted(acceptedFiles)} accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag files here or click to select (maximum 5)</p>
          <div>
            {(field.value ?? []).filter(Boolean).map((item, i) => {
              const previewSrc = typeof item === "string" ? item : URL.createObjectURL(item);
              return (
                <div key={i}>
                  <img src={previewSrc} width={100} height={100} style={{ objectFit: "contain" }} alt={`Preview ${i}`} />
                  <button
                    type="button"
                    onClick={(e) => {
                      handleClick(e, i);
                    }}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
          {fieldState.error && <p style={{ color: "red", marginTop: 10 }}>{fieldState.error.message}</p>}
        </div>
      )}
    </Dropzone>
  );
}

export default C_ImageInput;
