import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from './mocks/server.js';
import { _resetWriteWindow } from '../src/rate-limiter.js';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { server.resetHandlers(); _resetWriteWindow(); });
afterAll(() => server.close());
