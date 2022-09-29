import { useSession, signOut } from "next-auth/react";
import {
  AiFillSetting,
  AiOutlineLogout,
  AiOutlineProject,
} from "react-icons/ai";
import { MenuList, Avatar } from "@chakra-ui/react";
import styles from "./ProfileDropdown.module.scss";
import Link from "next/link";

export default function ProfileDropdown() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <MenuList
      className={styles.menuList}
      borderTopRadius="0"
      borderBottomLeftRadius="10"
      borderBottomEndRadius="0"
      color="black"
      borderColor="grey"
    >
      <Avatar
        className={styles.sessionImage}
        src={session.user?.image ?? ""}
        size="md"
        border="2px solid grey"
      />
      <span className={styles.sessionName}>{session.user?.name}</span>
      <Link href={`/profile/${session.user.id}`}>
        <span className={styles.viewProfile}>View Profile</span>
      </Link>
      <div className={styles.divider}>
        <div className={styles.item}>
          <span className={styles.icon}>
            <AiFillSetting />
          </span>
          <span className={styles.dropdownItem}>Settings</span>
        </div>
        <Link href="/my-projects">
          <div className={styles.item}>
            <span className={styles.icon}>
              <AiOutlineProject />
            </span>
            <span className={styles.dropdownItem}>Your Projects</span>
          </div>
        </Link>
        <div
          className={styles.item}
          onClick={() =>
            signOut({
              callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
                }/api/auth/logout`,
            })
          }
        >
          <span className={styles.icon}>
            <AiOutlineLogout />
          </span>
          <a className={styles.dropdownItem}>Sign out</a>
        </div>
      </div>
    </MenuList>
  );
}
