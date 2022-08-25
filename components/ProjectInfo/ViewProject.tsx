import styles from './ViewProject.module.scss';
import { Center, Progress, Grid, GridItem } from '@chakra-ui/react';
import { AiOutlineTag } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { Button } from "@chakra-ui/react";
import NavBar from './../NavBar/NavBar';
import { ProjectCategories } from "../../types/categories";
import type { ProjectCategory } from "../../types/categories";

export interface ProjectInfo {
  name?: string;
  shortDescription?: string;
  images?: string[];
  currentFunding?: number;
  targetFunding?: number;
  postcode?: number;
  categories?: string[];
  createdAt?: number;
  completedAt?: number;
  aboutBusiness?: string;
  aboutOwner?: string;
  businessPlan?: string;
  rewards?: string[];
}

export default function ViewProject(props: ProjectInfo) {
  const name = props?.name ?? "Missing";
  const postcode = props?.postcode ?? "None";
  const targetFunding = props?.targetFunding ?? 0;
  const currentFunding = props?.currentFunding ?? 0;
  const completedAt = props?.completedAt ?? new Date().toISOString();

  const daysRemaining = () => {
    const currentDate = new Date();
    const completedDate = new Date(completedAt);
    const difference = completedDate.getTime() - currentDate.getTime();
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));

    if (totalDays < 0) {
      return 0;
    }
    return totalDays;
  }

  const categories: string[] = [];

  props.categories?.forEach((category) => {
    if (ProjectCategories[category as keyof ProjectCategory]) {
      categories.push(ProjectCategories[category as keyof ProjectCategory])
    } else {
      categories.push(category);
    }
  });

  if (categories.length == 0) {
    categories.push("None");
  }

  return (
    <div className={styles.projectContainer}>
      <span className={styles.name}>
        <Center>{name}</Center>
      </span>

      <Grid>
        <GridItem className={styles.gridLeft}>
          <div className={styles.projectImage}>
            <img src={props?.images?.length ? props?.images[0] : "/default.png"} alt={props.name} />
          </div>
          <div className={styles.categoriesItem}>
            <AiOutlineTag className={styles.categoriesIcon} />
            <span className={styles.content}>{categories.join(", ")}</span>
            <HiLocationMarker className={styles.locationIcon} />
            <span className={styles.content}>{postcode}</span>
          </div>
        </GridItem>

        <GridItem className={styles.gridRight}>
          <div className={styles.progressContainer}>
            <Progress
              value={(currentFunding / targetFunding) * 100}
              size="sm"
              borderStartRadius={30}
              borderEndRadius={30}
              className={styles.progressBar}
            />
            <span className={styles.fundingText}>
              <p>
                <span className={styles.current}> ${currentFunding?.toLocaleString()}</span> pledged of ${targetFunding?.toLocaleString()} goal
              </p>
            </span>
            <span className={styles.backersAmount}>
              <p>0 backer</p>
            </span>
            <span className={styles.daysAmount}>
              <p>{daysRemaining()} days to go</p>
            </span>
          </div>
        </GridItem>
      </Grid >

      <Grid>
        <GridItem className={styles.buttons}>
          <Button width="250px" borderRadius={4} fontSize={16} disabled>Share</Button>
          <Button width="250px" borderRadius={4} fontSize={16} disabled>Fund this Project</Button>
          <Button width="250px" borderRadius={4} fontSize={16} disabled>Enquire about Project</Button>
        </GridItem>
      </Grid>
    </div>
  )
};
