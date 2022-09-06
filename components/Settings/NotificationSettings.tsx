import styles from "./SettingsTabs.module.scss";
import { Switch, Box, Flex, Spacer } from "@chakra-ui/react";

export default function NotificationSettings() {
  return (
    <div className={styles.containerTitle}>
      <h1 className={styles.accountTitle}>Notification Settings</h1>
      <hr className={styles.accountDivider} />
      <Box>
        <Box>
          <Flex>
            <Box>
              <p className={styles.accountFields}>Project Updates</p>
            </Box>
            <Spacer />
            <Box>
              <Switch className={styles.switch} colorScheme="brand" size="md" />
            </Box>
          </Flex>
          <p className={styles.accountSubFields}>
            Receive emails about popular projects
          </p>
        </Box>
        <hr />
        <Box>
          <Flex>
            <Box>
              <p className={styles.accountFields}>Message Enquires</p>
            </Box>
            <Spacer />
            <Box>
              <Switch className={styles.switch} colorScheme="brand" size="md" />
            </Box>
          </Flex>
          <p className={styles.accountSubFields}>
            Receive emails for enquiries
          </p>
        </Box>
      </Box>
    </div>
  );
}
