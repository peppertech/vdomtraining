import { h } from "preact";
import type { ComponentChildren } from "preact";

export type CheckBoxSetDemoId =
  | "overview"
  | "basic"
  | "readonly"
  | "validation"
  | "data-provider"
  | "filter"
  | "single-item"
  | "no-item-label"
  | "context-menu";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const checkBoxSetDocs: Record<CheckBoxSetDemoId, DocsEntry> = {
  overview: {
    description: (
      <>
        <p>
          This demo allows you to quickly scan some of the more important
          visual aspects of <code>oj-checkboxset</code>.
        </p>
        <p>
          It also shows state, row direction, required, help, messages, and
          wrapping behavior in one place.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-form-layout</code> in each section to compare
          checkboxset behavior consistently across states.
        </li>
        <li>
          <code>oj-checkboxset</code> is enabled by default. Set{" "}
          <code>disabled=&quot;true&quot;</code> or{" "}
          <code>readonly=&quot;true&quot;</code> for disabled and readonly
          behavior.
        </li>
        <li>
          Use <code>class=&quot;oj-choice-direction-row&quot;</code> for a
          horizontal layout.
        </li>
        <li>
          Add required, help, and message examples so the page also serves as a
          compact user assistance reference.
        </li>
        <li>
          Use <code>translations.readonlyNoValue</code> to customize the text
          shown when a readonly checkboxset has no selected value.
        </li>
      </ul>
    ),
  },
  basic: {
    description: (
      <>
        <p>
          This is a basic demo of the <code>oj-checkboxset</code> component.
        </p>
        <p>
          It shows how to create the component, set the{" "}
          <code>value</code> attribute, and update the bound value as the user
          checks or unchecks options.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-checkboxset</code>.</li>
        <li>
          Add explicit <code>oj-option</code> elements or render them from an
          array of options.
        </li>
        <li>
          Set the checkboxset&apos;s <code>value</code> to the initial array so
          matching options are checked on first render.
        </li>
        <li>
          Set <code>label-edge=&quot;inside&quot;</code> and{" "}
          <code>label-hint</code> to make the component accessible.
        </li>
        <li>
          If the options need to change dynamically, use a DataProvider instead
          of hard-coded items.
        </li>
      </ol>
    ),
  },
  readonly: {
    description: (
      <p>
        This demo shows how <code>oj-checkboxset</code> and its options are
        displayed when the component is readonly.
      </p>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-checkboxset</code> that wraps the options.</li>
        <li>
          Set the <code>readonly</code> attribute on{" "}
          <code>oj-checkboxset</code>.
        </li>
        <li>
          Optionally set <code>translations.readonlyNoValue</code> to customize
          the empty readonly text.
        </li>
      </ol>
    ),
  },
  validation: {
    description: (
      <>
        <p>
          This demo runs the <code>required</code> validator for{" "}
          <code>oj-checkboxset</code>.
        </p>
        <p>
          If the value is set to an empty array or to values that do not match
          any option, required validation shows an error after validation is
          triggered.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-checkboxset</code> with option children.</li>
        <li>
          Set the initial <code>value</code> to an array so matching options
          are checked on first render.
        </li>
        <li>
          Set <code>label-edge=&quot;inside&quot;</code> and{" "}
          <code>label-hint</code> for accessibility.
        </li>
        <li>Set the <code>required</code> attribute.</li>
        <li>
          Update the value programmatically and call{" "}
          <code>validate()</code> to surface the required error state.
        </li>
      </ol>
    ),
  },
  "data-provider": {
    description: (
      <>
        <p>
          This demo shows how to populate an <code>oj-checkboxset</code>{" "}
          element&apos;s options with an <code>ArrayDataProvider</code>.
        </p>
        <p>
          Changing the bound DataProvider automatically rerenders the
          checkboxset with the new options.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-checkboxset</code> element.</li>
        <li>
          Create an <code>ArrayDataProvider</code> from an array whose items
          include a required <code>value</code> field and an optional{" "}
          <code>label</code> field.
        </li>
        <li>
          Bind the <code>options</code> attribute to the DataProvider.
        </li>
        <li>
          Change the DataProvider in response to a button action to rerender
          the checkboxset without calling <code>refresh()</code>.
        </li>
      </ul>
    ),
  },
  filter: {
    description: (
      <>
        <p>
          This demo shows the recommended UI for using{" "}
          <code>oj-checkboxset</code> as a filter.
        </p>
        <p>
          The filter count appears in parentheses after the label text with one
          space in between.
        </p>
      </>
    ),
    recipe: (
      <p>
        Add the count in parentheses as part of each option label, and bind the
        number when the count is dynamic.
      </p>
    ),
  },
  "single-item": {
    description: (
      <p>
        This demo shows a checkboxset with a single item both outside a form
        and inside a form layout.
      </p>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-checkboxset</code> as usual.</li>
        <li>
          Add one <code>oj-option</code> child for a single-item checkboxset.
        </li>
      </ol>
    ),
  },
  "no-item-label": {
    description: (
      <>
        <p>
          This is a demo of the checkboxset component without visible label
          text next to each item.
        </p>
        <p>
          Add <code>aria-label</code> on each <code>oj-option</code> to keep
          it accessible.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          If there is no main label, set <code>label-hint</code> and{" "}
          <code>label-edge=&quot;none&quot;</code> on the checkboxset.
        </li>
        <li>
          If you do not want a visible label on each checkbox, omit the option
          label and set <code>aria-label</code> on each <code>oj-option</code>.
        </li>
      </ol>
    ),
  },
  "context-menu": {
    description: (
      <p>
        This demo shows a JET Checkboxset with a context menu. Open the menu by
        right-clicking, pressing Shift+F10, or press-and-hold on touch devices.
      </p>
    ),
    recipe: <ul></ul>,
  },
};
