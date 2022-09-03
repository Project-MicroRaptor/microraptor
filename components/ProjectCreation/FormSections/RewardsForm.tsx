import RewardsBuilder from "../../RewardsBuilder/RewardsBuilder";

import type { ProjectRewards } from "../../../types/project";

import styles from "./ProfileSections.module.scss";

type Props = {
  formData: any;
  onFormChange: (id: string, value: any) => void;
};

export default function RewardsForm(props: Props) {
  const { onFormChange, formData } = props;

  const onDeleteReward = (index: number) => {
    const rewards = formData?.rewards;
    // Delete rewards index
    if (rewards && rewards[index]) {
      delete rewards[index];
    }
    
    // Move all indexes down one value on deletion
    rewards && Object.entries(rewards).forEach((reward) => {
      const [key, value] = reward; 
      const keyNum = Number(key);

      // If key is not a number, move the index and delete
      if (!isNaN(keyNum) && 0 < keyNum && index < keyNum) {

        rewards[keyNum - 1] = value;
        delete rewards[keyNum];
      }
    })

    onFormChange("rewards", {
      ...rewards
    });
    onFormChange("rewardCount", formData?.rewardCount - 1);
  };

  const onEditReward = (index: number, reward: ProjectRewards) => {
    onFormChange("rewards", {
      ...formData.rewards,
      [index]: {
        ...formData?.rewards?.[index],
        ...reward
      },
    })
  }

  return (
    <div className={styles.container}>
      <RewardsBuilder
        rewards={formData?.rewards}
        rewardCount={formData?.rewardCount ?? 0}
        onDeleteReward={onDeleteReward}
        onAddReward={() => onFormChange("rewardCount", !isNaN(formData?.rewardCount) ? formData?.rewardCount + 1 : 1)}
        onEditReward={onEditReward}
      />
    </div>
  );
}
