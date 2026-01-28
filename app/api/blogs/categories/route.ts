import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

// GET /api/blogs/categories - Get all blog categories with counts
export async function GET(request: NextRequest) {
  try {
    // Get all published blogs grouped by category
    const blogs = await prisma.blog.groupBy({
      by: ['category'],
      where: {
        published: true,
        category: { not: null },
      },
      _count: {
        category: true,
      },
    });

    const categories = blogs.map(item => ({
      category: item.category,
      count: item._count.category,
    }));

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Categories fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
