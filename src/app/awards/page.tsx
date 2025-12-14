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
    <div className="min-h-screen bg-dark-950 bg-noise pt-28 md:pt-32">
      <div className="container-custom py-10 lg:py-16 px-4 md:px-0">
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center">
          <div className="flex items-center justify-center gap-5 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold-500/25" />
            <span className="text-gold-400/70 text-[10px] tracking-[0.4em] uppercase">Hall of Fame</span>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold-500/25" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-100 mb-6">
            역대 수상작
          </h1>
          <p className="text-dark-400 max-w-xl mx-auto font-light leading-loose text-sm">
            대한민국 청년정책 어워즈에서 선정된 우수 정책들을 만나보세요.<br className="hidden md:block" />
            청년들의 삶을 변화시킨 의미있는 정책들입니다.
          </p>
        </div>

        {/* Awards by Year */}
        <div className="space-y-24 md:space-y-32">
          {sortedYears.map((year) => {
            const yearAwards = awardsByYear[year].sort((a, b) => {
              const aOrder = awardTypeOrder.indexOf(a.entry.awardType);
              const bOrder = awardTypeOrder.indexOf(b.entry.awardType);
              return aOrder - bOrder;
            });

            return (
              <section key={year}>
                {/* Year Header */}
                <div className="flex items-center gap-8 mb-12 md:mb-16">
                  <h2 className="text-5xl md:text-6xl font-serif font-bold text-gold-400/80">
                    {year}
                  </h2>
                  <div className="flex-1">
                    <div className="h-px bg-gradient-to-r from-gold-500/20 to-transparent mb-3" />
                    <p className="text-dark-600 text-[10px] tracking-[0.2em] uppercase">
                      {yearAwards.length} policies selected
                    </p>
                  </div>
                </div>

                {/* Awards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {yearAwards.map((award) => {
                    const badge = getAwardBadge(award.entry.awardType);
                    return (
                      <Link
                        key={award.slug}
                        href={`/awards/${award.slug}`}
                        className="group block"
                      >
                        <div className="border border-dark-800/50 hover:border-gold-500/20 p-8 md:p-10 transition-luxury bg-dark-950/50">
                          <div className="mb-5">
                            <span className={`badge ${badge.className}`}>
                              {badge.label}
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-dark-200 mb-3 group-hover:text-gold-300 transition-luxury tracking-tight">
                            {award.entry.title}
                          </h3>

                          <p className="text-dark-500 text-sm mb-4 font-light">
                            {award.entry.provider}
                          </p>

                          {award.entry.summary && (
                            <p className="text-dark-500 text-sm line-clamp-2 leading-relaxed font-light">
                              {award.entry.summary}
                            </p>
                          )}

                          <div className="mt-8 pt-5 border-t border-dark-800/30 flex items-center justify-between">
                            <span className="text-dark-600 text-[10px] tracking-[0.2em] uppercase group-hover:text-gold-400/70 transition-luxury">
                              View Details
                            </span>
                            <svg className="w-4 h-4 text-gold-500/30 group-hover:text-gold-500/60 group-hover:translate-x-1 transition-luxury" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
          <div className="text-center py-24 border border-dark-800/30">
            <div className="flex items-center justify-center gap-5 mb-10">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold-500/20" />
              <div className="w-2.5 h-2.5 border border-gold-500/30 rotate-45" />
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold-500/20" />
            </div>
            <p className="text-base text-dark-500 font-light">
              아직 등록된 수상작이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
