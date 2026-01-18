import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH - Update eligibility inquiry status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    if (!status || !['pending', 'reviewed', 'approved', 'rejected', 'contacted'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Valid status is required (pending, reviewed, approved, rejected, contacted)' },
        { status: 400 }
      );
    }

    const updateData: any = { status };
    if (notes) updateData.notes = notes;

    const updatedInquiry = await prisma.eligibilityInquiry.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      data: updatedInquiry,
    });
  } catch (error: any) {
    console.error('Error updating eligibility inquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update inquiry', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete an eligibility inquiry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.eligibilityInquiry.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting eligibility inquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete inquiry', error: error.message },
      { status: 500 }
    );
  }
}
