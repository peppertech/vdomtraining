import 'preact';
import type { ComponentChildren } from "preact";

export type SelectManyDemoId =
  | "overview"
  | "basic"
  | "grouping"
  | "width"
  | "events"
  | "value-options"
  | "data-mapping"
  | "minimum-results-for-search"
  | "maximum-result-count"
  | "item-image";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const selectManyDocs: Record<SelectManyDemoId, DocsEntry> = {
  overview: {
    description: (
      <>
        <p>
          This overview surfaces the key visual behaviors of{" "}
          <code>oj-select-many</code>, including state, assistance text, and
          messaging variations.
        </p>
        <p>
          It is a quick way to compare legacy multi-select behavior with related
          controls such as <code>oj-combobox-many</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Use <code>oj-form-layout</code> to organize state, help, and messaging
          examples consistently.
        </li>
        <li>
          Show enabled, disabled, readonly, required, and placeholder
          combinations inside and outside the layout.
        </li>
        <li>
          Add help and <code>messagesCustom</code> examples so the demo doubles
          as a user-assistance reference.
        </li>
      </ul>
    ),
  },
  basic: {
    description: (
      <>
        <p>
          This demo shows how to populate <code>oj-select-many</code> using
          inline <code>oj-option</code> markup and an{" "}
          <code>ArrayDataProvider</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-select-many</code> element.</li>
        <li>
          Use inline <code>oj-option</code> elements for small static lists.
        </li>
        <li>
          Use a data provider for larger or dynamic datasets and track selected
          values with <code>onvalueChanged</code>.
        </li>
      </ul>
    ),
  },
  grouping: {
    description: (
      <>
        <p>
          This demo shows grouped options via inline <code>oj-optgroup</code>{" "}
          markup and hierarchical data supplied through an{" "}
          <code>ArrayTreeDataProvider</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-select-many</code> element.</li>
        <li>
          Use <code>oj-optgroup</code> when the data is small and static.
        </li>
        <li>
          Use <code>ArrayTreeDataProvider</code> when grouped data is larger or
          data-driven.
        </li>
      </ul>
    ),
  },
  width: {
    description: (
      <>
        <p>
          This demo shows ways to control width and max width using framework
          classes and CSS-friendly sizing.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Prefer max-width styles when responsive behavior matters.</li>
        <li>
          Use framework sizing classes for common field widths and custom CSS
          when needed.
        </li>
        <li>
          Avoid relying only on fixed widths when the field may live in smaller
          containers.
        </li>
      </ul>
    ),
  },
  events: {
    description: (
      <>
        <p>
          This demo shows the <code>valueChanged</code> and{" "}
          <code>valueOptionsChanged</code> events emitted by{" "}
          <code>oj-select-many</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-select-many</code> element.</li>
        <li>
          Handle <code>onvalueChanged</code> to inspect selection changes.
        </li>
        <li>
          Handle <code>onvalueOptionsChanged</code> when you also need the
          current display labels.
        </li>
      </ul>
    ),
  },
  "value-options": {
    description: (
      <>
        <p>
          This demo shows how <code>valueOptions</code> can provide initial
          selected labels immediately, improving first render behavior for
          slower data sources.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Bind the field to a data provider.</li>
        <li>
          Provide <code>valueOptions</code> when the selected keys and labels
          are already known.
        </li>
        <li>
          Keep <code>value</code> and <code>valueOptions</code> in sync as the
          selection changes.
        </li>
      </ul>
    ),
  },
  "data-mapping": {
    description: (
      <>
        <p>
          This demo shows how <code>ListDataProviderView</code> data mapping can
          reshape source records into the <code>value</code> and{" "}
          <code>label</code> fields expected by select components.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-select-many</code> element.</li>
        <li>
          Build a <code>mapFields</code> function that returns mapped{" "}
          <code>value</code> and <code>label</code> data.
        </li>
        <li>
          Wrap the original data provider in <code>ListDataProviderView</code>{" "}
          and bind the mapped view to <code>options</code>.
        </li>
      </ul>
    ),
  },
  "minimum-results-for-search": {
    description: (
      <>
        <p>
          This demo shows how <code>minimumResultsForSearch</code> influences
          when the built-in search box is shown in the dropdown.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-select-many</code> element with many options.</li>
        <li>
          Set <code>minimumResultsForSearch</code> to control the threshold for
          showing the search UI initially.
        </li>
        <li>
          Test different thresholds against realistic option counts.
        </li>
      </ul>
    ),
  },
  "maximum-result-count": {
    description: (
      <>
        <p>
          This demo shows how <code>maximumResultCount</code> limits how many
          results are displayed from a data provider at once.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Bind the field to an <code>ArrayDataProvider</code>.</li>
        <li>
          Set <code>maximumResultCount</code> to cap the number of displayed
          results.
        </li>
        <li>
          Encourage users to keep filtering when more matches exist than the
          configured limit.
        </li>
      </ul>
    ),
  },
  "item-image": {
    description: (
      <>
        <p>
          This demo shows how to enrich dropdown options with visual leading
          content using an <code>optionRenderer</code>.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>Create an <code>oj-select-many</code> element.</li>
        <li>
          Define an <code>optionRenderer</code> that decorates each option with
          visual content such as an icon or badge.
        </li>
        <li>
          Bind the renderer when using a data provider so richer content is
          generated on demand.
        </li>
      </ul>
    ),
  },
};
