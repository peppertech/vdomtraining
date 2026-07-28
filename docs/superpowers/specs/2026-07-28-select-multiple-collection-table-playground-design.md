# Select Multiple Collection Table Playground Design

## Goal

Add the shared editable cookbook playground to the Select Multiple Core Pack “Collection Template (Table)” recipe, with the literal TSX and employee JSON editable in separate tabs and changes applied to the existing article demo.

## Scope

The playground applies only to the Select Multiple Core Pack collection-table recipe. The implementation will modify that TSX, its recipe registration and shared helper signatures, and the central exact import allowlist. It will also add the two raw-source wrappers described below.

It reuses the existing `TsxPlayground`, `RecipePageTemplate`, and `DemoLayoutTemplate` infrastructure. No recipe-specific editor, preview, toolbar, or compiler will be created.

## Source and Data Flow

Create raw-source wrappers for:

- `selectMultiple-collectionTemplateTable.tsx`;
- `../../data/employeeData.json`.

The demo TSX will import `employeeData.json` directly, parse it as `OracleEmployee[]`, and pass the parsed array to:

- `createOracleEmployeeDataProvider`;
- `getEmployeeNames`.

Both shared helpers will accept an optional employee array while retaining the current shared dataset as their default. This preserves all existing Select Multiple demos.

The recipe registration will supply:

- the literal TSX as `initialSource`;
- the real TSX filename;
- `createOracleEmployeeDataProvider`, `getEmployeeItemText`, `getEmployeeNames`, and `renderEmployeeCollectionTable` as runtime bindings;
- the literal JSON as a `json` supporting file using the exact `text!../../data/employeeData.json` import specifier and `employeeDataText` binding.

The shared playground allowlist will add only:

- `oj-c/select-multiple`;
- `./selectMultiple-shared`.

## User Experience

The recipe will use the standard shared behavior:

- Info is first and selected by default.
- Info renders the recipe read-only and hides the filename and Monaco editor.
- Dark mode, Apply changes, and Reset remain visible but disabled on Info.
- TSX and JSON tabs enable those controls and preserve edits while switching tabs.
- Apply reads both live Monaco models and replaces the existing article demo.
- Reset restores and reapplies both original files.
- TSX uses the shared syntax highlighting and editor-only dark mode.

No CSS tab is needed because the target TSX has no local CSS import.

## Errors and Safety

The existing trusted-code runner remains unchanged. Its exact import allowlist stays narrow. Invalid JSON, unsupported imports, and compile errors appear in the Try it error area and restore the normal demo. Render-time and event-handler exceptions remain outside the playground error contract.

## Verification

Run:

```bash
npx tsc --noEmit --pretty false
git diff --check
```

Then verify in the running cookbook:

1. Collection Template (Table) shows Info, TSX, and JSON tabs.
2. Info has hidden editor content and visible disabled controls.
3. TSX and JSON enable the controls and retain edits across tab switches.
4. A TSX label change appears in the article demo only after Apply changes.
5. A valid JSON employee-name change appears in the table and selected-employee text after Apply changes.
6. Invalid JSON reports an error and restores the normal demo.
7. Reset restores both files and the original article demo.
