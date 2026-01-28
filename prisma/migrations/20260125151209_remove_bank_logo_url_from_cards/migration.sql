-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('LOAN', 'CREDIT_CARD', 'DEBIT_CARD', 'INSURANCE', 'APP');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'PROCESSING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'IN_PROGRESS', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "LoanCategoryType" AS ENUM ('PERSONAL', 'BUSINESS', 'HOME', 'VEHICLE', 'EDUCATION', 'OTHER');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "ContactMessageStatus" AS ENUM ('unread', 'read', 'responded', 'archived');

-- CreateEnum
CREATE TYPE "EligibilityStatus" AS ENUM ('pending', 'reviewed', 'approved', 'rejected', 'contacted');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "otpVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailOtp" TEXT,
    "emailOtpExpiry" TIMESTAMP(3),
    "emailVerifiedAt" TIMESTAMP(3),
    "panCard" TEXT,
    "dob" TIMESTAMP(3),
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "highestEducation" TEXT,
    "employmentType" TEXT,
    "currentEmployer" TEXT,
    "annualIncome" DOUBLE PRECISION,
    "monthlyIncome" DOUBLE PRECISION,
    "workExperience" TEXT,
    "yearsInBusiness" INTEGER,
    "professionalQualification" TEXT,
    "professionRegistrationNo" TEXT,
    "businessName" TEXT,
    "businessType" TEXT,
    "businessPan" TEXT,
    "gstNumber" TEXT,
    "industryType" TEXT,
    "businessTurnover" DOUBLE PRECISION,
    "yearsInOperation" INTEGER,
    "cibilScore" INTEGER,
    "existingLoans" JSONB,
    "existingCards" JSONB,
    "ownedProperties" JSONB,
    "documents" JSONB,
    "residenceType" TEXT,
    "yearsAtAddress" INTEGER,
    "bankName" TEXT,
    "accountNumber" TEXT,
    "ifscCode" TEXT,
    "dematAccountNo" TEXT,
    "brokerName" TEXT,
    "isNRI" BOOLEAN NOT NULL DEFAULT false,
    "passportNumber" TEXT,
    "visaType" TEXT,
    "visaValidity" TIMESTAMP(3),
    "overseasAddress" TEXT,
    "overseasIncome" DOUBLE PRECISION,
    "nreNroAccount" TEXT,
    "approximateNetWorth" DOUBLE PRECISION,
    "majorInvestments" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "panCard" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "annualIncome" DOUBLE PRECISION NOT NULL,
    "monthlyIncome" DOUBLE PRECISION,
    "currentEmployer" TEXT,
    "designation" TEXT,
    "workExperience" TEXT,
    "businessName" TEXT,
    "businessType" TEXT,
    "yearsInBusiness" INTEGER,
    "businessTurnover" DOUBLE PRECISION,
    "industryType" TEXT,
    "professionalQualification" TEXT,
    "registrationNumber" TEXT,
    "yearsOfPractice" INTEGER,
    "highestEducation" TEXT,
    "documents" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "referenceNo" TEXT,
    "userId" INTEGER NOT NULL,
    "type" "ProductType" NOT NULL,
    "loanId" INTEGER,
    "cardId" INTEGER,
    "debitCardId" INTEGER,
    "insuranceId" INTEGER,
    "categoryId" INTEGER,
    "categorySlug" TEXT,
    "categoryName" TEXT,
    "loanSlug" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "amount" DOUBLE PRECISION,
    "notes" TEXT,
    "productDetails" JSONB,
    "applicantName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "panNumber" TEXT,
    "dob" TIMESTAMP(3),
    "employmentType" TEXT,
    "annualIncome" DOUBLE PRECISION,
    "monthlyIncome" DOUBLE PRECISION,
    "employerName" TEXT,
    "workExperience" TEXT,
    "residenceType" TEXT,
    "currentAddress" TEXT,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "education" TEXT,
    "loanPurpose" TEXT,
    "propertyAddress" TEXT,
    "propertyType" TEXT,
    "constructionStatus" TEXT,
    "propertyValue" DOUBLE PRECISION,
    "downPayment" DOUBLE PRECISION,
    "existingLoanOnProperty" BOOLEAN,
    "registeredBusinessName" TEXT,
    "businessType" TEXT,
    "yearsInOperation" INTEGER,
    "businessTurnover" DOUBLE PRECISION,
    "businessPurpose" TEXT,
    "currentLoansAmount" DOUBLE PRECISION,
    "businessPan" TEXT,
    "gstNumber" TEXT,
    "industryType" TEXT,
    "studentName" TEXT,
    "courseName" TEXT,
    "universityName" TEXT,
    "courseDuration" INTEGER,
    "totalCourseFees" DOUBLE PRECISION,
    "parentIncome" DOUBLE PRECISION,
    "admissionStatus" TEXT,
    "admissionSecured" BOOLEAN,
    "vehicleMake" TEXT,
    "vehicleModel" TEXT,
    "vehicleVariant" TEXT,
    "exShowroomPrice" DOUBLE PRECISION,
    "vehicleType" TEXT,
    "vehicleUsage" TEXT,
    "manufactureYear" INTEGER,
    "registrationYear" INTEGER,
    "currentMarketValue" DOUBLE PRECISION,
    "kilometersDriven" INTEGER,
    "engineCapacity" TEXT,
    "engineCondition" TEXT,
    "exchangeExisting" BOOLEAN,
    "registrationCity" TEXT,
    "rcAvailable" BOOLEAN,
    "sellerInfo" TEXT,
    "vehicleCondition" TEXT,
    "professionalQualification" TEXT,
    "yearsOfPractice" INTEGER,
    "clinicOfficeAddress" TEXT,
    "professionalIncome" DOUBLE PRECISION,
    "professionalPurpose" TEXT,
    "registrationNumber" TEXT,
    "securityType" TEXT,
    "securityValue" DOUBLE PRECISION,
    "portfolioDetails" JSONB,
    "desiredLTV" DOUBLE PRECISION,
    "dematAccountNo" TEXT,
    "brokerName" TEXT,
    "currentLenderName" TEXT,
    "outstandingAmount" DOUBLE PRECISION,
    "currentInterestRate" DOUBLE PRECISION,
    "remainingTenure" INTEGER,
    "currentEMI" DOUBLE PRECISION,
    "cibilScore" INTEGER,
    "transferReason" TEXT,
    "desiredCreditLimit" DOUBLE PRECISION,
    "hasExistingCreditCards" BOOLEAN,
    "existingBankingRelationship" BOOLEAN,
    "existingCreditCards" JSONB,
    "cardType" TEXT,
    "studentId" TEXT,
    "collegeUniversityName" TEXT,
    "courseNameForCard" TEXT,
    "collegeName" TEXT,
    "yearOfStudy" TEXT,
    "parentAnnualIncome" DOUBLE PRECISION,
    "fixedDepositAmount" DOUBLE PRECISION,
    "fdAmount" DOUBLE PRECISION,
    "fdTenure" INTEGER,
    "fdAccountNumber" TEXT,
    "primaryCardholderName" TEXT,
    "relationshipWithPrimary" TEXT,
    "addonApplicantDob" TEXT,
    "businessRegistrationNumber" TEXT,
    "businessRegistrationNo" TEXT,
    "businessTurnoverForCard" DOUBLE PRECISION,
    "businessAddressForCard" TEXT,
    "passportNumber" TEXT,
    "visaType" TEXT,
    "visaValidity" TIMESTAMP(3),
    "overseasAddress" TEXT,
    "overseasIncome" DOUBLE PRECISION,
    "nreNroDetails" TEXT,
    "nreNroAccountDetails" TEXT,
    "approximateNetWorth" DOUBLE PRECISION,
    "majorInvestments" JSONB,
    "desiredTenure" INTEGER,
    "documents" JSONB,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "type" "ProductType" NOT NULL,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceProduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sumInsured" TEXT,
    "minPremium" DOUBLE PRECISION,
    "maxPremium" DOUBLE PRECISION,
    "premiumFrequency" TEXT,
    "policyTerm" TEXT,
    "coverageType" TEXT,
    "coverage" TEXT,
    "inclusions" TEXT,
    "keyFeatures" TEXT,
    "exclusions" TEXT,
    "waitingPeriod" TEXT,
    "roomRentLimit" TEXT,
    "coPayment" TEXT,
    "subLimits" TEXT,
    "claimSettlementRatio" DOUBLE PRECISION,
    "cashlessHospitals" INTEGER,
    "claimProcessTime" TEXT,
    "claimDocuments" TEXT,
    "noClaimBonus" BOOLEAN NOT NULL DEFAULT false,
    "noClaimBonusDetails" TEXT,
    "renewalBenefits" TEXT,
    "taxBenefits" BOOLEAN NOT NULL DEFAULT true,
    "portability" BOOLEAN NOT NULL DEFAULT false,
    "freeHealthCheckup" BOOLEAN NOT NULL DEFAULT false,
    "entryAgeMin" INTEGER,
    "entryAgeMax" INTEGER,
    "maxRenewalAge" INTEGER,
    "preExistingCoverage" BOOLEAN NOT NULL DEFAULT false,
    "medicalTestRequired" BOOLEAN NOT NULL DEFAULT false,
    "customerCareNumber" TEXT,
    "websiteUrl" TEXT,
    "applicationUrl" TEXT,
    "claimNumber" TEXT,
    "irdaiRegNumber" TEXT,
    "termsConditionsUrl" TEXT,
    "prospectusUrl" TEXT,
    "coolingOffPeriod" INTEGER,
    "freeLookPeriod" INTEGER,
    "categoryId" INTEGER,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InsuranceProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanProduct" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "bankLogoUrl" TEXT NOT NULL,
    "tag" TEXT,
    "feature" TEXT,
    "specialization" TEXT,
    "processTimeLabel" TEXT NOT NULL,
    "processTimeValue" TEXT NOT NULL,
    "chanceOfApproval" TEXT NOT NULL,
    "approvalScore" INTEGER NOT NULL DEFAULT 0,
    "interestRateText" TEXT NOT NULL,
    "aprText" TEXT NOT NULL,
    "emiAmount" TEXT NOT NULL,
    "emiValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "processTypeLabel" TEXT NOT NULL,
    "processTypeValue" TEXT NOT NULL,
    "disbursalTimeHours" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "kfsUrl" TEXT,
    "productType" "ProductType" NOT NULL DEFAULT 'LOAN',
    "categoryId" INTEGER,
    "loanType" TEXT,
    "loanSubType" TEXT,
    "amountRange" TEXT,
    "eligibleFor" TEXT,
    "loanPurpose" TEXT,
    "scheme" TEXT,
    "vehicleType" TEXT,
    "keyStatement" TEXT,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoanProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanBullet" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "LoanBullet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanSummaryCharge" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "mainText" TEXT NOT NULL,
    "subText" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "LoanSummaryCharge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanRequiredDocument" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "LoanRequiredDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanProcessStep" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "LoanProcessStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanFooterItem" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "LoanFooterItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanOffer" (
    "id" SERIAL NOT NULL,
    "merchant" TEXT NOT NULL,
    "offerType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "offerValue" TEXT NOT NULL,
    "validFrom" TIMESTAMP(3),
    "validTill" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "LoanOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardProduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT,
    "annualFee" TEXT NOT NULL,
    "cardNetwork" TEXT NOT NULL,
    "cardType" TEXT,
    "bestSuitedFor" TEXT,
    "effectiveFree" BOOLEAN NOT NULL DEFAULT false,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "videoUrl" TEXT,
    "termsConditionsUrl" TEXT,
    "firstYearFee" TEXT,
    "secondYearFee" TEXT,
    "feeWaiverCondition" TEXT,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditCardProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardBestSuitedFor" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CreditCardBestSuitedFor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardSummaryCharge" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "mainText" TEXT NOT NULL,
    "subText" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CreditCardSummaryCharge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardRequiredDocument" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CreditCardRequiredDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardProcessStep" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CreditCardProcessStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppProduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "downloadUrl" TEXT NOT NULL,
    "logoUrl" TEXT,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardBullet" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CreditCardBullet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardKeyFeature" (
    "id" SERIAL NOT NULL,
    "feature" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CreditCardKeyFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardBenefit" (
    "id" SERIAL NOT NULL,
    "benefit" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CreditCardBenefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardSpecialOffer" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CreditCardSpecialOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardOffer" (
    "id" SERIAL NOT NULL,
    "merchant" TEXT NOT NULL,
    "offerType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "offerValue" TEXT NOT NULL,
    "validFrom" TIMESTAMP(3),
    "validTill" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CreditCardOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardBenefitSection" (
    "id" SERIAL NOT NULL,
    "heading" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "CreditCardBenefitSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCardBenefitSubPoint" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "CreditCardBenefitSubPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceCoverageDetail" (
    "id" SERIAL NOT NULL,
    "coverageType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "limit" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "InsuranceCoverageDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceExclusion" (
    "id" SERIAL NOT NULL,
    "exclusionType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "InsuranceExclusion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceClaimStep" (
    "id" SERIAL NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "InsuranceClaimStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceNetworkHospital" (
    "id" SERIAL NOT NULL,
    "hospitalName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "type" TEXT,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "InsuranceNetworkHospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceEligibility" (
    "id" SERIAL NOT NULL,
    "criterion" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "InsuranceEligibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL DEFAULT 'General Inquiry',
    "message" TEXT NOT NULL,
    "status" "ContactMessageStatus" NOT NULL DEFAULT 'unread',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityInquiry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "panCard" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "employment" TEXT NOT NULL DEFAULT 'salaried',
    "monthlyIncome" DOUBLE PRECISION,
    "city" TEXT,
    "creditScore" INTEGER,
    "eligibilityScore" INTEGER NOT NULL DEFAULT 0,
    "status" "EligibilityStatus" NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EligibilityInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebitCardProduct" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "accountType" TEXT,
    "cardNetwork" TEXT NOT NULL,
    "cardType" TEXT,
    "annualFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "issuanceFee" DOUBLE PRECISION,
    "replacementFee" DOUBLE PRECISION,
    "atmWithdrawalLimit" DOUBLE PRECISION,
    "posLimit" DOUBLE PRECISION,
    "onlineLimit" DOUBLE PRECISION,
    "internationalUsage" BOOLEAN NOT NULL DEFAULT false,
    "contactless" BOOLEAN NOT NULL DEFAULT false,
    "loungeAccess" BOOLEAN NOT NULL DEFAULT false,
    "loungeAccessDetails" TEXT,
    "cashbackRate" DOUBLE PRECISION,
    "rewardPoints" BOOLEAN NOT NULL DEFAULT false,
    "fuelSurcharge" BOOLEAN NOT NULL DEFAULT false,
    "accidentInsurance" BOOLEAN NOT NULL DEFAULT false,
    "purchaseProtection" BOOLEAN NOT NULL DEFAULT false,
    "fraudProtection" BOOLEAN NOT NULL DEFAULT true,
    "zeroBilling" BOOLEAN NOT NULL DEFAULT true,
    "minimumBalance" DOUBLE PRECISION,
    "minimumAge" INTEGER DEFAULT 18,
    "maximumAge" INTEGER,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "bestFor" TEXT,
    "keyStatement" TEXT,
    "videoUrl" TEXT,
    "termsConditionsUrl" TEXT,
    "applyUrl" TEXT,
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DebitCardProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebitCardBullet" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "DebitCardBullet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebitCardKeyFeature" (
    "id" SERIAL NOT NULL,
    "icon" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "DebitCardKeyFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebitCardOffer" (
    "id" SERIAL NOT NULL,
    "merchant" TEXT NOT NULL,
    "offerType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "offerValue" TEXT NOT NULL,
    "validFrom" TIMESTAMP(3),
    "validTill" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "DebitCardOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebitCardSafetyFeature" (
    "id" SERIAL NOT NULL,
    "featureName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "howToUse" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "DebitCardSafetyFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CardCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CardCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DebitCardCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DebitCardCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Employment_userId_key" ON "Employment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_referenceNo_key" ON "Application"("referenceNo");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceProduct_slug_key" ON "InsuranceProduct"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LoanProduct_slug_key" ON "LoanProduct"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CreditCardProduct_slug_key" ON "CreditCardProduct"("slug");

-- CreateIndex
CREATE INDEX "ContactMessage_status_idx" ON "ContactMessage"("status");

-- CreateIndex
CREATE INDEX "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");

-- CreateIndex
CREATE INDEX "EligibilityInquiry_status_idx" ON "EligibilityInquiry"("status");

-- CreateIndex
CREATE INDEX "EligibilityInquiry_userId_idx" ON "EligibilityInquiry"("userId");

-- CreateIndex
CREATE INDEX "EligibilityInquiry_createdAt_idx" ON "EligibilityInquiry"("createdAt");

-- CreateIndex
CREATE INDEX "EligibilityInquiry_panCard_idx" ON "EligibilityInquiry"("panCard");

-- CreateIndex
CREATE UNIQUE INDEX "DebitCardProduct_slug_key" ON "DebitCardProduct"("slug");

-- CreateIndex
CREATE INDEX "_CardCategories_B_index" ON "_CardCategories"("B");

-- CreateIndex
CREATE INDEX "_DebitCardCategories_B_index" ON "_DebitCardCategories"("B");

-- AddForeignKey
ALTER TABLE "Employment" ADD CONSTRAINT "Employment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "LoanProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CreditCardProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_debitCardId_fkey" FOREIGN KEY ("debitCardId") REFERENCES "DebitCardProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "InsuranceProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceProduct" ADD CONSTRAINT "InsuranceProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceProduct" ADD CONSTRAINT "InsuranceProduct_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanProduct" ADD CONSTRAINT "LoanProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanProduct" ADD CONSTRAINT "LoanProduct_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanBullet" ADD CONSTRAINT "LoanBullet_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LoanProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanSummaryCharge" ADD CONSTRAINT "LoanSummaryCharge_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LoanProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanRequiredDocument" ADD CONSTRAINT "LoanRequiredDocument_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LoanProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanProcessStep" ADD CONSTRAINT "LoanProcessStep_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LoanProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanFooterItem" ADD CONSTRAINT "LoanFooterItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LoanProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanOffer" ADD CONSTRAINT "LoanOffer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LoanProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardProduct" ADD CONSTRAINT "CreditCardProduct_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardBestSuitedFor" ADD CONSTRAINT "CreditCardBestSuitedFor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CreditCardProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardSummaryCharge" ADD CONSTRAINT "CreditCardSummaryCharge_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CreditCardProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardRequiredDocument" ADD CONSTRAINT "CreditCardRequiredDocument_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CreditCardProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardProcessStep" ADD CONSTRAINT "CreditCardProcessStep_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CreditCardProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppProduct" ADD CONSTRAINT "AppProduct_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardBullet" ADD CONSTRAINT "CreditCardBullet_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CreditCardProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardKeyFeature" ADD CONSTRAINT "CreditCardKeyFeature_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CreditCardProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardBenefit" ADD CONSTRAINT "CreditCardBenefit_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CreditCardProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardSpecialOffer" ADD CONSTRAINT "CreditCardSpecialOffer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CreditCardProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardOffer" ADD CONSTRAINT "CreditCardOffer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CreditCardProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardBenefitSection" ADD CONSTRAINT "CreditCardBenefitSection_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CreditCardProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCardBenefitSubPoint" ADD CONSTRAINT "CreditCardBenefitSubPoint_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "CreditCardBenefitSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceCoverageDetail" ADD CONSTRAINT "InsuranceCoverageDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "InsuranceProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceExclusion" ADD CONSTRAINT "InsuranceExclusion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "InsuranceProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceClaimStep" ADD CONSTRAINT "InsuranceClaimStep_productId_fkey" FOREIGN KEY ("productId") REFERENCES "InsuranceProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceNetworkHospital" ADD CONSTRAINT "InsuranceNetworkHospital_productId_fkey" FOREIGN KEY ("productId") REFERENCES "InsuranceProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceEligibility" ADD CONSTRAINT "InsuranceEligibility_productId_fkey" FOREIGN KEY ("productId") REFERENCES "InsuranceProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityInquiry" ADD CONSTRAINT "EligibilityInquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebitCardProduct" ADD CONSTRAINT "DebitCardProduct_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebitCardBullet" ADD CONSTRAINT "DebitCardBullet_productId_fkey" FOREIGN KEY ("productId") REFERENCES "DebitCardProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebitCardKeyFeature" ADD CONSTRAINT "DebitCardKeyFeature_productId_fkey" FOREIGN KEY ("productId") REFERENCES "DebitCardProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebitCardOffer" ADD CONSTRAINT "DebitCardOffer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "DebitCardProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebitCardSafetyFeature" ADD CONSTRAINT "DebitCardSafetyFeature_productId_fkey" FOREIGN KEY ("productId") REFERENCES "DebitCardProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardCategories" ADD CONSTRAINT "_CardCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardCategories" ADD CONSTRAINT "_CardCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "CreditCardProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DebitCardCategories" ADD CONSTRAINT "_DebitCardCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DebitCardCategories" ADD CONSTRAINT "_DebitCardCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "DebitCardProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
