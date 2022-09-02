import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { ProjectProps } from "../../types/projectCardProps";
import { Button } from "@chakra-ui/react";

import styles from "./ProjectCardwButton.module.scss";

export default function ProjectCardwButton(props: ProjectProps) {
  return (
    <div className={styles.container}>
      <ProjectCard
        id={props.id}
        name={props.name}
        shortDescription={props.shortDescription}
        image={props.image}
        currentFunding={props.currentFunding}
        targetFunding={props.targetFunding}
      />
      <Button className={styles.button} disabled>Edit</Button>
    </div>
  );
}
