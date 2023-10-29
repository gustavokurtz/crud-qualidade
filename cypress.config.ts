import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        specPattern: ["cypress/_e2e/todo-feed.cy.ts"],
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
