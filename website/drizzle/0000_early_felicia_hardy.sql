CREATE TABLE `workshop_attempts` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `workshop_attempts_expiry` ON `workshop_attempts` (`expires_at`);--> statement-breakpoint
CREATE TABLE `workshop_sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`password_version` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `workshop_sessions_expiry` ON `workshop_sessions` (`expires_at`);