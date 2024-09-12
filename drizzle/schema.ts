import { pgTable, serial, text, timestamp, varchar, foreignKey, integer, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const userSystemEnum = pgEnum("user_system_enum", ['system', 'user'])



export const chats = pgTable("chats", {
	id: serial("id").primaryKey().notNull(),
	pdfName: text("pdf_name").notNull(),
	pdfUrl: text("pdf_url").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	userId: varchar("user_id", { length: 256 }).notNull(),
	fileKey: text("file_key").notNull(),
});

export const messages = pgTable("messages", {
	id: serial("id").primaryKey().notNull(),
	chatId: integer("chat_id").notNull(),
	content: text("content").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	role: userSystemEnum("role").notNull(),
},
(table) => {
	return {
		messagesChatIdChatsIdFk: foreignKey({
			columns: [table.chatId],
			foreignColumns: [chats.id],
			name: "messages_chat_id_chats_id_fk"
		}),
	}
});