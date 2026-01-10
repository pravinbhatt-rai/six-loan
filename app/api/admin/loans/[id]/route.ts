import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// GET /api/admin/loans/[id] - Get loan by ID (Admin only)
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
    const loan = await prisma.loanProduct.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        bullets: { orderBy: { displayOrder: 'asc' } },
        footerItems: { orderBy: { displayOrder: 'asc' } },
      },
    });

    if (!loan) {
      return NextResponse.json({ error: 'Loan not found' }, { status: 404 });
    }

    return NextResponse.json(loan);
  } catch (error) {
    console.error('Loan fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch loan' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/loans/[id] - Update loan (Admin only)
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
      title,
      slug,
      bankName,
      bankLogoUrl,
      interestRateText,
      aprText,
      emiAmount,
      processTimeLabel,
      processTimeValue,
      chanceOfApproval,
      processTypeLabel,
      processTypeValue,
      tag,
      feature,
      specialization,
      keyStatement,
      categoryId,
      bullets,
      footerItems,
    } = body;

    // Delete existing bullets and footer items if updating them
    if (bullets !== undefined) {
      await prisma.loanBullet.deleteMany({
        where: { productId: Number(id) },
      });
    }
    if (footerItems !== undefined) {
      await prisma.loanFooterItem.deleteMany({
        where: { productId: Number(id) },
      });
    }

    // Update loan - only update fields that are provided
    const loan = await prisma.loanProduct.update({
      where: { id: Number(id) },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(bankName && { bankName }),
        ...(bankLogoUrl !== undefined && { bankLogoUrl }),
        ...(interestRateText && { interestRateText }),
        ...(aprText && { aprText }),
        ...(emiAmount && { emiAmount }),
        ...(processTimeLabel && { processTimeLabel }),
        ...(processTimeValue && { processTimeValue }),
        ...(chanceOfApproval && { chanceOfApproval }),
        ...(processTypeLabel && { processTypeLabel }),
        ...(processTypeValue && { processTypeValue }),
        ...(tag !== undefined && { tag }),
        ...(feature !== undefined && { feature }),
        ...(specialization !== undefined && { specialization }),
        ...(keyStatement !== undefined && { keyStatement }),
        ...(categoryId !== undefined && { categoryId: categoryId ? Number(categoryId) : null }),
        bullets: bullets !== undefined ? {
          create: bullets.map((bullet: any, index: number) => ({
            text: bullet.text || bullet,
            displayOrder: bullet.displayOrder ?? index,
          })),
        } : undefined,
        footerItems: footerItems !== undefined ? {
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

    return NextResponse.json(loan);
  } catch (error: any) {
    console.error('Loan update error:', error);
    return NextResponse.json(
      { error: 'Failed to update loan', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/loans/[id] - Delete loan (Admin only)
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

    // Check if there are any applications for this loan
    const applicationsCount = await prisma.application.count({
      where: { loanId: Number(id) },
    });

    if (applicationsCount > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete loan with existing applications',
          details: `This loan has ${applicationsCount} application(s)` 
        },
        { status: 400 }
      );
    }

    // Delete all related records first, then the loan
    await prisma.$transaction([
      // Delete related items (using productId as the foreign key)
      prisma.loanBullet.deleteMany({ where: { productId: Number(id) } }),
      prisma.loanSummaryCharge.deleteMany({ where: { productId: Number(id) } }),
      prisma.loanRequiredDocument.deleteMany({ where: { productId: Number(id) } }),
      prisma.loanProcessStep.deleteMany({ where: { productId: Number(id) } }),
      prisma.loanFooterItem.deleteMany({ where: { productId: Number(id) } }),
      // Finally delete the loan itself
      prisma.loanProduct.delete({ where: { id: Number(id) } }),
    ]);

    return NextResponse.json({ message: 'Loan deleted successfully' });
  } catch (error: any) {
    console.error('Loan deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete loan', details: error.message },
      { status: 500 }
    );
  }
}
