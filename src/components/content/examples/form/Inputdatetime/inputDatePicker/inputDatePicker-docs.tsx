import 'preact';
import type { ComponentChildren } from "preact";

export type InputDatePickerVdomDemoId =
  | "overview"
  | "simple"
  | "restrict-range"
  | "show-week-of-year"
  | "customize-days"
  | "select-range"
  | "width";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const inputDatePickerDocsVdom: Record<
  InputDatePickerVdomDemoId,
  DocsEntry
> = {
  overview: {
    description: (
      <>
        <p>
          This demo shows the main visual behaviors of{" "}
          <code>oj-c-input-date-picker</code>.
        </p>
        <p>
          It combines state, label edge, text alignment, required, date-picker
          variations, help, and messaging examples into a compact reference
          page.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-c-form-layout</code> to compare enabled, disabled, and
          readonly behavior inside layout-managed form rows.
        </li>
        <li>
          Show matching fields outside <code>oj-c-form-layout</code> to make
          the assistance-spacing difference visible.
        </li>
        <li>
          Add <code>labelEdge</code>, <code>textAlign</code>, required,
          week-display, min/max, help, and <code>messagesCustom</code> examples
          so the page doubles as a behavior reference.
        </li>
      </ul>
    ),
  },
  simple: {
    description: (
      <>
        <p>
          This demo shows the value behavior for{" "}
          <code>oj-c-input-date-picker</code>.
        </p>
        <p>
          The component value is a date-only ISO string, and the raw user input
          can be observed separately.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Set the component&apos;s <code>value</code> to an initial date-only
          ISO string.
        </li>
        <li>
          Bind <code>value</code> and <code>rawValue</code> so you can compare
          the committed date with the user&apos;s current text entry.
        </li>
      </ol>
    ),
  },
  "restrict-range": {
    description: (
      <>
        <p>
          This demo shows how to apply minimum and maximum date limits to{" "}
          <code>oj-c-input-date-picker</code>.
        </p>
        <p>
          Dates outside the configured range remain visible in raw input, while
          validation constrains the accepted value.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-date-picker</code> element.</li>
        <li>
          Bind the <code>value</code> attribute to a date-only ISO string.
        </li>
        <li>
          Set <code>min</code> and <code>max</code> to date-only ISO strings
          such as <code>2024-05-01</code> and <code>2024-06-01</code>.
        </li>
      </ol>
    ),
  },
  "show-week-of-year": {
    description: (
      <>
        <p>
          This demo shows <code>oj-c-input-date-picker</code> with week numbers
          enabled in the calendar popup.
        </p>
        <p>
          It highlights how the picker can surface week-of-year context without
          changing the underlying date value format.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-c-input-date-picker</code> and give it a date
          value.
        </li>
        <li>
          Set <code>weekDisplay</code> to <code>&quot;number&quot;</code> to
          show week-of-year labels in the calendar.
        </li>
      </ol>
    ),
  },
  "customize-days": {
    description: (
      <>
        <p>
          This demo shows how <code>dayFormatter</code> can control per-day
          rendering in <code>oj-c-input-date-picker</code>.
        </p>
        <p>
          In the sample logic, weekends and selected holidays are restricted,
          Mondays are disabled, and the entire month of March is disabled.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-date-picker</code> element.</li>
        <li>
          Bind the <code>value</code> attribute to a date-only ISO string.
        </li>
        <li>
          Provide a <code>dayFormatter</code> function that returns{" "}
          <code>{`{ state: "enabled" | "disabled" | "restricted" }`}</code>{" "}
          for each calendar day.
        </li>
      </ol>
    ),
  },
  "select-range": {
    description: (
      <>
        <p>
          This demo shows a simple two-field date range workflow using{" "}
          <code>oj-c-input-date-picker</code>.
        </p>
        <p>
          The selected start date constrains the second picker&apos;s minimum,
          and the end date constrains the first picker&apos;s maximum.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create two <code>oj-c-input-date-picker</code> elements.</li>
        <li>
          Bind the first field&apos;s <code>value</code> to the second
          field&apos;s <code>min</code>.
        </li>
        <li>
          Bind the second field&apos;s <code>value</code> to the first
          field&apos;s <code>max</code>.
        </li>
      </ol>
    ),
  },
  width: {
    description: (
      <>
        <p>
          This demo shows how to control the width and maximum width of{" "}
          <code>oj-c-input-date-picker</code>.
        </p>
        <p>
          It compares standalone fields with form-layout behavior and shows how
          label edge choices affect presentation.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-date-picker</code> element.</li>
        <li>
          Set <code>width</code> and <code>maxWidth</code> to compare built-in
          sizes and custom CSS values.
        </li>
        <li>
          If the field sits outside <code>oj-c-form-layout</code>, use{" "}
          <code>maxWidth=&quot;md&quot;</code> when you want it to align with
          form-layout sizing.
        </li>
      </ol>
    ),
  },
};
