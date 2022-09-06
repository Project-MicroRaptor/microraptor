import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import styles from "./SettingsTabs.module.scss";

export default function AccountSettings() {
  return (
    <div className={styles.containerTitle}>
      <h1 className={styles.accountTitle}>Account Settings</h1>
      <hr className={styles.accountDivider} />
      <div className={styles.formBox}>
        <div className={styles.formInputBox}>
          <FormControl>
            <div className={styles.accBox}>
              <FormLabel className={styles.inputLabel}>Name</FormLabel>
              <Input
                className={styles.inputBox}
                type="text"
                placeholder="Name"
                variant="settings"
              />
              <Button className={styles.inputButton} variant="settings">
                Edit
              </Button>
            </div>
            <hr />
            <div className={styles.accBox}>
              <FormLabel className={styles.inputLabel}>Email</FormLabel>
              <Input
                className={styles.inputBox}
                type="text"
                placeholder="Email"
                variant="settings"
              />
              <Button className={styles.inputButton} variant="settings">
                Edit
              </Button>
            </div>
            <hr />
            <div className={styles.accBox}>
              <FormLabel className={styles.inputLabel}>
                Change Password
              </FormLabel>
              <Input
                className={styles.inputBox}
                type="text"
                placeholder="********"
                variant="settings"
              />
              <Button className={styles.inputButton} variant="settings">
                Edit
              </Button>
            </div>
            <hr />
            <div className={styles.accBox}>
              <FormLabel className={styles.inputLabel}>Address</FormLabel>
              <Input
                className={styles.inputBox}
                type="text"
                placeholder="Address"
                variant="settings"
              />
              <Button className={styles.inputButton} variant="settings">
                Edit
              </Button>
            </div>
            <div className={styles.saveBox}>
              <Button className={styles.saveButton}>Save</Button>
            </div>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
