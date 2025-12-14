import Link from 'next/link';

const footerLinks = {
  about: [
    { name: '어워즈 소개', href: '/about' },
    { name: '선정 기준', href: '/about#criteria' },
    { name: '운영 주체', href: '/about#organization' },
  ],
  resources: [
    { name: '역대 수상작', href: '/awards' },
    { name: '뉴스/공지', href: '/news' },
  ],
  legal: [
    { name: '이용약관', href: '/terms' },
    { name: '개인정보처리방침', href: '/privacy' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a0806] text-white border-t border-dark-800/50">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 3h14a2 2 0 0 1 2 2v2a4 4 0 0 1-4 4h-1a5 5 0 0 1-10 0H5a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2zm2 4h10V5H7v2zm0 4a3 3 0 0 0 6 0H7zm12-4h2V5h-2v2zM3 5v2H1V5h2zm9 15a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z"/>
                </svg>
              </div>
              <div>
                <p className="font-serif font-bold text-white">청년정책 어워즈</p>
                <p className="text-[10px] text-dark-500 tracking-wider">YOUTH POLICY AWARDS</p>
              </div>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed font-serif">
              청년을 위한 최고의 정책을 발굴하고,<br />
              더 나은 청년정책을 만들어갑니다.
            </p>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-serif font-semibold text-gold-500 mb-6 text-xs uppercase tracking-[0.2em]">어워즈</h3>
            <ul className="space-y-4">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-gold-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-serif font-semibold text-gold-500 mb-6 text-xs uppercase tracking-[0.2em]">자료실</h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-gold-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-gold-500 mb-6 text-xs uppercase tracking-[0.2em]">문의</h3>
            <ul className="space-y-4 text-sm text-dark-400">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 border border-dark-700/50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gold-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>contact@youthpolicy.kr</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 border border-dark-700/50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gold-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>02-1234-5678</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-8">
              <a
                href="#"
                className="w-10 h-10 border border-dark-700/50 hover:border-gold-500/30 flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-dark-500 group-hover:text-gold-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-dark-700/50 hover:border-gold-500/30 flex items-center justify-center transition-colors group"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 text-dark-500 group-hover:text-gold-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-dark-700/50 hover:border-gold-500/30 flex items-center justify-center transition-colors group"
                aria-label="Blog"
              >
                <svg className="w-4 h-4 text-dark-500 group-hover:text-gold-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-800/50 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-dark-600 text-xs tracking-wide">
            © 2025 대한민국 청년정책 어워즈. All rights reserved.
          </p>
          <div className="flex gap-8">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-dark-600 hover:text-gold-400 text-xs transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
