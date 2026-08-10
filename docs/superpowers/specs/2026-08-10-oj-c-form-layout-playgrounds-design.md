# Core Pack oj-c-form-layout Playgrounds Design

## Goal

Add the shared editable TSX playground to all seven `oj-c-form-layout` recipes while leaving the completed legacy `oj-form-layout` recipes unchanged.

## Scope

The implementation covers these recipe items in `formLayoutCorePack`:

- Overview (`formLayoutCorePack-formInputs.tsx`)
- Mixed Inputs (`formLayoutCorePack-formInputsMixed.tsx`)
- Column Span (`formLayoutCorePack-columnSpan.tsx`)
- Conditional Inputs (`formLayoutCorePack-conditionalInputs.tsx`)
- Job Application (`formLayoutCorePack-jobApplication.tsx`)
- Readonly vs Mixed (`formLayoutCorePack-readonlyVsMixed.tsx`)
- Shared Column (`formLayoutCorePack-sharedColumn.tsx`)

All seven items reach `DemoLayoutTemplate` through `RecipePageTemplate`, and every editable TSX file already exports a named default function. None imports a local JSON, CSS, or text asset, so no supporting-file tabs are required. Inline `<style>` content remains part of the editable Shared Column TSX.

## Architecture

Create a sibling `*-source.ts` raw-source wrapper for each demo. Import the wrappers in `formLayoutCorePack/index.tsx` and add `playground` metadata only to the seven Core Pack recipe items. The existing shared playground continues to own compilation, Apply, Reset, error display, Monaco, tab state, controls, CSS scoping, and preview replacement.

The real demo TSX files remain the literal editable source of truth. The implementation does not create simplified examples, transpiled copies, or recipe-specific editor components.

## Runtime Dependencies

JET and Preact imports remain semicolon-terminated in every editable TSX file. Add only these missing exact specifiers to the shared playground allowlist:

- `oj-c/collapsible`
- `oj-c/input-date-mask`
- `oj-c/input-date-picker`
- `oj-c/input-date-text`
- `oj-c/input-month-mask`
- `oj-c/input-time-mask`
- `oj-c/select-multiple`
- `ojs/ojmutablearraydataprovider`
- `./formLayoutCorePack`

Import `FormLayoutCorePack` and `MutableArrayDataProvider` into `formLayoutCorePack/index.tsx`, then expose only the identifiers referenced by each editable source:

- Overview: `FormLayoutCorePack`
- Mixed Inputs: `MutableArrayDataProvider`
- Column Span: `MutableArrayDataProvider`
- Conditional Inputs: `MutableArrayDataProvider`
- Job Application: `MutableArrayDataProvider`
- Readonly vs Mixed: `MutableArrayDataProvider`
- Shared Column: no runtime bindings

The Overview demo's local TypeScript helper remains non-editable, as required. Its existing named component is supplied as a runtime binding rather than duplicated into the Overview TSX.

## Registration

Type the Core Pack recipe array with the existing shared `PlaygroundConfig` type. Each `playground` object uses its literal wrapper as `initialSource` and the real TSX basename as `fileName`. No supporting-file metadata is added, and no legacy registration is modified.

## Error Handling and UX

The implementation relies entirely on the existing shared playground contract. Unsupported imports and compilation failures appear in the Try it error area and restore the normal demo. Info remains the initial tab; switching to TSX enables Dark mode, Apply changes, and Reset. Reset restores and reapplies the literal initial source.

## Testing

Add a focused registration test beside the Core Pack recipes. It verifies:

- all seven items have the exact source wrapper and filename;
- runtime-binding keys exactly match each recipe's requirements;
- every wrapper points to the real TSX;
- every editable TSX retains its named default function;
- all nine required import specifiers appear inside `ALLOWED_IMPORTS`;
- no supporting-file metadata is introduced.

Use a red-green cycle for this test, then run all directly executable recipe-playground tests, `npx tsc --noEmit --pretty false`, and `git diff --check`. Confirm the active webpack development bundle contains all seven raw-loader modules. Perform browser interaction checks when a browser instance is available.

## Non-goals

- Changing legacy `oj-form-layout` recipes
- Editing the shared playground UX or Monaco implementation
- Making `formLayoutCorePack.tsx` editable
- Adding JSON, CSS, or text tabs
- Refactoring or simplifying existing demo source
