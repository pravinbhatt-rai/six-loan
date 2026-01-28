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
  Car 
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
    icon: <User size={40} />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Get insights on personal loans, eligibility, and best offers',
  },
  {
    name: 'Business Loan',
    slug: 'business-loan',
    icon: <Briefcase size={40} />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Expert advice on business financing and growth loans',
  },
  {
    name: 'Home Loan',
    slug: 'home-loan',
    icon: <Home size={40} />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Complete guide to home loans, rates, and property financing',
  },
  {
    name: 'Loan Against Property',
    slug: 'loan-against-property',
    icon: <Building2 size={40} />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    description: 'Leverage your property for secured loans and better rates',
  },
  {
    name: 'Loan Against Security',
    slug: 'loan-against-security',
    icon: <Shield size={40} />,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Learn about loans against shares, mutual funds, and securities',
  },
  {
    name: 'Vehicle Loan',
    slug: 'vehicle-loan',
    icon: <Car size={40} />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    description: 'Car and two-wheeler loan guides, EMI calculators, and tips',
  },
  {
    name: 'Credit Card',
    slug: 'credit-card',
    icon: <CreditCard size={40} />,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    description: 'Credit card reviews, rewards, cashback, and best practices',
  },
  {
    name: 'Debit Card',
    slug: 'debit-card',
    icon: <Smartphone size={40} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Debit card features, offers, and banking insights',
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
        
        // Update categories with actual counts
        const updatedCategories = CATEGORIES.map(cat => {
          const found = data.find((d: any) => 
            d.category === cat.slug || 
            d.category?.replace(/\s+/g, '-') === cat.slug
          );
          return {
            ...cat,
            count: found ? found.count : 0,
          };
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Financial Insights & Guides
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Explore expert articles on loans, credit cards, and financial planning
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse by Category</h2>
          <p className="text-gray-600">Select a category to explore related articles</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blogs/${category.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 h-full border-2 border-transparent hover:border-gray-200">
                  <div className={`${category.bgColor} ${category.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {category.count !== undefined ? `${category.count} articles` : 'View articles'}
                    </span>
                    <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Recent Articles Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
              <p className="text-gray-600">Stay updated with our recent posts</p>
            </div>
            <Link 
              href="/blogs/all" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </Link>
          </div>
          
          <RecentBlogs />
        </div>
      </div>
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

  const getExcerpt = (html: string, length: number = 150) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const normalizeCategorySlug = (category: string) => {
    return category?.toLowerCase().replace(/\s+/g, '-') || '';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          href={`/blogs/${normalizeCategorySlug(blog.category)}/${blog.slug}`}
          className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          {blog.imageUrl && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          
          <div className="p-6">
            {blog.category && (
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3">
                {blog.category.replace(/-/g, ' ')}
              </span>
            )}
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {blog.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {getExcerpt(blog.description)}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                Read more →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
