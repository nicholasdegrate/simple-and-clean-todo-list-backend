# Todo List Application

A full-stack todo list application built with Node.js/Express backend

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (>=18.0.0) - [Download](https://nodejs.org/)
- **pnpm** (>=10.11.0) - [Install](https://pnpm.io/installation)
- **Docker & Docker Compose** - [Install](https://docs.docker.com/get-docker/)
- **Git** - [Install](https://git-scm.com/downloads)

Verify installations:

```bash
node --version
pnpm --version
docker --version
docker-compose --version
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

```bash
cp env.example .env
```

Update `.env` with your configuration if needed. Default values should work for local development.

### 4. Start Database Services

```bash
docker-compose up -d
```

This will start:

- **MySQL database** on port `3306`
- **MySQL shadow database** on port `3307` (for Prisma migrations)
- **Adminer** on port `8080` (database management UI)

### 5. Verify Database Connection

Check if containers are running:

```bash
docker-compose ps
```

You should see three containers running: `todo_mysql`, `todo_mysql_shadow`, and `todo_adminer`.

## Database Setup

### 1. Generate Prisma Client

```bash
pnpm prisma generate
```

### 2. Run Database Migrations

```bash
pnpm prisma migrate deploy
```

### To Run Application

```bash
pnpm dev
```

# Create a new task

```bash
curl -X POST http://localhost:3000/api/v1/tasks \
 -H "Content-Type: application/json" \
 -d '{"title": "Learn TypeScript", "color": "#3B82F6"}'
```

## Additional Notes

- The backend uses **TypeScript** with **Express** and **Prisma ORM**
- Database uses **MySQL 8.0** with Docker
- All services are configured for local development
- Hot reloading is enabled for both backend
# simple-and-clean-todo-list-backend
