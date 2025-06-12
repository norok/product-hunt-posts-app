import styles from './post.module.scss';

export const Post = () => {
  return (
    <article className={styles.post}>
      <a href="#">
        <div className={styles["post__image"]}>
          <img src="https://avatars.githubusercontent.com/u/13870070?v=4" alt="User Avatar" />
        </div>
        <div className={styles["post__content"]}>
          <h3>Post Title</h3>
          <p>Post description goes here. This is a sample post content.</p>
          <div className={styles["post__likes"]}>
            123
          </div>
        </div>
      </a>
    </article>
  )
}
