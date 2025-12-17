# Prisma Setup Documentation

## Overview

This project uses **Prisma 7** as the ORM for database management with PostgreSQL. The setup follows Next.js App Router best practices with a singleton client pattern for development hot-reload safety.

## Files Created/Modified

### Created Files:

1. **`prisma/schema.prisma`** - Prisma schema with User model
2. **`prisma.config.ts`** - Prisma 7 configuration file (auto-generated)
3. **`src/lib/prisma.ts`** - Singleton Prisma client
4. **`src/app/api/users/route.ts`** - Example API route using Prisma
5. **`.env.example`** - Environment variable template

### Modified Files:

- **`package.json`** - Added dependencies:
  - `prisma` - Prisma CLI
  - `@prisma/client` - Prisma Client
  - `@prisma/adapter-pg` - PostgreSQL adapter for Prisma 7
  - `pg` - PostgreSQL driver
  - `@types/pg` - TypeScript types for pg

## Database Configuration

### Environment Variables

The database connection is configured via environment variables in `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/delytics?schema=public"
```

**Important:**

- Never commit `.env` to version control
- Copy `.env.example` to `.env` and update with your actual credentials
- The `DATABASE_URL` is referenced in `prisma.config.ts` (Prisma 7 pattern)

### Prisma 7 Changes

Prisma 7 introduced significant architectural changes:

- ✅ Connection URL is in `prisma.config.ts` (not in schema.prisma)
- ✅ Requires database adapter (e.g., `@prisma/adapter-pg` for PostgreSQL)
- ✅ Uses connection pooling via `pg` driver
- ❌ No `url` property in `datasource` block in schema

## Schema

### User Model

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

## Singleton Prisma Client

Located at `src/lib/prisma.ts`, this prevents multiple Prisma instances during Next.js hot-reload:

```typescript
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Create singleton client
export const prisma = new PrismaClient({ adapter });
```

**Usage:**

```typescript
import prisma from "@/lib/prisma";

const users = await prisma.user.findMany();
```

**Features:**

- Singleton pattern for development
- PostgreSQL adapter with connection pooling
- Conditional logging (verbose in dev, errors only in prod)
- TypeScript support
- Compatible with Next.js App Router and serverless

## Commands Run

```bash
# 1. Install Prisma dependencies
npm install prisma @prisma/client @prisma/adapter-pg pg
npm install --save-dev @types/pg

# 2. Initialize Prisma (creates schema and config)
npx prisma init

# 3. Generate Prisma Client
npx prisma generate

# 4. Create and run migrations (when ready)
npx prisma migrate dev --name init

# 5. Open Prisma Studio (database GUI)
npx prisma studio
```

## Example Usage

### API Route (`src/app/api/users/route.ts`)

**GET /api/users** - Fetch all users:

```typescript
import prisma from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ success: true, data: users });
}
```

**POST /api/users** - Create a user:

```typescript
export async function POST(request: Request) {
  const { email, name, role } = await request.json();

  const user = await prisma.user.create({
    data: { email, name, role: role || "user" },
  });

  return NextResponse.json({ success: true, data: user });
}
```

### Server Component

```typescript
import prisma from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
}
```

## Next Steps

1. **Set up your database:**

   ```bash
   # Option 1: Local PostgreSQL
   # Update DATABASE_URL in .env with your local credentials

   # Option 2: Cloud database (Supabase, Railway, etc.)
   # Get connection string and update DATABASE_URL
   ```

2. **Run migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

3. **Seed database (optional):**
   Create `prisma/seed.ts` for initial data

4. **Add more models:**
   Edit `prisma/schema.prisma` and run `npx prisma migrate dev`

## Production Considerations

- ✅ Database URL from environment variables only
- ✅ Singleton client prevents connection pool exhaustion
- ✅ Error logging configured per environment
- ✅ TypeScript types auto-generated
- ✅ Compatible with serverless/edge functions
- ✅ No client-side database access

## Troubleshooting

**Issue: "PrismaClient is unable to run in the browser"**

- Solution: Only import Prisma in server components or API routes

**Issue: "Can't reach database server"**

- Check DATABASE_URL is correct
- Ensure database is running
- Verify network/firewall settings

**Issue: Multiple Prisma instances in development**

- This is handled by the singleton pattern in `src/lib/prisma.ts`

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma with Next.js](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Prisma 7 Migration Guide](https://www.prisma.io/docs/guides/upgrade-guides/upgrading-versions/upgrading-to-prisma-7)
