import { useSession } from "next-auth/react";
import {
  Avatar,
  Textarea,
  Box,
  Center,
  Button,
  useToast,
  UseToastOptions
} from "@chakra-ui/react";
import { BsUpload } from "react-icons/bs";
import { useEffect } from "react";

import { updateProfileSetting, getProfileSetting } from "../../db/dbUtils";

import styles from "./SettingsTabs.module.scss";

export interface ProjectInfo {
  bio: string;
  setBio: (bio: string) => void;
  isBioChange: boolean;
  setBioChange: (changed: boolean) => void;
}

export default function ProfileSettings(props: ProjectInfo) {
  const { data: session } = useSession();
  const { bio, setBio, isBioChange, setBioChange } = props;
  const toast = useToast();

  useEffect(() => {
    (async () => {
      if (bio) return;

      const response = await getProfileSetting();

      if (response?.data?.bio) {
        setBio(response.data.bio);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!session) {
    return null;
  }

  const onChangeBio = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event?.target?.value);
    setBioChange(true);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await updateProfileSetting({ bio: props.bio });
    let toastInfo: UseToastOptions;

    if (response?.status === "success") {
      toastInfo = {
        title: "Profile Setting",
        description: response.description,
        status: "success",
        duration: 4000,
        isClosable: true
      };
    } else {
      toastInfo = {
        title: "Profile Setting",
        description: response.description,
        status: "error",
        duration: 4000,
        isClosable: true
      };
    }

    setBioChange(false);

    toast(toastInfo);
  };

  return (
    <div className={styles.containerTitle}>
      <h1 className={styles.accountTitle}>Profile</h1>
      <hr className={styles.accountDivider} />
      <p className={styles.accountFields}>Profile Picture</p>
      <Box className={styles.profileBox}>
        <Center alignContent="center" justifyContent="center">
          <Avatar size="2xl" src={session.user?.image ?? ""} />
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
        placeholder="Tell us about yourself...."
        size="md"
        height="150px"
        value={props.bio}
        onChange={onChangeBio}
      />
      {isBioChange && (
        <div className={styles.saveBox}>
          <Button className={styles.saveButton} onClick={handleSubmit}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
