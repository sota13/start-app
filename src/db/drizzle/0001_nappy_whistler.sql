ALTER TABLE "Profile" RENAME COLUMN "firstName" TO "first_name";--> statement-breakpoint
ALTER TABLE "Profile" RENAME COLUMN "lastName" TO "last_name";--> statement-breakpoint
ALTER TABLE "Profile" RENAME COLUMN "fullName" TO "full_name";--> statement-breakpoint
ALTER TABLE "Profile" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "User" RENAME COLUMN "isVerfied" TO "is_verfied";--> statement-breakpoint
ALTER TABLE "User" RENAME COLUMN "refreshToken" TO "refresh_token";--> statement-breakpoint
ALTER TABLE "User" RENAME COLUMN "verifyToken" TO "verify_token";--> statement-breakpoint
ALTER TABLE "User" RENAME COLUMN "verifyTokenExpiry" TO "verify_token_expiry";--> statement-breakpoint
ALTER TABLE "User" RENAME COLUMN "forgotPasswordToken" TO "forgot_password_token";--> statement-breakpoint
ALTER TABLE "User" RENAME COLUMN "forgotPasswordTokenExpiry" TO "forgot_password_token_expiry";--> statement-breakpoint
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_User_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "Profile_userId_key";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Profile_userId_key" ON "Profile" ("user_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
