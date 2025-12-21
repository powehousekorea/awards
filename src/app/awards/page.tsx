import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { reader } from '@/lib/reader';
import {
  getAwardLabel,
  getAwardColor,
  getSectorLabel,
  getAwardTypeOrder,
  getSectorOrder,
} from '@/lib/award-utils';

// Award 타입 정의
type Award = {
  slug: string;
  title: string;
  year: number;
  awardType: string;
  sector: string;
  provider: string;
  officialUrl: string | null;
};

// JSON 파일에서 직접 title을 읽는 함수
async function getAwardTitle(slug: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'src/content/awards', slug, 'index.json');
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    return data.title || 'Unknown';
  } catch {
    return 'Unknown';
  }
}

export default async function AwardsPage() {
  const allAwards = await reader.collections.awards.all();

  // 데이터 매핑 - JSON 파일에서 직접 title 읽기 (Keystatic slugField 버그 우회)
  const awards: Award[] = await Promise.all(
    allAwards.map(async (award) => {
      // Keystatic에서 slugField로 지정된 title은 null이 되므로, JSON에서 직접 읽음
      const title = await getAwardTitle(award.slug);
      return {
        slug: award.slug,
        title,
        year: award.entry.year,
        awardType: award.entry.awardType,
        sector: award.entry.sector,
        provider: award.entry.provider,
        officialUrl: award.entry.officialUrl,
      };
    })
  );

  // 연도별로 그룹화
  const awardsByYear = awards.reduce((acc, award) => {
    const year = award.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(award);
    return acc;
  }, {} as Record<number, Award[]>);

  // 연도 내림차순 정렬
  const sortedYears = Object.keys(awardsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-dark-950 pt-24 md:pt-32">
      <div className="container-custom py-12 lg:py-20">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <p className="text-label mb-4">Hall of Fame</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-dark-100 mb-6">
            Winners
          </h1>
          <p className="text-dark-400 text-lg max-w-2xl">
            대한민국 청년정책 어워즈에서 선정된 우수 정책들을 만나보세요.
            청년들의 삶을 변화시킨 의미있는 정책들입니다.
          </p>
        </div>

        {/* Awards by Year */}
        <div className="space-y-24 md:space-y-32">
          {sortedYears.map((year) => {
            const yearAwards = [...awardsByYear[year]].sort((a, b) => {
              const typeOrderA = getAwardTypeOrder(a.awardType);
              const typeOrderB = getAwardTypeOrder(b.awardType);
              if (typeOrderA !== typeOrderB) return typeOrderA - typeOrderB;

              const sectorOrderA = getSectorOrder(a.sector);
              const sectorOrderB = getSectorOrder(b.sector);
              return sectorOrderA - sectorOrderB;
            });

            return (
              <section key={year}>
                {/* Year Header */}
                <div className="flex items-center gap-8 mb-10">
                  <span className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-dark-600">
                    {year}
                  </span>
                  <div className="flex-1 h-px bg-dark-800" />
                  <span className="text-label">
                    {yearAwards.length} Winners
                  </span>
                </div>

                {/* Awards List */}
                <div className="border-t border-dark-800">
                  {yearAwards.map((award) => {
                    const awardContent = (
                      <div className="grid grid-cols-12 gap-4 md:gap-6 items-center py-6 md:py-8 border-b border-dark-800 transition-smooth hover:bg-dark-900 hover:px-4 -mx-0 hover:-mx-4">
                        {/* Badge + Sector */}
                        <div className="col-span-12 md:col-span-3 flex items-center gap-2">
                          <span
                            className="text-base md:text-lg lg:text-xl font-medium"
                            style={{ color: getAwardColor(award.awardType) }}
                          >
                            {getAwardLabel(award.awardType)}
                          </span>
                          {getSectorLabel(award.sector) && (
                            <span className="text-xs md:text-sm px-2 py-0.5 rounded border border-dark-700" style={{ color: '#9ca3af' }}>
                              {getSectorLabel(award.sector)}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <div className="col-span-12 md:col-span-5">
                          <h3
                            className="text-xl md:text-2xl lg:text-3xl font-medium group-hover:text-gold-300 transition-colors"
                            style={{ color: '#ffffff' }}
                          >
                            {award.title ? award.title : <span style={{ color: '#ef4444' }}>Data Error</span>}
                          </h3>
                        </div>

                        {/* Provider */}
                        <div className="col-span-10 md:col-span-3">
                          <p className="text-base md:text-lg lg:text-xl" style={{ color: '#d1d5db' }}>
                            {award.provider}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div className="col-span-2 md:col-span-1 flex justify-end">
                          <svg
                            className="w-5 h-5 text-dark-600 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gold-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    );

                    return award.officialUrl ? (
                      <a
                        key={award.slug}
                        href={award.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        {awardContent}
                      </a>
                    ) : (
                      <Link
                        key={award.slug}
                        href={`/awards/${award.slug}`}
                        className="group block"
                      >
                        {awardContent}
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {sortedYears.length === 0 && (
          <div className="text-center py-32">
            <p className="text-dark-500 text-lg">
              아직 등록된 수상작이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
