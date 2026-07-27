# Playground Apply Chroming Design

## Goal

Use `chroming="callToAction"` on the playground's Apply changes button only while the editor contains changes that have not been successfully applied.

## Behavior

- The initial TSX and supporting-file sources are the initial applied baseline.
- Editing any TSX, JSON, CSS, or text tab activates call-to-action chroming.
- Manually restoring every edited file to the applied baseline removes call-to-action chroming.
- A successful Apply updates the applied baseline and removes call-to-action chroming.
- A failed Apply leaves the applied baseline unchanged, so call-to-action chroming remains active.
- Reset restores and applies the original sources, then removes call-to-action chroming.
- The Apply button remains usable when no changes are pending; only its chroming changes.

## Implementation

`TsxPlayground` will keep the current editor sources and the last successfully applied sources as separate state. A small pure comparison helper will determine whether any file differs. The Apply button will receive `chroming="callToAction"` only when that comparison reports unapplied changes.

`applySources` will report success or failure so the applied baseline advances only after successful compilation and application.

## Testing

- A pure-state regression test will cover unchanged sources, edits in a supporting file, reverting an edit, and advancing the applied baseline.
- Run `npx tsc --noEmit --pretty false`.
- Run `git diff --check`.
