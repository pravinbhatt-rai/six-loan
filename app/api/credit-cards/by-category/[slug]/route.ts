import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        creditCards: {
          include: {
            bulletPoints: { orderBy: { displayOrder: "asc" } },
            categories: true
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ category });
  } catch (err: any) {
    console.error("Credit Cards by Category Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch credit cards by category", details: err.message },
      { status: 500 }
    );
  }
}
