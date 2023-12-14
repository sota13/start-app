DO $$ BEGIN
 CREATE TYPE "Role" AS ENUM('USER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" text,
	"lastName" text,
	"fullName" text,
	"bio" text,
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "Role" DEFAULT 'USER' NOT NULL,
	"isVerfied" boolean DEFAULT false NOT NULL,
	"refreshToken" text,
	"verifyToken" text,
	"verifyTokenExpiry" timestamp(3),
	"forgotPasswordToken" text,
	"forgotPasswordTokenExpiry" timestamp(3)
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Profile_userId_key" ON "Profile" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
