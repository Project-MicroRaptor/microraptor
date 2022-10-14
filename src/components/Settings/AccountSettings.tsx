import { Button, FormControl, FormLabel, Input, useToast, UseToastOptions } from "@chakra-ui/react";
import styles from "./SettingsTabs.module.scss";
import { useSession } from 'next-auth/react';
import { useEffect } from "react";
import { getAccountSetting, updateAccountSetting } from "../../db/dbUtils";

export interface AccountInfo {
  name?: string;
  setName: (name: string) => void;
  isNameChange: boolean;
  setNameChange: (changed: boolean) => void;
}
export default function AccountSettings(props: AccountInfo) {
  const { data: session } = useSession();
  const { name, setName, isNameChange, setNameChange } = props;
  const toast = useToast();

  useEffect(() => {
    (async () => {
      if (name) return;

      const response = await getAccountSetting();

      if (response?.data?.name) {
        setName(response.data.name);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!session) {
    return null;
  }

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event?.target?.value);
    setNameChange(true);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await updateAccountSetting({ name: props.name });
    let toastInfo: UseToastOptions;

    if (response?.status === "success") {
      toastInfo = {
        title: "Account Setting",
        description: response.description,
        status: "success",
        duration: 4000,
        isClosable: true
      };
    } else {
      toastInfo = {
        title: "Account Setting",
        description: response.description,
        status: "error",
        duration: 4000,
        isClosable: true
      };
    }

    setNameChange(false);

    toast(toastInfo);
  };

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
                value={props.name}
                onChange={onChangeName}
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
            {isNameChange && (
              <div className={styles.saveBox}>
                <Button className={styles.saveButton} onClick={handleSubmit}>Save</Button>
              </div>
            )}
          </FormControl>
        </div>
      </div>
    </div>
  );
}
