import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(req: NextRequest) {
  try {
    const cards = await prisma.creditCardProduct.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        bankName: true,
        bankLogoUrl: true,
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
            id: true,
            text: true,
            displayOrder: true,
          },
          orderBy: { displayOrder: "asc" },
        },
        categories: {
          select: {
            id: true,
            name: true,
          }
        },
        bulletPoints: {
          select: {
            id: true,
            text: true,
            displayOrder: true,
          },
          orderBy: { displayOrder: "asc" },
        },
        keyFeatures: {
          select: {
            id: true,
            feature: true,
            displayOrder: true,
          },
          orderBy: { displayOrder: "asc" },
          take: 10, // Limit to first 10 key features for performance
        },
        specialOffers: {
          select: {
            id: true,
            text: true,
            displayOrder: true,
          },
          orderBy: { displayOrder: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json({ cards });
  } catch (err: any) {
    console.error("Credit Cards Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch credit cards", details: err.message },
      { status: 500 }
    );
  }
}
