const BASE_URL = "http://localhost:3000";

describe("/ - Todos Feed", () => {
    it("when load, renders the page", () => {
        cy.visit("http://localhost:3000/");
        // Trailing Slash
        cy.visit(BASE_URL);
    });
    it("when create a new todo, it must appears in the screen", () => {
        // 0 - Interceptações/Intertecptação
        cy.intercept("POST", `${BASE_URL}/api/todos`, (request) => {
            request.reply({
                statusCode: 201,
                body: {
                    todo: {
                        id: "66665d7e-c969-45b1-99f1-1aa155477204",
                        date: "2023-04-15T19:46:51.109Z",
                        content: "nova todo",
                        done: true,
                    },
                },
            });
        }).as("createTodo");

        // 1 - Abrir a página
        cy.visit(BASE_URL);
        // 2 - Selecionar o input de criar nova todo
        // 3 - Digitar no input de criar nova todo
        const inputAddTodo = "input[name='add-todo']";
        cy.get(inputAddTodo).type("nova todo");
        // 4 - Clicar no botão

        const btnAddTodo = "[aria-label='Adicionar novo item']";
        cy.get(btnAddTodo).click();

        // 5 - Checar se na página surgiu um novo elemento
        cy.get("table > tbody").contains("nova todo");

        // Criar validações a partir de valores
        expect(2 * 4).to.be.equal(8);
    });
});
