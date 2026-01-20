"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface QuickLink {
  title: string;
  href: string;
}

interface QuickLinksSidebarProps {
  title?: string;
  links: QuickLink[];
}

export default function QuickLinksSidebar({ title = "Quick Links", links }: QuickLinksSidebarProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="flex items-center justify-between text-gray-700 hover:text-teal-600 hover:bg-teal-50 px-3 py-2 rounded-lg transition-all group"
            >
              <span className="text-sm font-medium">{link.title}</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
