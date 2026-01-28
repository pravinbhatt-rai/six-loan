import React, { memo } from 'react';
import { Facebook, Linkedin, Instagram, Mail, Phone } from 'lucide-react';

/**
 * Interface for Footer Link items
 */
interface FooterLink {
  label: string;
  href: string;
  logo?: string; // Optional logo path
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

// --- Memoized Helper Components ---

const SocialButton = memo<{ icon: React.ReactNode; href: string }>(({ icon, href }) => (
  <a
    href={href}
    className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-teal-500 hover:border-teal-500 hover:scale-110 hover:shadow-[0_0_15px_rgba(20,184,166,0.5)] transition-all duration-300"
    aria-label="Social Link"
  >
    {icon}
  </a>
));
SocialButton.displayName = 'SocialButton';

const XLogo = memo(() => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
));
XLogo.displayName = 'XLogo';

const BrandSection = memo(() => (
  <div className="lg:col-span-5 flex flex-col items-start space-y-6">
    <div className="mb-2">
      <img
        src="/six-finance3.png"
        alt="Six Loan"
        className="h-20 w-auto object-contain"
      />
    </div>
    <p className="text-gray-400 text-lg leading-relaxed max-w-md font-light">
      Smart, reliable credit options designed to fit your
      lifestyle and give you the freedom to achieve more.
    </p>
    <div className="flex flex-col gap-3 mt-4 text-gray-400 text-sm">
      <a href="mailto:@verification@sixfinance.app" className="flex items-center gap-2 hover:text-teal-400 transition-colors cursor-pointer group">
        <Mail size={16} className="text-teal-500 group-hover:scale-110 transition-transform" />
        <span>@verification@sixfinance.app</span>
      </a>
      <a href="tel:+918877772277" className="flex items-center gap-2 hover:text-teal-400 transition-colors cursor-pointer group">
        <Phone size={16} className="text-teal-500 group-hover:scale-110 transition-transform" />
        <span>+91 8877772277</span>
      </a>
    </div>
    <div className="flex gap-4 pt-4">
      <SocialButton icon={<Facebook size={20} />} href="#" />
      <SocialButton icon={<XLogo />} href="#" />
      <SocialButton icon={<Linkedin size={20} />} href="#" />
      <SocialButton icon={<Instagram size={20} />} href="#" />
    </div>
  </div>
));
BrandSection.displayName = 'BrandSection';

const LinksSection = memo<{ sections: FooterSection[] }>(({ sections }) => (
  <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 pt-4">
    {sections.map((section, index) => (
      <div key={index} className="flex flex-col space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-teal-500">
          {section.title}
        </h3>
        <ul className="space-y-4">
          {section.links.map((link, linkIndex) => (
            <li key={linkIndex}>
              <a
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : '_self'}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 text-[15px]"
              >
                {/* Logo rendering: Only shows if the 'logo' property exists */}
                {link.logo ? (
                  <img
                    src={link.logo}

                    className=" h-5 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  /* Show the teal animated dash if no logo is provided */
                  <span className="w-0 overflow-hidden group-hover:w-2 h-0.5 bg-teal-500 transition-all duration-300"></span>
                )}

                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
));
LinksSection.displayName = 'LinksSection';

const CopyrightSection = memo(() => (
  <div className="border-t border-gray-800 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
    <p className="text-gray-500 text-sm">
      © 2024 Six Finance. All Rights Reserved.
    </p>
    <div className="flex gap-6 text-sm text-gray-500">
      <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
      <a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a>
    </div>
  </div>
));
CopyrightSection.displayName = 'CopyrightSection';

// --- Main Footer Component ---

const Footer = memo(() => {
  const footerSections: FooterSection[] = [
    {
      title: 'Six Finance',
      links: [
        { label: 'About Us', href: '/about-us' },
        { label: 'Blogs', href: '/blogs' },
        { label: 'Contact Us & Support', href: '/contact-us' },
        { label: 'Terms & Conditions', href: '/terms-conditions' }
      ],
    },
    {
      title: 'Group Brand',
      links: [
        {
          label: 'SIX.IND.IN',
          href: 'https://www.six.ind.in',
          logo: '/sixlogo1.png' // Update with your actual asset path
        },
        {
          label: 'DISCONNECT',
          href: 'https://www.disconnect.in',

        },
        {
          label: 'DOCTAR',
          href: 'https://www.doctar.in',
          logo: '/Doctor.png'
        },
      ],
    },
    {
      title: 'Help Line',
      links: [
        { label: 'Customer Support', href: '/customer-support' },
      ],
    },
  ];

  return (
    <footer className="relative bg-[#080808] text-white pt-20 pb-10 px-6 md:px-12 font-sans border-t border-gray-900 overflow-hidden">
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>

      {/* Glow Effect */}
      <div className="absolute -top-[200px] -left-[200px] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          <BrandSection />
          <LinksSection sections={footerSections} />
        </div>
        <CopyrightSection />
      </div>
    </footer>
  );
});
Footer.displayName = 'Footer';

export default Footer;