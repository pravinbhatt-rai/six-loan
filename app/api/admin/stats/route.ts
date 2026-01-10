import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAdminOrModerator(request);
    if (!authResult || !authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const totalUsers = await prisma.user.count();
    const totalLoans = await prisma.loanProduct.count();
    const totalCreditCards = await prisma.creditCardProduct.count();
    const totalInsurance = await prisma.insuranceProduct.count();
    const totalApplications = await prisma.application.count();

    // Trends
    const currentMonthUsers = await prisma.user.count({
      where: { createdAt: { gte: firstDayCurrentMonth } },
    });
    const lastMonthUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: firstDayLastMonth,
          lte: lastDayLastMonth,
        },
      },
    });

    const userTrend =
      lastMonthUsers > 0
        ? ((currentMonthUsers - lastMonthUsers) / lastMonthUsers) * 100
        : currentMonthUsers > 0
        ? 100
        : 0;

    const currentMonthApps = await prisma.application.count({
      where: { createdAt: { gte: firstDayCurrentMonth } },
    });
    const lastMonthApps = await prisma.application.count({
      where: {
        createdAt: {
          gte: firstDayLastMonth,
          lte: lastDayLastMonth,
        },
      },
    });

    const appTrend =
      lastMonthApps > 0
        ? ((currentMonthApps - lastMonthApps) / lastMonthApps) * 100
        : currentMonthApps > 0
        ? 100
        : 0;

    // Mock data for charts
    const trafficData = [
      { name: 'Jan', loans: 4000, cards: 2400 },
      { name: 'Feb', loans: 3000, cards: 1398 },
      { name: 'Mar', loans: 2000, cards: 9800 },
      { name: 'Apr', loans: 2780, cards: 3908 },
      { name: 'May', loans: 1890, cards: 4800 },
      { name: 'Jun', loans: 2390, cards: 3800 },
      { name: 'Jul', loans: 3490, cards: 4300 },
    ];

    const loanActivity = [
      { name: 'M', value: 200 },
      { name: 'T', value: 300 },
      { name: 'W', value: 150 },
      { name: 'Th', value: 230 },
      { name: 'F', value: 260 },
      { name: 'S', value: 70 },
    ];

    const recentApplications = await prisma.application.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        loan: { select: { title: true } },
        card: { select: { name: true } },
        insurance: { select: { name: true } },
      },
    });

    return NextResponse.json({
      totalUsers,
      totalLoans,
      totalCreditCards,
      totalInsurance,
      totalProducts: totalLoans + totalCreditCards + totalInsurance,
      totalApplications,
      recentApplications,
      userTrend: `${userTrend >= 0 ? '+' : ''}${userTrend.toFixed(1)}%`,
      appTrend: `${appTrend >= 0 ? '+' : ''}${appTrend.toFixed(1)}%`,
      trafficData,
      loanActivity,
      stats: {
        trafficGained: 300000,
        loansApplied: totalApplications,
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
