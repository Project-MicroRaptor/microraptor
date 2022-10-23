import { useState } from "react";
import { FundingProps } from "../../types/fundingProps";
import SelectFunding from "./SelectFunding/SelectFunding";
import OrderSummary from "./OrderSummary/OrderSummary";
import PaymentDetails from "./PaymentDetails/PaymentDetails";

import styles from "./ProjectFunding.module.scss";

enum pages {
  SelectFunding = 1,
  OrderSummary = 2,
  PaymentDetails = 3
}

export default function ProjectFunding(props: FundingProps) {
  // Current page state.
  const [page, setPage] = useState(1);
  // Current reward radio button selected.
  const [reward, setReward] = useState("-1");
  // Current contribution value selected.
  const [contribution, setContribution] = useState<number | undefined>(1);

  // Returns the correct component for the current page.
  function FundingContent() {
    switch (page) {
      case pages.SelectFunding:
        return (
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
        );
      case pages.OrderSummary:
        return (
          <OrderSummary
            projectID={props.id}
            name={props.name}
            images={props.images}
            rewards={props.rewards}
            currentFunding={props.currentFunding}
            reward={reward}
            contribution={contribution}
            page={page}
            setPage={(page) => setPage(page)}
          />
        );
      case pages.PaymentDetails:
        return (
          <PaymentDetails
            id={props.id}
            name={props.name}
            page={page}
            setPage={(page) => setPage(page)}
          />
        );
    }
  }

  return <div className={styles.container}>{FundingContent()}</div>;
}
