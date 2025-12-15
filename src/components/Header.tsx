'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Winners', href: '/awards' },
  { name: 'News', href: '/news' },
  { name: 'Notice', href: '/notice' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? 'bg-dark-950/95 backdrop-blur-sm border-b border-dark-800'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className={`flex items-center justify-between transition-smooth ${isScrolled ? 'py-4' : 'py-6'}`}>
          {/* Logo */}
          <Link href="/" className="group">
            <div className="flex items-center gap-3">
              <span className={`font-sans font-bold text-dark-100 transition-smooth ${isScrolled ? 'text-sm' : 'text-base'}`}>
                대한민국 청년정책 어워즈
              </span>
              <span className="hidden sm:block text-dark-600 text-[10px] tracking-[0.2em] uppercase">
                Korea Youth Policy Awards
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-dark-400 hover:text-dark-100 text-[13px] font-medium tracking-wide transition-smooth"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="메뉴 열기"
          >
            <svg
              className="w-5 h-5 text-dark-400"
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-dark-800 py-6 bg-dark-950">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-dark-300 hover:text-dark-100 hover:bg-dark-900 text-sm font-medium transition-smooth"
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
