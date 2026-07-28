# Playground Info Toolbar Read-Only Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the playground control group visible but disabled while Info is selected, and enable it on editable file tabs.

**Architecture:** Extract the existing control `<div>` into a small stateless Preact VDOM component. `TsxPlayground` will always render that component and pass `isInfoTab` as its disabled state; a server-rendered regression test will assert the resulting user-visible markup without initializing Monaco.

**Tech Stack:** TypeScript, Preact VDOM, Oracle JET `oj-switch` and `oj-c-button`, Node assertions, `preact-render-to-string`

## Global Constraints

- Info remains the first and default tab.
- Info remains a read-only rendered recipe panel.
- The Monaco editor and filename remain hidden on Info.
- All three controls remain visible and disabled on Info.
- All three controls remain enabled on TSX, JSON, CSS, and text tabs.
- Apply changes, Reset, and Dark mode behavior remains unchanged on editable tabs.
- Control registration and state logic remain shared, never recipe-specific.

---

### Task 1: Render shared toolbar controls in disabled and enabled states

**Files:**
- Create: `src/components/shared/code-playground/playground-controls.ts`
- Create: `src/components/shared/code-playground/playground-controls.test.ts`
- Modify: `src/components/shared/code-playground/tsx-playground.tsx:1-8,625-644`

**Interfaces:**
- Consumes: `disabled: boolean`, `isDarkMode: boolean`, `onDarkModeChange(value: boolean): void`, `onApply(): void`, and `onReset(): void`
- Produces: `PlaygroundControls(props): VNode`, containing the existing Dark mode switch, Apply changes button, and Reset button

- [x] **Step 1: Write the failing rendered-markup test**

Create `playground-controls.test.ts`:

```ts
const { match, doesNotMatch } = require("node:assert/strict");
const { h } = require("preact");
const renderToString = require("preact-render-to-string");
const { PlaygroundControls } = require("./playground-controls.ts");

const callbacks = {
  onDarkModeChange: (_value: boolean) => undefined,
  onApply: () => undefined,
  onReset: () => undefined,
};

const infoMarkup = renderToString(
  h(PlaygroundControls, {
    ...callbacks,
    disabled: true,
    isDarkMode: false,
  }),
);

match(
  infoMarkup,
  /<oj-switch(?=[^>]*labelHint="Dark mode")(?=[^>]*\sdisabled(?:\s|>))[^>]*>/,
);
match(
  infoMarkup,
  /<oj-c-button(?=[^>]*label="Apply changes")(?=[^>]*\sdisabled(?:\s|>))[^>]*>/,
);
match(
  infoMarkup,
  /<oj-c-button(?=[^>]*label="Reset")(?=[^>]*\sdisabled(?:\s|>))[^>]*>/,
);

const editableMarkup = renderToString(
  h(PlaygroundControls, {
    ...callbacks,
    disabled: false,
    isDarkMode: false,
  }),
);

match(editableMarkup, /labelHint="Dark mode"/);
match(editableMarkup, /label="Apply changes"/);
match(editableMarkup, /label="Reset"/);
doesNotMatch(editableMarkup, /\sdisabled(?:\s|>)/);
```

- [x] **Step 2: Run the focused test and verify RED**

Run:

```bash
node --experimental-strip-types src/components/shared/code-playground/playground-controls.test.ts
```

Expected: FAIL because `./playground-controls.ts` does not exist.

- [x] **Step 3: Implement the stateless controls component**

Create `playground-controls.ts`:

```ts
import type { ButtonIntrinsicProps } from "oj-c/button/button";
import type { SwitchIntrinsicProps } from "ojs/ojswitch";
import { h, type VNode } from "preact";

type Props = Readonly<{
  disabled: boolean;
  isDarkMode: boolean;
  onDarkModeChange: (value: boolean) => void;
  onApply: () => void;
  onReset: () => void;
}>;

export function PlaygroundControls({
  disabled,
  isDarkMode,
  onDarkModeChange,
  onApply,
  onReset,
}: Props): VNode {
  const switchProps: SwitchIntrinsicProps = {
    disabled,
    value: isDarkMode,
    labelHint: "Dark mode",
    labelEdge: "inside",
    onvalueChanged: (event) => onDarkModeChange(!!event.detail.value),
  };
  const applyProps: ButtonIntrinsicProps = {
    class: "oj-sm-margin-2x-start",
    disabled,
    label: "Apply changes",
    chroming: "callToAction",
    onojAction: onApply,
  };
  const resetProps: ButtonIntrinsicProps = {
    class: "oj-sm-margin-2x-start",
    disabled,
    label: "Reset",
    chroming: "outlined",
    onojAction: onReset,
  };

  return h(
    "div",
    null,
    h("oj-switch", switchProps),
    h("oj-c-button", applyProps),
    h("oj-c-button", resetProps),
  );
}
```

In `tsx-playground.tsx`, import `PlaygroundControls` and replace the conditional control block with:

```tsx
<PlaygroundControls
  disabled={isInfoTab}
  isDarkMode={isDarkMode}
  onDarkModeChange={setIsDarkMode}
  onApply={run}
  onReset={reset}
/>
```

Keep the existing `oj-c/button` and `ojs/ojswitch` side-effect imports in `tsx-playground.tsx` so the custom elements remain registered.

- [x] **Step 4: Run focused test and TypeScript verification**

Run:

```bash
node --experimental-strip-types src/components/shared/code-playground/playground-controls.test.ts
npx tsc --noEmit --pretty false
git diff --check
```

Expected: all commands exit `0`; the focused test emits no assertion failure.

- [x] **Step 5: Review the focused diff and commit**

Run:

```bash
git diff -- src/components/shared/code-playground/playground-controls.ts src/components/shared/code-playground/playground-controls.test.ts src/components/shared/code-playground/tsx-playground.tsx
git status --short
```

Confirm no recipe-specific files changed, then commit:

```bash
git add docs/superpowers/plans/2026-07-28-playground-info-toolbar-readonly.md src/components/shared/code-playground/playground-controls.ts src/components/shared/code-playground/playground-controls.test.ts src/components/shared/code-playground/tsx-playground.tsx
git commit -m "fix: keep playground controls visible on info"
```
