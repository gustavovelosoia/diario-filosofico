import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

export default async function handler(req, res) {
  const { slug } = req.query;

  // Autenticação básica (senha no header)
  const authHeader = req.headers.authorization;
  const validPassword = process.env.ADMIN_PASSWORD || 'filosof1a2025';
  
  if (!authHeader || authHeader !== `Bearer ${validPassword}`) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  if (req.method === 'GET') {
    try {
      const filePath = path.join(postsDir, `${slug}.md`);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Reflexão não encontrada' });
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      return res.status(200).json({ content, slug });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar reflexão' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
