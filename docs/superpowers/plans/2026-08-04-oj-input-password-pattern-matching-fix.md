# `oj-input-password` Pattern Matching Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the Pattern Matching password input and make its third rule require exactly eight characters.

**Architecture:** Keep all behavior in the existing demo TSX so the raw-source playground remains byte-for-byte equivalent to the actual demo. Separate raw typing state from the validated component value, never write JET's read-only `rawValue` property, and use the raw state for live rule feedback.

**Tech Stack:** Preact, Oracle JET legacy `oj-input-password`, TypeScript, Node.js assertions, shared TSX playground.

## Global Constraints

- Use the reference `content/passwordInput-patternMatching` only as the behavioral source: exactly eight characters and no write to `rawValue`.
- Retain the current Preact state-driven rendering, lower-case CSS state names, existing JET imports, and existing editable CSS playground tab.
- Do not add a local runtime module because the TSX source executes in the shared playground runner.
- Keep every TSX import semicolon-terminated.

---

### Task 1: Add a failing regression test for the actual password rule

**Files:**
- Create: `src/components/content/examples/form/inputpassword/inputPasswordLegacy/inputPassword-patternMatching.test.ts`

**Interfaces:**
- Consumes: the real Pattern Matching TSX source.
- Produces: an executable test that evaluates the real `rules` declaration, proving eight characters pass and nine characters fail.

- [ ] **Step 1: Write the failing test**

Create a Node assertion test that reads `inputPassword-patternMatching.tsx`, removes its semicolon-terminated imports, keeps the source through `const getStrengthText`, transpiles it with `typescript.transpileModule`, and evaluates the resulting `rules` declaration. Assert:

```ts
strictEqual(rules[2].test("12345678"), true);
strictEqual(rules[2].test("123456789"), false);
doesNotMatch(source, /rawValue=\{/);
```

The nine-character assertion must fail before the fix because the current expression is `^.{8,}$`.

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
node src/components/content/examples/form/inputpassword/inputPasswordLegacy/inputPassword-patternMatching.test.ts
```

Expected: FAIL because the third rule accepts `123456789`.

---

### Task 2: Separate raw typing state from the validated value

**Files:**
- Modify: `src/components/content/examples/form/inputpassword/inputPasswordLegacy/inputPassword-patternMatching.tsx`

**Interfaces:**
- Consumes: `onrawValueChanged` and `onvalueChanged` events from `oj-input-password`.
- Produces: a rendered password input that does not write the JET read-only `rawValue` property; the rule list, gauge, and help state reflect `rawPasswordValue` while the component value remains `passwordValue`.

- [ ] **Step 1: Change the rule and state declarations**

Replace the third rule with:

```ts
test: (value: string) => /^.{8}$/.test(value),
```

Add:

```ts
const [rawPasswordValue, setRawPasswordValue] = useState("");
const [passwordValue, setPasswordValue] = useState("");
```

- [ ] **Step 2: Drive live feedback from raw input**

Use `rawPasswordValue` in `passedRules` and `showRules`. Remove the `rawValue={passwordValue}` JSX property. `onrawValueChanged` calls `setRawPasswordValue`; `onvalueChanged` calls `setPasswordValue`.

- [ ] **Step 3: Run the focused test and verify GREEN**

Run:

```bash
node src/components/content/examples/form/inputpassword/inputPasswordLegacy/inputPassword-patternMatching.test.ts
```

Expected: exit code 0.

---

### Task 3: Verify the recipe and playground contract

**Files:**
- Verify: the Pattern Matching TSX, its source wrapper, CSS supporting file registration, and tests.

- [ ] **Step 1: Run the existing playground registration test**

```bash
node src/components/content/examples/form/inputpassword/inputPasswordLegacy/inputPassword-playgrounds.test.ts
```

Expected: exit code 0.

- [ ] **Step 2: Run TypeScript and diff hygiene checks**

```bash
npx tsc --noEmit --pretty false
git diff --check
```

Expected: both commands exit 0.

- [ ] **Step 3: Commit the verified fix**

```bash
git add src/components/content/examples/form/inputpassword/inputPasswordLegacy docs/superpowers/plans/2026-08-04-oj-input-password-pattern-matching-fix.md
git commit -m "fix: restore input password pattern matching"
```
