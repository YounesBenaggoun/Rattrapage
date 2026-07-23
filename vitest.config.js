import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",

        // Load once before tests
        setupFiles: [
            "./src/__tests__/setup.js"
        ],

        globals: true,

        coverage: {
            provider: "v8",
            reporter: [
                "text",
                "html"
            ]
        }
    }
});