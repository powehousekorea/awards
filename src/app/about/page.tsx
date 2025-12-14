import Link from 'next/link';
import { reader } from '@/lib/reader';

export default async function AboutPage() {
  const about = await reader.singletons.about.read();

  // 시상 부문 정의
  const awardCategories = [
    {
      title: '청년정책 대상',
      description: '올해 가장 많은 청년의 사랑을 받은 최고의 정책',
    },
    {
      title: '최우수 청년정책상',
      description: '각 부문별(정부/지자체/기업/비영리) 우수 정책',
    },
    {
      title: '청년정책 혁신상',
      description: '창의적 접근으로 청년 문제를 해결한 혁신 정책',
    },
    {
      title: '글로벌 청년정책상',
      description: '해외 우수 청년정책 중 벤치마킹 가치가 높은 정책',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0a07] pt-28 md:pt-32">
      <div className="container-custom py-8 lg:py-12 px-4 md:px-0">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">About the Awards</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
            {about?.title || '청년정책 어워즈란?'}
          </h1>
          <p className="text-dark-400 max-w-3xl mx-auto leading-relaxed font-serif">
            대한민국 청년정책 어워즈는 청년을 위한 우수 정책을 발굴하고,
            <br className="hidden md:block" />
            더 많은 청년이 정책 혜택을 받을 수 있도록 정보를 제공하는 프로젝트입니다.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          <div className="border border-gold-500/30 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-gold-500 rounded-full" />
              <h2 className="text-lg font-serif font-bold text-gold-500 tracking-wide">VISION</h2>
            </div>
            <p className="text-dark-200 leading-relaxed font-serif text-lg">
              {about?.vision || '모든 청년이 자신에게 맞는 정책을 쉽게 찾고 활용할 수 있는 세상을 만듭니다.'}
            </p>
          </div>

          <div className="border border-dark-700/50 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-gold-500 rounded-full" />
              <h2 className="text-lg font-serif font-bold text-white tracking-wide">MISSION</h2>
            </div>
            <p className="text-dark-300 leading-relaxed font-serif text-lg">
              {about?.mission || '청년정책의 가치를 발굴하고, 우수 정책을 널리 알려 더 많은 청년이 혜택을 받을 수 있도록 합니다.'}
            </p>
          </div>
        </div>

        {/* What We Do */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
              <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">What We Do</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
              어워즈가 하는 일
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { num: '01', title: '정책 아카이빙', desc: '전국의 청년 정책을 수집하고 체계적으로 분류하여 청년들이 쉽게 찾아볼 수 있도록 정리합니다.' },
              { num: '02', title: '우수 정책 선정', desc: '청년들의 참여를 통해 실제로 도움이 되는 우수 정책을 선정하고 시상합니다.' },
              { num: '03', title: '정보 확산', desc: '선정된 우수 정책을 널리 알려 더 많은 청년이 혜택을 받을 수 있도록 합니다.' },
            ].map((item) => (
              <div key={item.title} className="border border-dark-700/50 hover:border-gold-500/30 p-8 md:p-10 text-center transition-all group">
                <div className="text-gold-500/30 text-4xl font-serif mb-6">{item.num}</div>
                <h3 className="text-lg font-serif font-bold text-white mb-4">{item.title}</h3>
                <p className="text-sm text-dark-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Award Categories - 4개 시상부문 */}
        <section className="mb-16 md:mb-24" id="criteria">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
              <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">Award Categories</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
              시상 부문
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {awardCategories.map((category, index) => (
              <div key={category.title} className="border border-dark-700/50 hover:border-gold-500/30 p-8 text-center transition-all relative">
                <div className="absolute top-4 left-4 text-gold-500/20 text-3xl font-serif">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-serif font-bold text-white mb-3 mt-4">{category.title}</h3>
                <p className="text-sm text-dark-400 leading-relaxed">{category.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Selection Process */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
              <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">Selection Process</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
              선정 과정
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: '정책 수집', desc: '전국 청년정책 데이터 수집 및 분류' },
              { step: '02', title: '후보 선정', desc: '전문가 심사를 통한 후보 정책 선정' },
              { step: '03', title: '청년 투표', desc: '청년들의 온라인 투표 진행' },
              { step: '04', title: '최종 선정', desc: '투표 결과와 심사를 종합해 수상작 선정' },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="border border-dark-700/50 p-8 text-center h-full">
                  <div className="text-4xl font-serif font-bold text-gold-500 mb-4">{item.step}</div>
                  <h3 className="font-serif font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-dark-400">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gold-500/30 text-2xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section id="organization" className="mb-16 md:mb-24">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
              <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">History</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
              어워즈 연혁
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/50 to-transparent" />

              {[
                { year: '2021', title: '제1회 청년정책 어워즈', desc: '알뜰교통카드 대상 수상' },
                { year: '2022', title: '제2회 청년정책 어워즈', desc: '국민취업지원제도 대상 수상' },
                { year: '2023', title: '제3회 청년정책 어워즈', desc: '알뜰교통카드 2연속 대상 수상, 45만+ 참여' },
                { year: '2024', title: '제4회 청년정책 어워즈', desc: '더욱 확대된 참여와 함께 준비 중' },
              ].map((item) => (
                <div key={item.year} className="relative pl-20 pb-10 last:pb-0">
                  <div className="absolute left-0 text-3xl font-serif font-bold text-gold-500">
                    {item.year}
                  </div>
                  <div className="absolute left-[30px] top-2 w-3 h-3 border-2 border-gold-500 bg-dark-950 rounded-full" />
                  <div className="border border-dark-700/50 p-6">
                    <h3 className="font-serif font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-dark-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="border border-gold-500/30 p-10 md:p-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/30" />
              <div className="w-3 h-3 border border-gold-500/50 rotate-45" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/30" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-6">
              역대 수상작을 만나보세요
            </h2>
            <p className="text-dark-400 mb-10 max-w-xl mx-auto font-serif">
              청년들이 직접 선택한 최고의 정책들을 확인하고,<br className="hidden md:block" />
              나에게 도움이 되는 정책을 찾아보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/awards" className="btn-gold inline-flex items-center justify-center font-serif">
                역대 수상작 보기
              </Link>
              <Link href="/news" className="btn-outline-gold inline-flex items-center justify-center font-serif">
                뉴스/공지사항
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
