import { z } from "zod";

// Model/Schema
// interface Todo {
//     id: string;
//     content: string;
//     date: Date;
//     done: boolean;
// }

export const TodoSchema = z.object({
    id: z.string().uuid(),
    content: z.string().min(1),
    date: z.string().datetime(),
    done: z.boolean(),
});

export type Todo = z.infer<typeof TodoSchema>;
