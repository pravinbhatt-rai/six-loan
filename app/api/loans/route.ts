import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Extract filter parameters
    const loanType = searchParams.get('loanType');
    const loanSubType = searchParams.get('loanSubType');
    const amountRange = searchParams.get('amountRange');
    const eligibleFor = searchParams.get('eligibleFor');
    const loanPurpose = searchParams.get('loanPurpose');
    const scheme = searchParams.get('scheme');
    const vehicleType = searchParams.get('vehicleType');
    const categorySlug = searchParams.get('category');
    
    // Build where clause
    const where: any = {
      productType: 'LOAN'
    };

    // Apply filters if provided
    if (loanType) where.loanType = loanType;
    if (loanSubType) where.loanSubType = loanSubType;
    if (amountRange) where.amountRange = amountRange;
    if (eligibleFor) where.eligibleFor = eligibleFor;
    if (loanPurpose) where.loanPurpose = loanPurpose;
    if (scheme) where.scheme = scheme;
    if (vehicleType) where.vehicleType = vehicleType;
    
    // Category filter
    if (categorySlug) {
      const category = await prisma.category.findFirst({
        where: { slug: categorySlug, type: 'LOAN' }
      });
      if (category) {
        where.categoryId = category.id;
      }
    }

    const loans = await prisma.loanProduct.findMany({
      where,
      include: {
        category: true,
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
    });

    const products = loans.map((loan: any) => ({
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
      footerItems: loan.footerItems || [],
      // Filter fields
      loanType: loan.loanType,
      loanSubType: loan.loanSubType,
      amountRange: loan.amountRange,
      eligibleFor: loan.eligibleFor,
      loanPurpose: loan.loanPurpose,
      scheme: loan.scheme,
      vehicleType: loan.vehicleType,
      category: loan.category
    }));

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
      filters: {
        loanType,
        loanSubType,
        amountRange,
        eligibleFor,
        loanPurpose,
        scheme,
        vehicleType,
        categorySlug
      }
    });
  } catch (err: any) {
    console.error("Loans API Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch loans", details: err.message },
      { status: 500 }
    );
  }
}
