import {
    read,
    create,
    update,
    deleteById as dbDeleteById,
} from "@db-crud-todo";
import { HttpNotFoundError } from "@server/infra/errors";

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
    const ALL_TODOS = read().reverse();

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

async function createByContent(content: string): Promise<Todo> {
    const newTodo = create(content);

    return newTodo;
}

async function toggleDone(id: string): Promise<Todo> {
    const ALL_TODOS = read();
    const todo = ALL_TODOS.find((todo) => todo.id === id);

    if (!todo) throw new HttpNotFoundError(`Todo with id "${id}" not found `);

    const updatedTodo = update(todo.id, {
        done: !todo.done,
    });

    return updatedTodo;
}

async function deleteById(id: string) {
    const ALL_TODOS = read();
    const todo = ALL_TODOS.find((todo) => todo.id === id);

    if (!todo) throw new HttpNotFoundError(`Todo with id "${id}" not found `);
    dbDeleteById(id);
}

export const todoRepository = {
    get,
    createByContent,
    toggleDone,
    deleteById,
};

//Model/Schema

interface Todo {
    id: string;
    content: string;
    date: string;
    done: boolean;
}
