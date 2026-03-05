import { describe, it, expect, beforeEach } from 'vitest';
import { RootlyClient } from '../../src/client.js';

describe('RootlyClient', () => {
  it('throws if no token provided', () => {
    const saved = process.env.ROOTLY_API_TOKEN;
    delete process.env.ROOTLY_API_TOKEN;
    expect(() => new RootlyClient()).toThrow(/token is required/i);
    if (saved) process.env.ROOTLY_API_TOKEN = saved;
  });

  it('accepts token via config', () => {
    expect(() => new RootlyClient({ apiToken: 'test-token' })).not.toThrow();
  });

  it('reads token from env var', () => {
    process.env.ROOTLY_API_TOKEN = 'env-token';
    expect(() => new RootlyClient()).not.toThrow();
  });

  describe('alerts', () => {
    let client: RootlyClient;
    beforeEach(() => { client = new RootlyClient({ apiToken: 'test-token' }); });

    it('list returns data array', async () => {
      const result = await client.alerts.list();
      expect(result.data).toHaveLength(1);
      expect(result.data[0].attributes.summary).toBe('CPU high');
    });

    it('acknowledge sets status', async () => {
      const result = await client.alerts.acknowledge('a1');
      expect(result.data.attributes.status).toBe('acknowledged');
    });

    it('resolve sets status', async () => {
      const result = await client.alerts.resolve('a1');
      expect(result.data.attributes.status).toBe('resolved');
    });

    it('create returns new alert', async () => {
      const result = await client.alerts.create({ summary: 'New alert' });
      expect(result.data.id).toBe('a-new');
    });
  });

  describe('incidents', () => {
    let client: RootlyClient;
    beforeEach(() => { client = new RootlyClient({ apiToken: 'test-token' }); });

    it('list returns incidents', async () => {
      const result = await client.incidents.list();
      expect(result.data[0].attributes.title).toBe('DB down');
    });

    it('get returns single incident', async () => {
      const result = await client.incidents.get('i1');
      expect(result.data.id).toBe('i1');
    });

    it('create returns new incident', async () => {
      const result = await client.incidents.create({ title: 'New incident' });
      expect(result.data.attributes.title).toBe('New incident');
    });

    it('resolve sets status to resolved', async () => {
      const result = await client.incidents.resolve('i1');
      expect(result.data.attributes.status).toBe('resolved');
    });
  });

  describe('teams', () => {
    let client: RootlyClient;
    beforeEach(() => { client = new RootlyClient({ apiToken: 'test-token' }); });

    it('list returns teams', async () => {
      const result = await client.teams.list();
      expect(result.data[0].attributes.name).toBe('Platform');
    });

    it('get returns team', async () => {
      const result = await client.teams.get('t1');
      expect(result.data.id).toBe('t1');
    });

    it('create returns new team', async () => {
      const result = await client.teams.create({ name: 'New Team' });
      expect(result.data.attributes.name).toBe('New Team');
    });

    it('delete resolves without error', async () => {
      await expect(client.teams.delete('t1')).resolves.toBeUndefined();
    });

    it('patch merges changes safely', async () => {
      const result = await client.teams.patch('t1', { description: 'New desc' });
      // Name should be preserved from the GET
      expect(result.data.attributes.name).toBe('Platform');
      expect(result.data.attributes.description).toBe('New desc');
    });
  });

  describe('org', () => {
    let client: RootlyClient;
    beforeEach(() => { client = new RootlyClient({ apiToken: 'test-token' }); });

    it('severities list', async () => {
      const result = await client.severities.list();
      expect(result.data[0].attributes.slug).toBe('sev1');
    });

    it('current user', async () => {
      const result = await client.users.me();
      expect(result.data.attributes.email).toBe('test@example.com');
    });
  });
});
