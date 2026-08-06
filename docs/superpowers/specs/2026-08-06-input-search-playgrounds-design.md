# Input Search Playgrounds Design

## Goal

Enable the shared editable Oracle JET cookbook playground for all five
registered `oj-input-search` recipes: Basic, Suggestions, Suggestion Item
Text, Suggestion Item Template, and Hero.

## Scope

The registered recipes in
`src/components/content/examples/form/input-search/index.tsx` are the complete
scope. The unregistered `input-search.tsx` module is not changed.

Each recipe already reaches `DemoLayoutTemplate` through
`RecipePageTemplate`, so the existing `TsxPlayground` supplies the editor,
preview, controls, errors, reset behavior, accessibility label, and scoped CSS
behavior.

## Source Files

Create literal raw-source wrappers beside the input-search demos:

- `input-search-basic-source.ts`
- `input-search-suggestions-source.ts`
- `input-search-suggestionItemText-source.ts`
- `input-search-suggestionItemTemplate-source.ts`
- `input-search-hero-source.ts`
- `input-search-css-source.ts`

The five TSX sources remain byte-for-byte unchanged and retain their named
default functions. The single CSS wrapper exposes `input-search.css` as a CSS
supporting file for every recipe. The existing page-level CSS import remains so
all recipes preserve their normal initial rendering.

## Registration and Runtime Bindings

Add `playground` metadata to every entry in `inputSearchItems`. Each item uses
its own TSX wrapper, real filename, and only the values imported from
`./input-search-shared` by that demo:

- Basic: `InputSearchDiagnostics`, `useInputSearchExampleState`
- Suggestions: `createBrowserSuggestionsDataProvider`, `DelayingDataProvider`,
  `InputSearchDiagnostics`, `useInputSearchExampleState`
- Suggestion Item Text: `createEmployeeLastNameDataProvider`,
  `InputSearchDiagnostics`, `useInputSearchExampleState`
- Suggestion Item Template: `createEmployeeTemplateDataProvider`,
  `InputSearchDiagnostics`, `renderEmployeeSuggestionItem`,
  `useInputSearchExampleState`
- Hero: `createBrowserSuggestionsDataProvider`

Every recipe receives `input-search.css` as a CSS supporting file with the
existing `css!./input-search.css` specifier. The local TypeScript helper is a
runtime binding only; it is not editable.

## Trusted Imports

Keep the shared runner allowlist exact by adding only imports present in the
five literal TSX sources that are not already allowed:

- `ojs/ojinputsearch`
- `ojs/ojcheckboxset`
- `ojs/ojoption`
- `ojs/ojhighlighttext`
- `./input-search-shared`

`preact` and `preact/hooks` are already allowed. No automatic import inference
or runner behavior changes are needed.

## User Experience and Errors

The Info tab remains first and selected initially. It hides the filename and
editor while Dark mode, Apply changes, and Reset remain visible and disabled.
Selecting TSX or CSS enables the controls; Apply recompiles the real source
and applies CSS only within the active recipe article. Compile, import, and
supporting-file errors stay in the shared Try it region and restore the normal
demo. Reset restores every source and reapplies the original demo.

## Verification

Because this change adds source wrappers and declarative registrations rather
than new runtime code, verify it through the existing TypeScript and cookbook
integration checks:

```bash
npx tsc --noEmit --pretty false
git diff --check
```

Then manually verify each recipe's Info, TSX, and CSS tabs; edit persistence;
Apply and Reset; scoped CSS; and Try it errors for an unsupported import.

## Non-Goals

- Editing `input-search-shared.tsx` in the playground.
- Changing the shared playground implementation or its controls.
- Changing recipe content or component behavior outside the editable preview.
- Enabling the unregistered `input-search.tsx` module.
