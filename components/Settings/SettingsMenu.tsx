import styles from "./SettingsMenu.module.scss";
import { HiCog } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";

export enum Pages {
  AccountSettings,
  ProfileSettings,
  NotificationSettings,
}

export interface SettingsTabProps {
  onPageClick: (pageName: Pages) => void;
}

export default function SettingsTab(props: any) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Settings</div>
      <div className={styles.flexcontainer}>
        <div>
          <button
            className={styles.btn}
            onClick={() => props.onPageClick(Pages.AccountSettings)}
          >
            <i className={styles.icn}>
              <HiCog />
            </i>{" "}
            Account
          </button>
        </div>
        <div>
          <button
            className={styles.btn}
            onClick={() => props.onPageClick(Pages.ProfileSettings)}
          >
            <i className={styles.icn}>
              <CgProfile />
            </i>{" "}
            Profile
          </button>
        </div>
        <div>
          <button
            className={styles.btn}
            onClick={() => props.onPageClick(Pages.NotificationSettings)}
          >
            <i className={styles.icn}>
              <IoIosNotificationsOutline />
            </i>{" "}
            Notifications
          </button>
        </div>
      </div>
    </div>
  );
}

export type Page = {
  page: "AccountSettings";
};
