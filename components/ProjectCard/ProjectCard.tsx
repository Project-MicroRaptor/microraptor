import { Progress } from "@chakra-ui/react";

import styles from "./ProjectCard.module.scss";

export interface ProjectProps {
  id: string;
  name: string;
  shortDescription: string;
  image?: string;
  currentFunding: number;
  targetFunding: number;
}

export default function ProjectCard(props: ProjectProps) {
  return (
    <a href={`project/${props.id}`} className={styles.projectContainer} >
      <div className={styles.imageContainer}>
        {props?.image && <img src={props?.image} alt={props.name} />}
      </div>

      <div className={styles.infoContainer}>
        <h2>{props.name}</h2>
        <p>{props.shortDescription}</p>
      </div>

      <div className={styles.progressContainer}>
        <Progress
          value={(props.currentFunding / props.targetFunding) * 100}
          size="sm"
          borderStartRadius={30}
          borderEndRadius={30}
        />
        <p>
          ${props.currentFunding.toLocaleString()} of $
          {props.targetFunding.toLocaleString()} already raised!
        </p>
      </div>
    </a >
  );
}
