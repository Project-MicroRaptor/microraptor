import {
  BsFillPlusSquareFill,
  BsFillPencilFill,
  BsFillImageFill,
  BsFillGiftFill,
  BsFillCheckCircleFill
} from "react-icons/bs";
import Router from "next/router";
import { useState } from "react";
import { Button } from "@chakra-ui/react";

import TabSwitcher from "../TabSwitcher/TabSwitcher";
import MyProjectForm from "../FormSections/MyProjectForm";
import DetailsForm from "../FormSections/DetailsForm";
import PhotosForm from "../FormSections/PhotosForm";
import RewardsForm from "../FormSections/RewardsForm";
import PreviewForm from "../FormSections/PreviewForm";
import { createProject, updateProject } from "../../../db/dbUtils";
import {
  validateMyProjectForm,
  validatePhotosForm,
  validateRewardsForm
} from "../../../utils/formValidation";

import styles from "./ProjectForm.module.scss";
import type { FormErrors } from "../../../utils/formValidation";
import type { CreateFormData } from "../../../types/createForm";
import { formDataToProjectInfo } from "../../../utils/project";

type Props = {
  projectId?: string;
  initialFormData?: CreateFormData;
  editMode?: boolean;
};

export default function ProjectForm(props: Props) {
  const { projectId, initialFormData = {}, editMode = false } = props;

  const [selectedTab, setSelectedTab] = useState(0);
  const [formData, setFormData] = useState<CreateFormData>(initialFormData);
  const [errorData, setErrorData] = useState<FormErrors>({});
  const [sendingData, setSendingData] = useState<boolean>(false);

  const onChangeTab = (tab: number) => {
    setSelectedTab(tab);
  };

  const onFormChange = (
    id: string,
    value: any,
    updateErrorData: boolean = true
  ) => {
    setFormData({
      ...formData,
      [id]: value
    });

    if (updateErrorData) {
      setErrorData({
        ...errorData,
        [id]: false
      });
    }
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
        ...myProjectValidation.errors
      };
    }

    // Photos Form Validation
    const photosValidation = validatePhotosForm(formData);
    if (page === null && photosValidation.page !== null) {
      page = photosValidation.page;
    }
    if (photosValidation.errors) {
      errors = {
        ...errors,
        ...photosValidation.errors
      };
    }

    const rewardsValidation = validateRewardsForm(formData);
    if (page === null && rewardsValidation.page !== null) {
      page = rewardsValidation.page;
    }
    if (rewardsValidation.errors) {
      errors = {
        ...errors,
        ...rewardsValidation.errors
      };
    }

    return {
      page,
      errors
    };
  };

  const submitProject = async () => {
    setSendingData(true);
    const { page, errors } = validateForm();

    if (page !== null && errors) {
      onChangeTab(page);
      setErrorData(errors);
      setSendingData(false);
      return;
    }

    if (!formData || Object.keys(formData).length == 0) {
      setSendingData(false);
      return;
    }

    const { projectDetails, rewardDetails } = formDataToProjectInfo(formData);

    let response;
    if (editMode && projectId) {
      response = await updateProject(projectId, projectDetails);
    } else {
      response = await createProject(projectDetails, rewardDetails);
    }

    setSendingData(false);

    if (response?.project?.id) {
      Router.push(`/project/${response.project.id}`);
    }
  };

  const tabs = [
    {
      name: "My Project",
      icon: <BsFillPlusSquareFill />,
      form: (
        <MyProjectForm
          formData={formData}
          onFormChange={onFormChange}
          errors={errorData}
          editMode={editMode}
        />
      )
    },
    {
      name: "Details",
      icon: <BsFillPencilFill />,
      form: <DetailsForm formData={formData} onFormChange={onFormChange} />
    },
    {
      name: "Photos",
      icon: <BsFillImageFill />,
      form: (
        <PhotosForm
          formData={formData}
          onFormChange={onFormChange}
          errors={errorData}
        />
      )
    },
    {
      name: "Rewards",
      icon: <BsFillGiftFill />,
      form: (
        <RewardsForm
          formData={formData}
          onFormChange={onFormChange}
          errors={errorData}
          editMode={editMode}
        />
      )
    },
    {
      name: "Preview",
      icon: <BsFillCheckCircleFill />,
      form: <PreviewForm formData={formData} />,
      fullWidth: true
    }
  ];

  return (
    <>
      <div className={styles.center}>
        <div className={styles.switcher}>
          <TabSwitcher
            tabs={tabs}
            selectedTab={selectedTab}
            onChangeTab={onChangeTab}
          />
        </div>
      </div>
      <div className={tabs[selectedTab]?.fullWidth ? `` : `${styles.center}`}>
        <div className={styles.form}>{tabs[selectedTab].form}</div>
      </div>
      <div className={styles.center}>
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
            <Button
              float="right"
              width="100px"
              onClick={() => {
                submitProject();
              }}
              isLoading={sendingData}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
