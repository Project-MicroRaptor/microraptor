import { NextPage } from "next";

import styles from "./TabSwitcher.module.scss";

interface Props {
  tabs: Array<TabType>;
  selectedTab: number;
  onChangeTab: (tab: number) => void;
}

const TabSwitcher: NextPage<Props> = (props) => {
  const { tabs, selectedTab, onChangeTab } = props;

  return (
    <div className={styles.container}>
      {tabs.map((tab, i) => (
        <div
          className={styles.item}
          key={i}
          data-testid={tab.name}
          onClick={() => onChangeTab(i)}
        >
          <div className={styles.icon}>{tab.icon}</div>
          <div className={styles.heading}>{tab.name}</div>
          {i === selectedTab && <div className={styles.selected}></div>}
        </div>
      ))}
    </div>
  );
};

export default TabSwitcher;

export type TabType = {
  name: string;
  icon: JSX.Element;
};
