import Link from 'next/link';
import { formatDate } from '@/lib/format';

interface RelatedArticle {
  slug: string;
  title: string;
  date?: string | null;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  basePath: string;
  title?: string;
}

export default function RelatedArticles({ articles, basePath, title = 'Related' }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-5">
      <h3 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-4">
        {title}
      </h3>
      <ul className="space-y-3">
        {articles.slice(0, 3).map((article) => (
          <li key={article.slug}>
            <Link
              href={`${basePath}/${article.slug}`}
              className="group block"
            >
              <p className="text-sm text-gray-300 group-hover:text-gold-400 transition-colors line-clamp-2 leading-relaxed">
                {article.title}
              </p>
              {article.date && (
                <p className="text-[10px] font-mono text-gray-600 mt-1">
                  {formatDate(article.date)}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
