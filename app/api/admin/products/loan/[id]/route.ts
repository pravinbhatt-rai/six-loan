import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// GET /api/admin/products/loan/[id] - Get single loan (Admin only)
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
    const loanId = parseInt(id);

    if (isNaN(loanId)) {
      return NextResponse.json({ error: 'Invalid loan ID' }, { status: 400 });
    }

    const loan = await prisma.loanProduct.findUnique({
      where: { id: loanId },
      include: {
        category: true,
        bullets: {
          orderBy: { displayOrder: 'asc' }
        },
        footerItems: {
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

    if (!loan) {
      return NextResponse.json({ error: 'Loan not found' }, { status: 404 });
    }

    return NextResponse.json(loan);
  } catch (error: any) {
    console.error('Error fetching loan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch loan', details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/admin/products/loan/[id] - Update loan (Admin only)
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
    const loanId = parseInt(id);

    if (isNaN(loanId)) {
      return NextResponse.json({ error: 'Invalid loan ID' }, { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      bankName,
      bankLogoUrl,
      tag,
      feature,
      specialization,
      processTimeLabel,
      processTimeValue,
      chanceOfApproval,
      approvalScore,
      interestRateText,
      aprText,
      emiAmount,
      emiValue,
      processTypeLabel,
      processTypeValue,
      disbursalTimeHours,
      categoryId,
      bullets,
      footerItems,
      summaryCharges,
      requiredDocuments,
      processSteps,
      keyStatement,
    } = body;

    // Delete existing relations if provided new ones
    if (bullets) {
      await prisma.loanBullet.deleteMany({
        where: { productId: loanId }
      });
    }
    if (footerItems) {
      await prisma.loanFooterItem.deleteMany({
        where: { productId: loanId }
      });
    }
    if (summaryCharges) {
      await prisma.loanSummaryCharge.deleteMany({
        where: { productId: loanId }
      });
    }
    if (requiredDocuments) {
      await prisma.loanRequiredDocument.deleteMany({
        where: { productId: loanId }
      });
    }
    if (processSteps) {
      await prisma.loanProcessStep.deleteMany({
        where: { productId: loanId }
      });
    }

    // Update loan with new data
    const updatedLoan = await prisma.loanProduct.update({
      where: { id: loanId },
      data: {
        title,
        slug,
        bankName,
        bankLogoUrl,
        tag: tag || null,
        feature: feature || null,
        specialization: specialization || null,
        processTimeLabel: processTimeLabel || 'Within 24 hours',
        processTimeValue: processTimeValue || '24',
        chanceOfApproval: chanceOfApproval || 'High',
        approvalScore: approvalScore || 85,
        interestRateText: interestRateText || '10% onwards',
        aprText: aprText || '10.5%',
        emiAmount: emiAmount || '₹2,500/month',
        emiValue: emiValue ? parseFloat(emiValue) : 2500,
        processTypeLabel: processTypeLabel || 'Instant',
        processTypeValue: processTypeValue || 'instant',
        disbursalTimeHours: disbursalTimeHours ? parseFloat(disbursalTimeHours) : 24,
        categoryId: categoryId ? Number(categoryId) : null,
        keyStatement: keyStatement || null,
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
        category: true,
        bullets: true,
        footerItems: true,
        summaryCharges: true,
        requiredDocuments: true,
        processSteps: true,
      },
    });

    return NextResponse.json(updatedLoan);
  } catch (error: any) {
    console.error('Error updating loan:', error);
    return NextResponse.json(
      { error: 'Failed to update loan', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products/loan/[id] - Delete loan (Admin only)
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
    const loanId = parseInt(id);

    if (isNaN(loanId)) {
      return NextResponse.json({ error: 'Invalid loan ID' }, { status: 400 });
    }

    // Check if loan has applications
    const applicationCount = await prisma.application.count({
      where: { loanId }
    });

    if (applicationCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete loan. It has ${applicationCount} application(s).` },
        { status: 400 }
      );
    }

    // Delete all related records first
    await prisma.loanBullet.deleteMany({ where: { productId: loanId } });
    await prisma.loanFooterItem.deleteMany({ where: { productId: loanId } });
    await prisma.loanSummaryCharge.deleteMany({ where: { productId: loanId } });
    await prisma.loanRequiredDocument.deleteMany({ where: { productId: loanId } });
    await prisma.loanProcessStep.deleteMany({ where: { productId: loanId } });

    // Delete the loan
    await prisma.loanProduct.delete({
      where: { id: loanId }
    });

    return NextResponse.json({ message: 'Loan deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting loan:', error);
    return NextResponse.json(
      { error: 'Failed to delete loan', details: error.message },
      { status: 500 }
    );
  }
}
