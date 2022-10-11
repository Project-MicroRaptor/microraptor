import {
  BsFillPlusSquareFill,
  BsFillPencilFill,
  BsFillImageFill,
  BsFillGiftFill,
  BsFillCheckCircleFill
} from "react-icons/bs";
import Router from "next/router";
import { useState } from "react";
import {
  Button,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";

import TabSwitcher from "../TabSwitcher/TabSwitcher";
import MyProjectForm from "../FormSections/MyProjectForm";
import DetailsForm from "../FormSections/DetailsForm";
import PhotosForm from "../FormSections/PhotosForm";
import RewardsForm from "../FormSections/RewardsForm";
import PreviewForm from "../FormSections/PreviewForm";
import {
  createProject,
  deactivateProject,
  updateProject
} from "../../../db/dbUtils";
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
  projectName?: string;
  projectActive?: boolean;
  initialFormData?: CreateFormData;
  editMode?: boolean;
};

export default function ProjectForm(props: Props) {
  const {
    projectId,
    projectName,
    projectActive = true,
    initialFormData = {},
    editMode = false
  } = props;

  const [selectedTab, setSelectedTab] = useState(0);
  const [formData, setFormData] = useState<CreateFormData>(initialFormData);
  const [errorData, setErrorData] = useState<FormErrors>({});
  const [sendingData, setSendingData] = useState<boolean>(false);
  const [deactivateInput, setDeactivateInput] = useState<string>("");

  const {
    isOpen: isDeactivateOpen,
    onOpen: onDeactivateOpen,
    onClose: onDeactivateClose
  } = useDisclosure();

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
      {editMode && projectActive && (
        <div className={styles.deactivate}>
          <Button variant="deactivate" onClick={onDeactivateOpen}>
            Deactivate Project
          </Button>
        </div>
      )}
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
      <Modal
        isOpen={isDeactivateOpen}
        onClose={() => {
          setDeactivateInput("");
          onDeactivateClose();
        }}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deactivate Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container mb={3}>
              Are you sure you would like to deactivate this project?
              <br />
              <br />
              Doing so will remove the project from all public pages, and the
              project will no longer be able to recieve funding. Any users who
              have funded the project will not be charged.
              <br />
              <br />
              If you would like to do so, please enter the following into the
              text box below: <b>{projectName}</b>
            </Container>
            <Input
              onChange={(event) => setDeactivateInput(event.target.value)}
              value={deactivateInput}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="deactivate"
              disabled={deactivateInput !== projectName}
              onClick={() => {
                if (projectId) {
                  deactivateProject(projectId).then((res) => {
                    if ((res.status = "success")) {
                      Router.push("/");
                    }
                  });
                }
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
