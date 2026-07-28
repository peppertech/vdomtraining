# Playground Info Toolbar Read-Only Design

## Goal

Keep the Dark mode switch, Apply changes button, and Reset button visible when the code playground's default Info tab is selected, while preventing those controls from changing editor or preview state.

## Design

The shared `TsxPlayground` toolbar will always render its existing controls container. When `activeFileName` identifies the Info tab, `isInfoTab` will set the `disabled` property on:

- the Dark mode `oj-switch`;
- the Apply changes `oj-c-button`;
- the Reset `oj-c-button`.

Selecting a TSX, JSON, CSS, or text file tab will make all three controls interactive again. No recipe registration will implement its own visibility or disabled-state logic.

Using each JET component's native `disabled` property preserves the existing toolbar layout and supplies the correct visual, keyboard, and accessibility semantics. CSS-only blocking and no-op event handlers are intentionally excluded.

## Unchanged Behavior

- Info remains the first and default tab.
- Info remains a read-only rendered recipe panel.
- The Monaco editor and filename remain hidden on Info.
- Apply changes, Reset, and Dark mode behave as before on editable file tabs.
- The article demo remains the preview.

## Testing

Add a focused regression test that demonstrates the toolbar-state rule:

1. Info state keeps the control group visible and disables all three controls.
2. An editable-file state enables all three controls.

Run the focused test first and confirm it fails against the current conditional rendering. After the minimal shared-component change, rerun it, then run TypeScript compilation and `git diff --check`.
