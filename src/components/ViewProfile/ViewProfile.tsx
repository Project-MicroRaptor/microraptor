import styles from "./ViewProfile.module.scss";
import { Heading, Avatar } from "@chakra-ui/react";
import type { Profile } from "../../types/profile";
import ProjectsSlider from "../ProjectsSlider/ProjectsSlider";

export default function ViewProfile(props: Profile) {
  const name = props?.name ?? "";
  const bio = props?.bio ?? "";

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.profileName}>
          <Heading size="lg"> {name}&apos;s Profile </Heading>
        </div>
        <div className={styles.profileImage}>
          <Avatar src={props?.image ?? ""} size="2xl" border="2px solid grey" />
        </div>
        {props?.bio && (
          <div className={styles.profileBio}>
            <h2>Bio:</h2>
            <p>{bio}</p>
          </div>
        )}
      </div>
      <div className={styles.profileProjects}>
        <h3>My Projects</h3>
        {props.projects && props.projects.length > 0 ? (
          <ProjectsSlider projects={props.projects} />
        ) : (
          <h4>User has no projects</h4>
        )}
      </div>
    </>
  );
}
