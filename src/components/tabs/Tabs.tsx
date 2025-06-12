import {useState} from "react";
import styles from './tabs.module.scss';

type TabItemProps = {
  tab: {
    id: number;
    label: string;
  };
  activeTab: number;
  setActiveTab: (id: number) => void;
}

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { id: 0, label: 'Popular' },
    { id: 1, label: 'Newest' }
  ];

  return (
    <section className={styles.tabs}>
      <ul className={styles["tabs__list"]}>
        {tabs.map((tab) => (
          <TabItem key={tab.id} tab={tab} activeTab={activeTab} setActiveTab={setActiveTab} />
        ))}
      </ul>
    </section>
  )
}

const TabItem = (props: TabItemProps) => {
  const { tab, activeTab, setActiveTab} = props;

  return (
    <li className={`${styles["tabs__item"]} ${activeTab === tab.id ? styles["tabs__item--active"] : ''}`} key={tab.id}>
      <button onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
    </li>
  );
}