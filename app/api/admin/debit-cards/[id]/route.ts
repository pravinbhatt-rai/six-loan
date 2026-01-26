import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

// GET single debit card
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    const debitCard = await prisma.debitCardProduct.findUnique({
      where: { id: parseInt(id) },
      include: {
        bulletPoints: {
          orderBy: { displayOrder: 'asc' }
        },
        keyFeatures: {
          orderBy: { displayOrder: 'asc' }
        },
        offers: {
          orderBy: { displayOrder: 'asc' }
        },
        safetyFeatures: {
          orderBy: { displayOrder: 'asc' }
        },
        
      }
    });

    if (!debitCard) {
      return NextResponse.json(
        { success: false, error: 'Debit card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      debitCard
    });
  } catch (error: any) {
    console.error('Admin Debit Card GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch debit card', details: error.message },
      { status: 500 }
    );
  }
}

// UPDATE debit card
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    
    const {
      bulletPoints = [],
      keyFeatures = [],
      offers = [],
      safetyFeatures = [],
      categories = [],
      ...cardData
    } = body;

    // Delete existing related records
    await prisma.debitCardBullet.deleteMany({
      where: { productId: parseInt(id) }
    });
    
    await prisma.debitCardKeyFeature.deleteMany({
      where: { productId: parseInt(id) }
    });
    
    await prisma.debitCardOffer.deleteMany({
      where: { productId: parseInt(id) }
    });
    
    await prisma.debitCardSafetyFeature.deleteMany({
      where: { productId: parseInt(id) }
    });

    // Disconnect existing categories
    await prisma.debitCardProduct.update({
      where: { id: parseInt(id) },
      data: {
        categories: {
          set: []
        }
      }
    });

    // Update debit card with new data
    const debitCard = await prisma.debitCardProduct.update({
      where: { id: parseInt(id) },
      data: {
        ...cardData,
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
      message: 'Debit card updated successfully'
    });
  } catch (error: any) {
    console.error('Admin Debit Card PUT Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update debit card', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE debit card
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    await prisma.debitCardProduct.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Debit card deleted successfully'
    });
  } catch (error: any) {
    console.error('Admin Debit Card DELETE Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete debit card', details: error.message },
      { status: 500 }
    );
  }
}
