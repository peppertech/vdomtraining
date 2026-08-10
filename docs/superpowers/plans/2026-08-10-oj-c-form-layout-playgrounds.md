# Core Pack oj-c-form-layout Playgrounds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the shared editable TSX playground to all seven Core Pack `oj-c-form-layout` recipes and no legacy recipes.

**Architecture:** Expose each real TSX demo through a sibling raw-loader wrapper, then attach an exact `PlaygroundConfig` to each Core Pack recipe registration. Supply the existing local Overview component and JET data-provider class through per-recipe runtime bindings, and add only the nine missing import specifiers to the shared allowlist.

**Tech Stack:** Oracle JET 20.1, Preact, TypeScript/TSX, raw-loader, the existing shared Monaco playground, Node assertion tests.

## Global Constraints

- Cover only Overview, Mixed Inputs, Column Span, Conditional Inputs, Job Application, Readonly vs Mixed, and Shared Column under `formLayoutCorePack`.
- Leave every legacy `formLayoutLegacy` recipe unchanged.
- Keep each demo TSX as the literal source of truth and retain its named default function.
- Keep all imports semicolon-terminated.
- Do not make `formLayoutCorePack.tsx` editable and do not create recipe-specific editor UI.
- Add no supporting files because these demos import no local JSON, CSS, or text assets.
- Keep the shared import allowlist exact and narrow.

---

### Task 1: Specify all seven Core Pack playground registrations

**Files:**

- Create: `src/components/content/examples/form/formLayout/formLayoutCorePack/formLayoutCorePack-playgrounds.test.ts`
- Inspect: `src/components/content/examples/form/formLayout/formLayoutCorePack/index.tsx`
- Inspect: `src/components/shared/code-playground/tsx-playground.tsx`

**Interfaces:**

- Consumes: the seven recipe IDs, TSX basenames, named default components, runtime bindings, and allowlist requirements in the approved design.
- Produces: a regression test that fails for missing or extra bindings, wrong filenames/wrappers, missing named defaults, supporting-file metadata, or missing allowlist entries.

- [ ] **Step 1: Write the failing registration test**

Create an assertion test with this literal table:

```ts
const demos = [
  ["form-inputs", "formLayoutCorePack-formInputs", "formLayoutCorePackFormInputsPlaygroundSource", "FormLayoutCorePackFormInputsExample", ["FormLayoutCorePack"]],
  ["mixed", "formLayoutCorePack-formInputsMixed", "formLayoutCorePackFormInputsMixedPlaygroundSource", "FormLayoutCorePackFormInputsMixedExample", ["MutableArrayDataProvider"]],
  ["column-span", "formLayoutCorePack-columnSpan", "formLayoutCorePackColumnSpanPlaygroundSource", "FormLayoutCorePackColumnSpanExample", ["MutableArrayDataProvider"]],
  ["conditional-inputs", "formLayoutCorePack-conditionalInputs", "formLayoutCorePackConditionalInputsPlaygroundSource", "FormLayoutCorePackConditionalInputsExample", ["MutableArrayDataProvider"]],
  ["job-application", "formLayoutCorePack-jobApplication", "formLayoutCorePackJobApplicationPlaygroundSource", "FormLayoutCorePackJobApplicationExample", ["MutableArrayDataProvider"]],
  ["readonly-vs-mixed", "formLayoutCorePack-readonlyVsMixed", "formLayoutCorePackReadonlyVsMixedPlaygroundSource", "FormLayoutCorePackReadonlyVsMixedExample", ["MutableArrayDataProvider"]],
  ["shared-column", "formLayoutCorePack-sharedColumn", "formLayoutCorePackSharedColumnPlaygroundSource", "FormLayoutCorePackSharedColumnExample", []],
] as const;
```

