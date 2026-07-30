# Input Text Form Controls Title Design

## Goal

Rename the legacy `oj-input-text` catalog demo currently displayed as `Input Wrap` to `With Form Controls`.

## Design

Update only the `name` value for the `input-wrap` demo entry in `src/components/content/examples/form/inputtext/inputTextLegacy/index.tsx`. Keep the demo ID, component import, docs mapping, playground source filename, and demo behavior unchanged so existing navigation and source references remain stable.

## Verification

Run the project type-check and confirm the target catalog entry exposes the new title while retaining `id: "input-wrap"`.
