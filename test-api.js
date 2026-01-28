const fetch = require('node-fetch');

async function testDebitCardAPI() {
  console.log('Testing Debit Card API...');

  try {
    // Test GET request
    console.log('Testing GET /api/admin/debit-cards...');
    const getResponse = await fetch('http://localhost:3000/api/admin/debit-cards');
    const getData = await getResponse.json();
    console.log('GET Response:', getData.success ? '✅ Success' : '❌ Failed');

    // Test POST request with numeric values
    console.log('Testing POST /api/admin/debit-cards with numeric values...');
    const postData = {
      name: 'Test Debit Card',
      bankName: 'Test Bank',
      annualFee: 500,
      issuanceFee: 0,
      atmWithdrawalLimit: 10000,
      posLimit: 50000,
      onlineLimit: 25000,
      cashbackRate: 1.5,
      minimumBalance: 1000
    };

    const postResponse = await fetch('http://localhost:3000/api/admin/debit-cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    const postResult = await postResponse.json();
    console.log('POST Response:', postResult.success ? '✅ Success - Prisma validation fixed!' : '❌ Failed');
    if (!postResult.success) {
      console.log('Error details:', postResult.error);
    }

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testDebitCardAPI();