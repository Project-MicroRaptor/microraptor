// import styles from "./SettingsTabs.module.scss";
import styles from "./SettingsMenu.module.scss";
import {
  Button,
  Stack,
} from "@chakra-ui/react";
import { HiCog } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
import SettingsNav from "../../components/Settings/SettingsNav"; 

export enum Pages {
  AccountSettings,
  ProfileSettings,
  NotificationSettings,
}

export interface SettingsTabProps {
  // onPageClick: (pageName: string) => undefined;
  onPageClick: (pageName: Pages) => void;
}

export default function SettingsTab(props: any) {

  return (
    
    <div className={styles.container}>
      {/* <SettingsNav onPageClick={props}/> */}
      <div className={styles.title}>Settings</div>
        
        {/* <div className={styles.buttons}> */}
          {/* <Box p="4"> */}
          
          <div className={styles.flexcontainer}>
          {/* <Stack direction="column" spacing={4} align="center"> */}
          <div>
            <button className={styles.btn} onClick={() => props.onPageClick(Pages.AccountSettings)}><i className={styles.icn}><HiCog /></i> Account</button>
            </div>
            <div>
            <button className={styles.btn} onClick={() => props.onPageClick(Pages.ProfileSettings)}><i className={styles.icn}><CgProfile /></i> Profile</button>
            </div>
            <div>
            <button className={styles.btn} onClick={() => props.onPageClick(Pages.NotificationSettings)}><i className={styles.icn}><IoIosNotificationsOutline /></i> Notifications</button>
            </div>
            
            
            {/* <Button className={styles.cbuttons}
              background="#ffffff"
              // width="200px"
              justifyContent="left"
              _hover={{ background: "brand.primary", color: "#ffffff" }}
              leftIcon={<HiCog />}
              color="#000000"
              onClick={() => props.onPageClick(Pages.AccountSettings)}
            >
              Account
            </Button>

          <div className={styles.buttons}>
            <Button
              background="#ffffff"
              // width="200px"
              justifyContent="left"
              _hover={{ background: "brand.primary", color: "#ffffff" }}
              leftIcon={<CgProfile />}
              color="#000000"
              // onClick={() => props.onPageClick("ProfileSettings")}
              onClick={() => props.onPageClick(Pages.ProfileSettings)}
            >
              Profile
            </Button>
            </div>
            <div className={styles.buttons}>
            <Button
              background="#ffffff"
              // width="200px"
              justifyContent="left"
              _hover={{ background: "brand.primary", color: "#ffffff" }}
              leftIcon={<IoIosNotificationsOutline />}
              color="#000000"
              onClick={() => props.onPageClick(Pages.NotificationSettings)}
            >
              Notifications
            </Button>
            </div> */}
          {/* </Stack> */}
          </div>
          {/* </Box> */}
        </div>
  );
}

export type Page = {
  page: "AccountSettings";
};
