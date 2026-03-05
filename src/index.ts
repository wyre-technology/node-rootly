export { RootlyClient } from './client.js';
export type { RootlyClientConfig } from './client.js';

// Resources (for direct use)
export { AlertsResource } from './resources/alerts.js';
export { IncidentsResource } from './resources/incidents.js';
export { TeamsResource } from './resources/teams.js';
export { SchedulesResource } from './resources/schedules.js';
export { SeveritiesResource } from './resources/severities.js';
export { UsersResource } from './resources/users.js';

// Types
export * from './types/index.js';

// Errors
export {
  RootlyError, AuthenticationError, ForbiddenError, NotFoundError,
  ValidationError, RateLimitError, ServerError,
} from './errors.js';
