import Link from 'next/link';

// 외부 뉴스 데이터 - 청년정책 어워즈 관련 기사 (최신순 정렬)
const externalNews = [
  {
    id: 1,
    title: '2024 대한민국 청년정책 어워즈 투표 시작',
    source: '요즘것들',
    date: '2024-12-09',
    url: 'https://www.allforyoung.com/posts/58372',
    summary: '200개 이상의 정책 중 전문가 검토와 청년 패널 평가를 거쳐 최종 후보 30개 정책이 선정되었다.',
  },
  {
    id: 2,
    title: '2024년(2023년도 실적) 청년정책 종합평가 결과 발표',
    source: '정부24',
    date: '2024-06-28',
    url: 'https://www.gov.kr/portal/gvrnPolicy/view/H2406000001093983',
    summary: '국무조정실이 45개 중앙행정기관과 17개 시·도가 추진한 2023년도 청년정책의 종합평가 결과를 발표했다.',
  },
  {
    id: 3,
    title: "지난해 청년 선호 정책 '이것'…열고닫기, '청년정책 어워즈' 결과 발표",
    source: '청년일보',
    date: '2024-02-08',
    url: 'https://www.youthdaily.co.kr/news/article.html?no=145274',
    summary: '열고닫기 최우수상·갑자기떡상·노력은가상·왕이될관상 4개 부문 수상작 발표. 알뜰교통카드(18.1%)가 최우수상, 청년도약계좌가 갑자기떡상(27.1%)과 노력은가상(17.5%) 동시 수상.',
  },
  {
    id: 4,
    title: '2024 꼭 알아야 할 청년정책 총정리',
    source: '대한민국 정책브리핑',
    date: '2024-01-15',
    url: 'https://gonggam.korea.kr/newsContentView.es?mid=a10201000000&section_id=NCCD_POLICY&content=NC002&code_cd=0101000000&news_id=849b5128-24df-4a44-8694-7af13f9dda36',
    summary: '주거, 일자리, 교육 등 2024년 청년들이 꼭 알아야 할 정책들을 정리했다.',
  },
  {
    id: 5,
    title: '2023 열고닫기 청년정책 어워즈 개최',
    source: '요즘것들',
    date: '2023-12-26',
    url: 'https://www.allforyoung.com/posts/41099',
    summary: '청년이 직접 뽑는 최고의 청년정책, 2023 열고닫기 청년정책 어워즈가 시작되었다.',
  },
  {
    id: 6,
    title: "청년정책 큐레이션 서비스 '열고닫기', 홈페이지 리뉴얼 오픈",
    source: '이로운넷',
    date: '2023-03-15',
    url: 'https://www.eroun.net/news/articleView.html?idxno=28153',
    summary: '청년정책 정보 플랫폼 열고닫기가 새로운 모습으로 리뉴얼되었다.',
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-dark-950 pt-28 md:pt-32">
      <div className="container-custom py-8 lg:py-12">
        {/* Header */}
        <header className="mb-16 md:mb-20">
          <p className="text-[11px] font-mono tracking-[0.25em] text-dark-500 uppercase mb-3">
            Media Coverage
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-dark-100 mb-4">
            News
          </h1>
          <p className="text-dark-400 text-lg max-w-2xl">
            대한민국 청년정책 어워즈 관련 언론 보도를 확인하세요.
          </p>
        </header>

        {/* News Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {externalNews.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-dark-800 hover:border-gold-500/30 transition-all bg-dark-900/30 hover:bg-dark-900/50"
              >
                {/* Header with source icon */}
                <div className="px-5 py-4 border-b border-dark-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border border-dark-700 flex items-center justify-center">
                      <svg className="w-4 h-4 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gold-400 tracking-wide">
                      {article.source}
                    </span>
                  </div>
                  {/* External Link Icon */}
                  <svg className="w-4 h-4 text-dark-600 group-hover:text-gold-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-[11px] font-mono text-dark-500 mb-3 block">
                    {article.date}
                  </span>
                  <h3 className="text-base font-semibold text-dark-100 mb-3 line-clamp-2 group-hover:text-gold-300 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-dark-500 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Notice Link */}
        <div className="mt-16 pt-10 border-t border-dark-800 text-center">
          <p className="text-dark-500 mb-4">공지사항을 찾으시나요?</p>
          <Link href="/notice" className="btn-outline-gold inline-flex items-center gap-2">
            공지사항 보기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
