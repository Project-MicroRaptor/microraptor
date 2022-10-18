import {
  Badge,
  Center,
  FormControl,
  Heading,
  Link,
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
  Avatar
} from "@chakra-ui/react";
import React from "react";
import router from "next/router";
import { AiOutlineTag } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { Button } from "@chakra-ui/react";
import type { ProjectCategory } from "../../types/categories";
import { ProjectCategories } from "../../types/categories";
import { ProjectRewards } from "../../types/project";
import { createMessageGroup } from "../../db/dbUtils";
import { useSession } from "next-auth/react";
import { User } from "../../types/user";

import styles from "./ViewProject.module.scss";

export interface ProjectInfo {
  id?: string;
  name?: string;
  shortDescription?: string;
  images?: string[];
  owner?: User;
  currentFunding?: number;
  targetFunding?: number;
  locality?: string;
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
  const {
    id,
    name = "Missing",
    shortDescription = "No Description",
    images = [],
    owner = {
      id: "",
      name: "None",
      image: ""
    },
    currentFunding = 0,
    targetFunding = 0,
    locality = "UNKNOWN",
    postcode,
    categories = [],
    completedAt = new Date().toISOString(),
    aboutBusiness,
    aboutOwner,
    businessPlan,
    rewards,
    active = true,
    preview = false
  } = props;
  const backers = 0;

  let locationString = locality;
  if (postcode) {
    locationString += `, ${postcode}`;
  }

  const { data: session } = useSession();

  const loggedInNotOwner = session && session.user.id !== owner?.id;

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

  const categoryStrings = [];

  categories?.forEach((category) => {
    if (ProjectCategories[category as keyof ProjectCategory]) {
      categoryStrings.push(
        ProjectCategories[category as keyof ProjectCategory]
      );
    } else {
      categoryStrings.push(category);
    }
  });

  if (categories.length == 0) {
    categoryStrings.push("None");
  }

  let [message, setValue] = React.useState("");
  let handleInputChange = (e: any) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const finalRef = React.useRef(null);
  const toast = useToast();
  const {
    isOpen: isShareOpen,
    onOpen: onShareOpen,
    onClose: onShareClose
  } = useDisclosure();
  const {
    isOpen: isMssgOpen,
    onOpen: onMssgOpen,
    onClose: onMssgClose
  } = useDisclosure();

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
        {active ? (
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
            <img src={images?.length ? images[0] : "/default.png"} alt={name} />
          </div>
          <div className={styles.categoriesItem}>
            <AiOutlineTag className={styles.categoriesIcon} />
            <span className={styles.content}>{categoryStrings.join(", ")}</span>
            <HiLocationMarker className={styles.locationIcon} />
            <span className={styles.content}>{locationString}</span>
          </div>
        </div>

        <div className={styles.progressContainer}>
          {owner.id && (
            <div className={styles.projectOwner}>
              <a href={owner.id ? `/profile/${owner.id}` : ""}>
                <Avatar
                  className={styles.ownerImage}
                  src={owner.image}
                  size="md"
                  border="2px solid grey"
                />
                <span className={styles.ownerName}>{owner.name}</span>
              </a>
            </div>
          )}
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
          width="270px"
          borderRadius={4}
          fontSize={16}
          onClick={onShareOpen}
          data-testid="share-button"
          disabled={preview}
        >
          Share
        </Button>
        <Button
          width="270px"
          borderRadius={4}
          fontSize={16}
          as={Link}
          className={styles.fundLink}
          href={loggedInNotOwner && !preview && `/project/fund/${props.id}`}
          disabled={!loggedInNotOwner || preview}
        >
          Fund this Project
        </Button>
        <Button
          width="270px"
          borderRadius={4}
          fontSize={16}
          onClick={onMssgOpen}
          disabled={!loggedInNotOwner || preview}
        >
          Enquire about Project
        </Button>
      </div>

      <div className={styles.campaignWrapper}>
        <div className={styles.leftNav}>
          <div className={styles.left}>
            {aboutBusiness && <a href="#aboutBusiness">About the Business</a>}
            {aboutOwner && <a href="#aboutOwner">About the Owner</a>}
            {businessPlan && <a href="#businessPlan">Business Plan</a>}
            {rewards && rewards.length > 0 && <a href="#rewards">Rewards</a>}
          </div>
        </div>

        <div className={styles.rightNav}>
          <div className={styles.right}>
            {aboutBusiness && (
              <div className={styles.rightHeading}>
                <Heading id="aboutBusiness" size="md" marginBottom={3}>
                  About the Business
                </Heading>
                <span>{aboutBusiness}</span>
              </div>
            )}

            {aboutOwner && (
              <div className={styles.rightHeading}>
                <Heading id="aboutOwner" size="md" marginBottom={3}>
                  About the Owner
                </Heading>
                <span>{aboutOwner}</span>
              </div>
            )}

            {businessPlan && (
              <div className={styles.rightHeading}>
                <Heading id="businessPlan" size="md" marginBottom={3}>
                  Business Plan
                </Heading>
                <span>{businessPlan}</span>
              </div>
            )}

            {rewards && rewards.length > 0 && (
              <div className={styles.rewardButton}>
                <Heading id="rewards" size="md" marginBottom={3}>
                  Rewards
                </Heading>
                {rewards.map((reward: ProjectRewards, i) => {
                  return (
                    <span key={i}>
                      <span className={styles.tier}>
                        <b>Reward Tier {i + 1}</b> - {reward.name}
                        <span>
                          Contribute $
                          {reward.cost ? reward.cost.toLocaleString() : "0"} or
                          more and receive the following:
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
          <ModalHeader>Enquire about {name}</ModalHeader>
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
            <Button
              onClick={() =>
                createMessageGroup(message, id ?? "", owner?.id ?? "").then(
                  (res) => {
                    if (res.id) router.push(`/inbox`);
                  }
                )
              }
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
