import styles from './posts.module.scss';
import { Post } from "../";

export const Posts = () => {
  return (
    <section className={styles.posts}>
      <h2>Popular Posts</h2>
      <ul className={styles["posts__list"]}>
        <li>
          <Post />
        </li>
        <li>
          <Post />
        </li>
        <li>
          <Post />
        </li>
        <li>
          <Post />
        </li>
        <li>
          <Post />
        </li>
        <li>
          <Post />
        </li>
        <li>
          <Post />
        </li>
      </ul>
    </section>
  )
}
