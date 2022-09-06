import { useSession } from "next-auth/react";
import styles from "./SettingsTabs.module.scss";
import { Image, Textarea, Box, Center, Button } from "@chakra-ui/react";
import { BsUpload } from "react-icons/bs";

export default function ProfileSettings() {
  const { data: session } = useSession();

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
            boxSize="250px"
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
      />
    </div>
  );
}
