import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

declare global {
  var prisma:
    | PrismaClient<{
        adapter: PrismaNeon;
        log: ("warn" | "error")[];
      }>
    | undefined;
}

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    omit: {
      user: {
        password: true,
      },
      session: {
        sessionToken: true,
      },
    },
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
