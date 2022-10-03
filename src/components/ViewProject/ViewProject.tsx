import {
  Badge,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { AiOutlineTag } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { Button } from "@chakra-ui/react";
import React from "react";

import { ProjectCategories } from "../../types/categories";
import type { ProjectCategory } from "../../types/categories";

import styles from "./ViewProject.module.scss";
import { ProjectRewards } from "../../types/project";

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
  active?: boolean;
  preview?: boolean;
}

export default function ViewProject(props: ProjectInfo) {
  const name = props?.name ?? "Missing";
  const postcode = props?.postcode ?? "None";
  const targetFunding = props?.targetFunding ?? 0;
  const currentFunding = props?.currentFunding ?? 0;
  const completedAt = props?.completedAt ?? new Date().toISOString();
  const backers = 0;
  const shortDescription =
    props?.shortDescription || props.shortDescription !== ""
      ? props.shortDescription
      : "No Description";

  const daysRemaining = () => {
    const currentDate = new Date();
    const completedDate = new Date(completedAt);
    const difference = completedDate.getTime() - currentDate.getTime();
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));

    if (totalDays < 0) {
      return 0;
    }
    return totalDays;
  };

  const categories: string[] = [];

  props.categories?.forEach((category) => {
    if (ProjectCategories[category as keyof ProjectCategory]) {
      categories.push(ProjectCategories[category as keyof ProjectCategory]);
    } else {
      categories.push(category);
    }
  });

  if (categories.length == 0) {
    categories.push("None");
  }

  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const shareText =
    name +
    "\n\n" +
    shortDescription +
    "\n\nView the MicroRaptor project page here: " +
    window.location.href;

  return (
    <div className={styles.projectContainer}>
      <Center className={styles.name}>
        <Heading>{name}</Heading>
        {props.active ? (
          <></>
        ) : (
          <Badge
            className={styles.inactiveBanner}
            colorScheme="red"
            variant="solid"
            fontSize="md"
          >
            Inactive
          </Badge>
        )}
      </Center>

      <div className={styles.productWrapper}>
        <div className={styles.gridLeft}>
          <div className={styles.projectImage}>
            <img
              src={props?.images?.length ? props?.images[0] : "/default.png"}
              alt={props.name}
            />
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
              <span className={styles.current}>
                {" "}
                ${currentFunding?.toLocaleString()}
              </span>{" "}
              pledged of ${targetFunding?.toLocaleString()} goal
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
        <Button
          width="250px"
          borderRadius={4}
          fontSize={16}
          onClick={onOpen}
          data-testid="share-button"
          disabled={!!props?.preview}
        >
          Share
        </Button>
        <Button width="250px" borderRadius={4} fontSize={16} disabled>
          Fund this Project
        </Button>
        <Button width="250px" borderRadius={4} fontSize={16} disabled>
          Enquire about Project
        </Button>
      </div>

      <div className={styles.campaignWrapper}>
        <div className={styles.leftNav}>
          <div className={styles.left}>
            {props.aboutBusiness && (
              <a href="#aboutBusiness">About the Business</a>
            )}
            {props.aboutOwner && <a href="#aboutOwner">About the Owner</a>}
            {props.businessPlan && <a href="#businessPlan">Business Plan</a>}
            {props.rewards && props.rewards.length > 0 && (
              <a href="#rewards">Rewards</a>
            )}
          </div>
        </div>

        <div className={styles.rightNav}>
          <div className={styles.right}>
            {props.aboutBusiness && (
              <div className={styles.rightHeading}>
                <Heading id="aboutBusiness" size="md" marginBottom={3}>
                  About the Business
                </Heading>
                <span>{props.aboutBusiness}</span>
              </div>
            )}

            {props.aboutOwner && (
              <div className={styles.rightHeading}>
                <Heading id="aboutOwner" size="md" marginBottom={3}>
                  About the Owner
                </Heading>
                <span>{props.aboutOwner}</span>
              </div>
            )}

            {props.businessPlan && (
              <div className={styles.rightHeading}>
                <Heading id="businessPlan" size="md" marginBottom={3}>
                  Business Plan
                </Heading>
                <span>{props.businessPlan}</span>
              </div>
            )}

            {props.rewards && props.rewards.length > 0 && (
              <div className={styles.rewardButton}>
                <Heading id="rewards" size="md" marginBottom={3}>
                  Rewards
                </Heading>
                {props.rewards.map((reward: ProjectRewards, i) => {
                  return (
                    <span key={i}>
                      <span className={styles.tier}>
                        <b>Reward Tier {i + 1}</b> - {reward.name}
                        <span>
                          Contribute ${reward.cost} or more and receive the
                          following:
                        </span>
                        <span>{reward.description}</span>
                      </span>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className={styles.modalp} data-testid="share-modal">
              {shareText}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                navigator.clipboard.writeText(shareText);
                toast({
                  title: "Text copied",
                  duration: 2000,
                  isClosable: true
                });
              }}
              data-testid="share-copy-button"
            >
              Copy
            </Button>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
