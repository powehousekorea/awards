import { notFound } from 'next/navigation';
import Link from 'next/link';
import { reader } from '@/lib/reader';

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

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            {newsItem.summary && (
              <p className="text-lg text-[var(--color-navy-700)] leading-relaxed">
                {newsItem.summary}
              </p>
            )}
            {/* MDX 콘텐츠는 추후 렌더링 구현 필요 */}
            <p className="text-[var(--muted-foreground)] mt-4">
              상세 내용이 준비 중입니다.
            </p>
          </div>
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
