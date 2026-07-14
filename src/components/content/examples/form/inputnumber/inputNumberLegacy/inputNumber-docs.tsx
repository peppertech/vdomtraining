import 'preact';
import type { ComponentChildren } from "preact";

export type InputNumberDemoId =
  | "overview"
  | "min-max"
  | "step-match"
  | "converter"
  | "validator"
  | "raw-value"
  | "eat-non-numbers"
  | "no-label"
  | "width"
  | "text-align"
  | "virtual-keyboard"
  | "styling";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const inputNumberDocs: Record<InputNumberDemoId, DocsEntry> = {
  overview: {
    description: (
      <>
        <p>
          This demo allows you to quickly scan important visual aspects of{" "}
          <code>oj-input-number</code>. When <code>step</code> is 0, the
          default in Redwood theme, no buttons are shown.
        </p>
        <p>
          It also shows <code>oj-input-number</code> relative to other controls
          typically seen in a form layout.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-form-layout</code> to organize the state, required, help,
          and messages sections.
        </li>
        <li>
          Set <code>disabled</code> or <code>readonly</code> for disabled and
          read only states.
        </li>
        <li>
          Use <code>min</code>, <code>max</code>, and <code>step</code> to
          control the valid numeric range and spinner behavior.
        </li>
      </ul>
    ),
  },
  "min-max": {
    description: (
      <p>
        This demo shows <code>min</code>, <code>max</code>, <code>step</code>,
        and <code>value</code> attributes so you can see how stepping up and
        stepping down works.
      </p>
    ),
    recipe: (
      <ul>
        <li>
          Set <code>step</code> to a non-zero positive number when the user
          should increment or decrement with the up/down arrows.
        </li>
        <li>
          Set <code>min</code> and <code>max</code> to limit the number to a
          range.
        </li>
      </ul>
    ),
  },
  "step-match": {
    description: (
      <>
        <p>
          The <code>step</code> attribute can be used with <code>min</code> and{" "}
          <code>max</code> to create a range of values the up/down arrows will
          step through.
        </p>
        <p>
          The arrows adjust the value to keep it a step match: a multiple of{" "}
          <code>step</code> starting at <code>min</code>, the initial value, or
          0.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use a positive non-zero <code>step</code> to enable spinner changes.
        </li>
        <li>
          Make the initial value and max a step match when using larger steps to
          avoid surprising first-step behavior.
        </li>
      </ul>
    ),
  },
  converter: {
    description: (
      <>
        <p>
          This demo shows converters used by <code>oj-input-number</code>,
          including default, currency, decimal, and percent converters.
        </p>
        <p>
          <code>decimalFormat: &quot;short&quot;</code> and{" "}
          <code>decimalFormat: &quot;long&quot;</code> support format but not
          parse, so they are shown in readonly fields.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Set the component value to the initial number.</li>
        <li>
          Create an <code>IntlNumberConverter</code> with the desired options
          and bind it to the <code>converter</code> property.
        </li>
        <li>
          Use <code>roundDuringParse</code> when parsed values should stay in
          sync with rounded display values.
        </li>
      </ol>
    ),
  },
  validator: {
    description: (
      <p>
        This demo shows the built-in <code>required</code> and{" "}
        <code>numberRange</code> validators used by{" "}
        <code>oj-input-number</code>.
      </p>
    ),
    recipe: (
      <ul>
        <li>
          Add <code>required</code> to enable required validation.
        </li>
        <li>
          Use <code>min</code> and <code>max</code> to configure range
          validation.
        </li>
        <li>
          Use <code>translations</code> and <code>validators</code> to
          customize messages and add per-instance validation.
        </li>
      </ul>
    ),
  },
  "raw-value": {
    description: (
      <>
        <p>
          This demo shows <code>rawValue</code>, <code>transientValue</code>,
          and <code>value</code> on <code>oj-input-number</code>.
        </p>
        <p>
          <code>rawValue</code> changes as the input changes, while{" "}
          <code>transientValue</code> updates during valid spinner changes and{" "}
          <code>value</code> updates after the committed change.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Bind <code>value</code>, <code>rawValue</code>, and{" "}
          <code>transientValue</code> to component state.
        </li>
        <li>
          Listen for <code>rawValueChanged</code> to update related UI, such as
          enabling or disabling a submit button.
        </li>
      </ul>
    ),
  },
  "eat-non-numbers": {
    description: (
      <p>
        This example shows how you can use JavaScript to ignore characters typed
        that are not numbers.
      </p>
    ),
    recipe: (
      <ol>
        <li>
          Add a keypress event listener and set it on the input number
          component.
        </li>
        <li>
          In the function, test the typed character and call{" "}
          <code>preventDefault()</code> for unsupported characters.
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
        This demo shows how to control width and max-width with both framework
        and custom classes.
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
  "virtual-keyboard": {
    description: (
      <>
        <p>
          This demo shows the supported values of the{" "}
          <code>virtualKeyboard</code> attribute.
        </p>
        <p>
          The attribute affects mobile browsers where virtual keyboards are
          displayed. When using <code>number</code>, provide a converter that
          formats without non-numeric characters.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Set <code>virtualKeyboard</code> to the desired keyboard type.
        </li>
        <li>
          If the keyboard is <code>number</code>, use a converter such as{" "}
          <code>useGrouping: false</code>.
        </li>
      </ol>
    ),
  },
  styling: {
    description: (
      <p>
        This demo shows how to use CSS variables to style an input number text
        field instance.
      </p>
    ),
    recipe: (
      <p>
        Create a CSS class with text field variables set to your preferred
        values, then apply that class to the <code>oj-input-number</code>{" "}
        instance.
      </p>
    ),
  },
};
