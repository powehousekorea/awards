import { notFound } from 'next/navigation';
import Link from 'next/link';
import { reader } from '@/lib/reader';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabels: Record<string, { label: string; className: string }> = {
  notice: { label: '공지', className: 'bg-gold-500/20 text-gold-400 border border-gold-500/30' },
  event: { label: '이벤트', className: 'bg-purple-500/20 text-purple-400 border border-purple-500/30' },
  update: { label: '업데이트', className: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
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

  const categoryInfo = categoryLabels[newsItem.category] || categoryLabels.notice;

  return (
    <div className="min-h-screen bg-dark-950 pt-28 md:pt-32">
      <div className="container-custom py-8 lg:py-12 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-dark-500">
            <li>
              <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
            </li>
            <li className="text-dark-600">/</li>
            <li>
              <Link href="/notice" className="hover:text-gold-400 transition-colors">Notice</Link>
            </li>
            <li className="text-dark-600">/</li>
            <li className="text-dark-300 truncate max-w-[200px]">{newsItem.title}</li>
          </ol>
        </nav>

        {/* Article */}
        <article className="border border-dark-800 p-8 lg:p-12">
          {/* Header */}
          <header className="mb-10 pb-8 border-b border-dark-800">
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-[10px] px-3 py-1 font-mono uppercase tracking-wider ${categoryInfo.className}`}>
                {categoryInfo.label}
              </span>
              {newsItem.isImportant && (
                <span className="text-[10px] px-3 py-1 font-mono uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
                  Important
                </span>
              )}
            </div>

            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-dark-100 mb-6">
              {newsItem.title}
            </h1>

            <time className="text-dark-500 font-mono text-sm">
              {newsItem.date}
            </time>
          </header>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {newsItem.summary && (
              <p className="text-lg text-dark-300 leading-relaxed mb-6">
                {newsItem.summary}
              </p>
            )}
            <p className="text-dark-500">
              상세 내용이 준비 중입니다.
            </p>
          </div>
        </article>

        {/* Back Button */}
        <div className="mt-10">
          <Link
            href="/notice"
            className="inline-flex items-center text-dark-400 hover:text-gold-400 font-medium transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
