export interface IncidentAttributes {
  title: string;
  summary?: string;
  status: 'started' | 'mitigated' | 'resolved';
  severity_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateIncidentParams {
  title: string;
  summary?: string;
  severity_id?: string;
  team_ids?: string[];
}

export interface UpdateIncidentParams {
  title?: string;
  summary?: string;
  status?: IncidentAttributes['status'];
  severity_id?: string;
}

export interface ListIncidentsParams {
  status?: IncidentAttributes['status'];
  severity?: string;
  limit?: number;
  page?: number;
}
