export const fixtures = {
  alerts: {
    list: { data: [
      { id: 'a1', type: 'alerts', attributes: { summary: 'CPU high', status: 'triggered', source: 'dd', severity: 'critical' } },
    ], meta: { total_count: 1 } },
    single: { data: { id: 'a1', type: 'alerts', attributes: { summary: 'CPU high', status: 'acknowledged', source: 'dd', severity: 'critical' } } },
  },
  incidents: {
    list: { data: [
      { id: 'i1', type: 'incidents', attributes: { title: 'DB down', status: 'started' } },
    ], meta: { total_count: 1 } },
    single: { data: { id: 'i1', type: 'incidents', attributes: { title: 'DB down', status: 'started' } } },
  },
  teams: {
    list: { data: [
      { id: 't1', type: 'teams', attributes: { name: 'Platform', description: 'Plat team', color: '#3B82F6', notify_emails: [] } },
    ], meta: { total_count: 1 } },
    single: { data: { id: 't1', type: 'teams', attributes: { name: 'Platform', description: 'Plat team', color: '#3B82F6', notify_emails: [] } } },
  },
  user: { data: { id: 'u1', type: 'users', attributes: { name: 'Test User', email: 'test@example.com' } } },
  severities: { data: [
    { id: 's1', type: 'severities', attributes: { name: 'SEV1', slug: 'sev1', color: '#DC2626' } },
  ] },
};
