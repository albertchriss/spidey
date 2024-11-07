ALTER TABLE "spidey_task" DROP CONSTRAINT "spidey_task_user_id_spidey_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spidey_task" ADD CONSTRAINT "spidey_task_user_id_spidey_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."spidey_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
