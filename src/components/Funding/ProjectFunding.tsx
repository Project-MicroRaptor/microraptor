import { useState } from "react";
import { FundingProps } from "../../types/fundingProps";
import SelectFunding from "./SelectFunding/SelectFunding";
import OrderSummary from "./OrderSummary/OrderSummary";
import PaymentDetails from "./PaymentDetails/PaymentDetails";

import styles from "./ProjectFunding.module.scss";

export default function ProjectFunding(props: FundingProps) {
  const [page, setPage] = useState(1);
  const [reward, setReward] = useState("1");
  const [contribution, setContribution] = useState<number>(1);

  return (
    <div className={styles.container}>
      {page == 1 ? (
        <SelectFunding
          id={props.id}
          name={props.name}
          rewards={props.rewards}
          page={page}
          setPage={(page) => setPage(page)}
          reward={reward}
          setReward={(reward) => setReward(reward)}
          contribution={contribution}
          setContribution={(contribution) => setContribution(contribution)}
        />
      ) : page == 2 ? (
        <OrderSummary
          name={props.name}
          images={props.images}
          rewards={props.rewards}
          reward={reward}
          contribution={contribution}
          page={page}
          setPage={(page) => setPage(page)}
        />
      ) : (
        <PaymentDetails
          name={props.name}
          page={page}
          setPage={(page) => setPage(page)}
        />
      )}
    </div>
  );
}
