CREATE TABLE IF NOT EXISTS "spidey_task" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"user_id" varchar(255) NOT NULL
);
--> statement-breakpoint
DROP TABLE "spidey_post";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spidey_task" ADD CONSTRAINT "spidey_task_user_id_spidey_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."spidey_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "spidey_task" USING btree ("user_id");