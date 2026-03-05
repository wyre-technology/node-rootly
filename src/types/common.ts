export interface JsonApiResource<T> {
  id: string;
  type: string;
  attributes: T;
  relationships?: Record<string, unknown>;
}

export interface JsonApiList<T> {
  data: JsonApiResource<T>[];
  meta?: { total_count?: number; current_page?: number };
  links?: Record<string, string>;
}

export interface JsonApiSingle<T> {
  data: JsonApiResource<T>;
}

export interface ListParams {
  limit?: number;
  page?: number;
}
