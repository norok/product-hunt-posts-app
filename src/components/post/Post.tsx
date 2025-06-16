import styles from './post.module.scss';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import type { Post as PostDataType } from "../../features/posts/slice.ts";

type PostType = {
  postData: PostDataType
}

export const Post = (props: PostType) => {
  const {name, tagline, url, votesCount, thumbnail} = props.postData;
  return (
    <article className={styles.post} data-testid="post-item">
      <div className={styles["post__image"]} data-testid="post-image">
        <img src={thumbnail?.url || '/src/assets/no-logo.png'} alt="Product Logo"/>
      </div>
      <div className={styles["post__meta"]} data-testid="post-meta">
        <h3><a data-testid="post-link" href={url} className={styles["post__link"]}>{name}</a></h3>
        <p>{tagline}</p>
      </div>
      <div className={styles["post__votes"]} data-testid="post-votes">
        <KeyboardDoubleArrowUpRoundedIcon fontSize="inherit"/>
        <span className={styles["post__votes__count"]}>{votesCount}</span>
      </div>
    </article>
  )
}
