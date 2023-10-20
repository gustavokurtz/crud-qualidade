import { read } from "@db-crud-todo";

interface TodoRepositoryGetParams {
    page?: number;
    limit?: number;
}

interface TodoRepositoryGetOutput {
    todos: Todo[];
    total: number;
    pages: number;
}

function get({
    page,
    limit,
}: TodoRepositoryGetParams = {}): TodoRepositoryGetOutput {
    const currentePage = page || 1;
    const currenteLimit = limit || 10;
    const ALL_TODOS = read();

    const startIndex = (currentePage - 1) * currenteLimit;
    const endIndex = currentePage * currenteLimit;
    const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
    const totalPages = Math.ceil(ALL_TODOS.length / currenteLimit);

    return {
        total: ALL_TODOS.length,
        todos: paginatedTodos,
        pages: totalPages,
    };
}

export const todoRepository = {
    get,
};

//Model/Schema

interface Todo {
    id: string;
    content: string;
    date: string;
    done: boolean;
}
