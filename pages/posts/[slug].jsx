import { getPostBySlug, getAllPosts } from '../../lib/posts';
import styles from '../../styles/Post.module.css';
import Link from 'next/link';
import Head from 'next/head';

export default function Post({ post }) {
  if (!post) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Reflexão não encontrada</h1>
          <Link href="/">
            <a className={styles.backLink}>← Voltar para home</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | Diário Filosófico</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Head>

      <div className={styles.container}>
        <Link href="/">
          <a className={styles.backLink}>← Voltar para reflexões</a>
        </Link>

        <article className={styles.article}>
          {/* Header */}
          <header className={styles.header}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <time className={styles.date}>
                {new Date(post.date).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {post.currentPhilosophers && (
                <span className={styles.philosophers}>
                  <strong>Filósofos:</strong> {post.currentPhilosophers}
                </span>
              )}
            </div>
          </header>

          <div className={styles.divider}></div>

          {/* Markdown Content */}
          <div 
            className={styles.content}
dangerouslySetInnerHTML={{ __html: post.contentHtml. }}        
        </article>

        {/* Footer */}
        <footer className={styles.footer}>
          <Link href="/">
            <a className={styles.backButton}>← Voltar para todas as reflexões</a>
          </Link>
        </footer>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
    revalidate: 60, // Revalida a cada 60 segundos
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: 'blocking', // Permite gerar páginas sob demanda
  };
}
