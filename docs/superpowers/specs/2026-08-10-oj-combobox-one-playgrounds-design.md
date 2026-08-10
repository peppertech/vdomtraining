# oj-combobox-one Playground Design

## Scope

Add the shared editable cookbook playground to all fourteen demos registered by `comboBoxOne/index.tsx`: Overview, Basic, Grouping, Width, Events, Page Load Performance, Data Mapping, Custom Renderer, Item with Image, Minimum Chars To Filter, Maximum Result Count, Converter, Converter with unformatted data, and Validator.

## Architecture

Each existing TSX demo remains both the runtime example and the byte-for-byte editor source. A sibling `*-source.ts` module loads each demo through `raw-loader`. Each navigation item receives a `PlaygroundConfig` with the real source filename and exact values imported from `comboBoxOne-shared.tsx`; `DemoLayoutTemplate` continues to own the shared editor and preview behavior.

The trusted runner allowlist gains only `./comboBoxOne-shared`. The JSON assets read internally by that TypeScript helper are not supporting tabs because the editable TSX demos do not import those files, and the cookbook skill requires local TypeScript modules to remain runtime bindings.

## Runtime bindings

| Demo | Runtime bindings |
| --- | --- |
| Overview | `browserOptionsWithDisabled`, `confirmationMessages`, `createBrowserDataProvider`, `errorMessages`, `infoMessages`, `warningMessages` |
| Basic | `createBrowserDataProvider` |
| Grouping | `createGroupedStatesDataProvider` |
| Width | `createBrowserDataProvider` |
| Events | `createBrowserDataProvider`, `formatEventDetail` |
| Page Load Performance | `createStatesDataProvider` |
| Data Mapping | `createEmployeeMappedDataProvider` |
| Custom Renderer | `createGroupedEmployeeDataProvider`, `renderEmployeeOption` |
| Item with Image | `createBrowserDataProvider`, `renderOptionWithBadge` |
| Minimum Chars To Filter | `createStatesDataProvider` |
| Maximum Result Count | `createStatesDataProvider` |
| Converter | `createFormattedCurrencyDataProvider`, `usdCurrencyConverter` |
| Converter with unformatted data | `createUnformattedCurrencyDataProvider`, `usdCurrencyConverter` |
| Validator | `createEmailDataProvider`, `emailValidator` |

## Error handling and safety

The existing shared playground continues to handle unsupported imports, compilation failures, invalid supporting JSON, reset, and atomic preview replacement. This implementation adds no recipe-specific execution code and grants only one exact local helper module.

## Testing

A focused contract test will require all fourteen source wrappers, named default demo functions, real filenames, exact runtime bindings, navigation registration, shared-layout handoff, and the local helper allowlist entry. Final verification will run all focused tests, TypeScript, `git diff --check`, and a clean Oracle JET production build.
