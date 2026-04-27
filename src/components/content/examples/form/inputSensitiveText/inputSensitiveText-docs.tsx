import { h } from "preact";
import type { ComponentChildren } from "preact";

export type InputSensitiveTextVdomDemoId =
  | "states"
  | "binding"
  | "clear-icon"
  | "max-length"
  | "no-label"
  | "text-align"
  | "virtual-keyboard"
  | "width";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const inputSensitiveTextDocsVdom: Record<
  InputSensitiveTextVdomDemoId,
  DocsEntry
> = {
  states: {
    description: (
      <>
        <p>
          This demo shows the main visual behaviors of{" "}
          <code>oj-c-input-sensitive-text</code>.
        </p>
        <p>
          It combines state, mask icon, label edge, text alignment, required,
          placeholder, help, and messaging examples into a compact reference
          page.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-c-form-layout</code> to compare enabled, disabled, and
          readonly behavior inside layout-managed rows.
        </li>
        <li>
          Show readonly combinations with both visible and hidden{" "}
          <code>maskIcon</code> settings.
        </li>
        <li>
          Add label edge, text alignment, required, clear icon, placeholder,
          help, and <code>messagesCustom</code> examples so the page doubles as
          a behavior reference.
        </li>
      </ul>
    ),
  },
  binding: {
    description: (
      <>
        <p>
          This demo shows how to bind application state to the{" "}
          <code>value</code> property of <code>oj-c-input-sensitive-text</code>.
        </p>
        <p>
          The displayed text updates immediately as the component value changes.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-sensitive-text</code> element.</li>
        <li>
          Bind the <code>value</code> attribute to component state.
        </li>
      </ol>
    ),
  },
  "clear-icon": {
    description: (
      <>
        <p>
          This demo shows how the <code>clearIcon</code> property affects{" "}
          <code>oj-c-input-sensitive-text</code>.
        </p>
        <p>
          It includes examples for <code>never</code>, <code>always</code>, and{" "}
          <code>conditional</code>, including required-field behavior and raw
          value observation.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-sensitive-text</code> element.</li>
        <li>
          Set <code>clearIcon</code> to <code>never</code>, <code>always</code>
          , or <code>conditional</code>.
        </li>
      </ol>
    ),
  },
  "max-length": {
    description: (
      <>
        <p>
          This demo shows how to configure character limits for{" "}
          <code>oj-c-input-sensitive-text</code>.
        </p>
        <p>
          The sample restricts entry to a maximum number of characters and
          surfaces both the committed value and the raw input.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-sensitive-text</code> element.</li>
        <li>
          Set <code>length.max</code> and <code>length.countBy</code> to the
          character counting mode you want.
        </li>
      </ol>
    ),
  },
  "no-label": {
    description: (
      <>
        <p>
          This demo shows how to make <code>oj-c-input-sensitive-text</code>{" "}
          accessible when there is no visible label.
        </p>
        <p>
          It uses <code>labelHint</code> together with{" "}
          <code>labelEdge=&quot;none&quot;</code> so an accessible label is
          still rendered.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          If there is no visible label, set <code>labelHint</code> and{" "}
          <code>labelEdge=&quot;none&quot;</code>.
        </li>
        <li>
          If you also use placeholder text, keep the hidden label so screen
          readers still get a reliable accessible name.
        </li>
      </ol>
    ),
  },
  "text-align": {
    description: (
      <>
        <p>
          This demo shows how text can be aligned inside{" "}
          <code>oj-c-input-sensitive-text</code>.
        </p>
        <p>
          It compares <code>start</code>, <code>right</code>, and{" "}
          <code>end</code> alignment values using an interactive buttonset.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-sensitive-text</code> element.</li>
        <li>
          Set the <code>textAlign</code> property to <code>start</code>,{" "}
          <code>right</code>, or <code>end</code>.
        </li>
      </ol>
    ),
  },
  "virtual-keyboard": {
    description: (
      <>
        <p>
          This demo shows the supported <code>virtualKeyboard</code> values for{" "}
          <code>oj-c-input-sensitive-text</code>.
        </p>
        <p>
          The setting primarily affects mobile browsers, where it influences
          which on-screen keyboard layout is shown on focus.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-sensitive-text</code> element.</li>
        <li>
          Set <code>virtualKeyboard</code> to the keyboard style you want to
          suggest.
        </li>
      </ol>
    ),
  },
  width: {
    description: (
      <>
        <p>
          This demo shows how to control the width and maximum width of{" "}
          <code>oj-c-input-sensitive-text</code>.
        </p>
        <p>
          It compares standalone fields with form-layout behavior and shows how
          label edge choices affect presentation.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-sensitive-text</code> element.</li>
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

