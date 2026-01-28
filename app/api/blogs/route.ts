import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

// GET /api/blogs - Get all published blogs (Public API)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');

    const where: any = {
      published: true, // Only show published blogs
    };

    if (category) {
      const normalizedCategory = category.replace(/-/g, ' ');
      where.OR = [
        { category: { equals: category, mode: 'insensitive' } },
        { category: { equals: normalizedCategory, mode: 'insensitive' } }
      ];
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { keywords: { contains: search, mode: 'insensitive' } },
      ];
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        imageUrl: true,
        category: true,
        subcategory: true,
        keywords: true,
        createdAt: true,
        updatedAt: true,
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Public blogs fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
