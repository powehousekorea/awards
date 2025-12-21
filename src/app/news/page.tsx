import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';
import NewsCard from '@/components/cards/NewsCard';

const reader = createReader(process.cwd(), keystaticConfig);

export default async function NewsPage() {
  // CMS에서 뉴스 데이터 가져오기
  const allNews = await reader.collections.news.all();

  // category가 'news' 또는 'event'인 항목만 필터링 (공지사항 제외)
  const filteredNews = allNews.filter(
    (item) => item.entry.category === 'news' || item.entry.category === 'event'
  );

  // 날짜순 정렬 (최신순)
  const sortedNews = [...filteredNews].sort((a, b) => {
    const dateA = new Date(a.entry.date || '').getTime();
    const dateB = new Date(b.entry.date || '').getTime();
    return dateB - dateA;
  });

  return (
    <div className="min-h-screen bg-[#121212] pt-28 md:pt-32">
      <div className="container-custom py-8 lg:py-12">
        {/* Header */}
        <header className="mb-16 md:mb-20">
          <p className="text-[11px] font-mono tracking-[0.25em] text-gray-500 uppercase mb-3">
            News & Events
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            News
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            대한민국 청년정책 어워즈 관련 뉴스와 이벤트를 확인하세요.
          </p>
        </header>

        {/* News Grid */}
        <section>
          {sortedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedNews.map((item) => (
                <NewsCard
                  key={item.slug}
                  id={item.slug}
                  slug={item.slug}
                  title={item.entry.title || ''}
                  summary={item.entry.summary || ''}
                  date={item.entry.date || ''}
                  thumbnail={item.entry.thumbnail || null}
                  source={item.entry.category === 'event' ? 'Event' : 'News'}
                  isExternal={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-500 text-lg">등록된 뉴스가 없습니다.</p>
            </div>
          )}
        </section>

        {/* Notice Link */}
        <div className="mt-16 pt-10 border-t border-[#333] text-center">
          <p className="text-gray-500 mb-4">공지사항을 찾으시나요?</p>
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
