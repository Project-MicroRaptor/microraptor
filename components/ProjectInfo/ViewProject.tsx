import styles from './ViewProject.module.scss';
import { Center } from '@chakra-ui/react';
import { Progress } from "@chakra-ui/react";

export interface ProjectInfo {
  name: string;
  shortDescription: string;
  image?: string;
  currentFunding: number;
  targetFunding: number;
}

export default function ViewProject(props: ProjectInfo) {
  return (
    <div className={styles.projectContainer}>
      <span className={styles.name}>
        <Center>{props.name}</Center>
      </span>

      <div className={styles.projectImage}>
        <img src={props?.image} alt={props.name} />
      </div>

      <div className={styles.fund}>
        <Center>
          ${props.currentFunding.toLocaleString()} of $
          {props.targetFunding.toLocaleString()} already raised!
        </Center>
      </div>

    </div>
  )
}

