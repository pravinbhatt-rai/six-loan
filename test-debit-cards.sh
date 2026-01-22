#!/bin/bash

echo "Testing Debit Card API..."
echo "========================"

# Wait for server to be ready
sleep 3

# Test GET request
echo "Testing GET /api/admin/debit-cards..."
GET_RESPONSE=$(curl -s -X GET http://localhost:3000/api/admin/debit-cards)
if [[ $GET_RESPONSE == *"success"* ]]; then
    echo "✅ GET request successful"
else
    echo "❌ GET request failed: $GET_RESPONSE"
fi

echo ""

# Test POST request with numeric values
echo "Testing POST /api/admin/debit-cards with numeric values..."
POST_DATA='{
    "name": "Test Debit Card",
    "bankName": "Test Bank",
    "annualFee": 500,
    "issuanceFee": 0,
    "atmWithdrawalLimit": 10000,
    "posLimit": 50000,
    "onlineLimit": 25000,
    "cashbackRate": 1.5,
    "minimumBalance": 1000
}'

POST_RESPONSE=$(curl -s -X POST http://localhost:3000/api/admin/debit-cards \
    -H "Content-Type: application/json" \
    -d "$POST_DATA")

if [[ $POST_RESPONSE == *"success\":true"* ]]; then
    echo "✅ POST request successful - Prisma validation fixed!"
    echo "Response: $POST_RESPONSE"
else
    echo "❌ POST request failed: $POST_RESPONSE"
fi