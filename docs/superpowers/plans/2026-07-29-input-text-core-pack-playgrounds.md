# Input Text Core Pack Playgrounds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all 12 registered `oj-c-input-text` Core Pack demos editable in the existing shared TSX playground.

**Architecture:** Add raw-source wrappers for the 11 demos that do not already have one, then register each wrapper in the Core Pack recipe index. Preserve every demo TSX byte-for-byte; local helper imports resolve through exact `runtimeBindings` and all other imports continue through the shared runner.

**Tech Stack:** Oracle JET 20 Core Pack, Preact, TypeScript, webpack raw-loader, Node assertions.

## Global Constraints

- Do not modify any `inputTextCorePack-*.tsx` demo source.
- Do not make `inputTextCorePack-shared.tsx` or documentation editable.
- Create source wrappers only with `require("!!raw-loader!./<demo>.tsx")` and default-export the normalized string.
- Keep index imports semicolon-terminated.
- Do not add recipe-specific UI, editor, runner, or supporting-file configuration.
- Runtime bindings must use only values imported by the corresponding demo from `./inputTextCorePack-shared`.

---

### Task 1: Add literal source wrappers

**Files:**
- Create: `src/components/content/examples/form/inputtext/inputTextCorePack/inputTextCorePack-{text,rawValue,noLabel,clearIcon,maxLength,textAlign,virtualKeyboard,width,startEndSlots,prefixSuffix,inputWithButton}-source.ts`
- Inspect: `src/components/content/examples/form/inputtext/inputTextCorePack/inputTextCorePack-states-source.ts`

**Interfaces:**
- Consumes: the real demo TSX files named by each wrapper.
- Produces: a default `string` export for each initial playground source.

- [ ] **Step 1: Add each sibling wrapper using the established exact shape**

```ts
const loadedSource = require("!!raw-loader!./inputTextCorePack-text.tsx");
const source: string =
  typeof loadedSource === "string" ? loadedSource : loadedSource.default;

export default source;
```

Use the wrapper's own demo filename in all 11 wrappers. Do not alter the existing states wrapper.

- [ ] **Step 2: Run TypeScript compilation to verify raw-loader wrapper typing**

Run: `npx tsc --noEmit --pretty false`

Expected: exit code 0.

### Task 2: Register every demo with exact bindings

**Files:**
- Modify: `src/components/content/examples/form/inputtext/inputTextCorePack/index.tsx`

**Interfaces:**
- Consumes: the 12 wrapper default string exports and runtime values from `inputTextCorePack-shared.tsx`.
- Produces: `RecipePageItem["playground"]` for every registered item.

- [ ] **Step 1: Import all wrapper sources and runtime values in `index.tsx`**

Import the 11 new wrapper defaults alongside `inputTextCorePackStatesPlaygroundSource`. Extend the existing shared-module import with `buttonsetItems`, `createBrowserDataProvider`, `labelEdgeOptions`, `maxLengthConfig`, `stateOptions`, `textAlignOptions`, and `valueOptions`.

- [ ] **Step 2: Add source-only playground metadata for demos without local runtime imports**

Add `initialSource` and `fileName` for Value Binding, Raw Value, No Label, Clear Icon, and Virtual Keyboard. For example:

```ts
playground: {
  initialSource: inputTextCorePackTextPlaygroundSource,
  fileName: "inputTextCorePack-text.tsx",
},
```

- [ ] **Step 3: Add the exact runtime bindings for helper-backed demos**

Use these binding sets, matching only runtime imports in the original TSX files:

```ts
// Max Length
runtimeBindings: { maxLengthConfig }

// Text Align
runtimeBindings: { buttonsetItems, createBrowserDataProvider }

// Width
runtimeBindings: { labelEdgeOptions }

// Start & End Slots
runtimeBindings: { labelEdgeOptions, stateOptions, valueOptions }

// Prefix & Suffix
runtimeBindings: { labelEdgeOptions, stateOptions, textAlignOptions, valueOptions }

// Input With Button
runtimeBindings: { createBrowserDataProvider }
```

Keep the existing Overview metadata unchanged, including its five message and length-config bindings. Do not add `supportingFiles`.

### Task 3: Verify source fidelity and type safety

**Files:**
- Verify: `src/components/content/examples/form/inputtext/inputTextCorePack/index.tsx`
- Verify: `src/components/content/examples/form/inputtext/inputTextCorePack/inputTextCorePack-*-source.ts`

**Interfaces:**
- Consumes: completed source wrappers and metadata.
- Produces: verified, buildable recipe registrations.

- [ ] **Step 1: Verify wrapper filenames and raw imports**

Run: `rg -n 'raw-loader!./inputTextCorePack-.*\\.tsx|fileName: "inputTextCorePack-.*\\.tsx"|playground: \{' src/components/content/examples/form/inputtext/inputTextCorePack`

Expected: 12 raw-loader wrapper paths, 12 playground filenames, and 12 playground blocks.

- [ ] **Step 2: Verify the original demo TSX files were not edited**

Run: `git diff --name-only -- src/components/content/examples/form/inputtext/inputTextCorePack`

Expected: only `index.tsx` and new `*-source.ts` wrappers; no demo `*.tsx` source file.

- [ ] **Step 3: Run the required checks**

Run: `npx tsc --noEmit --pretty false && git diff --check`

Expected: both commands exit 0.

- [ ] **Step 4: Perform browser smoke testing when the local app is available**

For a source-only demo and a helper-backed demo, confirm Info is default with disabled controls; open TSX, change visible text, Apply, and Reset. Confirm the preview changes and Reset restores it.

- [ ] **Step 5: Commit the implementation when Git index writes are available**

```bash
git add src/components/content/examples/form/inputtext/inputTextCorePack/index.tsx \
  src/components/content/examples/form/inputtext/inputTextCorePack/inputTextCorePack-*-source.ts \
  docs/superpowers/plans/2026-07-29-input-text-core-pack-playgrounds.md
git commit -m "feat: add input text core pack playgrounds"
```
