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

## Database

The local development database is a SQLite file located at:

```text
apps/api/data/festival.sqlite
```

The database is intentionally **not committed to Git**. It is created automatically when needed.

### Database Commands

| Command            | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| `bun run db:setup` | Apply migrations and seed an empty database               |
| `bun run db:reset` | Delete the local database, recreate it, and seed it       |
| `bun run dev`      | Set up the database and start the development environment |

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
│   ├── api/          # Hono API
│   │   ├── src/
│   │   │   ├── db/   # Database client, schema, and seed
│   │   │   └── routes/
│   │   └── drizzle/  # Database migrations
│   │
│   └── web/          # React frontend
│
├── packages/         # Shared packages
│   └── contracts/
│
├── package.json      # Workspace configuration and root scripts
└── bun.lock          # Root dependency lockfile
```

## Development Workflow

Create a feature branch:

```bash
git checkout -b feat/my-feature
```

Start the application:

```bash
bun run dev
```

Make your changes, then commit and open a pull request against `main`.

The `main` branch is protected and changes should be made through pull requests.

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
