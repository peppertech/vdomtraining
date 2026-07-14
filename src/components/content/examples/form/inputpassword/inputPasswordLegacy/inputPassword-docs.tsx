import 'preact';
import type { ComponentChildren } from "preact";

export type InputPasswordDemoId =
  | "overview"
  | "binding"
  | "pattern-matching"
  | "read-only"
  | "no-label"
  | "width"
  | "text-align"
  | "styling";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const inputPasswordDocs: Record<InputPasswordDemoId, DocsEntry> = {
  overview: {
    description: (
      <>
        <p>
          This demo allows you to quickly scan important visual aspects of{" "}
          <code>oj-input-password</code>.
        </p>
        <p>
          It shows states, the mask visibility icon, required and placeholder
          behavior, help, and custom messages in <code>oj-form-layout</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-form-layout</code> to organize the state, mask icon,
          required, help, and messages sections.
        </li>
        <li>
          Set <code>disabled</code> or <code>readonly</code> for disabled and
          read only states.
        </li>
        <li>
          Set <code>maskIcon=&quot;visible&quot;</code> when the user should be
          able to unmask the password.
        </li>
      </ul>
    ),
  },
  binding: {
    description: (
      <p>
        This demo shows how to bind data to the <code>value</code> attribute.
      </p>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-input-password</code> element and assign it an id.
        </li>
        <li>
          Bind the <code>value</code> attribute to component state.
        </li>
      </ol>
    ),
  },
  "pattern-matching": {
    description: (
      <p>
        This demo shows password pattern matching against a set of regular
        expressions.
      </p>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-input-password</code> element and bind its value.
        </li>
        <li>
          Render an <code>oj-status-meter-gauge</code> and status text to show
          the current match strength.
        </li>
        <li>
          Validate the password against rules for uppercase letters, a number,
          and minimum length, then update the rule list and gauge.
        </li>
      </ol>
    ),
  },
  "read-only": {
    description: (
      <p>
        This demo shows <code>oj-input-password</code> when{" "}
        <code>readonly</code> is true.
      </p>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-input-password</code> element and assign it an id.
        </li>
        <li>Create an <code>oj-label</code> associated with that id.</li>
        <li>
          Set <code>readonly</code> to <code>true</code>.
        </li>
      </ol>
    ),
  },
  "no-label": {
    description: (
      <>
        <p>
          In some cases the purpose of a field may be obvious to a sighted user
          and you do not need a visible label.
        </p>
        <p>
          Use <code>labelHint</code> and <code>labelEdge=&quot;none&quot;</code>{" "}
          so the component renders an accessible aria-label.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          If there is no visible label, add <code>labelHint</code> and{" "}
          <code>labelEdge=&quot;none&quot;</code>.
        </li>
        <li>
          Keep the label hint even when placeholder text is present, because
          placeholder text is not reliably read by screen readers.
        </li>
      </ol>
    ),
  },
  width: {
    description: (
      <p>
        This demo shows how to control the width and max-width with both
        framework and custom classes.
      </p>
    ),
    recipe: (
      <ul>
        <li>
          Prefer <code>max-width</code> instead of <code>width</code> where
          possible.
        </li>
        <li>
          Use JET form-control width classes or scoped custom classes instead
          of inline styles.
        </li>
      </ul>
    ),
  },
  "text-align": {
    description: (
      <>
        <p>
          This demo shows how text can be aligned via text align classes.
        </p>
        <ul>
          <li>
            <code>oj-form-control-text-align-start</code> aligns to reading
            start.
          </li>
          <li>
            <code>oj-form-control-text-align-right</code> aligns right
            regardless of reading direction.
          </li>
          <li>
            <code>oj-form-control-text-align-end</code> aligns to reading end.
          </li>
        </ul>
      </>
    ),
    recipe: (
      <p>
        Add one of the alignment classes to the custom element or to an ancestor
        element: <code>oj-form-control-text-align-start</code>,{" "}
        <code>oj-form-control-text-align-right</code>, or{" "}
        <code>oj-form-control-text-align-end</code>.
      </p>
    ),
  },
  styling: {
    description: (
      <p>
        This demo shows how to use CSS variables to style an input password text
        field instance.
      </p>
    ),
    recipe: (
      <p>
        Create a CSS class with text field variables set to your preferred
        values, then apply that class to the <code>oj-input-password</code>{" "}
        instance.
      </p>
    ),
  },
};
