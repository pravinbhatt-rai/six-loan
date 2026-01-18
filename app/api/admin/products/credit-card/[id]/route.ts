import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// GET /api/admin/products/credit-card/[id] - Get single credit card (Admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const cardId = parseInt(id);

    if (isNaN(cardId)) {
      return NextResponse.json({ error: 'Invalid credit card ID' }, { status: 400 });
    }

    const card = await prisma.creditCardProduct.findUnique({
      where: { id: cardId },
      include: {
        categories: true,
        bulletPoints: {
          orderBy: { displayOrder: 'asc' }
        },
        keyFeatures: {
          orderBy: { displayOrder: 'asc' }
        },
        cardBenefits: {
          orderBy: { displayOrder: 'asc' }
        },
        specialOffers: {
          orderBy: { displayOrder: 'asc' }
        },
        bestSuitedForPoints: {
          orderBy: { displayOrder: 'asc' }
        },
        benefitSections: {
          include: {
            subPoints: {
              orderBy: { displayOrder: 'asc' }
            }
          },
          orderBy: { displayOrder: 'asc' }
        },
        summaryCharges: {
          orderBy: { displayOrder: 'asc' }
        },
        requiredDocuments: {
          orderBy: { displayOrder: 'asc' }
        },
        processSteps: {
          orderBy: { displayOrder: 'asc' }
        },
      },
    });

    if (!card) {
      return NextResponse.json({ error: 'Credit card not found' }, { status: 404 });
    }

    return NextResponse.json(card);
  } catch (error: any) {
    console.error('Error fetching credit card:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credit card', details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/admin/products/credit-card/[id] - Update credit card (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const cardId = parseInt(id);

    if (isNaN(cardId)) {
      return NextResponse.json({ error: 'Invalid credit card ID' }, { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      slug,
      bankName,
      bankLogoUrl,
      imageUrl,
      videoUrl,
      termsConditionsUrl,
      annualFee,
      cardNetwork,
      category,
      cardType,
      firstYearFee,
      secondYearFee,
      feeWaiverCondition,
      effectiveFree,
      recommended,
      rating,
      keyStatement,
      categories,
      bulletPoints,
      keyFeatures,
      cardBenefits,
      bestSuitedFor,
      bestSuitedForPoints,
      specialOffers,
      benefitSections,
      summaryCharges,
      requiredDocuments,
      processSteps,
    } = body;

    // Filter out null categories
    const validCategories = categories?.filter((id: any) => id !== null && id !== undefined) || [];

    // Delete existing relations if provided new ones
    if (bulletPoints) {
      await prisma.creditCardBullet.deleteMany({
        where: { productId: cardId }
      });
    }
    if (keyFeatures) {
      await prisma.creditCardKeyFeature.deleteMany({
        where: { productId: cardId }
      });
    }
    if (cardBenefits) {
      await prisma.creditCardBenefit.deleteMany({
        where: { productId: cardId }
      });
    }
    if (specialOffers) {
      await prisma.creditCardSpecialOffer.deleteMany({
        where: { productId: cardId }
      });
    }
    if (bestSuitedFor || bestSuitedForPoints) {
      await prisma.creditCardBestSuitedFor.deleteMany({
        where: { productId: cardId }
      });
    }
    if (benefitSections) {
      await prisma.creditCardBenefitSection.deleteMany({
        where: { productId: cardId }
      });
    }
    if (summaryCharges) {
      await prisma.creditCardSummaryCharge.deleteMany({
        where: { productId: cardId }
      });
    }
    if (requiredDocuments) {
      await prisma.creditCardRequiredDocument.deleteMany({
        where: { productId: cardId }
      });
    }
    if (processSteps) {
      await prisma.creditCardProcessStep.deleteMany({
        where: { productId: cardId }
      });
    }

    // Disconnect all existing categories first
    await prisma.creditCardProduct.update({
      where: { id: cardId },
      data: {
        categories: {
          set: []
        }
      }
    });

    // Update credit card with new data
    const updatedCard = await prisma.creditCardProduct.update({
      where: { id: cardId },
      data: {
        name,
        slug,
        bankName,
        bankLogoUrl: bankLogoUrl || null,
        imageUrl: imageUrl || '',
        videoUrl: videoUrl || null,
        termsConditionsUrl: termsConditionsUrl || null,
        annualFee: annualFee || 'Lifetime Free',
        cardNetwork: cardNetwork || 'Visa',
        category: category || null,
        cardType: cardType || null,
        firstYearFee: firstYearFee || null,
        secondYearFee: secondYearFee || null,
        feeWaiverCondition: feeWaiverCondition || null,
        effectiveFree: effectiveFree || false,
        recommended: recommended || false,
        rating: rating ? parseFloat(rating) : 0,
        categories: validCategories.length > 0 ? {
          connect: validCategories.map((id: number) => ({ id: Number(id) })),
        } : undefined,
        bulletPoints: bulletPoints?.length > 0 ? {
          create: bulletPoints.map((point: any, index: number) => ({
            text: point.text || point,
            displayOrder: point.displayOrder ?? index,
          })),
        } : undefined,
        keyFeatures: keyFeatures?.length > 0 ? {
          create: keyFeatures.map((feature: any, index: number) => ({
            feature: feature.feature || feature,
            displayOrder: feature.displayOrder ?? index,
          })),
        } : undefined,
        cardBenefits: cardBenefits?.length > 0 ? {
          create: cardBenefits.map((benefit: any, index: number) => ({
            benefit: benefit.benefit || benefit,
            displayOrder: benefit.displayOrder ?? index,
          })),
        } : undefined,
        specialOffers: specialOffers?.length > 0 ? {
          create: specialOffers.map((offer: any, index: number) => ({
            text: offer.text || offer,
            displayOrder: offer.displayOrder ?? index,
          })),
        } : undefined,
        bestSuitedForPoints: (bestSuitedFor || bestSuitedForPoints)?.length > 0 ? {
          create: (bestSuitedFor || bestSuitedForPoints).map((point: any, index: number) => ({
            text: point.text || point,
            displayOrder: point.displayOrder ?? index,
          })),
        } : undefined,
        benefitSections: benefitSections?.length > 0 ? {
          create: benefitSections.map((section: any, sectionIndex: number) => ({
            heading: section.heading,
            displayOrder: section.displayOrder ?? sectionIndex,
            subPoints: section.subPoints?.length > 0 ? {
              create: section.subPoints.map((sp: any, spIndex: number) => ({
                text: sp.text,
                displayOrder: sp.displayOrder ?? spIndex,
              })),
            } : undefined,
          })),
        } : undefined,
        summaryCharges: summaryCharges?.length > 0 ? {
          create: summaryCharges.map((charge: any, index: number) => ({
            label: charge.label || 'Fee',
            mainText: charge.mainText || '',
            subText: charge.subText || null,
            displayOrder: charge.displayOrder ?? index,
          })),
        } : undefined,
        requiredDocuments: requiredDocuments?.length > 0 ? {
          create: requiredDocuments.map((doc: any, index: number) => ({
            title: doc.title || '',
            description: doc.description || null,
            displayOrder: doc.displayOrder ?? index,
          })),
        } : undefined,
        processSteps: processSteps?.length > 0 ? {
          create: processSteps.map((step: any, index: number) => ({
            title: step.title || '',
            description: step.description || null,
            displayOrder: step.displayOrder ?? index,
          })),
        } : undefined,
      },
      include: {
        categories: true,
        bulletPoints: true,
        keyFeatures: true,
        cardBenefits: true,
        specialOffers: true,
        bestSuitedForPoints: true,
        benefitSections: {
          include: {
            subPoints: true,
          },
        },
        summaryCharges: true,
        requiredDocuments: true,
        processSteps: true,
      },
    });

    return NextResponse.json(updatedCard);
  } catch (error: any) {
    console.error('Error updating credit card:', error);
    return NextResponse.json(
      { error: 'Failed to update credit card', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products/credit-card/[id] - Delete credit card (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const cardId = parseInt(id);

    if (isNaN(cardId)) {
      return NextResponse.json({ error: 'Invalid credit card ID' }, { status: 400 });
    }

    // Check if card has applications
    const applicationCount = await prisma.application.count({
      where: { cardId }
    });

    if (applicationCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete credit card. It has ${applicationCount} application(s).` },
        { status: 400 }
      );
    }

    // Delete all related records first
    await prisma.creditCardBullet.deleteMany({ where: { productId: cardId } });
    await prisma.creditCardSummaryCharge.deleteMany({ where: { productId: cardId } });
    await prisma.creditCardRequiredDocument.deleteMany({ where: { productId: cardId } });
    await prisma.creditCardProcessStep.deleteMany({ where: { productId: cardId } });

    // Delete the credit card
    await prisma.creditCardProduct.delete({
      where: { id: cardId }
    });

    return NextResponse.json({ message: 'Credit card deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting credit card:', error);
    return NextResponse.json(
      { error: 'Failed to delete credit card', details: error.message },
      { status: 500 }
    );
  }
}
