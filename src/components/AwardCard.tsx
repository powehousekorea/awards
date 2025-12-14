import Link from 'next/link';

interface AwardCardProps {
  slug: string;
  title: string;
  year: number;
  awardType: string;
  category?: string;
  categoryIcon?: string;
  provider: string;
  summary: string;
  votePercentage?: number;
}

const awardTypeConfig: Record<string, { label: string; className: string; icon: string }> = {
  grand: { label: '대상', className: 'badge-grand', icon: '🏆' },
  excellence: { label: '최우수상', className: 'badge-excellence', icon: '🥇' },
  merit: { label: '우수상', className: 'badge-merit', icon: '🥈' },
  special: { label: '특별상', className: 'badge-special', icon: '⭐' },
};

export default function AwardCard({
  slug,
  title,
  year,
  awardType,
  category,
  categoryIcon,
  provider,
  summary,
  votePercentage,
}: AwardCardProps) {
  const awardInfo = awardTypeConfig[awardType] || awardTypeConfig.grand;

  return (
    <Link href={`/awards/${slug}`} className="block group">
      <article className="card-premium rounded-2xl overflow-hidden h-full flex flex-col card-hover">
        {/* Award Type Header */}
        <div className={`px-5 py-4 ${
          awardType === 'grand'
            ? 'bg-gradient-to-r from-gold-400 to-gold-600'
            : awardType === 'excellence'
            ? 'bg-gradient-to-r from-silver-400 to-silver-500'
            : awardType === 'merit'
            ? 'bg-gradient-to-r from-bronze-400 to-bronze-500'
            : 'bg-gradient-to-r from-purple-500 to-purple-700'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-3xl">{awardInfo.icon}</span>
            <div className="text-right">
              <p className={`font-bold ${awardType === 'grand' ? 'text-dark-950' : 'text-white'}`}>
                {year}년
              </p>
              <p className={`text-sm font-semibold ${awardType === 'grand' ? 'text-dark-800' : 'text-white/80'}`}>
                {awardInfo.label}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow bg-dark-900/50">
          {/* Category & Vote */}
          <div className="flex items-center justify-between mb-3">
            {category && (
              <div className="flex items-center gap-2">
                {categoryIcon && <span className="text-lg">{categoryIcon}</span>}
                <span className="text-sm font-medium text-dark-400">{category}</span>
              </div>
            )}
            {votePercentage && (
              <span className="text-gold-400 text-sm font-bold">
                {votePercentage}%
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg text-white mb-2 line-clamp-2 group-hover:text-gold-400 transition-colors">
            {title}
          </h3>

          {/* Provider */}
          <p className="text-sm text-dark-400 mb-3">
            {provider}
          </p>

          {/* Summary */}
          <p className="text-sm text-dark-500 line-clamp-3 flex-grow">
            {summary}
          </p>

          {/* View More */}
          <div className="mt-4 pt-4 border-t border-dark-800 flex items-center justify-between">
            <span className="text-dark-500 text-xs group-hover:text-gold-400 transition-colors">
              자세히 보기
            </span>
            <svg className="w-4 h-4 text-gold-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
