import styles from "./NavBar.module.scss";
import { Flex, Box, Spacer } from "@chakra-ui/react";
import useWindowResize from "./../../hooks/useWindowResize";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { BsFillInboxFill } from "react-icons/bs";
import { Avatar } from '@chakra-ui/react'

export default function NavBar() {
    const { data: session } = useSession();
    const { width } = useWindowResize();

    let createText = "Create Project";
    let signInText = "Sign in / Sign up";

    if (width && width < 673) {
        createText = "Create";
        signInText = "Sign in";
    }

    if (session) {
        return (
            <div className={styles.navcontainer}>
                <div className={styles.nav}>
                    <Flex minWidth="max-content" alignItems="center" justifyContent="start">
                        <Box p="4" className={styles.side}>
                            <Link href="/create-project">
                                <a>{createText}</a>
                            </Link>
                        </Box>
                        <Spacer />
                        <Box className={styles.center} justifyContent="center">
                            <Link href="/">
                                <a>MICRORAPTOR</a>
                            </Link>
                        </Box>
                        <Spacer />
                        <Box className={styles.inbox} justifyContent="end">
                            <a href="#"><BsFillInboxFill fontSize="30px" /></a>
                        </Box>
                        <Box className={styles.profile} justifyContent="end">
                            <a href="#"><Avatar src='https://bit.ly/broken-link' size="sm" /></a>
                        </Box>
                    </Flex>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.navcontainer}>
            <div className={styles.nav}>
                <Flex minWidth="max-content" alignItems="center" justifyContent="start">
                    <Box p="4" className={styles.side}>
                        <Link href="/create-project">
                            <a>{createText}</a>
                        </Link>
                    </Box>
                    <Spacer />
                    <Box className={styles.center} justifyContent="center">
                        <Link href="/">
                            <a>MICRORAPTOR</a>
                        </Link>
                    </Box>
                    <Spacer />
                    <Box className={styles.side} justifyContent="end">
                        <a href="#">{signInText}</a>
                    </Box>
                </Flex>
            </div>
        </div>
    );
}
