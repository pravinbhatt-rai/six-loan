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
    if (loanType) where.loanType = { contains: loanType };
    if (loanSubType) where.loanSubType = { contains: loanSubType };
    if (amountRange) where.amountRange = { contains: amountRange };
    if (eligibleFor) where.eligibleFor = { contains: eligibleFor };
    if (loanPurpose) where.loanPurpose = { contains: loanPurpose };
    if (scheme) where.scheme = { contains: scheme };
    if (vehicleType) where.vehicleType = { contains: vehicleType };
    
    // Category filter
    if (categorySlug) {
      const normalizedSlug = categorySlug.replace(/-/g, '');
      const category = await prisma.category.findFirst({
        where: { slug: normalizedSlug, type: 'LOAN' }
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
        loanOffers: {
          where: {
            isActive: true,
            OR: [
              { validTill: null },
              { validTill: { gte: new Date() } }
            ]
          },
          select: {
            merchant: true,
            offerType: true,
            title: true,
            description: true,
            offerValue: true,
            validFrom: true,
            validTill: true,
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
      summaryCharges: loan.summaryCharges?.map((charge: any) => ({
        label: charge.label,
        mainText: charge.mainText,
        subText: charge.subText,
      })) || [],
      requiredDocuments: loan.requiredDocuments?.map((doc: any) => ({
        title: doc.title,
        description: doc.description,
      })) || [],
      processSteps: loan.processSteps?.map((step: any) => ({
        title: step.title,
        description: step.description,
      })) || [],
      // Filter fields
      loanType: loan.loanType,
      loanSubType: loan.loanSubType,
      amountRange: loan.amountRange,
      eligibleFor: loan.eligibleFor,
      loanPurpose: loan.loanPurpose,
      scheme: loan.scheme,
      vehicleType: loan.vehicleType,
      category: loan.category,
      // Expose offers for compatibility
      offers: loan.loanOffers || [],
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
    
    // More detailed error logging for debugging
    const errorDetails = {
      message: err.message || 'Unknown error',
      code: err.code || 'UNKNOWN',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    };
    
    console.error("Error details:", JSON.stringify(errorDetails));
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch loans", 
        details: err.message,
        ...(process.env.NODE_ENV === 'development' && { debug: errorDetails })
      },
      { status: 500 }
    );
  }
}
