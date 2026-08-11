# oj-c-select-multiple Playgrounds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the shared editable TSX playground to every active `oj-c-select-multiple` cookbook recipe.

**Architecture:** Keep the seven existing demo components as the single source of truth, load each through a raw-source wrapper, and attach a `PlaygroundConfig` to its existing `RecipePageTemplate` item. Resolve the demos' local helper imports with exact runtime bindings and one narrowly scoped allowlist entry.

**Tech Stack:** TypeScript, TSX, Preact, Oracle JET, Node assertions, raw-loader, shared `TsxPlayground`.

## Global Constraints

- Cover the seven recipes actively registered in `selectMultipleCorePack/index.tsx`.
- Do not enable the commented Add to List recipe or create a virtual-keyboard recipe.
- Use exact runtime bindings for `./selectMultiple-shared`; do not expose that TypeScript module as an editable supporting file.
- Do not add a supporting JSON tab because no editable demo imports JSON directly.
- Preserve the existing demo rendering and `RecipePageTemplate` navigation behavior.

---

### Task 1: Define the playground registration contract

**Files:**
- Create: `src/components/content/examples/form/selectandcomobobox/selectMultipleCorePack/selectMultipleCorePack-playgrounds.test.ts`

**Interfaces:**
- Consumes: `selectMultipleCorePack/index.tsx`, the seven demo TSX files, the shared playground allowlist.
- Produces: An executable source-contract test for all wrappers, filenames, component exports, runtime bindings, and shared layout registration.

- [ ] **Step 1: Write the failing test**

Create a table-driven Node assertion test with these literal registrations:

```text
states -> selectMultiple-states -> createBrowserDataProvider, getBrowserLabels
basic -> selectMultiple-basic -> createBrowserDataProvider, getBrowserLabels
value-items -> selectMultiple-valueItems -> browserOptions, createBrowserDataProvider, trimValueItems
item-text -> selectMultiple-itemText -> createOracleEmployeeDataProvider, getEmployeeItemText, getEmployeeNames
item-template -> selectMultiple-itemTemplate -> createOracleEmployeeDataProvider, getEmployeeItemText, getEmployeeNames, renderEmployeeItemTemplate
collection-table -> selectMultiple-collectionTemplateTable -> createOracleEmployeeDataProvider, getEmployeeItemText, getEmployeeNames, renderEmployeeCollectionTable
width -> selectMultiple-width -> createBrowserDataProvider, labelEdgeOptions
```

For each row, require a `playground` block, its raw-source import, the real `.tsx` filename, no `supportingFiles`, the exact runtime-binding names, the corresponding wrapper, and the named default component. Also require `RecipePageTemplate` to receive `items={items}` and require `./selectMultiple-shared`, `oj-c/form-layout`, `oj-c/radioset`, and `oj-c/select-multiple` in the shared allowlist.

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npx tsc --target es2022 --module commonjs --moduleResolution node --esModuleInterop --skipLibCheck --types node --outDir /tmp/oj-c-select-multiple-contract src/components/content/examples/form/selectandcomobobox/selectMultipleCorePack/selectMultipleCorePack-playgrounds.test.ts
node /tmp/oj-c-select-multiple-contract/selectMultipleCorePack-playgrounds.test.js
```

Expected: the assertion fails because the `states` recipe has no `playground` block.

### Task 2: Register all active playgrounds

**Files:**
- Create: `src/components/content/examples/form/selectandcomobobox/selectMultipleCorePack/selectMultiple-states-source.ts`
- Create: `src/components/content/examples/form/selectandcomobobox/selectMultipleCorePack/selectMultiple-basic-source.ts`
- Create: `src/components/content/examples/form/selectandcomobobox/selectMultipleCorePack/selectMultiple-valueItems-source.ts`
- Create: `src/components/content/examples/form/selectandcomobobox/selectMultipleCorePack/selectMultiple-itemText-source.ts`
- Create: `src/components/content/examples/form/selectandcomobobox/selectMultipleCorePack/selectMultiple-itemTemplate-source.ts`
- Create: `src/components/content/examples/form/selectandcomobobox/selectMultipleCorePack/selectMultiple-collectionTemplateTable-source.ts`
- Create: `src/components/content/examples/form/selectandcomobobox/selectMultipleCorePack/selectMultiple-width-source.ts`
- Modify: `src/components/content/examples/form/selectandcomobobox/selectMultipleCorePack/index.tsx`
- Modify: `src/components/shared/code-playground/tsx-playground.tsx`

**Interfaces:**
- Consumes: The named default exports from the seven existing demos and the runtime values exported by `selectMultiple-shared.tsx`.
- Produces: Seven `string` default exports containing raw TSX and seven `PlaygroundConfig` registrations accepted by `RecipePageTemplate`.

- [ ] **Step 1: Add the seven raw-source wrappers**

Each wrapper uses the corresponding real TSX filename:

```typescript
const loadedSource = require("!!raw-loader!./selectMultiple-basic.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
```

- [ ] **Step 2: Add source and helper imports to the recipe registry**

Import every `*-source` default and these runtime values from `./selectMultiple-shared`:

```typescript
browserOptions
createBrowserDataProvider
createOracleEmployeeDataProvider
getBrowserLabels
getEmployeeItemText
getEmployeeNames
labelEdgeOptions
renderEmployeeCollectionTable
renderEmployeeItemTemplate
trimValueItems
```

- [ ] **Step 3: Attach exact playground configurations**

Add `initialSource`, the real filename, and only the tabled runtime bindings to each of the seven active items. Do not add `supportingFiles` and do not change the commented Add to List item.

- [ ] **Step 4: Allow the local helper module**

Add exactly this string to `ALLOWED_IMPORTS`:

```typescript
"./selectMultiple-shared",
```

- [ ] **Step 5: Run the focused contract test**

Run the Task 1 compile and Node commands again.

Expected: PASS with exit code 0.

### Task 3: Verify the integrated cookbook build

**Files:**
- Verify: all files created or modified in Tasks 1 and 2.

**Interfaces:**
- Consumes: The completed playground registrations.
- Produces: Evidence that focused contracts, repository types, formatting, and a clean Oracle JET build remain valid.

- [ ] **Step 1: Run all executable tests in the recipe directory**

Compile and run every `*.test.ts` file in `selectMultipleCorePack`, excluding type-only fixtures.

- [ ] **Step 2: Run the project TypeScript check**

```bash
npx tsc --noEmit --pretty false
```

- [ ] **Step 3: Check patch whitespace**

```bash
git diff --check
```

- [ ] **Step 4: Run a clean Oracle JET build**

Copy the worktree to a temporary directory while excluding `.git`, `node_modules`, and generated `web`; link the existing `node_modules`; then run:

```bash
npx ojet build
```

Expected: build completes successfully; the repository's known dynamic-dependency warning may remain.

- [ ] **Step 5: Commit the implementation**

```bash
git add docs/superpowers/plans/2026-08-11-oj-c-select-multiple-playgrounds.md src/components/content/examples/form/selectandcomobobox/selectMultipleCorePack src/components/shared/code-playground/tsx-playground.tsx
git commit -m "feat: add oj-c-select-multiple playgrounds"
```
