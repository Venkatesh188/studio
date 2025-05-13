
import type { ReactNode } from 'react';

interface HtmlRendererProps {
  htmlString: string | undefined | null;
  className?: string;
}

export function RenderHtmlContent({ htmlString, className }: HtmlRendererProps): ReactNode {
  if (!htmlString) return null;

  // Default prose classes provide basic styling for HTML elements.
  // Users can override or extend this with the className prop.
  const defaultClassName = "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-ul:text-foreground/90 prose-ol:text-foreground/90 prose-li:text-foreground/90 dark:prose-invert";
  
  return (
    <div
      className={cn(defaultClassName, className)}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
}

// Helper function to combine class names, useful if className prop is provided
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
