import styles from "./SettingsMenu.module.scss";
import { HiCog } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Button } from "@chakra-ui/react";

export enum Pages {
  AccountSettings,
  ProfileSettings,
  NotificationSettings,
}

export interface SettingsTabProps {
  onPageClick: (pageName: Pages) => void;
}

export default function SettingsTab(props: SettingsTabProps) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Settings</div>
      <div className={styles.flexContainer}>
        <div className={styles.btn}>
          <Button
            variant="settingsMenu"
            width="200px"
            justifyContent="left"
            onClick={() => props.onPageClick(Pages.AccountSettings)}
          >
            <i className={styles.icn}>
              <HiCog />
            </i>{" "}
            Account
          </Button>
        </div>
        <div className={styles.btn}>
          <Button
            variant="settingsMenu"
            width="200px"
            justifyContent="left"
            onClick={() => props.onPageClick(Pages.ProfileSettings)}
          >
            <i className={styles.icn}>
              <CgProfile />
            </i>{" "}
            Profile
          </Button>
        </div>
        <div className={styles.btn}>
          <Button
            variant="settingsMenu"
            width="200px"
            justifyContent="left"
            onClick={() => props.onPageClick(Pages.NotificationSettings)}
          >
            <i className={styles.icn}>
              <IoIosNotificationsOutline />
            </i>{" "}
            Notifications
          </Button>
        </div>
      </div>
    </div>
  );
}
