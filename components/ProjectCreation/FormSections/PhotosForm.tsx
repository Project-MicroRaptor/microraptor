import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import styles from "./ProfileSections.module.scss";

type Props = {
  formData: any;
  onFormChange: (id: string, value: any) => void;
};

export default function ImageForm(props: Props) {
  const { onFormChange, formData } = props;
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
