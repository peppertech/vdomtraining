# JET VDOM TSX Best Practices Review

Date: 2026-06-10

## Scope

Reviewed all `*.tsx` files under `src`, excluding:

- `description.tsx`
- `recipe.tsx`
- paths under `jet-composites`
- paths under `dataProvider`

Total TSX files in scope: 1,596.

Project context from the Oracle JET MCP resolver:

- Architecture: VDOM
- JET version: `~20.0.0`
- Source path: `src`
- Primary guidance consulted: JET VDOM style guide and VDOM development guide resource recommendations from the Oracle JET MCP server.

Validation run:

- `npx tsc --noEmit` passed.

This means the issues below are best-practice, maintainability, type-safety, security, and VDOM architecture compliance findings rather than current TypeScript compile failures.

## Summary

| Severity | Finding | Scale |
| --- | --- | --- |
| High | Broad `any` usage and explicit `no-explicit-any` suppression weakens strict TypeScript | 438 files contain `any`; 84 files disable `@typescript-eslint/no-explicit-any` |
| High | Direct DOM mutation and imperative DOM querying bypass VDOM state/ref patterns | 119 files contain `document.`; 12 files contain `innerHTML` |
| Medium | Legacy `oj-*` components dominate a VDOM/Core Pack project where Core Pack equivalents should be preferred when available | 1,314 files contain legacy `oj-*` JSX |
| Medium | DataProvider objects are often created during render instead of memoized or hoisted | repeated in shared/root components and sample pages |
| Medium | Router subscriptions are not cleaned up on unmount | representative root and examples routers |
| Medium | Browser globals are used directly in render-time helpers and state initializers | 78 files contain `window.` |
| Low | Console logging remains in source | 3 files contain `console.` |
| Low | Some event handlers and state transitions duplicate derived state or mutate component inputs | isolated but in core app/navigation files |

## Findings

### 1. Broad `any` Usage And Type-Safety Suppression

Severity: High

`strict: true` is enabled in `tsconfig.json`, but many files bypass the benefit with `any` and file-level ESLint disables.

Evidence:

- `src/components/content/examples/collection/table/table-corepack/table-selectionTablecorepack/table-selectionTablecorepack.tsx:1` disables `@typescript-eslint/no-explicit-any`.
- `src/components/content/examples/collection/table/table-corepack/table-selectionTablecorepack/table-selectionTablecorepack.tsx:25` uses `useState<any>` for selected state.
- `src/components/content/examples/collection/table/table-corepack/table-selectionTablecorepack/table-selectionTablecorepack.tsx:29` uses `useState<any>` for a boolean.
- `src/components/content/examples/collection/table/table-corepack/table-selectionTablecorepack/table-selectionTablecorepack.tsx:30` uses `useState<any>` for a string.
- `src/components/content/examples/collection/table/table-corepack/table-selectionTablecorepack/table-selectionTablecorepack.tsx:31` uses `useState<any>` for selection mode state.

Impact:

- JET component event payloads, KeySet state, DataProvider keys, and item data are not fully checked.
- Refactors can silently break runtime behavior while still passing TypeScript.
- File-level disables hide unrelated future type mistakes.

Recommended remediation:

- Replace `any` state with explicit JET/Preact types, for example `ComponentProps<"oj-table">["selected"]`, typed `KeySetImpl<number>`, and concrete item interfaces.
- Prefer event types derived from `ComponentProps<"...">["on..."]` for TSX component events.
- Remove file-level `no-explicit-any` disables and, if needed, use a narrowly scoped typed alias such as `unknown` plus parsing/validation.

### 2. Imperative DOM Access Bypasses VDOM Patterns

Severity: High

Many components use `document.getElementById`, `document.querySelector`, DOM mutation, and imperative component calls instead of refs, state, or declarative props.

Evidence:

- `src/components/content/examples/navlayout/dialog/dialog-legacy/dialog-modal/dialog-modal.tsx:28` queries `modalDialog1` to close the dialog.
- `src/components/content/examples/navlayout/dialog/dialog-legacy/dialog-modal/dialog-modal.tsx:33` queries `modalDialog1` to open the dialog.
- `src/components/content/examples/navlayout/popup/popup-legacy/popup-tooltip/popup-tooltip.tsx:78` queries `tooltipPopup` despite already having a `popupRef`.
- `src/components/content/examples/navlayout/popup/popup-legacy/popup-tooltip/popup-tooltip.tsx:99` writes `content.innerHTML = title`.

Impact:

- Imperative selectors are fragile if IDs change or multiple component instances render.
- Direct DOM mutation can diverge from Preact's virtual DOM.
- `innerHTML` creates avoidable injection risk and should not be used with data-derived strings.

Recommended remediation:

- Use `useRef` for JET component methods when imperative methods are unavoidable.
- Prefer declarative Core Pack props and state-controlled visibility/selection when available.
- Replace `innerHTML` with text state rendered in JSX, or `textContent` only when direct DOM interaction is unavoidable.

### 3. Legacy Components Are Overused In A VDOM/Core Pack Project

Severity: Medium

The project is VDOM and includes `@oracle/oraclejet-core-pack`. Core Pack examples are present, but legacy `oj-*` JSX is still the dominant pattern.

Evidence:

