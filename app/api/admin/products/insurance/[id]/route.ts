import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// GET /api/admin/products/insurance/[id] - Get single insurance (Admin only)
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
    const insuranceId = parseInt(id);

    if (isNaN(insuranceId)) {
      return NextResponse.json({ error: 'Invalid insurance ID' }, { status: 400 });
    }

    const insurance = await prisma.insuranceProduct.findUnique({
      where: { id: insuranceId },
      include: {
        category: true,
      },
    });

    if (!insurance) {
      return NextResponse.json({ error: 'Insurance not found' }, { status: 404 });
    }

    return NextResponse.json(insurance);
  } catch (error: any) {
    console.error('Error fetching insurance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insurance', details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/admin/products/insurance/[id] - Update insurance (Admin only)
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
    const insuranceId = parseInt(id);

    if (isNaN(insuranceId)) {
      return NextResponse.json({ error: 'Invalid insurance ID' }, { status: 400 });
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
      categoryId,
    } = body;

    // Update insurance with new data
    const updatedInsurance = await prisma.insuranceProduct.update({
      where: { id: insuranceId },
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

    return NextResponse.json(updatedInsurance);
  } catch (error: any) {
    console.error('Error updating insurance:', error);
    return NextResponse.json(
      { error: 'Failed to update insurance', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products/insurance/[id] - Delete insurance (Admin only)
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
    const insuranceId = parseInt(id);

    if (isNaN(insuranceId)) {
      return NextResponse.json({ error: 'Invalid insurance ID' }, { status: 400 });
    }

    // Check if insurance has applications
    const applicationCount = await prisma.application.count({
      where: { insuranceId }
    });

    if (applicationCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete insurance. It has ${applicationCount} application(s).` },
        { status: 400 }
      );
    }

    // Delete the insurance
    await prisma.insuranceProduct.delete({
      where: { id: insuranceId }
    });

    return NextResponse.json({ message: 'Insurance deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting insurance:', error);
    return NextResponse.json(
      { error: 'Failed to delete insurance', details: error.message },
      { status: 500 }
    );
  }
}
