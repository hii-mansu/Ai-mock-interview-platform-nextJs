import { serial, text, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const mockInterviewAi = pgTable('mockInterviewAi', {
    id:serial('id').primaryKey(),
    jsonMockResponse:text('jsonMockResponse').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc', {length:255}).notNull(),
    jobExperience:varchar('jobExperience', {length:100}).notNull(),
    createdBy:varchar('createdBy', {length:100}).notNull(),
    createdAt:varchar('createdAt', {length:100}),
    mockId:varchar('mockId', {length:100}).notNull(),
})