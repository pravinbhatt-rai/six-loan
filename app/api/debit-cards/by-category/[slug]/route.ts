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
        debitCards: {
          select: {
            id: true,
            name: true,
            slug: true,
            bankName: true,
            imageUrl: true,
            accountType: true,
            cardNetwork: true,
            cardType: true,
            annualFee: true,
            atmWithdrawalLimit: true,
            posLimit: true,
            onlineLimit: true,
            internationalUsage: true,
            contactless: true,
            loungeAccess: true,
            loungeAccessDetails: true,
            cashbackRate: true,
            rewardPoints: true,
            fuelSurcharge: true,
            accidentInsurance: true,
            fraudProtection: true,
            rating: true,
            recommended: true,
            bestFor: true,
            applyUrl: true,
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
                title: true,
                description: true,
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
    console.error("Debit Cards by Category Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch debit cards by category", details: err.message },
      { status: 500 }
    );
  }
}