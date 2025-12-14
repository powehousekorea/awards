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
    <div className="bg-dark-950 min-h-screen bg-noise">
      {/* Hero Section - Quiet Luxury */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 md:pt-32">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

        {/* Elegant radial light - 더 은은하게 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-gold-500/3 via-transparent to-transparent rounded-full" />

        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 geometric-pattern opacity-50" />

        <div className="container-custom relative z-10 text-center py-12 md:py-20 px-4">
          {/* Abstract Geometric Icon - 이모지 대체 */}
          <div className="mb-10 md:mb-12 opacity-0 animate-fade-in-up">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto border border-gold-500/20 relative">
              <div className="absolute inset-3 border border-gold-500/15 rotate-45" />
              <div className="absolute inset-6 border border-gold-500/10" />
            </div>
          </div>

          {/* Year Badge */}
          <div className="inline-flex items-center gap-4 mb-10 opacity-0 animate-fade-in-up animate-delay-1">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/30" />
            <span className="text-gold-300 text-xs tracking-[0.4em] uppercase">2024</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/30" />
          </div>

          {/* Main Title - Serif Font */}
          <h1 className="mb-8 opacity-0 animate-slide-in-slow animate-delay-2">
            <span className="block text-3xl md:text-5xl lg:text-6xl font-bold text-dark-100 tracking-tight mb-3">대한민국</span>
            <span className="block text-3xl md:text-5xl lg:text-6xl font-bold text-dark-100 tracking-tight">
              청년정책 어워즈
            </span>
          </h1>

          {/* English Subtitle */}
          <p className="text-gold-400/60 text-xs md:text-sm tracking-[0.35em] uppercase mb-12 md:mb-16 opacity-0 animate-fade-in-up animate-delay-3">
            Korea Youth Policy Awards
          </p>

          {/* Tagline */}
          <p className="text-dark-300 text-base md:text-lg max-w-xl mx-auto mb-14 md:mb-18 leading-loose font-light opacity-0 animate-fade-in-up animate-delay-4">
            청년이 직접 선정하는 대한민국 최고의 청년정책
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-20 md:mb-24 opacity-0 animate-fade-in-up animate-delay-5">
            <Link href="/awards" className="btn-gold inline-flex items-center justify-center text-sm">
              역대 수상작 보기
              <svg className="w-4 h-4 ml-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/about" className="btn-outline-gold inline-flex items-center justify-center text-sm">
              어워즈 소개
            </Link>
          </div>

          {/* Stats - Minimal & Refined */}
          <div className="flex items-center justify-center gap-10 md:gap-20">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-serif font-bold text-gold-300 mb-2">200+</p>
              <p className="text-dark-500 text-xs tracking-[0.15em] uppercase">후보 정책</p>
            </div>
            <div className="w-px h-12 bg-dark-700/50" />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-serif font-bold text-dark-200 mb-2">45만+</p>
              <p className="text-dark-500 text-xs tracking-[0.15em] uppercase">참여 청년</p>
            </div>
            <div className="w-px h-12 bg-dark-700/50" />
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-serif font-bold text-gold-300 mb-2">3회</p>
              <p className="text-dark-500 text-xs tracking-[0.15em] uppercase">어워즈 개최</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Subtle */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-3">
            <span className="text-dark-600 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-gold-500/30 to-transparent animate-breathe" />
          </div>
        </div>
      </section>

      {/* Award Categories Section */}
      <section className="py-24 md:py-36 bg-dark-950 border-t border-dark-800/30">
        <div className="container-custom px-4 md:px-0">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-24">
            <div className="flex items-center justify-center gap-5 mb-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold-500/25" />
              <span className="text-gold-400/70 text-[10px] tracking-[0.4em] uppercase">Award Categories</span>
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold-500/25" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-100">
              시상 부문
            </h2>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-700/20">
            {awardCategories.map((category, index) => (
              <div
                key={category.title}
                className="relative group bg-dark-950"
              >
                <div className="border border-dark-800/50 hover:border-gold-500/20 p-10 md:p-12 text-center transition-luxury h-full">
                  {/* Number */}
                  <div className="text-gold-500/15 text-5xl font-serif mb-8">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-dark-200 mb-4 tracking-tight">
                    {category.title}
                  </h3>
                  <p className="text-dark-500 text-sm leading-relaxed font-light">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Winners Section */}
      <section className="py-24 md:py-36 bg-gradient-to-b from-dark-950 to-dark-900">
        <div className="container-custom px-4 md:px-0">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-24">
            <div className="flex items-center justify-center gap-5 mb-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold-500/25" />
              <span className="text-gold-400/70 text-[10px] tracking-[0.4em] uppercase">Hall of Fame</span>
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold-500/25" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-100 mb-5">
              역대 수상작
            </h2>
            <p className="text-dark-400 font-light text-sm">
              청년들이 직접 선택한 최고의 정책들
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-20 md:space-y-28">
            {sortedYears.map((year) => (
              <div key={year} className="relative">
                {/* Year Header */}
                <div className="flex items-center gap-8 mb-10 md:mb-14">
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-gold-400/80">
                    {year}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-gold-500/20 to-transparent" />
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
                          <div className="border border-dark-800/50 hover:border-gold-500/20 p-8 md:p-10 transition-luxury bg-dark-950/50">
                            <div className="mb-5">
                              <span className={`badge ${badge.className}`}>
                                {badge.label}
                              </span>
                            </div>

                            <h4 className="text-base font-bold text-dark-200 mb-3 group-hover:text-gold-300 transition-luxury tracking-tight">
                              {award.entry.title}
                            </h4>

                            <p className="text-dark-500 text-sm mb-4 font-light">
                              {award.entry.provider}
                            </p>

                            {award.entry.summary && (
                              <p className="text-dark-500 text-sm line-clamp-2 leading-relaxed font-light">
                                {award.entry.summary}
                              </p>
                            )}

                            <div className="mt-8 pt-5 border-t border-dark-800/50 flex items-center justify-between">
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
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-20 md:mt-28">
            <Link href="/awards" className="btn-outline-gold inline-flex items-center justify-center text-sm">
              모든 수상작 보기
              <svg className="w-4 h-4 ml-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-36 bg-dark-900 border-t border-dark-800/30">
        <div className="container-custom px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-28 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-px bg-gold-500/30" />
                <span className="text-gold-400/70 text-[10px] tracking-[0.4em] uppercase">About</span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-100 mb-10 leading-snug">
                청년의 목소리로<br />
                <span className="text-gold-300">정책의 가치</span>를 발견합니다
              </h2>

              <p className="text-dark-400 leading-loose mb-12 text-base font-light">
                대한민국 청년정책 어워즈는 전국의 청년정책 중 실제로 청년에게 도움이 되는
                우수 정책을 청년이 직접 선정하는 시상식입니다.
              </p>

              {/* Features */}
              <div className="space-y-8">
                {[
                  { title: '청년 직접 참여', desc: '청년이 직접 참여하여 선정' },
                  { title: '객관적 평가', desc: '데이터 기반의 투명한 심사' },
                  { title: '실질적 혜택', desc: '실제 혜택 중심의 평가 기준' },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-5">
                    <div className="w-1.5 h-1.5 bg-gold-500/50 mt-2.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-dark-200 font-semibold mb-1.5 text-sm tracking-tight">{feature.title}</h4>
                      <p className="text-dark-500 text-sm font-light">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-14">
                <Link href="/about" className="btn-gold inline-flex items-center justify-center text-sm">
                  자세히 알아보기
                </Link>
              </div>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-px bg-dark-800/30">
              {[
                { number: '2021', label: '첫 개최' },
                { number: '3회', label: '누적 개최' },
                { number: '45만+', label: '누적 참여자' },
                { number: '200+', label: '후보 정책' },
              ].map((stat) => (
                <div key={stat.label} className="bg-dark-900 border border-dark-800/50 p-10 md:p-12 text-center">
                  <p className="text-2xl md:text-3xl font-serif font-bold text-gold-300 mb-3">{stat.number}</p>
                  <p className="text-dark-500 text-xs tracking-[0.15em] uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 md:py-24 bg-dark-950 border-t border-dark-800/30">
        <div className="container-custom px-4 md:px-0">
          <div className="text-center mb-14">
            <span className="text-dark-600 text-[10px] tracking-[0.4em] uppercase">Partners</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-14 md:gap-24">
            {[
              { name: '열고닫기', desc: '청년정책 플랫폼' },
              { name: '도도한콜라보', desc: '운영사' },
              { name: '온통청년', desc: '정부 청년포털' },
              { name: '청년재단', desc: '협력기관' },
            ].map((partner) => (
              <div key={partner.name} className="text-center opacity-40 hover:opacity-70 transition-luxury">
                <p className="font-semibold text-dark-300 text-base tracking-tight">{partner.name}</p>
                <p className="text-dark-600 text-[10px] mt-2 tracking-wider uppercase">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-36 bg-gradient-to-b from-dark-950 to-dark-900 border-t border-dark-800/30">
        <div className="container-custom text-center px-4">
          <div className="max-w-2xl mx-auto">
            {/* Decorative */}
            <div className="flex items-center justify-center gap-5 mb-12">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold-500/20" />
              <div className="w-2.5 h-2.5 border border-gold-500/30 rotate-45" />
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold-500/20" />
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-100 mb-8 leading-snug">
              청년정책의 가치를<br />
              <span className="text-gold-300">함께</span> 발견해요
            </h2>

            <p className="text-dark-400 text-base mb-14 leading-loose font-light">
              대한민국 청년정책 어워즈는 청년을 위한 우수 정책을 발굴하고,<br className="hidden md:block" />
              더 많은 청년이 혜택을 받을 수 있도록 정보를 제공합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/awards" className="btn-gold inline-flex items-center justify-center text-sm">
                역대 수상작 보기
              </Link>
              <Link href="/about" className="btn-outline-gold inline-flex items-center justify-center text-sm">
                어워즈 소개
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
