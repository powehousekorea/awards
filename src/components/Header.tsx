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
      className={`fixed top-0 left-0 right-0 z-50 transition-luxury ${
        isScrolled
          ? 'bg-dark-950/95 backdrop-blur-md border-b border-dark-800/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        {/* Compact Header */}
        <div className={`flex items-center justify-center transition-luxury ${isScrolled ? 'py-4' : 'py-6'}`}>
          {/* Left spacer for centering */}
          <div className="flex-1 hidden lg:block" />

          {/* Center - Logo + Nav */}
          <div className="flex flex-col items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group mb-3">
              {/* Geometric Icon - 이모지 대체 */}
              <div className={`border border-gold-500/30 flex items-center justify-center transition-luxury ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
                <div className={`border border-gold-500/20 rotate-45 transition-luxury ${isScrolled ? 'w-3 h-3' : 'w-4 h-4'}`} />
              </div>

              {/* Title */}
              <div className="text-center">
                <p className={`font-bold text-dark-100 transition-luxury tracking-tight ${isScrolled ? 'text-sm' : 'text-base'}`}>
                  청년정책 어워즈
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="flex items-center">
                {navigation.map((item, index) => (
                  <div key={item.name} className="flex items-center">
                    {index > 0 && (
                      <span className="mx-4 text-dark-700 text-[8px]">•</span>
                    )}
                    <Link
                      href={item.href}
                      className={`py-1 text-dark-400 hover:text-gold-300 tracking-[0.1em] transition-luxury font-light ${isScrolled ? 'text-[11px]' : 'text-xs'}`}
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
              className="lg:hidden p-2 transition-luxury"
              aria-label="메뉴 열기"
            >
              <svg
                className="w-5 h-5 text-dark-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-dark-800/30 py-6 bg-dark-950/98 backdrop-blur-md">
            <div className="flex flex-col items-center gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-3 text-dark-300 hover:text-gold-300 tracking-[0.1em] transition-luxury font-light text-sm"
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
