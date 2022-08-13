import styles from "./ProjectCard.module.scss";
import { Progress } from "@chakra-ui/react";

export interface ProjectProps {
  name: string
  shortDescription: string
  image?: string
  currentFunding: number
  targetFunding: number
}

export default function ProjectCard(props: ProjectProps) {
  // No image provided, default image. 
  // Stretch goal, check if URL returns an image. 
  let imageElement
  let imageSrc = props.image
  if (imageSrc == null) {
    imageElement = <></>
  } else {
    imageElement = <img
      src={imageSrc}
      alt={props.name}
    />
  }

  return (
    // TODO: href direct to project page.
    <a className={styles.projectContainer}>
      <div className={styles.imageContainer}>
        {imageElement}
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
          <p>${props.currentFunding} of ${props.targetFunding} already raised!</p>
      </div>
    </a>
  );
}
