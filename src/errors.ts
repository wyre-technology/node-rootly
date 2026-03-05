export class RootlyError extends Error {
  constructor(message: string, public statusCode: number, public response: unknown) {
    super(message);
    this.name = 'RootlyError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
export class AuthenticationError extends RootlyError { constructor(m: string, r: unknown) { super(m, 401, r); this.name = 'AuthenticationError'; } }
export class ForbiddenError extends RootlyError { constructor(m: string, r: unknown) { super(m, 403, r); this.name = 'ForbiddenError'; } }
export class NotFoundError extends RootlyError { constructor(m: string, r: unknown) { super(m, 404, r); this.name = 'NotFoundError'; } }
export class ValidationError extends RootlyError { constructor(m: string, r: unknown) { super(m, 422, r); this.name = 'ValidationError'; } }
export class ServerError extends RootlyError { constructor(m: string, code: number, r: unknown) { super(m, code, r); this.name = 'ServerError'; } }
export class RateLimitError extends RootlyError {
  constructor(message: string, public retryAfter: number, response: unknown) {
    super(message, 429, response);
    this.name = 'RateLimitError';
  }
}
