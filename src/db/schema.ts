import { serial, text, pgTable } from "drizzle-orm/pg-core";
import { InferModel } from 'drizzle-orm'; 

export const bugCard = pgTable('bugCard', {
    id: serial('id'),
    title: text('name'),
    description: text('description'),
  }
);

export type BugCard = InferModel<typeof bugCard> // return type when queried
 
export const issueCard = pgTable('issueCard', {
    id: serial('id'),
    title: text('name'),
    description: text('description'),
  }
);

export type IssueCard = InferModel<typeof issueCard> 

export const taskCard = pgTable('taskCard', {
    id: serial('id'),
    title: text('name'),
    category: text('category'),
  }
);

export type TaskCard = InferModel<typeof taskCard>
