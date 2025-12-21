import { formatDate } from '@/lib/format';

interface ArticleInfoProps {
  date?: string | null;
  category?: string;
  categoryLabel?: string;
  author?: string;
}

export default function ArticleInfo({
  date,
  category,
  categoryLabel,
  author = '청년정책 어워즈',
}: ArticleInfoProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-5">
      <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-4">
        Article Info
      </h3>
      <dl className="space-y-3">
        {date && (
          <div className="flex items-center justify-between">
            <dt className="text-xs text-gray-500">Date</dt>
            <dd className="text-sm text-gray-300 font-mono">{formatDate(date)}</dd>
          </div>
        )}
        {(category || categoryLabel) && (
          <div className="flex items-center justify-between">
            <dt className="text-xs text-gray-500">Category</dt>
            <dd className="text-sm text-gold-400">{categoryLabel || category}</dd>
          </div>
        )}
        <div className="flex items-center justify-between">
          <dt className="text-xs text-gray-500">Author</dt>
          <dd className="text-sm text-gray-300">{author}</dd>
        </div>
      </dl>
    </div>
  );
}
