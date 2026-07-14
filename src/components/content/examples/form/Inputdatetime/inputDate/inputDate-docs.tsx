import 'preact';
import type { ComponentChildren } from "preact";

export type InputDateVdomDemoId =
  | "states"
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

export const inputDateDocsVdom: Record<InputDateVdomDemoId, DocsEntry> = {
  states: {
    description: (
      <>
        <p>
          This demo shows the main visual behaviors of{" "}
          <code>oj-input-date</code>.
        </p>
        <p>
          It combines states, required, week-of-year display, help, and
          messaging examples into a compact reference page.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-form-layout</code> to compare enabled, disabled, and
          readonly behavior inside form rows.
        </li>
        <li>
          Add required and week-of-year examples so the page doubles as a quick
          behavior scan.
        </li>
        <li>
          Include help hints and <code>messagesCustom</code> examples so form
          guidance is visible in one place.
        </li>
      </ul>
    ),
  },
  simple: {
    description: (
      <>
        <p>
          This demo shows the value behavior for <code>oj-input-date</code>.
        </p>
        <p>
          The component value is a date-only ISO string, and the example shows
          that committed value directly under the field.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-input-date</code> element and assign it an id.</li>
        <li>
          Bind the <code>value</code> to a local date-only ISO string.
        </li>
        <li>
          If your app stores a <code>Date</code> or moment-in-time value,
          convert it with <code>IntlConverterUtils.dateToLocalIsoDateString()</code>.
        </li>
      </ol>
    ),
  },
  "restrict-range": {
    description: (
      <>
        <p>
          This demo shows how to apply minimum and maximum date limits to{" "}
          <code>oj-input-date</code>.
        </p>
        <p>
          The example binds a dynamic minimum and a fixed maximum so out-of-range
          dates are rejected.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-input-date</code> element and assign an id.</li>
        <li>Bind the <code>value</code> attribute to component state.</li>
        <li>
          Bind <code>min</code> and <code>max</code> using valid local ISO date
          strings.
        </li>
      </ol>
    ),
  },
  "show-week-of-year": {
    description: (
      <>
        <p>
          This demo shows <code>oj-input-date</code> with week numbers visible
          in the calendar popup.
        </p>
        <p>
          The week display is configured through the nested{" "}
          <code>datePicker.weekDisplay</code> option.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-input-date</code> element and assign it an id.</li>
        <li>Bind the <code>value</code> attribute to component state.</li>
        <li>
          Set <code>datePicker.weekDisplay</code> to <code>&quot;number&quot;</code>.
        </li>
      </ol>
    ),
  },
  "customize-days": {
    description: (
      <>
        <p>
          This demo shows two ways to customize disabled days in{" "}
          <code>oj-input-date</code>.
        </p>
        <p>
          One formatter computes rules directly, while the second looks up day
          metadata from an external structure.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-input-date</code> element.</li>
        <li>Bind the <code>value</code> attribute to component state.</li>
        <li>
          Bind a <code>dayFormatter</code> callback to the{" "}
          <code>dayFormatter</code> property.
        </li>
      </ol>
    ),
  },
  "select-range": {
    description: (
      <>
        <p>
          This demo shows a simple date range workflow using two{" "}
          <code>oj-input-date</code> fields.
        </p>
        <p>
          The start date constrains the second field&apos;s minimum, and the end
          date constrains the first field&apos;s maximum.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create two <code>oj-input-date</code> elements.</li>
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
          This demo shows how to control width and max-width for{" "}
          <code>oj-input-date</code> using framework and custom classes.
        </p>
        <p>
          It compares built-in width classes with custom class-based sizing.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Prefer <code>max-width</code> styles when possible so the field can
          still shrink with its container.
        </li>
        <li>
          Use JET width utility classes or custom CSS classes instead of inline
          styles.
        </li>
      </ul>
    ),
  },
};
