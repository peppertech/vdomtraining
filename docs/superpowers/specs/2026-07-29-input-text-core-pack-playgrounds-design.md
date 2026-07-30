# Input Text Core Pack Playgrounds Design

## Scope

Add the existing shared TSX playground to every registered `oj-c-input-text` Core Pack demo: Overview, Value Binding, Raw Value, No Label, Clear Icon, Max Length, Text Align, Virtual Keyboard, Width, Start & End Slots, Prefix & Suffix, and Input With Button. Documentation and shared TypeScript helper modules remain non-editable.

## Architecture

Each demo's real TSX file remains the preview component and is exposed byte-for-byte through a sibling `*-source.ts` raw-loader wrapper. `inputTextCorePack/index.tsx` imports those wrappers and registers `playground` metadata on the corresponding recipe item.

The shared code playground continues to compile and render the source inside `DemoLayoutTemplate`; no recipe-specific editor, preview, layout, or runner changes are introduced. JET and Preact package imports use the existing shared allowlist. Where a demo imports a runtime value from `inputTextCorePack-shared.tsx`, `index.tsx` imports and passes only that exact value in `runtimeBindings`.

## Dependency Handling

The Core Pack demo directory has no local JSON, CSS, or text imports, so no supporting-file tabs are required. The local shared module remains a non-editable runtime dependency. The bindings will be limited to the values used by each demo, including message configurations, data-provider factories, option arrays, and typed values that are available at runtime.

## Error Handling and UX

The existing shared playground owns import and compile errors, Apply and Reset behavior, source-model persistence, and the Info tab state. The registration changes must not alter those contracts. An unsupported import or invalid editable TSX continues to surface in the existing Try it error region and restores the normal demo.

## Verification

Confirm every registered item has a source wrapper and playground metadata, and each local runtime import has an exact binding. Run `npx tsc --noEmit --pretty false` and `git diff --check`. If feasible in the available browser environment, exercise a representative stateful demo and a helper-backed demo through Info, TSX, Apply, and Reset.
