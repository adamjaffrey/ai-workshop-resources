import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const workshopSessions = sqliteTable("workshop_sessions", {
  tokenHash: text("token_hash").primaryKey(),
  expiresAt: integer("expires_at").notNull(),
  passwordVersion: text("password_version").notNull(),
}, table => [index("workshop_sessions_expiry").on(table.expiresAt)]);
export const workshopAttempts = sqliteTable("workshop_attempts", {
  key: text("key").primaryKey(),
  count: integer("count").notNull(),
  expiresAt: integer("expires_at").notNull(),
}, table => [index("workshop_attempts_expiry").on(table.expiresAt)]);
