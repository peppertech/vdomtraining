import { h } from "preact";
import type { ComponentChildren } from "preact";

export type InputPasswordCorePackDemoId = "states" | "clear-icon" | "width";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const inputPasswordCorePackDocs: Record<
  InputPasswordCorePackDemoId,
  DocsEntry
> = {
  states: {
    description: (
      <p>
        This demo shows some of the more important visual aspects of{" "}
        <code>oj-c-input-password</code>.
      </p>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-c-form-layout</code> for layout-managed state, help, and
          message sections.
        </li>
        <li>
          Compare enabled, disabled, and readonly fields both inside and outside
          form layout because assistance spacing differs.
        </li>
        <li>
          Show label edge, text alignment, mask icon, required, clear icon,
          placeholder, help, and messages as a compact visual reference.
        </li>
      </ul>
    ),
  },
  "clear-icon": {
    description: (
      <p>
        This demo shows example usage of the <code>clearIcon</code> attribute
        of <code>oj-c-input-password</code>, including required and conditional
        clear icon behavior.
      </p>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-password</code> element.</li>
        <li>
          Set <code>clearIcon</code> to one of the supported values:{" "}
          <code>never</code>, <code>always</code>, or{" "}
          <code>conditional</code>.
        </li>
        <li>
          For conditional clear icon behavior, observe both <code>value</code>{" "}
          and <code>rawValue</code> so the clear interaction is visible.
        </li>
      </ol>
    ),
  },
  width: {
    description: (
      <p>
        This demo shows how to control the width and max-width of form controls.
        By default, outside a form layout, a form control stretches to the size
        of its container.
      </p>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-password</code> element.</li>
        <li>
          Set <code>width</code> to <code>sm</code>, <code>md</code>, or a
          custom CSS length.
        </li>
        <li>
          Set <code>maxWidth</code> to <code>sm</code>, <code>md</code>, or a
          custom CSS length. Outside <code>oj-c-form-layout</code>, use{" "}
          <code>maxWidth=&quot;md&quot;</code> to match form-layout sizing.
        </li>
      </ol>
    ),
  },
};
