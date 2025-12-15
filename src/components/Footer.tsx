import Link from 'next/link';

const footerLinks = {
  about: [
    { name: 'About', href: '/about' },
    { name: 'Criteria', href: '/about#criteria' },
    { name: 'Organization', href: '/about#organization' },
  ],
  resources: [
    { name: 'Winners', href: '/awards' },
    { name: 'News', href: '/news' },
  ],
  legal: [
    { name: 'Terms', href: '/terms' },
    { name: 'Privacy', href: '/privacy' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-800 pt-16 md:pt-24">
      <div className="container-custom pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-sans font-bold text-dark-100 text-lg">대한민국 청년정책 어워즈</span>
            </Link>
            <p className="text-dark-500 text-sm leading-relaxed">
              청년을 위한 최고의 정책을 발굴하고,<br />
              더 나은 청년정책을 만들어갑니다.
            </p>
          </div>

          {/* About Links */}
          <div>
            <p className="text-label mb-6">Awards</p>
            <ul className="space-y-4">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-500 hover:text-dark-200 text-sm transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <p className="text-label mb-6">Resources</p>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-500 hover:text-dark-200 text-sm transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-label mb-6">Contact</p>
            <ul className="space-y-4 text-sm text-dark-500">
              <li>contact@youthpolicy.kr</li>
              <li>02-1234-5678</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-800 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-dark-600 text-[11px] tracking-wide">
            © 2025 Korea Youth Policy Awards. All rights reserved.
          </p>
          <div className="flex gap-8">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-dark-600 hover:text-dark-400 text-[11px] tracking-wide transition-smooth"
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
