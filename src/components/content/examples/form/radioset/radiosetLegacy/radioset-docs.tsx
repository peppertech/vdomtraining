import 'preact';
import type { ComponentChildren } from "preact";

export type RadiosetDemoId =
  | "overview"
  | "basic"
  | "readonly"
  | "validation"
  | "data-provider";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const radiosetDocs: Record<RadiosetDemoId, DocsEntry> = {
  overview: {
    description: (
      <>
        <p>
          This demo allows you to quickly scan some of the more important
          visual aspects of <code>oj-radioset</code>.
        </p>
        <p>
          It also shows states, row direction, required, help, messages, and
          wrapping behavior in a single page.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-form-layout</code> in each section to compare radioset
          behavior consistently across states.
        </li>
        <li>
          <code>oj-radioset</code> is enabled by default. Set{" "}
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
          shown when a readonly radioset has no selected value.
        </li>
      </ul>
    ),
  },
  basic: {
    description: (
      <>
        <p>
          This is a basic demo of the <code>oj-radioset</code> component.
        </p>
        <p>
          It shows how to create the component, set the{" "}
          <code>value</code> attribute, and update the bound value as the user
          changes selection.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-radioset</code>.</li>
        <li>
          Add explicit <code>oj-option</code> elements or render them from an
          array of options.
        </li>
        <li>
          Set the radioset&apos;s <code>value</code> to the initial option so
          the matching radio is checked on first render.
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
      <>
        <p>
          This demo shows how <code>oj-radioset</code> and its options are
          displayed when the component is readonly.
        </p>
        <p>
          It also includes a no-value example that customizes the readonly
          empty text.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-radioset</code> that wraps the options.</li>
        <li>
          Set the <code>readonly</code> attribute on <code>oj-radioset</code>.
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
          <code>oj-radioset</code>.
        </p>
        <p>
          If the value is set to <code>null</code> or to a value that does not
          match any option, required validation shows an error after validation
          is triggered.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-radioset</code> with option children.</li>
        <li>
          Set the initial <code>value</code> so a matching option is checked on
          first render.
        </li>
        <li>
          Set <code>label-edge=&quot;inside&quot;</code> and{" "}
          <code>label-hint</code> for accessibility.
        </li>
        <li>Set the <code>required</code> attribute.</li>
        <li>
          Update the value programmatically and call <code>validate()</code> to
          surface the required error state.
        </li>
      </ol>
    ),
  },
  "data-provider": {
    description: (
      <>
        <p>
          This demo shows how to populate an <code>oj-radioset</code>{" "}
          element&apos;s options with an <code>ArrayDataProvider</code>.
        </p>
        <p>
          Changing the bound DataProvider automatically rerenders the radioset
          with the new options.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-radioset</code> element.</li>
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
          the radioset without calling <code>refresh()</code>.
        </li>
      </ul>
    ),
  },
};
