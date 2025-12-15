import Link from 'next/link';
import Image from 'next/image';
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

  // 참여 주체
  const participants = [
    {
      icon: '👥',
      title: '청년',
      items: ['발굴단 모집(100명) ▶ 정책 제안과 평가 주도', '현장 아이디어를 실행 가능한 모델로 발전']
    },
    {
      icon: '🏛️',
      title: '정부·지자체',
      items: ['우수 정책 사례를 제도·시범사업으로 연계', '현장에서 다른 지역·기관과 협력 기회 마련']
    },
    {
      icon: '🏢',
      title: '기업·NGO',
      items: ['CSR·ESG 활동을 청년 아이디어와 매칭', '후원·협찬을 통해 청년과 함께 브랜드 가치 확장']
    },
  ];

  // 추진위원회
  const committees = [
    {
      name: '열고닫기(도도한콜라보)',
      desc: '청년 맞춤형 정책 정보 플랫폼',
      logo: '/images/partners/dodocollab.png',
      url: 'https://opcl.kr'
    },
    {
      name: '(사)한국청년유권자연맹',
      desc: '청년 정치참여 및 글로벌 인재 양성 단체',
      logo: '/images/partners/kyva.png',
      url: 'https://powerhousekorea.com'
    },
    {
      name: '유스나우',
      desc: '지속가능발전목표(SDGs) 달성을 위해 대한민국 청년을 포함한 세계 청년들의 공적 네트워크 중심 글로벌 청년단체',
      logo: '/images/partners/youthnow.png',
      url: 'https://youthnow.or.kr'
    },
    {
      name: '로글로',
      desc: '로컬에서 글로벌까지, 크리에이터와 비즈니스를 연결해 지역 경제 활성화를 목표로 하는 기업',
      logo: '/images/partners/roglo.png',
      url: 'https://loglo.kr'
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950 pt-28 md:pt-32">
      <div className="container-custom pt-8 lg:pt-12 px-4 md:px-0">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">About the Awards</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-8">
            {about?.title || '대한민국 청년정책 어워즈란?'}
          </h1>
        </div>

        {/* 핵심 슬로건 강조 */}
        <div className="border border-gold-500/30 p-10 md:p-16 mb-16 md:mb-24 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gold-300 mb-8">
            청년이 정책을 바꾸고, 미래를 열다
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-dark-200 text-lg md:text-xl leading-relaxed">
              청년이 직접 참여해 우수 청년정책을 찾아내고 평가하는 전국 단위 프로젝트입니다.
            </p>
            <p className="text-dark-300 text-base md:text-lg leading-relaxed">
              공공, 기업, 비영리 등 다양한 영역에서 제안된 정책을 검토하고,
              <br className="hidden md:block" />
              청년 세대의 시각에서 미래 정책 방향을 제시합니다.
            </p>
          </div>
        </div>

        {/* 참여 주체 */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
              <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">Participants</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
              참여 주체
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {participants.map((item) => (
              <div key={item.title} className="border border-dark-700/50 hover:border-gold-500/30 p-8 transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-serif font-bold text-gold-400 mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((text, idx) => (
                    <li key={idx} className="text-sm text-dark-300 leading-relaxed flex items-start gap-2">
                      <span className="text-gold-500 mt-1">★</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 진행 절차 */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
              <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">Process</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
              진행 절차
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { step: '1단계', title: '청년 발굴단', desc: '청년 발굴단이 정책 후보를 제시하고, 데이터 기반 분석을 통해 보완', month: '10월' },
              { step: '2단계', title: '국민투표 + 심사', desc: '전국 청년과 시민이 온라인 투표로 참여, 전문가 그룹이 심사 병행', month: '11월' },
              { step: '3단계', title: '시상식 개최', desc: '최종 결과를 발표하고 어워즈 시상으로 마무리', month: '12월' },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="border border-dark-700/50 p-8 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gold-500 font-serif font-bold">{item.step}</span>
                    <span className="text-xs text-dark-500 bg-dark-800 px-3 py-1 rounded-full">{item.month}</span>
                  </div>
                  <h3 className="font-serif font-bold text-white text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-dark-400 leading-relaxed">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-6 md:-right-8 transform -translate-y-1/2 w-4 md:w-8 items-center justify-center text-gold-500/50 text-xl z-10">
                    →
                  </div>
                )}
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

        {/* Timeline / History */}
        <section id="organization" className="mb-16 md:mb-24">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
              <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">History</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-4">
              연혁
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto text-sm">
              청년정책 어워즈는 단순한 공모전이 아니라, 청년이 직접 정책 발굴·평가·선정에 참여하는
              <span className="text-gold-400"> 제도적 장치</span>로 진화해 왔습니다.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                { year: '2023', title: '열고닫기 청년정책 어워즈', desc: '청년이 주도하는 정책 발굴 시작' },
                { year: '2024', title: '제4회 청년정책 어워즈', desc: '발굴단 100명 모집, 국민투표 1,200명 이상 참여, 글로벌 청년정책 부문 신설' },
                { year: '2025', title: '대한민국 청년정책 어워즈', desc: '공식 확대, 기관·기업·청년단체와 함께하는 협력 구조 강화' },
              ].map((item) => (
                <div key={item.year} className="flex gap-6 md:gap-10 items-start">
                  <div className="text-4xl md:text-5xl font-serif font-bold text-gold-500 shrink-0 w-20 md:w-24">
                    {item.year}
                  </div>
                  <div className="flex-1 border border-dark-700/50 p-6">
                    <h3 className="font-serif font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-dark-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 의미 있는 변화 */}
        <section className="mb-16 md:mb-24">
          <div className="border border-gold-500/30 p-8 md:p-12 text-center">
            <h3 className="text-gold-400 font-serif font-bold text-xl mb-6">의미 있는 변화</h3>
            <p className="text-dark-200 leading-relaxed max-w-2xl mx-auto">
              청년정책 어워즈는 단순한 공모전이 아니라,<br className="hidden md:block" />
              <span className="text-white font-medium">청년이 직접 정책 발굴·평가·선정에 참여하는 제도적 장치</span>로 진화해 왔습니다.
              <br className="hidden md:block" />
              매년 규모와 범위가 넓어지고 있으며, 국제 협력과 교류로 확장 중입니다.
            </p>
          </div>
        </section>

        {/* Committee */}
        <section id="committee" className="mb-16 md:mb-24">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
              <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">Committee</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
              추진위원회
            </h2>
            <p className="text-dark-400 mt-4 max-w-2xl mx-auto">
              대한민국 청년정책 어워즈는 청년 분야 전문 단체들이 함께 만들어갑니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {committees.map((org) => (
              <a
                key={org.name}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-dark-700/50 hover:border-gold-500/30 p-8 text-center transition-all block group"
              >
                <div className="h-32 flex items-center justify-center mb-6">
                  <Image
                    src={org.logo}
                    alt={org.name}
                    width={180}
                    height={180}
                    className="object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-serif font-bold text-white mb-2 text-sm group-hover:text-gold-300 transition-colors">{org.name}</h3>
                <p className="text-xs text-dark-400 leading-relaxed">{org.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
              <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">FAQ</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
              자주 묻는 질문
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'Q1. 청년정책어워즈는 무엇인가요?', a: '청년이 직접 발굴·투표해 \'좋은 정책\'을 뽑는 전국 청년 참여 프로젝트입니다.' },
              { q: 'Q2. 청년은 어떻게 참여할 수 있나요?', a: '발굴단 신청, 국민투표, 청년 선정위원 활동을 통해 정책 과정에 직접 참여합니다.' },
              { q: 'Q3. 내가 참여하면 어떤 변화를 만들 수 있나요?', a: '한 표, 한 아이디어가 실제 정책으로 발전해 전국적으로 확산됩니다.' },
              { q: 'Q4. 기관은 어떻게 참여하나요?', a: '정책 제안, 파트너십·후원, 현장 네트워킹을 통해 함께할 수 있습니다.' },
              { q: 'Q5. 우리 기관은 왜 주목해야 하나요?', a: '전국 청년이 직접 평가한 정책 성과를 확인하고, 청년 친화적 이미지와 혁신 아이디어를 얻을 수 있습니다.' },
              { q: 'Q6. 참여하면 기관에 어떤 이점이 있나요?', a: '청년 관점의 정책 검증, 공동 홍보, 차세대 정책 수요자와 직접 소통 기회를 얻습니다.' },
            ].map((item) => (
              <div key={item.q} className="border border-dark-700/50 p-6">
                <h4 className="font-bold text-gold-400 mb-2">{item.q}</h4>
                <p className="text-sm text-dark-300 leading-relaxed">→ {item.a}</p>
              </div>
            ))}
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
