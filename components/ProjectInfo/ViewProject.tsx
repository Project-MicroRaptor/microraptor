import { Center, Heading, Progress } from '@chakra-ui/react';
import { AiOutlineTag } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { Button } from "@chakra-ui/react";

import { ProjectCategories } from "../../types/categories";
import type { ProjectCategory } from "../../types/categories";

import styles from './ViewProject.module.scss';
import { ProjectRewards } from '../../types/project';

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
  rewards?: Array<ProjectRewards>;
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
    <div className={styles.projectContainer}>
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

      <div className={styles.buttons}>
        <Button width="250px" borderRadius={4} fontSize={16} disabled>Share</Button>
        <Button width="250px" borderRadius={4} fontSize={16} disabled>Fund this Project</Button>
        <Button width="250px" borderRadius={4} fontSize={16} disabled>Enquire about Project</Button>
      </div>

      <div className={styles.campaignWrapper}>
        <div className={styles.leftNav}>
          <div className={styles.left}>
            {props.aboutBusiness && <a href="#aboutBusiness">About the Business</a>}
            {props.aboutOwner && <a href="#aboutOwner">About the Owner</a>}
            {props.businessPlan && <a href="#businessPlan">Business Plan</a>}
            {props.rewards && props.rewards.length > 0 && <a href="#rewards">Rewards</a>}
          </div>
        </div>

        <div className={styles.rightNav}>
          <div className={styles.right}>
            {props.aboutBusiness && (
              <>
                <Heading id="aboutBusiness" size="md">About the Business</Heading>
                <span>{props.aboutBusiness}</span>
              </>
            )}

            {props.aboutOwner && (
              <>
                <Heading id="aboutOwner" size="md">About the Owner</Heading>
                <span>{props.aboutOwner}</span>
              </>
            )}

            {props.businessPlan && (
              <>
                <Heading id="businessPlan" size="md">Business Plan</Heading>
                <span>{props.businessPlan}</span>
              </>
            )}

            {props.rewards && props.rewards.length > 0 && (
              <div className={styles.rewardButton}>
                <Heading id="rewards" size="md">Rewards</Heading>
                {props.rewards.map((reward: ProjectRewards, i) => {
                  return (
                    <span key={i}>
                      <p className={styles.tier}><b>Reward Tier {i + 1}</b> - {reward.name}
                        <span>
                          Contribute ${reward.cost} or more and receive the following:
                        </span>
                        <span>
                          {reward.description}
                        </span>
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
