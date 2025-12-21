import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/format';

interface NewsCardProps {
  id: string;
  title: string;
  summary: string;
  source?: string;
  date: string;
  url?: string;
  slug?: string;
  thumbnail?: string | null;
  isExternal?: boolean;
}

export default function NewsCard({
  title,
  summary,
  source = 'Press',
  date,
  url,
  slug,
  thumbnail,
  isExternal = false,
}: NewsCardProps) {
  const href = isExternal && url ? url : `/news/${slug}`;

  const cardClassName = `
    group flex flex-col h-full
    bg-[#1a1a1a] border border-[#2a2a2a]
    rounded-sm overflow-hidden
    transition-all duration-500 ease-out
    hover:border-gold-500/50
    hover:shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(212,184,134,0.08)]
    hover:-translate-y-1
  `;

  const CardContent = (
    <>
      {/* Thumbnail Image */}
      <div className="relative aspect-video overflow-hidden bg-[#222]">
        {thumbnail ? (
          <>
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#252525] to-[#1a1a1a]">
            <svg className="w-10 h-10 text-[#3a3a3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}

        {/* External link indicator */}
        {isExternal && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#1a1a1a]/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <svg className="w-3.5 h-3.5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-[15px] font-semibold text-white mb-3 line-clamp-2 group-hover:text-gold-300 transition-colors duration-300 leading-snug tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed flex-1 font-light">
          {summary}
        </p>
      </div>

      {/* Footer - Source & Date */}
      <div className="mt-auto px-5 py-4 border-t border-[#2a2a2a] flex items-center justify-between bg-[#1a1a1a]/50">
        <span className="text-xs font-semibold text-gold-400 uppercase tracking-wide">
          {source}
        </span>
        <span className="text-[10px] font-mono text-gray-600 tracking-wide">
          {formatDate(date)}
        </span>
      </div>
    </>
  );

  if (isExternal && url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
      >
        {CardContent}
      </a>
    );
  }

  return (
    <Link href={href} className={cardClassName}>
      {CardContent}
    </Link>
  );
}
