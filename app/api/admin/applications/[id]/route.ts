import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/client';
import { verifyAdminOrModerator } from '@/lib/auth/jwt';

// Cache for authentication results (short-lived)
const authCache = new Map<string, { authenticated: boolean; timestamp: number }>();
const CACHE_TTL = 30000; // 30 seconds

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();
  let authResult = null;
  
  try {
    // 1. PARALLEL EXECUTION: Parse params and body concurrently
    const [paramsObj, body] = await Promise.all([
      params,
      request.json().catch(() => null)
    ]);
    
    const { id } = paramsObj;
    const { status, feedback } = body || {};
    
    // Validate input early
    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }
    
    // 2. OPTIMIZED AUTH WITH CACHING
    const authHeader = request.headers.get('authorization');
    const cacheKey = authHeader?.slice(0, 50) || '';
    const cachedAuth = authCache.get(cacheKey);
    
    if (cachedAuth && Date.now() - cachedAuth.timestamp < CACHE_TTL) {
      if (!cachedAuth.authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      authResult = { authenticated: true };
    } else {
      authResult = await verifyAdminOrModerator(request);
      if (!authResult || !authResult.authenticated) {
        authCache.set(cacheKey, { authenticated: false, timestamp: Date.now() });
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      authCache.set(cacheKey, { authenticated: true, timestamp: Date.now() });
    }
    
    // 3. VALIDATE APPLICATION EXISTS AND GET CURRENT STATE
    // Use transaction to avoid race conditions
    const result = await prisma.$transaction(async (tx) => {
      // First, check if application exists and get current status
      const existingApp = await tx.application.findUnique({
        where: { id: Number(id) },
        select: { id: true, status: true }
      });
      
      if (!existingApp) {
        throw new Error('NOT_FOUND');
      }
      
      // Skip update if status is the same and no feedback provided
      if (existingApp.status === status && !feedback) {
        return { updated: false, application: existingApp };
      }
      
      // Perform the update
      const updatedApplication = await tx.application.update({
        where: { id: Number(id) },
        data: {
          status,
          feedback: feedback || null,
          updatedAt: new Date(),
        },
      });
      
      return { updated: true, application: updatedApplication };
    });
    
    const responseTime = Date.now() - startTime;
    
    // 4. MINIMAL RESPONSE
    return NextResponse.json({
      success: true,
      application: result.application,
      updated: result.updated,
      _performance: { responseTime: `${responseTime}ms` }
    });
    
  } catch (error: any) {
    console.error('Update application error:', error);
    
    // Specific error handling
    if (error.message === 'NOT_FOUND') {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }
    
    // Handle Prisma errors efficiently
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}