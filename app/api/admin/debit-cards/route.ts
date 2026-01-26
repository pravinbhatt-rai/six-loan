import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')  // Remove special characters
    .replace(/-+/g, '-')          // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');       // Remove leading/trailing hyphens
}

// GET all debit cards for admin
export async function GET(req: NextRequest) {
  try {
    const debitCards = await prisma.debitCardProduct.findMany({
      include: {
        bulletPoints: true,
        keyFeatures: true,
        offers: true,
        safetyFeatures: true,
        _count: {
          select: {
            applications: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({
      success: true,
      debitCards,
      count: debitCards.length
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch debit cards' },
      { status: 500 }
    );
  }
}

// CREATE new debit card
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      bulletPoints = [],
      keyFeatures = [],
      offers = [],
      safetyFeatures = [],
      categories = [],
      ...cardData
    } = body;
    const processedCardData = {
      ...cardData,
      slug: cardData.slug || generateSlug(cardData.name),
    };
    const debitCard = await prisma.debitCardProduct.create({
      data: {
        ...processedCardData,
        bulletPoints: {
          create: bulletPoints.map((item: any, index: number) => ({
            text: typeof item === 'string' ? item : item.text,
            displayOrder: index
          }))
        },
        keyFeatures: {
          create: keyFeatures.map((feature: any, index: number) => ({
            icon: feature.icon || '',
            title: feature.title,
            description: feature.description,
            displayOrder: index
          }))
        },
        offers: {
          create: offers.map((offer: any, index: number) => ({
            merchant: offer.merchant,
            offerType: offer.offerType,
            title: offer.title,
            description: offer.description,
            offerValue: offer.offerValue,
            validFrom: offer.validFrom ? new Date(offer.validFrom) : undefined,
            validTill: offer.validTill ? new Date(offer.validTill) : undefined,
            isActive: offer.isActive ?? true,
            displayOrder: index
          }))
        },
        safetyFeatures: {
          create: safetyFeatures.map((feature: any, index: number) => ({
            featureName: feature.featureName,
            description: feature.description,
            howToUse: feature.howToUse,
            displayOrder: index
          }))
        },
        categories: {
          connect: categories.map((slug: string) => ({ slug }))
        }
      },
      include: {
        bulletPoints: true,
        keyFeatures: true,
        offers: true,
        safetyFeatures: true
      }
    });
    return NextResponse.json({
      success: true,
      debitCard,
      message: 'Debit card created successfully'
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to create debit card' },
      { status: 500 }
    );
  }
}
