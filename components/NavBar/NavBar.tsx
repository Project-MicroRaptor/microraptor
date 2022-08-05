import styles from "./NavBar.module.scss";
import { Flex, Box, Spacer } from "@chakra-ui/react";
import useWindowResize from './../../pages/hooks/useWindowResize';

export default function NavBar() {
    const { width } = useWindowResize();

    let createText = "Create Project";
    let signInText = "Sign in / Sign up";

    if (width && width < 673) {
        createText = "Create";
        signInText = "Sign in";
    }

    return (
        <div className={styles.navcontainer}>
            <div className={styles.nav}>
                <Flex minWidth="max-content" alignItems="center" justifyContent="start">
                    <Box p="4" className={styles.left}>
                        <a href="#">{createText}</a>
                    </Box>
                    <Spacer />
                    <Box className={styles.center} justifyContent="center">
                        <a href="#">MICRORAPTOR</a>
                    </Box>
                    <Spacer />
                    <Box className={styles.right} justifyContent="end">
                        <a href="#">{signInText}</a>
                    </Box>
                </Flex>
            </div>
        </div>
    );
}
