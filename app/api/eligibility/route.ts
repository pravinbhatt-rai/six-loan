import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Create new eligibility inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received eligibility inquiry payload:', body);
    
    const {
      name,
      email,
      phone,
      panCard,
      dateOfBirth,
      employment,
      monthlyIncome,
      city,
      creditScore,
      userId
    } = body;

    // Validation
    if (!name || !email || !phone || !panCard) {
      return NextResponse.json(
        { success: false, message: 'Name, email, phone, and PAN card are required' },
        { status: 400 }
      );
    }

    // Validate PAN card format (ABCDE1234F)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panCard.toUpperCase())) {
      return NextResponse.json(
        { success: false, message: 'Invalid PAN card format. Format: ABCDE1234F' },
        { status: 400 }
      );
    }

    // Calculate eligibility score
    const eligibilityScore = calculateEligibility({
      monthlyIncome: parseFloat(monthlyIncome) || 0,
      creditScore: parseInt(creditScore) || 0,
      employment
    });

    // Prepare data for database
    const createData: any = {
      name,
      email,
      phone,
      panCard: panCard.toUpperCase(),
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      employment: employment || 'salaried',
      monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome) : null,
      city: city || null,
      creditScore: creditScore ? parseInt(creditScore) : null,
      eligibilityScore,
      status: 'pending',
      notes: '',
    };

    // Only add userId if it's a valid number
    if (userId && !isNaN(parseInt(userId))) {
      createData.userId = parseInt(userId);
    }

    console.log('Creating inquiry with data:', createData);

    // Create eligibility inquiry
    const inquiry = await prisma.eligibilityInquiry.create({
      data: createData,
    });

    return NextResponse.json({
      success: true,
      message: 'Eligibility inquiry submitted successfully',
      data: {
        id: inquiry.id,
        eligibilityScore,
        eligible: eligibilityScore >= 60,
        recommendation: getRecommendation(eligibilityScore)
      },
    });
  } catch (error: any) {
    console.error('Error creating eligibility inquiry:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error code:', error.code);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit inquiry', 
        error: error.message,
        code: error.code,
        details: error.meta
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve all eligibility inquiries (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    if (status) where.status = status;
    if (userId) where.userId = parseInt(userId);

    const [inquiries, total] = await Promise.all([
      prisma.eligibilityInquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          }
        }
      }),
      prisma.eligibilityInquiry.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: inquiries,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error: any) {
    console.error('Error fetching eligibility inquiries:', error);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch inquiries', error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}

// Helper function to calculate eligibility score
function calculateEligibility(data: {
  monthlyIncome: number;
  creditScore: number;
  employment: string;
}): number {
  let score = 0;

  // Income score (0-40 points)
  if (data.monthlyIncome >= 100000) score += 40;
  else if (data.monthlyIncome >= 50000) score += 30;
  else if (data.monthlyIncome >= 30000) score += 20;
  else if (data.monthlyIncome >= 15000) score += 10;

  // Credit score (0-40 points)
  if (data.creditScore >= 800) score += 40;
  else if (data.creditScore >= 750) score += 35;
  else if (data.creditScore >= 700) score += 25;
  else if (data.creditScore >= 650) score += 15;
  else if (data.creditScore >= 600) score += 5;

  // Employment type (0-20 points)
  if (data.employment === 'salaried') score += 20;
  else if (data.employment === 'self-employed') score += 15;
  else score += 10;

  return Math.min(score, 100);
}

// Helper function to get recommendation
function getRecommendation(score: number): string {
  if (score >= 80) return 'Excellent! You qualify for premium credit cards with high limits.';
  if (score >= 70) return 'Good! You qualify for most credit cards with decent limits.';
  if (score >= 60) return 'Fair. You may qualify for entry-level and mid-tier credit cards.';
  if (score >= 40) return 'Limited eligibility. Consider secured credit cards or improving your credit score.';
  return 'Low eligibility. Focus on building credit history with secured cards.';
}
