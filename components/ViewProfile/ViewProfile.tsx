import styles from './ViewProfile.module.scss'
import { Heading, Avatar } from '@chakra-ui/react';

export type Profile = {
    name?: string;
    bio?: string;
    image?: string;
};

//TODO: Profile Cards for Active and Backed Projects
export default function ViewProfile(props: Profile) {
    const name = props?.name ?? "";
    const bio = props?.bio ?? "";

    //&pos; seems to be the only way to have an apostrophe without ESLint throwing an error
    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileName}>
                <Heading size="lg"> {name}&apos;s Profile </Heading>
            </div>
            <div className={styles.profileImage}>
                <Avatar src={props?.image ?? ""} size="2xl" border="2px solid grey" />
            </div>
            <div className={styles.profileBio}>
                <h2>Bio:</h2>
                <p>{bio}</p>
            </div>
        </div>
    )
};
