new Date(featuredPost.date).toLocaleDateString  new Date(featuredPost.date || new Date()).toLocaleDateStringimport Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import styles from '../styles/Home.module.css';

const Home = ({ posts }) => {
  const featuredPost = posts[0];

  return (
    <div className={styles.container}>
      {/* Hero Section with Contemplative Intro */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Diário Filosófico</h1>
          <p className={styles.subtitle}>
            Reflexões contemplativas sobre correntes filosóficas,<br />
            pensadores clássicos e a sabedoria dos antigos
          </p>
          <div className={styles.divider}></div>
          <p className={styles.tagline}>
            "Uma jornada pela sabedoria em atmosfera dark academia"
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className={styles.featured}>
          <h2 className={styles.sectionTitle}>Última Reflexão</h2>
          <article className={styles.featuredPost}>
            <Link href={`/posts/${featuredPost.slug}`}>
              <a className={styles.postLink}>
                <h3 className={styles.postTitle}>{featuredPost.title}</h3>
                <p className={styles.postDate}>
                              {new Date(featuredPost.date || new Date()).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className={styles.postExcerpt}>{featuredPost.excerpt}</p>
                <span className={styles.readMore}>Ler reflexão completa →</span>
              </a>
            </Link>
          </article>
        </section>
      )}

      {/* All Posts Grid */}
      {posts.length > 1 && (
        <section className={styles.allPosts}>
          <h2 className={styles.sectionTitle}>Todas as Reflexões</h2>
          <div className={styles.postsGrid}>
            {posts.slice(1).map((post) => (
              <article key={post.slug} className={styles.postCard}>
                <Link href={`/posts/${post.slug}`}>
                  <a className={styles.postCardLink}>
                    <h4 className={styles.cardTitle}>{post.title}</h4>
                    <p className={styles.cardDate}>
                                  {new Date(post.date || new Date()).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <p className={styles.cardThinkers}>
                      {post.currentPhilosophers?.split(',').slice(0, 2).join(', ')}
                    </p>
                  </a>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Footer Contemplation */}
      <section className={styles.footer}>
        <p className={styles.footerText}>
          "A filosofia é um diálogo entre aqueles que pensam,<br />
um ritual de reflexão que nos conduz à verdade."
        </p>
        <p className={styles.footerSmall}>© 2025 Diário Filosófico • Desenvolvido com reflexões</p>
      </section>
    </div>
  );
};

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: { posts },
    revalidate: 3600,
  };
}

export default Home;
