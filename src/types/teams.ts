export interface TeamAttributes {
  name: string;
  description?: string;
  color?: string;
  notify_emails?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateTeamParams {
  name: string;
  description?: string;
  color?: string;
  notify_emails?: string[];
  user_ids?: string[];
}

export interface UpdateTeamParams {
  name?: string;
  description?: string;
  color?: string;
  notify_emails?: string[];
  user_ids?: string[];
}
