import { h } from "preact";

export const inputTextLegacyDescription = (
  <>
    <p>
      This recipe wraps the legacy <code>oj-input-text</code> example in the
      recipe layout.
    </p>
    <p>
      It takes cues from the cookbook text input examples for clear icons, raw
      value, max length, alignment, wrapping, slots, and keyboard settings.
    </p>
  </>
);

export const inputTextLegacyRecipe = (
  <ol>
    <li>Add an <code>oj-input-text</code> field.</li>
    <li>
      Configure value, label, max length, and any start or end adornments.
    </li>
    <li>
      Add state or keyboard options to demonstrate how plain text entry behaves
      in different form scenarios.
    </li>
  </ol>
);
