import {
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  useDisclosure
} from "@chakra-ui/react";
import { BsCurrencyDollar } from "react-icons/bs";
import { ProjectCategories } from "../../../types/categories";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { dateFormat, dayNames, monthNames } from "../../../utils/calendarUtils";
import SwitchButton from "../../SwitchButton/SwitchButton";
import NumberFormat from "react-number-format";

import styles from "./ProfileSections.module.scss";

import type { ProjectCategory } from "../../../types/categories";
import type { FormErrors } from "../../../utils/formValidation";
import type { CreateFormData } from "../../../types/createForm";
import LocationModal from "../../LocationModal/LocationModal";

type Props = {
  formData: CreateFormData;
  onFormChange: (id: string, value: any) => void;
  errors: FormErrors;
  editMode?: boolean;
};

export default function MyProjectForm(props: Props) {
  const { onFormChange, formData, errors, editMode = false } = props;

  const {
    isOpen: isLocationOpen,
    onOpen: onLocationOpen,
    onClose: onLocationClose
  } = useDisclosure();

  const CategoryButtons = () => {
    const buttons = Object.keys(ProjectCategories).map((key) => {
      const category = ProjectCategories[key as keyof ProjectCategory];
      const selected = formData.categories && formData.categories[key];

      return (
        <SwitchButton
          key={key}
          selected={!!selected}
          onChange={(value) =>
            onFormChange("categories", {
              ...formData.categories,
              [key]: value
            })
          }
          isInvalid={!!errors?.categories}
        >
          {category}
        </SwitchButton>
      );
    });

    return (
      <SimpleGrid minChildWidth="120px" spacing="20px">
        {buttons}
      </SimpleGrid>
    );
  };

  return (
    <div className={styles.container}>
      <FormControl className={styles.formControl} isRequired>
        <FormLabel htmlFor="name" className={styles.formLabel}>
          Project Title
        </FormLabel>
        <Input
          type="text"
          id="name"
          value={formData.name ?? ""}
          className={styles.formInput}
          onChange={(event) =>
            onFormChange(event.target.id, event.target.value)
          }
          isInvalid={!!errors?.name}
        />
      </FormControl>

      <FormControl className={styles.formControl} isRequired>
        <FormLabel htmlFor="shortDescription" className={styles.formLabel}>
          Short Description
        </FormLabel>
        <Input
          type="text"
          id="shortDescription"
          value={formData.shortDescription ?? ""}
          className={styles.formInput}
          onChange={(event) =>
            onFormChange(event.target.id, event.target.value)
          }
          isInvalid={!!errors?.shortDescription}
        />
      </FormControl>

      <FormControl
        className={`${styles.formControl} ${styles.inputLeft}`}
        isRequired
      >
        <FormLabel htmlFor="targetFunding" className={styles.formLabel}>
          Target Funding
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <BsCurrencyDollar />
          </InputLeftElement>
          <NumberFormat
            thousandSeparator
            customInput={Input}
            id="targetFunding"
            value={formData.targetFunding ?? ""}
            onValueChange={(values) =>
              onFormChange("targetFunding", values.floatValue)
            }
            isInvalid={!!errors?.targetFunding}
            disabled={!!editMode}
          />
        </InputGroup>
      </FormControl>

      <FormControl className={styles.formControl} isRequired>
        <FormLabel htmlFor="completedAt" className={styles.formLabel}>
          Target Date
        </FormLabel>
        <SingleDatepicker
          name="completedAt"
          date={formData.completedAt}
          onDateChange={(date) => onFormChange("completedAt", date)}
          configs={{
            dateFormat: dateFormat,
            monthNames: monthNames,
            dayNames: dayNames
          }}
          propsConfigs={{
            inputProps: {
              isInvalid: !!errors?.completedAt
            }
          }}
          disabled={!!editMode}
        />
      </FormControl>

      <FormControl className={styles.formControl} isRequired>
        <FormLabel htmlFor="location" className={styles.formLabel}>
          Location
        </FormLabel>
        <Input
          id="location"
          className={styles.formInput}
          value={
            formData?.location
              ? `${formData.location.locality ?? "UNKNOWN"}, ${
                  formData.location.postcode
                }`
              : ""
          }
          onChange={() => {}}
          onFocus={onLocationOpen}
          isInvalid={!!errors?.location}
        />
      </FormControl>
      <LocationModal
        isOpen={isLocationOpen}
        onClose={onLocationClose}
        selectLocation={(location) => onFormChange("location", location)}
        noAllLocations
      />

      <Divider marginBottom="25px" />

      <FormControl className={styles.formControl} isRequired>
        <FormLabel htmlFor="categories" className={styles.formLabel}>
          Relevant Categories
        </FormLabel>
        <CategoryButtons />
      </FormControl>
    </div>
  );
}
