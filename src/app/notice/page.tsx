import { reader } from '@/lib/reader';
import NoticeListItem from '@/components/cards/NoticeListItem';

export default async function NoticePage() {
  const news = await reader.collections.news.all();

  // 날짜순 정렬 (최신순)
  const sortedNews = news.sort((a, b) => {
    const dateA = a.entry.date ? new Date(a.entry.date).getTime() : 0;
    const dateB = b.entry.date ? new Date(b.entry.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="min-h-screen bg-[#121212] pt-28 md:pt-32">
      <div className="container-custom py-8 lg:py-12">
        {/* Header */}
        <header className="mb-12 md:mb-16">
          <p className="text-[11px] font-mono tracking-[0.25em] text-gray-500 uppercase mb-3">
            Announcements
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            Notice
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            대한민국 청년정책 어워즈의 공지사항과 안내를 확인하세요.
          </p>
        </header>

        {/* Board List */}
        <section className="bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:flex items-center py-4 px-6 bg-[#222] border-b border-[#333] text-xs font-mono text-gray-500 uppercase tracking-wider">
            <div className="w-16 text-center">No</div>
            <div className="w-28 text-center">분류</div>
            <div className="flex-1">제목</div>
            <div className="w-32 text-right">작성일</div>
          </div>

          {/* List Items */}
          {sortedNews.length > 0 ? (
            <div>
              {sortedNews.map((item, index) => (
                <NoticeListItem
                  key={item.slug}
                  slug={item.slug}
                  rowNumber={sortedNews.length - index}
                  title={item.entry.title || ''}
                  category={item.entry.category}
                  date={item.entry.date || ''}
                  isImportant={item.entry.isImportant}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-500">아직 등록된 공지사항이 없습니다.</p>
            </div>
          )}
        </section>

        {/* Footer Info */}
        <div className="mt-6 text-right">
          <span className="text-sm text-gray-500 font-mono">
            Total {sortedNews.length} posts
          </span>
        </div>
      </div>
    </div>
  );
}
