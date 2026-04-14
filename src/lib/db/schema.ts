import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  pgEnum,
  jsonb,
} from 'drizzle-orm/pg-core';

// Enums
export const severityEnum = pgEnum('severity', ['low', 'medium', 'high', 'critical']);
export const statusEnum = pgEnum('status', ['open', 'in-progress', 'resolved']);

// Projects Table (Optional for multi-tenant, assuming a single tenant or project based for now)
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  apiKey: varchar('api_key', { length: 255 }).notNull(), // API key for external SDK reporting
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Bugs Table
export const bugs = pgTable('bugs', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  severity: severityEnum('severity').default('medium').notNull(),
  status: statusEnum('status').default('open').notNull(),
  assignedTo: varchar('assigned_to', { length: 255 }), // Clerk User ID
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Sessions Table (Stores Replay Information)
export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id),
  bugId: uuid('bug_id').references(() => bugs.id), // Link to a bug if it was generated with a bug report
  blobUrl: varchar('blob_url', { length: 1024 }), // URL to Vercel string containing massive JSON array
  browser: varchar('browser', { length: 100 }),
  os: varchar('os', { length: 100 }),
  url: varchar('url', { length: 255 }),
  duration: varchar('duration', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Logs & Events Table (To show specific errors alongside sessions)
export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => sessions.id).notNull(),
  type: varchar('type', { length: 100 }).notNull(), // 'network_error', 'console_error', 'ui_interaction'
  data: jsonb('data'), // Dynamic payload for error stack, network statuses, etc.
  timestamp: timestamp('timestamp').notNull(),
});
