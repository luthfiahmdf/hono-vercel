import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { v4 as uuid4 } from "uuid";
export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid4()),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const categories = pgTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid4()),
  name: text("category_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export const bookSources = pgTable("book_sources", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid4()),
  name: text("source_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export type BookSource = typeof bookSources.$inferSelect;
export type NewBookSource = typeof bookSources.$inferInsert;

export const books = pgTable("books", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid4()),
  title: text("title").notNull(),
  author: text("author").notNull(),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  bookSourcesId: text("book_sources_id")
    .notNull()
    .references(() => bookSources.id, {
      onUpdate: "cascade",
      onDelete: "restrict",
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export type TBook = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;

// relations
export const categoryBookRelation = relations(categories, ({ many }) => ({
  books: many(books),
}));
export const bookSourceRelation = relations(bookSources, ({ many }) => ({
  books: many(books),
}));
export const booksRelations = relations(books, ({ one }) => ({
  category: one(categories, {
    fields: [books.categoryId],
    references: [categories.id],
  }),
  bookSource: one(bookSources, {
    fields: [books.bookSourcesId],
    references: [bookSources.id],
  }),
}));
