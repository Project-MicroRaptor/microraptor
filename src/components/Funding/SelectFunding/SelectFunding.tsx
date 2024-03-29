import {
  Button,
  Center,
  Heading,
  HStack,
  InputGroup,
  Link,
  Radio,
  RadioGroup,
  Text,
  Input
} from "@chakra-ui/react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import styles from "./SelectFunding.module.scss";

type PaymentSummaryProps = {
  id: string;
  name: string;
  rewards: {
    name: string;
    cost: number;
    description: string;
  }[];
  page: number;
  setPage: (page: number) => void;
  reward: string;
  setReward: (reward: string) => void;
  contribution: number | undefined;
  setContribution: (contribution: number | undefined) => void;
};

export default function SelectFunding(props: PaymentSummaryProps) {
  var invalidAmount =
    props.contribution == null || props.contribution == 0
      ? true
      : props.reward != "-1"
      ? props.contribution < props.rewards[parseInt(props.reward)].cost
      : false;

  // Raise contribution amount to minimum reward cost.
  function onRewardSelected(selection: string) {
    props.setReward(selection);

    // Radio Value stored as string, parse to int for indexing rewards.
    let reward = parseInt(selection);

    // Reward index -1, no reward, no minimum contribution value.
    if (reward == -1) {
      props.setContribution(1);
      return;
    }

    // If contribution lower than minimum reward value.
    // Set contribution to minimum reward cost.
    props.setContribution(props.rewards[reward].cost);
  }

  function onContributionChanged(contribution: number | undefined) {
    // Set contribution value.
    //if (!contribution) return;
    props.setContribution(contribution);
  }

  return (
    <>
      <Center>
        <Heading className={styles.pageTitle} size="xl">
          {props.name}
        </Heading>
      </Center>
      <div className={styles.content}>
        <div className={styles.rewards}>
          <Heading size="md">Select your reward</Heading>
          <br />
          <RadioGroup
            onChange={(reward) => onRewardSelected(reward)}
            value={props.reward}
          >
            <div className={styles.reward}>
              <Radio value="-1">
                <Text>
                  <b>
                    No Reward
                    <br />
                  </b>
                  Contribute $1 or more without a reward.
                </Text>
              </Radio>
            </div>
            {props.rewards.length > 0 ? (
              props.rewards.map((reward, index) => {
                return (
                  <div className={styles.reward} key={index}>
                    <Radio value={index.toString()}>
                      <Text>
                        <b>
                          Reward Tier {index + 1}: {reward.name}
                          <br />
                        </b>
                        Contribute ${reward.cost} or more and receive the
                        following:
                        <br />
                        <li>{reward.description}</li>
                      </Text>
                    </Radio>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </RadioGroup>
          <br />

          <HStack className={styles.navigation}>
            <Button
              className={styles.back}
              as={Link}
              href={`/project/${props.id}`}
            >
              Exit
            </Button>
            <HStack>
              <InputGroup>
                <NumberFormat
                  thousandSeparator
                  customInput={Input}
                  prefix="$  "
                  isInvalid={invalidAmount}
                  value={props.contribution}
                  onValueChange={(value) =>
                    onContributionChanged(value.floatValue)
                  }
                />
              </InputGroup>
              <Button disabled={invalidAmount} onClick={() => props.setPage(2)}>
                Continue
              </Button>
            </HStack>
          </HStack>
        </div>
        <div className={styles.disclaimer}>
          <Text>
            Risk & Disclaimer
            <br />
            <b>Rewards are not guaranteed.</b>
            <br />
            Your contribution will be supporting local businesses and community
            projects. While best efforts by the project teams will be made,
            there is a risk your rewards will not be fulfilled. <br />
            <br />
            Please consider the risk before contributing to this project.
          </Text>
          <br />
          <Center>
            <Button disabled>Enquire About Project</Button>
          </Center>
        </div>
      </div>
    </>
  );
}
