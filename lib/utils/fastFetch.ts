/**
 * Fast data fetching utility with Promise.all for parallel API calls
 * Optimized for performance with timeout and error handling
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
const DEFAULT_TIMEOUT = 10000; // 10 seconds

interface FetchOptions {
  timeout?: number;
  headers?: HeadersInit;
  cache?: RequestCache;
}

/**
 * Fetch with timeout support
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<Response> {
  const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Fetch single API endpoint with error handling
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T | null> {
  try {
    const url = endpoint.startsWith('http') 
      ? endpoint 
      : `${API_BASE_URL}${endpoint}`;
    
    const response = await fetchWithTimeout(url, {
      timeout: options.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      cache: options.cache || 'no-store',
    });

    if (!response.ok) {
      console.error(`API Error: ${endpoint} - ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch Error: ${endpoint}`, error);
    return null;
  }
}

/**
 * Fetch multiple API endpoints in parallel using Promise.all
 * Returns results in the same order as the input endpoints
 */
export async function fetchMultipleAPIs<T = any>(
  endpoints: string[],
  options: FetchOptions = {}
): Promise<(T | null)[]> {
  try {
    const promises = endpoints.map(endpoint => fetchAPI<T>(endpoint, options));
    return await Promise.all(promises);
  } catch (error) {
    console.error('Fetch Multiple APIs Error:', error);
    return endpoints.map(() => null);
  }
}

/**
 * Fetch multiple APIs with named keys for easier access
 * Example: { cards: '/api/credit-cards', users: '/api/users' }
 * Returns: { cards: [...], users: [...] }
 */
export async function fetchNamedAPIs<T extends Record<string, any>>(
  endpoints: Record<string, string>,
  options: FetchOptions = {}
): Promise<Record<keyof T, any>> {
  try {
    const keys = Object.keys(endpoints);
    const urls = Object.values(endpoints);
    
    const results = await fetchMultipleAPIs(urls, options);
    
    return keys.reduce((acc, key, index) => {
      acc[key] = results[index];
      return acc;
    }, {} as Record<string, any>);
  } catch (error) {
    console.error('Fetch Named APIs Error:', error);
    return {} as Record<keyof T, any>;
  }
}

/**
 * Fetch with retry logic for failed requests
 */
export async function fetchWithRetry<T>(
  endpoint: string,
  options: FetchOptions & { retries?: number } = {}
): Promise<T | null> {
  const { retries = 2, ...fetchOptions } = options;
  
  for (let i = 0; i <= retries; i++) {
    const result = await fetchAPI<T>(endpoint, fetchOptions);
    if (result !== null) return result;
    
    if (i < retries) {
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 500));
    }
  }
  
  return null;
}

/**
 * Fetch with progress tracking
 */
export async function fetchWithProgress<T>(
  endpoints: string[],
  onProgress?: (completed: number, total: number) => void,
  options: FetchOptions = {}
): Promise<(T | null)[]> {
  const total = endpoints.length;
  let completed = 0;
  
  const promises = endpoints.map(async (endpoint) => {
    const result = await fetchAPI<T>(endpoint, options);
    completed++;
    onProgress?.(completed, total);
    return result;
  });
  
  return await Promise.all(promises);
}

/**
 * Batch fetch with chunking to prevent overwhelming the server
 */
export async function fetchInBatches<T>(
  endpoints: string[],
  batchSize: number = 5,
  options: FetchOptions = {}
): Promise<(T | null)[]> {
  const results: (T | null)[] = [];
  
  for (let i = 0; i < endpoints.length; i += batchSize) {
    const batch = endpoints.slice(i, i + batchSize);
    const batchResults = await fetchMultipleAPIs<T>(batch, options);
    results.push(...batchResults);
  }
  
  return results;
}

/**
 * Cache wrapper for API calls (client-side caching)
 */
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchWithCache<T>(
  endpoint: string,
  options: FetchOptions & { cacheDuration?: number } = {}
): Promise<T | null> {
  const { cacheDuration = CACHE_DURATION, ...fetchOptions } = options;
  const cacheKey = endpoint;
  
  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < cacheDuration) {
    return cached.data as T;
  }
  
  // Fetch fresh data
  const data = await fetchAPI<T>(endpoint, fetchOptions);
  
  if (data !== null) {
    cache.set(cacheKey, { data, timestamp: Date.now() });
  }
  
  return data;
}

/**
 * Clear cache
 */
export function clearCache(endpoint?: string) {
  if (endpoint) {
    cache.delete(endpoint);
  } else {
    cache.clear();
  }
}
