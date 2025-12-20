import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

interface AwardEntry {
  title: string;
  year: number;
  awardType: string;
  category?: string;
  provider?: string;
  sector?: string;
  summary?: string;
  image?: string;
}

async function getAwards() {
  const awardsDir = path.join(process.cwd(), 'src/content/awards');
  const folders = fs.readdirSync(awardsDir);

  const awards = folders
    .filter(folder => {
      const folderPath = path.join(awardsDir, folder);
      return fs.statSync(folderPath).isDirectory();
    })
    .map(folder => {
      const jsonPath = path.join(awardsDir, folder, 'index.json');
      if (fs.existsSync(jsonPath)) {
        const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) as AwardEntry;
        return {
          slug: folder,
          entry: content,
        };
      }
      return null;
    })
    .filter((award): award is { slug: string; entry: AwardEntry } => award !== null);

  return awards;
}

export default async function Home() {
  const awards = await getAwards();

  // 수상 타입별 라벨
  const getAwardLabel = (type: string) => {
    const labels: Record<string, string> = {
      grand: '청년정책 대상',
      excellence: '최우수 청년정책상',
      merit: '우수 청년정책상',
      innovation: '청년정책 혁신상',
      global: '글로벌 청년정책상',
      special: '특별상',
    };
    return labels[type] || 'Award';
  };

  const getSectorLabel = (sector: string | undefined) => {
    if (!sector) return null;
    const labels: Record<string, string> = {
      government: '정부',
      local: '지자체',
      corporate: '기업',
      nonprofit: 'NGO',
    };
    return labels[sector] || null;
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20">
        <div className="container-custom">
          {/* Meta Info (Eyebrow) */}
          <div className="flex justify-between items-end mb-6 border-b border-dark-800 pb-4 animate-slide-up">
            <span className="text-xs font-sans tracking-[0.2em] text-dark-500 uppercase">
              Since 2021
            </span>
            <span className="text-xs font-sans tracking-[0.2em] text-dark-500 uppercase hidden md:block">
              The 4th Edition
            </span>
          </div>

          {/* Main Title (English) */}
          <h1 className="text-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-dark-50 mb-8 animate-slide-up animate-delay-1">
            <span className="block">The Korea</span>
            <span className="block">Youth Policy</span>
            <span className="block text-gold-300">Awards</span>
          </h1>

          {/* Korean Title */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-bold text-dark-100 leading-tight mb-12 animate-slide-up animate-delay-2">
            대한민국 청년정책 어워즈
          </h2>

          {/* Description */}
          <div className="max-w-2xl animate-slide-up animate-delay-3">
            <p className="text-dark-300 text-base md:text-lg font-light leading-relaxed mb-10">
              청년이 직접 선정하는 대한민국 최고의 청년정책 시상식
            </p>
            <Link href="/awards" className="btn-primary">
              역대 수상작 보기
            </Link>
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
            <div className="text-center mt-8">
              <Link
                href="https://event-us.kr/opcl/event/118545"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 bg-gold-300 hover:bg-gold-400 text-dark-950 font-semibold text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/20"
              >
                참가하기
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
                // 먼저 awardType으로 정렬 (grand -> excellence)
                const typeOrder = { grand: 0, excellence: 1 };
                const typeA = typeOrder[a.entry.awardType as keyof typeof typeOrder] ?? 2;
                const typeB = typeOrder[b.entry.awardType as keyof typeof typeOrder] ?? 2;
                if (typeA !== typeB) return typeA - typeB;

                // 같은 타입이면 sector로 정렬 (정부 -> 지자체 -> 기업 -> NGO)
                const sectorOrder = { government: 0, local: 1, corporate: 2, nonprofit: 3 };
                const sectorA = sectorOrder[a.entry.sector as keyof typeof sectorOrder] ?? 4;
                const sectorB = sectorOrder[b.entry.sector as keyof typeof sectorOrder] ?? 4;
                return sectorA - sectorB;
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
      <section className="py-24 md:py-32 border-t border-dark-800">
        <div className="container-custom text-center">
          <p className="text-label mb-6">Get Involved</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-dark-100 mb-8">
            청년들의 더 나은 미래를 함께 만들어요
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
