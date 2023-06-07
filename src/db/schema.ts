import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { InferModel } from 'drizzle-orm'; 

export const bugCard = sqliteTable('bugCard', {
    id: integer('id').primaryKey(),
    title: text('name'),
    description: text('description'),
  }
);

export type BugCard = InferModel<typeof bugCard> // return type when queried
 
export const issueCard = sqliteTable('issueCard', {
    id: integer('id').primaryKey(),
    title: text('name'),
    description: text('description'),
  }
);

export type IssueCard = InferModel<typeof issueCard> 

export const taskCard = sqliteTable('taskCard', {
    id: integer('id').primaryKey(),
    title: text('name'),
    description: text('category'),
  }
);

export type TaskCard = InferModel<typeof taskCard>
