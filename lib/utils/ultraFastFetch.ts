/**
 * Ultra-Fast API Fetching System for Six Finance
 * Features: Aggressive caching, request deduplication, parallel fetching, instant responses
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

interface FetchConfig {
  timeout?: number;
  retries?: number;
  cache?: boolean;
  cacheDuration?: number;
}

// Global cache for lightning-fast repeated requests
const requestCache = new Map<string, { data: any; timestamp: number }>();
const pendingRequests = new Map<string, Promise<any>>();
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes - aggressive caching

/**
 * Ultra-fast fetch with automatic caching and deduplication
 */
export async function fastFetch<T = any>(
  endpoint: string,
  config: FetchConfig = {}
): Promise<T | null> {
  const {
    timeout = 4000, // Reduced to 4s for speed
    retries = 2,
    cache = true,
    cacheDuration = CACHE_DURATION
  } = config;

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  const cacheKey = `${url}_${JSON.stringify(config)}`;

  // Check cache first
  if (cache) {
    const cached = requestCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cacheDuration) {
      return cached.data as T;
    }
  }

  // Check if same request is already in progress (deduplication)
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  // Create new request
  const requestPromise = executeRequest<T>(url, timeout, retries);
  
  pendingRequests.set(cacheKey, requestPromise);

  try {
    const data = await requestPromise;
    
    if (cache && data) {
      requestCache.set(cacheKey, { data, timestamp: Date.now() });
    }
    
    pendingRequests.delete(cacheKey);
    return data;
  } catch (error) {
    pendingRequests.delete(cacheKey);
    console.error(`FastFetch error for ${endpoint}:`, error);
    return null;
  }
}

/**
 * Execute request with timeout and retries
 */
async function executeRequest<T>(
  url: string,
  timeout: number,
  retries: number
): Promise<T | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort(new Error(`Request timeout after ${timeout}ms`));
      }, timeout);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 0 } // Disable Next.js caching for fresh data
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (attempt < retries) continue;
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error: any) {
      // Handle timeout and other errors
      if (error.name === 'AbortError' || error.message?.includes('timeout')) {
        console.warn(`Request timed out for ${url} (attempt ${attempt + 1}/${retries + 1})`);
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, 200 * (attempt + 1)));
          continue;
        }
        return null; // Return null instead of throwing on final timeout
      }
      
      if (attempt < retries) {
        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, 200 * (attempt + 1)));
        continue;
      }
      
      // Log error but don't crash the app
      console.error(`Request failed for ${url}:`, error.message);
      return null;
    }
  }
  return null;
}

/**
 * Fetch multiple endpoints in parallel with Promise.all
 * Returns array of results in same order as endpoints
 */
export async function fastFetchAll<T = any>(
  endpoints: string[],
  config: FetchConfig = {}
): Promise<(T | null)[]> {
  const promises = endpoints.map(endpoint => fastFetch<T>(endpoint, config));
  return Promise.all(promises);
}

/**
 * Fetch multiple named endpoints in parallel
 * Returns object with keys matching input keys
 */
export async function fastFetchNamed<T extends Record<string, any>>(
  endpoints: Record<keyof T, string>,
  config: FetchConfig = {}
): Promise<T> {
  const keys = Object.keys(endpoints);
  const urls = Object.values(endpoints);
  
  const results = await fastFetchAll(urls as string[], config);
  
  const named = {} as T;
  keys.forEach((key, index) => {
    named[key as keyof T] = results[index] as any;
  });
  
  return named;
}

/**
 * Prefetch data in the background
 * Useful for loading data before user navigates
 */
export function prefetch(endpoint: string, config: FetchConfig = {}): void {
  fastFetch(endpoint, { ...config, cache: true }).catch(() => {
    // Silently fail for prefetch
  });
}

/**
 * Clear cache for specific endpoint or all
 */
export function clearCache(endpoint?: string): void {
  if (endpoint) {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    for (const key of requestCache.keys()) {
      if (key.startsWith(url)) {
        requestCache.delete(key);
      }
    }
  } else {
    requestCache.clear();
  }
}

/**
 * Fetch with progress tracking (for large data)
 */
export async function fastFetchWithProgress<T = any>(
  endpoint: string,
  onProgress: (percent: number) => void,
  config: FetchConfig = {}
): Promise<T | null> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  try {
    onProgress(0);
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    onProgress(50);
    const data = await response.json();
    onProgress(100);
    
    return data as T;
  } catch (error) {
    console.error(`FastFetch error for ${endpoint}:`, error);
    return null;
  }
}

/**
 * Batch fetch with controlled concurrency
 * Prevents overwhelming server with too many simultaneous requests
 */
export async function fastFetchBatch<T = any>(
  endpoints: string[],
  batchSize: number = 5,
  config: FetchConfig = {}
): Promise<(T | null)[]> {
  const results: (T | null)[] = [];
  
  for (let i = 0; i < endpoints.length; i += batchSize) {
    const batch = endpoints.slice(i, i + batchSize);
    const batchResults = await fastFetchAll<T>(batch, config);
    results.push(...batchResults);
  }
  
  return results;
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    size: requestCache.size,
    pending: pendingRequests.size,
    keys: Array.from(requestCache.keys())
  };
}
