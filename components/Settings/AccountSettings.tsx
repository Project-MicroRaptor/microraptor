import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import styles from "./SettingsTabs.module.scss";

export default function AccountSettings() {
  return (
    <div className={styles.containertitle}>
      <h1 className={styles.accounttitle}>Account Settings</h1>
      <hr className={styles.accountdivider} />
      <div className={styles.formbox}>
        <div className={styles.forminputbox}>
          <FormControl>
            <div className={styles.accbox}>
              <FormLabel className={styles.inputlabel}>Name</FormLabel>
              <Input
                className={styles.inputbox}
                type="text"
                placeholder="Name"
                variant="settings"
              />
              <Button className={styles.inputbutton} variant="settings">
                Edit
              </Button>
            </div>
            <hr />
            <div className={styles.accbox}>
              <FormLabel className={styles.inputlabel}>Email</FormLabel>
              <Input
                className={styles.inputbox}
                type="text"
                placeholder="Email"
                variant="settings"
              />
              <Button className={styles.inputbutton} variant="settings">
                Edit
              </Button>
            </div>
            <hr />
            <div className={styles.accbox}>
              <FormLabel className={styles.inputlabel}>
                Change Password
              </FormLabel>
              <Input
                className={styles.inputbox}
                type="text"
                placeholder="********"
                variant="settings"
              />
              <Button className={styles.inputbutton} variant="settings">
                Edit
              </Button>
            </div>
            <hr />
            <div className={styles.accbox}>
              <FormLabel className={styles.inputlabel}>Address</FormLabel>
              <Input
                className={styles.inputbox}
                type="text"
                placeholder="Address"
                variant="settings"
              />
              <Button className={styles.inputbutton} variant="settings">
                Edit
              </Button>
            </div>
            <div className={styles.savebox}>
              <Button className={styles.savebutton}>Save</Button>
            </div>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
