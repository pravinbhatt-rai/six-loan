import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// GET /api/admin/credit-cards/[id] - Get credit card by ID (Admin only)
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
    const creditCard = await prisma.creditCardProduct.findUnique({
      where: { id: Number(id) },
      include: {
        categories: true,
        bulletPoints: { orderBy: { displayOrder: 'asc' } },
        summaryCharges: { orderBy: { displayOrder: 'asc' } },
      },
    });

    if (!creditCard) {
      return NextResponse.json(
        { error: 'Credit card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(creditCard);
  } catch (error) {
    console.error('Credit card fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credit card' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/credit-cards/[id] - Update credit card (Admin only)
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
    const body = await request.json();

    const {
      name,
      slug,
      bankName,
      imageUrl,
      annualFee,
      cardNetwork,
      cardType,
      bestSuitedFor,
      effectiveFree,
      recommended,
      rating,
      videoUrl,
      termsConditionsUrl,
      firstYearFee,
      secondYearFee,
      feeWaiverCondition,
      categories,
      bulletPoints,
      keyFeatures,
      cardBenefits,
      bestSuitedForPoints,
      summaryCharges,
      requiredDocuments,
      processSteps,
      benefitSections,
    } = body;

    // Delete existing relations if updating them
    if (bulletPoints !== undefined) {
      await prisma.creditCardBullet.deleteMany({
        where: { productId: Number(id) },
      });
    }
    if (keyFeatures !== undefined) {
      await prisma.creditCardKeyFeature.deleteMany({
        where: { productId: Number(id) },
      });
    }
    if (cardBenefits !== undefined) {
      await prisma.creditCardBenefit.deleteMany({
        where: { productId: Number(id) },
      });
    }
    if (bestSuitedForPoints !== undefined) {
      await prisma.creditCardBestSuitedFor.deleteMany({
        where: { productId: Number(id) },
      });
    }
    if (summaryCharges !== undefined) {
      await prisma.creditCardSummaryCharge.deleteMany({
        where: { productId: Number(id) },
      });
    }
    if (requiredDocuments !== undefined) {
      await prisma.creditCardRequiredDocument.deleteMany({
        where: { productId: Number(id) },
      });
    }
    if (processSteps !== undefined) {
      await prisma.creditCardProcessStep.deleteMany({
        where: { productId: Number(id) },
      });
    }
    if (benefitSections !== undefined) {
      // First delete all subPoints, then the sections
      const sections = await prisma.creditCardBenefitSection.findMany({
        where: { productId: Number(id) },
        select: { id: true },
      });
      for (const section of sections) {
        await prisma.creditCardBenefitSubPoint.deleteMany({
          where: { sectionId: section.id },
        });
      }
      await prisma.creditCardBenefitSection.deleteMany({
        where: { productId: Number(id) },
      });
    }

    // Update credit card
    const creditCard = await prisma.creditCardProduct.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(bankName && { bankName }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(annualFee !== undefined && { annualFee: String(annualFee) }),
        ...(cardNetwork && { cardNetwork }),
        ...(cardType !== undefined && { cardType }),
        ...(bestSuitedFor !== undefined && { bestSuitedFor }),
        ...(effectiveFree !== undefined && { effectiveFree }),
        ...(recommended !== undefined && { recommended }),
        ...(rating !== undefined && { rating: parseFloat(rating) }),
        ...(videoUrl !== undefined && { videoUrl }),
        ...(termsConditionsUrl !== undefined && { termsConditionsUrl }),
        ...(firstYearFee !== undefined && { firstYearFee }),
        ...(secondYearFee !== undefined && { secondYearFee }),
        ...(feeWaiverCondition !== undefined && { feeWaiverCondition }),
        categories: categories !== undefined ? {
          set: [],
          connect: categories.map((slug: string) => ({ slug })),
        } : undefined,
        bulletPoints: bulletPoints !== undefined ? {
          create: bulletPoints
            .filter((point: any) => point.text || point)
            .map((point: any, index: number) => ({
              text: typeof point.text === 'string' ? point.text : (point.text?.text !== undefined ? point.text.text : point),
              displayOrder: point.displayOrder ?? index,
            })),
        } : undefined,
        keyFeatures: keyFeatures !== undefined ? {
          create: keyFeatures
            .filter((feat: any) => feat.feature || feat.text || feat)
            .map((feat: any, index: number) => ({
              feature: typeof feat.feature === 'string' ? feat.feature : (feat.feature?.feature !== undefined ? feat.feature.feature : (feat.text !== undefined ? feat.text : feat)),
              displayOrder: feat.displayOrder ?? index,
            })),
        } : undefined,
        cardBenefits: cardBenefits !== undefined ? {
          create: cardBenefits
            .filter((ben: any) => ben.benefit || ben.text || ben)
            .map((ben: any, index: number) => ({
              benefit: typeof ben.benefit === 'string' ? ben.benefit : (ben.benefit?.benefit !== undefined ? ben.benefit.benefit : (ben.text !== undefined ? ben.text : ben)),
              displayOrder: ben.displayOrder ?? index,
            })),
        } : undefined,
        bestSuitedForPoints: bestSuitedForPoints !== undefined ? {
          create: bestSuitedForPoints
            .filter((point: any) => point.text || point)
            .map((point: any, index: number) => ({
              text: typeof point.text === 'string' ? point.text : (point.text?.text !== undefined ? point.text.text : point),
              displayOrder: point.displayOrder ?? index,
            })),
        } : undefined,
        summaryCharges: summaryCharges !== undefined ? {
          create: summaryCharges
            .filter((charge: any) => charge.label || charge.mainText)
            .map((charge: any, index: number) => ({
              label: charge.label || 'Fee',
              mainText: charge.mainText || charge.text || '0',
              subText: charge.subText || null,
              displayOrder: charge.displayOrder ?? index,
            })),
        } : undefined,
        requiredDocuments: requiredDocuments !== undefined ? {
          create: requiredDocuments
            .filter((doc: any) => doc.title)
            .map((doc: any, index: number) => ({
              title: doc.title,
              description: doc.description || null,
              displayOrder: doc.displayOrder ?? index,
            })),
        } : undefined,
        processSteps: processSteps !== undefined ? {
          create: processSteps
            .filter((step: any) => step.title)
            .map((step: any, index: number) => ({
              title: step.title,
              description: step.description || null,
              displayOrder: step.displayOrder ?? index,
            })),
        } : undefined,
        benefitSections: benefitSections !== undefined ? {
          create: benefitSections
            .filter((section: any) => section.heading)
            .map((section: any, sectionIndex: number) => ({
              heading: section.heading,
              displayOrder: section.displayOrder ?? sectionIndex,
              subPoints: section.subPoints?.length > 0 ? {
                create: section.subPoints
                  .filter((sp: any) => sp.text)
                  .map((sp: any, spIndex: number) => ({
                    text: sp.text,
                    displayOrder: sp.displayOrder ?? spIndex,
                  })),
              } : undefined,
            })),
        } : undefined,
      },
      include: {
        categories: true,
        bulletPoints: true,
        keyFeatures: true,
        cardBenefits: true,
        bestSuitedForPoints: true,
        summaryCharges: true,
        requiredDocuments: true,
        processSteps: true,
        benefitSections: {
          include: {
            subPoints: true,
          },
        },
      },
    });

    return NextResponse.json(creditCard);
  } catch (error: any) {
    console.error('Credit card update error:', error);
    return NextResponse.json(
      { error: 'Failed to update credit card', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/credit-cards/[id] - Delete credit card (Admin only)
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

    // Check if there are any applications for this credit card
    const applicationsCount = await prisma.application.count({
      where: { cardId: Number(id) },
    });

    if (applicationsCount > 0) {
      return NextResponse.json(
        {
          error: 'Cannot delete credit card with existing applications',
          details: `This credit card has ${applicationsCount} application(s)`
        },
        { status: 400 }
      );
    }

    // Delete all related records first
    await prisma.$transaction([
      // Delete all related items (using productId as the foreign key)
      prisma.creditCardKeyFeature.deleteMany({ where: { productId: Number(id) } }),
      prisma.creditCardBenefit.deleteMany({ where: { productId: Number(id) } }),
      prisma.creditCardSpecialOffer.deleteMany({ where: { productId: Number(id) } }),
      prisma.creditCardBestSuitedFor.deleteMany({ where: { productId: Number(id) } }),
      prisma.creditCardBenefitSection.deleteMany({ where: { productId: Number(id) } }),
      prisma.creditCardBullet.deleteMany({ where: { productId: Number(id) } }),
      prisma.creditCardSummaryCharge.deleteMany({ where: { productId: Number(id) } }),
      prisma.creditCardRequiredDocument.deleteMany({ where: { productId: Number(id) } }),
      prisma.creditCardProcessStep.deleteMany({ where: { productId: Number(id) } }),
      // Finally delete the credit card itself
      prisma.creditCardProduct.delete({ where: { id: Number(id) } }),
    ]);

    return NextResponse.json({ message: 'Credit card deleted successfully' });
  } catch (error: any) {
    console.error('Credit card deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete credit card', details: error.message },
      { status: 500 }
    );
  }
}
