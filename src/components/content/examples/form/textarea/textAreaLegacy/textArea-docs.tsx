import { h } from "preact";
import type { ComponentChildren } from "preact";

export type TextAreaLegacyDemoId =
  | "overview"
  | "binding"
  | "width"
  | "resize"
  | "max-length"
  | "max-rows";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const textAreaLegacyDocs: Record<TextAreaLegacyDemoId, DocsEntry> = {
  overview: {
    description: (
      <>
        <p>
          This overview highlights the key visual behaviors of{" "}
          <code>oj-text-area</code>, including common states, user assistance,
          and messaging patterns.
        </p>
        <p>
          It mirrors the legacy cookbook states demo while fitting the newer
          recipe-first demo layout used across the form examples.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-form-layout</code> to organize enabled, disabled,
          readonly, required, and placeholder variations.
        </li>
        <li>
          Include examples both inside and outside form layout when field width
          behavior matters.
        </li>
        <li>
          Add <code>helpHints</code> and <code>messagesCustom</code> examples
          so the page also serves as a user-assistance reference.
        </li>
      </ul>
    ),
  },
  binding: {
    description: (
      <>
        <p>
          This demo shows a basic <code>oj-text-area</code> with its{" "}
          <code>value</code> bound to component state.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-text-area</code> element.</li>
        <li>
          Track the current <code>value</code> in component state.
        </li>
        <li>
          Handle <code>onvalueChanged</code> so the model and UI stay in sync.
        </li>
      </ol>
    ),
  },
  width: {
    description: (
      <>
        <p>
          This demo shows how to control width and max width using framework
          classes and responsive CSS-friendly sizing.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Prefer max-width styles when the field should remain responsive.</li>
        <li>
          Use framework width classes for common layouts and custom sizing only
          when needed.
        </li>
        <li>
          Check width behavior in narrower containers so longer content still
          feels readable.
        </li>
      </ul>
    ),
  },
  resize: {
    description: (
      <>
        <p>
          This demo shows examples of the <code>resizeBehavior</code>{" "}
          attribute on <code>oj-text-area</code>.
        </p>
        <p>
          Resizable text areas rely on native browser support, so behavior may
          vary slightly across browsers.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-text-area</code> element.</li>
        <li>
          Set <code>resizeBehavior</code> to values such as{" "}
          <code>both</code>, <code>horizontal</code>, or <code>vertical</code>.
        </li>
        <li>
          Provide an initial value so resize behavior is easy to compare across
          variants.
        </li>
      </ol>
    ),
  },
  "max-length": {
    description: (
      <>
        <p>
          This demo shows how to configure <code>length.max</code> for{" "}
          <code>oj-text-area</code> and display a remaining-character counter.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-text-area</code> element and give it an id.</li>
        <li>
          Set the <code>length</code> object with values for{" "}
          <code>max</code>, <code>counter</code>, and <code>countBy</code>.
        </li>
        <li>
          Use this pattern when you want to restrict input length instead of
          validating over-limit text after entry.
        </li>
      </ol>
    ),
  },
  "max-rows": {
    description: (
      <>
        <p>
          This demo shows how the <code>maxRows</code> attribute affects text
          area growth and scrolling behavior.
        </p>
        <p>
          Use <code>0</code> to keep a fixed height, <code>-1</code> to allow
          full auto-growth, or a positive number to cap expansion.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Create an <code>oj-text-area</code> element.</li>
        <li>
          Set <code>maxRows</code> to control whether the field stays fixed,
          grows without limit, or stops at a defined height.
        </li>
        <li>
          Pair <code>maxRows</code> with <code>rows</code> so the minimum and
          maximum visible size are both intentional.
        </li>
      </ol>
    ),
  },
};
