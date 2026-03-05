export interface AlertAttributes {
  summary: string;
  status: 'triggered' | 'acknowledged' | 'resolved';
  source?: string;
  severity?: 'critical' | 'warning' | 'info';
  created_at?: string;
  updated_at?: string;
}

export interface CreateAlertParams {
  summary: string;
  source?: string;
  severity?: AlertAttributes['severity'];
}

export interface UpdateAlertParams {
  status?: AlertAttributes['status'];
  summary?: string;
}

export interface ListAlertsParams {
  status?: AlertAttributes['status'];
  limit?: number;
  page?: number;
}
