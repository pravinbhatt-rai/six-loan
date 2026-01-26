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
          select: {
            id: true,
            name: true,
            slug: true,
            bankName: true,
            imageUrl: true,
            category: true,
            annualFee: true,
            cardNetwork: true,
            cardType: true,
            bestSuitedFor: true,
            effectiveFree: true,
            recommended: true,
            rating: true,
            firstYearFee: true,
            secondYearFee: true,
            bestSuitedForPoints: {
              select: {
                text: true,
              },
              orderBy: { displayOrder: "asc" },
              take: 5,
            },
            categories: {
              select: {
                name: true,
              }
            },
            bulletPoints: {
              select: {
                text: true,
              },
              orderBy: { displayOrder: "asc" },
              take: 5,
            },
            keyFeatures: {
              select: {
                feature: true,
              },
              orderBy: { displayOrder: "asc" },
              take: 5,
            },
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
