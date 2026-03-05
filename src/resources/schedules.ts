import { request } from '../http.js';
import type { JsonApiList, JsonApiSingle, ListParams } from '../types/common.js';

export interface ScheduleAttributes {
  name: string;
  description?: string;
  timezone?: string;
}

export class SchedulesResource {
  constructor(private readonly token: string) {}

  async list(params?: ListParams): Promise<JsonApiList<ScheduleAttributes>> {
    const p: Record<string, string> = {};
    if (params?.limit) p['page[size]'] = String(params.limit);
    if (params?.page) p['page[number]'] = String(params.page);
    return request(this.token, '/on_call_schedules', { params: p });
  }

  async get(scheduleId: string): Promise<JsonApiSingle<ScheduleAttributes>> {
    return request(this.token, `/on_call_schedules/${scheduleId}`);
  }
}
