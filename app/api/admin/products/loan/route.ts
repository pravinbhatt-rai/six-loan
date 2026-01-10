import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// POST /api/admin/products/loan - Create new loan product (Admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      bankName,
      bankLogoUrl,
      interestRateText,
      categoryId,
      bullets,
      footerItems,
      keyStatement,
      // Required fields from schema
      processTimeLabel,
      processTimeValue,
      chanceOfApproval,
      aprText,
      emiAmount,
      processTypeLabel,
      processTypeValue,
      tag,
      feature,
      specialization,
      kfsUrl,
    } = body;

    console.log('Creating loan product:', { title, slug, bankName });

    // Auto-generate slug if not provided
    const finalSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Create loan with relations
    const loan = await prisma.loanProduct.create({
      data: {
        title,
        slug: finalSlug,
        bankName,
        bankLogoUrl: bankLogoUrl || '',
        // Required fields with defaults
        processTimeLabel: processTimeLabel || 'Within 24 hours',
        processTimeValue: processTimeValue || '24',
        chanceOfApproval: chanceOfApproval || 'High',
        approvalScore: 85,
        interestRateText: interestRateText || '10% onwards',
        aprText: aprText || '10.5%',
        emiAmount: emiAmount || '₹2,500/month',
        emiValue: 2500,
        processTypeLabel: processTypeLabel || 'Instant',
        processTypeValue: processTypeValue || 'instant',
        disbursalTimeHours: 24,
        // Optional fields
        tag: tag || null,
        feature: feature || null,
        specialization: specialization || null,
        kfsUrl: kfsUrl || null,
        keyStatement: keyStatement || null,
        categoryId: categoryId ? Number(categoryId) : null,
        bullets: bullets?.length > 0 ? {
          create: bullets.map((bullet: any, index: number) => ({
            text: bullet.text || bullet,
            displayOrder: bullet.displayOrder ?? index,
          })),
        } : undefined,
        footerItems: footerItems?.length > 0 ? {
          create: footerItems.map((item: any, index: number) => ({
            text: item.text || item,
            displayOrder: item.displayOrder ?? index,
          })),
        } : undefined,
      },
      include: {
        category: true,
        bullets: true,
        footerItems: true,
      },
    });

    console.log('✅ Loan created successfully:', loan.id);
    return NextResponse.json(loan, { status: 201 });
  } catch (error: any) {
    console.error('❌ Loan creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create loan', details: error.message },
      { status: 500 }
    );
  }
}
