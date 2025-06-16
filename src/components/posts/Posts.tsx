import { type UIEvent } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { Post } from "../";
import { useEffect, useCallback } from "react";
import { fetchPosts } from "../../features/posts/slice.ts";
import styles from './posts.module.scss';

export const Posts = () => {
  const dispatch = useAppDispatch();
  const { posts, status, error, order, cursor } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts({order, cursor: null}));
    }
  }, [dispatch, status, order]);

  const scrollHandler = useCallback((e: UIEvent<HTMLDivElement>)=> {
    const container = e.currentTarget;
    const item = container.querySelector('li:first-child');

    if (container.scrollTop > container.scrollHeight - container.clientHeight - 5 * (item?.clientHeight || 0) && status === 'succeeded') {
      dispatch(fetchPosts({order, cursor}));
    }
  }, [dispatch, status, cursor, order]);

  if (status === 'failed') {
    return (
      <section data-testid="error-message" className={styles.posts}>
        <h2>Error</h2>
        <p>{error}</p>
      </section>
    )
  }

  return (
    <section data-testid="posts-list" className={styles.posts} onScroll={scrollHandler}>
      <ul className={styles["posts__list"]}>
        {posts.map((post) => (
          <li key={post.id}>
            <Post postData={post} />
          </li>
        ))}
      </ul>
      {status === 'loading' && (
        <p className={styles.loading} aria-live="polite" aria-label="Loading"><CircularProgress /></p>
      )}
    </section>
  )
}
