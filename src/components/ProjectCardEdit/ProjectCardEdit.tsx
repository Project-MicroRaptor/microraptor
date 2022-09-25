import ProjectCard from "../ProjectCard/ProjectCard";
import { ProjectProps } from "../../types/projectCardProps";
import { Button } from "@chakra-ui/react";

import styles from "./ProjectCardEdit.module.scss";

export default function ProjectCardEdit(props: ProjectProps) {
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
      <Button className={styles.button} disabled>
        Edit
      </Button>
    </div>
  );
}
