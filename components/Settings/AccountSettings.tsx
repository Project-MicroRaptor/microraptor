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
        <div className={styles.forminputbox}>
          <form>
            <div className={styles.accbox}>
              <label className={styles.inputlabel}>Name</label>
              <input
                className={styles.inputbox}
                type="text"
                placeholder="name"
              ></input>
              <button className={styles.inputbutton}>Edit</button>
            </div>
            <hr />
            <div className={styles.accbox}>
              <label className={styles.inputlabel}>Email</label>
              <input
                className={styles.inputbox}
                type="text"
                placeholder="email"
              ></input>
              <button className={styles.inputbutton}>Edit</button>
            </div>
            <hr />
            <div className={styles.accbox}>
              <label className={styles.inputlabel}>Change Password</label>
              <input
                className={styles.inputbox}
                type="text"
                placeholder="********"
              ></input>
              <button className={styles.inputbutton}>Edit</button>
            </div>
            <hr />
            <div className={styles.accbox}>
              <label className={styles.inputlabel}>Address</label>
              <input
                className={styles.inputbox}
                type="text"
                placeholder="address"
              ></input>
              <button className={styles.inputbutton}>Edit</button>
            </div>
            <div className={styles.savebox}>
              <button className={styles.savebutton}>Save</button>
            </div>
          </form>
        </div>
        {/* <FormControl>
          <Box className={styles.accountbox}>
            <HStack spacing="24px">
              <FormLabel className={styles.formlabel}>Name</FormLabel>
              <Input
                className={styles.forminput}
                placeholder="name"
                size="md"
                // borderColor="#ffffff"
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
        </FormControl> */}
      </div>
    </div>
  );
}
