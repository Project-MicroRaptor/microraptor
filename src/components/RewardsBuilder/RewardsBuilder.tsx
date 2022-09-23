import {
  Input,
  InputGroup,
  InputLeftElement,
  Textarea
} from "@chakra-ui/react";
import {
  BsCurrencyDollar,
  BsFillDashCircleFill,
  BsFillPlusCircleFill
} from "react-icons/bs";
import NumberFormat from "react-number-format";
import { ProjectRewards } from "../../types/project";

import styles from "./RewardsBuilder.module.scss";

type Props = {
  rewards: Array<ProjectRewards>;
  rewardCount: number;
  onDeleteReward: (index: number) => void;
  onAddReward: () => void;
  onEditReward: (index: number, reward: ProjectRewards) => void;
};

export default function RewardsBuilder(props: Props) {
  const { rewards, rewardCount, onDeleteReward, onAddReward, onEditReward } =
    props;

  const rewardTabs = [...Array(rewardCount)].map((element, i) => {
    const level = i + 1;
    return (
      <div className={styles.rewardContainer} key={i}>
        <div className={styles.top}>
          <div className={styles.level}>Level {level}</div>
          <div className={styles.name}>
            <Input
              value={rewards?.[i]?.name ?? ""}
              onChange={(event) =>
                onEditReward(i, { name: event.target.value })
              }
            />
          </div>
          <div className={styles.cost}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <BsCurrencyDollar />
              </InputLeftElement>
              <NumberFormat
                thousandSeparator
                customInput={Input}
                value={rewards?.[i]?.cost ?? ""}
                onValueChange={(values) =>
                  onEditReward(i, { cost: values.floatValue })
                }
              />
            </InputGroup>
          </div>
        </div>
        <div className={styles.description}>
          <Textarea
            value={rewards?.[i]?.description ?? ""}
            onChange={(event) =>
              onEditReward(i, { description: event.target.value })
            }
          />
        </div>
        <div
          className={styles.delete}
          onClick={() => {
            onDeleteReward(i);
          }}
        >
          <BsFillDashCircleFill />
        </div>
      </div>
    );
  });

  return (
    <div>
      {rewardTabs}
      <div
        className={`${styles.rewardContainer} ${styles.add}`}
        onClick={() => onAddReward()}
      >
        <BsFillPlusCircleFill />
      </div>
    </div>
  );
}
