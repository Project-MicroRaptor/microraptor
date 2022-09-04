import styles from './ViewProfile.module.scss'
import { Heading, Avatar } from '@chakra-ui/react';


export interface Profile {
    name?: string;
    bio?: string;
    age?: number;
    location?: string;
    image?: string;
};

//TODO: Profile Cards for Active and Backed Projects
export default function ViewProfile(props: Profile) {
    const name = props?.name ?? "";
    const bio = props?.bio ?? "";
    const age = props?.age ?? "";
    const location = props?.location ?? "";


    return (
        <div className={styles.profileContainer}>
            <Avatar className={styles.profileImage} src={props?.image ?? ""} size="2xl" border="2px solid grey" />
            <div className={styles.profileName}>
                <Heading size="lg"> {name}&apos;s Profile </Heading>
            </div>
            <br />
            <br />
            <div className={styles.profileAge}>
                <h1> Age:  </h1>
                <p> {age} </p>
            </div>
            <div className={styles.profileLocation}>
                <h2> Location: </h2>
                <p> {location} </p>
            </div>
            <div className={styles.profileBio}>
                <h3> Bio:  </h3>
                <br />
                <br />
                <p> {bio}  </p>
            </div>
        </div>
    )
};
