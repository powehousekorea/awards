import Link from 'next/link';
import { AwardBadge } from '@/components/ui/Badge';

interface AwardCardProps {
  slug: string;
  title: string;
  year: number;
  awardType: string;
  category?: string;
  categoryIcon?: string;
  provider: string;
  summary: string;
}

export default function AwardCard({
  slug,
  title,
  year,
  awardType,
  category,
  provider,
  summary,
}: AwardCardProps) {
  return (
    <Link href={`/awards/${slug}`} className="block group">
      <article className="border border-dark-800/50 hover:border-gold-500/20 h-full flex flex-col transition-luxury bg-dark-950/50">
        {/* Award Type Header */}
        <div className={`px-6 py-5 border-b border-dark-800/30 ${
          awardType === 'grand'
            ? 'bg-gradient-to-r from-gold-500/10 to-transparent'
            : awardType === 'excellence'
            ? 'bg-gradient-to-r from-silver-400/5 to-transparent'
            : awardType === 'merit'
            ? 'bg-gradient-to-r from-bronze-400/5 to-transparent'
            : 'bg-gradient-to-r from-purple-500/5 to-transparent'
        }`}>
          <div className="flex items-center justify-between">
            {/* Geometric Icon */}
            <div className={`w-8 h-8 border flex items-center justify-center ${
              awardType === 'grand' ? 'border-gold-500/30' : 'border-dark-700/50'
            }`}>
              <div className={`w-3 h-3 border rotate-45 ${
                awardType === 'grand' ? 'border-gold-500/50' : 'border-dark-600/50'
              }`} />
            </div>
            <div className="text-right">
              <p className="font-serif font-bold text-dark-200 text-sm">
                {year}
              </p>
              <AwardBadge value={awardType} size="sm" className="mt-1" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Category */}
          {category && (
            <div className="mb-4">
              <span className="text-[10px] font-light text-dark-500 tracking-[0.15em] uppercase">{category}</span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-bold text-base text-dark-200 mb-3 line-clamp-2 group-hover:text-gold-300 transition-luxury tracking-tight">
            {title}
          </h3>

          {/* Provider */}
          <p className="text-sm text-dark-500 mb-4 font-light">
            {provider}
          </p>

          {/* Summary */}
          <p className="text-sm text-dark-500 line-clamp-3 flex-grow font-light leading-relaxed">
            {summary}
          </p>

          {/* View More */}
          <div className="mt-6 pt-5 border-t border-dark-800/30 flex items-center justify-between">
            <span className="text-dark-600 text-[10px] tracking-[0.2em] uppercase group-hover:text-gold-400/70 transition-luxury">
              View Details
            </span>
            <svg className="w-4 h-4 text-gold-500/30 group-hover:text-gold-500/60 group-hover:translate-x-1 transition-luxury" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
