# `oj-input-password` Playgrounds Design

## Goal

Add the shared editable cookbook playground to every demo registered on the legacy `oj-input-password` recipe page. Incidental uses of `oj-input-password` on other component pages are outside this change.

## Demo Inventory

The page registers eight demos:

1. Overview (`inputPassword-overview.tsx`)
2. Binding (`inputPassword-binding.tsx`)
3. Pattern Matching (`inputPassword-patternMatching.tsx`)
4. Read Only (`inputPassword-readOnly.tsx`)
5. No Label (`inputPassword-noLabel.tsx`)
6. Width (`inputPassword-width.tsx`)
7. Text Align (`inputPassword-textAlign.tsx`)
8. Styling (`inputPassword-styling.tsx`)

`inputPasswordLegacy/index.tsx` sends every item through `RecipePageTemplate`, which renders the active item through `DemoLayoutTemplate`. The existing layout is therefore compatible with the shared playground.

## Architecture

Follow the explicit registration pattern already used by nearby legacy form-control recipes. Each demo keeps its existing TSX file as the executable source of truth and gets a sibling `*-source.ts` raw-loader wrapper. `inputPassword.css`, shared by Pattern Matching, Width, and Styling, gets one raw-loader wrapper that all three registrations reuse as an editable CSS supporting file.

Add `playground` metadata directly to each of the eight intended recipe items. No factory, separate registry, recipe-specific editor, or preview surface is introduced.

## Dependency Mapping

JET and Preact imports continue to execute through the shared playground. The existing allowlist already includes every required module except `ojs/ojgauge`, used by Pattern Matching; add that exact specifier.

The demos import `./inputPassword-shared`. Type-only event aliases need no runtime binding, but the exact local specifier must be allowlisted. Overview also consumes the runtime `messageSets` value, so `index.tsx` imports it and supplies it through `runtimeBindings` only for Overview.

Pattern Matching, Width, and Styling retain the exact `css!./inputPassword.css` import and register `inputPassword.css` as a CSS supporting file. The other five demos have no supporting files.

## Shared UX and Error Handling

The existing `TsxPlayground` and `DemoLayoutTemplate` own the UI and runtime behavior. Every new registration inherits the Info-first tab order, disabled controls on Info, editable TSX/CSS models, Apply and Reset behavior, scoped CSS, accessible Try it label, and restoration of the normal demo after import or compile failure.

Unsupported imports remain rejected by the narrow allowlist. The playground displays failures in its existing Try it error area. This change does not claim to catch render-time or event-handler exceptions.

## Testing and Verification

Add a focused registration test before production changes. It must verify that all eight item IDs have playground metadata, each points to its expected source wrapper and filename, all wrappers exist, the three CSS-dependent demos register the shared CSS supporting file, Overview binds `messageSets`, and the two required import specifiers are allowlisted.

Run the test once before implementation and confirm it fails because the playground registrations are absent. After implementation, rerun it and confirm it passes. Then run:

```bash
npx tsc --noEmit --pretty false
git diff --check
```

Browser verification should exercise Info, TSX, and CSS tabs where applicable; Apply and Reset; edited TSX and CSS; an unsupported import; and the unchanged article preview contract.
