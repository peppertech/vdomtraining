import { h } from "preact";
import type { ComponentChildren } from "preact";

export type InputMonthMaskDemoId =
  | "overview"
  | "simple"
  | "restrict-range"
  | "width";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const inputMonthMaskDocs: Record<InputMonthMaskDemoId, DocsEntry> = {
  overview: {
    description: (
      <>
        <p>
          This demo shows the main visual behaviors of{" "}
          <code>oj-c-input-month-mask</code>.
        </p>
        <p>
          It combines state, label edge, text alignment, required, help, and
          messaging examples into a compact reference page.
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
          Add <code>labelEdge</code>, <code>textAlign</code>, required, help,
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
          <code>oj-c-input-month-mask</code>.
        </p>
        <p>
          The component value is a calendar month object with{" "}
          <code>year</code> and <code>month</code> properties, and the raw user
          input can be observed separately.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Set the component&apos;s <code>value</code> to an initial calendar
          month object.
        </li>
        <li>
          Bind <code>value</code> and <code>rawValue</code> so you can compare
          the committed month with the user&apos;s current text entry.
        </li>
      </ol>
    ),
  },
  "restrict-range": {
    description: (
      <>
        <p>
          This demo shows how to apply minimum and maximum month limits to{" "}
          <code>oj-c-input-month-mask</code>.
        </p>
        <p>
          Entering a month outside the configured range surfaces a validation
          error.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-month-mask</code> element.</li>
        <li>Bind the <code>value</code> prop to component state.</li>
        <li>
          Set <code>min</code> and/or <code>max</code> using valid calendar
          month objects like <code>{`{ year: 2024, month: 2 }`}</code>.
        </li>
      </ol>
    ),
  },
  width: {
    description: (
      <>
        <p>
          This demo shows how to control the width and maximum width of{" "}
          <code>oj-c-input-month-mask</code>.
        </p>
        <p>
          It compares standalone fields with form-layout behavior and shows how
          label edge choices affect presentation.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-month-mask</code> element.</li>
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
