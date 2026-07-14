import 'preact';
import type { ComponentChildren } from "preact";

export type CheckBoxSetCorePackDemoId =
  | "overview"
  | "basic"
  | "data-provider"
  | "user-assistance"
  | "validation";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const checkBoxSetCorePackDocs: Record<
  CheckBoxSetCorePackDemoId,
  DocsEntry
> = {
  overview: {
    description: (
      <>
        <p>
          This overview highlights the main visual behaviors of{" "}
          <code>oj-c-checkboxset</code>, including state, label edge, direction,
          help, and messaging examples.
        </p>
        <p>
          It mirrors the core pack cookbook states demo while fitting the newer
          recipe-first layout used across the VDOM examples.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>disabled</code> and <code>readonly</code> to show the key
          state variations of <code>oj-c-checkboxset</code>.
        </li>
        <li>
          Use <code>labelEdge</code> and <code>direction</code> to demonstrate
          layout differences such as inside, top, start, and row orientation.
        </li>
        <li>
          Pair <code>required</code>, help props, and{" "}
          <code>messagesCustom</code> so the page also works as a user
          assistance reference.
        </li>
      </ul>
    ),
  },
  basic: {
    description: (
      <>
        <p>
          This demo shows how to create a basic <code>oj-c-checkboxset</code>{" "}
          using an array of data items and an initial <code>value</code>.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-checkboxset</code>.</li>
        <li>
          Bind the <code>options</code> prop to an array of color options that
          creates the checkbox items for the set.
        </li>
        <li>
          Set <code>value</code> to an initial array and update it as the user
          changes selection.
        </li>
        <li>
          Provide <code>labelHint</code> so the component remains accessible.
        </li>
      </ol>
    ),
  },
  "data-provider": {
    description: (
      <>
        <p>
          This demo shows how to populate <code>oj-c-checkboxset</code> with an{" "}
          <code>ArrayDataProvider</code> and swap providers dynamically.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-c-checkboxset</code> element.</li>
        <li>
          Build an <code>ArrayDataProvider</code> from an array whose items
          include a required <code>label</code> field.
        </li>
        <li>
          Change the active data provider with a button to rerender the
          checkboxset using a new option list.
        </li>
      </ul>
    ),
  },
  "user-assistance": {
    description: (
      <>
        <p>
          This demo shows user assistance for both the checkbox set and
          individual checkbox items.
        </p>
        <p>
          The control state can be toggled to enabled, disabled, or readonly to
          compare how assistance behaves in each state.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-checkboxset</code>.</li>
        <li>
          Add <code>assistiveText</code>, <code>helpSourceLink</code>, and{" "}
          <code>helpSourceText</code> to option items when you need
          item-specific guidance.
        </li>
        <li>
          Set component-level help through <code>help</code> or{" "}
          <code>helpHints</code>.
        </li>
        <li>
          Combine different <code>labelEdge</code> and <code>direction</code>{" "}
          values to compare assistance placement across layouts.
        </li>
      </ol>
    ),
  },
  validation: {
    description: (
      <>
        <p>
          This demo shows required validation for <code>oj-c-checkboxset</code>.
        </p>
        <p>
          Setting the value to an empty array clears all selections, and
          calling <code>validate()</code> surfaces the required error.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-checkboxset</code> with an options array.</li>
        <li>
          Set <code>value</code> to an initial array so matching checkboxes are
          selected on first render.
        </li>
        <li>Enable the <code>required</code> prop.</li>
        <li>
          Clear the value programmatically and then call{" "}
          <code>validate()</code> to show the required error.
        </li>
      </ol>
    ),
  },
};
