const fetch = require('node-fetch');

async function testCombinedAPI() {
  console.log('Testing Combined Products API...');

  try {
    const response = await fetch('http://localhost:3000/api/products');
    const data = await response.json();

    console.log('Response status:', response.status);
    console.log('Credit Cards count:', data.creditCards?.length || 0);
    console.log('Debit Cards count:', data.debitCards?.length || 0);
    console.log('Loans count:', data.loans?.length || 0);

    if (data.creditCards && data.creditCards.length > 0) {
      console.log('First credit card:', data.creditCards[0].name);
      console.log('Credit card offers:', data.creditCards[0].offers?.length || 0);
    }

    if (data.debitCards && data.debitCards.length > 0) {
      console.log('First debit card:', data.debitCards[0].name);
      console.log('Debit card offers:', data.debitCards[0].offers?.length || 0);
    }

    if (data.loans && data.loans.length > 0) {
      console.log('First loan:', data.loans[0].name);
      console.log('Loan offers:', data.loans[0].offers?.length || 0);
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testCombinedAPI();