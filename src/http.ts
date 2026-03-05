import {
  RootlyError, AuthenticationError, ForbiddenError, NotFoundError,
  ValidationError, RateLimitError, ServerError,
} from './errors.js';
import { checkWriteRateLimit } from './rate-limiter.js';

export const BASE_URL = 'https://api.rootly.com/v1';

const READ_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * SAFE response reading: text-first, then JSON.parse.
 * Never call response.json() + response.text() — "Body already read" error.
 */
async function handleResponse<T>(res: Response): Promise<T> {
  const rawText = await res.text();

  if (res.ok) {
    if (!rawText || res.status === 204) return {} as T;
    try { return JSON.parse(rawText) as T; }
    catch { return rawText as unknown as T; }
  }

  let responseBody: unknown;
  try { responseBody = JSON.parse(rawText); }
  catch { responseBody = rawText; }

  const detail =
    (responseBody as Record<string, unknown>)?.errors?.[0]?.detail as string ??
    (responseBody as Record<string, unknown>)?.error as string ??
    rawText;

  switch (res.status) {
    case 401: throw new AuthenticationError(`Unauthorized: ${detail}`, responseBody);
    case 403: throw new ForbiddenError(`Forbidden: ${detail}`, responseBody);
    case 404: throw new NotFoundError(`Not found: ${detail}`, responseBody);
    case 422: throw new ValidationError(`Validation error: ${detail}`, responseBody);
    case 429: throw new RateLimitError(`Rate limited: ${detail}`, 60, responseBody);
    case 500:
    case 502:
    case 503: throw new ServerError(`Server error ${res.status}: ${detail}`, res.status, responseBody);
    default: throw new RootlyError(`API error ${res.status}: ${detail}`, res.status, responseBody);
  }
}

export interface RequestOptions {
  method?: string;
  params?: Record<string, string>;
  body?: unknown;
}

export async function request<T>(token: string, path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', params, body } = options;

  if (!READ_METHODS.has(method)) {
    checkWriteRateLimit();
  }

  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.api+json',
  };
  if (body) headers['Content-Type'] = 'application/vnd.api+json';

  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  return handleResponse<T>(res);
}
