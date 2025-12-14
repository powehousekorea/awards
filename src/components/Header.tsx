'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Winners', href: '/awards' },
  { name: 'News', href: '/news' },
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
          ? 'bg-[#0c1929]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
          {/* Logo */}
          <Link href="/" className="group">
            <div className="flex items-center gap-3">
              <span className={`font-serif font-bold transition-all duration-300 ${
                isScrolled
                  ? 'text-white text-base'
                  : 'text-gray-900 text-lg'
              }`}>
                KYPA
              </span>
              <span className={`hidden sm:block text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                isScrolled
                  ? 'text-gray-400'
                  : 'text-gray-500'
              }`}>
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
                className={`text-[13px] font-medium tracking-wide transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link
              href="/vote"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              투표하기
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="메뉴 열기"
          >
            <svg
              className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-gray-700'
              }`}
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
          <div className="lg:hidden border-t border-white/10 py-4 bg-[#0c1929]/98 backdrop-blur-md rounded-b-2xl">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-all duration-200 rounded-lg mx-2"
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-4 mt-2 border-t border-white/10">
                <Link
                  href="/vote"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  투표 참여하기
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
