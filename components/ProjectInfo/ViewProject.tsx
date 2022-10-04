import {
  Center,
  FormControl,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineTag } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { Button } from "@chakra-ui/react";
import React from "react";

import { ProjectCategories } from "../../types/categories";
import type { ProjectCategory } from "../../types/categories";

import styles from "./ViewProject.module.scss";
import { ProjectRewards } from "../../types/project";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { CreateMessageGroup } from "../../utils/dbUtils";

export interface ProjectInfo {
  id?: string;
  name?: string;
  shortDescription?: string;
  images?: string[];
  owner?: User;
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
  const shortDescription = props?.shortDescription || props.shortDescription !== "" ? props.shortDescription : "No Description";
  const { data: session } = useSession();

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

  let [message, setValue] = React.useState('')
  let handleInputChange = (e: any) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  const finalRef = React.useRef(null);
  const toast = useToast();
  const { isOpen: isShareOpen , onOpen: onShareOpen, onClose: onShareClose } = useDisclosure()
  const { isOpen: isMssgOpen , onOpen: onMssgOpen, onClose: onMssgClose } = useDisclosure()

  const shareText = name + "\n\n" + shortDescription + "\n\nView the MicroRaptor project page here: " + window.location.href;

  return (
    <div className={styles.projectContainer}>
      <span className={styles.name}>
        <Center>{name}</Center>
      </span>

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
        <Button width="250px" borderRadius={4} fontSize={16} onClick={onShareOpen}>
          Share
        </Button>
        <Button width="250px" borderRadius={4} fontSize={16} disabled>
          Fund this Project
        </Button>
        <Button width="250px" borderRadius={4} fontSize={16} onClick={onMssgOpen}>
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
                <Heading id="aboutBusiness" size="md" marginBottom={3}>About the Business</Heading>
                <span>{props.aboutBusiness}</span>
              </div>
            )}

            {props.aboutOwner && (
              <div className={styles.rightHeading}>
                <Heading id="aboutOwner" size="md" marginBottom={3}>About the Owner</Heading>
                <span>{props.aboutOwner}</span>
              </div>
            )}

            {props.businessPlan && (
              <div className={styles.rightHeading}>
                <Heading id="businessPlan" size="md" marginBottom={3}>Business Plan</Heading>
                <span>{props.businessPlan}</span>
              </div>
            )}

            {props.rewards && props.rewards.length > 0 && (
              <div className={styles.rewardButton}>
                <Heading id="rewards" size="md" marginBottom={3}>Rewards</Heading>
                {props.rewards.map((reward: ProjectRewards, i) => {
                  return (
                    <span key={i}>
                      <span className={styles.tier}><b>Reward Tier {i + 1}</b> - {reward.name}
                        <span>
                          Contribute ${reward.cost} or more and receive the following:
                        </span>
                        <span>
                          {reward.description}
                        </span>
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
        isOpen={isShareOpen}
        onClose={onShareClose}
        size={"xl"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className={styles.modalp}>{shareText}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                navigator.clipboard.writeText(shareText);
                toast({
                  title: "Text copied",
                  duration: 2000,
                  isClosable: true,
                });
              }}
            >
              Copy
            </Button>
            <Button onClick={onShareClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isMssgOpen}
        onClose={onMssgClose}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enquire about {props.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl className={styles.formControl}>
        <Textarea
          id="message"
          value={message}
          onChange={handleInputChange}
          className={styles.formInput}
          resize="vertical"
          min-height="100%"
        />
      </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => CreateMessageGroup(message, session)}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
