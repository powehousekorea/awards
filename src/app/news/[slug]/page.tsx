import { notFound } from 'next/navigation';
import Link from 'next/link';
import { reader } from '@/lib/reader';
import { DocumentRenderer } from '@keystatic/core/renderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabels: Record<string, { label: string; className: string }> = {
  notice: { label: '공지사항', className: 'bg-[var(--color-navy-100)] text-[var(--color-navy-700)]' },
  news: { label: '뉴스', className: 'bg-[var(--color-mint-100)] text-[var(--color-mint-700)]' },
  event: { label: '이벤트', className: 'bg-[var(--color-yellow-100)] text-[var(--color-yellow-700)]' },
};

export async function generateStaticParams() {
  const news = await reader.collections.news.all();
  return news.map((item) => ({
    slug: item.slug,
  }));
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const newsItem = await reader.collections.news.read(slug);

  if (!newsItem) {
    notFound();
  }

  // MDX 본문 콘텐츠 가져오기
  const content = await newsItem.content() as unknown as { children: unknown[] }[] | null;

  const categoryInfo = categoryLabels[newsItem.category] || categoryLabels.notice;

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <li>
              <Link href="/" className="hover:text-[var(--color-navy-600)]">홈</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/news" className="hover:text-[var(--color-navy-600)]">뉴스/공지</Link>
            </li>
            <li>/</li>
            <li className="text-[var(--color-navy-900)] truncate max-w-[200px]">{newsItem.title}</li>
          </ol>
        </nav>

        {/* Article */}
        <article className="bg-white rounded-xl border border-[var(--border)] p-6 lg:p-10">
          {/* Header */}
          <header className="mb-8 pb-8 border-b border-[var(--border)]">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${categoryInfo.className}`}>
                {categoryInfo.label}
              </span>
              {newsItem.isImportant && (
                <span className="text-sm px-3 py-1 rounded-full font-medium bg-red-100 text-red-700">
                  중요
                </span>
              )}
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-[var(--color-navy-900)] mb-4">
              {newsItem.title}
            </h1>

            <time className="text-[var(--muted-foreground)]">
              {newsItem.date}
            </time>
          </header>

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
        </article>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href="/news"
            className="inline-flex items-center text-[var(--color-navy-600)] hover:text-[var(--color-navy-800)] font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
