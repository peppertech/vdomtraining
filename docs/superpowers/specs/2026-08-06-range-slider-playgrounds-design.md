# Range Slider Playgrounds Design

## Goal

Enable the shared editable Oracle JET cookbook playground for all six
registered `oj-range-slider` recipes: Overview, Basic, Vertical, Validation,
Icons, and Width.

## Scope

The entries registered in
`src/components/content/examples/form/slider/rangeSliderLegacy/index.tsx` are
the complete scope. The separate `oj-slider` recipes and all existing Slider
playground work are unchanged.

Every target reaches `DemoLayoutTemplate` through `RecipePageTemplate`, so the
existing `TsxPlayground` supplies the editor, preview, controls, errors,
reset behavior, accessibility label, and CSS scoping behavior.

## Literal Sources

Create raw-source wrappers beside the six registered TSX demos:

- `rangeSlider-states-source.ts`
- `rangeSlider-basic-source.ts`
- `rangeSlider-vertical-source.ts`
- `rangeSlider-validation-source.ts`
- `rangeSlider-icons-source.ts`
- `rangeSlider-width-source.ts`

The original TSX files stay byte-for-byte unchanged and retain named default
functions. None imports editable local CSS, JSON, or text, so no supporting
file tabs are added.

## Registration and Runtime Bindings

Each registered item receives literal source metadata and its real filename.

Overview receives the seven live `rangeSlider-shared` values:

- `rangeSliderConfirmationMessages`
- `rangeSliderDefinitionHints`
- `rangeSliderErrorMessages`
- `rangeSliderInfoMessages`
- `rangeSliderInstructionHelp`
- `rangeSliderSourceHints`
- `rangeSliderWarningMessages`

Basic, Vertical, Validation, and Icons receive `formatRangeValue`. Their other
`rangeSlider-shared` imports are type-only. Width receives no runtime binding.
The `ojmessaging` `import = require` reference in Validation is type-only and
is erased by the existing trusted-code compiler.

## Trusted Imports

Add only `./rangeSlider-shared` to the shared allowlist. The existing Slider
work supplies `ojs/ojslider`; Preact, Preact hooks, `ojs/ojformlayout`, and
`ojs/ojlabel` are already allowlisted. Do not add `ojs/ojmessaging`.

## User Experience and Errors

Info remains the default tab, hiding its filename/editor while Dark mode,
Apply changes, and Reset remain visible but disabled. Selecting TSX enables
the controls. Apply compiles the literal source inside the existing recipe
article; import or compile errors appear in Try it and restore the normal demo.
Reset restores and reapplies the original source.

## Verification

Add a Node registration test covering every Range Slider wrapper, registration,
runtime binding, and the shared helper allowlist entry. Verify it with Node's
TypeScript stripping, then run:

```bash
npx tsc --noEmit --pretty false
git diff --check
```

In the cookbook, verify Info and TSX controls, edit persistence, Apply, an
unsupported-import error, and Reset for all six recipes.

## Non-Goals

- Editing `rangeSlider-shared.tsx` in the playground.
- Adding CSS, JSON, or text tabs without source dependencies.
- Changing shared playground behavior or controls.
- Changing `oj-slider` recipes.
