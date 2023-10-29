import { todoRepository } from "@ui/repository/todo";
import { Todo } from "@ui/schema/todo";
import { z } from "zod";

interface todoControllerGetParams {
    page: number;
}

async function get(params: todoControllerGetParams) {
    // eslint-disable-next-line no-console
    return todoRepository.get({
        page: params.page, // 1
        limit: 10, // 1 * 4 = 4 / 4  = 0
    });
}

function filterTodosByContent<Todo>(
    search: string,
    todos: Array<Todo & { content: string }>
): Array<Todo> {
    const homeTodos = todos.filter((todo) => {
        const searchNormalized = search.toLowerCase();
        const contentNormalized = todo.content.toLowerCase();
        return contentNormalized.includes(searchNormalized);
    });

    return homeTodos;
}

interface todoControllerCreateParams {
    content?: string;
    onError: (customMessage?: string) => void;
    onSuccess: (todo: Todo) => void;
}

function create({ content, onSuccess, onError }: todoControllerCreateParams) {
    // Fail Fast
    const parsedParams = z.string().min(1).safeParse(content);
    if (!parsedParams.success) {
        onError();
        return;
    }

    todoRepository
        .createByContent(parsedParams.data)
        .then((novaTodo) => {
            onSuccess(novaTodo);
        })
        .catch(() => {
            onError();
        });
}

interface todoControllerToggleDoneParams {
    id: string;
    updateTodoOnScreen: () => void;
    onError: () => void;
}

function toggleDone({
    id,
    updateTodoOnScreen,
    onError,
}: todoControllerToggleDoneParams) {
    // Optmistic Update

    todoRepository
        .toggleDone(id)
        .then(() => {
            // updateReal
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            setTimeout(() => {
                updateTodoOnScreen();
            }, 1 * 500);
        })
        .catch(() => {
            onError();
        });
}

async function deleteById(id: string): Promise<void> {
    const todoId = id;
    await todoRepository.deleteById(todoId);
}

export const todoController = {
    get,
    filterTodosByContent,
    create,
    toggleDone,
    deleteById,
};
