import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const card = await prisma.creditCardProduct.findUnique({
      where: { slug },
      include: {
        bulletPoints: { orderBy: { displayOrder: 'asc' } },
        keyFeatures: { orderBy: { displayOrder: 'asc' } },
        cardBenefits: { orderBy: { displayOrder: 'asc' } },
        specialOffers: { orderBy: { displayOrder: 'asc' } },
        benefitSections: {
          include: {
            subPoints: { orderBy: { displayOrder: 'asc' } }
          },
          orderBy: { displayOrder: 'asc' }
        },
        bestSuitedForPoints: { orderBy: { displayOrder: 'asc' } },
        summaryCharges: { orderBy: { displayOrder: 'asc' } },
        requiredDocuments: { orderBy: { displayOrder: 'asc' } },
        processSteps: { orderBy: { displayOrder: 'asc' } },
        categories: true,
      },
    });

    if (!card) {
      return NextResponse.json(
        { error: 'Credit card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ card });
  } catch (error: any) {
    console.error('Credit Card Details Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch credit card details',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
