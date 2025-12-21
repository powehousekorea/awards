import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';
import NewsCard from '@/components/cards/NewsCard';

const reader = createReader(process.cwd(), keystaticConfig);

// Keystatic slugField 버그 우회: JSON에서 직접 title과 source 읽기
async function getNewsData(slug: string): Promise<{ title: string; source: string }> {
  try {
    const filePath = path.join(process.cwd(), 'src/content/news', slug, 'index.json');
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    return {
      title: data.title || slug,
      source: data.source || 'Press',
    };
  } catch {
    return { title: slug, source: 'Press' };
  }
}

export default async function NewsPage() {
  // CMS에서 뉴스 데이터 가져오기
  const allNews = await reader.collections.news.all();

  // category가 'news'인 항목만 필터링 (언론 보도만, 공지사항/이벤트 제외)
  const filteredNews = allNews.filter((item) => item.entry.category === 'news');

  // 데이터 매핑 - JSON에서 직접 title과 source 읽기
  const newsWithTitles = await Promise.all(
    filteredNews.map(async (item) => {
      const newsData = await getNewsData(item.slug);
      return {
        slug: item.slug,
        title: newsData.title,
        source: newsData.source,
        summary: item.entry.summary || '',
        date: item.entry.date || '',
        thumbnail: item.entry.thumbnail || null,
        externalUrl: item.entry.externalUrl || null,
      };
    })
  );

  // 날짜순 정렬 (최신순)
  const sortedNews = [...newsWithTitles].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
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
              Press Coverage
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            News
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            대한민국 청년정책 어워즈 관련 언론 보도를 확인하세요.
          </p>
        </header>

        {sortedNews.length > 0 ? (
          <section className="animate-fade-in-up animate-delay-1">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                All Articles
              </span>
              <div className="flex-1 h-px bg-[#333]" />
              <span className="text-[10px] font-mono text-gray-600">
                {sortedNews.length} articles
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedNews.map((item, index) => (
                <div
                  key={item.slug}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <NewsCard
                    id={item.slug}
                    slug={item.slug}
                    title={item.title}
                    summary={item.summary}
                    date={item.date}
                    thumbnail={item.thumbnail}
                    url={item.externalUrl || undefined}
                    source={item.source}
                    isExternal={!!item.externalUrl}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-24">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">등록된 보도자료가 없습니다.</p>
            <p className="text-gray-600 text-sm">언론 보도 소식이 곧 업데이트됩니다.</p>
          </div>
        )}

        {/* Notice Link */}
        <div className="mt-20 pt-12 border-t border-[#252525]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-[#1a1a1a] to-transparent rounded-lg border border-[#333]">
            <div>
              <p className="text-gray-300 font-medium mb-1">공지사항을 찾으시나요?</p>
              <p className="text-gray-500 text-sm">어워즈 관련 공식 안내사항을 확인하세요.</p>
            </div>
            <Link href="/notice" className="btn-outline-gold inline-flex items-center gap-2 shrink-0">
              공지사항 보기
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
