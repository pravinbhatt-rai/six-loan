# Comprehensive Loan Filtering System - Implementation Guide

## Overview
This implementation adds a comprehensive filtering system for loans across your application, supporting all loan types, sub-types, amounts, eligibility criteria, purposes, schemes, and vehicle types from your navigation structure.

## Changes Made

### 1. Database Schema Updates (`prisma/schema.prisma`)

Added new fields to the `LoanProduct` model:

```prisma
loanType           String?   // "personal", "business", "home", "vehicle", "education", "property", "security"
loanSubType        String?   // "preApproved", "interestRates", "lowCibil", "balanceTransfer"
amountRange        String?   // "5-lakh", "10-lakh", "20-lakh", etc.
eligibleFor        String?   // "salaried", "self-employed", "seniors", "students", "doctors", "women"
loanPurpose        String?   // "medical", "travel", "wedding", "consolidation", etc.
scheme             String?   // "dairy", "small", "goat", "startup", "poultry", etc.
vehicleType        String?   // "new-bike", "used-bike", "new-car", "used-car"
```

### 2. API Routes

#### Created: `/app/api/loans/route.ts`
- Comprehensive GET endpoint that accepts all filter parameters
- Supports filtering by: loanType, loanSubType, amountRange, eligibleFor, loanPurpose, scheme, vehicleType, category
- Returns filtered loan products with complete data

**Example Usage:**
```
GET /api/loans?loanType=personal&loanSubType=preApproved
GET /api/loans?amountRange=5-lakh&eligibleFor=salaried
GET /api/loans?loanPurpose=medical&category=personal-loan
```

### 3. Filter State (`public/mockdata/data.ts`)

Updated `FilterState` interface to include all new filter types:

```typescript
export interface FilterState {
  sortBy: SortOption;
  processingTime: string[];
  processType: string[];
  loanSubType: string[];
  amountRange: string[];
  eligibleFor: string[];
  loanPurpose: string[];
  scheme: string[];
  vehicleType: string[];
}
```

### 4. FilterSidebar Component (`component/loandetail/FilterSidebar.tsx`)

Added comprehensive filter sections with collapsible UI:

- **Loan Type**: Pre-Approved, Interest Rates, Low CIBIL Score, Balance Transfer
- **Loan Amount**: ₹5 Lakh to ₹60 Lakh
- **Eligible For**: Salaried, Self Employed, Seniors, Students, Doctors, Women
- **Loan Purpose**: Medical, Travel, Wedding, Debt Consolidation, Overdraft, Flexi, Short Term, Term
- **Schemes**: Dairy Farming, Small Business, Goat Farming, Startup, Poultry Farm, Home Renovation, Plot, Top-up, Home Construction, NRI, Home Extension
- **Vehicle Type**: New/Used Two Wheeler, New/Used Car

### 5. UniversalLoanCard Component (`component/loan/UniversalLoanCard.tsx`)

Updated to accept and use filter props:

```typescript
interface UniversalLoanCardProps {
  categorySlug: string;
  headerTitle: string;
  headerSubtitle: string;
  headerDescription: string;
  maxDisplay?: number;
  showViewAllButton?: boolean;
  // New filter props
  loanType?: string;
  loanSubType?: string;
  amountRange?: string;
  eligibleFor?: string;
  loanPurpose?: string;
  scheme?: string;
  vehicleType?: string;
}
```

- Filters are passed to API when fetching loans
- "View All Offers" button now includes all active filters in URL parameters
- Cache keys updated to include filter parameters

### 6. Loan Detail Page (`app/loandetails/page.tsx`)

- Reads URL parameters on page load
- Automatically applies filters from URL (e.g., preApproved filter selected when coming from preApproved page)
- Supports deep linking with filters

### 7. Individual Loan Pages (Updated)

All specific loan pages now pass appropriate filters to `UniversalLoanCard`:

- **Pre-Approved Page** (`app/personalLoan/preApproved/page.tsx`): `loanType="personal"` + `loanSubType="preApproved"`
- **Interest Rates Page** (`app/personalLoan/InterestRates/page.tsx`): `loanType="personal"` + `loanSubType="interestRates"`
- **Low CIBIL Page** (`app/personalLoan/lowCibil/page.tsx`): `loanType="personal"` + `loanSubType="lowCibil"`
- **Salaried Page** (`app/personalLoan/salaried/page.tsx`): `loanType="personal"` + `eligibleFor="salaried"`
- **Self-Employed Page** (`app/personalLoan/self-employed/page.tsx`): `loanType="personal"` + `eligibleFor="self-employed"`
- **Medical Page** (`app/personalLoan/medical/page.tsx`): `loanType="personal"` + `loanPurpose="medical"`
- **Travel Page** (`app/personalLoan/travel/page.tsx`): `loanType="personal"` + `loanPurpose="travel"`
- **Wedding Page** (`app/personalLoan/wedding/page.tsx`): `loanType="personal"` + `loanPurpose="wedding"`
- **5 Lakh Page** (`app/personalLoan/5-lakh/page.tsx`): `loanType="personal"` + `amountRange="5-lakh"`
- **10 Lakh Page** (`app/personalLoan/10-lakh/page.tsx`): `loanType="personal"` + `amountRange="10-lakh"`