- 1,314 reviewed TSX files contain legacy `oj-*` JSX.
- `src/components/header.tsx` uses `oj-navigation-list`.
- `src/components/content/examples/index.tsx` uses `oj-tab-bar`.
- `src/components/content/examples/navlayout/dialog/dialog-legacy/dialog-modal/dialog-modal.tsx` uses `oj-dialog`, `oj-button`, `oj-form-layout`, and `oj-input-text`.

Impact:

- Legacy custom element APIs tend to require more imperative code and weaker typing than Core Pack equivalents.
- It makes the catalog inconsistent: some examples demonstrate modern VDOM/Core Pack patterns, while others teach legacy patterns.

Recommended remediation:

- For new or migrated samples, prefer `oj-c/*` Core Pack components where component parity exists.
- Keep legacy samples only when the sample is explicitly demonstrating a legacy component or a feature not yet available in Core Pack.
- Label legacy examples clearly and avoid using them as the default pattern for new VDOM recipes.

### 4. DataProviders Are Recreated During Render

Severity: Medium

Some components instantiate DataProvider objects directly in component render bodies. This creates new object identities on every render and can force unnecessary work in JET collection components.

Evidence:

- `src/components/header.tsx:53` creates `routesDP` directly in the component body.
- `src/components/content/examples/index.tsx:74` creates `tabbarDP` directly in the component body.

Impact:

- Collection components receive a new DataProvider instance each render.
- Selection, scroll position, and internal component caching can become harder to reason about.

Recommended remediation:

- Hoist static providers to module scope when data never changes.
- Use `useMemo` when provider input depends on props or state.
- Keep DataProvider key types and item types explicit.

### 5. Router Subscriptions Lack Cleanup

Severity: Medium

Router state subscriptions are established in effects without unsubscribe cleanup.

Evidence:

- `src/components/app.tsx:63` subscribes to `router.currentState` without returning cleanup.
- `src/components/content/examples/index.tsx:61` subscribes to `exampleRouter.currentState` without returning cleanup.

Impact:

- Components can keep receiving router updates after unmount.
- Future navigation/layout changes can introduce duplicate subscriptions and stale closures.

Recommended remediation:

- Capture the subscription handle returned by `subscribe` if available and dispose it in the effect cleanup.
- If the API does not return a disposable, isolate router subscriptions at a stable app root and document that lifecycle.

### 6. Browser Globals Are Used Directly

Severity: Medium

Several components read or write `window` directly from helpers, state initializers, or navigation logic.

Evidence:

- `src/components/header.tsx:29` initializes a `MediaQueryList` from `window.matchMedia`.
- `src/components/content/examples/navlayout/tabbar/tab-bar-corepack/tabBar-routingcorepack/tabBar-routingcorepack.tsx:21` reads `window.location.hash`.
- `src/components/content/examples/navlayout/tabbar/tab-bar-corepack/tabBar-routingcorepack/tabBar-routingcorepack.tsx:39` writes `window.location.hash`.
- `src/components/content/examples/navlayout/tabbar/tab-bar-corepack/tabBar-routingcorepack/tabBar-routingcorepack.tsx:54` checks `window.location.hash` in an effect.

Impact:

- Direct global access makes tests and non-browser rendering harder.
- Hash routing in leaf demos can conflict with the app-level router.

Recommended remediation:

- Guard browser globals behind helper functions.
- Prefer JET router APIs for navigation instead of direct hash manipulation where practical.
- Keep global event listeners inside `useEffect` with cleanup.

### 7. Component Props Are Mutated

Severity: Medium

The app root mutates incoming props.

Evidence:

- `src/components/app.tsx:57` assigns `props.appName = "VDOM Training"`.
- `src/components/app.tsx:58` assigns `props.userLogin = "some.person@oracle.com"`.

Impact:

- Mutating props violates Preact/React expectations and makes data flow less predictable.
- Future callers cannot reliably control these values.

Recommended remediation:

- Use local constants or default values:
  - `const appName = props.appName ?? "VDOM Training";`
  - `const userLogin = props.userLogin ?? "some.person@oracle.com";`

### 8. Console Logging Remains In Source

Severity: Low

Console logging is present in demo code.

Evidence:

- `src/components/content/examples/form/checkbox/checkBoxCorePack/checkBoxCorePack.tsx:52` logs checkbox changes.
- `src/components/content/examples/control/toolbar/toolbar.tsx:61` logs toolbar menu actions.

Impact:

- Noise in production/demo browser consoles.
- Can leak implementation details or user action data.

Recommended remediation:

- Remove console calls or route messages through visible demo state when the output is part of the example.
- Use test/debug-only logging guards if logging is required for development.

## Positive Observations

- The project is configured as a VDOM project with `jsxImportSource: "preact"`.
- `strict: true` is enabled.
- `npx tsc --noEmit` passes.
- Many newer Core Pack samples already use better patterns, including typed `ComponentProps`, typed events, `useMemo` for DataProviders, and cleanup for window listeners.

## Suggested Remediation Order

1. Remove unsafe DOM mutation first, especially `innerHTML`.
2. Replace direct DOM queries with refs in dialog, popup, menu, and collection examples.
3. Add cleanup for router subscriptions.
4. Memoize or hoist DataProvider construction in shared/root components.
5. Gradually replace `any` and remove `no-explicit-any` disables by component family.
6. Prefer Core Pack versions for new VDOM samples and label intentionally legacy samples.
7. Remove console logging or convert it to visible demo output.

## Review Notes

This review did not modify application source files. It is an audit report based on static inspection, Oracle JET VDOM MCP guidance, and TypeScript validation.
