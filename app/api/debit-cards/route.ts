import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Check if Prisma client has the model
    if (!prisma.debitCardProduct) {
      return NextResponse.json({
        success: false,
        error: 'Prisma client not properly initialized',
        details: 'Please restart the Next.js dev server after running "npx prisma generate"'
      }, { status: 503 });
    }
    
    // Extract filter parameters
    const bankName = searchParams.get('bankName');
    const accountType = searchParams.get('accountType');
    const cardType = searchParams.get('cardType');
    const cardNetwork = searchParams.get('cardNetwork');
    const bestFor = searchParams.get('bestFor');
    const internationalUsage = searchParams.get('internationalUsage');
    const loungeAccess = searchParams.get('loungeAccess');
    const contactless = searchParams.get('contactless');
    const limit = searchParams.get('limit');
    
    // Build where clause
    const where: any = {};

    // Apply filters if provided
    if (bankName) where.bankName = { contains: bankName, mode: 'insensitive' };
    if (accountType) where.accountType = accountType;
    if (cardType) where.cardType = cardType;
    if (cardNetwork) where.cardNetwork = cardNetwork;
    if (bestFor) where.bestFor = { contains: bestFor, mode: 'insensitive' };
    if (internationalUsage === 'true') where.internationalUsage = true;
    if (loungeAccess === 'true') where.loungeAccess = true;
    if (contactless === 'true') where.contactless = true;

    const debitCards = await prisma.debitCardProduct.findMany({
      where,
      include: {
        bulletPoints: {
          select: { 
            text: true, 
            displayOrder: true 
          },
          orderBy: { displayOrder: "asc" },
        },
        keyFeatures: {
          select: {
            icon: true,
            title: true,
            description: true,
            displayOrder: true
          },
          orderBy: { displayOrder: "asc" },
        },
        offers: {
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
        },
        safetyFeatures: {
          select: {
            featureName: true,
            description: true,
            displayOrder: true
          },
          orderBy: { displayOrder: "asc" },
        },
        categories: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        // DebitCardProduct doesn't have summaryCharges, requiredDocuments, processSteps
        // summaryCharges: {
        //   select: {
        //     id: true,
        //     label: true,
        //     mainText: true,
        //     subText: true,
        //   },
        //   orderBy: { displayOrder: "asc" },
        // },
        // requiredDocuments: {
        //   select: {
        //     id: true,
        //     title: true,
        //     description: true,
        //   },
        //   orderBy: { displayOrder: "asc" },
        // },
        // processSteps: {
        //   select: {
        //     id: true,
        //     title: true,
        //     description: true,
        //   },
        //   orderBy: { displayOrder: "asc" },
        // },
      },
      orderBy: [
        { recommended: "desc" },
        { rating: "desc" },
        { createdAt: "desc" }
      ],
      take: limit ? parseInt(limit) : undefined,
    });

    const products = debitCards.map((card: any) => ({
      id: card.id,
      name: card.name,
      slug: card.slug,
      bankName: card.bankName,
      imageUrl: card.imageUrl || '',
      // bankLogoUrl: card.bankLogoUrl || '', // DebitCardProduct doesn't have bankLogoUrl
      accountType: card.accountType,
      cardNetwork: card.cardNetwork,
      cardType: card.cardType,
      annualFee: card.annualFee,
      atmWithdrawalLimit: card.atmWithdrawalLimit,
      posLimit: card.posLimit,
      onlineLimit: card.onlineLimit,
      internationalUsage: card.internationalUsage,
      contactless: card.contactless,
      loungeAccess: card.loungeAccess,
      loungeAccessDetails: card.loungeAccessDetails,
      cashbackRate: card.cashbackRate,
      rewardPoints: card.rewardPoints,
      fuelSurcharge: card.fuelSurcharge,
      accidentInsurance: card.accidentInsurance,
      fraudProtection: card.fraudProtection,
      rating: card.rating,
      recommended: card.recommended,
      bestFor: card.bestFor,
      applyUrl: card.applyUrl,
      categories: card.categories || [],
      bulletPoints: card.bulletPoints || [],
      keyFeatures: card.keyFeatures || [],
      offers: card.offers || [],
      safetyFeatures: card.safetyFeatures || [],
      summaryCharges: card.summaryCharges?.map((charge: any) => ({
        label: charge.label,
        mainText: charge.mainText,
        subText: charge.subText,
      })) || [],
      requiredDocuments: card.requiredDocuments?.map((doc: any) => ({
        title: doc.title,
        description: doc.description,
      })) || [],
      processSteps: card.processSteps?.map((step: any) => ({
        title: step.title,
        description: step.description,
      })) || [],
    }));

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
      filters: {
        bankName,
        accountType,
        cardType,
        cardNetwork,
        bestFor,
        internationalUsage,
        loungeAccess,
        contactless,
      }
    });
  } catch (err: any) {
    console.error("Debit Cards API Error:", err);
    
    const errorDetails = {
      message: err.message || 'Unknown error',
      code: err.code || 'UNKNOWN',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    };
    
    console.error("Error details:", JSON.stringify(errorDetails));
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch debit cards", 
        details: err.message,
        ...(process.env.NODE_ENV === 'development' && { debug: errorDetails })
      },
      { status: 500 }
    );
  }
}
