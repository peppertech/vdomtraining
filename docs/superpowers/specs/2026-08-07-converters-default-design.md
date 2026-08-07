# Converters Default Demo Design

## Scope

Make DateTime Converter the default selected recipe on the Converters page.

## Implementation

Change only the `RecipePageTemplate` registration in `converters/index.tsx`:
set `initialItemId` from `native-number-converter` to
`date-time-converter`. Preserve the recipe order, routes, components, and all
other page metadata.

## Verification

Run the TypeScript check and `git diff --check`. A browser check will confirm
that the initial page selection is DateTime Converter when a controllable
browser is available.
