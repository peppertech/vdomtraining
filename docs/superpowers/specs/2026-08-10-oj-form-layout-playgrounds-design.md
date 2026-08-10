# Legacy oj-form-layout Playgrounds Design

## Goal

Add the shared editable TSX playground to all six legacy `oj-form-layout` recipes while leaving the Core Pack `oj-c-form-layout` recipes unchanged.

## Scope

The implementation covers these recipe items in `formLayoutLegacy`:

- Overview (`formLayoutLegacy-formInputs.tsx`)
- Mixed Inputs (`formLayoutLegacy-formInputsMixed.tsx`)
- Column Span (`formLayoutLegacy-columnSpan.tsx`)
- Nested Form Layout (`formLayoutLegacy-nested.tsx`)
- Shared Column (`formLayoutLegacy-sharedColumn.tsx`)
- Job Application (`formLayoutLegacy-jobApplication.tsx`)

All six items already reach `DemoLayoutTemplate` through `RecipePageTemplate`, and every editable TSX file already exports a named default function. None imports a local JSON, CSS, or text asset, so no supporting-file tabs are required. Inline `<style>` content remains part of its TSX source.

## Architecture

Create a sibling `*-source.ts` raw-source wrapper for each demo. Import those wrappers in `formLayoutLegacy/index.tsx` and add `playground` metadata only to the six legacy recipe items. The existing shared playground remains responsible for compiling, applying, resetting, error display, editor themes, controls, tabs, and preview replacement.

The real demo TSX files remain the sole editable source of truth. The wrappers expose their literal contents; no simplified or transpiled copies are introduced.

## Runtime Dependencies

JET and Preact imports remain in each editable file and must be semicolon-terminated. Add only these missing exact specifiers to the shared playground allowlist:

- `ojs/ojcollapsible`
- `ojs/ojselectsingle`
- `./formLayoutLegacy-shared`

Import the required values from `formLayoutLegacy-shared.tsx` into `formLayoutLegacy/index.tsx` and pass each recipe only the identifiers it uses through `runtimeBindings`:

- Overview: `browserOptions`, `colorOptions`, `columnOptions`, `controlStateOptions`, `createDataProvider`, `directionOptions`, `formStateOptions`, `getLegacySelectManyValue`, `getLegacyTextValue`, `labelEdgeOptions`, `maxColumnOptions`, `todayIsoDate`, `todayIsoDateTime`, and `valueLengthOptions`
- Mixed Inputs: `browserOptions`, `colorOptions`, `createDataProvider`, `getLegacySelectManyValue`, `getLegacyTextValue`, `labelEdgeOptions`, `todayIsoDate`, `todayIsoDateTime`, and `valueLengthOptions`
- Column Span: `createDataProvider`
- Job Application: `createDataProvider`, `experienceOptions`, `sponsorshipTypeOptions`, `stateOptions`, and `todayIsoDate`
- Nested Form Layout: no runtime bindings
- Shared Column: no runtime bindings

Overview also receives the `Color` constructor from `ojs/ojcolor`. `Message` is type-only after TypeScript transpilation and does not require a runtime binding.

## Registration

Type the legacy recipe array with the existing shared `PlaygroundConfig` type. Each `playground` object uses the literal wrapper as `initialSource` and the real TSX basename as `fileName`. No metadata is added to the Core Pack registration.

## Error Handling and UX

The implementation relies on the shared playground behavior. Unsupported imports and compilation errors appear in the Try it error area and restore the normal demo. Info remains the default tab, and Apply, Reset, and Dark mode retain their existing disabled/enabled behavior. Reset restores and reapplies the original TSX source.

## Testing

Add a focused registration test beside the legacy recipes. It verifies all six recipe items have the correct source wrapper, filename, and required runtime bindings; every wrapper points to the real TSX file; every TSX retains its named default function; and the three required import specifiers are allowlisted.

Run the focused test first in red and green phases, then run:

```bash
npx tsc --noEmit --pretty false
git diff --check
```

Manual browser verification will confirm the shared Info/TSX workflow, writable highlighted TSX, Apply and Reset behavior, preview changes, and unsupported-import error handling across representative stateful and stateless recipes.

## Non-goals

- Adding playgrounds to `oj-c-form-layout` Core Pack recipes
- Editing the shared playground UX or Monaco implementation
- Making `formLayoutLegacy-shared.tsx` editable
- Adding JSON, CSS, or text supporting tabs
- Refactoring or simplifying existing demo source
