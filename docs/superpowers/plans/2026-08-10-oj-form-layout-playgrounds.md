# Legacy oj-form-layout Playgrounds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the shared editable TSX playground to all six legacy `oj-form-layout` recipes and no Core Pack recipes.

**Architecture:** Expose each real demo through a sibling raw-loader wrapper, then attach a `PlaygroundConfig` to each legacy recipe registration. Preserve local helper imports in the editable TSX and satisfy them with exact per-recipe runtime bindings; add only the three missing import specifiers to the shared allowlist.

**Tech Stack:** Oracle JET 20.1, Preact, TypeScript/TSX, raw-loader, the existing shared Monaco playground, Node assertion tests.

## Global Constraints

- Cover only Overview, Mixed Inputs, Column Span, Nested Form Layout, Shared Column, and Job Application under `formLayoutLegacy`.
- Leave every `formLayoutCorePack` file unchanged.
- Keep each TSX demo as the literal source of truth and retain its named default function.
- Keep all imports semicolon-terminated.
- Do not create editable local TypeScript modules or recipe-specific editor UI.
- Add no supporting files because these demos import no local JSON, CSS, or text assets.
- Keep the shared import allowlist exact and narrow.

---

### Task 1: Specify all six legacy playground registrations

**Files:**

- Create: `src/components/content/examples/form/formLayout/formLayoutLegacy/formLayoutLegacy-playgrounds.test.ts`
- Inspect: `src/components/content/examples/form/formLayout/formLayoutLegacy/index.tsx`
- Inspect: `src/components/shared/code-playground/tsx-playground.tsx`

**Interfaces:**

- Consumes: the six recipe IDs and TSX basenames defined by the approved design.
- Produces: a regression test that requires each item to expose the real TSX source, its exact filename, required bindings, named default export, raw-loader wrapper, and required allowlist entries.

- [ ] **Step 1: Write the failing registration test**

Create an assertion-based test with a literal table for:

```ts
const demos = [
  ["form-inputs", "formLayoutLegacy-formInputs", "formLayoutLegacyFormInputsPlaygroundSource", "FormLayoutLegacyFormInputsExample", ["Color", "browserOptions", "colorOptions", "columnOptions", "controlStateOptions", "createDataProvider", "directionOptions", "formStateOptions", "getLegacySelectManyValue", "getLegacyTextValue", "labelEdgeOptions", "maxColumnOptions", "todayIsoDate", "todayIsoDateTime", "valueLengthOptions"]],
  ["mixed", "formLayoutLegacy-formInputsMixed", "formLayoutLegacyFormInputsMixedPlaygroundSource", "FormLayoutLegacyFormInputsMixedExample", ["browserOptions", "colorOptions", "createDataProvider", "getLegacySelectManyValue", "getLegacyTextValue", "labelEdgeOptions", "todayIsoDate", "todayIsoDateTime", "valueLengthOptions"]],
  ["column-span", "formLayoutLegacy-columnSpan", "formLayoutLegacyColumnSpanPlaygroundSource", "FormLayoutLegacyColumnSpanExample", ["createDataProvider"]],
  ["nested", "formLayoutLegacy-nested", "formLayoutLegacyNestedPlaygroundSource", "FormLayoutLegacyNestedExample", []],
  ["shared-column", "formLayoutLegacy-sharedColumn", "formLayoutLegacySharedColumnPlaygroundSource", "FormLayoutLegacySharedColumnExample", []],
  ["job-application", "formLayoutLegacy-jobApplication", "formLayoutLegacyJobApplicationPlaygroundSource", "FormLayoutLegacyJobApplicationExample", ["createDataProvider", "experienceOptions", "sponsorshipTypeOptions", "stateOptions", "todayIsoDate"]],
] as const;
```

