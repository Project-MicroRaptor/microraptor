import { useSession, signOut, signIn } from "next-auth/react";
import { AiFillSetting, AiOutlineLogout, AiOutlineProject } from "react-icons/ai";
import { MenuList, Avatar } from '@chakra-ui/react';
import styles from './ProfileDropdown.module.scss';

export default function ProfileDropdown() {
    const { data: session } = useSession();

    if (!session) {
        return null;
    }

    return (
        <MenuList className={styles.menuList}>
            <Avatar className={styles.sessionImage} src={session.user?.image ?? ""} size="md" />
            <span className={styles.sessionName}>{session.user?.name}</span>
            <span className={styles.viewProfile}>
                View Profile
            </span>
            <div className={styles.divider}>
                <div className={styles.item}>
                    <span className={styles.icon}><AiFillSetting /></span>
                    <span className={styles.dropdownItem}>Settings</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.icon}><AiOutlineProject /></span>
                    <span className={styles.dropdownItem}>Your Projects</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.icon}><AiOutlineLogout /></span>
                    <a className={styles.dropdownItem} onClick={() =>
                        signOut({
                            callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/auth/logout`,
                        })
                    }>Sign out</a>
                </div>
            </div>
        </MenuList>
    )
}