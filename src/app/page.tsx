import Link from 'next/link';
import { reader } from '@/lib/reader';

export default async function Home() {
  const awards = await reader.collections.awards.all();

  // 연도별 수상작 그룹핑
  const awardsByYear = awards.reduce((acc, award) => {
    const year = award.entry.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(award);
    return acc;
  }, {} as Record<number, typeof awards>);

  // 최신 연도순 정렬
  const sortedYears = Object.keys(awardsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // 수상 타입별 라벨
  const getAwardLabel = (type: string) => {
    const labels: Record<string, string> = {
      grand: 'Grand Prize',
      excellence: 'Excellence',
      merit: 'Merit',
      special: 'Special',
    };
    return labels[type] || 'Award';
  };

  const getBadgeClass = (type: string) => {
    const classes: Record<string, string> = {
      grand: 'badge-grand',
      excellence: 'badge-excellence',
      merit: 'badge-merit',
      special: 'badge-special',
    };
    return classes[type] || 'badge-merit';
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* ===== HERO SECTION: Editorial Typography ===== */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20">
        <div className="container-custom">
          {/* 1. Meta Info (Eyebrow) */}
          <div className="flex justify-between items-end mb-6 border-b border-dark-800 pb-4 animate-slide-up">
            <span className="text-xs font-sans tracking-[0.2em] text-dark-500 uppercase">
              Since 2021
            </span>
            <span className="text-xs font-sans tracking-[0.2em] text-dark-500 uppercase hidden md:block">
              The 4th Edition
            </span>
          </div>

          {/* 2. Main Title (English) */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold leading-[0.9] tracking-tight mb-12">
            <span className="block text-dark-100 animate-slide-up animate-delay-1">The Korea</span>
            <span className="block text-dark-100 animate-slide-up animate-delay-2">Youth Policy</span>
            <span className="block text-gold-300 animate-slide-up animate-delay-3">Awards</span>
          </h1>

          {/* 3. Korean Title & Description (Grouped) */}
          <div className="max-w-xl animate-slide-up animate-delay-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-dark-100 mb-4 tracking-tight font-sans">
              대한민국 청년정책 어워즈
            </h2>
            <p className="text-dark-400 text-sm md:text-base font-light leading-relaxed mb-10">
              청년이 직접 선정하는<br />
              대한민국 최고의 청년정책 시상식
            </p>
            <div className="flex items-center gap-6">
              <Link href="/awards" className="btn-primary">
                View Winners
              </Link>
              <Link href="/about" className="btn-text group">
                About
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 md:mt-24 animate-slide-up animate-delay-5">
            <p className="text-label mb-4">Scroll</p>
            <div className="w-px h-16 bg-gradient-to-b from-dark-600 to-transparent" />
          </div>
        </div>
      </section>

      {/* ===== AWARDS LIST SECTION: The Authority List ===== */}
      {/*
        컨셉: "Living Authority" - 공식 기록(Official Record)처럼 보이는 리스트
        카드 형태 금지, 가로로 긴 리스트(Table/Flex Row) 형태
        얇은 border로 정돈된 문서 느낌 연출
      */}
      <section id="awards-list" className="py-24 md:py-32 border-t border-dark-800">
        <div className="container-custom">
          {/* Section Header - 공식 문서 스타일 */}
          <header className="mb-16 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-dark-700/50">
              <div>
                <p className="text-[11px] font-mono tracking-[0.25em] text-dark-500 uppercase mb-3">
                  Official Record
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-dark-100">
                  Recent Awards
                </h2>
              </div>
              <Link href="/awards" className="btn-text group shrink-0">
                View Complete Archive
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </header>

          {/* Awards List - Authority Table Style */}
          <div className="space-y-0">
            {/* Table Header - Desktop Only */}
            <div className="hidden md:grid grid-cols-12 gap-6 py-3 border-b border-dark-700/30 text-[10px] font-mono tracking-[0.2em] text-dark-600 uppercase">
              <div className="col-span-2">Year / Type</div>
              <div className="col-span-6">Policy Title</div>
              <div className="col-span-3">Institution</div>
              <div className="col-span-1"></div>
            </div>

            {/* Award Entries */}
            {awards
              .sort((a, b) => {
                // 연도 내림차순, 같은 연도 내에서는 상 등급순
                if (b.entry.year !== a.entry.year) return b.entry.year - a.entry.year;
                const order = { grand: 0, excellence: 1, merit: 2, special: 3 };
                return (order[a.entry.awardType as keyof typeof order] || 4) -
                       (order[b.entry.awardType as keyof typeof order] || 4);
              })
              .slice(0, 8) // 최근 8개만 표시
              .map((award, index) => (
                <Link
                  key={award.slug}
                  href={`/awards/${award.slug}`}
                  className="group block relative"
                >
                  {/* List Row */}
                  <div className="relative grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-5 md:py-6 border-b border-dark-800/50 transition-all duration-300 hover:bg-dark-900/50 hover:border-dark-700/50">

                    {/* 연도 & 수상 타입 - 좌측 고정 정보 */}
                    <div className="md:col-span-2 flex md:flex-col gap-3 md:gap-1">
                      <span className="text-sm md:text-base font-mono font-medium text-dark-300 tabular-nums">
                        {award.entry.year}
                      </span>
                      <span className={`text-[10px] font-mono tracking-wider uppercase ${
                        award.entry.awardType === 'grand'
                          ? 'text-gold-400'
                          : award.entry.awardType === 'excellence'
                          ? 'text-dark-300'
                          : 'text-dark-500'
                      }`}>
                        {getAwardLabel(award.entry.awardType)}
                      </span>
                    </div>

                    {/* 정책 타이틀 - 가장 눈에 띄게 */}
                    <div className="md:col-span-6 mt-2 md:mt-0">
                      <h3 className="text-lg md:text-xl font-semibold text-dark-100 leading-tight transition-colors duration-300 group-hover:text-gold-300">
                        {award.entry.title}
                      </h3>
                    </div>

                    {/* 기관명 */}
                    <div className="md:col-span-3 mt-1 md:mt-0 flex items-center">
                      <span className="text-sm text-dark-500 font-light">
                        {award.entry.provider}
                      </span>
                    </div>

                    {/* 화살표 - Hover시 나타남 */}
                    <div className="md:col-span-1 hidden md:flex items-center justify-end">
                      <span className="text-dark-600 opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gold-400">
                        →
                      </span>
                    </div>

                    {/* 썸네일 오버레이 - Hover시 우측에 나타남 (옵션) */}
                    {award.entry.image && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 pointer-events-none transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 z-10 hidden lg:block">
                        <div className="w-32 h-20 bg-dark-800 border border-dark-700 shadow-2xl overflow-hidden">
                          {/* 이미지 플레이스홀더 - 실제 이미지가 있을 경우 표시 */}
                          <div className="w-full h-full bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center">
                            <span className="text-[9px] font-mono text-dark-600 uppercase tracking-wider">Preview</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
          </div>

          {/* Empty State */}
          {awards.length === 0 && (
            <div className="text-center py-24 border border-dark-800/30">
              <p className="text-dark-500 font-light">아직 등록된 수상작이 없습니다.</p>
            </div>
          )}

          {/* View More - 하단 */}
          {awards.length > 8 && (
            <div className="mt-12 pt-8 border-t border-dark-800/30 flex justify-center">
              <Link href="/awards" className="btn-outline">
                View All {awards.length} Awards
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-24 md:py-32 border-t border-dark-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left */}
            <div>
              <p className="text-label mb-4">About</p>
              <h2 className="text-4xl md:text-5xl text-dark-100 mb-8">
                청년의 목소리로<br />
                정책의 가치를<br />
                발견합니다
              </h2>
              <div className="divider-gold mb-8" />
              <p className="text-dark-400 text-lg leading-relaxed mb-10">
                대한민국 청년정책 어워즈는 전국의 청년정책 중
                실제로 청년에게 도움이 되는 우수 정책을
                청년이 직접 선정하는 시상식입니다.
              </p>
              <Link href="/about" className="btn-outline">
                Learn More
              </Link>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-px bg-dark-800">
              {[
                { number: '2021', label: '첫 개최' },
                { number: '4th', label: '회차' },
                { number: '450K+', label: '누적 참여' },
                { number: '200+', label: '후보 정책' },
              ].map((stat, index) => (
                <div key={stat.label} className="bg-dark-950 p-8 md:p-12">
                  <p className="text-4xl md:text-5xl font-serif font-bold text-gold-300 mb-3">
                    {stat.number}
                  </p>
                  <p className="text-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="py-24 md:py-32 border-t border-dark-800">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="text-label mb-4">Categories</p>
              <h2 className="text-4xl md:text-5xl text-dark-100">
                시상 부문
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dark-800">
            {[
              {
                title: '청년정책 대상',
                titleEn: 'Grand Prize',
                description: '올해 가장 많은 청년의 사랑을 받은 최고의 정책',
              },
              {
                title: '최우수 청년정책상',
                titleEn: 'Excellence Award',
                description: '각 부문별 우수 정책',
              },
              {
                title: '청년정책 혁신상',
                titleEn: 'Innovation Award',
                description: '창의적 접근으로 청년 문제를 해결한 정책',
              },
              {
                title: '글로벌 청년정책상',
                titleEn: 'Global Award',
                description: '해외 우수 청년정책 중 벤치마킹 가치가 높은 정책',
              },
            ].map((category) => (
              <div
                key={category.titleEn}
                className="bg-dark-950 p-8 md:p-12 group hover:bg-dark-900 transition-smooth"
              >
                <p className="text-label text-gold-300 mb-4">{category.titleEn}</p>
                <h3 className="text-2xl md:text-3xl text-dark-100 mb-4 font-sans font-semibold">
                  {category.title}
                </h3>
                <p className="text-dark-500 leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARTNERS SECTION ===== */}
      <section className="py-20 md:py-24 border-t border-dark-800">
        <div className="container-custom">
          <p className="text-label text-center mb-12">Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {[
              { name: '열고닫기', role: '청년정책 플랫폼' },
              { name: '도도한콜라보', role: '운영사' },
              { name: '온통청년', role: '정부 청년포털' },
              { name: '청년재단', role: '협력기관' },
            ].map((partner) => (
              <div key={partner.name} className="text-center opacity-40 hover:opacity-70 transition-smooth">
                <p className="text-dark-200 font-medium mb-1">{partner.name}</p>
                <p className="text-label">{partner.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER CTA ===== */}
      <section className="py-24 md:py-32 border-t border-dark-800">
        <div className="container-custom text-center">
          <p className="text-label mb-6">Get Involved</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-dark-100 mb-8">
            청년정책의 미래를 함께 만들어요
          </h2>
          <p className="text-dark-400 text-lg mb-10 max-w-xl mx-auto">
            당신의 한 표가 더 나은 청년정책을 만듭니다
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/awards" className="btn-primary">
              역대 수상작 보기
            </Link>
            <Link href="/about" className="btn-outline">
              자세히 알아보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
