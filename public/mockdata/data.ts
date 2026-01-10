// data.ts

export interface LoanProduct {
  id: number;
  bankName: string;
  logoUrl: string; // Using a placeholder for simplicity
  processTimeLabel: string; // The display text like "Instant"
  processTimeValue: string; // The value for filtering like 'instant'
  chanceOfApproval: string;
  approvalScore: number; // Numeric score for sorting high to low
  interestRateText: string;
  aprText: string;
  emiAmount: string;
  emiValue: number; // Numeric value for sorting
  processTypeLabel: string;
  processTypeValue: string; // Value for filtering 'instant-process'
  disbursalTimeHours: number; // For sorting disbursal time
  slug?: string; // URL slug for the loan
  categoryId?: number; // Category ID
  title?: string; // Title of the loan
}

export type SortOption = 'approval-high-low' | 'disbursal-low-high' | 'emi-low-high' | 'emi-high-low' | null;

export interface FilterState {
  sortBy: SortOption;
  processingTime: string[];
  processType: string[];
}

// Mock Data with variations to test filtering/sorting
export const MOCK_LOANS: LoanProduct[] = [
  {
    id: 1,
    bankName: 'Axis Bank',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Axis_Bank_logo.svg/1200px-Axis_Bank_logo.svg.png',
    processTimeLabel: 'Instant',
    processTimeValue: 'instant',
    chanceOfApproval: 'Excellent',
    approvalScore: 95,
    interestRateText: '19% Onwards',
    aprText: 'APR: 20.13%',
    emiAmount: '₹ 5,188',
    emiValue: 5188,
    processTypeLabel: 'Instant Process',
    processTypeValue: 'instant-process',
    disbursalTimeHours: 0.5,
  },
  {
    id: 2,
    bankName: 'HDFC Bank',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/2560px-HDFC_Bank_Logo.svg.png',
    processTimeLabel: '1 - 2 Days',
    processTimeValue: '1-2-days',
    chanceOfApproval: 'Very Good',
    approvalScore: 85,
    interestRateText: '17.5% Onwards',
    aprText: 'APR: 18.5%',
    emiAmount: '₹ 4,950',
    emiValue: 4950,
    processTypeLabel: 'Assisted Process',
    processTypeValue: 'assisted-process',
    disbursalTimeHours: 24,
  },
  {
    id: 3,
    bankName: 'ICICI Bank',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/ICICI_Bank_Logo.svg/1200px-ICICI_Bank_Logo.svg.png',
    processTimeLabel: 'Instant',
    processTimeValue: 'instant',
    chanceOfApproval: 'Good',
    approvalScore: 75,
    interestRateText: '21% Onwards',
    aprText: 'APR: 22.5%',
    emiAmount: '₹ 5,300',
    emiValue: 5300,
    processTypeLabel: 'Instant Process',
    processTypeValue: 'instant-process',
    disbursalTimeHours: 1,
  },
   {
    id: 4,
    bankName: 'Kotak Bank',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Kotak_Mahindra_Bank_logo.svg/2560px-Kotak_Mahindra_Bank_logo.svg.png',
    processTimeLabel: '3 - 7 Days',
    processTimeValue: '3-7-days',
    chanceOfApproval: 'Average',
    approvalScore: 60,
    interestRateText: '16% Onwards',
    aprText: 'APR: 17%',
    emiAmount: '₹ 4,800',
    emiValue: 4800,
    processTypeLabel: 'Assisted Process',
    processTypeValue: 'assisted-process',
    disbursalTimeHours: 72,
  },
];