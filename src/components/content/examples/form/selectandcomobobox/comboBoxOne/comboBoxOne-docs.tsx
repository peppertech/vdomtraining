import 'preact';
import type { ComponentChildren } from "preact";

export type ComboboxOneDemoId =
  | "overview"
  | "basic"
  | "grouping"
  | "width"
  | "events"
  | "value-option"
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

export const comboboxOneDocs: Record<ComboboxOneDemoId, DocsEntry> = {
  overview: {
    description: (
      <>
        <p>
          This overview highlights the main visual behaviors of{" "}
          <code>oj-combobox-one</code>, including state, assistance text, and
          messaging examples.
        </p>
        <p>
          It is especially helpful when comparing combobox behavior with the
          related <code>oj-select-single</code> control.
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
          variants.
        </li>
        <li>
          Add a disabled-option example to show how individual items can be
          unavailable while the field stays interactive.
        </li>
      </ul>
    ),
  },
  basic: {
    description: (
      <>
        <p>
          This demo shows how to populate <code>oj-combobox-one</code> using
          inline options and an <code>ArrayDataProvider</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-one</code> element.</li>
        <li>
          Use inline <code>oj-option</code> markup for small static lists.
        </li>
        <li>
          Use a data provider when options are larger, dynamic, or easier to
          manage in code.
        </li>
      </ul>
    ),
  },
  grouping: {
    description: (
      <>
        <p>
          This demo shows grouped options with both inline{" "}
          <code>oj-optgroup</code> markup and <code>ArrayTreeDataProvider</code>
          data.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-one</code> element.</li>
        <li>
          Use <code>oj-optgroup</code> for small grouped lists.
        </li>
        <li>
          Use <code>ArrayTreeDataProvider</code> when grouped content is driven
          by larger or dynamic data.
        </li>
      </ul>
    ),
  },
  width: {
    description: (
      <>
        <p>
          This demo shows how to size <code>oj-combobox-one</code> with fixed
          width, responsive width, and framework max-width styles.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Prefer max-width when the field should stay responsive.</li>
        <li>
          Use framework sizing classes for common layouts and custom CSS for
          app-specific widths.
        </li>
        <li>
          Test width behavior in smaller containers so the field does not feel
          cramped or overflow.
        </li>
      </ul>
    ),
  },
  events: {
    description: (
      <>
        <p>
          This demo shows the change events emitted by{" "}
          <code>oj-combobox-one</code>, including value and value-option
          updates.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-one</code> element.</li>
        <li>
          Handle <code>onvalueChanged</code> to store and inspect the latest
          value.
        </li>
        <li>
          Handle <code>onvalueOptionChanged</code> when you also need the
          display label payload.
        </li>
      </ul>
    ),
  },
  "value-option": {
    description: (
      <>
        <p>
          This demo shows how <code>valueOption</code> can provide the initial
          selected key and display label immediately.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Bind the field to a data provider.</li>
        <li>
          Supply a <code>valueOption</code> object when the application already
          knows the selected label.
        </li>
        <li>
          Keep the primitive <code>value</code> and object{" "}
          <code>valueOption</code> synchronized.
        </li>
      </ul>
    ),
  },
  "data-mapping": {
    description: (
      <>
        <p>
          This demo shows how <code>ListDataProviderView</code> data mapping can
          reshape source data into the <code>value</code> and <code>label</code>{" "}
          fields expected by the combobox.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-one</code> element.</li>
        <li>
          Build a mapping function that converts source records into combobox
          label/value pairs.
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
          This demo shows how an <code>optionRenderer</code> can customize
          dropdown content for richer option presentation.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-one</code> element.</li>
        <li>
          Define an <code>optionRenderer</code> that returns custom option DOM.
        </li>
        <li>
          Use the renderer when you need grouped labels, secondary details, or
          richer formatting.
        </li>
      </ul>
    ),
  },
  "item-image": {
    description: (
      <>
        <p>
          This demo shows how to decorate dropdown options with leading visual
          content.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-one</code> element.</li>
        <li>
          Use an <code>optionRenderer</code> to attach icons, badges, or image
          slots to each option.
        </li>
        <li>
          Keep the visual treatment lightweight so scanning remains easy.
        </li>
      </ul>
    ),
  },
  "min-length": {
    description: (
      <>
        <p>
          This demo shows how <code>minLength</code> delays filtering until the
          user has typed enough characters.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-one</code> element.</li>
        <li>
          Set <code>minLength</code> to postpone filtering until the search term
          is meaningful.
        </li>
        <li>
          Pair the setting with larger data sets where early filtering would be
          noisy.
        </li>
      </ul>
    ),
  },
  "maximum-result-count": {
    description: (
      <>
        <p>
          This demo shows how <code>maximumResultCount</code> limits how many
          data-provider results appear at once.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Bind the field to an <code>ArrayDataProvider</code>.</li>
        <li>
          Set <code>maximumResultCount</code> to cap the displayed result set.
        </li>
        <li>
          Encourage further filtering when additional matches exist beyond the
          configured limit.
        </li>
      </ul>
    ),
  },
  converter: {
    description: (
      <>
        <p>
          This demo shows how converters format typed input while keeping option
          values strongly typed.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>IntlNumberConverter</code> instance.</li>
        <li>
          Bind that converter to <code>oj-combobox-one</code>.
        </li>
        <li>
          Ensure the options already use labels formatted consistently with the
          converter.
        </li>
      </ul>
    ),
  },
  "converter-with-data-mapping": {
    description: (
      <>
        <p>
          This demo shows how to combine a converter with{" "}
          <code>ListDataProviderView</code> mapping when the source data is not
          already formatted for display.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create a converter for the target type.</li>
        <li>
          Map the raw data into parsed values and formatted labels using{" "}
          <code>ListDataProviderView</code>.
        </li>
        <li>
          Bind both the mapped provider and the converter to the combobox.
        </li>
      </ul>
    ),
  },
  validator: {
    description: (
      <>
        <p>
          This demo shows how to apply validation with the{" "}
          <code>validators</code> attribute, combined with the built-in required
          validator.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-combobox-one</code> element.</li>
        <li>
          Supply custom validators, such as a <code>RegExpValidator</code> for
          email input.
        </li>
        <li>
          Combine that validator with <code>required</code> when the field must
          contain a valid value.
        </li>
      </ul>
    ),
  },
};
