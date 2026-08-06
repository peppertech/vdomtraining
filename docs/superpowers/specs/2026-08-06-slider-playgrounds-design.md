# Slider Playgrounds Design

## Goal

Enable the shared editable Oracle JET cookbook playground for every registered
`oj-slider` recipe: Overview, Basic, Vertical, Validation, and Width.

## Scope

The five entries registered by
`src/components/content/examples/form/slider/sliderLegacy/index.tsx` are the
complete scope. The separate `oj-range-slider` recipe page and the unregistered
`slider-icons.tsx` module are unchanged.

Every target recipe reaches `DemoLayoutTemplate` through `RecipePageTemplate`,
so the existing `TsxPlayground` provides the editor, preview, controls, errors,
reset behavior, accessibility label, and CSS scoping behavior.

## Literal Sources

Create raw-source wrappers beside the five registered TSX demos:

- `slider-states-source.ts`
- `slider-basic-source.ts`
- `slider-vertical-source.ts`
- `slider-validation-source.ts`
- `slider-width-source.ts`

The original TSX files remain byte-for-byte unchanged and retain their named
default functions. There are no local CSS, JSON, or text imports in these demo
sources, so no supporting file tabs are added.

## Registration and Runtime Bindings

Each recipe registration receives `playground` metadata that references its
literal source and real filename.

Only the Overview source imports runtime values from `./slider-shared`, so its
`runtimeBindings` include:

- `sliderConfirmationMessages`
- `sliderDefinitionHints`
- `sliderErrorMessages`
- `sliderInfoMessages`
- `sliderInstructionHelp`
- `sliderSourceHints`
- `sliderWarningMessages`

Basic, Vertical, and Validation import only types from the local helper, and
Width has no local helper import; none of those recipes receive runtime
bindings. The Validation source's `ojmessaging` import is type-only and is
erased by the existing trusted-code compilation flow.

## Trusted Imports

Keep the shared runner allowlist exact by adding only these missing specifiers:

- `ojs/ojslider`
- `./slider-shared`

The existing allowlist already contains `preact`, `preact/hooks`,
`ojs/ojformlayout`, and `ojs/ojlabel`. Do not add `ojs/ojmessaging`, because it
is an `import = require` type reference rather than a runtime dependency in the
compiled editable demo.

## User Experience and Errors

Info remains first and selected initially, with its filename and editor hidden
and the Dark mode, Apply changes, and Reset controls visible but disabled.
Selecting TSX enables editing. Apply recompiles the real source inside the
existing recipe article; errors appear in the shared Try it region and restore
the normal demo. Reset restores and reapplies each original TSX source.

## Verification

Add a focused Node regression test for every slider registration, source
wrapper, Overview runtime binding, and required trusted import. Verify it with
Node's TypeScript stripping, then run:

```bash
npx tsc --noEmit --pretty false
git diff --check
```

In the cookbook, verify Info and TSX behavior, Apply and Reset, and an
unsupported-import error for each of the five recipes.

## Non-Goals

- Editing `slider-shared.tsx` in the playground.
- Adding a CSS, JSON, or text tab where no source dependency exists.
- Changing the shared playground implementation or its controls.
- Enabling `oj-range-slider` or the unregistered slider-icons module.
