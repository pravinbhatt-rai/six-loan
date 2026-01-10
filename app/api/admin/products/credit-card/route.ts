import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// POST /api/admin/products/credit-card - Create new credit card product (Admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      slug,
      bankName,
      bankLogoUrl,
      cardImageUrl,
      imageUrl,
      annualFee,
      cardNetwork,
      categories,
      bulletPoints,
      summaryCharges,
      effectiveFree,
      recommended,
      rating,
      cardType,
      bestSuitedFor,
      videoUrl,
      termsConditionsUrl,
      firstYearFee,
      secondYearFee,
      feeWaiverCondition,
    } = body;

    console.log('Creating credit card product:', { name, slug, bankName });

    // Auto-generate slug if not provided
    const finalSlug = slug || name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Handle bestSuitedFor - convert array to string if needed
    const bestSuitedForString = Array.isArray(bestSuitedFor) 
      ? bestSuitedFor.join(', ') 
      : (bestSuitedFor || null);

    // Create credit card with relations
    const creditCard = await prisma.creditCardProduct.create({
      data: {
        name,
        slug: finalSlug,
        bankName,
        // Required field - use imageUrl or cardImageUrl or default
        imageUrl: imageUrl || cardImageUrl || bankLogoUrl || '',
        bankLogoUrl: bankLogoUrl || null,
        // Required fields with defaults - ensure annualFee is a string
        annualFee: annualFee ? String(annualFee) : 'Lifetime Free',
        cardNetwork: cardNetwork || 'Visa',
        // Optional fields from schema
        effectiveFree: effectiveFree || false,
        recommended: recommended || false,
        rating: rating ? parseFloat(rating) : 0,
        cardType: cardType || null,
        bestSuitedFor: bestSuitedForString,
        videoUrl: videoUrl || null,
        termsConditionsUrl: termsConditionsUrl || null,
        firstYearFee: firstYearFee || null,
        secondYearFee: secondYearFee || null,
        feeWaiverCondition: feeWaiverCondition || null,
        categories: categories?.length > 0 ? {
          connect: categories.map((id: number) => ({ id: Number(id) })),
        } : undefined,
        bulletPoints: bulletPoints?.length > 0 ? {
          create: bulletPoints.map((point: any, index: number) => ({
            text: point.text || point,
            displayOrder: point.displayOrder ?? index,
          })),
        } : undefined,
        summaryCharges: summaryCharges?.length > 0 ? {
          create: summaryCharges.map((charge: any, index: number) => ({
            label: charge.label || 'Fee',
            mainText: charge.mainText || charge.text || '0',
            subText: charge.subText || null,
            displayOrder: charge.displayOrder ?? index,
          })),
        } : undefined,
      },
      include: {
        categories: true,
        bulletPoints: true,
        summaryCharges: true,
      },
    });

    console.log('✅ Credit card created successfully:', creditCard.id);
    return NextResponse.json(creditCard, { status: 201 });
  } catch (error: any) {
    console.error('❌ Credit card creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create credit card', details: error.message },
      { status: 500 }
    );
  }
}
