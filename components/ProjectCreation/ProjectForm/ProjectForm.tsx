import {
  BsFillPlusSquareFill,
  BsFillPencilFill,
  BsFillImageFill,
  BsFillGiftFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import Router from 'next/router'
import { useState } from "react";
import { Button } from "@chakra-ui/react";

import TabSwitcher from "../TabSwitcher/TabSwitcher";
import MyProjectForm from "../FormSections/MyProjectForm";
import DetailsForm from "../FormSections/DetailsForm";
import PhotosForm from "../FormSections/PhotosForm";
import RewardsForm from "../FormSections/RewardsForm";
import { createProject } from "../../../db/dbUtils";
import {validateMyProjectForm, validatePhotosForm } from "../../../utils/formValidation";

import styles from "./ProjectForm.module.scss";
import type { FormErrors } from "../../../utils/formValidation";

export default function ProjectForm() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [errorData, setErrorData] = useState<FormErrors>({});

  const onChangeTab = (tab: number) => {
    setSelectedTab(tab);
  };

  const onFormChange = (id: string, value: any) => {
    setFormData({
      ...formData,
      [id]: value,
    });

    setErrorData({
      ...errorData,
      [id]: false,
    });
  };

  const validateForm = () => {
    let page: number | null = null;
    let errors: FormErrors = {};

    // My Project Form Validation
    const myProjectValidation = validateMyProjectForm(formData);
    if (page === null && myProjectValidation.page !== null) {
      page = myProjectValidation.page;
    }
    if (myProjectValidation.errors) {
      errors = {
        ...errors,
        ...(myProjectValidation.errors)
      }
    }

    const photosValidation = validatePhotosForm(formData);
    if (page === null && photosValidation.page !== null) {
      page = photosValidation.page;
    }
    if (photosValidation.errors) {
      errors = {
        ...errors,
        ...(photosValidation.errors)
      }
    }

    return {
      page,
      errors
    };
  };

  const submitProject = async () => {
    const {page, errors} = validateForm();

    if (page !== null && errors) {
      onChangeTab(page);
      setErrorData(errors);
      return;
    }

    if (!formData || Object.keys(formData).length == 0) {
      return;
    }

    const categories: Array<string> = [];
    if (formData?.categories) {
      Object.entries(formData?.categories)?.forEach(([key, value]) => {
        if (value) categories.push(key);
      });
    }

    const images: Array<string> = [];
    if (formData?.image) {
      Object.values(formData?.image)?.forEach((value: any) => {
        if (value) images.push(value);
      });
    }

    const projectDetails = {
      name: formData?.name,
      completedAt: formData?.completedAt?.toISOString(),
      targetFunding: Number(formData?.targetFunding),
      postcode: Number(formData?.postcode),
      shortDescription: formData?.shortDescription,
      categories,
      ...(formData?.aboutBusiness && {aboutBusiness: formData?.aboutBusiness}),
      ...(formData?.aboutOwner && {aboutOwner: formData?.aboutOwner}),
      ...(formData?.businessPlan && {businessPlan: formData?.businessPlan}),
      images,
    };

    const response = await createProject(projectDetails);

    if (response?.project?.id) {
      Router.push(`/project/${response.project.id}`);
    }
  }

  const tabs = [
    {
      name: "My Project",
      icon: <BsFillPlusSquareFill />,
      form: <MyProjectForm formData={formData} onFormChange={onFormChange} errors={errorData} />,
    },
    {
      name: "Details",
      icon: <BsFillPencilFill />,
      form: <DetailsForm formData={formData} onFormChange={onFormChange} />
    },
    {
      name: "Photos",
      icon: <BsFillImageFill />,
      form: <PhotosForm formData={formData} onFormChange={onFormChange} errors={errorData} />,
    },
    {
      name: "Rewards",
      icon: <BsFillGiftFill />,
      form: <RewardsForm formData={formData} onFormChange={onFormChange} />
    },
    {
      name: "Preview",
      icon: <BsFillCheckCircleFill />,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.switcher}>
        <TabSwitcher
          tabs={tabs}
          selectedTab={selectedTab}
          onChangeTab={onChangeTab}
        />
      </div>
      <div className={styles.form}>{tabs[selectedTab].form}</div>
      <div className={styles.buttons}>
        {selectedTab > 0 && (
          <Button width="100px" onClick={() => onChangeTab(selectedTab - 1)}>
            Back
          </Button>
        )}
        {selectedTab < tabs.length - 1 && (
          <Button
            float="right"
            width="100px"
            onClick={() => onChangeTab(selectedTab + 1)}
          >
            Next
          </Button>
        )}
        {selectedTab === tabs.length - 1 && (
          <Button float="right" width="100px" onClick={() => submitProject()}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
