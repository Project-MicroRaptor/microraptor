## Prerequisites

- NodeJS LTS (>16.16.0) https://nodejs.org/en/
- PostgreSQL https://www.postgresql.org/download/

## Getting Started

```bash
git clone https://github.com/Project-MicroRaptor/microraptor
npm install
npx prisma generate && npx prisma migrate dev # This should be run every time a new migration is added
npx prisma db seed # this will populate the database tables with data as set out in the seed.tsx file
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Some environment variables are required for the functionality of this application.

All environment variables beginning with `AUTH0` are secret variables. You can get these from Brandon, or by creating your own Auth0 application for testing.

`DATABASE_URL` should point to your local instance of Postgres. The format can be found in the table below.

| Environment Variable  | Example                                       |
|-----------------------|-----------------------------------------------|
| AUTH0_ISSUER_BASE_URL | https://microraptor.au.auth0.com              |
| AUTH0_CLIENT_ID       | clientId                                      |
| AUTH0_CLIENT_SECRET   | clientSecret                                  |
| DATABASE_URL          | postgresql://USER:PASSWORD@HOST:PORT/DATABASE |

## Pull Requests

Pull Requests should have a minimum of two approvals before merging

Pull Requests should be merged with Squash and merge

Please include the Jira issue with a detailed description and title to all PRs

When reviewing PRs, make sure that you run the branch locally and test to make sure everything is working as intended.