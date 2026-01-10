#!/bin/bash

echo "🧪 Testing Six Loan API Setup"
echo "=============================="
echo ""

# Check if backend is running
echo "1️⃣  Checking backend server..."
if curl -s http://localhost:4000/api/loans > /dev/null 2>&1; then
    echo "✅ Backend is running on port 4000"
else
    echo "❌ Backend is NOT running. Start it with: cd backend && npm run dev"
    exit 1
fi

echo ""
echo "2️⃣  Testing backend endpoints..."

# Test loans endpoint
LOANS_COUNT=$(curl -s http://localhost:4000/api/loans | grep -o '"id"' | wc -l | tr -d ' ')
echo "   - GET /api/loans: Found $LOANS_COUNT loans"

# Test categories endpoint  
CATEGORIES=$(curl -s http://localhost:4000/api/loans/categories | grep -o '"slug"' | wc -l | tr -d ' ')
echo "   - GET /api/loans/categories: Found $CATEGORIES categories"

# Test personal loan category
PERSONAL_LOANS=$(curl -s http://localhost:4000/api/loans/by-category/personalloan | grep -o '"bankName"' | wc -l | tr -d ' ')
echo "   - GET /api/loans/by-category/personalloan: Found $PERSONAL_LOANS personal loans"

echo ""
echo "3️⃣  Sample personal loan data:"
curl -s http://localhost:4000/api/loans/by-category/personalloan | head -c 300
echo ""
echo ""

# Check if Next.js is running
echo "4️⃣  Checking Next.js frontend..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Next.js is running on port 3000"
elif curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Next.js is running on port 3001"
    echo "   (Use http://localhost:3001 instead of 3000)"
else
    echo "❌ Next.js is NOT running. Start it with: npm run dev"
fi

echo ""
echo "=============================="
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "   1. Visit: http://localhost:3000/loan/personalloan"
echo "   2. You should see 4 personal loans"
echo "   3. Click 'Show More Offers' to see all loans"
echo ""
echo "🔗 API Routes Available:"
echo "   - /api/loans/personal-loan"
echo "   - /api/loans/business-loan"
echo "   - /api/loans/home-loan"
echo "   - /api/loans/all"
echo "   - /api/loans/all?category=personalloan"
