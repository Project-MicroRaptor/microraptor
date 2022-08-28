import styles from "./SettingsTabs.module.scss";
import { Button, Stack, Box } from "@chakra-ui/react";
import { HiCog } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";



export enum Pages{
  AccountSettings,
  ProfileSettings,
  NotificationSettings
}


export interface SettingsTabProps {
  // onPageClick: (pageName: string) => undefined;
   onPageClick: (pageName: Pages) => void;
   
}

export default function SettingsTab(props: SettingsTabProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.buttons}>
        <Box p="4">
        <Stack direction="column" spacing={4} align="center">
          <Button
            background="#ffffff"
            width="100%"
            justifyContent="left"
            _hover={{ background: "brand.primary", color:"#ffffff"}}
            leftIcon={<HiCog />}
            color="#000000"
            onClick={() => props.onPageClick(Pages.AccountSettings)}
          >
            Account
          </Button>
          <Button
            background="#ffffff"
            width="100%"
            justifyContent="left"
            _hover={{ background: "brand.primary", color:"#ffffff" }}
            leftIcon={<CgProfile />}
            color="#000000"
            // onClick={() => props.onPageClick("ProfileSettings")}
            onClick={() => props.onPageClick(Pages.ProfileSettings)}
          >
            Profile
          </Button>
          <Button
            background="#ffffff"
            width="100%"
            justifyContent="left"
            _hover={{ background: "brand.primary", color:"#ffffff" }}
            leftIcon={<IoIosNotificationsOutline />}
            color="#000000"
            onClick={() => props.onPageClick(Pages.NotificationSettings)}
          >
            Notifications
          </Button>
        </Stack>
        </Box>
      </div>
    </div>
  );
}

export type Page = {
  page: "AccountSettings";
};
