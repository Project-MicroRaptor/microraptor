import styles from "./ProjectCard.module.scss";
import { Badge, Progress } from "@chakra-ui/react";
import { ProjectProps } from "../../types/projectCardProps";

export default function ProjectCard(props: ProjectProps) {
  return (
    <a href={`/project/${props.id}`} className={styles.projectContainer}>
      <div className={styles.imageContainer}>
        {props?.image && <img src={props?.image} alt={props.name} />}
      </div>

      <div className={styles.infoContainer}>
        <h2>
          <span className={styles.heading}>{props.name}</span>
          {!props.active && (
            <Badge
              className={styles.inactiveBanner}
              colorScheme="red"
              variant="solid"
              fontSize="md"
            >
              Inactive
            </Badge>
          )}
        </h2>
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
    </a>
  );
}
