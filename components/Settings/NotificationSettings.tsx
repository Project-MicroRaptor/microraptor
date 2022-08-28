import styles from "./SettingsTabs.module.scss";
import { Switch, Box, Flex, Spacer } from '@chakra-ui/react'

export default function NotificationSettings() {
    return (
      <div className={styles.containertitle}>
        <h1 className={styles.accounttitle}>Notification Settings</h1>
        <hr className={styles.accountdivider}/>
        <Box>
          <Box className={styles.box} >
            <Flex>
              <Box><p className={styles.accountfields}>Project Updates</p></Box>
              <Spacer />
              <Box><Switch className={styles.switch} colorScheme='teal' size='md' /></Box>
            </Flex>
            <p className={styles.accountsubfields}>Receive emails about popular projects</p>
          </Box>
          <hr/>
          <Box>
            <Flex>
                <Box><p className={styles.accountfields}>Message Enquires</p></Box>
                <Spacer />
                <Box><Switch className={styles.switch} colorScheme='teal' size='md' /></Box>
            </Flex>
            <p className={styles.accountsubfields}>Receive emails for enquiries</p>
          </Box>
        </Box>
      </div>
    );
  }