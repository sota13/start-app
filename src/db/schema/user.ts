import { pgTable, pgEnum, timestamp, text, integer, uniqueIndex, serial, boolean } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm';

export const role = pgEnum("Role", ['USER', 'ADMIN'])




export const user = pgTable("User", {
	id: serial("id").primaryKey().notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	role: role("role").default('USER').notNull(),
	isVerfied: boolean("is_verfied").default(false).notNull(),
	refreshToken: text("refresh_token"),
	verifyToken: text("verify_token"),
	verifyTokenExpiry: timestamp("verify_token_expiry", { precision: 3, mode: 'string' }),
	forgotPasswordToken: text("forgot_password_token"),
	forgotPasswordTokenExpiry: timestamp("forgot_password_token_expiry", { precision: 3, mode: 'string' }),
},
(table) => {
	return {
		emailKey: uniqueIndex("User_email_key").on(table.email),
	}
});


export const userRelations = relations(user, ({ one }) => ({
	profile: one(profile),
  }));


export const profile = pgTable("Profile", {
	id: serial("id").primaryKey().notNull(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	fullName: text("full_name"),
	bio: text("bio"),
	userId: integer("user_id").notNull().references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" }  ),
},
(table) => {
	return {
		userIdKey: uniqueIndex("Profile_userId_key").on(table.userId),
	}
});

export const profileRelations = relations(profile, ({ one }) => ({
	user: one(user, {
		fields: [profile.userId],
		references: [user.id],
	  }),
  }));