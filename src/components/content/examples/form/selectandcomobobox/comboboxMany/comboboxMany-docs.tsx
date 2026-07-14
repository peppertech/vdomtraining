import 'preact';
import type { ComponentChildren } from "preact";

export type ComboboxManyDemoId =
  | "overview"
  | "basic"
  | "grouping"
  | "width"
  | "events"
  | "value-options"
  | "data-mapping"
  | "custom-template"
  | "item-image"
  | "min-length"
  | "maximum-result-count"
  | "converter"
  | "converter-with-data-mapping"
  | "validator";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const comboboxManyDocs: Record<ComboboxManyDemoId, DocsEntry> = {
  overview: {
    description: (
      <>
        <p>
          This overview highlights the main visual behaviors of{" "}
          <code>oj-combobox-many</code>, including state, help, and message
          variations.
        </p>
        <p>
          It provides a quick contrast with the related{" "}
          <code>oj-select-many</code> control, which looks similar but behaves
          differently in important ways.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-form-layout</code> to organize state, help, and message
          examples consistently.
        </li>
        <li>
          Include enabled, disabled, readonly, required, and placeholder
          variations.
        </li>
        <li>
          Add help and <code>messagesCustom</code> patterns so the overview also
          acts as a user-assistance reference.
        </li>
      </ul>
    ),
  },
  basic: {
    description: (
      <>
        <p>
          This demo shows how to populate <code>oj-combobox-many</code> using
          inline options and an <code>ArrayDataProvider</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-many</code> element.</li>
        <li>
          Use inline <code>oj-option</code> markup for smaller static data.
        </li>
        <li>
          Use a data provider for larger or dynamic datasets and track the
          resulting array value in component state.
        </li>
      </ul>
    ),
  },
  grouping: {
    description: (
      <>
        <p>
          This demo shows grouped option data using inline{" "}
          <code>oj-optgroup</code> markup and hierarchical provider data.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-many</code> element.</li>
        <li>
          Use inline <code>oj-optgroup</code> when the grouped list is small and
          static.
        </li>
        <li>
          Use <code>ArrayTreeDataProvider</code> when grouped content is
          generated or data-driven.
        </li>
      </ul>
    ),
  },
  width: {
    description: (
      <>
        <p>
          This demo shows how to size <code>oj-combobox-many</code> using fixed,
          responsive, and max-width-oriented styles.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Prefer max-width sizing when the field should remain responsive.</li>
        <li>
          Use framework width classes for common layouts and custom CSS for
          special cases.
        </li>
        <li>
          Check width behavior in smaller containers so chip content does not
          feel cramped.
        </li>
      </ul>
    ),
  },
  events: {
    description: (
      <>
        <p>
          This demo shows the change events emitted by{" "}
          <code>oj-combobox-many</code>, including value and value-options
          updates.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-many</code> element.</li>
        <li>
          Handle <code>onvalueChanged</code> to inspect array selection changes.
        </li>
        <li>
          Handle <code>onvalueOptionsChanged</code> when you also need the
          display label payload.
        </li>
      </ul>
    ),
  },
  "value-options": {
    description: (
      <>
        <p>
          This demo shows how <code>valueOptions</code> can provide the initial
          selected values and display labels immediately.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Bind the field to a data provider.</li>
        <li>
          Supply <code>valueOptions</code> when the selected keys and labels are
          already known.
        </li>
        <li>
          Keep <code>value</code> and <code>valueOptions</code> synchronized as
          the selection changes.
        </li>
      </ul>
    ),
  },
  "data-mapping": {
    description: (
      <>
        <p>
          This demo shows how <code>ListDataProviderView</code> mapping can
          reshape source records into the <code>value</code> and{" "}
          <code>label</code> fields expected by combobox components.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-many</code> element.</li>
        <li>
          Define a mapping function that produces combobox-friendly label/value
          pairs.
        </li>
        <li>
          Bind the mapped <code>ListDataProviderView</code> to{" "}
          <code>options</code>.
        </li>
      </ul>
    ),
  },
  "custom-template": {
    description: (
      <>
        <p>
          This demo shows how an <code>optionRenderer</code> can create richer
          dropdown content for each option.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-many</code> element.</li>
        <li>
          Define an <code>optionRenderer</code> that returns custom option DOM.
        </li>
        <li>
          Use the renderer for grouped labels, richer metadata, or branded
          option layouts.
        </li>
      </ul>
    ),
  },
  "item-image": {
    description: (
      <>
        <p>
          This demo shows how to add visual leading content to option rows.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-many</code> element.</li>
        <li>
          Use an <code>optionRenderer</code> to attach icons, badges, or image
          slots to each option.
        </li>
        <li>
          Keep the visual treatment simple enough that multiple selections stay
          easy to scan.
        </li>
      </ul>
    ),
  },
  "min-length": {
    description: (
      <>
        <p>
          This demo shows how <code>minLength</code> delays filtering until the
          typed search term is long enough to be useful.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-many</code> element.</li>
        <li>
          Set <code>minLength</code> to postpone filtering until the user has
          typed enough characters.
        </li>
        <li>
          Use the setting with larger datasets where immediate filtering would
          be too noisy.
        </li>
      </ul>
    ),
  },
  "maximum-result-count": {
    description: (
      <>
        <p>
          This demo shows how <code>maximumResultCount</code> limits the number
          of data-provider results displayed at once.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Bind the field to an <code>ArrayDataProvider</code>.</li>
        <li>
          Set <code>maximumResultCount</code> to cap the displayed results.
        </li>
        <li>
          Encourage further filtering when more matches exist than can be shown
          at once.
        </li>
      </ul>
    ),
  },
  converter: {
    description: (
      <>
        <p>
          This demo shows how converters format typed input while the options
          remain strongly typed.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>IntlNumberConverter</code> instance.</li>
        <li>
          Bind that converter to <code>oj-combobox-many</code>.
        </li>
        <li>
          Ensure the option labels are already formatted consistently with the
          converter.
        </li>
      </ul>
    ),
  },
  "converter-with-data-mapping": {
    description: (
      <>
        <p>
          This demo shows how to combine a converter with mapped data when the
          original source values are not already formatted for display.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create a converter for the target type.</li>
        <li>
          Map raw source data into parsed values and formatted labels with{" "}
          <code>ListDataProviderView</code>.
        </li>
        <li>
          Bind the mapped provider and converter together on the combobox.
        </li>
      </ul>
    ),
  },
  validator: {
    description: (
      <>
        <p>
          This demo shows how to use the <code>validators</code> attribute to
          validate user-entered values, along with the built-in required
          validation.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-many</code> element.</li>
        <li>
          Supply custom validators such as an email format validator.
        </li>
        <li>
          Combine those validators with <code>required</code> when the field
          must contain at least one valid value.
        </li>
      </ul>
    ),
  },
};
