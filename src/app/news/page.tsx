import Link from 'next/link';
import { reader } from '@/lib/reader';

const categoryLabels: Record<string, { label: string; className: string }> = {
  notice: { label: '공지사항', className: 'bg-gold-500/20 text-gold-400 border border-gold-500/30' },
  news: { label: '뉴스', className: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
  event: { label: '이벤트', className: 'bg-purple-500/20 text-purple-400 border border-purple-500/30' },
};

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
    summary: '청년 정책정보 플랫폼 열고닫기가 2023 청년정책 어워즈 결과를 발표했다. 알뜰교통카드가 최우수상을 수상했다.',
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

export default async function NewsPage() {
  const news = await reader.collections.news.all();

  // 날짜순 정렬 (최신순)
  const sortedNews = news.sort((a, b) => {
    const dateA = a.entry.date ? new Date(a.entry.date).getTime() : 0;
    const dateB = b.entry.date ? new Date(b.entry.date).getTime() : 0;
    return dateB - dateA;
  });

  // 중요 공지 분리
  const importantNews = sortedNews.filter((n) => n.entry.isImportant);
  const regularNews = sortedNews.filter((n) => !n.entry.isImportant);

  return (
    <div className="min-h-screen bg-dark-950 pt-28 md:pt-32">
      <div className="container-custom py-8 lg:py-12">
        {/* Header */}
        <header className="mb-16 md:mb-20">
          <p className="text-[11px] font-mono tracking-[0.25em] text-dark-500 uppercase mb-3">
            News & Updates
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-dark-100 mb-4">
            뉴스
          </h1>
          <p className="text-dark-400 text-lg max-w-2xl">
            대한민국 청년정책 어워즈의 최신 소식과 관련 뉴스를 확인하세요.
          </p>
        </header>

        {/* Important News - 내부 공지 */}
        {importantNews.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-gold-400 rounded-full" />
              <h2 className="text-sm font-mono font-medium text-gold-400 tracking-wide uppercase">
                Important Notice
              </h2>
            </div>
            <div className="space-y-4">
              {importantNews.map((item) => {
                const categoryInfo = categoryLabels[item.entry.category] || categoryLabels.notice;
                return (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="block border border-gold-500/30 p-6 md:p-8 hover:border-gold-500/50 hover:bg-dark-900/30 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-[10px] px-3 py-1 font-mono uppercase tracking-wider ${categoryInfo.className}`}>
                            {categoryInfo.label}
                          </span>
                          <span className="text-sm text-dark-500 font-mono">
                            {item.entry.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-dark-100 mb-2 group-hover:text-gold-300 transition-colors">
                          {item.entry.title}
                        </h3>
                        {item.entry.summary && (
                          <p className="text-sm text-dark-500 line-clamp-2">
                            {item.entry.summary}
                          </p>
                        )}
                      </div>
                      <span className="text-dark-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* External News - 외부 뉴스 기사 (썸네일 그리드) */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-mono tracking-[0.25em] text-dark-500 uppercase mb-2">
                Media Coverage
              </p>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-dark-100">
                언론 보도
              </h2>
            </div>
          </div>

          {/* News Grid - 카드 형태 (썸네일 없이 깔끔하게) */}
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
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider">
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

        {/* Internal News - 내부 뉴스/공지 리스트 */}
        {regularNews.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[11px] font-mono tracking-[0.25em] text-dark-500 uppercase mb-2">
                  Announcements
                </p>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-dark-100">
                  공지사항
                </h2>
              </div>
            </div>

            {/* List View */}
            <div className="border-t border-dark-800">
              {regularNews.map((item) => {
                const categoryInfo = categoryLabels[item.entry.category] || categoryLabels.notice;
                return (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="group block"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 py-5 md:py-6 border-b border-dark-800/50 transition-all duration-300 hover:bg-dark-900/50">
                      {/* Date */}
                      <div className="md:col-span-2">
                        <span className="text-sm font-mono text-dark-500">
                          {item.entry.date}
                        </span>
                      </div>

                      {/* Category */}
                      <div className="md:col-span-2">
                        <span className={`text-[10px] px-2 py-1 font-mono uppercase tracking-wider ${categoryInfo.className}`}>
                          {categoryInfo.label}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="md:col-span-7 mt-2 md:mt-0">
                        <h3 className="text-base font-medium text-dark-100 group-hover:text-gold-300 transition-colors">
                          {item.entry.title}
                        </h3>
                      </div>

                      {/* Arrow */}
                      <div className="md:col-span-1 hidden md:flex items-center justify-end">
                        <span className="text-dark-600 opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gold-400">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Empty State */}
        {regularNews.length === 0 && importantNews.length === 0 && (
          <div className="text-center py-24 border border-dark-800/30">
            <p className="text-dark-500 font-light">아직 등록된 공지사항이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
