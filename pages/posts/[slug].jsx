import { getPostBySlug, getAllPosts } from '../../lib/posts';
import styles from '../../styles/Post.module.css';

export default function Post({ post }) {
  if (!post) {
    return <div className={styles.container}><p>Post not found</p></div>;
  }

  return (
    <div className={styles.container}>
      <article className={styles.post}>
        <header className={styles.postHeader}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.meta}>
            {new Date(post.date).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          {post.currentPhilosophers && (
            <p className={styles.philosophers}>
              <strong>Filósofos:</strong> {post.currentPhilosophers}
            </p>
          )}
        </header>
        <div className={styles.content}>
          {post.content && (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          )}
        </div>
      </article>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  return {
    props: { post },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false
  };
}
