import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'monthly';
    const categorySlug = searchParams.get('categorySlug');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Build where clause for filtering
    const where: any = {};
    
    if (categorySlug && categorySlug !== 'all') {
      where.categorySlug = categorySlug;
    }
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { applicantName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { referenceNo: { contains: search, mode: 'insensitive' } },
        { panNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Fetch applications with related data including employment
    const applications = await prisma.application.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { 
          select: { 
            name: true, 
            email: true, 
            phone: true,
            employment: true  // Include employment data
          } 
        },
        loan: { select: { title: true, bankName: true, slug: true } },
        card: { select: { name: true, bankName: true, slug: true } },
        insurance: { select: { name: true, provider: true, slug: true } },
      },
    });

    return NextResponse.json({ success: true, applications });
  } catch (error) {
    console.error('Applications error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
