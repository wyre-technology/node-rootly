import { request } from '../http.js';
import type { JsonApiList, JsonApiSingle } from '../types/common.js';
import type { IncidentAttributes, CreateIncidentParams, UpdateIncidentParams, ListIncidentsParams } from '../types/incidents.js';

export class IncidentsResource {
  constructor(private readonly token: string) {}

  async list(params?: ListIncidentsParams): Promise<JsonApiList<IncidentAttributes>> {
    const p: Record<string, string> = {};
    if (params?.status) p['filter[status]'] = params.status;
    if (params?.severity) p['filter[severity_slug]'] = params.severity;
    if (params?.limit) p['page[size]'] = String(params.limit);
    if (params?.page) p['page[number]'] = String(params.page);
    return request(this.token, '/incidents', { params: p });
  }

  async get(incidentId: string): Promise<JsonApiSingle<IncidentAttributes>> {
    return request(this.token, `/incidents/${incidentId}`);
  }

  async create(data: CreateIncidentParams): Promise<JsonApiSingle<IncidentAttributes>> {
    const payload: Record<string, unknown> = { data: { type: 'incidents', attributes: { ...data, team_ids: undefined } } };
    if (data.team_ids?.length) {
      (payload.data as Record<string, unknown>).relationships = {
        teams: { data: data.team_ids.map((id) => ({ type: 'teams', id })) },
      };
    }
    return request(this.token, '/incidents', { method: 'POST', body: payload });
  }

  async update(incidentId: string, data: UpdateIncidentParams): Promise<JsonApiSingle<IncidentAttributes>> {
    return request(this.token, `/incidents/${incidentId}`, {
      method: 'PATCH',
      body: { data: { type: 'incidents', id: incidentId, attributes: data } },
    });
  }

  async resolve(incidentId: string): Promise<JsonApiSingle<IncidentAttributes>> {
    return this.update(incidentId, { status: 'resolved' });
  }
}
