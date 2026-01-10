/**
 * Generate a unique reference number with format: SIX-[TYPE]-[CATEGORY]-[ID]-[CHECKSUM]
 * Example: SIX-L-PL-00123-A7 or SIX-C-SEC-00456-B9
 * 
 * TYPE Codes:
 * L = Loan
 * C = Credit Card
 * I = Insurance
 * A = App
 * 
 * CATEGORY: First 2-3 letters of category slug (uppercase)
 * For Credit Cards with cardType: SEC (Secured), STU (Student), BUS (Business), etc.
 * ID: Padded application ID
 * CHECKSUM: 2-character hash for validation
 */
export function generateReferenceNumber(
  applicationId: number,
  productType: string,
  categorySlug?: string,
  cardType?: string
): string {
  // Get type code
  const typeMap: Record<string, string> = {
    'LOAN': 'L',
    'CREDIT_CARD': 'C',
    'INSURANCE': 'I',
    'APP': 'A'
  };
  const typeCode = typeMap[productType] || 'X';
  
  // Get category code (first 2-3 letters, max 3 chars)
  let categoryCode = 'GEN'; // Default: General
  
  // For credit cards, use card type specific codes
  if (productType === 'CREDIT_CARD' && cardType) {
    const cardTypeMap: Record<string, string> = {
      'standard': 'STD',
      'premium': 'PRM',
      'secured': 'SEC',
      'student': 'STU',
      'business': 'BUS',
      'addon': 'ADN',
      'nri': 'NRI',
      'hni': 'HNI'
    };
    categoryCode = cardTypeMap[cardType.toLowerCase()] || 'CRD';
  } else if (categorySlug) {
    // Remove common words and get meaningful code
    const cleanSlug = categorySlug
      .replace(/-loan|-card|-insurance/gi, '')
      .replace(/-/g, '')
      .toUpperCase();
    
    if (cleanSlug.length >= 2) {
      categoryCode = cleanSlug.substring(0, 3);
    }
  }
  
  // Pad application ID to 5 digits
  const idStr = applicationId.toString().padStart(5, '0');
  
  // Generate 2-character checksum
  const checksumInput = `${typeCode}${categoryCode}${idStr}`;
  let checksum = 0;
  for (let i = 0; i < checksumInput.length; i++) {
    checksum += checksumInput.charCodeAt(i);
  }
  const checksumStr = (checksum % 36).toString(36).toUpperCase().padStart(2, '0');
  
  return `SIX-${typeCode}-${categoryCode}-${idStr}-${checksumStr}`;
}
