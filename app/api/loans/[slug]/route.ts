import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const loan = await prisma.loanProduct.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
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
        summaryCharges: {
          select: {
            label: true,
            mainText: true,
            subText: true,
            displayOrder: true,
          },
          orderBy: { displayOrder: 'asc' },
        },
        requiredDocuments: {
          select: {
            title: true,
            description: true,
            displayOrder: true,
          },
          orderBy: { displayOrder: 'asc' },
        },
        processSteps: {
          select: {
            title: true,
            description: true,
            displayOrder: true,
          },
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    if (!loan) {
      return NextResponse.json(
        {
          success: false,
          error: 'Loan not found',
        },
        { status: 404 }
      );
    }

    // Format the response to match LoanDetailsData interface
    const loanDetails = {
      id: loan.id,
      title: loan.title,
      slug: loan.slug,
      bankName: loan.bankName,
      bankLogoUrl: loan.bankLogoUrl || '',
      emiAmount: loan.emiAmount || '₹ 2,000',
      emiExample: loan.emiAmount || '₹ 2,000',
      interestRateText: loan.interestRateText || '',
      aprText: loan.aprText || '',
      processTimeLabel: loan.processTimeLabel || '',
      chanceOfApproval: loan.chanceOfApproval || '',
      keyStatement: loan.keyStatement || '',
      summaryCharges: loan.summaryCharges.map((charge) => ({
        label: charge.label,
        mainText: charge.mainText,
        subText: charge.subText,
      })),
      requiredDocuments: loan.requiredDocuments.map((doc) => ({
        title: doc.title,
        description: doc.description,
      })),
      processSteps: loan.processSteps.map((step) => ({
        title: step.title,
        description: step.description,
      })),
      bullets: loan.bullets || [],
    };

    return NextResponse.json({
      success: true,
      loan: loanDetails,
    });
  } catch (error: any) {
    console.error('Loan Details Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch loan details',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
