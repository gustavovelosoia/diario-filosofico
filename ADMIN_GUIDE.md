# 📜 Guia do Painel de Administração - Diário Filosófico

## 🔑 Acesso ao Painel

**URL:** `https://seu-site.vercel.app/admin`

**Senha padrão:** `filosof1a2025`

### Como mudar a senha

1. Acesse o painel da Vercel
2. Vá em **Settings** > **Environment Variables**
3. Adicione a variável:
   - **Name:** `ADMIN_PASSWORD`
   - **Value:** sua-nova-senha
4. Clique em **Save**
5. Faça um novo deploy ou aguarde o próximo deploy automático

---

## ✨ Funcionalidades

### 1️⃣ Visualizar Reflexões

- Todas as reflexões aparecem na barra lateral esquerda
- Clique em qualquer reflexão para visualizar/editar o conteúdo
- As reflexões mais recentes aparecem no topo

### 2️⃣ Criar Nova Reflexão

1. Clique no botão **+ Nova** no topo da sidebar
2. Preencha o **Slug** (nome do arquivo):
   - Formato: `YYYY-MM-DD-titulo-separado-por-hifens`
   - Exemplo: `2025-11-26-virtude-etica-aristoteles`
3. Cole o conteúdo Markdown no editor
4. Clique em **✅ Salvar**

### 3️⃣ Editar Reflexão Existente

1. Clique na reflexão que deseja editar
2. O conteúdo aparecerá no editor
3. Faça as alterações necessárias
4. Clique em **✅ Salvar**

### 4️⃣ Deletar Reflexão

1. Passe o mouse sobre a reflexão na sidebar
2. Clique no ícone 🗑️ que aparece
3. Confirme a deleção

---

## 📝 Formato do Markdown

Cada reflexão deve seguir este formato:

```markdown
---
title: "Título da Reflexão"
date: 2025-11-26
currentPhilosophers: "Filósofo 1, Filósofo 2, Filósofo 3"
poetic Intro: false
---

# Título da Reflexão

**26 de novembro de 2025** | Filósofos: Aristóteles, Platão

---

## Introdução Poética

[Texto contemplativo e poético que introduz o tema...]

---

## Corrente Filosófica do Dia

[Explicação da corrente filosófica...]

---

## Citação Principal

> “Texto da citação...”
>
> — **Autor**

---

## Sobre os Pensadores

### **Nome do Filósofo (Anos de vida)**

[Biografia e contribuições...]

### **Outro Filósofo (Anos)**

[Biografia...]

---

## Imagem Contemplativa

![Descrição da imagem](URL_DA_IMAGEM)

*Legenda contemplativa da imagem.*

---

## Leituras Recomendadas

1. **Autor** - *Título da Obra* (Ano). Descrição.

2. **Autor** - *Título* (Ano). Descrição.

---

## Ritual Contemplativo

### **Exercício: Título do Exercício**

[Instruções passo a passo do exercício de reflexão...]

---

## Seu Espaço de Reflexão

*[Deixe este espaço vazio para suas próprias notas e reflexões]*

---

## Frase de Encerramento

“[Frase contemplativa final...]”

---

## Referências e Fontes

- [Stanford Encyclopedia: Link](URL)
- [Project Gutenberg: Link](URL)
```

---

## 📥 Workflow com Perplexity

### Como adicionar reflexões diárias do Perplexity:

1. **Receba o .md do Perplexity pela manhã**
   - O arquivo virá no formato correto

2. **Abra o conteúdo do arquivo**
   - Abra o arquivo .md em qualquer editor de texto
   - Copie TODO o conteúdo (Ctrl+A, Ctrl+C)

3. **Acesse o painel admin**
   - Vá para `https://seu-site.vercel.app/admin`
   - Faça login com a senha

4. **Crie nova reflexão**
   - Clique em **+ Nova**
   - No campo Slug, use o formato: `2025-11-26-nome-do-tema`
   - Cole todo o conteúdo Markdown no editor
   - Clique em **✅ Salvar**

5. **Verifique o site**
   - Clique em 🌐 **Ver Site** no canto superior
   - A nova reflexão aparecerá automaticamente

---

## 📦 Adicionar do Obsidian

### Para adicionar suas próprias reflexões do Obsidian:

1. **Exporte a nota do Obsidian**
   - Abra a nota no Obsidian
   - Copie todo o conteúdo
   - **Importante:** Certifique-se de que tem o frontmatter (cabeçalho entre `---`)

2. **Adicione o frontmatter se necessário**
   ```markdown
   ---
   title: "Título"
   date: 2025-11-26
   currentPhilosophers: "Lista de filósofos"
   poeticIntro: false
   ---
   ```

3. **Siga o mesmo processo**
   - Painel admin > + Nova
   - Slug no formato correto
   - Cole o conteúdo
   - Salvar

---

## ⚠️ Dicas Importantes

### Formato do Slug
✅ **Correto:** `2025-11-26-estoicismo-seneca`
❌ **Errado:** `Estoicismo Sêneca`, `26-11-2025`, `estoicismo_seneca`

### Frontmatter (cabeçalho)
- Sempre começa e termina com `---`
- Campos obrigatórios: `title`, `date`, `currentPhilosophers`
- Data no formato: `YYYY-MM-DD`

### Imagens
- Use URLs completas (Unsplash, etc.)
- Formato: `![Descrição](URL)`
- Adicione legenda em itálico abaixo: `*Legenda...*`

### Citações
- Use `>` para blockquotes
- Sempre cite o autor: `— **Nome do Autor**`

---

## 🔧 Troubleshooting

### Problema: "Não autorizado"
**Solução:** Verifique se está usando a senha correta. Se mudou a senha na Vercel, aguarde o deploy.

### Problema: Reflexão não aparece no site
**Solução:** 
1. Verifique se o slug está no formato correto
2. Verifique se o frontmatter está correto
3. Aguarde alguns segundos e recarregue a página
4. Se persistir, faça um novo deploy na Vercel

### Problema: Erro ao salvar
**Solução:**
1. Verifique se o frontmatter tem as `---` no início e fim
2. Verifique se não há caracteres especiais no slug
3. Tente com um slug diferente

---

## 📞 Suporte

Para problemas técnicos:
1. Verifique o console do navegador (F12)
2. Verifique os logs de deploy na Vercel
3. Certifique-se de que todas as variáveis de ambiente estão configuradas

---

**Desenvolvido para facilitar sua jornada filosófica diária** 📚✨
