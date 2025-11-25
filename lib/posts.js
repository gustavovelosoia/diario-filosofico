import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDir = path.join(process.cwd(), 'posts');

// Configuração do marked para renderização segura
marked.setOptions({
  breaks: true,
  gfm: true,
});

export function getAllPosts() {
  if (!fs.existsSync(postsDir)) return [];
  
  const files = fs.readdirSync(postsDir);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      
      // Garantir que date seja string
      const dateStr = typeof data.date === 'object' 
        ? data.date.toISOString().split('T')[0] 
        : (data.date || new Date().toISOString().split('T')[0]);
      
      // Extrair excerpt dos primeiros parágrafos do conteúdo
      const plainText = content.replace(/^#+\s/gm, '').replace(/\*\*/g, '');
      const excerpt = plainText
        .split('\n\n')
        .find(p => p.trim().length > 50 && !p.startsWith('#') && !p.startsWith('---'))
        ?.substring(0, 150)
        .trim() || '';
      
      return { 
        ...data,
        date: dateStr,
        excerpt: excerpt + (excerpt.length >= 150 ? '...' : ''),
        content: content, // Mantém o markdown puro
        contentHtml: marked(content), // Adiciona versão HTML
        slug: file.replace('.md', '') 
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug);
}
