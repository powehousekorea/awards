import Link from 'next/link';
import { CategoryBadge, StatusBadge } from '@/components/ui/Badge';

interface NoticeListItemProps {
  slug: string;
  rowNumber: number;
  title: string;
  category: string;
  date: string;
  isImportant?: boolean;
}

export default function NoticeListItem({
  slug,
  rowNumber,
  title,
  category,
  date,
  isImportant = false,
}: NoticeListItemProps) {
  return (
    <Link
      href={`/notice/${slug}`}
      className="
        group relative flex flex-col md:flex-row md:items-center
        py-5 px-6 border-b border-[#252525] last:border-b-0
        transition-all duration-300 ease-out
        hover:bg-gradient-to-r hover:from-[#1f1f1f] hover:to-transparent
        hover:border-gold-500/20
      "
    >
      {/* Hover indicator line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold-400 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

      {/* Number - Desktop */}
      <div className="hidden md:block w-16 text-center">
        <span className="text-[11px] font-mono text-gray-600 group-hover:text-gray-500 transition-colors">
          {String(rowNumber).padStart(2, '0')}
        </span>
      </div>

      {/* Category Badge */}
      <div className="md:w-28 md:text-center mb-2 md:mb-0">
        <CategoryBadge value={category} size="md" />
      </div>

      {/* Title */}
      <div className="flex-1 md:px-4 flex items-center gap-2">
        <h3 className="text-[15px] text-gray-200 font-medium group-hover:text-gold-300 transition-colors duration-300 leading-snug tracking-tight">
          {title}
        </h3>
        {isImportant && (
          <StatusBadge value="new" />
        )}
      </div>

      {/* Date & Arrow */}
      <div className="mt-2 md:mt-0 md:w-40 flex items-center justify-end gap-4">
        <span className="text-[11px] font-mono text-gray-500 tracking-wide">
          {date}
        </span>
        <span className="hidden md:block text-gray-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gold-400 transition-all duration-300">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
