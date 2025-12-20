import { notFound } from 'next/navigation';
import Link from 'next/link';
import { reader } from '@/lib/reader';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const awardTypeConfig: Record<string, { label: string; className: string; icon: string }> = {
  grand: { label: '대상', className: 'badge-grand', icon: '🥇' },
  excellence: { label: '최우수상', className: 'badge-excellence', icon: '🥈' },
  merit: { label: '우수상', className: 'badge-merit', icon: '🥉' },
  special: { label: '특별상', className: 'badge-special', icon: '⭐' },
};

export async function generateStaticParams() {
  const awards = await reader.collections.awards.all();
  return awards.map((award) => ({
    slug: award.slug,
  }));
}

export default async function AwardDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const award = await reader.collections.awards.read(slug);

  if (!award) {
    notFound();
  }

  const category = award.category
    ? await reader.collections.categories.read(award.category)
    : null;

  const relatedPolicy = award.policy
    ? await reader.collections.policies.read(award.policy)
    : null;

  const awardInfo = awardTypeConfig[award.awardType] || awardTypeConfig.grand;

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <li>
              <Link href="/" className="hover:text-[var(--color-navy-600)]">홈</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/awards" className="hover:text-[var(--color-navy-600)]">역대 수상작</Link>
            </li>
            <li>/</li>
            <li className="text-[var(--color-navy-900)]">{award.title}</li>
          </ol>
        </nav>

        {/* Award Header */}
        <div className={`rounded-xl p-8 lg:p-12 mb-8 ${
          award.awardType === 'grand'
            ? 'bg-gradient-to-br from-[var(--color-yellow-400)] to-[var(--color-yellow-500)]'
            : 'bg-gradient-to-br from-[var(--color-navy-100)] to-[var(--color-navy-200)]'
        }`}>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{awardInfo.icon}</span>
              <div>
                <p className={`text-sm font-medium ${
                  award.awardType === 'grand' ? 'text-[var(--color-navy-700)]' : 'text-[var(--color-navy-600)]'
                }`}>
                  {award.year}년 대한민국 청년정책 어워즈
                </p>
                <p className={`text-2xl font-bold ${
                  award.awardType === 'grand' ? 'text-[var(--color-navy-900)]' : 'text-[var(--color-navy-800)]'
                }`}>
                  {awardInfo.label}
                </p>
              </div>
            </div>

            <h1 className={`text-3xl lg:text-4xl font-bold mb-4 ${
              award.awardType === 'grand' ? 'text-[var(--color-navy-900)]' : 'text-[var(--color-navy-900)]'
            }`}>
              {award.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              {category && (
                <div className="flex items-center gap-2">
                  <span className="text-xl">{category.icon}</span>
                  <span className={`font-medium ${
                    award.awardType === 'grand' ? 'text-[var(--color-navy-800)]' : 'text-[var(--color-navy-700)]'
                  }`}>
                    {category.name}
                  </span>
                </div>
              )}
              {award.provider && (
                <span className={`${
                  award.awardType === 'grand' ? 'text-[var(--color-navy-700)]' : 'text-[var(--color-navy-600)]'
                }`}>
                  {award.provider}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Summary */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6 lg:p-8 mb-6">
              <h2 className="text-xl font-bold text-[var(--color-navy-900)] mb-4">
                수상 사유
              </h2>
              <p className="text-[var(--color-navy-700)] text-lg leading-relaxed">
                {award.summary}
              </p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6 lg:p-8">
              <h2 className="text-xl font-bold text-[var(--color-navy-900)] mb-4">
                상세 내용
              </h2>
              <div className="prose prose-slate max-w-none">
                {/* MDX 콘텐츠는 추후 렌더링 구현 필요 */}
                <p className="text-[var(--muted-foreground)]">
                  상세 내용이 준비 중입니다.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Policy */}
            {relatedPolicy && (
              <div className="bg-white rounded-xl border border-[var(--border)] p-6 mb-6">
                <h3 className="text-lg font-bold text-[var(--color-navy-900)] mb-4">
                  관련 정책
                </h3>
                <Link
                  href={`/policies/${award.policy}`}
                  className="block p-4 bg-[var(--muted)] rounded-lg hover:bg-[var(--color-navy-100)] transition-colors"
                >
                  <p className="font-semibold text-[var(--color-navy-900)] mb-1">
                    {relatedPolicy.title}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {relatedPolicy.provider}
                  </p>
                </Link>
              </div>
            )}

            {/* Official URL */}
            {award.officialUrl && (
              <div className="bg-white rounded-xl border border-[var(--border)] p-6 mb-6">
                <h3 className="text-lg font-bold text-[var(--color-navy-900)] mb-4">
                  정책 공식 페이지
                </h3>
                <a
                  href={award.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <span className="font-medium text-[var(--color-navy-900)]">
                    공식 페이지 바로가기
                  </span>
                </a>
              </div>
            )}

            {/* Video */}
            {award.videoUrl && (
              <div className="bg-white rounded-xl border border-[var(--border)] p-6">
                <h3 className="text-lg font-bold text-[var(--color-navy-900)] mb-4">
                  관련 영상
                </h3>
                <a
                  href={award.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="font-medium text-[var(--color-navy-900)]">
                    영상 보기
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
