import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Renders context.md. remark-gfm adds tables, task lists, strikethrough
 * and autolinks. Styling lives in the `.md` layer in index.css.
 */
export default function MarkdownViewer({ source }: { source: string }) {
  return (
    <div className="md">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
    </div>
  );
}
