import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/format';

interface FeaturedArticleProps {
  slug: string;
  title: string;
  summary?: string | null;
  date?: string | null;
  thumbnail?: string | null;
  category?: string;
  categoryLabel?: string;
  basePath: string;
}

export default function FeaturedArticle({
  slug,
  title,
  summary,
  date,
  thumbnail,
  category,
  categoryLabel,
  basePath,
}: FeaturedArticleProps) {
  return (
    <Link
      href={`${basePath}/${slug}`}
      className="group block bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-[#333] hover:border-gold-500/30 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] overflow-hidden bg-[#222]">
          {thumbnail ? (
            <>
              <Image
                src={thumbnail}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#1a1a1a]" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#252525] to-[#1a1a1a]">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#333] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <span className="text-xs text-[#555] font-mono uppercase tracking-wider">Featured</span>
              </div>
            </div>
          )}

          {/* Featured Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold-500/90 backdrop-blur-sm text-dark-950 text-[10px] font-bold uppercase tracking-wider rounded">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            {(category || categoryLabel) && (
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-400">
                {categoryLabel || category}
              </span>
            )}
            {date && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="text-[10px] font-mono text-gray-500">
                  {formatDate(date)}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-gray-100 group-hover:text-gold-300 transition-colors duration-300 mb-4 leading-tight">
            {title}
          </h2>

          {/* Summary */}
          {summary && (
            <p className="text-gray-400 text-base lg:text-lg leading-relaxed line-clamp-3 mb-6">
              {summary}
            </p>
          )}

          {/* Read More */}
          <div className="flex items-center gap-2 text-gold-400 group-hover:text-gold-300 transition-colors">
            <span className="text-sm font-medium">Read Article</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
