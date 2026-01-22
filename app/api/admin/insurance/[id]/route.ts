import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// GET /api/admin/insurance/[id] - Get insurance by ID (Admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const insurance = await prisma.insuranceProduct.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
      },
    });

    if (!insurance) {
      return NextResponse.json(
        { error: 'Insurance product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(insurance);
  } catch (error) {
    console.error('Insurance fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insurance product' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/insurance/[id] - Update insurance (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
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

    // Update insurance product
    const insurance = await prisma.insuranceProduct.update({
      where: { id: Number(id) },
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

    return NextResponse.json(insurance);
  } catch (error: any) {
    console.error('Insurance update error:', error);
    return NextResponse.json(
      { error: 'Failed to update insurance product', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/insurance/[id] - Delete insurance (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if there are any applications for this insurance
    const applicationsCount = await prisma.application.count({
      where: { insuranceId: Number(id) },
    });

    if (applicationsCount > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete insurance with existing applications',
          details: `This insurance has ${applicationsCount} application(s)` 
        },
        { status: 400 }
      );
    }

    await prisma.insuranceProduct.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Insurance product deleted successfully' });
  } catch (error: any) {
    console.error('Insurance deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete insurance product', details: error.message },
      { status: 500 }
    );
  }
}
