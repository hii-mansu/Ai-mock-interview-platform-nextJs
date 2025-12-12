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
});



export const UserAnswer = pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt')
})