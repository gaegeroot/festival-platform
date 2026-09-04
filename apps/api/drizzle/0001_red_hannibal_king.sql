CREATE TABLE `artists` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sets` (
	`id` text PRIMARY KEY NOT NULL,
	`stage_id` text NOT NULL,
	`artist_id` text NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	FOREIGN KEY (`stage_id`) REFERENCES `stages`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `stages` (
	`id` text PRIMARY KEY NOT NULL,
	`festival_id` text NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`festival_id`) REFERENCES `festivals`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stages_festival_name_unique` ON `stages` (`festival_id`,`name`);--> statement-breakpoint
ALTER TABLE `festivals` ADD `timezone` text NOT NULL;--> statement-breakpoint
ALTER TABLE `festivals` ADD `start_time` text NOT NULL;--> statement-breakpoint
ALTER TABLE `festivals` ADD `end_time` text NOT NULL;--> statement-breakpoint
ALTER TABLE `festivals` DROP COLUMN `city`;--> statement-breakpoint
ALTER TABLE `festivals` DROP COLUMN `state`;--> statement-breakpoint
ALTER TABLE `festivals` DROP COLUMN `start_date`;--> statement-breakpoint
ALTER TABLE `festivals` DROP COLUMN `end_date`;