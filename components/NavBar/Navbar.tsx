import styles from "./NavBar.module.scss";
import { Flex, Box, Spacer } from "@chakra-ui/react";

export default function NavBar() {
  return (
    <div className={styles.navcontainer}>
      <div className={styles.nav}>
        <Flex minWidth="max-content" alignItems="center" justifyContent="start">
          <Box p="4" className={styles.left}>
            <a href="#">Create Project</a>
          </Box>
          <Box p="4" className={styles.leftsmall}>
            <a href="#">Create</a>
          </Box>
          <Spacer />
          <Box className={styles.center} justifyContent="center">
            <a href="#">MICRORAPTOR</a>
          </Box>
          <Spacer />
          <Box className={styles.right} justifyContent="end">
            <a href="#">Sign in / Sign up</a>
          </Box>
          <Box className={styles.rightsmall} justifyContent="end">
            <a href="#">Sign in</a>
          </Box>
        </Flex>
      </div>
    </div>
  );
}
