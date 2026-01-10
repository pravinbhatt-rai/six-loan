import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma/client';
import { generateReferenceNumber } from '@/lib/utils/referenceNumber';
import { sendApplicationConfirmationEmail } from '@/lib/email/emailService';
import { verifyAuth } from '@/lib/auth/jwt';

// Helper function to convert string "yes"/"no" to boolean
const convertToBoolean = (value: any): boolean | null => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lowercaseValue = value.toLowerCase();
    if (lowercaseValue === 'yes' || lowercaseValue === 'true') return true;
    if (lowercaseValue === 'no' || lowercaseValue === 'false') return false;
  }
  return null;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      panNumber,
      dob,
      employmentType,
      monthlyIncome,
      annualIncome,
      employerName,
      workExperience,
      residenceType,
      currentAddress,
      city,
      pincode,
      loanAmount,
      productId,
      productType, // 'LOAN', 'CREDIT_CARD', 'INSURANCE', 'LOAN_AGAINST_SECURITY'
      categorySlug,
      categoryName,
      loanSlug,
      cardType,
      documents,
      education,
      // Personal Loan fields
      loanPurpose,
      // Home Loan fields
      propertyAddress,
      propertyValue,
      downPayment,
      propertyType,
      constructionStatus,
      // Loan Against Property fields
      existingLoanOnProperty,
     
      // Business Loan fields
      registeredBusinessName,
      businessTypeForLoan,
      yearsInOperation,
      businessTurnover,
      businessPurpose,
      currentLoans,
      businessPan,
      gstNumber,
      industryType,
      // Education Loan fields
      studentName,
      courseName,
      universityName,
      courseDuration,
      totalCourseFees,
      parentIncome,
      admissionStatus,
      admissionSecured,
      // Vehicle Loan fields (Car/Bike - New/Used)
      vehicleMake,
      vehicleModel,
      vehicleVariant,
      exShowroomPrice,
      vehicleTenure,
      exchangeVehicle,
      registrationCity,
      vehicleUsage,
      manufactureYear,
      registrationYear,
      currentMarketValue,
      kilometersDriven,
      sellerInfo,
      rcAvailable,
      vehicleCondition,
      engineCapacity,
      engineCondition,
      applicantAge,
      // Professional Loan fields
      professionalQualification,
      yearsOfPractice,
      clinicOfficeAddress,
      professionalIncome,
      professionalPurpose,
      registrationNumber,
      // Loan Against Security fields
      securityType,
      securityValue,
      portfolioDetails,
      desiredLTV,
      dematAccountNo,
      brokerName,
      // Transfer Loan fields
      currentLender,
      outstandingAmount,
      currentInterestRate,
      remainingTenure,
      currentEMI,
      cibilScore,
      transferReason,
      // Credit Card specific fields
      hasExistingCreditCards,
      desiredCreditLimit,
      existingBankingRelationship,
      // Secured Card
      fdAmount,
      fdTenure,
      fdAccountNumber,
      // Student Card
      studentId,
      collegeName,
      courseNameForCard,
      yearOfStudy,
      parentAnnualIncome,
      // Business Card
      businessRegistrationNo,
      businessTurnoverForCard,
      businessAddressForCard,
      // Add-on Card
      primaryCardholderName,
      relationshipWithPrimary,
      addonApplicantDob,
      // NRI Card
      passportNumber,
      visaType,
      visaValidity,
      overseasAddress,
      overseasIncome,
      nreNroDetails,
      // HNI Card
      approximateNetWorth,
      majorInvestments,
    } = body;

    console.log('Received application:', { 
      email, 
      phone, 
      productType, 
      categorySlug, 
      categoryName,
      employmentType 
    });

    // Check if user is authenticated
    const authResult = await verifyAuth(req);
    let user;

    if (authResult && authResult.authenticated && authResult.user) {
      // Use authenticated user
      console.log('Using authenticated user:', authResult.user.id);
      user = await prisma.user.findUnique({
        where: { id: authResult.user.id },
      });
      
      if (!user) {
        return NextResponse.json(
          { error: 'Authenticated user not found' },
          { status: 404 }
        );
      }

      // Update user details from form
      const updateData: any = {};
      if (name && name !== user.name) updateData.name = name;
      if (email && email !== user.email) updateData.email = email;
      if (phone && phone !== user.phone) updateData.phone = phone;
      if (panNumber && panNumber !== user.panCard) updateData.panCard = panNumber;
      if (city && city !== user.city) updateData.city = city;
      if (pincode && pincode !== user.pincode) updateData.pincode = pincode;
      if (employmentType && employmentType !== user.employmentType) updateData.employmentType = employmentType;
      if (employerName) updateData.currentEmployer = employerName;
      if (workExperience) updateData.workExperience = workExperience;
      if (residenceType) updateData.residenceType = residenceType;
      if (monthlyIncome) updateData.monthlyIncome = parseFloat(String(monthlyIncome).replace(/[^0-9.]/g, ''));
      if (annualIncome) updateData.annualIncome = parseFloat(String(annualIncome).replace(/[^0-9.]/g, ''));
      if (currentAddress) updateData.address = currentAddress;
      if (dob) updateData.dob = new Date(dob);

      if (Object.keys(updateData).length > 0) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: updateData,
        });
        console.log('Updated authenticated user profile');
      }
    } else {
      // Not authenticated - find or create user by email/phone (for public forms)
      console.log('No authentication - creating/finding user by email/phone');
      user = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });
      
      if (!user) {
        // Create new user with dummy password
        const hashedPassword = await bcrypt.hash("Password@123", 10);
        user = await prisma.user.create({
          data: {
            name: name || 'User',
            email,
            phone,
            passwordHash: hashedPassword,
            panCard: panNumber,
            city,
            pincode,
            employmentType,
          },
        });
        console.log('Created new user:', user.id);
      } else {
        // Update user details
        const updateData: any = {
          name: name || user.name,
          panCard: panNumber || user.panCard,
          city: city || user.city,
          pincode: pincode || user.pincode,
          employmentType: employmentType || user.employmentType,
        };
        
        if (employerName) updateData.currentEmployer = employerName;
        if (workExperience) updateData.workExperience = workExperience;
        if (residenceType) updateData.residenceType = residenceType;
        if (monthlyIncome) updateData.monthlyIncome = parseFloat(String(monthlyIncome).replace(/[^0-9.]/g, ''));
        if (annualIncome) updateData.annualIncome = parseFloat(String(annualIncome).replace(/[^0-9.]/g, ''));
        if (currentAddress) updateData.address = currentAddress;

        user = await prisma.user.update({
          where: { id: user.id },
          data: updateData,
        });
        console.log('Updated existing user:', user.id);
      }
    }

    // 2. Get Category ID if slug provided
    let categoryId = null;
    if (categorySlug) {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug }
      });
      if (category) {
        categoryId = category.id;
      }
    }

    // 3. Create Application
    let dbProductType = productType;
    if (productType === 'LOAN_AGAINST_SECURITY') {
      dbProductType = 'LOAN';
    }

    const applicationData: any = {
      userId: user.id,
      type: dbProductType,
      status: "PENDING",
      amount: loanAmount ? parseFloat(String(loanAmount).replace(/[^0-9.]/g, '')) : 0,
      
      categoryId,
      categorySlug,
      categoryName,
      
      employmentType,
      monthlyIncome: monthlyIncome ? parseFloat(String(monthlyIncome).replace(/[^0-9.]/g, '')) : null,
      annualIncome: annualIncome ? parseFloat(String(annualIncome).replace(/[^0-9.]/g, '')) : null,
      employerName,
      workExperience: workExperience ? String(workExperience) : null,
      
      residenceType,
      currentAddress,
      city,
      pincode,
      
      phone: phone?.replace(/^\+91\s*\+91/, '+91').replace(/^\+91\s*/, '+91'),
      email,
      panNumber,
      dob: dob ? new Date(dob) : null,
      applicantName: name || user.name,
      education,
      
      notes: `Type: ${categoryName || productType}, Employer: ${employerName}, Experience: ${workExperience}, Residence: ${residenceType}, Income: ${annualIncome || monthlyIncome}`,
      documents: documents || [],
    };

    // Filter and add category-specific fields based on loan type
    const slug = (categorySlug || '').toLowerCase();
    
    if (dbProductType === 'LOAN') {
      // Personal Loan
      if (slug.includes('personal')) {
        if (loanPurpose) applicationData.loanPurpose = loanPurpose;
      }
      
      // Home Loan
      else if (slug.includes('home') || slug.includes('housing')) {
        if (propertyAddress) applicationData.propertyAddress = propertyAddress;
        if (propertyValue) applicationData.propertyValue = parseFloat(String(propertyValue).replace(/[^0-9.]/g, ''));
        if (downPayment) applicationData.downPayment = parseFloat(String(downPayment).replace(/[^0-9.]/g, ''));
        if (propertyType) applicationData.propertyType = propertyType;
        if (constructionStatus) applicationData.constructionStatus = constructionStatus;
      }
      
      // Loan Against Property
      else if (slug.includes('property') || slug.includes('lap')) {
        if (propertyAddress) applicationData.propertyAddress = propertyAddress;
        if (propertyValue) applicationData.propertyValue = parseFloat(String(propertyValue).replace(/[^0-9.]/g, ''));
        if (existingLoanOnProperty !== undefined) applicationData.existingLoanOnProperty = convertToBoolean(existingLoanOnProperty);
        if (propertyType) applicationData.propertyType = propertyType;
      }
      
      // Business Loan
      else if (slug.includes('business')) {
        if (registeredBusinessName) applicationData.registeredBusinessName = registeredBusinessName;
        if (businessTypeForLoan) applicationData.businessType = businessTypeForLoan;
        if (yearsInOperation) applicationData.yearsInOperation = parseInt(yearsInOperation);
        if (businessTurnover) applicationData.businessTurnover = parseFloat(String(businessTurnover).replace(/[^0-9.]/g, ''));
        if (businessPurpose) applicationData.businessPurpose = businessPurpose;
        if (currentLoans) applicationData.currentLoansAmount = parseFloat(String(currentLoans).replace(/[^0-9.]/g, ''));
        if (businessPan) applicationData.businessPan = businessPan;
        if (gstNumber) applicationData.gstNumber = gstNumber;
        if (industryType) applicationData.industryType = industryType;
      }
      
      // Education Loan
      else if (slug.includes('education') || slug.includes('student')) {
        if (studentName) applicationData.studentName = studentName;
        if (courseName) applicationData.courseName = courseName;
        if (universityName) applicationData.universityName = universityName;
        if (courseDuration) applicationData.courseDuration = parseInt(courseDuration);
        if (totalCourseFees) applicationData.totalCourseFees = parseFloat(String(totalCourseFees).replace(/[^0-9.]/g, ''));
        if (parentIncome) applicationData.parentIncome = parseFloat(String(parentIncome).replace(/[^0-9.]/g, ''));
        if (admissionStatus) applicationData.admissionStatus = admissionStatus;
        if (admissionSecured !== undefined) applicationData.admissionSecured = convertToBoolean(admissionSecured);
      }
      
      // Vehicle Loans (Car/Bike)
      else if (slug.includes('car') || slug.includes('bike') || slug.includes('vehicle')) {
        if (vehicleMake) applicationData.vehicleMake = vehicleMake;
        if (vehicleModel) applicationData.vehicleModel = vehicleModel;
        if (vehicleVariant) applicationData.vehicleVariant = vehicleVariant;
        if (exShowroomPrice) applicationData.exShowroomPrice = parseFloat(String(exShowroomPrice).replace(/[^0-9.]/g, ''));
        if (vehicleTenure) applicationData.vehicleTenure = vehicleTenure;
        if (exchangeVehicle !== undefined) applicationData.exchangeExisting = convertToBoolean(exchangeVehicle);
        if (registrationCity) applicationData.registrationCity = registrationCity;
        if (vehicleUsage) applicationData.vehicleUsage = vehicleUsage;
        if (manufactureYear) applicationData.manufactureYear = parseInt(manufactureYear);
        if (registrationYear) applicationData.registrationYear = parseInt(registrationYear);
        if (currentMarketValue) applicationData.currentMarketValue = parseFloat(String(currentMarketValue).replace(/[^0-9.]/g, ''));
        if (kilometersDriven) applicationData.kilometersDriven = parseInt(kilometersDriven);
        if (sellerInfo) applicationData.sellerInfo = sellerInfo;
        if (rcAvailable !== undefined) applicationData.rcAvailable = convertToBoolean(rcAvailable);
        if (vehicleCondition) applicationData.vehicleCondition = vehicleCondition;
        if (engineCapacity) applicationData.engineCapacity = engineCapacity;
        if (engineCondition) applicationData.engineCondition = engineCondition;
        if (applicantAge) applicationData.applicantAge = applicantAge;
        // Determine vehicle type from slug
        if (slug.includes('new') && slug.includes('car')) applicationData.vehicleType = 'New Car';
        else if (slug.includes('used') && slug.includes('car')) applicationData.vehicleType = 'Used Car';
        else if (slug.includes('new') && slug.includes('bike')) applicationData.vehicleType = 'New Bike';
        else if (slug.includes('used') && slug.includes('bike')) applicationData.vehicleType = 'Used Bike';
      }
      
      // Professional Loan
      else if (slug.includes('professional') || slug.includes('doctor') || slug.includes('ca')) {
        if (professionalQualification) applicationData.professionalQualification = professionalQualification;
        if (yearsOfPractice) applicationData.yearsOfPractice = parseInt(yearsOfPractice);
        if (clinicOfficeAddress) applicationData.clinicOfficeAddress = clinicOfficeAddress;
        if (professionalIncome) applicationData.professionalIncome = parseFloat(String(professionalIncome).replace(/[^0-9.]/g, ''));
        if (professionalPurpose) applicationData.professionalPurpose = professionalPurpose;
        if (registrationNumber) applicationData.registrationNumber = registrationNumber;
      }
      
      // Loan Against Security
      else if (productType === 'LOAN_AGAINST_SECURITY' || slug.includes('security')) {
        if (securityType) applicationData.securityType = securityType;
        if (securityValue) applicationData.securityValue = parseFloat(String(securityValue).replace(/[^0-9.]/g, ''));
        if (portfolioDetails) applicationData.portfolioDetails = portfolioDetails;
        if (desiredLTV) applicationData.desiredLTV = parseFloat(desiredLTV);
        if (dematAccountNo) applicationData.dematAccountNo = dematAccountNo;
        if (brokerName) applicationData.brokerName = brokerName;
      }
      
      // Transfer Loan
      else if (slug.includes('transfer') || slug.includes('balance-transfer')) {
        if (currentLender) applicationData.currentLenderName = currentLender;
        if (outstandingAmount) applicationData.outstandingAmount = parseFloat(String(outstandingAmount).replace(/[^0-9.]/g, ''));
        if (currentInterestRate) applicationData.currentInterestRate = parseFloat(currentInterestRate);
        if (remainingTenure) applicationData.remainingTenure = parseInt(remainingTenure);
        if (currentEMI) applicationData.currentEMI = parseFloat(String(currentEMI).replace(/[^0-9.]/g, ''));
        if (cibilScore) applicationData.cibilScore = parseInt(cibilScore);
        if (transferReason) applicationData.transferReason = transferReason;
      }
    }

    // Add credit card specific fields - filter by card type
    if (dbProductType === 'CREDIT_CARD') {
      // Common card fields for all types
      applicationData.cardType = cardType;
      applicationData.hasExistingCreditCards = hasExistingCreditCards;
      applicationData.desiredCreditLimit = desiredCreditLimit ? parseFloat(String(desiredCreditLimit)) : null;
      applicationData.existingBankingRelationship = existingBankingRelationship;
      applicationData.cibilScore = cibilScore ? parseInt(String(cibilScore)) : null;
      
      // Add card type specific fields
      const cardTypeValue = (cardType || '').toLowerCase();
      
      // Secured Card
      if (cardTypeValue === 'secured') {
        if (fdAmount) applicationData.fdAmount = parseFloat(String(fdAmount));
        if (fdTenure) applicationData.fdTenure = parseInt(String(fdTenure));
        if (fdAccountNumber) applicationData.fdAccountNumber = fdAccountNumber;
      }
      
      // Student Card
      else if (cardTypeValue === 'student') {
        if (studentId) applicationData.studentId = studentId;
        if (collegeName) applicationData.collegeName = collegeName;
        if (courseNameForCard) applicationData.courseNameForCard = courseNameForCard;
        if (yearOfStudy) applicationData.yearOfStudy = yearOfStudy;
        if (parentAnnualIncome) applicationData.parentAnnualIncome = parseFloat(String(parentAnnualIncome));
      }
      
      // Business Card
      else if (cardTypeValue === 'business') {
        if (businessRegistrationNo) applicationData.businessRegistrationNo = businessRegistrationNo;
        if (businessTurnoverForCard) applicationData.businessTurnoverForCard = parseFloat(String(businessTurnoverForCard));
        if (businessAddressForCard) applicationData.businessAddressForCard = businessAddressForCard;
        if (businessPan) applicationData.businessPan = businessPan;
      }
      
      // Add-on Card
      else if (cardTypeValue === 'addon') {
        if (primaryCardholderName) applicationData.primaryCardholderName = primaryCardholderName;
        if (relationshipWithPrimary) applicationData.relationshipWithPrimary = relationshipWithPrimary;
        if (addonApplicantDob) applicationData.addonApplicantDob = addonApplicantDob;
      }
      
      // NRI Card
      else if (cardTypeValue === 'nri') {
        if (passportNumber) applicationData.passportNumber = passportNumber;
        if (visaType) applicationData.visaType = visaType;
        if (visaValidity) applicationData.visaValidity = new Date(visaValidity);
        if (overseasAddress) applicationData.overseasAddress = overseasAddress;
        if (overseasIncome) applicationData.overseasIncome = parseFloat(String(overseasIncome));
        if (nreNroDetails) applicationData.nreNroDetails = nreNroDetails;
      }
      
      // HNI Card
      else if (cardTypeValue === 'hni') {
        if (approximateNetWorth) applicationData.approximateNetWorth = parseFloat(String(approximateNetWorth));
        if (majorInvestments) applicationData.majorInvestments = majorInvestments;
      }
      
      // Standard and Premium cards don't have additional specific fields
    }

    if (dbProductType === 'LOAN' && productId) {
      applicationData.loanId = Number(productId);
    }
    if (dbProductType === 'CREDIT_CARD' && productId) {
      applicationData.cardId = Number(productId);
    }
    if (dbProductType === 'INSURANCE' && productId) {
      applicationData.insuranceId = Number(productId);
    }

    const application = await prisma.application.create({
      data: applicationData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        loan: {
          select: {
            id: true,
            bankName: true,
            slug: true
          }
        }
      }
    });

    console.log('Application created:', application.id);

    // Generate reference number
    const referenceNo = generateReferenceNumber(
      application.id,
      dbProductType,
      categorySlug,
      dbProductType === 'CREDIT_CARD' ? cardType : undefined
    );

    // Update application with reference number
    await prisma.application.update({
      where: { id: application.id },
      data: { referenceNo }
    });

    // Send confirmation email (non-blocking)
    const productDisplayName = categoryName || 
      (application.loan?.bankName ? `${application.loan.bankName} Loan` : productType.replace('_', ' '));
    
    sendApplicationConfirmationEmail(
      application.user.email,
      application.user.name,
      referenceNo,
      productDisplayName,
      application.amount ?? undefined
    ).catch((err) => {
      console.error("[Application Email] Failed:", err);
    });

    return NextResponse.json({ 
      success: true, 
      application: {
        id: application.id,
        type: application.type,
        categoryName: categoryName || null,
        status: application.status,
        amount: application.amount,
        referenceNo
      },
      referenceNo
    });
  } catch (err: any) {
    console.error("Application Error:", err);
    return NextResponse.json(
      { error: "Failed to submit application", details: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const applications = await prisma.application.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        loan: {
          select: {
            id: true,
            bankName: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(applications);
  } catch (err: any) {
    console.error("Error fetching applications:", err);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
