import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAuth } from '@/lib/auth/jwt';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult || !authResult.authenticated || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const applicationId = Number(id);

    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
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
            interestRateText: true,
            processTimeLabel: true,
          },
        },
        card: {
          select: {
            id: true,
            name: true,
            bankName: true,
            bankLogoUrl: true,
            annualFee: true,
            cardNetwork: true,
          },
        },
        insurance: {
          select: {
            id: true,
            name: true,
            provider: true,
            logoUrl: true,
            minPremium: true,
            coverage: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Format application
    const formattedApplication = {
      id: application.id,
      type: application.type,
      status: application.status,
      amount: application.amount,
      categoryName: application.categoryName,
      employmentType: application.employmentType,
      monthlyIncome: application.monthlyIncome,
      employerName: application.employerName,
      workExperience: application.workExperience,
      residenceType: application.residenceType,
      city: application.city,
      pincode: application.pincode,
      phone: application.phone,
      email: application.email,
      panNumber: application.panNumber,
      applicantName: application.applicantName,
      notes: application.notes,
      feedback: application.feedback,
      documents: application.documents || [],
      createdAt: application.createdAt.toISOString(),
      updatedAt: application.updatedAt.toISOString(),
      referenceNo: `REF${application.id.toString().padStart(8, '0')}`,

      product:
        application.type === 'LOAN'
          ? application.loan
          : application.type === 'CREDIT_CARD'
          ? application.card
          : application.type === 'INSURANCE'
          ? application.insurance
          : null,
    };

    return NextResponse.json({
      success: true,
      application: formattedApplication,
    });
  } catch (error) {
    console.error('Get application error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}
