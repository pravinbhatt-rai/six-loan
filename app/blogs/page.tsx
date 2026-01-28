"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Smartphone,
  Home,
  Briefcase,
  User,
  Building2,
  Shield,
  Car,
  ArrowRight
} from 'lucide-react';

interface CategoryData {
  name: string;
  slug: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  count?: number;
}

const CATEGORIES: CategoryData[] = [
  {
    name: 'Personal Loan',
    slug: 'personal-loan',
    icon: <User size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Insights on personal loans and eligibility.',
  },
  {
    name: 'Transfer Personal Loan',
    slug: 'transfer-personal-loan',
    icon: <ArrowRight size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Guides for transferring personal loans and balance transfers.',
  },
  {
    name: 'Professional Loan',
    slug: 'professional-loan',
    icon: <Briefcase size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Loans tailored for professionals and freelancers.',
  },
  {
    name: 'Business Loan',
    slug: 'business-loan',
    icon: <Briefcase size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Expert advice on business financing.',
  },
  {
    name: 'Home Loan',
    slug: 'home-loan',
    icon: <Home size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Guide to rates and property financing.',
  },
  {
    name: 'Transfer Home Loan',
    slug: 'transfer-home-loan',
    icon: <ArrowRight size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Information on transferring home loans for better rates.',
  },
  {
    name: 'Loan Against Property',
    slug: 'loan-against-property',
    icon: <Building2 size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Leverage property for better rates.',
  },
  {
    name: 'Loan Against Security',
    slug: 'loan-against-security',
    icon: <Shield size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Loans against shares and mutual funds.',
  },
  {
    name: 'Education Loan',
    slug: 'education-loan',
    icon: <User size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Financing options for higher education and courses.',
  },
  {
    name: 'Vehicle Loan',
    slug: 'vehicle-loan',
    icon: <Car size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Car and two-wheeler loan guides.',
  },
  {
    name: 'New Car Loan',
    slug: 'new-car-loan',
    icon: <Car size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Guides and offers for financing new cars.',
  },
  {
    name: 'Used Car Loan',
    slug: 'used-car-loan',
    icon: <Car size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Financing options when buying pre-owned vehicles.',
  },
  {
    name: 'New Bike Loan',
    slug: 'new-bike-loan',
    icon: <Car size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'New two-wheeler loan options and offers.',
  },
  {
    name: 'Used Bike Loan',
    slug: 'used-bike-loan',
    icon: <Car size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Financing for pre-owned two-wheelers.',
  },
  {
    name: 'Credit Card',
    slug: 'credit-card',
    icon: <CreditCard size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Reviews, rewards, and best practices.',
  },
  {
    name: 'Debit Card',
    slug: 'debit-card',
    icon: <Smartphone size={22} strokeWidth={1.2} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Features and banking insights.',
  },
];

export default function BlogsPage() {
  const [categories, setCategories] = useState<CategoryData[]>(CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryCounts();
  }, []);

  const fetchCategoryCounts = async () => {
    try {
      const response = await fetch('/api/blogs/categories');
      if (response.ok) {
        const data = await response.json();
        const updatedCategories = CATEGORIES.map(cat => {
          const found = data.find((d: any) =>
            d.category === cat.slug ||
            d.category?.replace(/\s+/g, '-') === cat.slug
          );
          return { ...cat, count: found ? found.count : 0 };
        });
        setCategories(updatedCategories);
      }
    } catch (error) {
      console.error('Failed to fetch category counts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 selection:bg-teal-100 font-serif">
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-teal-600 font-bold mb-4 block">
            The Journal
          </span>
          <h1 className="text-5xl md:text-7xl font-normal tracking-tight mb-8 italic">
            Financial <span className="text-teal-600 not-italic font-medium">Perspectives</span>
          </h1>
          <p className="text-lg text-slate-500 font-light max-w-xl mx-auto leading-relaxed opacity-80">
            Thoughtful analysis on wealth, credit, and the modern economy.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid  sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blogs/${category.slug}`}
              className="group flex flex-col items-start"
            >
              <div className="mb-6 text-teal-600/70 group-hover:text-teal-600 transition-colors duration-500">
                {category.icon}
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2 group-hover:italic transition-all">
                {category.name}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 font-sans opacity-70">
                {category.description}
              </p>
              <div className="h-px w-0 group-hover:w-full bg-teal-500/30 transition-all duration-700 mt-auto" />
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-200">
        <div className="flex justify-between items-baseline mb-16">
          <h2 className="text-3xl italic">Recent <span className="font-sans font-bold not-italic text-sm tracking-widest uppercase text-slate-400 ml-4">Articles</span></h2>
          <Link
            href="/blogs/all"
            className="font-sans text-xs font-bold uppercase tracking-widest text-teal-600 hover:text-slate-900 transition-colors"
          >
            View All
          </Link>
        </div>

        <RecentBlogs />
      </section>
    </div>
  );
}

function RecentBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentBlogs();
  }, []);

  const fetchRecentBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?limit=6');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error('Failed to fetch recent blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getExcerpt = (html: string, length: number = 100) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-4/5 bg-slate-200/50 mb-4" />
            <div className="h-4 bg-slate-200 w-3/4 mb-2" />
            <div className="h-4 bg-slate-200 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          href={`/blogs/${blog.category?.toLowerCase().replace(/\s+/g, '-')}/${blog.slug}`}
          className="group"
        >
          {blog.imageUrl && (
            <div className="relative aspect-4/5 mb-8 overflow-hidden bg-slate-100 shadow-inner">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover sepia-[0.2] grayscale-[0.3] group-hover:sepia-0 group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
              />
            </div>
          )}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-px grow bg-slate-200" />
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-teal-600 whitespace-nowrap">
                {blog.category?.replace(/-/g, ' ')}
              </span>
            </div>
            <h3 className="text-2xl font-normal leading-tight group-hover:text-teal-700 transition-colors">
              {blog.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed opacity-80 font-sans line-clamp-2">
              {getExcerpt(blog.description)}
            </p>
            <div className="pt-2 text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400">
              {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}