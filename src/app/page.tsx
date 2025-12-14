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

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION: 밝은 그라데이션 + 청년 비주얼 ===== */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-100">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating shapes */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-40 left-10 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-yellow-200/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container-custom relative z-10 pt-32 pb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-8 animate-slide-up">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">2024 투표 진행중</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold leading-[1.05] tracking-tight mb-8">
            <span className="block text-gray-900 animate-slide-up animate-delay-1">청년이 직접 뽑는</span>
            <span className="block text-gray-900 animate-slide-up animate-delay-2">대한민국 최고의</span>
            <span className="block text-gradient-blue animate-slide-up animate-delay-3">청년정책</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-10 animate-slide-up animate-delay-4 leading-relaxed">
            200개 이상의 정책 중 청년 패널이 직접 평가하고,<br className="hidden md:block" />
            전국 청년들의 투표로 선정합니다.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 animate-slide-up animate-delay-5">
            <Link href="/vote" className="btn-primary">
              투표 참여하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/awards" className="btn-outline">
              역대 수상작 보기
            </Link>
          </div>

          {/* Stats Row */}
          <div className="mt-20 pt-10 border-t border-gray-200/50 animate-slide-up animate-delay-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '4회', label: '올해로', suffix: '째' },
                { number: '45만+', label: '누적 참여자' },
                { number: '200+', label: '후보 정책' },
                { number: '30', label: '최종 후보' },
              ].map((stat, index) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-slide-up animate-delay-5">
          <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent" />
        </div>
      </section>

      {/* ===== ABOUT SECTION: 밝은 톤 유지 ===== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left - Content */}
            <div>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full mb-6">
                About the Awards
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                청년의 목소리로<br />
                정책의 가치를<br />
                발견합니다
              </h2>
              <div className="w-20 h-1 bg-blue-500 mb-8" />
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                대한민국 청년정책 어워즈는 전국의 청년정책 중 실제로 청년에게 도움이 되는 우수 정책을
                청년이 직접 선정하는 시상식입니다. 2021년 첫 개최 이후, 청년정책의 발전을 이끌어왔습니다.
              </p>
              <Link href="/about" className="btn-primary-navy">
                자세히 알아보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Right - Visual/Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '2021', label: '첫 개최', color: 'bg-blue-50' },
                { number: '4회', label: '올해 회차', color: 'bg-sky-50' },
                { number: '45만+', label: '누적 참여', color: 'bg-indigo-50' },
                { number: '200+', label: '후보 정책', color: 'bg-violet-50' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`${stat.color} p-8 rounded-2xl hover:scale-105 transition-transform duration-300`}
                >
                  <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRANSITION: Light to Navy ===== */}
      <div className="h-32 bg-gradient-to-b from-white to-[#0c1929]" />

      {/* ===== AWARDS LIST SECTION: 딥 네이비 배경 ===== */}
      <section id="awards-list" className="py-24 md:py-32 bg-[#0c1929]">
        <div className="container-custom">
          {/* Section Header */}
          <header className="mb-16 md:mb-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <span className="inline-block px-3 py-1 bg-white/10 text-yellow-400 text-xs font-medium rounded-full mb-4">
                  Official Record
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">
                  역대 수상작
                </h2>
              </div>
              <Link href="/awards" className="btn-text-light group shrink-0">
                전체 보기
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </header>

          {/* Awards List */}
          <div className="space-y-0">
            {/* Table Header - Desktop Only */}
            <div className="hidden md:grid grid-cols-12 gap-6 py-3 border-b border-white/10 text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase">
              <div className="col-span-2">Year / Type</div>
              <div className="col-span-6">Policy Title</div>
              <div className="col-span-3">Institution</div>
              <div className="col-span-1"></div>
            </div>

            {/* Award Entries */}
            {awards
              .sort((a, b) => {
                if (b.entry.year !== a.entry.year) return b.entry.year - a.entry.year;
                const order = { grand: 0, excellence: 1, merit: 2, special: 3 };
                return (order[a.entry.awardType as keyof typeof order] || 4) -
                       (order[b.entry.awardType as keyof typeof order] || 4);
              })
              .slice(0, 8)
              .map((award) => (
                <Link
                  key={award.slug}
                  href={`/awards/${award.slug}`}
                  className="group block relative"
                >
                  <div className="relative grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-5 md:py-6 border-b border-white/5 transition-all duration-300 hover:bg-white/5">
                    {/* Year & Type */}
                    <div className="md:col-span-2 flex md:flex-col gap-3 md:gap-1">
                      <span className="text-sm md:text-base font-mono font-medium text-gray-300 tabular-nums">
                        {award.entry.year}
                      </span>
                      <span className={`text-[10px] font-mono tracking-wider uppercase ${
                        award.entry.awardType === 'grand'
                          ? 'text-yellow-400'
                          : award.entry.awardType === 'excellence'
                          ? 'text-gray-300'
                          : 'text-gray-500'
                      }`}>
                        {getAwardLabel(award.entry.awardType)}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="md:col-span-6 mt-2 md:mt-0">
                      <h3 className="text-lg md:text-xl font-semibold text-white leading-tight transition-colors duration-300 group-hover:text-yellow-400">
                        {award.entry.title}
                      </h3>
                    </div>

                    {/* Provider */}
                    <div className="md:col-span-3 mt-1 md:mt-0 flex items-center">
                      <span className="text-sm text-gray-500 font-light">
                        {award.entry.provider}
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="md:col-span-1 hidden md:flex items-center justify-end">
                      <span className="text-gray-600 opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-yellow-400">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {/* Empty State */}
          {awards.length === 0 && (
            <div className="text-center py-24 border border-white/10 rounded-xl">
              <p className="text-gray-500 font-light">아직 등록된 수상작이 없습니다.</p>
            </div>
          )}

          {/* View More */}
          {awards.length > 8 && (
            <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
              <Link href="/awards" className="btn-outline-light">
                View All {awards.length} Awards
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ===== CATEGORIES SECTION: 딥 네이비 유지 ===== */}
      <section className="py-24 md:py-32 bg-[#152238]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-white/10 text-yellow-400 text-xs font-medium rounded-full mb-4">
              Award Categories
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">
              시상 부문
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '청년정책 대상',
                titleEn: 'Grand Prize',
                description: '올해 가장 많은 청년의 사랑을 받은 최고의 정책',
                icon: '🏆',
                highlight: true,
              },
              {
                title: '최우수 청년정책상',
                titleEn: 'Excellence Award',
                description: '각 부문별 우수 정책',
                icon: '⭐',
              },
              {
                title: '청년정책 혁신상',
                titleEn: 'Innovation Award',
                description: '창의적 접근으로 청년 문제를 해결한 정책',
                icon: '💡',
              },
              {
                title: '글로벌 청년정책상',
                titleEn: 'Global Award',
                description: '해외 우수 청년정책 중 벤치마킹 가치가 높은 정책',
                icon: '🌏',
              },
            ].map((category) => (
              <div
                key={category.titleEn}
                className={`card-dark p-8 md:p-10 group ${category.highlight ? 'md:col-span-2 bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <p className={`text-xs font-mono tracking-wider uppercase mb-2 ${category.highlight ? 'text-yellow-400' : 'text-gray-500'}`}>
                      {category.titleEn}
                    </p>
                    <h3 className="text-xl md:text-2xl text-white mb-3 font-semibold">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARTNERS SECTION: 중간 톤 ===== */}
      <section className="py-20 md:py-24 bg-[#1e3a5f]">
        <div className="container-custom">
          <p className="text-center text-xs font-mono tracking-widest uppercase text-gray-400 mb-12">
            Partners & Collaborators
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {[
              { name: '열고닫기', role: '청년정책 플랫폼' },
              { name: '도도한콜라보', role: '운영사' },
              { name: '온통청년', role: '정부 청년포털' },
              { name: '청년재단', role: '협력기관' },
            ].map((partner) => (
              <div key={partner.name} className="text-center opacity-60 hover:opacity-100 transition-smooth">
                <p className="text-white font-medium mb-1">{partner.name}</p>
                <p className="text-xs text-gray-400">{partner.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRANSITION: Navy to Light ===== */}
      <div className="h-32 bg-gradient-to-b from-[#1e3a5f] to-white" />

      {/* ===== CTA SECTION: 다시 밝은 톤 ===== */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-50 via-white to-sky-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl" />
        </div>

        <div className="container-custom text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-6">
            Get Involved
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
            청년정책의 미래를<br />함께 만들어요
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
            당신의 한 표가 더 나은 청년정책을 만듭니다.<br />
            지금 바로 참여하세요!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/vote" className="btn-primary">
              투표 참여하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
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
