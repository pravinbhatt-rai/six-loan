"use client";
import React, { FC } from 'react';
import { Plus, Facebook, Twitter, Instagram, Linkedin, CreditCard, Shield, Lock, ChevronDown } from 'lucide-react';

// Data Structures
interface LinkItem {
    name: string;
    href: string;
}

interface FooterColumn {
    title: string;
    links: LinkItem[];
}

// Data for main link columns
const footerLinks: FooterColumn[] = [
    {
        title: 'Six Loan Links',
        links: [
            { name: 'About', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Awards', href: '#' },
            { name: 'Contact Us', href: '#' },
            { name: 'Grievance Redressal', href: '#' },
        ],
    },
    {
        title: 'Group Brands',
        links: [
            { name: 'Policybazaar.Com', href: '#' },
            { name: 'PB Partners', href: '#' }, // Diversified link name
            { name: 'Compare Policy', href: '#' }, // Diversified link name
            { name: 'Motor Policy', href: '#' }, // Diversified link name
            { name: 'Travel Insurance', href: '#' }, // Diversified link name
        ],
    },
];

// Data for investor logos (Simulated)
const investorLogos: LinkItem[] = [
    { name: 'Temasek', href: '#', },
    { name: 'Softbank', href: '#', },
    { name: 'PremjiInvest', href: '#', },
    { name: 'Steadview', href: '#', },
    { name: 'Infoedge', href: '#', },
    { name: 'TrueNorth', href: '#', },
];

// Data for legal/secondary links
const secondaryLinks: LinkItem[] = [
    { name: 'Investor Relations', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Use', href: '#' },
    { name: 'Disclaimer', href: '#' },
    { name: 'Intellectual Policy', href: '#' },
    { name: 'Sitemap', href: '#' },
    { name: 'Important Links', href: '#' },
];

// Placeholder URLs
const googlePlayUrl = "/gplay.png";
const appStoreUrl = "/appstore.png";
const sixLogoUrl = "/sixlogo1.png"; // Assuming local image

// NEW: Individual URLs for Payment Methods
const paymentLogos = [
    { name: 'Visa', src: '/visa.png' },
    { name: 'American Express', src: '/ae.png' },
    { name: 'Mastercard', src: '/master.png' },
    { name: 'Diners Club', src: '/dclub.png' },
    { name: 'RuPay', src: '/rupay.png' },
    { name: 'Maestro', src: '/maestro.png' },
];

// NEW: Individual URLs for Security Badges
const securityLogos = [
    { name: 'Trend Micro', src: '/trend.png' },
    { name: '256 Bit Encryption', src: '/256.png' },
    { name: 'PCI-DSS', src: '/pci.png' },
];


// Main WebsiteFooter Component
const Footer: FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 font-inter">

            {/* Top Bar: Most Searched Links */}
            <div className="bg-gray-800 py-4 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <button className="flex items-center justify-center w-full text-sm font-semibold text-white hover:text-gray-300">
                        MOST SEARCHED LINKS <Plus className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>

            {/* Investor Bar */}
            <div className="bg-gray-800 py-3 text-sm border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center md:justify-start space-x-4 md:space-x-8">
                    <span className="text-white font-semibold mr-4 whitespace-nowrap">OUR INVESTORS</span>
                    {investorLogos.map(logo => (
                        <a key={logo.name} href={logo.href} className="text-xs text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                            {logo.name}
                        </a>
                    ))}
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-gray-700">
                {/* Responsive Grid: 1 col mobile, 2 cols tablet, 4 cols desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Column 1: Logo and Follow Us */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col items-start">
                        <img
                            src={sixLogoUrl}
                            alt="SIX Logo"
                            className="h-10 mb-6"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                        <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white"><Facebook className="w-5 h-5" /></a>
                            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white"><Twitter className="w-5 h-5" /></a>
                            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white"><Instagram className="w-5 h-5" /></a>
                            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>
                    {footerLinks.map(column => (
                        <div key={column.title} className="col-span-1">
                            <h4 className="text-white font-semibold mb-4">{column.title}</h4>
                            <ul className="space-y-2">
                                {column.links.map((link, index) => (
                                    <li key={`${link.name}-${index}`}>
                                        <a href={link.href} className="text-sm hover:text-white transition-colors">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Column 4: Download App */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <h4 className="text-white font-semibold mb-4">Download App</h4>
                        <div className="flex flex-col space-y-3">
                            <a href="#google-play" aria-label="Get it on Google Play">
                                <img src={googlePlayUrl} alt="Google Play Store" className="h-11 w-40 object-contain" />
                            </a>
                            <a href="#app-store" aria-label="Download on the App Store">
                                <img src={appStoreUrl} alt="App Store" className="h-11 w-40 object-contain" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legal/Secondary Links Bar */}
            <div className="bg-gray-800 py-3 border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center md:justify-start space-x-6">
                        {secondaryLinks.map(link => (
                            <a key={link.name} href={link.href} className="text-xs font-medium hover:text-white transition-colors whitespace-nowrap py-1">
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Payment and Security (FIXED: Individual logos) */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 text-xs mb-6">

                        {/* Supported Payment Methods */}
                        <div className="flex flex-col items-start space-y-2">
                            <span className="font-semibold text-white">Supported Payment Methods</span>
                            <div className="flex flex-wrap gap-3"> {/* Use flex and gap for logos */}
                                {paymentLogos.map(logo => (
                                    <img key={logo.name} src={logo.src} alt={logo.name} className="h-8 object-contain" />
                                ))}
                            </div>
                        </div>

                        {/* Secured by & Certified */}
                        <div className="flex flex-col items-start space-y-2">
                            <span className="font-semibold text-white">Secured By & Certified</span>
                            <div className="flex flex-wrap gap-3"> {/* Use flex and gap for logos */}
                                {securityLogos.map(logo => (
                                    <img key={logo.name} src={logo.src} alt={logo.name} className="h-8 object-contain" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Copyright and Made in India */}
                    <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-2 md:space-y-0 pt-4 border-t border-gray-700">
                        <p className="text-center md:text-left">
                            CIN No. L74999HR2011PTC044498 | © Copyright 2014-2024 SixLoan.com. All Rights Reserved.
                        </p>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold">Built with Love</span>
                            {/* Indian Flag SVG or Placeholder */}
                            <div className="w-5 h-4 bg-white border border-gray-400 rounded overflow-hidden flex flex-col justify-between">
                                <div className="bg-orange-500 h-1/3"></div>
                                <div className="bg-white h-1/3 flex items-center justify-center">
                                    <div className="w-1 h-1 rounded-full border border-blue-700"></div>
                                </div>
                                <div className="bg-green-600 h-1/3"></div>
                            </div>
                            <span className="text-gray-400">Made in India</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;