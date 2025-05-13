
import type { ReactNode } from 'react';

interface HtmlRendererProps {
  htmlString: string | undefined | null;
  className?: string;
}

export function RenderHtmlContent({ htmlString, className }: HtmlRendererProps): ReactNode {
  if (!htmlString) return null;

  // Enhanced prose classes for better structure and visual appeal.
  const defaultClassName = cn(
    "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none",
    "prose-headings:text-foreground prose-headings:font-semibold prose-h1:mb-6 prose-h2:mb-4 prose-h3:mb-3 prose-h4:mb-2",
    "prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:my-4",
    "prose-a:text-primary hover:prose-a:text-primary/80 prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
    "prose-strong:text-foreground prose-strong:font-semibold",
    "prose-em:italic",
    "prose-ul:text-foreground/90 prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-li:my-1",
    "prose-ol:text-foreground/90 prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4 prose-li:my-1",
    "prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8 prose-img:mx-auto", // Center images by default, add more margin
    "prose-code:bg-muted prose-code:text-accent-foreground prose-code:px-1.5 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:text-xs",
    "prose-pre:bg-card prose-pre:text-card-foreground prose-pre:p-4 prose-pre:rounded-lg prose-pre:shadow-md prose-pre:overflow-x-auto prose-pre:my-6 prose-pre:text-sm", // Use card for pre background
    "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:pr-2 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:my-6",
    "prose-table:table-auto prose-table:w-full prose-table:my-6 prose-table:shadow-md prose-table:rounded-lg prose-table:overflow-hidden",
    "prose-thead:bg-muted/80 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-foreground",
    "prose-tbody:divide-y prose-tbody:divide-border",
    "prose-tr:border-b prose-tr:border-border hover:prose-tr:bg-muted/50",
    "prose-td:p-3 prose-td:align-baseline prose-td:text-foreground/90",
    "dark:prose-invert", // Ensure dark mode is applied correctly
    "dark:prose-headings:text-primary-foreground", // Example of more specific dark mode styling if needed
    "dark:prose-p:text-primary-foreground/90",
    "dark:prose-strong:text-primary-foreground",
    "dark:prose-ul:text-primary-foreground/90",
    "dark:prose-ol:text-primary-foreground/90",
    "dark:prose-li:text-primary-foreground/90",
    "dark:prose-blockquote:text-muted-foreground",
    "dark:prose-code:bg-primary/20 dark:prose-code:text-primary",
    "dark:prose-pre:bg-background dark:prose-pre:text-primary-foreground/90", // Darker code blocks in dark mode
    "dark:prose-th:text-primary-foreground",
    "dark:prose-td:text-primary-foreground/90",
    "dark:prose-tr:border-border/50 hover:dark:prose-tr:bg-muted/80"
  );
  
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
