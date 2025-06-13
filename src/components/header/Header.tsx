import styles from './header.module.scss';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export const Header = () => {
  const username = "Username";

  return (
    <header className={styles.header}>
      <h1>Product Hunt Posts App</h1>
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
        <time className={styles.daytime}>Today, 12th Jun</time>
        <form className={styles.searchform}>
          <button className={styles["searchform-button"]} type="button">
            <SearchRoundedIcon className={styles["searchform-icon"]} fontSize={"inherit"} aria-label={"Search"} />
          </button>
        </form>
      </div>
    </header>
  );
}
