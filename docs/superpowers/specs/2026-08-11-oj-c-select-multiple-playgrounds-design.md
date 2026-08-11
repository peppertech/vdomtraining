# oj-c-select-multiple Playground Design

## Scope

Add the shared editable cookbook playground to all seven demos currently registered by `selectMultipleCorePack/index.tsx`: Overview, Basic, Page Load Performance, Item Text, Item Template, Collection Template (Table), and Width.

The existing Add to List recipe remains commented out, and no virtual-keyboard demo is registered. This change does not enable or create disabled recipes.

## Architecture

Each existing TSX demo remains both the rendered example and the byte-for-byte editor source. A sibling `*-source.ts` module loads each demo through `raw-loader`. Each recipe item receives a `PlaygroundConfig` with the real filename and the exact runtime values imported from `selectMultiple-shared.tsx`; the existing `RecipePageTemplate` continues to pass that configuration to the shared editor and preview.

The trusted runner allowlist gains only `./selectMultiple-shared`. The helper's internal employee JSON dependency is not a supporting tab because the editable demos do not import JSON directly, and local TypeScript modules must be supplied through runtime bindings.

## Runtime bindings

| Demo | Runtime bindings |
| --- | --- |
| Overview | `createBrowserDataProvider`, `getBrowserLabels` |
| Basic | `createBrowserDataProvider`, `getBrowserLabels` |
| Page Load Performance | `browserOptions`, `createBrowserDataProvider`, `trimValueItems` |
| Item Text | `createOracleEmployeeDataProvider`, `getEmployeeItemText`, `getEmployeeNames` |
| Item Template | `createOracleEmployeeDataProvider`, `getEmployeeItemText`, `getEmployeeNames`, `renderEmployeeItemTemplate` |
| Collection Template (Table) | `createOracleEmployeeDataProvider`, `getEmployeeItemText`, `getEmployeeNames`, `renderEmployeeCollectionTable` |
| Width | `createBrowserDataProvider`, `labelEdgeOptions` |

## Error handling and safety

The existing playground continues to handle unsupported imports, compilation failures, reset, and atomic preview replacement. This change adds no recipe-specific execution surface and grants only one exact local helper module.

## Testing

A focused source-contract test will require all seven raw-source wrappers, real filenames, named default demo components, exact runtime bindings, recipe registration, shared-layout handoff, and the local helper allowlist entry. Final verification will run the focused tests, TypeScript, `git diff --check`, and a clean Oracle JET build.
