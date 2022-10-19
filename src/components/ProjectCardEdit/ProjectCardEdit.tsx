import ProjectCard from "../ProjectCard/ProjectCard";
import { ProjectProps } from "../../types/projectCardProps";
import { Button, Link } from "@chakra-ui/react";

import styles from "./ProjectCardEdit.module.scss";

export default function ProjectCardEdit(props: ProjectProps) {
  return (
    <div className={styles.container}>
      <ProjectCard
        id={props.id}
        name={props.name}
        active={props.active}
        shortDescription={props.shortDescription}
        image={props.image}
        currentFunding={props.currentFunding}
        targetFunding={props.targetFunding}
      />
      <Link href={`/project/${props.id}/edit`} className={styles.editLink}>
        <Button className={styles.button}>Edit</Button>
      </Link>
    </div>
  );
}
