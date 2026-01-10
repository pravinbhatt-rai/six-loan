import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// GET /api/admin/loans - Get all loans (Admin only)
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const loans = await prisma.loanProduct.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        bullets: {
          select: {
            text: true,
            displayOrder: true,
          },
          orderBy: { displayOrder: 'asc' },
        },
        footerItems: {
          select: {
            text: true,
            displayOrder: true,
          },
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    return NextResponse.json(loans);
  } catch (error) {
    console.error('Loans fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch loans' },
      { status: 500 }
    );
  }
}

// POST /api/admin/loans - Create new loan (Admin only)
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
      processingFee,
      maxLoanAmount,
      tenure,
      categoryId,
      bullets,
      footerItems,
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
      keyStatement,
    } = body;

    // Create loan with relations
    const loan = await prisma.loanProduct.create({
      data: {
        title,
        slug,
        bankName,
        bankLogoUrl: bankLogoUrl || '',
        // Required string fields with defaults
        processTimeLabel: processTimeLabel || 'Within 24 hours',
        processTimeValue: processTimeValue || '24',
        chanceOfApproval: chanceOfApproval || 'High',
        interestRateText: interestRateText || '10% onwards',
        aprText: aprText || '10.5%',
        emiAmount: emiAmount || '₹2,500/month',
        processTypeLabel: processTypeLabel || 'Instant',
        processTypeValue: processTypeValue || 'instant',
        // Optional string fields
        tag: tag || null,
        feature: feature || null,
        specialization: specialization || null,
        keyStatement: keyStatement || null,
        // Numeric fields with defaults
        approvalScore: 85,
        emiValue: 2500,
        disbursalTimeHours: 24,
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

    return NextResponse.json(loan, { status: 201 });
  } catch (error: any) {
    console.error('Loan creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create loan', details: error.message },
      { status: 500 }
    );
  }
}
