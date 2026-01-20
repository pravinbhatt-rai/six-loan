// lib/utils/imageUtils.ts

/**
 * Get credit card image with fallback handling
 * Uses placeholder images from a CDN to avoid 404 errors
 */
export const getCreditCardImage = (bankName: string, cardName?: string): string => {
  const bank = bankName.toLowerCase();
  
  // Map of bank names to placeholder image URLs
  const bankImageMap: Record<string, string> = {
    // Indian Banks
    'yes bank': 'https://img.icons8.com/color/96/000000/bank-card-back-side.png',
    'sbi': 'https://img.icons8.com/color/96/000000/bank-cards.png',
    'hdfc': 'https://img.icons8.com/color/96/000000/mastercard-credit-card.png',
    'axis bank': 'https://img.icons8.com/color/96/000000/visa.png',
    'icici': 'https://img.icons8.com/color/96/000000/credit-card.png',
    'rbl': 'https://img.icons8.com/color/96/000000/bank-card-back-side.png',
    'hsbc': 'https://img.icons8.com/color/96/000000/bank-cards.png',
    
    // International Banks
    'american express': 'https://img.icons8.com/color/96/000000/amex.png',
    'amex': 'https://img.icons8.com/color/96/000000/amex.png',
    
    // Default for unknown banks
    'default': 'https://img.icons8.com/color/96/000000/credit-card-front.png'
  };

  // Find matching bank
  for (const [key, url] of Object.entries(bankImageMap)) {
    if (bank.includes(key) || key.includes(bank)) {
      return url;
    }
  }

  return bankImageMap.default;
};

/**
 * Get bank logo for display
 */
export const getBankLogo = (bankName: string): string => {
  const logos: Record<string, string> = {
    'YES BANK': 'https://img.icons8.com/color/96/000000/bank-building.png',
    'SBI': 'https://img.icons8.com/color/96/000000/bank-building.png',
    'HDFC': 'https://img.icons8.com/color/96/000000/bank-building.png',
    'Axis Bank': 'https://img.icons8.com/color/96/000000/bank-building.png',
    'ICICI': 'https://img.icons8.com/color/96/000000/bank-building.png',
    'RBL': 'https://img.icons8.com/color/96/000000/bank-building.png',
    'HSBC': 'https://img.icons8.com/color/96/000000/bank-building.png',
    'American Express': 'https://img.icons8.com/color/96/000000/amex.png'
  };

  return logos[bankName] || 'https://img.icons8.com/color/96/000000/bank-building.png';
};