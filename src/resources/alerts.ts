import { request } from '../http.js';
import type { JsonApiList, JsonApiSingle } from '../types/common.js';
import type { AlertAttributes, CreateAlertParams, UpdateAlertParams, ListAlertsParams } from '../types/alerts.js';

export class AlertsResource {
  constructor(private readonly token: string) {}

  async list(params?: ListAlertsParams): Promise<JsonApiList<AlertAttributes>> {
    const p: Record<string, string> = {};
    if (params?.status) p['filter[status]'] = params.status;
    if (params?.limit) p['page[size]'] = String(params.limit);
    if (params?.page) p['page[number]'] = String(params.page);
    return request(this.token, '/alerts', { params: p });
  }

  async acknowledge(alertId: string): Promise<JsonApiSingle<AlertAttributes>> {
    return request(this.token, `/alerts/${alertId}`, {
      method: 'PATCH',
      body: { data: { type: 'alerts', id: alertId, attributes: { status: 'acknowledged' } } },
    });
  }

  async resolve(alertId: string): Promise<JsonApiSingle<AlertAttributes>> {
    return request(this.token, `/alerts/${alertId}`, {
      method: 'PATCH',
      body: { data: { type: 'alerts', id: alertId, attributes: { status: 'resolved' } } },
    });
  }

  async create(data: CreateAlertParams): Promise<JsonApiSingle<AlertAttributes>> {
    return request(this.token, '/alerts', {
      method: 'POST',
      body: { data: { type: 'alerts', attributes: data } },
    });
  }

  async update(alertId: string, data: UpdateAlertParams): Promise<JsonApiSingle<AlertAttributes>> {
    return request(this.token, `/alerts/${alertId}`, {
      method: 'PATCH',
      body: { data: { type: 'alerts', id: alertId, attributes: data } },
    });
  }
}
