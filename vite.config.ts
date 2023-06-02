import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import rollupTs from "rollup-plugin-typescript2";

export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            entry: "src/main.ts",
            name: "MathWorld",
            fileName: "math-world",
            formats: ["es", "cjs"],
        },
    },
    plugins: [
        dts({ insertTypesEntry: true }),
        // only for type checking
        {
            ...rollupTs({
                check: true,
                tsconfig: "./tsconfig.json",
                tsconfigOverride: {
                    noEmits: true,
                },
            }),
            // run before build
            enforce: "pre",
        },
    ],
});
