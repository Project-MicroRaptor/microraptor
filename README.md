## Getting Started

```bash
git clone https://github.com/Project-MicroRaptor/microraptor
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Some environment variables are required for the functionality of this application.

All environment variables beginning with `AUTH0` are secret variables. You can get these from Brandon, or by creating your own Auth0 application for testing.

| Environment Variable  | Example                                       |
|-----------------------|-----------------------------------------------|
| AUTH0_ISSUER_BASE_URL | https://microraptor.au.auth0.com              |
| AUTH0_CLIENT_ID       | clientId                                      |
| AUTH0_CLIENT_SECRET   | clientSecret                                  |

## Pull Requests

Pull Requests should have a minimum of two approvals before merging

Pull Requests should be merged with Squash and merge

Please include the Jira issue with a detailed description and title to all PRs