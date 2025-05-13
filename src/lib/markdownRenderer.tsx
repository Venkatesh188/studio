
import type { ReactNode } from 'react';

export const renderMarkdown = (markdown: string | undefined | null): ReactNode[] => {
  if (!markdown) return [];

  return markdown
    .split('\n\n').map((paragraph, i) => {
      let processedParagraph = paragraph;

      // Process images first: ![alt text](url)
      processedParagraph = processedParagraph.replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        (match, alt, src) => `<img src="${src}" alt="${alt || ''}" style="max-width: 100%; height: auto; border-radius: 0.5rem; margin-top: 1rem; margin-bottom: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />`
      );
      
      if (processedParagraph.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-semibold mt-6 mb-2 text-foreground">{processedParagraph.substring(4)}</h3>;
      }
      if (processedParagraph.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-semibold mt-8 mb-3 text-foreground">{processedParagraph.substring(3)}</h2>;
      }
      if (processedParagraph.startsWith('# ')) {
         return <h1 key={i} className="text-3xl font-semibold mt-10 mb-4 text-foreground">{processedParagraph.substring(2)}</h1>;
      }

      const createListItems = (itemsText: string, type: 'ul' | 'ol') => {
        const items = itemsText.split('\n').map(item => item.replace(/^(- |\d+\.\s)/, '').trim());
        return items.map((li, idx) => {
            let itemContent = li;
            // Apply inline formatting within list items
            itemContent = itemContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => `<img src="${src}" alt="${alt || ''}" style="max-width: 100%; height: auto; border-radius: 0.5rem; margin: 0.5rem 0;" />`);
            itemContent = itemContent.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>');
            itemContent = itemContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
            itemContent = itemContent.replace(/\*([^*]+)\*/g, '<em>$1</em>');
            return <li key={idx} dangerouslySetInnerHTML={{ __html: itemContent }}></li>;
        });
      };

      if (paragraph.startsWith('- ')) {
          return <ul key={i} className="list-disc list-inside space-y-1 my-4 ml-4 text-foreground/90">{createListItems(paragraph, 'ul')}</ul>
      }
      if (paragraph.match(/^\d+\.\s/)) { 
          return <ol key={i} className="list-decimal list-inside space-y-1 my-4 ml-4 text-foreground/90">{createListItems(paragraph, 'ol')}</ol>
      }
      
      // Apply transformations for links, bold, and italics to the whole paragraph if not already handled (e.g. for images)
      // Ensure image replacement doesn't get re-processed by link logic if alt text has brackets
      if (!processedParagraph.includes('<img')) {
        processedParagraph = processedParagraph.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>');
      }
      processedParagraph = processedParagraph.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      processedParagraph = processedParagraph.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      
      // Handle line breaks within paragraphs only if it's not an image tag already
      if (!processedParagraph.trim().startsWith('<img')) {
        processedParagraph = processedParagraph.replace(/\n/g, '<br />');
      }
      
      // If it's just an image tag after processing, don't wrap in <p>
      if (processedParagraph.trim().startsWith('<img') && processedParagraph.trim().endsWith('/>')) {
        return <div key={i} dangerouslySetInnerHTML={{ __html: processedParagraph.trim() }} />;
      }

      return <p key={i} className="text-foreground/90 leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: processedParagraph }}></p>;

    }).reduce((acc: ReactNode[], elem) => acc.concat(elem), []);
};
