import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { reader } from '@/lib/reader';
import { DocumentRenderer } from '@keystatic/core/renderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}


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

export async function generateStaticParams() {
  const news = await reader.collections.news.all();
  return news.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const newsItem = await reader.collections.news.read(slug);
  const newsTitle = await getNewsTitle(slug);

  if (!newsItem) {
    return {
      title: '공지사항을 찾을 수 없습니다 | 대한민국 청년정책 어워즈',
    };
  }

  const title = `${newsTitle} | 공지사항 - 대한민국 청년정책 어워즈`;
  const description = newsItem.summary || '대한민국 청년정책 어워즈 공지사항입니다.';

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
        ? [{ url: newsItem.thumbnail, width: 1200, height: 630, alt: newsTitle }]
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

export default async function NoticeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const newsItem = await reader.collections.news.read(slug);
  const newsTitle = await getNewsTitle(slug);

  if (!newsItem) {
    notFound();
  }

  // MDX 본문 콘텐츠 가져오기
  const content = await newsItem.content() as unknown as { children: unknown[] }[] | null;

  const posterImage = newsItem.thumbnail || null;

  return (
    <div className="min-h-screen bg-[#121212] pt-28 md:pt-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-12">

        {/* Article Header - 중앙 정렬 */}
        <header className="text-center mb-10">
          <time className="text-sm text-gray-500 font-mono mb-4 block">
            {newsItem.date}
          </time>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {newsTitle}
          </h1>
        </header>

        {/* 포스터 이미지 - 클린 뷰 (배경/테두리 없음) */}
        {posterImage && (
          <div className="mb-10 flex justify-center">
            <Image
              src={posterImage}
              alt={newsTitle}
              width={800}
              height={1000}
              className="max-w-full max-h-[600px] object-contain"
              priority
            />
          </div>
        )}

        {/* Summary - 중앙 정렬 */}
        {newsItem.summary && (
          <div className="text-center mb-8">
            <p className="text-lg text-gray-200 leading-relaxed whitespace-pre-line">
              {newsItem.summary}
            </p>
          </div>
        )}

        {/* MDX Content */}
        {content && content.length > 0 && (
          <div className="prose prose-invert prose-lg max-w-none text-center
            prose-headings:text-gray-100 prose-headings:font-semibold
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-li:text-gray-300
            prose-strong:text-white
            prose-a:text-gold-400 hover:prose-a:underline
          ">
            <DocumentRenderer document={content as any} />
          </div>
        )}

        {/* CTA 버튼 - 중앙 정렬 */}
        {newsItem.externalUrl && (
          <div className="mt-10 flex justify-center">
            <a
              href={newsItem.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-400 text-black font-bold px-10 py-4 rounded-lg transition-colors text-lg"
            >
              참여 신청하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}

        {/* 목록으로 - 중앙 정렬 */}
        <div className="mt-16 pt-8 border-t border-[#333] flex justify-center">
          <Link
            href="/notice"
            className="inline-flex items-center text-gray-500 hover:text-gold-400 transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
