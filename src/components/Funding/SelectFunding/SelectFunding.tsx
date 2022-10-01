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
  contribution: number;
  setContribution: (contribution: number) => void;
};

export default function SelectFunding(props: PaymentSummaryProps) {
  function onRewardSelected(selection: string) {
    props.setReward(selection);
    let reward = parseInt(selection);
    if (reward == 1) {
      props.setContribution(1);
    } else {
      props.setContribution(props.rewards[reward - 2].cost);
    }
  }

  function onContributionChanged(value: number | void) {
    if (!value) {
      props.setContribution(1);
      props.setReward("1");
      return;
    }
    props.setContribution(value);
    for (var i = props.rewards.length; i >= 0; i--) {
      if (i == 0) {
        props.setReward("1");
      } else {
        if (value >= props.rewards[i - 1].cost) {
          props.setReward((i + 1).toString());
          return;
        }
      }
    }
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
              <Radio value="1">
                <Text>
                  <b>
                    No Reward
                    <br />
                  </b>
                  Contribute $1 or more without a reward.
                </Text>
              </Radio>
            </div>
            {props.rewards.length > 0
              ? props.rewards.map((reward, index) => {
                  return (
                    <div className={styles.reward} key={index}>
                      <Radio value={(index + 2).toString()}>
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
              : {}}
          </RadioGroup>
          <br />

          <HStack className={styles.navigation}>
            <Button className={styles.back}>
              <Link href={`/project/${props.id}`}>Exit</Link>
            </Button>
            <HStack>
              <InputGroup className={styles.contributionInput}>
                <NumberFormat
                  thousandSeparator
                  customInput={Input}
                  prefix="$  "
                  suffix="  AUD"
                  value={props.contribution}
                  onValueChange={(value) =>
                    onContributionChanged(value.floatValue)
                  }
                />
              </InputGroup>
              <Button onClick={() => props.setPage(2)}>Continue</Button>
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
