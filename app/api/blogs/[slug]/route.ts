import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

// GET /api/blogs/[slug] - Get single blog by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        slug: params.slug,
        published: true, // Only show published blogs
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Get related blogs (same category, exclude current blog)
    const relatedBlogs = await prisma.blog.findMany({
      where: {
        published: true,
        category: blog.category,
        id: { not: blog.id },
      },
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        category: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ blog, relatedBlogs });
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}
