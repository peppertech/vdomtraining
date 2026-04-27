import { h } from "preact";
import type { ComponentChildren } from "preact";

export type InputNumberCorePackDemoId =
  | "states"
  | "converter"
  | "min-max"
  | "raw-value"
  | "prefix-suffix"
  | "virtual-keyboard"
  | "width";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const inputNumberCorePackDocs: Record<
  InputNumberCorePackDemoId,
  DocsEntry
> = {
  states: {
    description: (
      <p>
        This demo shows some of the more important visual aspects of{" "}
        <code>oj-c-input-number</code>.
      </p>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-c-form-layout</code> for most sections, and compare
          state rendering inside and outside layout-managed form rows.
        </li>
        <li>
          Use <code>disabled</code> and <code>readonly</code> for disabled and
          readonly states.
        </li>
        <li>
          Show quantitative steppers, required fields, prefix/suffix content,
          help, and messages as a compact behavior reference.
        </li>
      </ul>
    ),
  },
  converter: {
    description: (
      <>
        <p>
          This demo shows converters used by <code>oj-c-input-number</code>.
          The first example uses the default number converter, and the others
          use configured number converters.
        </p>
        <p>
          <code>decimalFormat: &quot;short&quot;</code> and{" "}
          <code>decimalFormat: &quot;long&quot;</code> support format but not
          parse, so they are shown as readonly fields.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Set the component value to an initial number.</li>
        <li>
          Create a number converter with options such as currency, decimal, or
          percent formatting, then bind it to <code>converter</code>.
        </li>
        <li>
          Use <code>roundDuringParse</code> when the parsed value should stay in
          sync with the rounded display value.
        </li>
      </ol>
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
          Set <code>step</code> to a non-zero positive number to allow
          incrementing or decrementing with the up/down arrows.
        </li>
        <li>
          Set <code>stepperVariant=&quot;quantitative&quot;</code> with a
          non-zero positive <code>step</code> to show plus and minus buttons.
        </li>
        <li>
          Set <code>min</code> and <code>max</code> to limit the accepted range.
        </li>
      </ul>
    ),
  },
  "raw-value": {
    description: (
      <p>
        This demo shows <code>rawValue</code>, <code>transientValue</code>, and{" "}
        <code>value</code> behavior on <code>oj-c-input-number</code>.
      </p>
    ),
    recipe: (
      <ul>
        <li>Bind <code>value</code> to component state.</li>
        <li>
          Listen for <code>rawValueChanged</code> and{" "}
          <code>transientValueChanged</code> to display the read-only values.
        </li>
        <li>
          Use <code>rawValue</code> to drive related UI such as enabling a
          submit button.
        </li>
      </ul>
    ),
  },
  "prefix-suffix": {
    description: (
      <>
        <p>
          This demo shows the <code>inputPrefix</code> and{" "}
          <code>inputSuffix</code> attributes of{" "}
          <code>oj-c-input-number</code>.
        </p>
        <p>
          Prefix text appears before the editable content, and suffix text
          appears after it.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-number</code> element.</li>
        <li>
          Add <code>inputPrefix</code> for prefix text or{" "}
          <code>inputSuffix</code> for suffix text.
        </li>
        <li>
          Avoid using a prefix and suffix at the same time, following Redwood UX
          guidance.
        </li>
      </ol>
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
          The attribute affects mobile browsers. If <code>number</code> is used,
          provide a converter that formats without non-numeric characters.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Set <code>virtualKeyboard</code> to the desired keyboard type.
        </li>
        <li>
          For <code>number</code> or number-like <code>auto</code> behavior, use
          a converter such as <code>{`{ style: "decimal", useGrouping: false }`}</code>.
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
        <li>Create an <code>oj-c-input-number</code> element.</li>
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
