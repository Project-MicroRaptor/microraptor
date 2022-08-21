import styles from './ViewProject.module.scss';
import { Center, Progress, Grid, GridItem, Stack } from '@chakra-ui/react';
import { AiOutlineTag } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { Button } from "@chakra-ui/react";
import NavBar from './../NavBar/NavBar';

export interface ProjectInfo {
  name: string;
  shortDescription: string;
  image?: string;
  currentFunding: number;
  targetFunding: number;
  postcode: number;
  categories: string[];
  createdAt: number;
  completedAt: number;
}

export default function ViewProject(props: ProjectInfo) {
  let date_1 = new Date(`${props.createdAt}`);
  let date_2 = new Date(`${props.completedAt}`);

  const days = (date_1: Date, date_2: Date) => {
    let difference = date_2.getTime() - date_1.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  }

  return (
    <div className={styles.projectContainer}>
      <NavBar />
      <span className={styles.name}>
        <Center>{props.name}</Center>
      </span>

      <Grid>
        <GridItem colStart={4}>
          <div className={styles.projectImage}>
            <img src={props?.image} alt={props.name} />
          </div>
          <div className={styles.categoriesItem}>
            <AiOutlineTag className={styles.categoriesIcon} />
            <span className={styles.content}>{props.categories}</span>
            <HiLocationMarker className={styles.locationIcon} />
            <span className={styles.content}>{props.postcode}</span>
          </div>
        </GridItem>

        <GridItem colStart={5} colEnd={11}>
          <div className={styles.progressContainer}>
            <Progress
              value={(props.currentFunding / props.targetFunding) * 100}
              size="sm"
              borderStartRadius={30}
              borderEndRadius={30}
            />
            <span className={styles.fundingText}>
              <p>
                <span className={styles.current}> ${props.currentFunding.toLocaleString()}</span> pledged of ${props.targetFunding.toLocaleString()} goal
              </p>
            </span>
            <span className={styles.backersAmount}>
              <p>0 backer</p>
            </span>
            <span className={styles.daysAmount}>
              <p>{days(date_1, date_2)} days to go</p>
            </span>
          </div>
        </GridItem >
      </Grid >

      <Stack direction='row' spacing={10} align='center' className={styles.buttons}>
        <Button width="250px" borderRadius={4} fontSize={17} disabled>Share</Button>
        <Button width="250px" borderRadius={4} fontSize={17} disabled>Fund this Project</Button>
        <Button width="250px" borderRadius={4} fontSize={17} disabled>Enquire about Project</Button>
      </Stack>
    </div >
  );
}

