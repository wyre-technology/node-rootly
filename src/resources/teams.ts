import { request } from '../http.js';
import type { JsonApiList, JsonApiSingle, ListParams } from '../types/common.js';
import type { TeamAttributes, CreateTeamParams, UpdateTeamParams } from '../types/teams.js';

export class TeamsResource {
  constructor(private readonly token: string) {}

  async list(params?: ListParams): Promise<JsonApiList<TeamAttributes>> {
    const p: Record<string, string> = {};
    if (params?.limit) p['page[size]'] = String(params.limit);
    if (params?.page) p['page[number]'] = String(params.page);
    return request(this.token, '/teams', { params: p });
  }

  async get(teamId: string): Promise<JsonApiSingle<TeamAttributes>> {
    return request(this.token, `/teams/${teamId}`);
  }

  async create(data: CreateTeamParams): Promise<JsonApiSingle<TeamAttributes>> {
    const { user_ids, ...attrs } = data;
    const payload: Record<string, unknown> = { data: { type: 'teams', attributes: attrs } };
    if (user_ids?.length) {
      (payload.data as Record<string, unknown>).relationships = {
        users: { data: user_ids.map((id) => ({ type: 'users', id })) },
      };
    }
    return request(this.token, '/teams', { method: 'POST', body: payload });
  }

  async update(teamId: string, data: UpdateTeamParams): Promise<JsonApiSingle<TeamAttributes>> {
    const { user_ids, ...attrs } = data;
    const payload: Record<string, unknown> = { data: { type: 'teams', id: teamId, attributes: attrs } };
    if (user_ids !== undefined) {
      (payload.data as Record<string, unknown>).relationships = {
        users: { data: user_ids.map((id) => ({ type: 'users', id })) },
      };
    }
    return request(this.token, `/teams/${teamId}`, { method: 'PUT', body: payload });
  }

  async patch(teamId: string, data: UpdateTeamParams): Promise<JsonApiSingle<TeamAttributes>> {
    const current = await this.get(teamId);
    const mergedAttrs = { ...current.data.attributes, ...data };
    return this.update(teamId, mergedAttrs);
  }

  async delete(teamId: string): Promise<void> {
    await request(this.token, `/teams/${teamId}`, { method: 'DELETE' });
  }
}