## Setup Instructions

### 1. Run Database Migration

After updating your Prisma schema, generate the Prisma client and push changes to the database:

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# OR create and run migration
npx prisma migrate dev --name add_loan_filters
```

### 2. Populate Filter Data

You need to update existing loan products in your database with the appropriate filter values. You can do this via:

**Option A: SQL Script**
```bash
# Run the migration SQL
psql your_database < prisma/migrations/add_loan_filters.sql
```

**Option B: Admin Panel**
Create an admin interface to bulk update loans with filter values.

**Option C: Prisma Script**
Create a seed script to update loans:

```typescript
import prisma from '@/lib/prisma/client';

async function updateLoanFilters() {
  // Update pre-approved personal loans
  await prisma.loanProduct.updateMany({
    where: {
      title: { contains: 'Pre-Approved', mode: 'insensitive' },
      categoryId: { /* personal loan category ID */ }
    },
    data: {
      loanType: 'personal',
      loanSubType: 'preApproved'
    }
  });
  
  // Add more updates as needed...
}

updateLoanFilters();
```

### 3. Test the Filters

1. **Navigate to a specific loan page** (e.g., `/personalLoan/preApproved`)
2. **Click "View All Offers"** - should redirect to `/loandetails?loanType=personal&loanSubType=preApproved`
3. **Verify filters are pre-selected** in the FilterSidebar
4. **Test filtering** by selecting/deselecting different filter options
5. **Verify URL updates** with filter parameters

## Filter Mapping Reference

### Loan Types
- `personal` - Personal Loans
- `business` - Business Loans
- `home` - Home Loans
- `property` - Loan Against Property
- `security` - Loan Against Security
- `vehicle` - Vehicle Loans
- `education` - Education Loans

### Loan Sub-Types
- `preApproved` - Pre-Approved Loans
- `interestRates` - Interest Rate Focused
- `lowCibil` - Low CIBIL Score Accepted
- `balanceTransfer` - Balance Transfer

### Amount Ranges
- `5-lakh`, `10-lakh`, `15-lakh`, `20-lakh`, `30-lakh`, `40-lakh`, `50-lakh`, `60-lakh`

### Eligible For
- `salaried` - Salaried Employees
- `self-employed` - Self Employed
- `seniors` - Senior Citizens
- `students` - Students
- `doctors` - Doctors
- `women` - Women

### Loan Purpose
- `medical` - Medical Loan
- `travel` - Travel Loan
- `wedding` - Wedding Loan
- `consolidation` - Debt Consolidation
- `overdraft` - Overdraft Loan
- `flexi` - Flexi Loan
- `short-term` - Short Term Loan
- `term` - Term Loan

### Schemes
- `dairy` - Dairy Farming Loan
- `small` - Small Business Loan
- `goat` - Goat Farming Loan
- `startup` - Startup Loan
- `poultry` - Poultry Farm Loan
- `renovation` - Home Renovation
- `plot` - Plot Loan
- `top-up` - Top-up Loan
- `construction` - Home Construction
- `nri` - NRI Loan
- `extension` - Home Extension

### Vehicle Types
- `new-bike` - New Two Wheeler
- `used-bike` - Used Two Wheeler
- `new-car` - New Car
- `used-car` - Used Car

## URL Parameter Examples

```
# Pre-approved personal loans
/loandetails?loanType=personal&loanSubType=preApproved

# Salaried employee loans under 10 lakh
/loandetails?loanType=personal&eligibleFor=salaried&amountRange=10-lakh

# Medical loans with low CIBIL score
/loandetails?loanType=personal&loanPurpose=medical&loanSubType=lowCibil

# New car loans
/loandetails?loanType=vehicle&vehicleType=new-car

# Small business scheme loans
/loandetails?loanType=business&scheme=small
```

## Next Steps

1. ✅ Update database schema
2. ✅ Create API routes with filtering
3. ✅ Update FilterSidebar UI
4. ✅ Update UniversalLoanCard component
5. ✅ Update individual loan pages
6. ✅ Update loandetails page to read URL parameters
7. ⏳ **Run database migration**
8. ⏳ **Populate filter data for existing loans**
9. ⏳ **Test all filter combinations**
10. ⏳ **Build and deploy**

## Troubleshooting

### Filters not working?
- Check if loan products have filter fields populated in database
- Verify API route is returning filtered results
- Check browser console for API errors

### "View All Offers" not including filters?
- Verify filter props are passed to UniversalLoanCard component
- Check URL construction in UniversalLoanCard

### Filters not pre-selected on loandetails page?
- Verify URL parameters are present in the URL
- Check InitialFilterState in loandetails page reads URL params

## Performance Considerations

- **Caching**: UniversalLoanCard caches results with filter parameters included in cache key
- **Indexes**: Database indexes added for all filter fields for fast queries
- **Lazy Loading**: Filter sections are collapsible to improve initial render performance

---

**Implementation Completed**: All filtering infrastructure is in place and ready to use once database is populated with filter values.
