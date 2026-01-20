-- Migration: Add comprehensive loan filtering fields
-- This migration adds new fields to the LoanProduct table to support filtering by:
-- loan type, sub-type, amount range, eligibility, purpose, scheme, and vehicle type

-- Add new columns to LoanProduct table
ALTER TABLE "LoanProduct" 
ADD COLUMN IF NOT EXISTS "loanType" TEXT,
ADD COLUMN IF NOT EXISTS "loanSubType" TEXT,
ADD COLUMN IF NOT EXISTS "amountRange" TEXT,
ADD COLUMN IF NOT EXISTS "eligibleFor" TEXT,
ADD COLUMN IF NOT EXISTS "loanPurpose" TEXT,
ADD COLUMN IF NOT EXISTS "scheme" TEXT,
ADD COLUMN IF NOT EXISTS "vehicleType" TEXT;

-- Add comments to document the fields
COMMENT ON COLUMN "LoanProduct"."loanType" IS 'Main loan category: personal, business, home, vehicle, education, property, security';
COMMENT ON COLUMN "LoanProduct"."loanSubType" IS 'Loan sub-type: preApproved, interestRates, lowCibil, balanceTransfer';
COMMENT ON COLUMN "LoanProduct"."amountRange" IS 'Amount range: 5-lakh, 10-lakh, 20-lakh, 30-lakh, 40-lakh, 50-lakh, 60-lakh';
COMMENT ON COLUMN "LoanProduct"."eligibleFor" IS 'Eligibility: salaried, self-employed, seniors, students, doctors, women';
COMMENT ON COLUMN "LoanProduct"."loanPurpose" IS 'Purpose: medical, travel, wedding, consolidation, overdraft, flexi, short-term, term';
COMMENT ON COLUMN "LoanProduct"."scheme" IS 'Scheme: dairy, small, goat, startup, poultry, renovation, plot, top-up, construction, nri, extension';
COMMENT ON COLUMN "LoanProduct"."vehicleType" IS 'Vehicle type: new-bike, used-bike, new-car, used-car';

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "LoanProduct_loanType_idx" ON "LoanProduct"("loanType");
CREATE INDEX IF NOT EXISTS "LoanProduct_loanSubType_idx" ON "LoanProduct"("loanSubType");
CREATE INDEX IF NOT EXISTS "LoanProduct_amountRange_idx" ON "LoanProduct"("amountRange");
CREATE INDEX IF NOT EXISTS "LoanProduct_eligibleFor_idx" ON "LoanProduct"("eligibleFor");
CREATE INDEX IF NOT EXISTS "LoanProduct_loanPurpose_idx" ON "LoanProduct"("loanPurpose");
CREATE INDEX IF NOT EXISTS "LoanProduct_scheme_idx" ON "LoanProduct"("scheme");
CREATE INDEX IF NOT EXISTS "LoanProduct_vehicleType_idx" ON "LoanProduct"("vehicleType");

-- Sample data update (optional - update existing loans with appropriate filters)
-- Update personal loans
UPDATE "LoanProduct" 
SET "loanType" = 'personal'
WHERE "categoryId" IN (
  SELECT id FROM "Category" WHERE slug = 'personal-loan'
);

-- You can add more UPDATE statements here to populate the new fields for existing loans
-- based on their titles, specialization, or other fields
