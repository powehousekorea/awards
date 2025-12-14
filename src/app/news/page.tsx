import Link from 'next/link';
import { reader } from '@/lib/reader';

const categoryLabels: Record<string, { label: string; className: string }> = {
  notice: { label: '공지사항', className: 'bg-gold-500/20 text-gold-400 border border-gold-500/30' },
  news: { label: '뉴스', className: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
  event: { label: '이벤트', className: 'bg-purple-500/20 text-purple-400 border border-purple-500/30' },
};

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
    <div className="min-h-screen bg-[#0d0a07] pt-28 md:pt-32">
      <div className="container-custom py-8 lg:py-12 px-4 md:px-0">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase">News & Notice</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
            뉴스 / 공지사항
          </h1>
          <p className="text-dark-400 max-w-2xl mx-auto font-serif">
            청년정책 어워즈의 최신 소식을 확인하세요
          </p>
        </div>

        {/* Important News */}
        {importantNews.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-gold-500 rounded-full" />
              <h2 className="text-sm font-serif font-bold text-gold-500 tracking-wide uppercase">중요 공지</h2>
            </div>
            <div className="space-y-4">
              {importantNews.map((item) => {
                const categoryInfo = categoryLabels[item.entry.category] || categoryLabels.notice;
                return (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="block border border-gold-500/30 p-6 md:p-8 hover:border-gold-500/50 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs px-3 py-1 font-medium ${categoryInfo.className}`}>
                            {categoryInfo.label}
                          </span>
                          <span className="text-sm text-dark-500 font-serif">
                            {item.entry.date}
                          </span>
                        </div>
                        <h3 className="font-serif font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                          {item.entry.title}
                        </h3>
                        {item.entry.summary && (
                          <p className="text-sm text-dark-400 line-clamp-2">
                            {item.entry.summary}
                          </p>
                        )}
                      </div>
                      <svg className="w-5 h-5 text-gold-500/50 flex-shrink-0 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular News */}
        <div>
          {regularNews.length > 0 ? (
            <div className="border border-dark-700/50 divide-y divide-dark-800/50">
              {regularNews.map((item) => {
                const categoryInfo = categoryLabels[item.entry.category] || categoryLabels.notice;
                return (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="block p-6 md:p-8 hover:bg-dark-900/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs px-3 py-1 font-medium ${categoryInfo.className}`}>
                            {categoryInfo.label}
                          </span>
                          <span className="text-sm text-dark-500 font-serif">
                            {item.entry.date}
                          </span>
                        </div>
                        <h3 className="font-serif font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                          {item.entry.title}
                        </h3>
                        {item.entry.summary && (
                          <p className="text-sm text-dark-400 line-clamp-2">
                            {item.entry.summary}
                          </p>
                        )}
                      </div>
                      <svg className="w-5 h-5 text-gold-500/50 flex-shrink-0 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 border border-dark-700/50">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/30" />
                <div className="w-3 h-3 border border-gold-500/30 rotate-45" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/30" />
              </div>
              <p className="text-lg text-dark-400 font-serif">
                아직 등록된 뉴스가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
