import 'preact';
import type { ComponentChildren } from "preact";

export type InputDateTextDemoId =
  | "overview"
  | "simple"
  | "converter"
  | "restrict-range"
  | "width";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

const bodyTextClass = "oj-typography-body-md";

export const inputDateTextDocs: Record<InputDateTextDemoId, DocsEntry> = {
  overview: {
    description: (
      <div class={bodyTextClass}>
        <p>
          An input date text allows the user to enter a date value. This demo
          shows important visual states for <code>oj-c-input-date-text</code>.
        </p>
        <p>
          It covers enabled, disabled, readonly, required, help, and custom
          message states inside and outside <code>oj-c-form-layout</code>.
        </p>
      </div>
    ),
    recipe: (
      <ul class={bodyTextClass}>
        <li>
          Use <code>oj-c-form-layout</code> to compare enabled, disabled, and
          readonly fields in layout-managed rows.
        </li>
        <li>
          Show the same state examples outside <code>oj-c-form-layout</code> to
          compare spacing and label behavior.
        </li>
        <li>
          Add required, help, and <code>messagesCustom</code> examples to show
          common user assistance patterns.
        </li>
      </ul>
    ),
  },
  simple: {
    description: (
      <div class={bodyTextClass}>
        <p>
          An input date text allows the user to enter a date value. This demo
          shows the value for <code>oj-c-input-date-text</code>.
        </p>
        <p>The value must be a date-only ISO string.</p>
      </div>
    ),
    recipe: (
      <ol class={bodyTextClass}>
        <li>
          Create an <code>oj-c-input-date-text</code> element.
        </li>
        <li>
          Set the component&apos;s <code>value</code> to an initial date-only
          ISO string.
        </li>
        <li>
          Bind <code>onvalueChanged</code> to keep the displayed current value
          in sync.
        </li>
      </ol>
    ),
  },
  converter: {
    description: (
      <div class={bodyTextClass}>
        <p>
          An input date text allows the user to enter a date value. This demo
          alters the <code>oj-c-input-date-text</code> converter&apos;s{" "}
          <code>dateStyle</code> property.
        </p>
        <p>
          The selected date style changes the display format while preserving
          the date-only ISO value.
        </p>
      </div>
    ),
    recipe: (
      <ol class={bodyTextClass}>
        <li>
          Create an <code>oj-c-input-date-text</code> element and bind its{" "}
          <code>value</code>.
        </li>
        <li>
          Create an <code>oj-c-select-single</code> with the supported{" "}
          <code>dateStyle</code> options.
        </li>
        <li>
          Recreate the <code>LocalDateConverter</code> when the selected style
          changes, and pass it to the input date text field.
        </li>
      </ol>
    ),
  },
  "restrict-range": {
    description: (
      <div class={bodyTextClass}>
        <p>
          An input date text allows the user to enter a date value. This demo
          sets minimum and maximum dates on <code>oj-c-input-date-text</code>.
        </p>
        <p>
          The minimum is <code>2023-04-01</code> and the maximum is{" "}
          <code>2023-04-30</code>. Enter a date outside that range to see a
          validation error.
        </p>
      </div>
    ),
    recipe: (
      <ol class={bodyTextClass}>
        <li>
          Create an <code>oj-c-input-date-text</code> element and assign an id.
        </li>
        <li>
          Bind the <code>value</code> attribute to component state.
        </li>
        <li>
          Bind <code>min</code> and/or <code>max</code> to date-only ISO
          strings such as <code>2023-04-01</code>.
        </li>
      </ol>
    ),
  },
  width: {
    description: (
      <div class={bodyTextClass}>
        <p>
          An input date text allows the user to enter a date value. This demo
          shows how to control the width and maximum width of form controls.
        </p>
        <p>
          By default, width and max width are 100%, so outside a form layout a
          form control stretches to the size of its container.
        </p>
      </div>
    ),
    recipe: (
      <ol class={bodyTextClass}>
        <li>
          Create an <code>oj-c-input-date-text</code> element.
        </li>
        <li>
          Specify <code>width</code> values such as <code>sm</code>,{" "}
          <code>md</code>, or custom CSS values.
        </li>
        <li>
          Specify <code>maxWidth</code> values such as <code>sm</code>,{" "}
          <code>md</code>, or custom CSS values.
        </li>
        <li>
          Use <code>maxWidth=&quot;md&quot;</code> when a field outside{" "}
          <code>oj-c-form-layout</code> should align with form-layout sizing.
        </li>
      </ol>
    ),
  },
};
