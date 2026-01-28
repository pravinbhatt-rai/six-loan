import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(req: NextRequest) {
  try {
    // Fetch all products in parallel
    const [creditCards, debitCards, loans] = await Promise.all([
      // Credit Cards
      prisma.creditCardProduct.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          bankName: true,
          imageUrl: true,
          cardType: true,
          annualFee: true,
          cardNetwork: true,
          bestSuitedFor: true,
          effectiveFree: true,
          recommended: true,
          rating: true,
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
        },
        orderBy: { createdAt: "desc" },
      }),

      // Debit Cards
      prisma.debitCardProduct.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          bankName: true,
          imageUrl: true,
          cardType: true,
          annualFee: true,
          cardNetwork: true,
          bestFor: true,
          internationalUsage: true,
          loungeAccess: true,
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
        },
        orderBy: { createdAt: "desc" },
      }),

      // Loans
      prisma.loanProduct.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          bankName: true,
          bankLogoUrl: true,
          loanType: true,
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
        },
        orderBy: { createdAt: "desc" },
      })
    ]);

    // Transform and combine all products
    const allProducts = [
      // Credit Cards
      ...creditCards.map(card => ({
        id: card.id,
        name: card.name,
        bankName: card.bankName,
        type: 'credit-card',
        imageUrl: card.imageUrl,
        cardType: card.cardType,
        annualFee: card.annualFee,
        cardNetwork: card.cardNetwork,
        bestFor: card.bestSuitedFor,
        effectiveFree: card.effectiveFree,
        recommended: card.recommended,
        rating: card.rating,
        offers: card.offers,
      })),

      // Debit Cards
      ...debitCards.map(card => ({
        id: card.id,
        name: card.name,
        bankName: card.bankName,
        type: 'debit-card',
        imageUrl: card.imageUrl,
        cardType: card.cardType,
        annualFee: card.annualFee,
        cardNetwork: card.cardNetwork,
        bestFor: card.bestFor,
        internationalUsage: card.internationalUsage,
        loungeAccess: card.loungeAccess,
        offers: card.offers,
      })),

      // Loans
      ...loans.map(loan => ({
        id: loan.id,
        name: loan.title,
        bankName: loan.bankName,
        type: 'loan',
        bankLogoUrl: loan.bankLogoUrl,
        loanType: loan.loanType,
        offers: loan.offers,
      }))
    ];

    return NextResponse.json({
      success: true,
      products: allProducts,
      count: allProducts.length
    });

  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch products',
        details: error.message 
      },
      { status: 500 }
    );
  }
}