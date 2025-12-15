import Link from 'next/link';
import { reader } from '@/lib/reader';

const categoryLabels: Record<string, { label: string; className: string }> = {
  notice: { label: '공지', className: 'bg-gold-500/20 text-gold-400 border border-gold-500/30' },
  event: { label: '이벤트', className: 'bg-purple-500/20 text-purple-400 border border-purple-500/30' },
  update: { label: '업데이트', className: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
};

export default async function NoticePage() {
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
            Announcements
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-dark-100 mb-4">
            Notice
          </h1>
          <p className="text-dark-400 text-lg max-w-2xl">
            대한민국 청년정책 어워즈의 공지사항과 안내를 확인하세요.
          </p>
        </header>

        {/* Important Notice */}
        {importantNews.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
              <h2 className="text-sm font-mono font-medium text-gold-400 tracking-wide uppercase">
                Important
              </h2>
            </div>
            <div className="space-y-4">
              {importantNews.map((item) => {
                const categoryInfo = categoryLabels[item.entry.category] || categoryLabels.notice;
                return (
                  <Link
                    key={item.slug}
                    href={`/notice/${item.slug}`}
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

        {/* Notice List */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-mono tracking-[0.25em] text-dark-500 uppercase mb-2">
                All Notices
              </p>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-dark-100">
                전체 공지
              </h2>
            </div>
            <span className="text-sm text-dark-500 font-mono">
              {sortedNews.length} posts
            </span>
          </div>

          {/* List View */}
          {regularNews.length > 0 ? (
            <div className="border-t border-dark-800">
              {regularNews.map((item) => {
                const categoryInfo = categoryLabels[item.entry.category] || categoryLabels.notice;
                return (
                  <Link
                    key={item.slug}
                    href={`/notice/${item.slug}`}
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
          ) : importantNews.length === 0 ? (
            <div className="text-center py-24 border border-dark-800/30">
              <p className="text-dark-500 font-light">아직 등록된 공지사항이 없습니다.</p>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
