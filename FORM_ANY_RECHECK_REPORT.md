# Form `any` Recheck Report

Date: 2026-06-10

Scope: modified files under `src/components/content/examples/form`.

## Summary

| Check | Result |
| --- | --- |
| Modified form files rechecked | 206 files |
| Residual `FormControlEvent` helper usages | Found in 61 TSX files and fixed |
| Temporary global helper | Removed `src/components/content/examples/form/form-event-types.d.ts` |
| Explicit TypeScript `any` in form TSX files | 0 |
| TypeScript verification | Passed: `npx tsc --noEmit --pretty false --noErrorTruncation` |
| Diff whitespace verification | Passed: `git diff --check -- src/components/content/examples/form` |

## Fixes Applied

| Area | Files | Issue Found | Fix |
| --- | ---: | --- | --- |
| `Inputdatetime/inputDateText` | 1 | Handlers still used temporary `FormControlEvent`. | Replaced with `ComponentProps<"oj-c-input-date-text">` event aliases. |
| `checkbox/checkBoxCorePack` | 1 | Unused checkbox change handler still referenced `FormControlEvent`; stale type import remained. | Removed the unused handler/import and kept only needed typed props. |
| `colorPalette` | 1 | Palette/buttonset handlers still used temporary event type. | Replaced with component-prop event aliases. |
| `inputtext/inputTextCorePack` | 2 | Width/text-align option handlers still used temporary event type. | Replaced with component-prop event aliases. |
| `selectandcomobobox/comboBoxOne` | 10 | Value/value-option handlers still used temporary event type. | Replaced with component-prop event aliases. |
| `selectandcomobobox/comboboxMany` | 12 | Value/value-options/count handlers still used temporary event type. | Replaced with component-prop event aliases. |
| `selectandcomobobox/selectMany` | 5 | Value/value-options handlers still used temporary event type. | Replaced with component-prop event aliases. |
| `selectandcomobobox/selectMultipleCorePack` | 8 | Value/value-items/table handlers still used temporary event type. | Replaced with component-prop event aliases. |
| `selectandcomobobox/selectSingleCorePack` | 12 | Value/action/value-item/list/table handlers still used temporary event type. | Replaced with component-prop event aliases; fixed `valueItemChanged` to read `event.detail.value`. |
| `selectandcomobobox/selectSingleLegacy` | 8 | Value/action/value-item handlers and shared list/table collection actions still used temporary event type. | Replaced simple handlers with component-prop event aliases; typed shared list/table row actions with `ojListView.ojItemAction` and `ojTable.ojRowAction`. |
| `switch/switch-states` | 1 | Switch value handlers still used temporary event type. | Replaced with `oj-switch` component-prop event aliases. |
| `validation/converters/converters-defaultConverterMessages` | 1 | CRLF line endings caused `git diff --check` trailing whitespace warnings; unused event alias/import remained. | Normalized line endings and removed unused alias/import. |

## Verification

| Command | Result |
| --- | --- |
| `rg -n "FormControlEvent" src/components/content/examples/form -g '*.tsx' -g '*.d.ts'` | No matches |
| AST scan for `AnyKeyword` in `src/components/content/examples/form/**/*.tsx` | `explicit_any_count=0` |
| `npx tsc --noEmit --pretty false --noErrorTruncation` | Passed |
| `git diff --check -- src/components/content/examples/form` | Passed |

