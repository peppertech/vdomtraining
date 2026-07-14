import 'preact';
import type { ComponentChildren } from "preact";

export type SelectSingleLegacyDemoId =
  | "states"
  | "basic"
  | "add-to-list"
  | "advanced-search"
  | "collection-list-view"
  | "collection-table"
  | "events"
  | "item-template"
  | "item-text"
  | "value-item"
  | "virtual-keyboard"
  | "width";

type SelectSingleLegacyDocEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const selectSingleLegacyDocs: Record<
  SelectSingleLegacyDemoId,
  SelectSingleLegacyDocEntry
> = {
  states: {
    description: (
      <>
        <p>
          This overview lets you scan the most important visual behaviors of{" "}
          <code>oj-select-single</code>, including enabled, disabled, readonly,
          required, help, and message states.
        </p>
        <p>
          The examples also show how the component behaves inside and outside{" "}
          <code>oj-form-layout</code>, where assistance text spacing and label
          treatment differ slightly.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-form-layout</code> to present grouped form states in a
          consistent layout.
        </li>
        <li>
          Toggle <code>disabled</code> and <code>readonly</code> to demonstrate
          non-editable variants both inside and outside the layout.
        </li>
        <li>
          Add <code>required</code>, <code>placeholder</code>,{" "}
          <code>help</code>, <code>helpHints</code>, and{" "}
          <code>messagesCustom</code> to illustrate user assistance patterns.
        </li>
      </ul>
    ),
  },
  basic: {
    description: (
      <>
        <p>
          This demo shows how to populate <code>oj-select-single</code> with an
          array-backed data provider and keep the selected value in component
          state.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-select-single</code> element.
        </li>
        <li>
          Build an <code>ArrayDataProvider</code> from items that contain{" "}
          <code>value</code> and <code>label</code> fields.
        </li>
        <li>
          Bind the provider to <code>data</code>, set <code>itemText</code> to{" "}
          <code>"label"</code>, and update local state in{" "}
          <code>onvalueChanged</code>.
        </li>
      </ul>
    ),
  },
  "add-to-list": {
    description: (
      <>
        <p>
          The legacy <code>oj-select-single</code> component does not expose the
          Core Pack <code>addToList</code> capability or an{" "}
          <code>ojAddToListAction</code> event.
        </p>
        <p>
          If your flow needs user-created entries, you can compose that
          experience outside the field and then refresh the backing data
          provider.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Treat add-to-list as an application-level workflow rather than a built
          in <code>oj-select-single</code> feature.
        </li>
        <li>
          Launch a dialog, drawer, or adjacent form to collect the new option.
        </li>
        <li>
          Update the underlying data provider and write the new value back to{" "}
          <code>oj-select-single</code> after the item is created.
        </li>
      </ul>
    ),
  },
  "advanced-search": {
    description: (
      <>
        <p>
          The legacy <code>oj-select-single</code> component does not provide
          the Core Pack <code>advancedSearch</code> capability or an{" "}
          <code>ojAdvancedSearchAction</code> event.
        </p>
        <p>
          Its built-in search still supports strong filtering when the data
          provider exposes searchable fields through{" "}
          <code>textFilterAttributes</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>textFilterAttributes</code> on the backing data provider to
          search across multiple fields.
        </li>
        <li>
          For richer search criteria, launch a separate dialog or popup with
          custom filters and then write the chosen result back to{" "}
          <code>value</code>.
        </li>
        <li>
          Keep the field focused on selection while the external workflow
          handles advanced querying.
        </li>
      </ul>
    ),
  },
  "collection-list-view": {
    description: (
      <>
        <p>
          This demo shows how to supply a <code>collectionTemplate</code> for{" "}
          <code>oj-select-single</code> using <code>oj-list-view</code> and{" "}
          <code>oj-list-item-layout</code>.
        </p>
        <p>
          The custom layout is useful when each option needs richer structure,
          such as avatars, secondary text, and highlighted search matches.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add a template to the <code>collectionTemplate</code> slot of{" "}
          <code>oj-select-single</code>.
        </li>
        <li>
          Render an <code>oj-list-view</code> inside that template and bind it
          to the collection context passed in by the select component.
        </li>
        <li>
          Use <code>oj-list-item-layout</code> and{" "}
          <code>oj-highlight-text</code> in the item template to format each
          result and emphasize matched text.
        </li>
      </ul>
    ),
  },
  "collection-table": {
    description: (
      <>
        <p>
          This demo shows how to render the select results inside an{" "}
          <code>oj-table</code> collection template.
        </p>
        <p>
          A table-based picker works well when users need to compare multiple
          fields before choosing a single row.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Place a template in the <code>collectionTemplate</code> slot of{" "}
          <code>oj-select-single</code>.
        </li>
        <li>
          Render an <code>oj-table</code> inside the template and bind its data,
          selected row, and current row to the supplied template context.
        </li>
        <li>
          Use <code>oj-highlight-text</code> inside the table cell template so
          filter matches remain visible while users scan the grid.
        </li>
      </ul>
    ),
  },
  events: {
    description: (
      <>
        <p>
          This demo shows the <code>valueChanged</code> and{" "}
          <code>ojValueAction</code> events emitted by{" "}
          <code>oj-select-single</code>.
        </p>
        <p>
          Together they let you track both value updates and committed
          user-driven selection actions.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-select-single</code> element bound to a local value
          state variable.
        </li>
        <li>
          Attach an <code>onvalueChanged</code> handler to inspect the updated
          detail payload whenever the selected value changes.
        </li>
        <li>
          Attach an <code>onojValueAction</code> handler to react when the user
          explicitly commits a choice.
        </li>
      </ul>
    ),
  },
  "item-template": {
    description: (
      <>
        <p>
          This demo shows how to provide a custom <code>itemTemplate</code> for
          dropdown items while using <code>itemText</code> to control the text
          rendered in the field itself.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add a template to the <code>itemTemplate</code> slot of{" "}
          <code>oj-select-single</code>.
        </li>
        <li>
          Bind the template to the item context so child elements can render
          fields such as avatar, title, phone number, and highlighted text.
        </li>
        <li>
          Provide an <code>itemText</code> callback so the selected value shown
          in the field remains concise and readable.
        </li>
      </ul>
    ),
  },
  "item-text": {
    description: (
      <>
        <p>
          This demo shows how to use <code>itemText</code> to derive the display
          label for both dropdown items and the selected value shown in the main
          field.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-select-single</code> element and bind it to a data
          provider that returns richer objects.
        </li>
        <li>
          Supply an <code>itemText</code> callback that receives the item
          context and returns the exact string to display.
        </li>
        <li>
          Use the callback to combine fields such as first name and last name
          into one readable label.
        </li>
      </ul>
    ),
  },
  "value-item": {
    description: (
      <>
        <p>
          This demo shows how <code>valueItem</code> can improve initial page
          load behavior by giving <code>oj-select-single</code> both the
          selected key and its display label up front.
        </p>
        <p>
          When only <code>value</code> is provided, the component may need an
          extra fetch from the data provider before it can render the label.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Provide a <code>valueItem</code> object when the initial selected
          label is already known by the application.
        </li>
        <li>
          Use <code>value</code> alone when label lookup from the data provider
          is acceptable.
        </li>
        <li>
          Prefer <code>valueItem</code> for slower data sources or when you want
          the first paint to show the final label immediately.
        </li>
      </ul>
    ),
  },
  "virtual-keyboard": {
    description: (
      <>
        <p>
          This demo shows the effect of the <code>virtualKeyboard</code>{" "}
          attribute on mobile devices.
        </p>
        <p>
          Desktop browsers generally ignore this setting, but on-screen
          keyboards can switch layout based on the configured input intent such
          as text, number, or email.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-select-single</code> element.
        </li>
        <li>
          Set the <code>virtualKeyboard</code> attribute to the desired keyboard
          type.
        </li>
        <li>
          Test on a mobile browser to verify that the expected on-screen
          keyboard layout appears when the field receives focus.
        </li>
      </ul>
    ),
  },
  width: {
    description: (
      <>
        <p>
          This demo shows how to control width and max-width using framework
          classes and custom classes instead of inline styles.
        </p>
        <p>
          Using classes keeps the example aligned with content security policy
          friendly styling practices.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Prefer max-width classes where possible so the field can stay
          responsive.
        </li>
        <li>
          Apply framework width classes for common sizes and custom classes when
          application-specific layout rules are needed.
        </li>
        <li>
          Keep sizing concerns in CSS rather than inline styles to support CSP
          style restrictions more easily.
        </li>
      </ul>
    ),
  },
};
