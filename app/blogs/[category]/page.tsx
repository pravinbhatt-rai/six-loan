"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';

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
    description: 'Comprehensive guides on personal loans, eligibility criteria, interest rates, and application tips',
  },
  'business-loan': {
    title: 'Business Loan Insights',
    description: 'Expert advice on business financing, loan types, and growth strategies',
  },
  'home-loan': {
    title: 'Home Loan Guides',
    description: 'Everything you need to know about home loans, EMI calculations, and property financing',
  },
  'loan-against-property': {
    title: 'Loan Against Property',
    description: 'Learn how to leverage your property for better loan rates and higher amounts',
  },
  'loan-against-security': {
    title: 'Loan Against Securities',
    description: 'Detailed information on loans against shares, mutual funds, and other securities',
  },
  'vehicle-loan': {
    title: 'Vehicle Loan Resources',
    description: 'Complete guide to car loans, bike loans, and vehicle financing options',
  },
  'credit-card': {
    title: 'Credit Card Reviews & Tips',
    description: 'Latest credit card offers, rewards programs, and smart usage strategies',
  },
  'debit-card': {
    title: 'Debit Card Features',
    description: 'Explore debit card benefits, offers, and banking solutions',
  },
};

export default function CategoryBlogsPage() {
  const params = useParams();
  const category = params?.category as string;
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryInfo = CATEGORY_INFO[category] || {
    title: 'Blog Articles',
    description: 'Explore our collection of articles',
  };

  useEffect(() => {
    if (category) {
      fetchCategoryBlogs();
    }
  }, [category]);

  const fetchCategoryBlogs = async () => {
    try {
      setLoading(true);
      const normalizedCategory = category?.replace(/-/g, ' ') || category;
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

  const getExcerpt = (html: string, length: number = 200) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/blogs" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to All Categories
          </Link>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-3">{categoryInfo.title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {categoryInfo.description}
          </p>
          <div className="mt-4">
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm">
              {blogs.length} {blogs.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                <div className="w-full h-56 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
            <p className="text-gray-600">Check back soon for articles in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${category}/${blog.slug}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {blog.imageUrl ? (
                  <div className="relative h-56 overflow-hidden bg-gray-200">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-56 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-white text-6xl font-bold opacity-20">
                      {blog.title.charAt(0)}
                    </span>
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  {blog.subcategory && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3 self-start">
                      {blog.subcategory}
                    </span>
                  )}
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                    {getExcerpt(blog.description)}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                      {blog.createdBy && (
                        <div className="flex items-center gap-1">
                          <User size={16} />
                          <span>{blog.createdBy.name}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-blue-600 group-hover:translate-x-1 transition-transform font-medium">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
