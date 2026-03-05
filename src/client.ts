import { AlertsResource } from './resources/alerts.js';
import { IncidentsResource } from './resources/incidents.js';
import { TeamsResource } from './resources/teams.js';
import { SchedulesResource } from './resources/schedules.js';
import { SeveritiesResource } from './resources/severities.js';
import { UsersResource } from './resources/users.js';

export interface RootlyClientConfig {
  /** Rootly API token. If omitted, reads from ROOTLY_API_TOKEN env var. */
  apiToken?: string;
}

export class RootlyClient {
  readonly alerts: AlertsResource;
  readonly incidents: IncidentsResource;
  readonly teams: TeamsResource;
  readonly schedules: SchedulesResource;
  readonly severities: SeveritiesResource;
  readonly users: UsersResource;

  constructor(config?: RootlyClientConfig) {
    const token = config?.apiToken ?? process.env.ROOTLY_API_TOKEN;
    if (!token) {
      throw new Error('Rootly API token is required. Pass apiToken or set ROOTLY_API_TOKEN.');
    }
    this.alerts = new AlertsResource(token);
    this.incidents = new IncidentsResource(token);
    this.teams = new TeamsResource(token);
    this.schedules = new SchedulesResource(token);
    this.severities = new SeveritiesResource(token);
    this.users = new UsersResource(token);
  }
}
