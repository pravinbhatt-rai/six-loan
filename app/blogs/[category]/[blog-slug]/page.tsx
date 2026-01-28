"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  category: string | null;
  subcategory: string | null;
  keywords: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: number;
    name: string;
  } | null;
}

interface RelatedBlog {
  id: number;
  title: string;
  slug: string;
  imageUrl: string | null;
  category: string | null;
  createdAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const category = params?.category as string;
  const slug = params?.['blog-slug'] as string;
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const normalizeCategorySlug = (cat: string) => {
    return cat?.toLowerCase().replace(/\s+/g, '-') || '';
  };

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs/${slug}`);
      
      if (response.ok) {
        const data = await response.json();
        setBlog(data.blog);
        setRelatedBlogs(data.relatedBlogs || []);
      } else if (response.status === 404) {
        setError('Blog not found');
      } else {
        setError('Failed to fetch blog');
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('An error occurred while fetching the blog');
    } finally {
      setLoading(false);
    }
  };

  const getReadingTime = (html: string) => {
    const text = html.replace(/<[^>]*>/g, '');
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = blog?.title || '';

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {error || 'Blog not found'}
          </h1>
          <Link href="/blogs" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/blogs" className="hover:text-blue-600">
              Blogs
            </Link>
            <span>/</span>
            <Link href={`/blogs/${category}`} className="hover:text-blue-600 capitalize">
              {category?.replace(/-/g, ' ')}
            </Link>
            <span>/</span>
            <span className="text-gray-900 line-clamp-1">{blog.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Featured Image */}
              {blog.imageUrl && (
                <div className="relative h-96 w-full">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="p-8">
                {/* Category & Subcategory */}
                <div className="flex gap-2 mb-4">
                  {blog.category && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                      {blog.category}
                    </span>
                  )}
                  {blog.subcategory && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-50 rounded-full">
                      {blog.subcategory}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {blog.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 pb-6 mb-6 border-b">
                  {blog.createdBy && (
                    <div className="flex items-center gap-2">
                      <User size={18} />
                      <span>{blog.createdBy.name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{getReadingTime(blog.description)}</span>
                  </div>
                  
                  {/* Share Button */}
                  <div className="relative ml-auto">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Share2 size={18} />
                      Share
                    </button>
                    
                    {showShareMenu && (
                      <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border p-2 z-10 min-w-[160px]">
                        <button
                          onClick={shareOnFacebook}
                          className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 rounded text-left"
                        >
                          <Facebook size={18} className="text-blue-600" />
                          Facebook
                        </button>
                        <button
                          onClick={shareOnTwitter}
                          className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 rounded text-left"
                        >
                          <Twitter size={18} className="text-sky-500" />
                          Twitter
                        </button>
                        <button
                          onClick={shareOnLinkedIn}
                          className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 rounded text-left"
                        >
                          <Linkedin size={18} className="text-blue-700" />
                          LinkedIn
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Blog Content */}
                <div 
                  className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 prose-img:rounded-lg"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />

                {/* Keywords/Tags */}
                {blog.keywords && (
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {blog.keywords.split(',').map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Back to Category */}
            <div className="mt-8">
              <Link
                href={`/blogs/${category}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to {category?.replace(/-/g, ' ')}
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedBlogs.map((relatedBlog) => (
                    <Link
                      key={relatedBlog.id}
                      href={`/blogs/${normalizeCategorySlug(relatedBlog.category || '')}/${relatedBlog.slug}`}
                      className="group block"
                    >
                      <div className="flex gap-3">
                        {relatedBlog.imageUrl ? (
                          <img
                            src={relatedBlog.imageUrl}
                            alt={relatedBlog.title}
                            className="w-20 h-20 object-cover rounded flex-shrink-0"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-2xl font-bold">
                              {relatedBlog.title.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                            {relatedBlog.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {new Date(relatedBlog.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
