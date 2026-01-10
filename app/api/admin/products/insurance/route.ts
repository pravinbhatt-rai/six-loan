import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// POST /api/admin/products/insurance - Create new insurance product (Admin only)
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
      type,
      description,
      minPremium,
      coverage,
      isActive,
      categoryId,
    } = body;

    console.log('Creating insurance product:', { name, slug, provider });

    // Create insurance product
    const insurance = await prisma.insuranceProduct.create({
      data: {
        name,
        slug,
        provider,
        logoUrl: logoUrl || '',
        type: type || 'Health Insurance',
        description: description || '',
        minPremium: minPremium ? parseFloat(minPremium) : null,
        coverage: coverage || null,
        categoryId: categoryId ? Number(categoryId) : null,
      },
      include: {
        category: true,
      },
    });

    console.log('✅ Insurance created successfully:', insurance.id);
    return NextResponse.json(insurance, { status: 201 });
  } catch (error: any) {
    console.error('❌ Insurance creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create insurance product', details: error.message },
      { status: 500 }
    );
  }
}
