import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';

export async function GET(req: NextRequest) {
  try {
    // Add pagination and limit for performance
    const url = new URL(req.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50); // Max 50 items
    const offset = parseInt(url.searchParams.get('offset') || '0');

    const cards = await prisma.creditCardProduct.findMany({
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        slug: true,
        bankName: true,
        imageUrl: true,
        category: true,
        annualFee: true,
        cardNetwork: true,
        cardType: true,
        bestSuitedFor: true,
        effectiveFree: true,
        recommended: true,
        rating: true,
        firstYearFee: true,
        secondYearFee: true,
        // Optimize by limiting related data fetches
        bestSuitedForPoints: {
          select: {
            text: true, // Only fetch text, remove id and displayOrder for speed
          },
          orderBy: { displayOrder: "asc" },
          take: 5, // Limit to 5 points
        },
        categories: {
          select: {
            name: true,
            slug: true
          }
        },
        bulletPoints: {
          select: {
            text: true, // Only fetch text
          },
          orderBy: { displayOrder: "asc" },
          take: 5, // Limit bullet points
        },
        keyFeatures: {
          select: {
            feature: true, // Only fetch feature text
          },
          orderBy: { displayOrder: "asc" },
          take: 8, // Limit key features
        },
        // Remove offers for initial load - can be lazy loaded
        // offers: {
        //   where: {
        //     isActive: true,
        //     OR: [
        //       { validTill: null },
        //       { validTill: { gte: new Date() } }
        //     ]
        //   },
        //   select: {
        //     merchant: true,
        //     offerType: true,
        //     title: true,
        //     description: true,
        //     offerValue: true,
        //   },
        //   orderBy: { displayOrder: "asc" },
        //   take: 3, // Limit offers
        // },
        summaryCharges: {
          select: {
            label: true,
            mainText: true,
            subText: true,
          },
          orderBy: { displayOrder: "asc" },
          take: 5, // Limit charges
        },
        requiredDocuments: {
          select: {
            title: true,
            description: true,
          },
          orderBy: { displayOrder: "asc" },
          take: 5, // Limit documents
        },
        processSteps: {
          select: {
            title: true,
            description: true,
          },
          orderBy: { displayOrder: "asc" },
          take: 5, // Limit steps
        },
        cardBenefits: {
          select: {
            benefit: true, // Only fetch benefit text
          },
          orderBy: { displayOrder: "asc" },
          take: 10, // Limit benefits
        },
        benefitSections: {
          select: {
            heading: true,
            subPoints: {
              select: {
                text: true, // Only fetch text
              },
              orderBy: { displayOrder: "asc" },
              take: 5, // Limit sub-points per section
            },
          },
          orderBy: { displayOrder: "asc" },
          take: 5, // Limit benefit sections
        },
      },
      orderBy: { rating: "desc" }, // Order by rating for better UX
    });
    
    const products = cards.map((card: any) => ({
      id: card.id,
      name: card.name,
      slug: card.slug,
      bankName: card.bankName,
      imageUrl: card.imageUrl || '',
      bankLogoUrl: card.bankLogoUrl || '',
      category: card.category,
      annualFee: card.annualFee,
      cardNetwork: card.cardNetwork,
      cardType: card.cardType,
      bestSuitedFor: card.bestSuitedFor,
      effectiveFree: card.effectiveFree,
      recommended: card.recommended,
      rating: card.rating,
      firstYearFee: card.firstYearFee,
      secondYearFee: card.secondYearFee,
      bestSuitedForPoints: card.bestSuitedForPoints || [],
      categories: card.categories || [],
      bulletPoints: card.bulletPoints?.map((bp: any) => bp.text) || [],
      keyFeatures: card.keyFeatures?.map((kf: any) => kf.feature) || [],
      offers: card.offers || [],
      summaryCharges: card.summaryCharges || [],
      requiredDocuments: card.requiredDocuments || [],
      processSteps: card.processSteps || [],
      cardBenefits: card.cardBenefits?.map((benefit: any) => benefit.benefit) || [],
      benefitSections: card.benefitSections?.map((section: any) => ({
        heading: section.heading,
        subPoints: section.subPoints?.map((point: any) => ({
          text: point.text,
        })) || [],
      })) || [],
    }));

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // Cache for 5 minutes
      },
    });
  } catch (err: any) {
    console.error("Credit Cards Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch credit cards", details: err.message },
      { status: 500 }
    );
  }
}
