# @wyre-technology/node-rootly

Node.js client library for the [Rootly](https://rootly.com) incident management API.

Zero production dependencies. Uses native `fetch` (Node 18+).

## Installation

```bash
npm install @wyre-technology/node-rootly
```

For GitHub Packages authentication, add to your `.npmrc`:

```
@wyre-technology:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## Usage

```typescript
import { RootlyClient } from '@wyre-technology/node-rootly';

const client = new RootlyClient({ apiToken: process.env.ROOTLY_API_TOKEN });

// List triggered alerts
const alerts = await client.alerts.list({ status: 'triggered' });

// Acknowledge an alert
await client.alerts.acknowledge('alert-id');

// Resolve an incident
await client.incidents.resolve('incident-id');

// Create a team
const team = await client.teams.create({ name: 'Platform', color: '#3B82F6' });

// Safe partial update (GET → merge → PUT)
await client.teams.patch('team-id', { description: 'Updated description' });
```

## API Reference

### `RootlyClient`

```typescript
const client = new RootlyClient({ apiToken?: string });
// Falls back to process.env.ROOTLY_API_TOKEN if apiToken is omitted
```

### `client.alerts`
- `list(params?)` — list alerts
- `acknowledge(id)` — acknowledge
- `resolve(id)` — resolve
- `create(data)` — create
- `update(id, data)` — update

### `client.incidents`
- `list(params?)` — list incidents
- `get(id)` — get by ID
- `create(data)` — create
- `update(id, data)` — update
- `resolve(id)` — resolve

### `client.teams`
- `list(params?)` — list teams
- `get(id)` — get by ID
- `create(data)` — create
- `update(id, data)` — PUT (full replace)
- `patch(id, data)` — safe partial update (GET→merge→PUT)
- `delete(id)` — delete

### `client.schedules`
- `list(params?)` — list on-call schedules
- `get(id)` — get by ID

### `client.severities`
- `list()` — list severity levels

### `client.users`
- `me()` — get current authenticated user

## Development

```bash
git clone https://github.com/wyre-technology/node-rootly.git
cd node-rootly
npm install
npm run build
npm test
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Apache-2.0 © WYRE Technology
