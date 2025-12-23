// lib/api/api-client.ts

type HttpRequestOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function apiFetch<T>(endpoint: string, options: HttpRequestOptions = {}): Promise<T> {
  const { params, ...customConfig } = options;
  
  // 1. Handle Query Parameters
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.append(key, String(value));
    });
  }

  // 2. Default Headers
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = { 
    'Content-Type': 'application/json', 
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...customConfig.headers 
  };

  const config: RequestInit = {
    ...customConfig,
    headers,
    // Next.js specific: Enable partial pre-rendering or caching if needed
    // next: { revalidate: 3600 } // Default 1 hour cache
  };

  try {
    const response = await fetch(url.toString(), config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown Error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (err) {
    console.error(`[API SDK ERROR]:`, err);
    throw err;
  }
}