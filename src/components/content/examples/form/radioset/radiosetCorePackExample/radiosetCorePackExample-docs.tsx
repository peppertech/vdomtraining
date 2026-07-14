import 'preact';
import type { ComponentChildren } from "preact";

export type RadiosetCorePackDemoId =
  | "overview"
  | "basic"
  | "user-assistance"
  | "validation"
  | "data-provider";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const radiosetCorePackDocs: Record<
  RadiosetCorePackDemoId,
  DocsEntry
> = {
  overview: {
    description: (
      <>
        <p>
          This overview highlights the main visual behaviors of{" "}
          <code>oj-c-radioset</code>, including state, label edge, direction,
          help, and messaging examples.
        </p>
        <p>
          It mirrors the core pack cookbook states demo while fitting the
          recipe-first layout used across the VDOM examples.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-c-form-layout</code> to organize the state, help, and
          messaging sections consistently.
        </li>
        <li>
          Show enabled, disabled, and readonly variations, then compare
          <code>direction</code> and <code>labelEdge</code> options.
        </li>
        <li>
          Pair <code>required</code>, help props, and{" "}
          <code>messagesCustom</code> so the page also works as a compact
          behavior reference.
        </li>
      </ul>
    ),
  },
  basic: {
    description: (
      <>
        <p>
          This demo shows how to create a basic <code>oj-c-radioset</code>{" "}
          using an array of data items and an initial <code>value</code>.
        </p>
        <p>
          The displayed text updates as the selected radio changes.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-radioset</code>.</li>
        <li>
          Bind the <code>options</code> prop to an array of color options that
          creates the radio items for the set.
        </li>
        <li>
          Set <code>value</code> to an initial option and update it as the user
          changes selection.
        </li>
        <li>
          Provide <code>labelHint</code> so the component remains accessible.
        </li>
      </ol>
    ),
  },
  "user-assistance": {
    description: (
      <>
        <p>
          This demo shows user assistance for both the radio set and individual
          radio items.
        </p>
        <p>
          The control state can be toggled to enabled, disabled, or readonly to
          compare how assistance behaves in each state.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-radioset</code>.</li>
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
          This demo shows required validation for <code>oj-c-radioset</code>.
        </p>
        <p>
          Setting the value to <code>null</code> clears the selection, and
          calling <code>validate()</code> surfaces the required error.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-radioset</code> with an options array.</li>
        <li>
          Set <code>value</code> to an initial item so a matching radio is
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
  "data-provider": {
    description: (
      <>
        <p>
          This demo shows how to populate <code>oj-c-radioset</code> with an{" "}
          <code>ArrayDataProvider</code> and swap providers dynamically.
        </p>
        <p>
          Changing the bound DataProvider automatically rerenders the radioset
          with the new options.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-c-radioset</code> element.</li>
        <li>
          Build an <code>ArrayDataProvider</code> from an array whose items
          include a required <code>label</code> field.
        </li>
        <li>
          Bind the <code>options</code> prop to that DataProvider.
        </li>
        <li>
          Change the active DataProvider with a button to rerender the radioset
          using a new option list.
        </li>
      </ul>
    ),
  },
};
