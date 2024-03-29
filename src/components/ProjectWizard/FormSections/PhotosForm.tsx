import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import type { CreateFormData } from "../../../types/createForm";
import type { FormErrors } from "../../../utils/formValidation";

import styles from "./ProfileSections.module.scss";

type Props = {
  formData: CreateFormData;
  onFormChange: (id: string, value: any) => void;
  errors: FormErrors;
};

export default function PhotosForm(props: Props) {
  const { onFormChange, formData, errors } = props;
  const imageArray = Array(6); // number of images

  const ImageFormControls = (array: Array<null>) => {
    const images = [...array].map((val, i) => {
      const id = `image${i}`;

      return (
        <FormControl
          className={styles.formControl}
          key={i}
          isRequired={i === 0}
        >
          <FormLabel htmlFor={id} className={styles.formLabel}>
            Image {i + 1}
          </FormLabel>
          <Input
            type="text"
            id={id}
            value={formData?.image?.[i] ?? ""}
            className={styles.formInput}
            onChange={(event) =>
              onFormChange("image", {
                ...formData.image,
                [i]: event.target.value,
              })
            }
            isInvalid={i === 0 && !!errors.image}
          />
        </FormControl>
      );
    });

    return images;
  };

  return (
    <div className={styles.container}>{ImageFormControls(imageArray)}</div>
  );
}
