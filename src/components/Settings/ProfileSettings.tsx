import { useSession } from "next-auth/react";
import { Image, Textarea, Box, Center, Button, useToast, UseToastOptions } from "@chakra-ui/react";
import { BsUpload } from "react-icons/bs";
import { useState, useEffect } from "react";

import { updateProfileSetting, getProfileSetting } from "../../db/dbUtils";

import styles from "./SettingsTabs.module.scss";

export interface ProjectInfo {
  bio: string;
  onChange: (event: React.ChangeEvent) => void;
  setBio: (bio: string) => void;
}

export default function ProfileSettings(props: ProjectInfo) {
  const { data: session } = useSession();
  const [isBioChange, setBioChange] = useState(props && props.bio.length > 0);

  const toast = useToast();

  if (!session) {
    return null;
  }

  const onChangeBio = (event: React.ChangeEvent) => {
    props.onChange(event);
    setBioChange(true);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await updateProfileSetting({ bio: props.bio });
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

    setBioChange(false);

    toast(toastInfo);
  }

  useEffect(() => {
    (async () => {
      const response = await getProfileSetting();

      if (response && response.data && response.data.bio) {
        props.setBio(response.data.bio);
      }

      if (props.bio) {
        props.setBio(props.bio);
        setBioChange(true);
      };
    })();
  }, []);


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
        size="md"
        height="150px"
        value={props.bio}
        onChange={onChangeBio}
      />
      {isBioChange && (
        <div className={styles.saveBox}>
          <Button className={styles.saveButton} onClick={handleSubmit}>Save</Button>
        </div>
      )}
    </div>
  );
}
