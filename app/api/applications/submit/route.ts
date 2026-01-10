import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyToken } from '@/lib/auth/jwt';

/**
 * POST /api/applications/submit
 * Submit a new application with employment data in a single transaction
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyToken(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = authResult.userId;
    const body = await request.json();

    const {
      // Product Info
      type, // "LOAN", "CREDIT_CARD", "INSURANCE"
      productId, // Loan/Card/Insurance ID
      categoryId,
      categoryName,
      categorySlug,
      amount,
      tenure,
      
      // Applicant Details
      applicantName,
      email,
      phone,
      panNumber,
      dob,
      currentAddress,
      city,
      state,
      pincode,
      residenceType,
      
      // Employment Data (will be upserted)
      employment,
      
      // Product-Specific Details (JSON)
      productDetails,
      
      // Documents
      documents,
    } = body;

    // Validate required fields
    if (!type || !applicantName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate reference number
    const typeCode = type === 'LOAN' ? 'L' : type === 'CREDIT_CARD' ? 'C' : 'I';
    const categoryCode = categorySlug?.substring(0, 2).toUpperCase() || 'XX';
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const referenceNo = `SIX-${typeCode}-${categoryCode}-${randomCode}`;

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // 1. Upsert Employment Data (if provided)
      if (employment) {
        await tx.employment.upsert({
          where: { userId },
          create: {
            userId,
            fullName: employment.fullName || applicantName,
            panCard: employment.panCard || panNumber,
            dob: employment.dob ? new Date(employment.dob) : (dob ? new Date(dob) : new Date()),
            email: employment.email || email,
            phone: employment.phone || phone,
            employmentType: employment.employmentType,
            annualIncome: parseFloat(employment.annualIncome) || 0,
            monthlyIncome: employment.monthlyIncome ? parseFloat(employment.monthlyIncome) : null,
            currentEmployer: employment.currentEmployer || null,
            designation: employment.designation || null,
            workExperience: employment.workExperience || null,
            businessName: employment.businessName || null,
            businessType: employment.businessType || null,
            yearsInBusiness: employment.yearsInBusiness ? parseInt(employment.yearsInBusiness) : null,
            businessTurnover: employment.businessTurnover ? parseFloat(employment.businessTurnover) : null,
            industryType: employment.industryType || null,
            professionalQualification: employment.professionalQualification || null,
            registrationNumber: employment.registrationNumber || null,
            yearsOfPractice: employment.yearsOfPractice ? parseInt(employment.yearsOfPractice) : null,
            highestEducation: employment.highestEducation || null,
            documents: employment.documents || null,
          },
          update: {
            fullName: employment.fullName || applicantName,
            panCard: employment.panCard || panNumber,
            employmentType: employment.employmentType,
            annualIncome: parseFloat(employment.annualIncome) || 0,
            monthlyIncome: employment.monthlyIncome ? parseFloat(employment.monthlyIncome) : null,
            currentEmployer: employment.currentEmployer || null,
            designation: employment.designation || null,
            workExperience: employment.workExperience || null,
            businessName: employment.businessName || null,
            businessType: employment.businessType || null,
            yearsInBusiness: employment.yearsInBusiness ? parseInt(employment.yearsInBusiness) : null,
            businessTurnover: employment.businessTurnover ? parseFloat(employment.businessTurnover) : null,
            industryType: employment.industryType || null,
            professionalQualification: employment.professionalQualification || null,
            registrationNumber: employment.registrationNumber || null,
            yearsOfPractice: employment.yearsOfPractice ? parseInt(employment.yearsOfPractice) : null,
            highestEducation: employment.highestEducation || null,
            updatedAt: new Date(),
          },
        });
      }

      // 2. Create Application
      const applicationData: any = {
        userId,
        referenceNo,
        type,
        categoryId: categoryId || null,
        categoryName: categoryName || null,
        categorySlug: categorySlug || null,
        status: 'PENDING',
        amount: amount ? parseFloat(amount) : null,
        
        // Applicant Details
        applicantName,
        email,
        phone,
        panNumber: panNumber || null,
        dob: dob ? new Date(dob) : null,
        currentAddress: currentAddress || null,
        city: city || null,
        state: state || null,
        pincode: pincode || null,
        residenceType: residenceType || null,
        
        // Employment Summary (snapshot)
        employmentType: employment?.employmentType || null,
        annualIncome: employment?.annualIncome ? parseFloat(employment.annualIncome) : null,
        monthlyIncome: employment?.monthlyIncome ? parseFloat(employment.monthlyIncome) : null,
        employerName: employment?.currentEmployer || employment?.businessName || null,
        workExperience: employment?.workExperience || null,
        
        // Product-Specific Details (JSON)
        productDetails: productDetails || null,
        
        // Documents
        documents: documents || null,
        
        // Tenure
        desiredTenure: tenure ? parseInt(tenure) : null,
      };

      // Link to product
      if (type === 'LOAN' && productId) {
        applicationData.loanId = parseInt(productId);
      } else if (type === 'CREDIT_CARD' && productId) {
        applicationData.cardId = parseInt(productId);
      } else if (type === 'INSURANCE' && productId) {
        applicationData.insuranceId = parseInt(productId);
      }

      const application = await tx.application.create({
        data: applicationData,
        include: {
          user: {
            select: {
              name: true,
              email: true,
              phone: true,
              employment: true,
            },
          },
          loan: { select: { title: true, bankName: true } },
          card: { select: { name: true, bankName: true } },
          insurance: { select: { name: true, provider: true } },
        },
      });

      return application;
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      referenceNo: result.referenceNo,
      application: result,
    });
  } catch (error: any) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit application', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}
