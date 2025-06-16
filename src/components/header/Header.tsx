import styles from './header.module.scss';

export const Header = () => {
  const username = "Username";
  const currentDate = new Date().toLocaleDateString("en-US", { dateStyle: "long" });

  return (
    <header className={styles.header}>
      <h1 data-testid="main-header">Product Hunt Posts App</h1>
      <div className={styles["header-content"]}>
        <nav className={styles["user-menu"]}>
          <div className={styles["user-menu__user"]}>
            <img src="https://avatars.githubusercontent.com/u/13870070?v=4" alt={`${username}'s Avatar`} />
            <span className={styles["user-menu__username"]}>{username}</span>
          </div>
          <ul className={styles["user-menu__links"]}>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </nav>
        <time className={styles.daytime}>{currentDate}</time>
      </div>
    </header>
  );
}
