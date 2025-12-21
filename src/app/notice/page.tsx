import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { reader } from '@/lib/reader';
import NoticeListItem from '@/components/cards/NoticeListItem';

// Keystatic slugField 버그 우회: JSON에서 직접 title 읽기
async function getNewsTitle(slug: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'src/content/news', slug, 'index.json');
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    return data.title || slug;
  } catch {
    return slug;
  }
}

export default async function NoticePage() {
  const allNews = await reader.collections.news.all();

  // 'news' 카테고리 제외 (공지, 이벤트 등만 통과)
  const filteredNotices = allNews.filter((item) => item.entry.category !== 'news');

  // 데이터 매핑 - JSON에서 직접 title 읽기
  const newsWithTitles = await Promise.all(
    filteredNotices.map(async (item) => ({
      slug: item.slug,
      title: await getNewsTitle(item.slug),
      date: item.entry.date || '',
      category: item.entry.category,
      isImportant: item.entry.isImportant,
    }))
  );

  // 날짜순 정렬 (최신순)
  const sortedNews = [...newsWithTitles].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="min-h-screen bg-[#121212] pt-28 md:pt-32">
      <div className="container-custom py-8 lg:py-12">
        {/* Header */}
        <header className="mb-12 md:mb-16 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-gold-500/50 to-transparent" />
            <p className="text-[11px] font-mono tracking-[0.25em] text-gold-500/60 uppercase">
              Announcements
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            Notice
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            대한민국 청년정책 어워즈의 공지사항과 안내를 확인하세요.
          </p>
        </header>

        {sortedNews.length > 0 ? (
          <section className="animate-fade-in-up animate-delay-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                All Notices
              </span>
              <div className="flex-1 h-px bg-[#333]" />
              <span className="text-[10px] font-mono text-gray-600">
                {sortedNews.length} posts
              </span>
            </div>

            {/* Board List */}
            <div className="bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:flex items-center py-4 px-6 bg-[#1f1f1f] border-b border-[#333] text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                <div className="w-16 text-center">No</div>
                <div className="w-28 text-center">Category</div>
                <div className="flex-1">Title</div>
                <div className="w-32 text-right">Date</div>
              </div>

              {/* List Items */}
              <div>
                {sortedNews.map((item, index) => (
                  <NoticeListItem
                    key={item.slug}
                    slug={item.slug}
                    rowNumber={sortedNews.length - index}
                    title={item.title}
                    category={item.category}
                    date={item.date}
                    isImportant={item.isImportant}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <div className="text-center py-24">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">아직 등록된 공지사항이 없습니다.</p>
            <p className="text-gray-600 text-sm">새로운 공지가 곧 업데이트됩니다.</p>
          </div>
        )}

        {/* News Link */}
        <div className="mt-20 pt-12 border-t border-[#252525]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-[#1a1a1a] to-transparent rounded-lg border border-[#333]">
            <div>
              <p className="text-gray-300 font-medium mb-1">뉴스를 찾으시나요?</p>
              <p className="text-gray-500 text-sm">어워즈 관련 언론 보도를 확인하세요.</p>
            </div>
            <Link href="/news" className="btn-outline-gold inline-flex items-center gap-2 shrink-0">
              뉴스 보기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
