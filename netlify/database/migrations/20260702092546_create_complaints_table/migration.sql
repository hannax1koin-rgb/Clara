CREATE TABLE "complaints" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"details" text NOT NULL,
	"impact" text NOT NULL,
	"status" text DEFAULT 'لم يتم الحل' NOT NULL,
	"compensation_link" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
