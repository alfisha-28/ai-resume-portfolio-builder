const { PrismaClient } = require("@prisma/client");
const { neonConfig } = require("@neondatabase/serverless");
const { PrismaNeon } = require("@prisma/adapter-neon");
const ws = require("ws");

let prisma;
const connectionString = process.env.DATABASE_URL;

if (connectionString && connectionString.includes("neon.tech")) {
  neonConfig.webSocketConstructor = ws;
  const adapter = new PrismaNeon({ connectionString });
  prisma = new PrismaClient({ adapter });
} else {
  prisma = new PrismaClient();
}

module.exports = prisma;