'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const navigation = [
  { name: '홈', href: '/' },
  { name: '어워즈 소개', href: '/about' },
  { name: '역대 수상작', href: '/awards' },
  { name: '뉴스', href: '/news' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-950/98 backdrop-blur-md border-b border-gold-500/20'
          : 'bg-dark-950/80 backdrop-blur-sm'
      }`}
    >
      <nav className="container-custom">
        {/* Compact Header */}
        <div className={`flex items-center justify-center transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
          {/* Left spacer for centering */}
          <div className="flex-1 hidden lg:block" />

          {/* Center - Logo + Nav */}
          <div className="flex flex-col items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group mb-2">
              {/* Trophy Icon */}
              <div className={`rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/30 transition-all duration-300 ${isScrolled ? 'w-8 h-8' : 'w-9 h-9'}`}>
                <svg className={`text-dark-950 transition-all duration-300 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 3h14a2 2 0 0 1 2 2v2a4 4 0 0 1-4 4h-1a5 5 0 0 1-10 0H5a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2zm2 4h10V5H7v2zm0 4a3 3 0 0 0 6 0H7zm12-4h2V5h-2v2zM3 5v2H1V5h2zm9 15a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z"/>
                </svg>
              </div>

              {/* Title */}
              <div className="text-center">
                <p className={`font-serif font-bold text-white transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}>
                  대한민국 청년정책 어워즈
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="flex items-center">
                {navigation.map((item, index) => (
                  <div key={item.name} className="flex items-center">
                    {index > 0 && (
                      <span className="mx-3 text-gold-500/30 text-xs">|</span>
                    )}
                    <Link
                      href={item.href}
                      className={`py-1 text-dark-300 hover:text-gold-400 font-serif tracking-wide transition-colors ${isScrolled ? 'text-xs' : 'text-sm'}`}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right spacer + Mobile menu button */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-800/50 transition-colors"
              aria-label="메뉴 열기"
            >
              <svg
                className="w-6 h-6 text-gold-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gold-500/20 py-4 bg-dark-950/98 backdrop-blur-md">
            <div className="flex flex-col items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-3 text-dark-200 hover:text-gold-400 font-serif tracking-wide transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
