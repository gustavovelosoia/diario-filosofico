// Parser simples de markdown para HTML
export function parseMarkdown(markdown) {
  if (!markdown) return '';

  let html = markdown
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Images
    .replace(/!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />')
    
    // Horizontal rules
    .replace(/^---$/gm, '<hr />')
    
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br />');

  // Wrap in paragraphs
  html = '<p>' + html + '</p>';
  
  // Fix multiple paragraph tags
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[1-6]>)/g, '$1');
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<hr \/>)<\/p>/g, '$1');
  html = html.replace(/<p>(<img [^>]+>)<\/p>/g, '$1');

  // Handle blockquotes (simple version)
  html = html.replace(/<p>&gt; (.+?)<\/p>/g, '<blockquote>$1</blockquote>');
  
  // Handle lists (basic)
  html = html.replace(/<p>- (.+?)<br \/>/g, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  html = html.replace(/<p>(\d+)\. (.+?)<br \/>/g, '<li>$2</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');

  return html;
}
