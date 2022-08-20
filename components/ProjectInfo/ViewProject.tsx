import styles from './ViewProject.module.scss';
import { Center, Progress, Grid, GridItem, SimpleGrid, Stack } from '@chakra-ui/react';
import { AiOutlineTag } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { Button } from "@chakra-ui/react";

export interface ProjectInfo {
  name: string;
  shortDescription: string;
  image?: string;
  currentFunding: number;
  targetFunding: number;
  postcode: number;
}

export default function ViewProject(props: ProjectInfo) {
  return (
    <div className={styles.projectContainer}>
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
            <span className={styles.content}>Restaurant</span> {/* Will have categories */}
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
              <p>30 days to go</p>
            </span>
          </div>
        </GridItem >
      </Grid >

      <Stack direction='row' spacing={10} align='center' className={styles.buttons}>
        <Button width="250px" borderRadius={4} fontSize={17}>Share</Button>
        <Button width="250px" borderRadius={4} fontSize={17}>Fund this Project</Button>
        <Button width="250px" borderRadius={4} fontSize={17}>Enquire about Project</Button>
      </Stack>
    </div >
  );
}

