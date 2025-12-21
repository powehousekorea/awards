import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { reader } from '@/lib/reader';
import { DocumentRenderer } from '@keystatic/core/renderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabels: Record<string, { label: string; className: string }> = {
  notice: { label: '공지', className: 'bg-amber-500/15 text-amber-300 border border-amber-500/20' },
  event: { label: '이벤트', className: 'bg-violet-500/15 text-violet-300 border border-violet-500/20' },
  update: { label: '업데이트', className: 'bg-sky-500/15 text-sky-300 border border-sky-500/20' },
};

export async function generateStaticParams() {
  const news = await reader.collections.news.all();
  return news.map((item) => ({
    slug: item.slug,
  }));
}

export default async function NoticeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const newsItem = await reader.collections.news.read(slug);

  if (!newsItem) {
    notFound();
  }

  // MDX 본문 콘텐츠 가져오기
  const content = await newsItem.content() as unknown as { children: unknown[] }[] | null;

  const categoryInfo = categoryLabels[newsItem.category] || categoryLabels.notice;
  // CMS의 thumbnail 필드 사용 (하드코딩 제거)
  const posterImage = newsItem.thumbnail || null;

  return (
    <div className="min-h-screen bg-[#121212] pt-28 md:pt-32">
      <div className="container-custom py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 max-w-4xl mx-auto">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <Link href="/notice" className="hover:text-gold-400 transition-colors">Notice</Link>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-gray-300 truncate max-w-[200px]">{newsItem.title}</li>
          </ol>
        </nav>

        {/* Article Card */}
        <article className="max-w-4xl mx-auto bg-[#1a1a1a] border border-[#333] rounded-xl p-8 md:p-12">
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

            <time className="text-gray-500 font-mono text-sm">
              {newsItem.date}
            </time>
          </header>

          {/* Poster Image - CMS thumbnail 필드 사용 */}
          {posterImage && (
            <div className="mb-8 flex justify-center">
              <div className="relative w-full max-w-[500px]">
                <Image
                  src={posterImage}
                  alt={newsItem.title || '공지사항 포스터'}
                  width={500}
                  height={667}
                  className="w-full h-auto max-h-[500px] object-contain"
                />
              </div>
            </div>
          )}

          {/* Summary */}
          {newsItem.summary && (
            <div className="mb-8 p-6 bg-[#252525] rounded-lg border-l-4 border-gold-400">
              <p className="text-lg text-gray-300 leading-relaxed">
                {newsItem.summary}
              </p>
            </div>
          )}

          {/* MDX Content - 본문 렌더링 */}
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
              href="/notice"
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
                {newsItem.category === 'event' ? '참여하기' : '바로가기'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
