import styles from "./ProjectCard.module.scss";
import { Progress } from "@chakra-ui/react";

export interface ProjectProps {
  name: string
  shortDescription: string
  image?: string
  currentFunding: number
  targetFunding: number
}

export default function ProjectCard(props:ProjectProps) {
  // No image provided, default image. 
  // Stretch goal, check if URL returns an image. 
  let imageSrc = props.image
  if (imageSrc == null) {
    imageSrc = "./17A2B8.png"
  }

  return (
    // TODO: href direct to project page.
    <a className={styles.projectContainer} href="#">
      <img src={imageSrc} alt="No image available."/>

      <div className={styles.infoContainer}>
      <h2>{props.name}</h2>
      <p>{props.shortDescription}</p>
      <Progress value={(props.currentFunding / props.targetFunding) * 100} 
      size="sm" 
      borderStartRadius={30} 
      borderEndRadius={30}
      />
      <p className={styles.fundingText}>${props.currentFunding} of ${props.targetFunding} already raised!</p>
      </div>
    </a>
  );
}