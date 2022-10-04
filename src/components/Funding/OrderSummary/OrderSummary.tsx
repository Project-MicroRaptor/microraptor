import {
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  Text
} from "@chakra-ui/react";

import styles from "./OrderSummary.module.scss";

type OrderSummaryProps = {
  name: string;
  images: string[];
  rewards: {
    name: string;
    cost: number;
    description: string;
  }[];
  reward: string;
  contribution: number;
  page: number;
  setPage: (page: number) => void;
};

export default function OrderSummary(props: OrderSummaryProps) {
  const rewardIndex = parseInt(props.reward) - 2;
  function DisplayReward() {
    let tier = "No Reward";
    let cost = "1";
    let reward = "without a reward.";
    let description = "";

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
            {props.images.length == 0 ? (
              <></>
            ) : (
              <Image
                className={styles.thumbnail}
                src={props.images[0]}
                alt=""
              />
            )}
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
              {props.contribution.toLocaleString(undefined, {
                minimumFractionDigits: 2
              })}
            </b>
          </Text>
        </HStack>
      </div>
      <div className={styles.navigation}>
        <Button onClick={() => props.setPage(1)}>Back</Button>
        <Button onClick={() => props.setPage(3)}>Contribute</Button>
      </div>
    </>
  );
}
