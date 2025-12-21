'use client';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('링크가 복사되었습니다.');
    } catch {
      alert('복사에 실패했습니다.');
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-5">
      <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-4">
        Share
      </h3>
      <div className="flex items-center gap-2">
        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#252525] hover:bg-[#333] border border-[#333] hover:border-gold-500/30 rounded transition-all group"
          title="링크 복사"
        >
          <svg className="w-4 h-4 text-gray-400 group-hover:text-gold-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Copy</span>
        </button>

        {/* Twitter/X */}
        <button
          onClick={shareToTwitter}
          className="w-10 h-10 flex items-center justify-center bg-[#252525] hover:bg-[#333] border border-[#333] hover:border-gold-500/30 rounded transition-all group"
          title="X(Twitter)에 공유"
        >
          <svg className="w-4 h-4 text-gray-400 group-hover:text-gold-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* Facebook */}
        <button
          onClick={shareToFacebook}
          className="w-10 h-10 flex items-center justify-center bg-[#252525] hover:bg-[#333] border border-[#333] hover:border-gold-500/30 rounded transition-all group"
          title="Facebook에 공유"
        >
          <svg className="w-4 h-4 text-gray-400 group-hover:text-gold-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
