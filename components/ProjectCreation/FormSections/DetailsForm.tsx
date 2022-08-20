import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import styles from "./ProfileSections.module.scss";

type Props = {
  formData: any;
  onFormChange: (id: string, value: any) => void;
};

export default function DetailsForm(props: Props) {
  const { onFormChange, formData } = props;

  return (
    <div className={styles.container}>
      <FormControl className={styles.formControl} isRequired>
        <FormLabel htmlFor="aboutBusiness" className={styles.formLabel}>
          About the Business
        </FormLabel>
        <Textarea
          id="aboutBusiness"
          value={formData.aboutBusiness ?? ""}
          className={styles.formInput}
          onChange={(event) =>
            onFormChange(event.target.id, event.target.value)
          }
        />
      </FormControl>

      <FormControl className={styles.formControl} isRequired>
        <FormLabel htmlFor="aboutOwner" className={styles.formLabel}>
          About the Owner
        </FormLabel>
        <Textarea
          id="aboutOwner"
          value={formData.aboutOwner ?? ""}
          className={styles.formInput}
          onChange={(event) =>
            onFormChange(event.target.id, event.target.value)
          }
        />
      </FormControl>

      <FormControl className={styles.formControl} isRequired>
        <FormLabel htmlFor="businessPlan" className={styles.formLabel}>
          Business Plan
        </FormLabel>
        <Textarea
          id="businessPlan"
          value={formData.businessPlan ?? ""}
          className={styles.formInput}
          onChange={(event) =>
            onFormChange(event.target.id, event.target.value)
          }
        />
      </FormControl>
    </div>
  );
}
