import Link from 'next/link';
import { reader } from '@/lib/reader';

export default async function Home() {
  // 데이터 불러오기
  const [siteSettings, awards] = await Promise.all([
    reader.singletons.siteSettings.read(),
    reader.collections.awards.all(),
  ]);

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

  // 시상 부문 정의
  const awardCategories = [
    {
      title: '청년정책 대상',
      description: '올해 가장 많은 청년의 사랑을 받은 최고의 정책',
    },
    {
      title: '최우수 청년정책상',
      description: '각 부문별 우수 정책',
    },
    {
      title: '청년정책 혁신상',
      description: '창의적 접근으로 청년 문제를 해결한 정책',
    },
    {
      title: '글로벌 청년정책상',
      description: '해외 우수 청년정책 중 벤치마킹 가치가 높은 정책',
    },
  ];

  // 수상 타입별 스타일
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

  return (
    <div className="bg-[#0d0a07] min-h-screen">
      {/* Hero Section - Nobel Prize style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 md:pt-32">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a07] via-[#151210] to-[#0d0a07]" />

        {/* Elegant radial light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-gold-500/5 via-transparent to-transparent rounded-full" />

        <div className="container-custom relative z-10 text-center py-12 md:py-20 px-4">
          {/* Simple Trophy Icon */}
          <div className="mb-8 md:mb-10">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto border border-gold-500/40 rounded-full flex items-center justify-center">
              <span className="text-3xl md:text-4xl">🏆</span>
            </div>
          </div>

          {/* Year Badge */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-sm font-serif tracking-[0.3em]">2024</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>

          {/* Main Title - Serif Font */}
          <h1 className="font-serif mb-6">
            <span className="block text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide mb-2">대한민국</span>
            <span className="block text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
              청년정책 어워즈
            </span>
          </h1>

          {/* English Subtitle */}
          <p className="text-gold-500/70 text-sm md:text-base tracking-[0.25em] uppercase mb-10 md:mb-14 font-serif">
            Korea Youth Policy Awards
          </p>

          {/* Tagline */}
          <p className="text-dark-300 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed font-serif">
            청년이 직접 선정하는 대한민국 최고의 청년정책
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 md:mb-20">
            <Link href="/awards" className="btn-gold inline-flex items-center justify-center font-serif">
              역대 수상작 보기
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/about" className="btn-outline-gold inline-flex items-center justify-center font-serif">
              어워즈 소개
            </Link>
          </div>

          {/* Stats - Minimal */}
          <div className="flex items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif font-bold text-gold-500 mb-1">200+</p>
              <p className="text-dark-500 text-xs md:text-sm tracking-wide">후보 정책</p>
            </div>
            <div className="w-px h-10 bg-dark-700" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif font-bold text-white mb-1">45만+</p>
              <p className="text-dark-500 text-xs md:text-sm tracking-wide">참여 청년</p>
            </div>
            <div className="w-px h-10 bg-dark-700" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif font-bold text-gold-500 mb-1">3회</p>
              <p className="text-dark-500 text-xs md:text-sm tracking-wide">어워즈 개최</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-2">
            <span className="text-dark-500 text-xs tracking-widest">SCROLL</span>
            <div className="w-px h-10 bg-gradient-to-b from-gold-500/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Award Categories Section */}
      <section className="py-20 md:py-32 bg-[#0d0a07] border-t border-dark-800/50">
        <div className="container-custom px-4 md:px-0">
          {/* Section Header */}
          <div className="text-center mb-14 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
              <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">Award Categories</span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white">
              시상 부문
            </h2>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {awardCategories.map((category, index) => (
              <div
                key={category.title}
                className="relative group"
              >
                <div className="border border-dark-700/50 hover:border-gold-500/30 rounded-none p-8 md:p-10 text-center transition-all duration-500 bg-gradient-to-b from-dark-900/20 to-transparent">
                  {/* Number */}
                  <div className="absolute top-4 left-4 text-gold-500/20 text-4xl font-serif">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <h3 className="text-lg md:text-xl font-serif font-bold text-white mb-4 mt-6">
                    {category.title}
                  </h3>
                  <p className="text-dark-400 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Winners Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#0d0a07] to-[#151210]">
        <div className="container-custom px-4 md:px-0">
          {/* Section Header */}
          <div className="text-center mb-14 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
              <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">Hall of Fame</span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
              역대 수상작
            </h2>
            <p className="text-dark-400 font-serif">
              청년들이 직접 선택한 최고의 정책들
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-16 md:space-y-24">
            {sortedYears.map((year) => (
              <div key={year} className="relative">
                {/* Year Header */}
                <div className="flex items-center gap-6 mb-8 md:mb-12">
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-gold-500">
                    {year}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-gold-500/30 to-transparent" />
                </div>

                {/* Awards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {awardsByYear[year]
                    .sort((a, b) => {
                      const order = { grand: 0, excellence: 1, merit: 2, special: 3 };
                      return (order[a.entry.awardType as keyof typeof order] || 4) -
                             (order[b.entry.awardType as keyof typeof order] || 4);
                    })
                    .map((award) => {
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

                            <h4 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                              {award.entry.title}
                            </h4>

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
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-16 md:mt-24">
            <Link href="/awards" className="btn-outline-gold inline-flex items-center justify-center font-serif">
              모든 수상작 보기
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-[#151210] border-t border-dark-800/50">
        <div className="container-custom px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-gold-500/50" />
                <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">About</span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-8 leading-tight">
                청년의 목소리로<br />
                <span className="text-gold-500">정책의 가치</span>를 발견합니다
              </h2>

              <p className="text-dark-300 leading-relaxed mb-10 font-serif text-lg">
                대한민국 청년정책 어워즈는 전국의 청년정책 중 실제로 청년에게 도움이 되는
                우수 정책을 청년이 직접 선정하는 시상식입니다.
              </p>

              {/* Features */}
              <div className="space-y-6">
                {[
                  { title: '청년 직접 투표', desc: '청년이 직접 참여하여 선정' },
                  { title: '객관적 평가', desc: '데이터 기반의 투명한 심사' },
                  { title: '실질적 혜택', desc: '실제 혜택 중심의 평가 기준' },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-serif font-semibold mb-1">{feature.title}</h4>
                      <p className="text-dark-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link href="/about" className="btn-gold inline-flex items-center justify-center font-serif">
                  자세히 알아보기
                </Link>
              </div>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '2021', label: '첫 개최' },
                { number: '3회', label: '누적 개최' },
                { number: '45만+', label: '누적 참여자' },
                { number: '200+', label: '후보 정책' },
              ].map((stat) => (
                <div key={stat.label} className="border border-dark-700/50 p-8 md:p-10 text-center">
                  <p className="text-3xl md:text-4xl font-serif font-bold text-gold-500 mb-2">{stat.number}</p>
                  <p className="text-dark-400 text-sm tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 md:py-20 bg-[#0d0a07] border-t border-dark-800/50">
        <div className="container-custom px-4 md:px-0">
          <div className="text-center mb-10">
            <span className="text-dark-500 text-xs tracking-[0.2em] uppercase">Partners</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {[
              { name: '열고닫기', desc: '청년정책 플랫폼' },
              { name: '도도한콜라보', desc: '운영사' },
              { name: '온통청년', desc: '정부 청년포털' },
              { name: '청년재단', desc: '협력기관' },
            ].map((partner) => (
              <div key={partner.name} className="text-center opacity-50 hover:opacity-100 transition-opacity">
                <p className="font-serif font-semibold text-dark-200 text-lg">{partner.name}</p>
                <p className="text-dark-600 text-xs mt-1">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#0d0a07] to-[#151210] border-t border-dark-800/50">
        <div className="container-custom text-center px-4">
          <div className="max-w-3xl mx-auto">
            {/* Decorative */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold-500/30" />
              <div className="w-3 h-3 border border-gold-500/50 rotate-45" />
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold-500/30" />
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-6 leading-tight">
              청년정책의 가치를<br />
              <span className="text-gold-500">함께</span> 발견해요
            </h2>

            <p className="text-dark-300 text-lg mb-12 leading-relaxed font-serif">
              대한민국 청년정책 어워즈는 청년을 위한 우수 정책을 발굴하고,<br className="hidden md:block" />
              더 많은 청년이 혜택을 받을 수 있도록 정보를 제공합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/awards" className="btn-gold inline-flex items-center justify-center font-serif">
                역대 수상작 보기
              </Link>
              <Link href="/about" className="btn-outline-gold inline-flex items-center justify-center font-serif">
                어워즈 소개
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
