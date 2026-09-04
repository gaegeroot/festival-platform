# Festival

Festival is a full-stack application for managing and exploring festival data.

## Tech Stack

* **Runtime / package manager:** Bun
* **Frontend:** React + Vite
* **API:** Hono
* **Database:** SQLite
* **ORM / migrations:** Drizzle ORM
* **Architecture:** Bun workspace monorepo

## Prerequisites

You must have **Bun** installed.

Install Bun by following the [official installation instructions](https://bun.com/docs/installation).

Verify your installation:

```bash
bun --version
```

## Getting Started

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd festival
bun install
```

Start the development environment:

```bash
bun run dev
```

That's it.

The development command automatically:

1. Initializes and migrates the local SQLite database
2. Seeds the database if it is empty
3. Starts the API
4. Starts the frontend

### Local URLs

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **API:** [http://localhost:3000](http://localhost:3000)
* **API health check:** [http://localhost:3000/api/health](http://localhost:3000/api/health)

## Frontend

The frontend application lives in:

```text
apps/web/
```

Frontend source code is located in:

```text
apps/web/src/
```

The frontend runs on Vite and communicates with the local Hono API through the `/api` development proxy.

## Database

The local development database is a SQLite file located at:

```text
apps/api/data/festival.sqlite
```

The database is intentionally **not committed to Git**. It is created automatically when needed.

### Database Commands

| Command | Purpose |
| --- | --- |
| `bun run db:setup` | Apply migrations and seed an empty database |
| `bun run db:reset` | Delete the local database, recreate it, and seed it |
| `bun run dev` | Set up the database and start the development environment |

### Schema Changes

When the database schema changes, generate a migration:

```bash
bun run --cwd apps/api db:generate
```

Then apply the migration:

```bash
bun run db:setup
```

Migration files are committed to the repository so every developer and environment can reproduce the same database schema.

## Project Structure

```text
festival/
├── apps/
│   ├── api/              # Hono API
│   │   ├── src/
│   │   │   ├── db/       # Database client, schema, seed, and reset
│   │   │   └── routes/   # API routes
│   │   └── drizzle/      # Database migrations
│   │
│   └── web/              # React frontend
│       └── src/          # Frontend source code
│
├── packages/             # Shared packages
│   └── contracts/        # Shared API contracts
│
├── package.json          # Workspace configuration and root scripts
└── bun.lock              # Root dependency lockfile
```

## Git Workflow

The `main` branch is the protected default branch. Changes should be made through pull requests rather than directly on `main`.

### Branch Naming

Create a branch using a prefix that describes the type of work:

```text
feat/       New functionality
fix/        Bug fixes
chore/      Tooling, configuration, or maintenance
refactor/   Code restructuring
docs/       Documentation
test/       Tests
```

For example:

```bash
git checkout -b feat/festival-search
```

### Pull Requests

1. Create a feature branch from `main`
2. Make and commit your changes
3. Push the branch to GitHub
4. Open a pull request against `main`
5. Have another contributor review and approve the PR
6. Merge the PR into `main`

Direct pushes to `main` should be avoided.

## Development Workflow

Create a feature branch:

```bash
git checkout -b feat/my-feature
```

Start the application:

```bash
bun run dev
```

Make your changes, then commit and push your branch:

```bash
git add .
git commit -m "feat: describe the change"
git push -u origin feat/my-feature
```

Open a pull request against `main` when the work is ready for review.

## Useful Commands

```bash
# Install dependencies
bun install

# Start frontend + API
bun run dev

# Set up database
bun run db:setup

# Reset local database
bun run db:reset

# Generate a database migration
bun run --cwd apps/api db:generate

# Build the frontend
bun run --cwd apps/web build
```
