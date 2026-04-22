import { h } from "preact";
import type { ComponentChildren } from "preact";

export type SelectSingleCorePackDemoId =
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

type SelectSingleCorePackDocEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const selectSingleCorePackDocs: Record<
  SelectSingleCorePackDemoId,
  SelectSingleCorePackDocEntry
> = {
  states: {
    description: (
      <>
        <p>
          This demo shows the most important visual behaviors of{" "}
          <code>oj-c-select-single</code>, including enabled, disabled,
          readonly, required, help, and message states.
        </p>
        <p>
          It also compares the component inside and outside{" "}
          <code>oj-c-form-layout</code>, where assistance spacing and overall
          field presentation differ slightly.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-c-form-layout</code> to present grouped field states in a
          consistent Redwood-aligned form layout.
        </li>
        <li>
          Toggle <code>disabled</code> and <code>readonly</code> to demonstrate
          non-editable variants both inside and outside the layout.
        </li>
        <li>
          Add <code>required</code>, <code>placeholder</code>,{" "}
          <code>help</code>, <code>helpHints</code>, and{" "}
          <code>messagesCustom</code> to show core user-assistance patterns.
        </li>
      </ul>
    ),
  },
  basic: {
    description: (
      <>
        <p>
          This demo shows how to populate <code>oj-c-select-single</code> with
          an array-backed data provider and track the current selection in local
          component state.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-c-select-single</code> element.
        </li>
        <li>
          Build an <code>ArrayDataProvider</code> from items that expose{" "}
          <code>value</code> and <code>label</code>.
        </li>
        <li>
          Bind the provider to <code>data</code>, set <code>itemText</code> to{" "}
          <code>"label"</code>, and update state in{" "}
          <code>onvalueChanged</code>.
        </li>
      </ul>
    ),
  },
  "add-to-list": {
    description: (
      <>
        <p>
          This demo shows the <code>ojAddToListAction</code> event supported by{" "}
          <code>oj-c-select-single</code>.
        </p>
        <p>
          Typing into the field filters the dropdown and reveals the add-to-list
          affordance. Triggering it does not create data automatically; the
          application decides what happens next.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-c-select-single</code> element.
        </li>
        <li>
          Set <code>addToList="on"</code> so the dropdown can surface the add
          to list action.
        </li>
        <li>
          Handle <code>onojAddToListAction</code> to launch your own workflow,
          such as a dialog that collects and inserts a new option.
        </li>
      </ul>
    ),
  },
  "advanced-search": {
    description: (
      <>
        <p>
          This demo shows the <code>ojAdvancedSearchAction</code> event
          supported by <code>oj-c-select-single</code>.
        </p>
        <p>
          When users need more than inline filtering, the advanced-search action
          gives the application a hook to open richer search or filtering
          experiences.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-c-select-single</code> element.
        </li>
        <li>
          Set <code>advancedSearch="on"</code> so the dropdown exposes the
          advanced search action.
        </li>
        <li>
          Handle <code>onojAdvancedSearchAction</code> to open a custom search
          dialog, drawer, or filtered picker owned by the application.
        </li>
      </ul>
    ),
  },
  "collection-list-view": {
    description: (
      <>
        <p>
          This demo shows how to render the select results with a{" "}
          <code>collectionTemplate</code> that contains{" "}
          <code>oj-c-list-view</code>.
        </p>
        <p>
          It is useful when each result needs richer formatting, such as
          avatars, secondary text, and matched-text highlighting.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add a template to the <code>collectionTemplate</code> slot of{" "}
          <code>oj-c-select-single</code>.
        </li>
        <li>
          Render an <code>oj-c-list-view</code> inside the template and bind it
          to the collection context provided by the select component.
        </li>
        <li>
          Use <code>oj-c-highlight-text</code> in the list item template to
          emphasize matches while users scan results.
        </li>
      </ul>
    ),
  },
  "collection-table": {
    description: (
      <>
        <p>
          This demo shows how to render the select results with a{" "}
          <code>collectionTemplate</code> containing <code>oj-c-table</code>.
        </p>
        <p>
          A table layout is helpful when users compare several columns before
          selecting one row.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Place a template in the <code>collectionTemplate</code> slot of{" "}
          <code>oj-c-select-single</code>.
        </li>
        <li>
          Render an <code>oj-c-table</code> inside the template and bind its
          data, current row, and selected row to the supplied collection
          context.
        </li>
        <li>
          Use <code>oj-c-highlight-text</code> in the cell template so filtered
          matches remain visible across columns.
        </li>
      </ul>
    ),
  },
  events: {
    description: (
      <>
        <p>
          This demo shows the <code>valueChanged</code> and{" "}
          <code>ojValueAction</code> events supported by{" "}
          <code>oj-c-select-single</code>.
        </p>
        <p>
          Together they help distinguish between selection state updates and
          committed user actions.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-c-select-single</code> element bound to a local
          value state variable.
        </li>
        <li>
          Use <code>onvalueChanged</code> to inspect and store the latest value
          detail payload.
        </li>
        <li>
          Use <code>onojValueAction</code> when your flow needs to react to an
          explicit user commit.
        </li>
      </ul>
    ),
  },
  "item-template": {
    description: (
      <>
        <p>
          This demo shows how to use <code>itemTemplate</code> to customize how
          dropdown items render while <code>itemText</code> controls the text
          shown in the field.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add a template to the <code>itemTemplate</code> slot of{" "}
          <code>oj-c-select-single</code>.
        </li>
        <li>
          Bind the template to the provided item context so you can render rich
          content such as avatars, titles, metadata, and highlighted text.
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
          This demo shows how <code>itemText</code> can derive display text for
          both the dropdown options and the selected value shown in the main
          field.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-c-select-single</code> element bound to richer data
          objects.
        </li>
        <li>
          Supply an <code>itemText</code> callback that receives the item
          context and returns the exact string to display.
        </li>
        <li>
          Use the callback to combine multiple fields into one readable label.
        </li>
      </ul>
    ),
  },
  "value-item": {
    description: (
      <>
        <p>
          This demo shows how <code>valueItem</code> improves initial render
          behavior by giving <code>oj-c-select-single</code> both the selected
          key and its display label up front.
        </p>
        <p>
          That avoids an initial lookup when the application already knows the
          selected item, which is especially useful with slower data sources.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Provide a <code>valueItem</code> object when the initial selected key
          and label are already known.
        </li>
        <li>
          Use <code>value</code> alone when fetching the display label from the
          data provider is acceptable.
        </li>
        <li>
          Prefer <code>valueItem</code> for busy or remote data sources where
          first-paint responsiveness matters.
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
          Desktop browsers usually ignore this setting, but mobile browsers can
          adjust the on-screen keyboard layout based on the specified input
          intent.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-c-select-single</code> element.
        </li>
        <li>
          Set <code>virtualKeyboard</code> to the desired keyboard type such as
          text, number, or email.
        </li>
        <li>
          Verify the behavior on a mobile browser where on-screen keyboards are
          actually displayed.
        </li>
      </ul>
    ),
  },
  width: {
    description: (
      <>
        <p>
          This demo shows how to control width and max width for{" "}
          <code>oj-c-select-single</code>.
        </p>
        <p>
          By default, core-pack form controls expand to the width of their
          container, so width settings matter most when you want a more
          form-like field size outside layout containers.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-c-select-single</code> element.
        </li>
        <li>
          Set <code>width</code> when you want a specific control width. Common
          values include <code>"sm"</code>, <code>"md"</code>, or a custom CSS
          length.
        </li>
        <li>
          Set <code>maxWidth</code> when you want the control to stay
          responsive and avoid overflowing smaller containers.
        </li>
        <li>
          Outside <code>oj-c-form-layout</code>, using <code>maxWidth="md"</code>{" "}
          is a simple way to match the feel of form-layout-sized controls.
        </li>
      </ol>
    ),
  },
};
