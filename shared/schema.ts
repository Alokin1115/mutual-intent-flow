import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Organization invitations table
export const organizationInvitations = pgTable("organization_invitations", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  organization: text("organization").notNull(), // Extracted from email domain
  isVerified: boolean("is_verified").default(false),
  verificationToken: text("verification_token"),
  createdAt: timestamp("created_at").defaultNow(),
  verifiedAt: timestamp("verified_at"),
});

// Waitlist signups table
export const waitlistSignups = pgTable("waitlist_signups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  linkedinX: text("linkedin_x").notNull(),
  reason: text("reason").notNull(),
  isVerified: boolean("is_verified").default(false),
  verificationToken: text("verification_token"),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  verifiedAt: timestamp("verified_at"),
  approvedAt: timestamp("approved_at"),
});

// Organization domains lookup table
export const organizationDomains = pgTable("organization_domains", {
  id: serial("id").primaryKey(),
  domain: text("domain").notNull().unique(),
  organizationName: text("organization_name").notNull(),
  type: text("type").notNull(), // 'university' or 'company'
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertOrganizationInvitationSchema = createInsertSchema(organizationInvitations).pick({
  email: true,
});

export const insertWaitlistSignupSchema = createInsertSchema(waitlistSignups).pick({
  name: true,
  email: true,
  linkedinX: true,
  reason: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertOrganizationInvitation = z.infer<typeof insertOrganizationInvitationSchema>;
export type OrganizationInvitation = typeof organizationInvitations.$inferSelect;
export type InsertWaitlistSignup = z.infer<typeof insertWaitlistSignupSchema>;
export type WaitlistSignup = typeof waitlistSignups.$inferSelect;
