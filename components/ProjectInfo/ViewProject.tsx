import { Center, Progress, Grid, GridItem } from '@chakra-ui/react';
import { AiOutlineTag } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { Button } from "@chakra-ui/react";

import { ProjectCategories } from "../../types/categories";
import type { ProjectCategory } from "../../types/categories";

import styles from './ViewProject.module.scss';

export interface ProjectInfo {
  id?: string;
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
  rewards?: any[];
}

export default function ViewProject(props: ProjectInfo) {
  const name = props?.name ?? "Missing";
  const postcode = props?.postcode ?? "None";
  const targetFunding = props?.targetFunding ?? 0;
  const currentFunding = props?.currentFunding ?? 0;
  const completedAt = props?.completedAt ?? new Date().toISOString();
  const backers = 0;

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
    <div className={styles.projectContainer} key={props.id}>
      <span className={styles.name}>
        <Center>{name}</Center>
      </span>

      <div className={styles.productWrapper}>
        <div className={styles.gridLeft}>
          <div className={styles.projectImage}>
            <img src={props?.images?.length ? props?.images[0] : "/default.png"} alt={props.name} />
          </div>
          <div className={styles.categoriesItem}>
            <AiOutlineTag className={styles.categoriesIcon} />
            <span className={styles.content}>{categories.join(", ")}</span>
            <HiLocationMarker className={styles.locationIcon} />
            <span className={styles.content}>{postcode}</span>
          </div>
        </div>

        <div className={styles.gridRight}>
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
              <p>{backers} backers</p>
            </span>
            <span className={styles.daysAmount}>
              <p>{daysRemaining()} days to go</p>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <Button width="250px" borderRadius={4} fontSize={16} disabled>Share</Button>
        <Button width="250px" borderRadius={4} fontSize={16} disabled>Fund this Project</Button>
        <Button width="250px" borderRadius={4} fontSize={16} disabled>Enquire about Project</Button>
      </div>
      <div className={styles.campaignWrapper}>
        <div className={styles.leftNav}>
          <div className={styles.left}>
            {props.aboutBusiness && <a href="#section1">About the Business</a>}
            {props.aboutOwner && <a href="#section2">About the Owner</a>}
            {props.businessPlan && <a href="#section3">Business Plan</a>}
            {props.rewards && props.rewards.length > 0 && <a href="#section4">Rewards</a>}
          </div>
        </div>

        <div className={styles.rightNav}>
          <div className={styles.right}>
            {props.aboutBusiness && (
              <>
                <p id="section1">About the Business</p>
                <span>{props.aboutBusiness}</span>
              </>
            )}

            {props.aboutOwner && (
              <>
                <p id="section2">About the Owner</p>
                <span>{props.aboutOwner}</span>
              </>
            )}

            {props.businessPlan && (
              <>
                <p id="section3">Business Plan</p>
                <span>{props.businessPlan}</span>
              </>
            )}

            {props.rewards && props.rewards.length > 0 && (
              <div className={styles.rewardButton}>
                <p id="section4">Rewards</p>
                <span>
                  <p className={styles.topTier}>Contribute without a reward</p>
                </span>

                {props.rewards.map((reward, i) => {
                  console.log(props.rewards)
                  return (
                    <span>
                      <p className={styles.tier}><b>Reward Tier {i + 1}</b> - {reward.name}
                        <div>
                          Contribute ${reward.cost} or more and receive the following:
                        </div>
                        <div>
                          {reward.description}
                        </div>
                      </p>
                    </span>
                  )
                }
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  )
};
