import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth/jwt';
import prisma from '@/lib/prisma/client';

export async function GET(req: NextRequest) {
  try {
    const authResult = await verifyAuth(req);
    
    if (!authResult) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: authResult.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        panCard: true,
        employmentType: true,
        monthlyIncome: true,
        annualIncome: true,
        currentEmployer: true,
        workExperience: true,
        residenceType: true,
        city: true,
        pincode: true,
        address: true,
        dob: true,
        role: true,
        emailVerified: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (err: any) {
    console.error('Error fetching profile:', err);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authResult = await verifyAuth(req);
    
    if (!authResult) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      name,
      panCard,
      employmentType,
      monthlyIncome,
      annualIncome,
      currentEmployer,
      workExperience,
      residenceType,
      city,
      pincode,
      address,
      dob,
    } = body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (panCard) updateData.panCard = panCard;
    if (employmentType) updateData.employmentType = employmentType;
    if (monthlyIncome) updateData.monthlyIncome = parseFloat(String(monthlyIncome));
    if (annualIncome) updateData.annualIncome = parseFloat(String(annualIncome));
    if (currentEmployer) updateData.currentEmployer = currentEmployer;
    if (workExperience) updateData.workExperience = workExperience;
    if (residenceType) updateData.residenceType = residenceType;
    if (city) updateData.city = city;
    if (pincode) updateData.pincode = pincode;
    if (address) updateData.address = address;
    if (dob) updateData.dob = new Date(dob);

    const user = await prisma.user.update({
      where: { id: authResult.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        panCard: true,
        employmentType: true,
        monthlyIncome: true,
        annualIncome: true,
        currentEmployer: true,
        workExperience: true,
        residenceType: true,
        city: true,
        pincode: true,
        address: true,
        dob: true,
        role: true,
      },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (err: any) {
    console.error('Error updating profile:', err);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
