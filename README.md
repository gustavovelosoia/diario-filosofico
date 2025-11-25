# 📜 Diário Filosófico

Reflexões contemplativas sobre correntes filosóficas, pensadores clássicos e modernos. Uma jornada pela sabedoria dos antigos em atmosfera dark academia com reflexões poéticas e rituais contemplativos.

## ✨ Funcionalidades

- 📖 **Reflexões Diárias** - Conteúdo filosófico profundo e contemplativo
- 🎨 **Design Dark Academia** - Estética vintage e acadêmica
- 📝 **Sistema de Administração** - Painel para adicionar e editar reflexões facilmente
- 📚 **Integração com Obsidian** - Adicione suas próprias notas filosóficas
- ⚡ **Deploy Automático** - Atualizações instantâneas via Vercel

## 🚀 Como Usar

### Visualizar o Site

Acesse: [https://diario-filosofico.vercel.app](https://diario-filosofico.vercel.app)

### Painel de Administração

Para adicionar ou editar reflexões:

1. Acesse: `https://seu-site.vercel.app/admin`
2. Use a senha padrão: `filosof1a2025` (ou a senha que você configurou)
3. Siga o [Guia de Administração completo](ADMIN_GUIDE.md)

## 🛠️ Instalação Local

```bash
# Clone o repositório
git clone https://github.com/gustavovelosoia/diario-filosofico.git

# Entre na pasta
cd diario-filosofico

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local e defina sua ADMIN_PASSWORD

# Execute em modo de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` para ver o site e `http://localhost:3000/admin` para o painel admin.

## 📚 Estrutura do Projeto

```
diario-filosofico/
├── pages/
│   ├── index.jsx          # Página inicial
│   ├── admin.jsx          # Painel de administração
│   ├── [slug].jsx         # Página de reflexão individual
│   └── api/
│       ├── posts.js       # API para gerenciar reflexões
│       └── post/[slug].js # API para buscar reflexão específica
├── posts/                 # Arquivos .md das reflexões
├── lib/
│   └── posts.js           # Funções para processar markdown
├── styles/
│   ├── Home.module.css    # Estilos da home
│   ├── Post.module.css    # Estilos das reflexões
│   ├── Admin.module.css   # Estilos do painel admin
│   └── globals.css        # Estilos globais
└── ADMIN_GUIDE.md        # Guia completo do painel admin
```

## 📝 Formato das Reflexões

Cada reflexão é um arquivo `.md` na pasta `posts/` com o seguinte formato:

```markdown
---
title: "Título da Reflexão"
date: 2025-11-26
currentPhilosophers: "Filósofo 1, Filósofo 2"
poetic Intro: false
---

# Título

[Conteúdo da reflexão...]
```

Veja o [Guia de Administração](ADMIN_GUIDE.md) para detalhes completos sobre o formato.

## 🔐 Segurança

### Configurar Senha Personalizada

1. Acesse a Vercel Dashboard
2. Vá em **Settings** > **Environment Variables**
3. Adicione:
   - **Name:** `ADMIN_PASSWORD`
   - **Value:** `sua-senha-segura`
4. Salve e faça um novo deploy

**Importante:** Nunca commite arquivos `.env` com senhas reais!

## 📥 Workflow de Conteúdo

### Opção 1: Via Painel Admin (Recomendado)

1. Acesse `/admin`
2. Clique em "+ Nova"
3. Cole o markdown do Perplexity ou Obsidian
4. Salve

### Opção 2: Via GitHub

1. Adicione arquivo `.md` na pasta `posts/`
2. Commit e push
3. Vercel fará deploy automático

## 💻 Tecnologias

- **Next.js** - Framework React
- **gray-matter** - Parser de frontmatter
- **Vercel** - Hospedagem e deploy
- **CSS Modules** - Estilização

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

## 📜 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

**Desenvolvido com ❤️ para promover a reflexão filosófica diária**
