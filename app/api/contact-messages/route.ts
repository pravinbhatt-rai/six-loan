import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Create a new contact message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, subject } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create contact message in database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || 'General Inquiry',
        message,
        status: 'unread',
        createdAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: contactMessage,
    });
  } catch (error: any) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message', error: error.message },
      { status: 500 }
    );
  }
}

// GET - Retrieve all contact messages (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.contactMessage.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: messages,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error: any) {
    console.error('Error fetching contact messages:', error);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch messages', error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
