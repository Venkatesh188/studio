
import type { ReactNode } from 'react';

export const renderMarkdown = (markdown: string | undefined | null): ReactNode[] => {
  if (!markdown) return [];

  return markdown
    .split('\n\n').map((paragraph, i) => {
      if (paragraph.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-semibold mt-6 mb-2 text-foreground">{paragraph.substring(4)}</h3>;
      }
      if (paragraph.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-semibold mt-8 mb-3 text-foreground">{paragraph.substring(3)}</h2>;
      }
      if (paragraph.startsWith('# ')) {
         return <h1 key={i} className="text-3xl font-semibold mt-10 mb-4 text-foreground">{paragraph.substring(2)}</h1>;
      }
      if (paragraph.startsWith('- ')) {
          const items = paragraph.split('\n').map(item => item.replace(/^- \s*/, ''));
          return <ul key={i} className="list-disc list-inside space-y-1 my-4 ml-4 text-foreground/90">{items.map((li, idx) => <li key={idx} dangerouslySetInnerHTML={{ __html: li.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>') }}></li>)}</ul>
      }
      if (paragraph.match(/^\d+\.\s/)) { 
           const items = paragraph.split('\n').map(item => item.replace(/^\d+\.\s/, ''));
          return <ol key={i} className="list-decimal list-inside space-y-1 my-4 ml-4 text-foreground/90">{items.map((li, idx) => <li key={idx} dangerouslySetInnerHTML={{ __html: li.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>') }}></li>)}</ol>
      }
      
      // Apply transformations for links, bold, and italics to the whole paragraph
      let processedParagraph = paragraph;
      processedParagraph = processedParagraph.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>');
      processedParagraph = processedParagraph.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      processedParagraph = processedParagraph.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      // Handle line breaks within paragraphs
      processedParagraph = processedParagraph.replace(/\n/g, '<br />');

      return <p key={i} className="text-foreground/90 leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: processedParagraph }}></p>;

    }).reduce((acc: ReactNode[], elem) => acc.concat(elem), []);
};
