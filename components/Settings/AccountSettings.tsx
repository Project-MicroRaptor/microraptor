import styles from "./SettingsTabs.module.scss";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  HStack,
  Center,
} from "@chakra-ui/react";

export default function AccountSettings() {
  return (
    <div className={styles.containertitle}>
      <h1 className={styles.accounttitle}>Account Settings</h1>
      <hr className={styles.accountdivider} />

      <div className={styles.formbox}>
        <FormControl>
          <Box className={styles.accountbox}>
            <HStack spacing="24px">
              <FormLabel className={styles.formlabel}>Name</FormLabel>
              <Input
                className={styles.forminput}
                placeholder="name"
                size="md"
                borderColor="#ffffff"
                textAlign="center"
              />
              <Button
                className={styles.formbutton}
                width="20%"
                color="#17a2b8"
                background="#ffffff"
                variant="ghost"
              >
                Edit
              </Button>
            </HStack>
          </Box>
          <hr />
          <Box className={styles.accountbox}>
            <HStack spacing="24px">
              <FormLabel className={styles.formlabel}>Email</FormLabel>
              <Input
                className={styles.forminput}
                placeholder="email"
                size="md"
                borderColor="#ffffff"
                textAlign="center"
              />
              <Button
                className={styles.formbutton}
                width="20%"
                color="#17a2b8"
                background="#ffffff"
                variant="ghost"
              >
                Edit
              </Button>
            </HStack>
          </Box>
          <hr />
          <Box className={styles.accountbox}>
            <HStack spacing="24px">
              <FormLabel className={styles.formlabel}>
                Change Password
              </FormLabel>
              <Input
                className={styles.forminput}
                placeholder="password"
                size="md"
                borderColor="#ffffff"
                textAlign="center"
              />
              <Button
                className={styles.formbutton}
                width="20%"
                color="#17a2b8"
                background="#ffffff"
                variant="ghost"
              >
                Edit
              </Button>
            </HStack>
          </Box>
          <hr />
          <Box className={styles.accountbox}>
            <HStack spacing="24px">
              <FormLabel className={styles.formlabel}>Address</FormLabel>
              <Input
                className={styles.forminput}
                placeholder="address"
                size="md"
                borderColor="#ffffff"
                textAlign="center"
              />
              <Button
                className={styles.formbutton}
                width="20%"
                color="#17a2b8"
                background="#ffffff"
                variant="ghost"
              >
                Edit
              </Button>
            </HStack>
          </Box>
          <hr className={styles.notificationdivider} />
          <div className={styles.savebox}>
            <Center>
            <Button>Save Changes</Button>
            </Center>
          </div>
        </FormControl>
      </div>
    </div>
  );
}
