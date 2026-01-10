import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// GET /api/admin/credit-cards - Get all credit cards (Admin only)
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const creditCards = await prisma.creditCardProduct.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        categories: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        bestSuitedForPoints: {
          orderBy: { displayOrder: 'asc' },
        },
        bulletPoints: {
          orderBy: { displayOrder: 'asc' },
        },
        keyFeatures: {
          orderBy: { displayOrder: 'asc' },
        },
        cardBenefits: {
          orderBy: { displayOrder: 'asc' },
        },
        benefitSections: {
          include: {
            subPoints: {
              orderBy: { displayOrder: 'asc' },
            },
          },
          orderBy: { displayOrder: 'asc' },
        },
        summaryCharges: {
          orderBy: { displayOrder: 'asc' },
        },
        requiredDocuments: {
          orderBy: { displayOrder: 'asc' },
        },
        processSteps: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    return NextResponse.json(creditCards);
  } catch (error) {
    console.error('Credit cards fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credit cards' },
      { status: 500 }
    );
  }
}

// POST /api/admin/credit-cards - Create new credit card (Admin only)
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

    // Helper function to extract text value from various formats
    const extractTextValue = (item: any, key: string = 'text'): string => {
      if (typeof item === 'string') return item;
      if (typeof item[key] === 'string') return item[key];
      if (item[key] && typeof item[key][key] === 'string') return item[key][key];
      return '';
    };

    // Helper to create array items
    const createArrayItems = (items: any[], key: string) => {
      if (!items?.length) return undefined;
      
      const filtered = items.filter((item: any) => {
        const value = extractTextValue(item, key);
        return value && value.trim() !== '';
      });

      if (filtered.length === 0) return undefined;

      return {
        create: filtered.map((item: any, index: number) => ({
          [key]: extractTextValue(item, key).trim(),
          displayOrder: item.displayOrder ?? index,
        })),
      };
    };

    // Create credit card with relations
    const creditCard = await prisma.creditCardProduct.create({
      data: {
        name,
        slug,
        bankName,
        bankLogoUrl: bankLogoUrl || null,
        imageUrl: imageUrl || bankLogoUrl || '',
        annualFee: annualFee ? String(annualFee) : 'Lifetime Free',
        cardNetwork: cardNetwork || 'Visa',
        cardType: cardType || null,
        bestSuitedFor: bestSuitedFor || null,
        effectiveFree: effectiveFree || false,
        recommended: recommended || false,
        rating: rating ? parseFloat(rating) : 0,
        videoUrl: videoUrl || null,
        termsConditionsUrl: termsConditionsUrl || null,
        firstYearFee: firstYearFee || null,
        secondYearFee: secondYearFee || null,
        feeWaiverCondition: feeWaiverCondition || null,
        categories: categories?.length > 0 ? {
          connect: categories.map((id: number) => ({ id: Number(id) })),
        } : undefined,
        bulletPoints: createArrayItems(bulletPoints, 'text'),
        keyFeatures: createArrayItems(keyFeatures, 'feature'),
        cardBenefits: createArrayItems(cardBenefits, 'benefit'),
        bestSuitedForPoints: createArrayItems(bestSuitedForPoints, 'text'),
        summaryCharges: summaryCharges?.length > 0 ? {
          create: summaryCharges
            .filter((charge: any) => charge.label || charge.mainText)
            .map((charge: any, index: number) => ({
              label: charge.label || 'Fee',
              mainText: charge.mainText || '0',
              subText: charge.subText || null,
              displayOrder: charge.displayOrder ?? index,
            })),
        } : undefined,
        requiredDocuments: requiredDocuments?.length > 0 ? {
          create: requiredDocuments
            .filter((doc: any) => doc.title)
            .map((doc: any, index: number) => ({
              title: doc.title,
              description: doc.description || null,
              displayOrder: doc.displayOrder ?? index,
            })),
        } : undefined,
        processSteps: processSteps?.length > 0 ? {
          create: processSteps
            .filter((step: any) => step.title)
            .map((step: any, index: number) => ({
              title: step.title,
              description: step.description || null,
              displayOrder: step.displayOrder ?? index,
            })),
        } : undefined,
        benefitSections: benefitSections?.length > 0 ? {
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

    return NextResponse.json(creditCard, { status: 201 });
  } catch (error: any) {
    console.error('Credit card creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create credit card', details: error.message },
      { status: 500 }
    );
  }
}
