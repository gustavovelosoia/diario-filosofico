import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Admin.module.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newSlug, setNewSlug] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('adminAuth');
    if (savedAuth) {
      setIsAuthenticated(true);
      setPassword(savedAuth);
      loadPosts(savedAuth);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    sessionStorage.setItem('adminAuth', password);
    setIsAuthenticated(true);
    loadPosts(password);
  };

  const loadPosts = async (pass) => {
    setLoading(true);
    try {
      const res = await fetch('/api/posts', {
        headers: { Authorization: `Bearer ${pass}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
      } else {
        setMessage('❌ Senha inválida');
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminAuth');
      }
    } catch (error) {
      setMessage('❌ Erro ao carregar reflexões');
    }
    setLoading(false);
  };

  const loadPostContent = async (slug) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/post/${slug}`, {
        headers: { Authorization: `Bearer ${password}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setMarkdownContent(data.content);
        setSelectedPost(slug);
        setIsCreatingNew(false);
      }
    } catch (error) {
      setMessage('❌ Erro ao carregar conteúdo');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    const slug = isCreatingNew ? newSlug : selectedPost;
    
    if (!slug || !markdownContent) {
      setMessage('❌ Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const method = isCreatingNew ? 'POST' : 'PUT';
      const res = await fetch('/api/posts', {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`
        },
        body: JSON.stringify({ slug, content: markdownContent })
      });

      if (res.ok) {
        setMessage('✅ Reflexão salva com sucesso!');
        loadPosts(password);
        
        if (isCreatingNew) {
          setIsCreatingNew(false);
          setNewSlug('');
        }
      } else {
        const error = await res.json();
        setMessage(`❌ ${error.error}`);
      }
    } catch (error) {
      setMessage('❌ Erro ao salvar');
    }
    setLoading(false);
  };

  const handleDelete = async (slug) => {
    if (!confirm('Tem certeza que deseja deletar esta reflexão?')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`
        },
        body: JSON.stringify({ slug })
      });

      if (res.ok) {
        setMessage('✅ Reflexão deletada');
        loadPosts(password);
        setSelectedPost(null);
        setMarkdownContent('');
      }
    } catch (error) {
      setMessage('❌ Erro ao deletar');
    }
    setLoading(false);
  };

  const startNewPost = () => {
    setIsCreatingNew(true);
    setSelectedPost(null);
    setMarkdownContent(getTemplate());
    setNewSlug('');
  };

  const getTemplate = () => {
    const today = new Date().toISOString().split('T')[0];
    return `---
title: "Título da Reflexão"
date: ${today}
currentPhilosophers: "Filósofo 1, Filósofo 2"
poetic Intro: false
---

# Título da Reflexão

**${new Date().toLocaleDateString('pt-BR')}** | Filósofos: [Lista]

---

## Introdução Poética

[Texto contemplativo...]

---

## Corrente Filosófica do Dia

[Conteúdo...]

---

## Citação Principal

> “Citação...”
>
> — **Autor**

---

## Sobre os Pensadores

### **Nome (Anos)**

[Biografia...]

---

## Imagem Contemplativa

![Descrição](URL)

*Legenda da imagem.*

---

## Leituras Recomendadas

1. **Autor** - *Título* (Ano).

---

## Ritual Contemplativo

### **Exercício: Título**

[Instruções...]

---

## Seu Espaço de Reflexão

*[Deixe este espaço vazio para suas próprias notas e reflexões]*

---

## Frase de Encerramento

“[Frase final...]”

---

## Referências e Fontes

- [Link]
`;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setPosts([]);
    setSelectedPost(null);
    setMarkdownContent('');
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <Head>
          <title>Admin - Diário Filosófico</title>
        </Head>
        
        <div className={styles.loginBox}>
          <h1 className={styles.loginTitle}>📜 Diário Filosófico</h1>
          <h2 className={styles.loginSubtitle}>Painel de Administração</h2>
          
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input
              type="password"
              placeholder="Senha de acesso"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.loginInput}
              autoFocus
            />
            <button type="submit" className={styles.loginButton}>
              Entrar
            </button>
          </form>
          
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Admin - Diário Filosófico</title>
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>📜 Diário Filosófico - Admin</h1>
        <div className={styles.headerActions}>
          <a href="/" className={styles.viewSiteButton} target="_blank" rel="noopener">
            🌐 Ver Site
          </a>
          <button onClick={handleLogout} className={styles.logoutButton}>
            🚪 Sair
          </button>
        </div>
      </header>

      <div className={styles.layout}>
        {/* Sidebar com lista de reflexões */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Reflexões</h2>
            <button onClick={startNewPost} className={styles.newButton}>
              + Nova
            </button>
          </div>
          
          {loading && posts.length === 0 ? (
            <p className={styles.loadingText}>Carregando...</p>
          ) : (
            <ul className={styles.postsList}>
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className={`${styles.postItem} ${
                    selectedPost === post.slug ? styles.postItemActive : ''
                  }`}
                  onClick={() => loadPostContent(post.slug)}
                >
                  <div className={styles.postItemTitle}>{post.title}</div>
                  <div className={styles.postItemDate}>
                    {new Date(post.date).toLocaleDateString('pt-BR')}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post.slug);
                    }}
                    className={styles.deleteButton}
                    title="Deletar"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Editor */}
        <main className={styles.editor}>
          {(selectedPost || isCreatingNew) ? (
            <>
              <div className={styles.editorHeader}>
                {isCreatingNew ? (
                  <div className={styles.slugInput}>
                    <label>Slug (nome do arquivo):</label>
                    <input
                      type="text"
                      placeholder="2025-11-25-titulo-da-reflexao"
                      value={newSlug}
                      onChange={(e) => setNewSlug(e.target.value)}
                      className={styles.input}
                    />
                    <small>Formato: YYYY-MM-DD-titulo-separado-por-hifens</small>
                  </div>
                ) : (
                  <h3>Editando: {selectedPost}</h3>
                )}
              </div>

              <textarea
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
                className={styles.textarea}
                placeholder="Cole aqui o conteúdo Markdown..."
              />

              <div className={styles.editorActions}>
                <button
                  onClick={handleSave}
                  className={styles.saveButton}
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : '✅ Salvar'}
                </button>
                
                {message && <span className={styles.message}>{message}</span>}
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <p>📝 Selecione uma reflexão para editar ou crie uma nova</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
