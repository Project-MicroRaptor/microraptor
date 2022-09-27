import { useSession } from "next-auth/react";
import styles from "./SettingsTabs.module.scss";
import { Image, Textarea, Box, Center, Button, useToast, UseToastOptions } from "@chakra-ui/react";
import { BsUpload } from "react-icons/bs";
import { useState } from "react";
import { updateProfileSetting } from "../../db/dbUtils";

export default function ProfileSettings() {
  const { data: session } = useSession();
  const [bio, setBio] = useState("");
  const toast = useToast()

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await updateProfileSetting({ bio });
    let toastInfo: UseToastOptions;

    if (response && response.status === "success") {
      toastInfo = {
        title: 'Profile Setting',
        description: response.description,
        status: 'success',
        duration: 4000,
        isClosable: true,
      }
    } else {
      toastInfo = {
        title: 'Profile Setting',
        description: response.description,
        status: 'error',
        duration: 4000,
        isClosable: true,
      }
    }

    toast(toastInfo);
  }

  if (!session) {
    return null;
  }

  return (
    <div className={styles.containerTitle}>
      <h1 className={styles.accountTitle}>Profile</h1>
      <hr className={styles.accountDivider} />
      <p className={styles.accountFields}>Profile Picture</p>
      <Box className={styles.profileBox}>
        <Center alignContent="center" justifyContent="center">
          <Image
            borderRadius="full"
            boxSize="150px"
            src={session.user?.image ?? ""}
            alt=""
          />
        </Center>
      </Box>
      <Box className={styles.profileBox}>
        <Center>
          <Button
            className={styles.uploadButton}
            width="100px"
            justifyContent="center"
            leftIcon={<BsUpload />}
          >
            Upload
          </Button>
        </Center>
        <Center>
          <p>Upload an image at least 600x240</p>
        </Center>
        <Center>
          <p>(PNG or JPG under 10MB)</p>
        </Center>
      </Box>
      <p className={styles.accountFields}>BIO</p>
      <Textarea
        textAlign="center"
        placeholder="Tell us about yourself...."
        onChange={({ target }) => setBio(target?.value)}
        size="md"
        height="150px"
      />
      <div className={styles.saveBox}>
        <Button className={styles.saveButton} onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}
