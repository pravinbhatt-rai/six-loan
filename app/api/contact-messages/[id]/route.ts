import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH - Update contact message status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
        const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['unread', 'read', 'responded', 'archived'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Valid status is required (unread, read, responded, archived)' },
        { status: 400 }
      );
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      data: updatedMessage,
    });
  } catch (error: any) {
    console.error('Error updating contact message:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update message', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a contact message
export async function DELETE(
  request: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.contactMessage.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete message', error: error.message },
      { status: 500 }
    );
  }
}
