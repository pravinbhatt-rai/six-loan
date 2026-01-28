"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, ChevronRight } from 'lucide-react';

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
    if (slug) { fetchBlog(); }
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
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-4 bg-slate-100 w-1/4 rounded"></div>
            <div className="h-12 bg-slate-100 w-3/4 rounded"></div>
            <div className="aspect-video bg-slate-100 rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen fixed bg-white flex items-center justify-center font-serif italic ">
        <div className="text-center">
          <h1 className="text-3xl text-slate-400 mb-6">{error || 'Blog not found'}</h1>
          <Link href="/blogs" className="font-sans text-xs font-bold uppercase tracking-widest text-teal-600 hover:text-teal-700 underline underline-offset-8">
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-serif selection:bg-teal-50">
      {/* Breadcrumb Header */}
      <nav className="bg-white/80 backdrop-blur-md top-0 z-50 border-b border-slate-100 ">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400  fixed">
          <div className="flex items-center gap-2">
            <Link href="/blogs" className="hover:text-teal-600 transition-colors">Journal</Link>
            <ChevronRight size={10} className="text-slate-300" />
            <Link href={`/blogs/${category}`} className="hover:text-teal-600 transition-colors">{category?.replace(/-/g, ' ')}</Link>
            <ChevronRight size={10} className="text-slate-300 hidden sm:block" />
            <span className="text-slate-900 line-clamp-1 hidden sm:block max-w-[200px]">{blog.title}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Article Column */}
          <article className="lg:col-span-8">
            <header className="mb-12">
              <div className="flex flex-wrap gap-3 mb-8">
                {blog.category && (
                  <span className="font-sans text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-teal-50 text-teal-600 rounded-sm">
                    {blog.category}
                  </span>
                )}
                {blog.subcategory && (
                  <span className="font-sans text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-slate-50 text-slate-500 rounded-sm italic">
                    {blog.subcategory}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-normal text-slate-900 mb-8 leading-[1.15] italic tracking-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-4 gap-x-8 py-6 border-y border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-teal-600 font-sans text-xs">
                    <User size={14} />
                  </div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-900">{blog.createdBy?.name || 'Editorial Team'}</span>
                </div>
                
                <div className="flex items-center gap-6 font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-2"><Calendar size={12} className="text-teal-500" /> {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-2"><Clock size={12} className="text-teal-500" /> {getReadingTime(blog.description)}</span>
                </div>

                <div className="relative ml-auto">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-2 text-slate-400 hover:text-teal-600 transition-colors"
                  >
                    <Share2 size={18} strokeWidth={1.5} />
                  </button>
                  {showShareMenu && (
                    <div className="absolute right-0 mt-4 bg-white border border-slate-100 shadow-2xl p-2 z-10 min-w-[150px] animate-in fade-in slide-in-from-top-2">
                      <button onClick={shareOnFacebook} className="flex items-center gap-3 w-full px-4 py-2 font-sans text-[10px] tracking-widest uppercase hover:bg-teal-50 transition-colors"><Facebook size={12} /> Facebook</button>
                      <button onClick={shareOnTwitter} className="flex items-center gap-3 w-full px-4 py-2 font-sans text-[10px] tracking-widest uppercase hover:bg-teal-50 transition-colors"><Twitter size={12} /> Twitter</button>
                      <button onClick={shareOnLinkedIn} className="flex items-center gap-3 w-full px-4 py-2 font-sans text-[10px] tracking-widest uppercase hover:bg-teal-50 transition-colors"><Linkedin size={12} /> LinkedIn</button>
                    </div>
                  )}
                </div>
              </div>
            </header>


            {blog.imageUrl && (
              <figure className="mb-8 flex justify-center">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full max-w-2xl h-auto rounded-xl shadow-md grayscale-[0.2] hover:grayscale-0 transition-all duration-700 ease-in-out border border-slate-100"
                  style={{ objectFit: 'cover', maxHeight: '340px' }}
                />
              </figure>
            )}

            <div 
              className="prose prose-slate prose-lg max-w-none font-serif
              prose-headings:font-serif prose-headings:font-normal prose-headings:italic
              prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-light
              prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50/30 prose-blockquote:font-light
              prose-strong:text-slate-900 prose-strong:font-medium
              prose-a:text-teal-600 prose-a:underline-offset-4 hover:prose-a:text-teal-700 transition-colors
              mt-8"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />

            {blog.keywords && (
              <footer className="mt-20 pt-10 border-t border-slate-100">
                <div className="flex flex-wrap gap-2">
                  {blog.keywords.split(',').map((keyword, index) => (
                    <span key={index} className="font-sans text-[9px] font-bold uppercase tracking-widest px-4 py-2 border border-slate-100 text-slate-400 hover:border-teal-200 hover:text-teal-600 transition-all cursor-default">
                      #{keyword.trim()}
                    </span>
                  ))}
                </div>
              </footer>
            )}

            <div className="mt-20">
              <Link
                href={`/blogs/${category}`}
                className="inline-flex items-center font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600 hover:text-slate-900 transition-colors group"
              >
                <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-2 transition-transform" />
                Return to {category?.replace(/-/g, ' ')}
              </Link>
            </div>
          </article>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-12">
              {relatedBlogs.length > 0 && (
                <div className="bg-slate-50/50 p-8 rounded-sm border border-slate-100/50">
                  <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-8 pb-4 border-b border-slate-200">Related Articles</h3>
                  <div className="space-y-10">
                    {relatedBlogs.map((relatedBlog) => (
                      <Link
                        key={relatedBlog.id}
                        href={`/blogs/${normalizeCategorySlug(relatedBlog.category || '')}/${relatedBlog.slug}`}
                        className="group block"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-slate-100 flex-shrink-0 overflow-hidden shadow-inner">
                            {relatedBlog.imageUrl ? (
                              <img
                                src={relatedBlog.imageUrl}
                                alt={relatedBlog.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-xl">{relatedBlog.title.charAt(0)}</div>
                            )}
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className="text-md font-normal italic leading-tight text-slate-800 group-hover:text-teal-600 transition-colors mb-2 line-clamp-2">
                              {relatedBlog.title}
                            </h4>
                            <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-slate-400">
                              {new Date(relatedBlog.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}