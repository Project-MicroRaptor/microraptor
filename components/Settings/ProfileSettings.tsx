import styles from "./SettingsTabs.module.scss";
import { Image, Textarea, Box, Center, Button } from "@chakra-ui/react";
import { BsUpload } from "react-icons/bs";

export default function ProfileSettings() {
  return (
    <div className={styles.containertitle}>
      <h1 className={styles.accounttitle}>Profile</h1>
      <hr className={styles.accountdivider} />
      <p className={styles.accountfields}>Profile Picture</p>

      <Box className={styles.profilebox}>
        <Center alignContent="center" justifyContent="center">
          <Image
            borderRadius="full"
            boxSize="250px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
        </Center>
      </Box>
      <Box className={styles.profilebox}>
        <Center>
          <Button
            className={styles.uploadbutton}
            width="10%"
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

      <p className={styles.accountfields}>BIO</p>
      <Textarea
        textAlign="center"
        placeholder="Tell us about yourself...."
        size="md"
        // backgroundColor="LightGray"
        height="150px"
      />
    </div>
  );
}