import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// GET /api/admin/blogs/[id] - Get single blog
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const authResult = await verifyAdminOrModerator(request);
        if (!authResult || !authResult.authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const blog = await prisma.blog.findUnique({
            where: { id: parseInt(params.id) },
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

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Blog fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog' },
            { status: 500 }
        );
    }
}

// PUT /api/admin/blogs/[id] - Update blog
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        // Check if blog exists
        const existingBlog = await prisma.blog.findUnique({
            where: { id: parseInt(params.id) },
        });

        if (!existingBlog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        // If slug is being changed, check if new slug already exists
        if (slug && slug !== existingBlog.slug) {
            const slugExists = await prisma.blog.findUnique({
                where: { slug },
            });

            if (slugExists) {
                return NextResponse.json(
                    { error: 'Blog with this slug already exists' },
                    { status: 400 }
                );
            }
        }

        const blog = await prisma.blog.update({
            where: { id: parseInt(params.id) },
            data: {
                title: title || existingBlog.title,
                slug: slug || existingBlog.slug,
                description: description || existingBlog.description,
                imageUrl: imageUrl !== undefined ? imageUrl : existingBlog.imageUrl,
                category: category !== undefined ? category : existingBlog.category,
                subcategory: subcategory !== undefined ? subcategory : existingBlog.subcategory,
                keywords: keywords !== undefined ? keywords : existingBlog.keywords,
                published: published !== undefined ? published : existingBlog.published,
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

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Blog update error:', error);
        return NextResponse.json(
            { error: 'Failed to update blog' },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/blogs/[id] - Delete blog
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const authResult = await verifyAdminOrModerator(request);
        if (!authResult || !authResult.authenticated) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if blog exists
        const existingBlog = await prisma.blog.findUnique({
            where: { id: parseInt(params.id) },
        });

        if (!existingBlog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        await prisma.blog.delete({
            where: { id: parseInt(params.id) },
        });

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Blog deletion error:', error);
        return NextResponse.json(
            { error: 'Failed to delete blog' },
            { status: 500 }
        );
    }
}
