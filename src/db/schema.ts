import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  serial,
  text,
  timestamp,
  json,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const User = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId:text('clerk_id').notNull(),
  email: varchar("email").unique().notNull(),
  name:text('name').notNull(),
  profileImage: varchar("profile_image"),
  subscription: boolean("subscription").default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  dodopaymentsApiKey: varchar("dodopayments_api_key"),
  storeId: varchar("store_id"),
  webhookSecret: varchar("webhook_secret"),
});

// Relation for Owned and Purchased Projects
export const UserRelations = relations(User, ({ many }) => ({
  ownedProjects: many(Project), // A user can own multiple projects
  purchasedProjects: many(Purchasers), // A user can purchase multiple projects
}));

export const Project = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  slides: json("slides").$type<any>(),
  userId: uuid("user_id")
    .notNull()
    .references(() => User.id),
  outlines: text("outlines").array().notNull(),
  isDeleted: boolean("is_deleted").default(false),
  isSellable: boolean("is_sellable").default(false),
  variantId: uuid("variant_id"),
  thumbnail: varchar("thumbnail"),
  themeName: varchar("theme_name").default("light"),
});

// Relation for Owned and Purchased Projects
export const ProjectRelations = relations(Project, ({ one, many }) => ({
  owner: one(User, { fields: [Project.userId], references: [User.id] }), // Owner of the project
  purchasers: many(Purchasers), // Many users can purchase a project
}));

export const Purchasers = pgTable("purchasers", {
  userId: uuid("user_id")
    .notNull()
    .references(() => User.id),
  projectId: uuid("project_id")
    .notNull()
    .references(() => Project.id),
});

// Define relation between users and purchased projects
export const PurchasersRelations = relations(Purchasers, ({ one }) => ({
  user: one(User, { fields: [Purchasers.userId], references: [User.id] }),
  project: one(Project, {
    fields: [Purchasers.projectId],
    references: [Project.id],
  }),
}));
