import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// GET /api/admin/blogs - Get all blogs
export async function GET(request: NextRequest) {
    try {
        const authResult = await verifyAdminOrModerator(request);
        if (!authResult || !authResult.authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const published = searchParams.get('published');
        const category = searchParams.get('category');
        const search = searchParams.get('search');

        const where: any = {};

        if (published !== null) {
            where.published = published === 'true';
        }

        if (category) {
            where.category = category;
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { category: { contains: search, mode: 'insensitive' } },
                { subcategory: { contains: search, mode: 'insensitive' } },
            ];
        }

        const blogs = await prisma.blog.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(blogs);
    } catch (error) {
        console.error('Blogs fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blogs' },
            { status: 500 }
        );
    }
}

// POST /api/admin/blogs - Create new blog
export async function POST(request: NextRequest) {
    try {
        const authResult = await verifyAdminOrModerator(request);
        if (!authResult || !authResult.authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const {
            title,
            slug,
            description,
            imageUrl,
            category,
            subcategory,
            keywords,
            published,
        } = body;

        // Validate required fields
        if (!title || !slug || !description) {
            return NextResponse.json(
                { error: 'Title, slug, and description are required' },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existingBlog = await prisma.blog.findUnique({
            where: { slug },
        });

        if (existingBlog) {
            return NextResponse.json(
                { error: 'Blog with this slug already exists' },
                { status: 400 }
            );
        }

        const blog = await prisma.blog.create({
            data: {
                title,
                slug,
                description,
                imageUrl: imageUrl || null,
                category: category || null,
                subcategory: subcategory || null,
                keywords: keywords || null,
                published: published || false,
                createdById: authResult.user.id,
            },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        console.error('Blog creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create blog' },
            { status: 500 }
        );
    }
}
