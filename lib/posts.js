import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

export function getAllPosts() {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const { data, content: body } = matter(content);
return { ...data, date: typeof data.date === 'object' ? data.date.toISOString().split('T')[0] : (data.date || new Date().toISOString().split('T')[0]), content: body, slug: file.replace('.md', '') };
    .sort((a, b) => new Date(b.data) - new Date(a.data));
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug);
}
