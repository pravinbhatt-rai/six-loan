import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAuth } from '@/lib/auth/jwt';

export async function PUT(
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

    // Validate application ID
    if (isNaN(applicationId) || applicationId <= 0) {
      return NextResponse.json(
        { error: 'Invalid application ID' },
        { status: 400 }
      );
    }

    // Fetch application to verify ownership
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Verify the application belongs to the requesting user
    if (application.userId !== authResult.user.id) {
      return NextResponse.json(
        { error: 'You can only withdraw your own applications' },
        { status: 403 }
      );
    }

    // Check if application can be withdrawn (allow PENDING, PROCESSING, UNDER_REVIEW, IN_PROGRESS)
    const withdrawableStatuses = ['PENDING', 'PROCESSING', 'UNDER_REVIEW', 'IN_PROGRESS'];
    if (!withdrawableStatuses.includes(application.status)) {
      return NextResponse.json(
        {
          error: `Cannot withdraw application with status: ${application.status}`,
          currentStatus: application.status,
          message: 'Only pending or in-progress applications can be withdrawn',
        },
        { status: 400 }
      );
    }

    // Update status to WITHDRAWN
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: 'WITHDRAWN',
        feedback: 'Application withdrawn by applicant',
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Application withdrawn successfully',
      application: {
        id: updatedApplication.id,
        status: updatedApplication.status,
        updatedAt: updatedApplication.updatedAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Withdraw application error:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to withdraw application' },
      { status: 500 }
    );
  }
}
