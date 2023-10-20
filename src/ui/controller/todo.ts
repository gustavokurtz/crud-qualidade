import { todoRepository } from "@ui/repository/todo";

interface todoControllerGetParams {
    page: number;
}

async function get(params: todoControllerGetParams) {
    console.log(params);
    return todoRepository.get({
        page: params.page, // 1
        limit: 2, // 1 * 4 = 4 / 4  = 0
    });
}

export const todoController = {
    get,
};
