import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { reader } from '@/lib/reader';
import { DocumentRenderer } from '@keystatic/core/renderer';
import ShareButtons from '@/components/article/ShareButtons';
import RelatedArticles from '@/components/article/RelatedArticles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabels: Record<string, { label: string; className: string }> = {
  notice: { label: '공지사항', className: 'bg-amber-500/15 text-amber-300 border border-amber-500/20' },
  news: { label: '뉴스', className: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20' },
  event: { label: '이벤트', className: 'bg-violet-500/15 text-violet-300 border border-violet-500/20' },
};

export async function generateStaticParams() {
  const news = await reader.collections.news.all();
  return news.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const newsItem = await reader.collections.news.read(slug);

  if (!newsItem) {
    return {
      title: '뉴스를 찾을 수 없습니다 | 대한민국 청년정책 어워즈',
    };
  }

  const categoryLabel = categoryLabels[newsItem.category]?.label || '뉴스';
  const title = `${newsItem.title} | ${categoryLabel} - 대한민국 청년정책 어워즈`;
  const description = newsItem.summary || `대한민국 청년정책 어워즈 ${categoryLabel}입니다.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'ko_KR',
      publishedTime: newsItem.date || undefined,
      images: newsItem.thumbnail
        ? [{ url: newsItem.thumbnail, width: 1200, height: 630, alt: newsItem.title || '뉴스 이미지' }]
        : [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: '대한민국 청년정책 어워즈' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: newsItem.thumbnail ? [newsItem.thumbnail] : ['/images/og-image.jpg'],
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const newsItem = await reader.collections.news.read(slug);

  if (!newsItem) {
    notFound();
  }

  // MDX 본문 콘텐츠 가져오기
  const content = await newsItem.content() as unknown as { children: unknown[] }[] | null;

  // 관련 기사 가져오기 (같은 카테고리, 현재 기사 제외)
  const allNews = await reader.collections.news.all();
  const relatedNews = allNews
    .filter(item => item.slug !== slug && item.entry.category === newsItem.category)
    .sort((a, b) => {
      const dateA = new Date(a.entry.date || '').getTime();
      const dateB = new Date(b.entry.date || '').getTime();
      return dateB - dateA;
    })
    .slice(0, 3)
    .map(item => ({
      slug: item.slug,
      title: item.entry.title || '',
      date: item.entry.date || undefined,
      thumbnail: item.entry.thumbnail || undefined,
    }));

  const categoryInfo = categoryLabels[newsItem.category] || categoryLabels.notice;
  const thumbnailImage = newsItem.thumbnail || null;

  return (
    <div className="min-h-screen bg-[#121212] pt-28 md:pt-32">
      <div className="container-custom py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 animate-fade-in-up">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <Link href="/news" className="hover:text-gold-400 transition-colors">News</Link>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-gray-300 truncate max-w-[200px]">{newsItem.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Article */}
          <article className="lg:col-span-8 animate-fade-in-up animate-delay-1">
            {/* Hero Image */}
            {thumbnailImage && (
              <div className="relative aspect-video mb-8 rounded-xl overflow-hidden">
                <Image
                  src={thumbnailImage}
                  alt={newsItem.title || '뉴스 이미지'}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}

            {/* Article Card */}
            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-8 md:p-10">
              {/* Header */}
              <header className="mb-8 pb-6 border-b border-[#333]">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[10px] px-3 py-1 font-mono uppercase tracking-wider rounded ${categoryInfo.className}`}>
                    {categoryInfo.label}
                  </span>
                  {newsItem.isImportant && (
                    <span className="text-[10px] px-3 py-1 font-mono uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/20 rounded">
                      Important
                    </span>
                  )}
                </div>

                <h1 className="text-2xl lg:text-3xl font-bold text-gray-100 mb-4 leading-tight">
                  {newsItem.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <time className="font-mono">{newsItem.date}</time>
                </div>
              </header>

              {/* Summary */}
              {newsItem.summary && (
                <div className="mb-8 p-6 bg-[#252525] rounded-lg border-l-4 border-gold-400">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {newsItem.summary}
                  </p>
                </div>
              )}

              {/* MDX Content */}
              {content && content.length > 0 && (
                <div className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-gray-100 prose-headings:font-semibold prose-headings:mt-8 prose-headings:mb-4
                  prose-h2:text-xl prose-h3:text-lg
                  prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                  prose-li:text-gray-300 prose-li:marker:text-gold-400
                  prose-ul:my-4 prose-ol:my-4
                  prose-strong:text-white prose-strong:font-semibold
                  prose-a:text-gold-400 prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-gold-400 prose-blockquote:bg-[#252525] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded
                  prose-code:text-gold-300 prose-code:bg-[#252525] prose-code:px-1 prose-code:rounded
                ">
                  <DocumentRenderer document={content as any} />
                </div>
              )}

              {/* Footer Action Bar */}
              <div className="mt-10 pt-6 border-t border-[#333] flex items-center justify-between">
                <Link
                  href="/news"
                  className="inline-flex items-center text-gray-400 hover:text-gold-400 font-medium transition-colors group"
                >
                  <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  목록으로
                </Link>
                {newsItem.externalUrl && (
                  <a
                    href={newsItem.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold inline-flex items-center gap-2 px-6 py-3"
                  >
                    원문 보기
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 animate-fade-in-up animate-delay-2">
            {/* Share Buttons */}
            <ShareButtons title={newsItem.title || ''} />

            {/* Article Info */}
            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-4">
                Article Info
              </h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs text-gray-500 mb-1">발행일</dt>
                  <dd className="text-gray-300 font-mono text-sm">{newsItem.date}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500 mb-1">카테고리</dt>
                  <dd>
                    <span className={`inline-block text-[10px] px-2 py-0.5 font-mono uppercase tracking-wider rounded ${categoryInfo.className}`}>
                      {categoryInfo.label}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Related Articles */}
            {relatedNews.length > 0 && (
              <RelatedArticles articles={relatedNews} basePath="/news" />
            )}

            {/* Notice Link */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#252525] border border-[#333] rounded-xl p-6">
              <p className="text-gray-400 text-sm mb-3">공지사항도 확인하세요</p>
              <Link
                href="/notice"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-medium transition-colors group"
              >
                공지사항 보기
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
