import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

// Define roles for the message sender (system, user, assistant)
export const messageRolesEnum = pgEnum("message_role", [
  "system",
  "user",
  "assistant",
]);

// Define the "chat_sessions" table to represent an individual chat session
export const chatSessionsTable = pgTable("chat_sessions", {
  id: text("id").primaryKey(), // Unique identifier for each chat session
  title: text("title").notNull(), // Title of the chat session
  userId: text("user_id").notNull(), // Reference to the user who initiated the session
  path: text("path").notNull(), // Path or identifier for the session
  sharePath: text("share_path"), // Optional path for sharing the session
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(), // Timestamp when the session was created
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .$onUpdate(() => new Date()), // Timestamp when the session was last updated
});

// Define the "messages" table to represent individual messages within a chat session
export const messagesTable = pgTable("messages", {
  id: text("id").primaryKey(), // Unique identifier for each message
  chatSessionId: text("chat_session_id")
    .notNull()
    .references(() => chatSessionsTable.id, { onDelete: "cascade" }), // Reference to the chat session
  role: messageRolesEnum("role").notNull(), // Role of the message sender (system, user, assistant)
  content: text("content").notNull(), // Content of the message
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(), // Timestamp when the message was created
});

// Define the relationship between chat sessions and messages
export const chatSessionRelations = relations(
  chatSessionsTable,
  ({ many }) => ({
    messages: many(messagesTable), // A chat session can have multiple messages
  }),
);

// Define the relationship between messages and their parent chat session
export const messagesRelations = relations(messagesTable, ({ one }) => ({
  chatSession: one(chatSessionsTable, {
    fields: [messagesTable.chatSessionId],
    references: [chatSessionsTable.id],
  }),
}));
