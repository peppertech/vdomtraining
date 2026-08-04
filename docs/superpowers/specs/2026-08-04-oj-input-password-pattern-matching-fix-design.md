# `oj-input-password` Pattern Matching Fix Design

## Goal

Correct the legacy Pattern Matching demo so its password field renders reliably and its third rule matches the reference demo: exactly eight characters.

## Root Cause

The reference implementation at `content/passwordInput-patternMatching` does not write the `rawValue` property. The current demo writes `rawValue={passwordValue}` even though Oracle JET declares `oj-input-password.rawValue` as read-only. Rendering a custom element with that controlled, read-only property can fail before the input is available.

The reference also implements the third rule as `^.{8}$`. The current demo drifted to `^.{8,}$`, which accepts more than eight characters despite the visible label remaining “8 Characters”.

## Design

Keep the existing Preact implementation and shared recipe playground. Replace the single password state with two states:

- `rawPasswordValue` receives `onrawValueChanged` and drives the rules, gauge, and guidance visibility.
- `passwordValue` receives `onvalueChanged` and remains the component's controlled validated value.

Remove the `rawValue` JSX property entirely. The value prop remains bound to `passwordValue`; invalid typing still updates `rawPasswordValue` for live feedback without attempting to write JET's read-only property.

Update the third rule to `^.{8}$`. Do not copy the reference's undefined legacy bindings, direct DOM mutation, or mismatched `demo-invalidShown` casing.

## Regression Coverage

Add a focused source contract test that requires the exact-eight rule, separate raw and validated state, and no `rawValue` property assignment. The existing playground registration test continues to prove that the editable TSX and CSS sources remain exposed through the shared playground.

## Verification

Run the new focused test, the existing input-password playground test, `npx tsc --noEmit --pretty false`, and `git diff --check`.
