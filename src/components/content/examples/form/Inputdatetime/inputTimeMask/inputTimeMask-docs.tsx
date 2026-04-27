import { h } from "preact";
import type { ComponentChildren } from "preact";

export type InputTimeMaskVdomDemoId =
  | "overview"
  | "simple"
  | "restrict-range"
  | "width";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const inputTimeMaskDocsVdom: Record<
  InputTimeMaskVdomDemoId,
  DocsEntry
> = {
  overview: {
    description: (
      <>
        <p>
          This demo shows the main visual behaviors of{" "}
          <code>oj-c-input-time-mask</code>.
        </p>
        <p>
          It combines state, granularity, hour display, label edge, alignment,
          required, help, and messaging examples into a compact reference page.
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
          Add granularity examples for minute, second, and millisecond values
          so the displayed precision is easy to compare.
        </li>
        <li>
          Show <code>hourClock</code>, <code>leadingZeroForHour</code>, help,
          and <code>messagesCustom</code> examples so the page doubles as a
          behavior reference.
        </li>
      </ul>
    ),
  },
  simple: {
    description: (
      <>
        <p>
          This demo shows the value behavior for{" "}
          <code>oj-c-input-time-mask</code>.
        </p>
        <p>
          The component value is a time-only ISO string, and the raw user input
          can be observed separately.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Set the component&apos;s <code>value</code> to an initial time-only
          ISO string.
        </li>
        <li>
          Bind <code>value</code> and <code>rawValue</code> so you can compare
          the committed time with the user&apos;s current text entry.
        </li>
      </ol>
    ),
  },
  "restrict-range": {
    description: (
      <>
        <p>
          This demo shows how to apply minimum and maximum time limits to{" "}
          <code>oj-c-input-time-mask</code>.
        </p>
        <p>
          Entering a time outside the configured range surfaces a validation
          error.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-time-mask</code> element.</li>
        <li>Bind the <code>value</code> prop to component state.</li>
        <li>
          Set <code>min</code> and/or <code>max</code> using valid time-only
          ISO strings like <code>T08:00</code> and <code>T16:00</code>.
        </li>
      </ol>
    ),
  },
  width: {
    description: (
      <>
        <p>
          This demo shows how to control the width and maximum width of{" "}
          <code>oj-c-input-time-mask</code>.
        </p>
        <p>
          It compares standalone fields with form-layout behavior and shows how
          label edge choices affect presentation.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-time-mask</code> element.</li>
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

