import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

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
    const categoryId = Number(id);

    const loanCount = await prisma.loanProduct.count({ where: { categoryId } });
    const insuranceCount = await prisma.insuranceProduct.count({ where: { categoryId } });
    const creditCardCount = await prisma.creditCardProduct.count({
      where: { categories: { some: { id: categoryId } } },
    });

    const canDelete = loanCount === 0 && insuranceCount === 0 && creditCardCount === 0;

    return NextResponse.json({
      canDelete,
      reasons: canDelete
        ? []
        : [
            ...(loanCount > 0 ? [`${loanCount} loan product(s)`] : []),
            ...(insuranceCount > 0 ? [`${insuranceCount} insurance product(s)`] : []),
            ...(creditCardCount > 0 ? [`${creditCardCount} credit card product(s)`] : []),
          ],
      counts: {
        loans: loanCount,
        insurance: insuranceCount,
        creditCards: creditCardCount,
      },
    });
  } catch (error) {
    console.error('Check delete error:', error);
    return NextResponse.json(
      { error: 'Failed to check category' },
      { status: 500 }
    );
  }
}

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
    const { name, slug, type, description } = body;

    const categoryId = Number(id);
    if (isNaN(categoryId)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }

    const missingFields = [];
    if (!name || name.trim() === '') missingFields.push('name');
    if (!slug || slug.trim() === '') missingFields.push('slug');
    if (!type || type.trim() === '') missingFields.push('type');

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: 'Missing or empty required fields',
          missingFields,
          received: { name, slug, type, description },
        },
        { status: 400 }
      );
    }

    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    if (slug !== existingCategory.slug) {
      const existingSlug = await prisma.category.findFirst({
        where: { slug, id: { not: categoryId } },
      });

      if (existingSlug) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    const validTypes = ['LOAN', 'CREDIT_CARD', 'INSURANCE'];
    if (!validTypes.includes(type.toUpperCase())) {
      return NextResponse.json(
        { error: 'Invalid type', message: `Type must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name: name.trim(),
        slug: slug.trim(),
        type: type.toUpperCase(),
        description: description ? description.trim() : null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory,
    });
  } catch (error: any) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update category', details: error.message },
      { status: 500 }
    );
  }
}

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
    const categoryId = Number(id);

    await prisma.$transaction(async (tx) => {
      await tx.loanProduct.updateMany({
        where: { categoryId },
        data: { categoryId: null },
      });

      const creditCards = await tx.creditCardProduct.findMany({
        where: { categories: { some: { id: categoryId } } },
        select: { id: true },
      });

      for (const card of creditCards) {
        await tx.creditCardProduct.update({
          where: { id: card.id },
          data: { categories: { disconnect: { id: categoryId } } },
        });
      }

      await tx.insuranceProduct.updateMany({
        where: { categoryId },
        data: { categoryId: null },
      });

      await tx.category.delete({ where: { id: categoryId } });
    });

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
