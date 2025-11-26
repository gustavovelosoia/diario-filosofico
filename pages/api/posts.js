import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

export default async function handler(req, res) {
  // Autenticação básica (senha no header)

  if (req.method === 'GET') {
    // Listar todas as reflexões
    try {
      if (!fs.existsSync(postsDir)) {
        fs.mkdirSync(postsDir, { recursive: true });
      }
      
      const files = fs.readdirSync(postsDir);
      const posts = files
        .filter(file => file.endsWith('.md'))
        .map(file => {
          const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
          const { data } = matter(content);
          return {
            slug: file.replace('.md', ''),
            title: data.title,
            date: data.date,
            currentPhilosophers: data.currentPhilosophers
          };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      
      return res.status(200).json({ posts });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar reflexões' });
    }
  }

  if (req.method === 'POST') {
    // Criar nova reflexão
    try {
      const { slug, content } = req.body;
      
      if (!slug || !content) {
        return res.status(400).json({ error: 'Slug e conteúdo são obrigatórios' });
      }

      const filePath = path.join(postsDir, `${slug}.md`);
      
      if (fs.existsSync(filePath)) {
        return res.status(409).json({ error: 'Reflexão já existe' });
      }

      fs.writeFileSync(filePath, content, 'utf-8');
      return res.status(201).json({ message: 'Reflexão criada com sucesso', slug });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar reflexão' });
    }
  }

  if (req.method === 'PUT') {
    // Atualizar reflexão existente
    try {
      const { slug, content } = req.body;
      
      if (!slug || !content) {
        return res.status(400).json({ error: 'Slug e conteúdo são obrigatórios' });
      }

      const filePath = path.join(postsDir, `${slug}.md`);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Reflexão não encontrada' });
      }

      fs.writeFileSync(filePath, content, 'utf-8');
      return res.status(200).json({ message: 'Reflexão atualizada com sucesso', slug });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar reflexão' });
    }
  }

  if (req.method === 'DELETE') {
    // Deletar reflexão
    try {
      const { slug } = req.body;
      
      if (!slug) {
        return res.status(400).json({ error: 'Slug é obrigatório' });
      }

      const filePath = path.join(postsDir, `${slug}.md`);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Reflexão não encontrada' });
      }

      fs.unlinkSync(filePath);
      return res.status(200).json({ message: 'Reflexão deletada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar reflexão' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
