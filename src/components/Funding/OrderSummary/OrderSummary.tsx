import {
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import type { Payment } from "../../../types/payment";
import { createPayment } from "../../../db/dbUtils";
import { updateProjectFunding } from "../../../db/dbUtils";
import { useSession } from "next-auth/react";

import styles from "./OrderSummary.module.scss";

type OrderSummaryProps = {
  projectID: string;
  name: string;
  images: string[];
  rewards: {
    id: string;
    name: string;
    cost: number;
    description: string;
  }[];
  currentFunding: number;
  reward: string;
  contribution: number | undefined;
  page: number;
  setPage: (page: number) => void;
};

export default function OrderSummary(props: OrderSummaryProps) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function DisplayReward() {
    // rewardIndex for accessing correct reward in array.
    const rewardIndex = parseInt(props.reward);

    // Default information to no reward.
    let tier = "No Reward";
    let cost = "1";
    let reward = "without a reward.";
    let description = "";

    // If rewardIndex isn't "no reward" option, update reward information.
    if (rewardIndex > -1) {
      tier =
        "Reward Tier " +
        (rewardIndex + 1) +
        ": " +
        props.rewards[rewardIndex].name;
      cost = props.rewards[rewardIndex].cost.toString();
      reward = "and receive the following:";
      description = props.rewards[rewardIndex].description;
    }

    return (
      <Text>
        <b>{tier}</b>
        <br />
        Contribute ${cost} or more {reward}
        {description != "" ? (
          <>
            <br />
            <li>{description}</li>
          </>
        ) : (
          <></>
        )}
      </Text>
    );
  }

  async function onContributeClick() {
    if (!session || !props.contribution) {
      return;
    }

    // Create Payment Object
    let payment: Payment = {
      projectID: props.projectID,
      userID: session.user.id,
      rewardID:
        props.reward != "-1"
          ? props.rewards[parseInt(props.reward)].id
          : undefined,
      amount: props.contribution
    };

    // Create Payment Record
    await createPayment(payment);

    // Update Project "currentFunding" Field.
    await updateProjectFunding(
      props.projectID,
      props.currentFunding + props.contribution
    );

    // Continue to Summary Page.
    props.setPage(3);
  }

  return (
    <>
      <Center>
        <Heading className={styles.pageTitle} size="xl">
          Order Summary
        </Heading>
      </Center>

      <div className={styles.content}>
        <div className={styles.project}>
          <div className={styles.thumbnailContainer}>
            <Image
              className={styles.thumbnail}
              src={props.images?.length ? props.images[0] : "/default.png"}
              alt=""
            />
          </div>
          <Text>
            <b>
              <u>{props.name}</u>
            </b>
          </Text>
        </div>

        <Divider className={styles.divider} />

        <div className={styles.reward}>{DisplayReward()}</div>

        <Divider className={styles.divider} />
        <HStack className={styles.contribution}>
          <Text>Total amount:</Text>
          <Text className={styles.total}>
            <b>
              ${" "}
              {props.contribution != undefined
                ? props.contribution.toLocaleString(undefined, {
                    minimumFractionDigits: 2
                  })
                : "Error..."}
            </b>
          </Text>
        </HStack>
      </div>
      <div className={styles.navigation}>
        <Button onClick={() => props.setPage(1)}>Back</Button>
        <Button onClick={onOpen}>Contribute</Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className={styles.confirmationModal}>
          <ModalHeader>Continue?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            By selecting continue, you are committing yourself to contribute the
            full amount of $
            {props.contribution != undefined
              ? props.contribution.toLocaleString(undefined, {
                  minimumFractionDigits: 2
                })
              : 0}
            . Would you still like to continue?
          </ModalBody>

          <ModalFooter>
            <Button variant="solid" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onContributeClick()}>Continue</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
