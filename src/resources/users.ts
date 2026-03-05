import { request } from '../http.js';
import type { JsonApiSingle } from '../types/common.js';

export interface UserAttributes {
  name: string;
  email: string;
  role?: string;
}

export class UsersResource {
  constructor(private readonly token: string) {}

  async me(): Promise<JsonApiSingle<UserAttributes>> {
    return request(this.token, '/users/me');
  }
}
