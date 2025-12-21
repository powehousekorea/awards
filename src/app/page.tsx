import Link from 'next/link';
import Image from 'next/image';
import { reader } from '@/lib/reader';
import {
  getAwardLabel,
  getSectorLabel,
  getAwardTypeOrder,
  getSectorOrder,
} from '@/lib/award-utils';

export default async function Home() {
  const allAwards = await reader.collections.awards.all();
  const awards = allAwards.map(award => ({
    slug: award.slug,
    entry: award.entry,
  }));

  return (
    <div className="min-h-screen bg-dark-950">
      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/95 to-dark-900 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,184,134,0.05)_0%,_transparent_50%)] pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Meta Info (Eyebrow) */}
          <div className="flex justify-between items-end mb-8 border-b border-dark-800/50 pb-4 animate-fade-in-up">
            <span className="text-[11px] font-mono tracking-[0.25em] text-dark-500 uppercase">
              Since 2021
            </span>
            <span className="text-[11px] font-mono tracking-[0.25em] text-gold-500/60 uppercase hidden md:block">
              The 5th Edition
            </span>
          </div>

          {/* Main Title (English) - Serif for Authority */}
          <h1 className="text-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-dark-50 mb-6 animate-fade-in-up animate-delay-1">
            <span className="block">The Korea</span>
            <span className="block">Youth Policy</span>
            <span className="block text-gradient-gold">Awards</span>
          </h1>

          {/* Korean Title - Bold Sans for Modern Feel */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-dark-200 leading-tight mb-12 animate-fade-in-up animate-delay-2">
            대한민국 청년정책 어워즈
          </h2>

          {/* Description */}
          <div className="max-w-2xl animate-fade-in-up animate-delay-3">
            <p className="text-dark-400 text-lg md:text-xl font-light leading-relaxed mb-10 tracking-wide">
              청년이 직접 선정하는 대한민국 최고의 청년정책 시상식
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/awards" className="btn-gold">
                역대 수상작 보기
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/about" className="btn-outline-gold">
                어워즈 소개
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in-up animate-delay-5 hidden md:block">
            <div className="flex flex-col items-center gap-2 text-dark-600">
              <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-dark-600 to-transparent" />
            </div>
          </div>

        </div>
      </section>

      {/* ===== 2025 시상식 안내 SECTION ===== */}
      <section className="py-16 md:py-24 border-t border-dark-800 bg-gradient-to-b from-dark-900/50 to-dark-950">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            {/* 섹션 헤더 */}
            <div className="text-center mb-8">
              <p className="text-label text-gold-400 mb-3">Coming Soon</p>
              <h2 className="text-2xl md:text-3xl text-dark-100 mb-2">
                2025 시상식 안내
              </h2>
              <p className="text-dark-400">
                2025년 12월 23일(화) 10:00 | 국회도서관 대강당
              </p>
            </div>

            {/* 포스터 이미지 */}
            <Link
              href="https://event-us.kr/opcl/event/118545"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-lg overflow-hidden shadow-2xl border border-dark-700/50 hover:border-gold-400/50 transition-all duration-300 hover:shadow-gold-400/10"
            >
              <Image
                src="/images/2025-ceremony-poster.png"
                alt="2025 대한민국 청년정책 어워즈 시상식 - 청년이 직접 뽑은 대한민국 최고의 청년정책"
                width={1206}
                height={2622}
                className="w-full h-auto"
                priority
              />
            </Link>

            {/* 참가하기 버튼 */}
            <div className="text-center mt-10">
              <Link
                href="https://event-us.kr/opcl/event/118545"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-3 px-12 py-5 text-lg"
              >
                시상식 참가 신청
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. ABOUT SECTION ===== */}
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
              ].map((stat) => (
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

      {/* ===== 3. CATEGORIES SECTION ===== */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-dark-800">
            {[
              {
                title: '청년정책 대상',
                titleEn: 'Grand Prize',
                description: '올해 가장 많은 청년의 사랑을 받은 최고의 정책',
              },
              {
                title: '최우수 청년정책상',
                titleEn: 'Excellence Award',
                description: '정부·지자체·기업·비영리 각 부문별 우수 정책',
              },
              {
                title: '청년정책 혁신상',
                titleEn: 'Innovation Award',
                description: '창의적 접근으로 청년 문제를 해결한 정책',
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

      {/* ===== 4. RECENT AWARDS SECTION ===== */}
      <section id="awards-list" className="py-24 md:py-32 border-t border-dark-800">
        <div className="container-custom">
          {/* Section Header */}
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

          {/* Awards List - 2025년 대상/최우수상 */}
          <div className="space-y-0">
            {/* 2025 Year Header */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-dark-800">
                2025
              </span>
              <div className="flex-1 h-px bg-dark-800" />
            </div>

            {/* Award Entries - 2025년 대상/최우수상만 표시 */}
            {awards
              .filter(award => award.entry.year === 2025 && (award.entry.awardType === 'grand' || award.entry.awardType === 'excellence'))
              .sort((a, b) => {
                const typeOrderA = getAwardTypeOrder(a.entry.awardType);
                const typeOrderB = getAwardTypeOrder(b.entry.awardType);
                if (typeOrderA !== typeOrderB) return typeOrderA - typeOrderB;

                const sectorOrderA = getSectorOrder(a.entry.sector);
                const sectorOrderB = getSectorOrder(b.entry.sector);
                return sectorOrderA - sectorOrderB;
              })
              .map((award) => (
                <Link
                  key={award.slug}
                  href={`/awards/${award.slug}`}
                  className="group block relative"
                >
                  {/* List Row */}
                  <div className="relative grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-6 md:py-8 border-b border-dark-800/50 transition-all duration-300 hover:bg-dark-900/50 hover:border-dark-700/50">

                    {/* 수상 타입 + 부문 */}
                    <div className="md:col-span-3 flex items-center gap-2">
                      <span className={`text-base md:text-lg font-medium ${
                        award.entry.awardType === 'grand'
                          ? 'text-gold-400'
                          : 'text-dark-300'
                      }`}>
                        {getAwardLabel(award.entry.awardType)}
                      </span>
                      {getSectorLabel(award.entry.sector) && (
                        <span className="text-xs md:text-sm px-2 py-0.5 rounded border border-dark-700 text-dark-400">
                          {getSectorLabel(award.entry.sector)}
                        </span>
                      )}
                    </div>

                    {/* 정책 타이틀 */}
                    <div className="md:col-span-5 mt-2 md:mt-0">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-dark-100 leading-tight transition-colors duration-300 group-hover:text-gold-300">
                        {award.entry.title}
                      </h3>
                    </div>

                    {/* 기관명 */}
                    <div className="md:col-span-3 mt-2 md:mt-0 flex items-center">
                      <span className="text-base md:text-lg text-dark-400">
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
                View All Awards
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ===== 공동주최 SECTION ===== */}
      <section className="py-20 md:py-24 border-t border-dark-800">
        <div className="container-custom">
          <p className="text-label text-center mb-4">Co-hosted by</p>
          <h3 className="text-xl md:text-2xl text-dark-200 text-center mb-12">
            대한민국 청년정책 어워즈 추진위원회
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {[
              { name: '열고닫기(도도한콜라보)', logo: '/images/partners/dodocollab.png' },
              { name: '(사)한국청년유권자연맹', logo: '/images/partners/kyva.png' },
              { name: '유스나우', logo: '/images/partners/youthnow.png' },
              { name: '로글로', logo: '/images/partners/roglo.png' },
            ].map((partner) => (
              <div key={partner.name} className="text-center opacity-60 hover:opacity-100 transition-smooth">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={160}
                  className="object-contain mx-auto"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/about#committee" className="btn-text group">
              추진위원회 소개
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER CTA ===== */}
      <section className="py-24 md:py-32 border-t border-dark-800 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,184,134,0.03)_0%,_transparent_70%)] pointer-events-none" />

        <div className="container-custom text-center relative z-10">
          <p className="text-[11px] font-mono tracking-[0.3em] text-gold-500/60 uppercase mb-6">Get Involved</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-dark-100 mb-6 leading-tight">
            청년들의 더 나은 미래를<br className="hidden sm:block" />
            함께 만들어요
          </h2>
          <p className="text-dark-400 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light">
            당신의 한 표가 더 나은 청년정책을 만듭니다
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/awards" className="btn-gold">
              역대 수상작 보기
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/about" className="btn-outline-gold">
              자세히 알아보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
