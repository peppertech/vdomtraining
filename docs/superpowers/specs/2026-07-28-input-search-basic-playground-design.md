# Input Search Basic Playground Design

## Goal

Add the standard editable Oracle JET cookbook playground to the registered
Input Search **Basic** recipe. The playground exposes the real TypeScript/JSX
demo and its local stylesheet through `Info`, `TSX`, and `CSS` tabs while using
the existing recipe article as the preview.

## Scope

This change applies only to the `basic` item registered by
`src/components/content/examples/form/input-search/index.tsx`.

The source of truth remains:

- `input-search-basic.tsx` for the component implementation;
- `input-search.css` for the local styles.

The other Input Search recipes and the unregistered `input-search.tsx` module
remain unchanged.

## Existing Integration

The Basic item is rendered by `RecipePageTemplate`, which forwards its
optional playground configuration to `DemoLayoutTemplate`. The layout is
therefore compatible with the shared `TsxPlayground` implementation.

The Basic TSX depends on:

- `ojs/ojinputsearch`, a JET component module;
- `preact`;
- `InputSearchDiagnostics` and `useInputSearchExampleState` from the local
  `./input-search-shared` module.

The recipe page currently loads `css!./input-search.css` for all Input Search
examples.

## Architecture

Create two literal-source wrappers beside the recipe files:

- `input-search-basic-source.ts` loads `input-search-basic.tsx` through
  `raw-loader`;
- `input-search-css-source.ts` loads `input-search.css` through `raw-loader`.

The `basic` recipe registration receives a `playground` configuration with:

- the literal Basic TSX and its real filename;
- runtime bindings for `InputSearchDiagnostics` and
  `useInputSearchExampleState`;
- one CSS supporting file using the exact
  `css!./input-search.css` import specifier.

Add only `ojs/ojinputsearch` and `./input-search-shared` to the shared trusted
import allowlist. No recipe-specific editor, compiler, preview, toolbar, or
state management is introduced.

## CSS Behavior

The existing page-level CSS import remains in place so the other Input Search
recipes preserve their current styling and the Basic demo renders normally
before an edit is applied.

When CSS is applied from the playground, the shared component inserts the
edited stylesheet under the Basic recipe article's playground scope. This
keeps edited styles local to the active recipe preview. Reset restores the
original CSS source and reapplies the original component.

## User Experience

- `Info` is the first and default read-only tab.
- The filename and Monaco editor are hidden on `Info`.
- Dark mode, Apply changes, and Reset remain visible but disabled on `Info`.
- `TSX` and `CSS` tabs show writable Monaco models and enable the controls.
- TSX edits are compiled only after Apply changes.
- CSS edits are applied only after Apply changes and are scoped to the recipe
  article.
- The existing article with class `demo-layout-template` remains the preview.
- The standalone Recipe section is replaced by the read-only Info content for
  this playground-enabled item.

## Error Handling and Safety

- Unsupported imports continue to surface in the shared Try it error area.
- The import allowlist remains exact and narrow.
- The code runs as trusted same-page code and is not presented as a security
  sandbox.
- Compile or import failures restore the normal Basic demo through the shared
  playground behavior.

## Verification

Static verification:

```bash
npx tsc --noEmit --pretty false
git diff --check
```

Bundle verification must confirm that webpack resolves both raw-source
wrappers and the Input Search imports.

Cookbook verification for the Basic recipe must confirm:

1. `Info`, `TSX`, and `CSS` tabs appear, with `Info` selected initially.
2. The filename and editor are hidden on `Info`; all three controls remain
   visible and disabled.
3. `TSX` and `CSS` enable the controls and preserve edits across tab switches.
4. A TSX property change updates the article after Apply changes.
5. A CSS property change updates only the Basic article after Apply changes.
6. Unsupported imports show an error and restore the normal demo.
7. Reset restores both original sources and the original article.
8. TSX remains writable TypeScript/JSX with visible JET tag and attribute
   highlighting.

## Non-Goals

- Enabling playgrounds for the other Input Search recipes.
- Making `input-search-shared.tsx` editable.
- Replacing the shared Monaco implementation.
- Changing Input Search recipe content or component behavior.
- Refactoring the unregistered `input-search.tsx` module.
