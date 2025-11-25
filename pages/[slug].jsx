import { getPostBySlug, getAllPosts } from '../../lib/posts';
import styles from '../../styles/Post.module.css';
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
      <div className={styles.content}>
        {/* Poetic Introduction */}
        {post.intro && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Introdução Poética</h2>
            <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: post.intro }} />
          </section>
        )}

        {/* Philosophical Current */}
        {post.philosophicalCurrent && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Corrente Filosófica do Dia</h2>
            <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: post.philosophicalCurrent }} />
          </section>
        )}

        {/* Main Citation */}
        {post.mainCitation && (
          <blockquote className={styles.quotation}>
            <p className={styles.quote}>"<em>{post.mainCitation}</em>"</p>
            {post.citationAuthor && (
              <footer className={styles.quoteFooter}>— {post.citationAuthor}</footer>
            )}
          </blockquote>
        )}

        {/* Thinker Biographies */}
        {post.thinkerBiographies && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Sobre os Pensadores</h2>
            <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: post.thinkerBiographies }} />
          </section>
        )}

        {/* Featured Image */}
        {post.image && (
          <figure className={styles.figure}>
            <img src={post.image} alt={post.imageCaption || post.title} className={styles.image} />
            {post.imageCaption && (
              <figcaption className={styles.figcaption}>{post.imageCaption}</figcaption>
            )}
          </figure>
        )}

        {/* Suggested Readings */}
        {post.suggestedReadings && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Leituras Recomendadas</h2>
            <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: post.suggestedReadings }} />
          </section>
        )}

        {/* Ritual or Exercise */}
        {post.ritual && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Ritual Contemplativo</h2>
            <div className={styles.sectionContent} dangerouslySetInnerHTML={{ __html: post.ritual }} />
          </section>
        )}

        {/* Space for Notes */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Seu Espaço de Reflexão</h2>
          <p className={styles.notesPrompt}>Reserve este espaço para suas próprias notas e reflexões...</p>
          <div className={styles.notesArea}></div>
        </section>

        {/* Closing Phrase */}
        {post.closingPhrase && (
          <div className={styles.closing}>
            <p className={styles.closingText}>«{post.closingPhrase}»</p>
          </div>
        )}
      </div>

      {/* Links and Sources */}
      {post.links && post.links.length > 0 && (
        <section className={styles.sources}>
          <h3 className={styles.sourcesTitle}>Referências e Fontes</h3>
          <ul className={styles.linksList}>
            {post.links.map((link, idx) => (
              <li key={idx}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title || link.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Footer Navigation */}
      <footer className={styles.postFooter}>
        <Link href="/">
          <a className={styles.backLink}>← Voltar ao Diário</a>
        </Link>
      </footer>
    </article>
  );
};

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { notFound: true };
  }
  return {
    props: { post },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export default Post;
