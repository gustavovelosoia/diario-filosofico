// Parser de markdown otimizado para o Diário Filosófico
export function parseMarkdown(markdown) {
  if (!markdown) return '';

  let html = markdown;

  // Blockquotes (> texto)
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  
  // Headers (deve vir antes de paragraphs)
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr />');
  
  // Lists (unordered)
  const ulRegex = /(^- .+$\n?)+/gm;
  html = html.replace(ulRegex, (match) => {
    const items = match.split('\n').filter(line => line.trim()).map(line => {
      const text = line.replace(/^- /, '');
      return `<li>${text}</li>`;
    }).join('\n');
    return `<ul>\n${items}\n</ul>\n`;
  });
  
  // Lists (ordered)
  const olRegex = /(^\d+\. .+$\n?)+/gm;
  html = html.replace(olRegex, (match) => {
    const items = match.split('\n').filter(line => line.trim()).map(line => {
      const text = line.replace(/^\d+\. /, '');
      return `<li>${text}</li>`;
    }).join('\n');
    return `<ol>\n${items}\n</ol>\n`;
  });
  
  // Images (deve vir antes de links)
  html = html.replace(/!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Italic (deve vir depois de bold para evitar conflitos)
  html = html.replace(/\*([^*]+?)\*/g, '<em>$1</em>');
  
  // Code blocks (```)
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Paragraphs (divide por linhas duplas)
  const lines = html.split('\n\n');
  html = lines.map(line => {
    line = line.trim();
    // Não envolve em <p> se já é um elemento de bloco
    if (
      line.startsWith('<h') ||
      line.startsWith('<ul') ||
      line.startsWith('<ol') ||
      line.startsWith('<blockquote') ||
      line.startsWith('<hr') ||
      line.startsWith('<pre') ||
      line.startsWith('<img') ||
      line === ''
    ) {
      return line;
    }
    return `<p>${line.replace(/\n/g, '<br />')}</p>`;
  }).join('\n\n');

  return html;
}
