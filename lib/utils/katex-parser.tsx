import React from "react";
import katex from "katex";

interface KatexRendererProps {
  content: string;
  className?: string;
}

export const KatexRenderer: React.FC<KatexRendererProps> = ({ content, className = "" }) => {
  if (!content) return null;

  // Split content by display math $$...$$ and inline math $...$
  const parts = content.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          const math = part.slice(2, -2);
          try {
            const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
            return <span key={index} dangerouslySetInnerHTML={{ __html: html }} className="block my-2" />;
          } catch {
            return <code key={index}>{part}</code>;
          }
        } else if (part.startsWith("$") && part.endsWith("$")) {
          const math = part.slice(1, -1);
          try {
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
            return <span key={index} dangerouslySetInnerHTML={{ __html: html }} className="inline-block mx-0.5" />;
          } catch {
            return <code key={index}>{part}</code>;
          }
        } else {
          return <span key={index}>{part}</span>;
        }
      })}
    </span>
  );
};
