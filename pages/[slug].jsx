import { getPostBySlug, getAllPosts } from '../lib/posts';
import styles from '../styles/Post.module.css';
import Link from 'next/link';

const Post = ({ post }) => {
  if (!post) return <div>Post not found</div>;

  return (
    <article className={styles.article}>
      {/* Header with Title, Date, Philosophers */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <p className={styles.date}>
            {new Date(post.date).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.philosophers}>
            {post.currentPhilosophers && (
              <p className={styles.philosophersText}>
                <strong>Filósofos do dia:</strong> {post.currentPhilosophers}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className={styles.divider}></div>

      {/* Main Content Sections */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Introdução Poética</h2>
        <p className={styles.content}>{post.poeticIntro}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Corrente Filosófica do Dia</h2>
        <p className={styles.content}>{post.philosophicalCurrent}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Citação Principal</h2>
        <blockquote className={styles.quote}>
          "{post.mainCitation}"
          <footer>— {post.citationAuthor}</footer>
        </blockquote>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sobre os Pensadores</h2>
        <div className={styles.thinkersBio}>
          {post.thinkerBiographies}
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <figure className={styles.imageFigure}>
          <img src={post.image} alt={post.title} className={styles.postImage} />
          <figcaption className={styles.imageCaption}>{post.imageCaption}</figcaption>
        </figure>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Leituras Recomendadas</h2>
        <ul className={styles.readingsList}>
          {post.suggestedReadings && post.suggestedReadings.map((reading, i) => (
            <li key={i}>{reading}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Ritual Contemplativo</h2>
        <p className={styles.content}>{post.ritual}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Seu Espaço de Reflexão</h2>
        <div className={styles.notesSpace}>
          <p className={styles.placeholder}>Escreva aqui suas reflexões...</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Frase de Encerramento</h2>
        <p className={styles.closingPhrase}>{post.closingPhrase}</p>
      </section>

      {/* Links and Sources */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Referências e Fontes</h2>
        <ul className={styles.sourcesList}>
          {post.links && post.links.map((link, i) => (
            <li key={i}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  return {
    props: { post },
    revalidate: 3600
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));
  return {
    paths,
    fallback: false
  };
}

export default Post;
