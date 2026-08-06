# Labelled Link Cookbook Playgrounds Design

## Scope

Enable the shared editable cookbook playground for the three registered
`oj-c-labelled-link` recipes: Overview, Editable, and Custom Action.

## Architecture

Each registered demo receives a sibling `*-source.ts` raw-loader wrapper that
exposes its unchanged TSX source. The existing custom navigation in
`labelledLink/index.tsx` will add optional playground metadata to each item
and pass the active item's configuration directly to `DemoLayoutTemplate`.
This preserves the current navigation and uses the shared `TsxPlayground`
without a page-layout migration.

## Dependencies

The three demos use only Preact and JET modules. Add the single missing,
specific trusted import `oj-c/labelled-link`; `oj-c/form-layout`,
`oj-c/input-text`, and `oj-c/radioset` are already allowed. There are no local
TypeScript runtime helpers and no CSS, JSON, or text assets, so no runtime
bindings or supporting-file tabs are required.

## Verification

A focused Node test will cover every registered item, its raw-source wrapper,
the active metadata handoff to `DemoLayoutTemplate`, and the narrow import
allowlist. The implementation will also run TypeScript and whitespace checks.
Interactive cookbook behavior will be exercised if a controllable browser is
available.
