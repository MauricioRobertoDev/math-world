import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/main.ts",
            name: "MathWorld",
            fileName: "math-world",
            formats: ["es", "cjs"],
        },
    },
});
