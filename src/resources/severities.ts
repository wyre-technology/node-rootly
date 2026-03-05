import { request } from '../http.js';
import type { JsonApiList } from '../types/common.js';

export interface SeverityAttributes {
  name: string;
  slug: string;
  color?: string;
  description?: string;
}

export class SeveritiesResource {
  constructor(private readonly token: string) {}

  async list(): Promise<JsonApiList<SeverityAttributes>> {
    return request(this.token, '/severities');
  }
}
