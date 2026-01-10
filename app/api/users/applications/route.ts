import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAuth } from '@/lib/auth/jwt';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult || !authResult.authenticated || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const applications = await prisma.application.findMany({
      where: {
        userId: authResult.user.id,
      },
      include: {
        loan: {
          select: {
            id: true,
            title: true,
            bankName: true,
            slug: true,
            bankLogoUrl: true,
          },
        },
        card: {
          select: {
            id: true,
            name: true,
            bankName: true,
            bankLogoUrl: true,
          },
        },
        insurance: {
          select: {
            id: true,
            name: true,
            provider: true,
            logoUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Format applications for frontend with all details
    const formattedApplications = applications.map((app: any) => ({
      id: app.id,
      referenceNo: app.referenceNo,
      type: app.type,
      status: app.status,
      amount: app.amount,
      categoryName: app.categoryName,
      categorySlug: app.categorySlug,
      cardType: app.cardType,
      employmentType: app.employmentType,
      monthlyIncome: app.monthlyIncome,
      employerName: app.employerName,
      workExperience: app.workExperience,
      residenceType: app.residenceType,
      city: app.city,
      pincode: app.pincode,
      phone: app.phone,
      email: app.email,
      panNumber: app.panNumber,
      applicantName: app.applicantName,
      feedback: app.feedback,
      additionalInfo: app.notes,
      documents: app.documents,
      createdAt: app.createdAt.toISOString(),
      updatedAt: app.updatedAt.toISOString(),

      // Product info
      loan: app.loan,
      card: app.card,
      insurance: app.insurance,
    }));

    return NextResponse.json({
      success: true,
      applications: formattedApplications,
    });
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
