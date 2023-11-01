import { z } from "zod";

// Usando transform para mudar o tipo do elemento
export const TodoSchema = z.object({
    id: z.string().uuid(),
    content: z.string().min(1),
    date: z.string().transform((date) => {
        return new Date(date).toISOString();
    }),
    done: z.string().transform((done) => {
        if (done === "true") {
            return true;
        }
        return false;
    }),
});

export type Todo = z.infer<typeof TodoSchema>;
