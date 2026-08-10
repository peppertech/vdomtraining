# oj-select-many Playground Design

## Scope

Add the shared editable cookbook playground to all ten demos registered under `selectMany/index.tsx`: Overview, Basic, Grouping, Width, Events, Page Load Performance, Data Mapping, Minimum Results For Search, Maximum Result Count, and Item with Image.

## Architecture

Each existing TSX demo remains the runtime example and the byte-for-byte source of its editor. A sibling `*-source.ts` module loads that TSX file with `raw-loader`. The navigation registry supplies a `PlaygroundConfig` containing that source, its real filename, and only the local helper values imported by the demo. `DemoLayoutTemplate` continues to own the shared editor and preview behavior.

The shared runner allowlist gains the exact local module specifier `./selectMany-shared`. JET and Preact imports used by these demos are already allowlisted. The three JSON files consumed internally by `selectMany-shared.tsx` are not editable supporting files because no demo imports them directly, and local TypeScript helper modules must remain runtime bindings.

## Runtime bindings

| Demo | Runtime bindings |
| --- | --- |
| Overview | `confirmationMessages`, `createBrowserDataProvider`, `errorMessages`, `infoMessages`, `warningMessages` |
| Basic | `createBrowserDataProvider` |
| Grouping | `createGroupedStatesDataProvider` |
| Width | `createBrowserDataProvider` |
| Events | `createBrowserDataProvider`, `formatEventDetail` |
| Page Load Performance | `createStatesDataProvider` |
| Data Mapping | `createEmployeeMappedDataProvider` |
| Minimum Results For Search | `createStatesDataProvider` |
| Maximum Result Count | `createStatesDataProvider` |
| Item with Image | `createBrowserDataProvider`, `renderOptionWithBadge` |

## Error handling and safety

The existing playground handles unsupported imports, compile failures, invalid supporting JSON, reset behavior, and atomic preview replacement. This change adds no new execution surface and narrows access to one exact local helper module.

## Testing

A focused contract test will require all ten registrations, source wrappers, named default component functions, exact filenames, exact runtime bindings, the `DemoLayoutTemplate` playground handoff, and the allowlisted helper specifier. Verification will also run TypeScript, all select-many-focused tests, `git diff --check`, and a clean production build.
