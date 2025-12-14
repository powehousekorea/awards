import Link from 'next/link';
import { reader } from '@/lib/reader';

const awardTypeOrder = ['grand', 'excellence', 'merit', 'special'];

const getAwardBadge = (type: string) => {
  switch (type) {
    case 'grand':
      return { label: '대상', className: 'badge-grand' };
    case 'excellence':
      return { label: '최우수상', className: 'badge-excellence' };
    case 'merit':
      return { label: '우수상', className: 'badge-merit' };
    case 'special':
      return { label: '특별상', className: 'badge-special' };
    default:
      return { label: '수상', className: 'badge-merit' };
  }
};

export default async function AwardsPage() {
  const awards = await reader.collections.awards.all();

  // 연도별로 그룹화
  const awardsByYear = awards.reduce((acc, award) => {
    const year = award.entry.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(award);
    return acc;
  }, {} as Record<number, typeof awards>);

  // 연도 내림차순 정렬
  const sortedYears = Object.keys(awardsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-[#0d0a07] pt-28 md:pt-32">
      <div className="container-custom py-8 lg:py-12 px-4 md:px-0">
        {/* Header */}
        <div className="mb-14 md:mb-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">Hall of Fame</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
            역대 수상작
          </h1>
          <p className="text-dark-400 max-w-2xl mx-auto font-serif">
            대한민국 청년정책 어워즈에서 선정된 우수 정책들을 만나보세요.<br className="hidden md:block" />
            청년들의 삶을 변화시킨 의미있는 정책들입니다.
          </p>
        </div>

        {/* Awards by Year */}
        <div className="space-y-20 md:space-y-28">
          {sortedYears.map((year) => {
            const yearAwards = awardsByYear[year].sort((a, b) => {
              const aOrder = awardTypeOrder.indexOf(a.entry.awardType);
              const bOrder = awardTypeOrder.indexOf(b.entry.awardType);
              return aOrder - bOrder;
            });

            return (
              <section key={year}>
                {/* Year Header */}
                <div className="flex items-center gap-6 mb-10 md:mb-14">
                  <h2 className="text-5xl md:text-6xl font-serif font-bold text-gold-500">
                    {year}
                  </h2>
                  <div className="flex-1">
                    <div className="h-px bg-gradient-to-r from-gold-500/30 to-transparent mb-2" />
                    <p className="text-dark-500 text-sm tracking-wide">
                      {yearAwards.length}개 정책 선정
                    </p>
                  </div>
                </div>

                {/* Awards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {yearAwards.map((award) => {
                    const badge = getAwardBadge(award.entry.awardType);
                    return (
                      <Link
                        key={award.slug}
                        href={`/awards/${award.slug}`}
                        className="group block"
                      >
                        <div className="border border-dark-700/50 hover:border-gold-500/30 p-6 md:p-8 transition-all duration-300">
                          <div className="flex items-start justify-between mb-4">
                            <span className={`badge ${badge.className} text-xs`}>
                              {badge.label}
                            </span>
                            {award.entry.votePercentage && (
                              <span className="text-gold-500 text-sm font-serif">
                                {award.entry.votePercentage}%
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                            {award.entry.title}
                          </h3>

                          <p className="text-dark-400 text-sm mb-4">
                            {award.entry.provider}
                          </p>

                          {award.entry.summary && (
                            <p className="text-dark-500 text-sm line-clamp-2 leading-relaxed">
                              {award.entry.summary}
                            </p>
                          )}

                          <div className="mt-6 pt-4 border-t border-dark-800 flex items-center justify-between">
                            <span className="text-dark-500 text-xs tracking-wide group-hover:text-gold-400 transition-colors">
                              자세히 보기
                            </span>
                            <svg className="w-4 h-4 text-gold-500/50 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {sortedYears.length === 0 && (
          <div className="text-center py-20 border border-dark-700/50">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/30" />
              <div className="w-3 h-3 border border-gold-500/30 rotate-45" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/30" />
            </div>
            <p className="text-lg text-dark-400 font-serif">
              아직 등록된 수상작이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