For each item, assert exact `initialSource`, exact `.tsx` filename, exact sorted runtime-binding keys, no `supportingFiles`, wrapper existence and target, and named default function. Extract the `ALLOWED_IMPORTS` initializer and assert it contains `oj-c/collapsible`, all six missing Core Pack input/select modules, `ojs/ojmutablearraydataprovider`, and `./formLayoutCorePack`.

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
node src/components/content/examples/form/formLayout/formLayoutCorePack/formLayoutCorePack-playgrounds.test.ts
```

Expected: FAIL because the Overview item has no `playground` registration.

- [ ] **Step 3: Confirm mutation coverage**

Confirm the test would fail if a recipe playground were omitted, a wrapper or filename were wrong, a runtime binding were missing or extra, a supporting-file tab were added, a named default export disappeared, or an allowlist entry moved outside `ALLOWED_IMPORTS`.

---

### Task 2: Register the seven playgrounds

**Files:**

- Create: `src/components/content/examples/form/formLayout/formLayoutCorePack/formLayoutCorePack-formInputs-source.ts`
- Create: `src/components/content/examples/form/formLayout/formLayoutCorePack/formLayoutCorePack-formInputsMixed-source.ts`
- Create: `src/components/content/examples/form/formLayout/formLayoutCorePack/formLayoutCorePack-columnSpan-source.ts`
- Create: `src/components/content/examples/form/formLayout/formLayoutCorePack/formLayoutCorePack-conditionalInputs-source.ts`
- Create: `src/components/content/examples/form/formLayout/formLayoutCorePack/formLayoutCorePack-jobApplication-source.ts`
- Create: `src/components/content/examples/form/formLayout/formLayoutCorePack/formLayoutCorePack-readonlyVsMixed-source.ts`
- Create: `src/components/content/examples/form/formLayout/formLayoutCorePack/formLayoutCorePack-sharedColumn-source.ts`
- Modify: `src/components/content/examples/form/formLayout/formLayoutCorePack/index.tsx`
- Modify: `src/components/shared/code-playground/tsx-playground.tsx`
- Test: `src/components/content/examples/form/formLayout/formLayoutCorePack/formLayoutCorePack-playgrounds.test.ts`

**Interfaces:**

- Consumes: `PlaygroundConfig`, `FormLayoutCorePack`, `MutableArrayDataProvider`, and seven literal source strings.
- Produces: seven Core Pack recipe items whose initial source compiles in the shared playground with only the runtime identifiers each source references.

- [ ] **Step 1: Add all seven literal-source wrappers**

For each basename, create the matching wrapper, for example:

```ts
const loadedSource = require("!!raw-loader!./formLayoutCorePack-formInputs.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
```

- [ ] **Step 2: Import registration dependencies**

In `formLayoutCorePack/index.tsx`, import `PlaygroundConfig`, `MutableArrayDataProvider`, all seven wrappers, and the named `FormLayoutCorePack` export. Add `playground?: PlaygroundConfig` to the item type.

- [ ] **Step 3: Add exact metadata**

Add a `playground` block to every existing item. Overview gets `runtimeBindings: { FormLayoutCorePack }`; Mixed Inputs, Column Span, Conditional Inputs, Job Application, and Readonly vs Mixed each get `runtimeBindings: { MutableArrayDataProvider }`; Shared Column omits `runtimeBindings`.

- [ ] **Step 4: Extend the exact allowlist**

Add only:

```ts
"oj-c/collapsible",
"oj-c/input-date-mask",
"oj-c/input-date-picker",
"oj-c/input-date-text",
"oj-c/input-month-mask",
"oj-c/input-time-mask",
"oj-c/select-multiple",
"ojs/ojmutablearraydataprovider",
"./formLayoutCorePack",
```

- [ ] **Step 5: Run the focused test and verify GREEN**

Run the Task 1 command. Expected: exit 0 with no output.

- [ ] **Step 6: Review source fidelity and scope**

Verify none of the seven real TSX demos changed, no legacy recipe file changed, no raw-loader import appears in a TSX file, and no supporting-file metadata exists in the Core Pack registration.

---

### Task 3: Verify and record the implementation

**Files:**

- Verify: all files created or modified in Tasks 1 and 2.

**Interfaces:**

- Consumes: the completed registration and existing shared playground behavior.
- Produces: test, compilation, formatting, bundle, scope, review, and commit evidence.

- [ ] **Step 1: Run all executable recipe tests and static checks**

Run the focused test, every directly executable recipe-playground test under `src/components/content/examples`, then:

```bash
npx tsc --noEmit --pretty false
git diff --check
```

- [ ] **Step 2: Verify the active bundle**

Fetch the active development `main.bundle.js` to `/tmp` and assert seven unique Core Pack raw-loader module paths are present. If no server is active, start the existing Oracle JET development server without changing application code.

- [ ] **Step 3: Perform browser checks when available**

For representative stateful and stateless recipes, verify initial Info state, enabled TSX controls, writable/highlighted source, Apply, Reset, and unsupported-import recovery. If the browser runtime exposes no browser instance, report that limitation explicitly and retain the bundle/static evidence.

- [ ] **Step 4: Request independent review**

Have a read-only reviewer inspect the working-tree diff, untracked wrappers/test/plan, all runtime bindings, allowlist scope, source fidelity, and test coverage. Fix Critical and Important findings before continuing.

- [ ] **Step 5: Commit the verified implementation**

Stage only the Core Pack plan, seven wrappers, focused test, Core Pack registration, and shared allowlist change. Run `git diff --cached --check`, then commit:

```bash
git commit -m "feat: add oj-c-form-layout playgrounds"
```

- [ ] **Step 6: Run post-commit verification**

Repeat the focused test, all executable recipe-playground tests, TypeScript, diff check, seven-wrapper/bundle counts, legacy isolation check, and `git status --short`.
