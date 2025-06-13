import styles from './post.module.scss';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';

export const Post = () => {
  return (
    <article className={styles.post}>
      <a href="#" className={styles["post__link"]}>
        <div className={styles["post__image"]}>
          <img src="https://avatars.githubusercontent.com/u/13870070?v=4" alt="User Avatar" />
        </div>
        <div className={styles["post__content"]}>
          <h3>Post Title</h3>
          <p>Post description goes here. This is a sample post content.</p>
        </div>
        <div className={styles["post__likes"]}>
          <KeyboardDoubleArrowUpRoundedIcon fontSize="inherit" />
          <span className={styles["post__likes__count"]}>123</span>
        </div>
      </a>
    </article>
  )
}
