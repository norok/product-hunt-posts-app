import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Product Hunt Posts App</h1>
      <nav className={styles["user-menu"]}>
        <div className={styles["user-menu__user"]}>
          <img src="https://avatars.githubusercontent.com/u/13870070?v=4" alt="User Avatar" />
          <span className={styles["user-menu__username"]}>Username</span>
        </div>
        <ul className={styles["user-menu__links"]}>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </nav>
      <time>Today, 12th Jun</time>
      <form>Search</form>
    </header>
  );
}
