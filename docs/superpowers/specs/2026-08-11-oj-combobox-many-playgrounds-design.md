# oj-combobox-many Playground Design

## Scope

Add the shared editable cookbook playground to all fourteen demos registered by `comboboxMany/index.tsx`: Overview, Basic, Grouping, Width, Events, Page Load Performance, Data Provider Mapping, Custom Renderer, Item with Image, Minimum Chars To Filter, Maximum Result Count, Converter, Converter with unformatted data, and Validator.

## Architecture

Each existing TSX demo remains both the runtime example and the byte-for-byte editor source. A sibling `*-source.ts` module loads each demo through `raw-loader`. Each navigation item receives a `PlaygroundConfig` with the real filename and exact values imported from `comboboxMany-shared.tsx`; `DemoLayoutTemplate` continues to own the shared editor and preview behavior.

The trusted runner allowlist gains only `./comboboxMany-shared`. JSON assets read internally by that TypeScript helper are not supporting tabs because the editable demos do not import them directly, and local TypeScript modules must remain runtime bindings.

## Runtime bindings

| Demo | Runtime bindings |
| --- | --- |
| Overview | `confirmationMessages`, `createBrowserDataProvider`, `errorMessages`, `infoMessages`, `warningMessages` |
| Basic | `createBrowserDataProvider` |
| Grouping | `createTimeZoneDataProvider` |
| Width | `createBrowserDataProvider` |
| Events | `createBrowserLabelDataProvider`, `formatEventDetail` |
| Page Load Performance | `createStatesDataProvider` |
| Data Provider Mapping | `createEmployeeMappedDataProvider` |
| Custom Renderer | `createGroupedEmployeeDataProvider`, `renderEmployeeCustomOption` |
| Item with Image | `createBrowserLabelDataProvider`, `renderBrowserImageOption` |
| Minimum Chars To Filter | `createStatesDataProvider` |
| Maximum Result Count | `createStatesDataProvider` |
| Converter | `createFormattedCurrencyDataProvider`, `usdCurrencyConverter` |
| Converter with unformatted data | `createUnformattedCurrencyDataProvider`, `usdCurrencyConverter` |
| Validator | `createEmailDataProvider`, `multipleEmailValidator` |

## Error handling and safety

The existing playground continues to handle unsupported imports, compilation failures, invalid supporting JSON, reset, and atomic preview replacement. This change adds no recipe-specific execution surface and grants only one exact local helper module.

## Testing

A focused contract test will require all fourteen source wrappers, named default components, real filenames, exact runtime bindings, navigation registration, shared-layout handoff, and the local helper allowlist entry. Final verification will run focused tests, TypeScript, `git diff --check`, and a clean Oracle JET build.
