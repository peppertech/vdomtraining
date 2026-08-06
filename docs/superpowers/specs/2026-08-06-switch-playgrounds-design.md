# Switch Cookbook Playgrounds Design

## Scope

Enable the shared editable cookbook playground for the four registered
`oj-switch` recipes: Overview, Binding to Switch Component, Readonly, and
Component Validation. The compatibility re-export in `switch.tsx` is outside
the scope because it is not a registered recipe.

## Architecture

Each registered demo receives a sibling `*-source.ts` raw-loader wrapper that
exposes the unmodified TSX source. `switch/index.tsx` imports each wrapper and
attaches a `playground` configuration to the matching item. The existing
`RecipePageTemplate` passes that configuration to the shared `TsxPlayground`,
so no Switch-specific editor or preview code is needed.

## Dependencies

All demo imports are JET or Preact modules already allowed by the shared
trusted-code runner. The demos have no local runtime helpers and no local CSS,
JSON, or text assets, so every playground has only `initialSource` and
`fileName`; there are no runtime bindings or supporting-file tabs.

## Verification

A focused Node test will assert the four registrations, filenames, wrapper
imports, raw-loader contents, and the required trusted imports. The
implementation also runs the project TypeScript check and `git diff --check`.
Interactive cookbook behavior will be exercised when a controllable browser
is available.
