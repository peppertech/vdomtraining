import 'preact';
import type { ComponentChildren } from "preact";

export type SelectMultipleCorePackDemoId =
  | "states"
  | "basic"
  | "add-to-list"
  | "item-text"
  | "item-template"
  | "collection-table"
  | "value-items"
  | "virtual-keyboard"
  | "width";

type SelectMultipleCorePackDocEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const selectMultipleCorePackDocs: Record<
  SelectMultipleCorePackDemoId,
  SelectMultipleCorePackDocEntry
> = {
  states: {
    description: (
      <>
        <p>
          This demo shows the more important visual states of{" "}
          <code>oj-c-select-multiple</code>, including enabled, disabled,
          readonly, required, help, and messaging patterns.
        </p>
        <p>
          It also compares the component inside and outside{" "}
          <code>oj-c-form-layout</code>, where assistance spacing behaves a bit
          differently.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-c-form-layout</code> to group the common field states in
          a Redwood-aligned form layout.
        </li>
        <li>
          Toggle <code>disabled</code> and <code>readonly</code> to show the
          non-editable variants both inside and outside the layout.
        </li>
        <li>
          Add <code>required</code>, <code>placeholder</code>,{" "}
          <code>help</code>, <code>helpHints</code>, and{" "}
          <code>messagesCustom</code> to illustrate user-assistance patterns.
        </li>
      </ul>
    ),
  },
  basic: {
    description: (
      <p>
        This demo shows how to populate <code>oj-c-select-multiple</code> with
        an array-backed data provider and keep the selected values in local
        state.
      </p>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-c-select-multiple</code> element.
        </li>
        <li>
          Build an <code>ArrayDataProvider</code> from items that expose{" "}
          <code>value</code> and <code>label</code>.
        </li>
        <li>
          Bind the provider to <code>data</code>, set <code>itemText</code> to{" "}
          <code>"label"</code>, and update the selected set in{" "}
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
          <code>oj-c-select-multiple</code>.
        </p>
        <p>
          Typing filters the dropdown and reveals an add-to-list affordance. The
          component emits the event, and this recipe adds the typed text as a
          new option and selects it immediately.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-c-select-multiple</code> element.
        </li>
        <li>
          Set <code>addToList="on"</code> so the dropdown can surface the add
          to list action.
        </li>
        <li>
          Handle <code>ojAddToListAction</code>, read the emitted{" "}
          <code>searchText</code>, append a new option to the data provider, and
          update the selected values set to include the newly added item.
        </li>
      </ul>
    ),
  },
  "item-text": {
    description: (
      <>
        <p>
          This demo shows how <code>itemText</code> controls the label rendered
          for selected values in the field as well as items in the dropdown.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-c-select-multiple</code> element.
        </li>
        <li>
          Provide a callback for <code>itemText</code> that receives the item
          context and returns the string you want displayed.
        </li>
      </ul>
    ),
  },
  "item-template": {
    description: (
      <>
        <p>
          This demo shows how to use <code>itemTemplate</code> for richer
          dropdown item rendering while <code>itemText</code> still controls the
          selected-value text in the field.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Add a template to the <code>itemTemplate</code> slot of{" "}
          <code>oj-c-select-multiple</code>.
        </li>
        <li>
          Bind the template to the provided item context so you can render
          selectors, avatars, secondary text, metadata, and highlighted text.
        </li>
        <li>
          Use <code>itemText</code> alongside the template so selected chips use
          a clean textual label.
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
          A table layout is useful when users need to compare several columns
          before choosing multiple rows.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Place a template in the <code>collectionTemplate</code> slot of{" "}
          <code>oj-c-select-multiple</code>.
        </li>
        <li>
          Render an <code>oj-c-table</code> inside the template and bind its
          data, current row, and row selection to the supplied collection
          context.
        </li>
        <li>
          Use <code>oj-c-highlight-text</code> in the cell template so filtered
          matches remain visible across columns.
        </li>
      </ul>
    ),
  },
  "value-items": {
    description: (
      <>
        <p>
          This demo shows how <code>valueItems</code> can improve initial page
          load performance by supplying the selected item data up front.
        </p>
        <p>
          The first select starts with <code>valueItems</code> so it does not
          need an initial fetch for the selected label, while the second relies
          only on <code>value</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Specify <code>valueItems</code> as a map whose entries include the
          selected key and its display data.
        </li>
        <li>
          Bind a slow or delayed data provider to make the performance
          difference visible during initial render.
        </li>
      </ul>
    ),
  },
  "virtual-keyboard": {
    description: (
      <>
        <p>
          This demo shows the effect of the{" "}
          <code>virtualKeyboard</code> attribute.
        </p>
        <p>
          It matters only on mobile browsers that display virtual keyboards.
          Different values hint which on-screen keyboard layout should appear
          when the field receives focus.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-c-select-multiple</code> element.
        </li>
        <li>
          Set <code>virtualKeyboard</code> to the desired keyboard type, such as{" "}
          <code>search</code> or <code>number</code>.
        </li>
      </ul>
    ),
  },
  width: {
    description: (
      <>
        <p>
          This demo shows how to control the <code>width</code> and{" "}
          <code>maxWidth</code> of <code>oj-c-select-multiple</code>.
        </p>
        <p>
          By default both are effectively 100%, so outside a form layout the
          control expands to the size of its container.
        </p>
      </>
    ),
    recipe: (
      <ol>
        <li>
          Create an <code>oj-c-select-multiple</code> element.
        </li>
        <li>
          Set <code>width</code> to built-in values like <code>sm</code> or{" "}
          <code>md</code>, or to a custom CSS length, when you want a fixed
          width.
        </li>
        <li>
          Set <code>maxWidth</code> to control the maximum size the field may
          grow to, especially outside <code>oj-c-form-layout</code>.
        </li>
        <li>
          Use <code>maxWidth="md"</code> to make a standalone control align
          more closely with the width it would have inside a form layout.
        </li>
      </ol>
    ),
  },
};
