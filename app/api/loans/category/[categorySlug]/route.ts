import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ categorySlug: string }> }
) {
  try {
    const { categorySlug } = await params;
    
    const category = await prisma.category.findFirst({
      where: { 
        slug: categorySlug,
        type: 'LOAN'
      },
      include: {
        loans: {
          include: {
            bullets: {
              select: { 
                text: true, 
                displayOrder: true 
              },
              orderBy: { displayOrder: "asc" },
            },
            footerItems: {
              select: {
                text: true,
                displayOrder: true
              },
              orderBy: { displayOrder: "asc" },
            }
          },
          orderBy: { createdAt: "desc" },
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const products = category.loans.map((loan: any) => ({
      id: loan.id,
      title: loan.title,
      slug: loan.slug,
      bankName: loan.bankName,
      bankLogoUrl: loan.bankLogoUrl || '',
      processTimeLabel: loan.processTimeLabel || '',
      processTimeValue: loan.processTimeValue || '',
      chanceOfApproval: loan.chanceOfApproval || '',
      approvalScore: loan.approvalScore || 0,
      interestRateText: loan.interestRateText || '',
      aprText: loan.aprText || '',
      emiAmount: loan.emiAmount || '',
      emiValue: loan.emiValue || 0,
      processTypeLabel: loan.processTypeLabel || '',
      processTypeValue: loan.processTypeValue || '',
      disbursalTimeHours: loan.disbursalTimeHours || 0,
      keyStatement: loan.keyStatement || '',
      bullets: loan.bullets || [],
      footerItems: loan.footerItems || []
    }));

    return NextResponse.json({
      success: true,
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        type: category.type
      },
      products,
      count: products.length
    });
  } catch (err: any) {
    console.error("Loans by Category Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch loans by category", details: err.message },
      { status: 500 }
    );
  }
}
