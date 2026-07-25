/** @type {import('dependency-cruiser').IConfiguration} */
const config = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment: "Circular dependencies cause hard-to-debug issues. Refactor to break the cycle.",
      from: {},
      to: { circular: true },
    },
    {
      name: "no-orphans",
      severity: "info",
      comment:
        "This module is orphaned (not imported anywhere). Consider removing it or adding imports.",
      from: {
        orphan: true,
        pathNot: [
          "(^|/)\\.[^/]+\\.(js|cjs|mjs|ts|json)$",
          "\\.d\\.ts$",
          "^src/app/",
          "^src/instrumentation\\.ts$",
          "^src/proxy\\.ts$",
          "^src/test-setup\\.ts$",
          "\\.spec\\.",
          "\\.test\\.",
        ],
      },
      to: {},
    },
    {
      name: "no-non-package-json",
      severity: "error",
      comment: "This module depends on an npm package not in package.json. Add it to dependencies.",
      from: {},
      to: { dependencyTypes: ["npm-no-pkg", "npm-unknown"] },
    },
    {
      name: "not-to-unresolvable",
      severity: "error",
      comment: "This module depends on a module that cannot be resolved. Check the import path.",
      from: {},
      to: { couldNotResolve: true },
    },
    {
      name: "not-to-deprecated",
      severity: "warn",
      comment: "This module uses a package marked as deprecated. Consider replacing it.",
      from: {},
      to: { dependencyTypes: ["deprecated"] },
    },
  ],

  options: {
    includeOnly: "^src/.*\\.(ts|tsx|js|jsx|mjs)$",
    exclude: {
      path: [
        "node_modules",
        "\\.spec\\.(ts|tsx|js|jsx)$",
        "\\.test\\.(ts|tsx|js|jsx)$",
        "\\.d\\.ts$",
      ],
    },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "./tsconfig.json" },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
      mainFields: ["module", "main", "types", "typings"],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"],
    },
    reporterOptions: {
      dot: { collapsePattern: "node_modules/(@[^/]+/[^/]+|[^/]+)" },
      text: { highlightFocused: true },
    },
  },
};

export default config;
