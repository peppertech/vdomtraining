// @ts-nocheck
import { h } from 'preact';

export const selectorCheckboxSelectableTreeViewDescription = (
  <>
    <p>The selector component renders checkboxes in collections to support selection.</p>
    <p>This demo shows single, multiple, leaf-only, and no-selection treeView modes.</p>
    <p><b>Multiple vs Multiple Toggle Selection</b></p>
    <ul>
      <li>Multiple selection treats most gestures as replace gestures.</li>
      <li>MultipleToggle selection treats gestures as toggle gestures.</li>
    </ul>
    <p><b>Leaf Only vs Leaf Only Toggle Selection</b></p>
    <ul>
      <li>LeafOnly lets child items drive the parent selection state.</li>
      <li>LeafOnlyToggle combines that behavior with toggle gestures.</li>
    </ul>
  </>
);