For each literal row, assert the corresponding item contains `playground`, the exact `initialSource`, exact `.tsx` filename, and every listed binding. Assert the wrapper exists and contains `!!raw-loader!./<basename>.tsx`, and assert the real TSX contains `export default function <componentName>(`. Assert the shared allowlist includes `ojs/ojcollapsible`, `ojs/ojselectsingle`, and `./formLayoutLegacy-shared`.

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
node src/components/content/examples/form/formLayout/formLayoutLegacy/formLayoutLegacy-playgrounds.test.ts
```

Expected: FAIL because the first raw-source wrapper or playground registration does not yet exist.

- [ ] **Step 3: Mutation-check the test intent**

Confirm these realistic production mistakes would fail at least one assertion: omitting a recipe playground, wiring the wrong source wrapper or filename, omitting a runtime binding, losing a named default export, pointing a wrapper at the wrong TSX file, or omitting a required allowlist entry.

---

### Task 2: Register the six playgrounds with exact runtime dependencies

**Files:**

- Create: `src/components/content/examples/form/formLayout/formLayoutLegacy/formLayoutLegacy-formInputs-source.ts`
- Create: `src/components/content/examples/form/formLayout/formLayoutLegacy/formLayoutLegacy-formInputsMixed-source.ts`
- Create: `src/components/content/examples/form/formLayout/formLayoutLegacy/formLayoutLegacy-columnSpan-source.ts`
- Create: `src/components/content/examples/form/formLayout/formLayoutLegacy/formLayoutLegacy-nested-source.ts`
- Create: `src/components/content/examples/form/formLayout/formLayoutLegacy/formLayoutLegacy-sharedColumn-source.ts`
- Create: `src/components/content/examples/form/formLayout/formLayoutLegacy/formLayoutLegacy-jobApplication-source.ts`
- Modify: `src/components/content/examples/form/formLayout/formLayoutLegacy/index.tsx`
- Modify: `src/components/shared/code-playground/tsx-playground.tsx`
- Test: `src/components/content/examples/form/formLayout/formLayoutLegacy/formLayoutLegacy-playgrounds.test.ts`

**Interfaces:**

- Consumes: `PlaygroundConfig`, the six literal source strings, the existing `Color` constructor, and the exported values in `formLayoutLegacy-shared.tsx`.
- Produces: six `playground` configurations accepted by `RecipePageTemplate`, with only identifiers referenced by each editable TSX available at compile time.

- [ ] **Step 1: Add all six literal-source wrappers**

For each TSX basename, create the exact wrapper form:

```ts
const loadedSource = require("!!raw-loader!./formLayoutLegacy-formInputs.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
```

Use the matching TSX filename in each of the other five wrappers.

- [ ] **Step 2: Add imports and registration typing**

In `formLayoutLegacy/index.tsx`, import `PlaygroundConfig`, `Color`, all six source wrappers, and these shared runtime values:

```ts
browserOptions,
colorOptions,
columnOptions,
controlStateOptions,
createDataProvider,
directionOptions,
experienceOptions,
formStateOptions,
getLegacySelectManyValue,
getLegacyTextValue,
labelEdgeOptions,
maxColumnOptions,
sponsorshipTypeOptions,
stateOptions,
todayIsoDate,
todayIsoDateTime,
valueLengthOptions,
```

Add `playground?: PlaygroundConfig` to the legacy item type.

- [ ] **Step 3: Add exact playground metadata**

Attach `playground` to each of the six existing items. Use its source wrapper and actual basename for `initialSource` and `fileName`, then supply exactly the bindings from Task 1. Omit `runtimeBindings` entirely for Nested Form Layout and Shared Column.

- [ ] **Step 4: Add the narrow allowlist entries**

Add only these specifiers to `ALLOWED_IMPORTS` in `tsx-playground.tsx`:

```ts
"ojs/ojcollapsible",
"ojs/ojselectsingle",
"./formLayoutLegacy-shared",
```

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

```bash
node src/components/content/examples/form/formLayout/formLayoutLegacy/formLayoutLegacy-playgrounds.test.ts
```

Expected: exit code 0 with no output.

- [ ] **Step 6: Review the diff for source fidelity and scope**

Verify none of the six real TSX files changed, no `formLayoutCorePack` file changed, no raw-loader import appears in a TypeScript-resolved TSX file, and no supporting-file metadata was introduced.

---

### Task 3: Verify compilation and browser behavior

**Files:**

- Verify: all files created or modified in Tasks 1 and 2.

**Interfaces:**

- Consumes: the completed legacy recipe registrations and existing shared playground behavior.
- Produces: compile, formatting, and browser evidence that the six recipes are editable without regressions.

- [ ] **Step 1: Run static verification**

Run:

```bash
npx tsc --noEmit --pretty false
git diff --check
```

Expected: both commands exit 0 with no diagnostics.

- [ ] **Step 2: Exercise representative recipes in the browser**

Start the existing local application if necessary and inspect at least Overview, Column Span, and Shared Column. Confirm Info is initially selected, filename/editor are hidden, and Dark mode, Apply changes, and Reset are visible but disabled. Switch to TSX and confirm controls enable, the real filename appears, the editor is writable, and JET tags and attributes are highlighted.

- [ ] **Step 3: Verify apply, reset, and error recovery**

Edit visible content in representative stateful and stateless TSX recipes, apply, and confirm the article demo remounts with the edit. Reset and confirm the original source and demo return. Introduce an unsupported import and confirm the Try it error area reports it while the normal demo is restored.

- [ ] **Step 4: Perform final scope review**

Run `git status --short` and `git diff --stat`. Confirm the changes consist only of this plan, six source wrappers, one focused test, the legacy registration, and the three allowlist additions; the already committed design spec is not modified.
