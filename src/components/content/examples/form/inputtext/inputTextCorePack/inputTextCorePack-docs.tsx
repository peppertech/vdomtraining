import { h } from "preact";
import type { ComponentChildren } from "preact";

export type InputTextCorePackDemoId =
  | "states"
  | "text"
  | "raw-value"
  | "no-label"
  | "clear-icon"
  | "max-length"
  | "text-align"
  | "virtual-keyboard"
  | "width"
  | "start-end-slots"
  | "prefix-suffix"
  | "input-with-button";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const inputTextCorePackDocs: Record<
  InputTextCorePackDemoId,
  DocsEntry
> = {
  states: {
    description: (
      <p>
        This demo shows some of the more important visual aspects of{" "}
        <code>oj-c-input-text</code>.
      </p>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-c-form-layout</code> for the grouped sections and a
          plain flex layout for the outside-of-form-layout state comparison.
        </li>
        <li>
          Show enabled, disabled, and readonly states both inside and outside a
          form layout so spacing behavior is easy to compare.
        </li>
        <li>
          Add related sections for required, clear icon, max length, slots,
          prefix or suffix, help, and messages so the page works as a compact
          visual reference.
        </li>
      </ul>
    ),
  },
  text: {
    description: (
      <p>
        This demo shows how to bind data to the <code>value</code> attribute.
      </p>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-text</code> element.</li>
        <li>Bind the <code>value</code> attribute to component state.</li>
      </ol>
    ),
  },
  "raw-value": {
    description: (
      <>
        <p>
          This demo shows an input text with its <code>rawValue</code>{" "}
          attribute bound to state. The <code>rawValue</code> property is read
          only.
        </p>
        <p>
          <code>rawValue</code> changes as the user types, which makes it
          useful for enabling or disabling actions immediately.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-c-input-text</code> element and assign it an id.
        </li>
        <li>Set the component&apos;s <code>value</code> attribute.</li>
        <li>Create state to hold the component&apos;s <code>rawValue</code>.</li>
        <li>
          Listen for <code>rawValueChanged</code> and use it to update related
          UI such as the Submit button state.
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
          To make this accessible, use <code>label-hint</code> together with{" "}
          <code>label-edge=&quot;none&quot;</code> so the component renders an
          aria-label.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          If there is no visible label, add <code>label-hint</code> and{" "}
          <code>label-edge=&quot;none&quot;</code>.
        </li>
        <li>
          Keep the aria-label even when placeholder text is also present,
          because placeholder text is not reliably read by screen readers.
        </li>
      </ol>
    ),
  },
  "clear-icon": {
    description: (
      <p>
        This demo shows example usage of the <code>clear-icon</code> attribute
        of <code>oj-c-input-text</code>, including its interaction with
        required fields and <code>rawValue</code>.
      </p>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-text</code> element.</li>
        <li>
          Set <code>clear-icon</code> to one of the supported values:{" "}
          <code>never</code>, <code>always</code>, or{" "}
          <code>conditional</code>.
        </li>
      </ol>
    ),
  },
  "max-length": {
    description: (
      <p>
        This demo shows how to configure max length for{" "}
        <code>oj-c-input-text</code>. Max length restricts the number of
        characters that can be entered.
      </p>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-text</code> element.</li>
        <li>
          Set <code>length.max</code> to a value greater than or equal to 1.
        </li>
        <li>
          Set <code>length.count-by</code> to either <code>codePoint</code> or{" "}
          <code>codeUnit</code>.
        </li>
      </ol>
    ),
  },
  "text-align": {
    description: (
      <>
        <p>
          This demo shows how text can be aligned via the supported{" "}
          <code>text-align</code> values.
        </p>
        <ul>
          <li>
            <code>start</code> aligns to reading start.
          </li>
          <li>
            <code>right</code> aligns right regardless of reading direction.
          </li>
          <li>
            <code>end</code> aligns to reading end.
          </li>
        </ul>
      </>
    ),
    recipe: (
      <p>
        Set the <code>text-align</code> attribute of the custom element to{" "}
        <code>&quot;start&quot;</code>, <code>&quot;right&quot;</code>, or{" "}
        <code>&quot;end&quot;</code>.
      </p>
    ),
  },
  "virtual-keyboard": {
    description: (
      <>
        <p>
          This demo shows the supported values of the{" "}
          <code>virtual-keyboard</code> attribute.
        </p>
        <p>
          This attribute mainly affects mobile browsers, where it chooses which
          on-screen keyboard is shown when the field receives focus.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Set the <code>virtual-keyboard</code> attribute on the element to the
          desired type.
        </li>
      </ol>
    ),
  },
  width: {
    description: (
      <p>
        This demo shows how to control the width and max-width of form
        controls. By default, both width and max width are 100%.
      </p>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-c-input-text</code> element.</li>
        <li>
          Set the <code>width</code> attribute to <code>sm</code>,{" "}
          <code>md</code>, or a custom CSS value when needed.
        </li>
        <li>
          Set the <code>max-width</code> attribute to <code>sm</code>,{" "}
          <code>md</code>, or a custom CSS value when needed.
        </li>
        <li>
          For a field outside of <code>oj-c-form-layout</code> that should
          match a normal form-layout width, use <code>max-width=&quot;md&quot;</code>.
        </li>
      </ol>
    ),
  },
  "start-end-slots": {
    description: (
      <>
        <p>
          This demo shows use of the <code>start</code> and <code>end</code>{" "}
          slots of <code>oj-c-input-text</code>.
        </p>
        <p>
          These slots can be used for icons, buttons, or other HTML content
          placed before or after the editable text content.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-c-input-text</code> element.</li>
        <li>
          Add child content with <code>slot=&quot;start&quot;</code> or{" "}
          <code>slot=&quot;end&quot;</code>.
        </li>
        <li>
          For icon-only actions, use an <code>oj-c-button</code> with{" "}
          <code>display=&quot;icons&quot;</code>, a suitable{" "}
          <code>size</code>, and <code>chroming=&quot;ghost&quot;</code>.
        </li>
      </ul>
    ),
  },
  "prefix-suffix": {
    description: (
      <>
        <p>
          This demo shows the <code>input-prefix</code> and{" "}
          <code>input-suffix</code> attributes of <code>oj-c-input-text</code>.
        </p>
        <p>
          The prefix is displayed before the editable text and the suffix is
          displayed after it.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-c-input-text</code> element.</li>
        <li>
          Use <code>input-prefix</code> to add text before the editable value.
        </li>
        <li>
          Use <code>input-suffix</code> to add text after the editable value.
        </li>
      </ul>
    ),
  },
  "input-with-button": {
    description: (
      <p>
        This demo shows how form controls and buttons line up when placed next
        to one another. When using inside labels, a large button should be
        used.
      </p>
    ),
    recipe: (
      <p>
        To line up a form control with an inside label and a button, set the{" "}
        <code>oj-c-button</code> <code>size</code> attribute to{" "}
        <code>&quot;lg&quot;</code>.
      </p>
    ),
  },
};
