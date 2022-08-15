import styles from "./NavBar.module.scss";
import { Flex, Box, Spacer, Menu, MenuButton } from "@chakra-ui/react";
import useWindowResize from "./../../hooks/useWindowResize";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { BsFillInboxFill } from "react-icons/bs";
import { Avatar } from '@chakra-ui/react'
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

export default function NavBar() {
  const { data: session } = useSession();
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
          {session ? (
            <>
              <Box className={styles.inbox} justifyContent="end">
                <a><BsFillInboxFill fontSize="30px" /></a>
              </Box>
              <Menu>
                <MenuButton className={styles.menu}>
                  <Box className={styles.profile} justifyContent="end">
                    <Avatar src={session.user?.image ?? ""} size="sm" />
                  </Box>
                </MenuButton>
                <ProfileDropdown />
              </Menu>
            </>
          ) : (
            <Box className={styles.side} justifyContent="end">
              <a onClick={() => signIn("auth0")}>{signInText}</a>
            </Box>
          )}
        </Flex>
      </div>
    </div>
  );
}
