import { h } from "preact";
import type { ComponentChildren } from "preact";

export type InputTextLegacyDemoId =
  | "states"
  | "text"
  | "raw-value"
  | "no-label"
  | "clear-icon"
  | "max-length"
  | "text-align"
  | "virtual-keyboard"
  | "width"
  | "input-wrap"
  | "start-end-slots";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const inputTextLegacyDocs: Record<InputTextLegacyDemoId, DocsEntry> = {
  states: {
    description: (
      <>
        <p>
          This demo allows you to quickly scan some of the more important
          visual aspects of <code>oj-input-text</code>.
        </p>
        <p>
          It also shows <code>oj-input-text</code> relative to other content
          typically seen in a form layout.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-form-layout</code> for the grouped sections and plain
          layout containers for the outside-of-form-layout state comparison.
        </li>
        <li>
          Show enabled, disabled, and readonly states both inside and outside a
          form layout so the spacing differences are easy to compare.
        </li>
        <li>
          Add follow-on sections for required, clear icon, max length, slots,
          help, and messages so the page acts as a compact visual reference.
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
        <li>Create an <code>oj-input-text</code> element.</li>
        <li>Bind the <code>value</code> attribute to component state.</li>
      </ol>
    ),
  },
  "raw-value": {
    description: (
      <>
        <p>
          This demo shows <code>rawValue</code> bound to state. The{" "}
          <code>rawValue</code> property is read only.
        </p>
        <p>
          <code>rawValue</code> changes as the user types, which makes it useful
          for enabling or disabling actions immediately.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-input-text</code> element and assign it an id.
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
        of <code>oj-input-text</code>, including its interaction with required
        fields and <code>rawValue</code>.
      </p>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-input-text</code> element.</li>
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
        <code>oj-input-text</code>. Max length restricts how many characters
        can be entered.
      </p>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-input-text</code> element and assign it an id.
        </li>
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
          This demo shows how text can be aligned with the text alignment
          classes.
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
        Add one of the alignment classes to the custom element or to an
        ancestor element: <code>oj-form-control-text-align-start</code>,{" "}
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
        This demo shows how to control width and max-width with both framework
        classes and custom classes.
      </p>
    ),
    recipe: (
      <ul>
        <li>
          Prefer <code>max-width</code> over <code>width</code> where possible.
        </li>
        <li>
          Use the framework width classes when they fit, and add custom CSS
          classes when you need project-specific sizing.
        </li>
      </ul>
    ),
  },
  "input-wrap": {
    description: (
      <p>
        This demo shows how form controls and buttons line up when placed next
        to one another. When using inside labels, a large button should be
        used.
      </p>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-label-value</code> for top-label layouts where multiple
          controls share a row.
        </li>
        <li>
          Apply a shared max-width class to the form controls so they align
          cleanly with the adjacent button.
        </li>
        <li>
          Use a large button next to inside-label fields to match the control
          height more naturally.
        </li>
      </ul>
    ),
  },
  "start-end-slots": {
    description: (
      <>
        <p>
          This demo demonstrates use of the <code>start</code> and{" "}
          <code>end</code> slots of <code>oj-input-text</code>.
        </p>
        <p>
          These slots can be used for icons, buttons, or other HTML content
          placed before or after the editable text content.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-input-text</code> element.</li>
        <li>
          Add child content with <code>slot=&quot;start&quot;</code> or{" "}
          <code>slot=&quot;end&quot;</code>.
        </li>
        <li>
          For icons, use an element with the appropriate icon classes. For
          icon-only actions, use an <code>oj-button</code> with{" "}
          <code>display=&quot;icons&quot;</code> and{" "}
          <code>chroming=&quot;borderless&quot;</code>.
        </li>
      </ul>
    ),
  },
};
