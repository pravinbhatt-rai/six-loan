"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  category: string | null;
  subcategory: string | null;
  createdAt: string;
  createdBy: {
    name: string;
  } | null;
}

const CATEGORY_INFO: Record<string, { title: string; description: string }> = {
  'personal-loan': {
    title: 'Personal Loan Articles',
    description: 'Comprehensive guides on personal loans, eligibility criteria, and smart financial application tips.',
  },
  'business-loan': {
    title: 'Business Loan Insights',
    description: 'Expert advice on business financing, modern loan types, and sustainable growth strategies.',
  },
  'home-loan': {
    title: 'Home Loan Guides',
    description: 'Everything you need to know about home loans, EMI calculations, and property financing.',
  },
  'loan-against-property': {
    title: 'Loan Against Property',
    description: 'Learn how to leverage your existing property assets for better rates and higher amounts.',
  },
  'loan-against-security': {
    title: 'Loan Against Securities',
    description: 'Detailed information on secured loans against shares, mutual funds, and other securities.',
  },
  'vehicle-loan': {
    title: 'Vehicle Loan Resources',
    description: 'A complete guide to car loans, bike loans, and modern vehicle financing options.',
  },
  'credit-card': {
    title: 'Credit Card Reviews',
    description: 'Latest credit card offers, rewards programs, and strategies for smart credit usage.',
  },
  'debit-card': {
    title: 'Debit Card Features',
    description: 'Explore curated debit card benefits, security offers, and banking solutions.',
  },
};

export default function CategoryBlogsPage() {
  const params = useParams();
  const category = params?.category as string;
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryInfo = CATEGORY_INFO[category] || {
    title: 'Journal Articles',
    description: 'Thoughtful analysis and guides on the modern financial landscape.',
  };

  useEffect(() => {
    if (category) {
      fetchCategoryBlogs();
    }
  }, [category]);

  const fetchCategoryBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs?category=${encodeURIComponent(category)}`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        setError('Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('An error occurred while fetching blogs');
    } finally {
      setLoading(false);
    }
  };

  const getExcerpt = (html: string, length: number = 160) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-serif text-slate-900 selection:bg-teal-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link 
            href="/blogs" 
            className="group flex items-center text-xs font-sans font-bold uppercase tracking-widest text-slate-400 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>
          <div className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
            {category?.replace(/-/g, ' ')}
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="bg-white pt-20 pb-16 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-normal mb-6 italic leading-tight text-slate-900">
            {categoryInfo.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-2xl">
            {categoryInfo.description}
          </p>
          <div className="mt-10 flex items-center gap-4">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest bg-teal-50 text-teal-600 px-4 py-2 rounded-full">
              {blogs.length} {blogs.length === 1 ? 'Article' : 'Articles'} Available
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-slate-200/60 rounded-sm mb-6" />
                <div className="h-6 bg-slate-200 w-3/4 mb-4" />
                <div className="h-4 bg-slate-200 w-full mb-2" />
                <div className="h-4 bg-slate-200 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 font-sans uppercase tracking-widest text-xs">{error}</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-24 italic text-slate-400">
            <BookOpen size={40} className="mx-auto mb-6 opacity-20 text-slate-900 not-italic" />
            <p className="text-xl">The archives for this category are currently empty.</p>
            <p className="font-sans text-xs uppercase tracking-widest mt-4 not-italic">Check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${category}/${blog.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 mb-8 shadow-inner rounded-sm">
                  {blog.imageUrl ? (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover sepia-[0.1] grayscale-[0.2] group-hover:sepia-0 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200 text-8xl font-bold opacity-40">
                      {blog.title.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="space-y-4 flex-1 flex flex-col">
                  {blog.subcategory && (
                    <span className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-teal-600 italic">
                      {blog.subcategory}
                    </span>
                  )}
                  
                  <h2 className="text-2xl font-medium leading-tight text-slate-900 group-hover:text-teal-700 group-hover:italic transition-all duration-300">
                    {blog.title}
                  </h2>
                  
                  <p className="text-slate-500 text-sm font-sans font-light leading-relaxed line-clamp-3 opacity-80">
                    {getExcerpt(blog.description)}
                  </p>
                  
                  <div className="pt-6 mt-auto border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-6 font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-teal-500" />
                        {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      {blog.createdBy && (
                        <span className="flex items-center gap-1.5">
                          <User size={12} className="text-teal-500" />
                          {blog.createdBy.name}
                        </span>
                      )}
                    </div>
                    <span className="text-teal-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}