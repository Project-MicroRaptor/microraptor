import TabSwitcher from "../TabSwitcher/TabSwitcher";
import { BsFillPlusSquareFill, BsFillPencilFill, BsFillImageFill, BsFillGiftFill, BsFillCheckCircleFill } from "react-icons/bs";
import { useState } from "react";

import styles from "./ProjectForm.module.scss";
import { Button } from "@chakra-ui/react";

export default function ProjectForm() {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    {
      name: 'My Project',
      icon: <BsFillPlusSquareFill />
    }, 
    {
      name: 'Details',
      icon: <BsFillPencilFill />,
    },
    {
      name: 'Photos',
      icon: <BsFillImageFill />,
    },
    {
      name: 'Rewards',
      icon: <BsFillGiftFill />
    },
    {
      name: 'Preview',
      icon: <BsFillCheckCircleFill />
    },
  ];

  const onChangeTab = (tab: number) => {
    setSelectedTab(tab);
  }

  return (
    <div className={styles.container}>
      <div className={styles.switcher}>
        <TabSwitcher
          tabs={tabs}
          selectedTab={selectedTab}
          onChangeTab={onChangeTab}
        />
      </div>
      <div className={styles.buttons}>
        {selectedTab > 0 && (
          <Button width="100px" onClick={() => onChangeTab(selectedTab - 1)}>Back</Button>
        )}
        {selectedTab < tabs.length - 1 && (
          <Button float="right" width="100px" onClick={() => onChangeTab(selectedTab + 1)}>Next</Button>
        )}
        {selectedTab === tabs.length - 1 && (
          <Button float="right" width="100px" disabled>Submit</Button>
        )}
      </div>
    </div>
  )
}
