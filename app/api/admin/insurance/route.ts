import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// GET /api/admin/insurance - Get all insurance products (Admin only)
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const insurance = await prisma.insuranceProduct.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(insurance);
  } catch (error) {
    console.error('Insurance fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insurance products' },
      { status: 500 }
    );
  }
}

// POST /api/admin/insurance - Create new insurance product (Admin only)
export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      slug,
      provider,
      logoUrl,
      sumInsured,
      minPremium,
      maxPremium,
      tenure,
      description,
      type,
      categoryId,
    } = body;

    // Create insurance product
    const insurance = await prisma.insuranceProduct.create({
      data: {
        name,
        slug,
        provider,
        logoUrl,
        sumInsured,
        minPremium,
        maxPremium,
        policyTerm: tenure, // Map tenure to policyTerm
        description,
        type,
        categoryId: categoryId ? Number(categoryId) : null,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(insurance, { status: 201 });
  } catch (error: any) {
    console.error('Insurance creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create insurance product', details: error.message },
      { status: 500 }
    );
  }
}
