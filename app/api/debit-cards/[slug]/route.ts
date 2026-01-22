import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    
    // Check if this is actually an image file request (has extension)
    if (slug.includes('.')) {
      const ext = slug.split('.').pop()?.toLowerCase();
      if (['png', 'jpg', 'jpeg', 'svg', 'webp'].includes(ext || '')) {
        return NextResponse.json(
          { error: 'Not found' },
          { status: 404 }
        );
      }
    }

    const debitCard = await prisma.debitCardProduct.findUnique({
      where: { slug },
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
            howToUse: true,
            displayOrder: true
          },
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    if (!debitCard) {
      return NextResponse.json(
        { success: false, error: "Debit card not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      debitCard: {
        id: debitCard.id,
        name: debitCard.name,
        slug: debitCard.slug,
        bankName: debitCard.bankName,
        imageUrl: debitCard.imageUrl,
        bankLogoUrl: debitCard.bankLogoUrl,
        accountType: debitCard.accountType,
        cardNetwork: debitCard.cardNetwork,
        cardType: debitCard.cardType,
        annualFee: debitCard.annualFee,
        issuanceFee: debitCard.issuanceFee,
        replacementFee: debitCard.replacementFee,
        atmWithdrawalLimit: debitCard.atmWithdrawalLimit,
        posLimit: debitCard.posLimit,
        onlineLimit: debitCard.onlineLimit,
        internationalUsage: debitCard.internationalUsage,
        contactless: debitCard.contactless,
        loungeAccess: debitCard.loungeAccess,
        loungeAccessDetails: debitCard.loungeAccessDetails,
        cashbackRate: debitCard.cashbackRate,
        rewardPoints: debitCard.rewardPoints,
        fuelSurcharge: debitCard.fuelSurcharge,
        accidentInsurance: debitCard.accidentInsurance,
        purchaseProtection: debitCard.purchaseProtection,
        fraudProtection: debitCard.fraudProtection,
        zeroBilling: debitCard.zeroBilling,
        minimumBalance: debitCard.minimumBalance,
        minimumAge: debitCard.minimumAge,
        maximumAge: debitCard.maximumAge,
        rating: debitCard.rating,
        recommended: debitCard.recommended,
        bestFor: debitCard.bestFor,
        videoUrl: debitCard.videoUrl,
        termsConditionsUrl: debitCard.termsConditionsUrl,
        applyUrl: debitCard.applyUrl,
        bulletPoints: debitCard.bulletPoints || [],
        keyFeatures: debitCard.keyFeatures || [],
        offers: debitCard.offers || [],
        safetyFeatures: debitCard.safetyFeatures || [],
      }
    });
  } catch (err: any) {
    console.error("Debit Card Details API Error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch debit card details", details: err.message },
      { status: 500 }
    );
  }
}
