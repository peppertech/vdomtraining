import { h } from "preact";
import type { ComponentChildren } from "preact";

export type RichCheckBoxsetCorePackDemoId =
  | "overview"
  | "basic"
  | "layout"
  | "user-assistance"
  | "minimum"
  | "maximum"
  | "range"
  | "exact";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const richCheckBoxsetCorePackDocs: Record<
  RichCheckBoxsetCorePackDemoId,
  DocsEntry
> = {
  overview: {
    description: (
      <>
        <p>
          This overview highlights the main visual behaviors of{" "}
          <code>oj-c-rich-checkboxset</code>, including state, label edge, help,
          messaging, selection rules, and layout variations.
        </p>
        <p>
          It mirrors the core pack cookbook overview while fitting the newer
          recipe-first layout used across the VDOM examples.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>disabled</code> and <code>readonly</code> to show the core
          state variations for rich checkbox cards.
        </li>
        <li>
          Use <code>labelEdge</code>, <code>messagesCustom</code>, and help
          props to show the main user-assistance patterns.
        </li>
        <li>
          Include a preview of selection rules and layout sizes so users can
          compare the most common behaviors from one page.
        </li>
      </ul>
    ),
  },
  basic: {
    description: (
      <>
        <p>
          This demo shows how to create a basic{" "}
          <code>oj-c-rich-checkboxset</code> from an array of rich options.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-rich-checkboxset</code>.</li>
        <li>
          Bind <code>options</code> to an array of rich card objects that
          define labels, supporting text, and media.
        </li>
        <li>
          Set <code>value</code> to the initial array of selected option keys.
        </li>
        <li>
          Provide <code>labelHint</code> so the component remains accessible.
        </li>
      </ol>
    ),
  },
  layout: {
    description: (
      <>
        <p>
          This demo shows the different <code>layout</code> and media
          combinations supported by <code>oj-c-rich-checkboxset</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Add an <code>oj-c-rich-checkboxset</code>.</li>
        <li>
          Bind <code>options</code> to rich card data with the media fields
          needed for the chosen layout.
        </li>
        <li>
          Set <code>layout</code> to <code>xl</code>, <code>md</code>, or{" "}
          <code>sm</code> based on the desired card density.
        </li>
        <li>
          Match the layout with supported media types: thumbnail for XL,
          thumbnail or avatar for MD, and thumbnail, avatar, icon, or no media
          for SM.
        </li>
      </ul>
    ),
  },
  "user-assistance": {
    description: (
      <>
        <p>
          This demo shows user assistance for <code>oj-c-rich-checkboxset</code>.
        </p>
        <p>
          The state can be toggled among enabled, disabled, and readonly to see
          how that affects help and selection behavior.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-rich-checkboxset</code>.</li>
        <li>
          Bind <code>options</code> to rich employee card data.
        </li>
        <li>
          Set component-level assistance through <code>help</code> or{" "}
          <code>helpHints</code>.
        </li>
        <li>
          Toggle enabled, disabled, and readonly states to compare how
          assistance behaves in each mode.
        </li>
      </ol>
    ),
  },
  minimum: {
    description: (
      <>
        <p>
          This demo shows minimum selection rules for optional and required rich
          checkbox sets.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-rich-checkboxset</code>.</li>
        <li>Bind <code>options</code> to a rich option array.</li>
        <li>
          Set help text so users understand the selection rule before
          interacting.
        </li>
        <li>
          Set <code>minSelected</code> to a value greater than or equal to 2.
        </li>
        <li>
          Add <code>required</code> only when at least one selection must also
          be present.
        </li>
      </ol>
    ),
  },
  maximum: {
    description: (
      <>
        <p>
          This demo shows maximum selection rules for optional and required rich
          checkbox sets.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-rich-checkboxset</code>.</li>
        <li>Bind <code>options</code> to a rich option array.</li>
        <li>
          Set help text so the maximum selection rule is visible to users.
        </li>
        <li>
          Set <code>maxSelected</code> to a value greater than or equal to 2.
        </li>
        <li>
          Combine with <code>required</code> only when the field must not be
          left empty.
        </li>
      </ol>
    ),
  },
  range: {
    description: (
      <>
        <p>
          This demo shows range selection rules using both{" "}
          <code>minSelected</code> and <code>maxSelected</code>.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-rich-checkboxset</code>.</li>
        <li>Bind <code>options</code> to a rich option array.</li>
        <li>
          Set both <code>minSelected</code> and <code>maxSelected</code>.
        </li>
        <li>
          Make sure <code>maxSelected</code> is greater than{" "}
          <code>minSelected</code>.
        </li>
        <li>
          Add <code>required</code> only if the field must not remain empty.
        </li>
      </ol>
    ),
  },
  exact: {
    description: (
      <>
        <p>
          This demo shows exact selection rules where users must choose a fixed
          number of rich checkbox cards.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>Add an <code>oj-c-rich-checkboxset</code>.</li>
        <li>Bind <code>options</code> to a rich option array.</li>
        <li>
          Set <code>minSelected</code> and <code>maxSelected</code> to the same
          value.
        </li>
        <li>
          Use help text to make the exact-count requirement obvious before
          users interact.
        </li>
        <li>
          Add <code>required</code> only when an empty value should also be
          treated as invalid.
        </li>
      </ol>
    ),
  },
};
