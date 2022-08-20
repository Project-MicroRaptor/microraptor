import TabSwitcher from "../TabSwitcher/TabSwitcher";
import {
  BsFillPlusSquareFill,
  BsFillPencilFill,
  BsFillImageFill,
  BsFillGiftFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { useState } from "react";
import MyProjectForm from "../FormSections/MyProjectForm";
import { Button } from "@chakra-ui/react";

import styles from "./ProjectForm.module.scss";
import DetailsForm from "../FormSections/DetailsForm";

export default function ProjectForm() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [formData, setFormData] = useState({});

  const onChangeTab = (tab: number) => {
    setSelectedTab(tab);
  };

  const onFormChange = (id: string, value: any) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const tabs = [
    {
      name: "My Project",
      icon: <BsFillPlusSquareFill />,
      form: <MyProjectForm formData={formData} onFormChange={onFormChange} />,
    },
    {
      name: "Details",
      icon: <BsFillPencilFill />,
      form: <DetailsForm formData={formData} onFormChange={onFormChange} />
    },
    {
      name: "Photos",
      icon: <BsFillImageFill />,
    },
    {
      name: "Rewards",
      icon: <BsFillGiftFill />,
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
          <Button float="right" width="100px" disabled>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
