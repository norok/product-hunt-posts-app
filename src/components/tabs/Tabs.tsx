import styles from './tabs.module.scss';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {setOrder, type OrderType} from "../../features/posts/slice.ts";

type TabItemProps = {
  tab: {
    id: OrderType;
    label: string;
  };
  activeTab: OrderType;
  setActiveTab: (id: OrderType) => void;
}

export const Tabs = () => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.posts);

  const setActiveTab = (id: OrderType) => {
    dispatch(setOrder(id));
  }

  const tabs: {id: OrderType; label: string}[] = [
    { id: 'RANKING', label: 'Popular' },
    { id: 'NEWEST', label: 'Newest' }
  ];

  return (
    <section className={styles.tabs} data-testid="tabs">
      <ul className={styles["tabs__list"]} data-testid="tabs-list">
        {tabs.map((tab) => (
          <TabItem key={tab.id} tab={tab} activeTab={order} setActiveTab={setActiveTab} />
        ))}
      </ul>
    </section>
  )
}

const TabItem = (props: TabItemProps) => {
  const { tab, activeTab, setActiveTab} = props;

  return (
    <li className={`${styles["tabs__item"]} ${activeTab === tab.id ? styles["tabs__item--active"] : ''}`} key={tab.id}>
      <button type="button" onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
    </li>
  );
}