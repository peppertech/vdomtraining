import { h } from "preact";
import type { ComponentChildren } from "preact";

export type InputSearchDemoId =
  | "basic"
  | "suggestions"
  | "suggestion-item-text"
  | "suggestion-item-template"
  | "hero";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const inputSearchDocs: Record<InputSearchDemoId, DocsEntry> = {
  basic: {
    description: (
      <>
        <p>
          This demo shows how to use an <code>oj-input-search</code> element to
          conduct a search.
        </p>
        <p>
          <b>NOTE</b>: <code>ojValueAction</code> events are only fired after
          pressing Enter in this demo.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-input-search</code> element.
        </li>
        <li>
          Specify an <code>aria-label</code> attribute to make the element
          accessible.
        </li>
        <li>
          Bind the <code>on-oj-value-action</code> attribute to a listener that
          will conduct a search on the given text when received. The{" "}
          <code>ojValueAction</code> event is fired when pressing Enter.
        </li>
      </ul>
    ),
  },
  suggestions: {
    description: (
      <>
        <p>
          This demo shows how to provide suggestions to an{" "}
          <code>oj-input-search</code>. Select the &quot;Simulate Fetch
          Delay&quot; checkbox to delay the search results by one second. This
          allows you to see how the component handles slow fetches.
        </p>
        <p>
          <b>NOTE</b>: <code>ojValueAction</code> events are only fired after
          pressing Enter or selecting a suggestion from the dropdown.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-input-search</code> element.
        </li>
        <li>
          Specify an <code>aria-label</code> attribute to make the element
          accessible.
        </li>
        <li>
          Bind the <code>on-oj-value-action</code> attribute to a listener that
          will conduct a search on the given text when received. The{" "}
          <code>ojValueAction</code> event is fired when pressing Enter or
          selecting a suggestion from the dropdown.
        </li>
        <li>
          Create an <code>ArrayDataProvider</code> from an array where each
          item contains an object with the required <code>label</code> field.
        </li>
        <li>
          Bind the <code>suggestions</code> attribute to the{" "}
          <code>ArrayDataProvider</code>.
        </li>
        <li>
          For purposes of illustration, when the &quot;Simulate Fetch
          Delay&quot; checkbox is checked, this demo wraps the{" "}
          <code>ArrayDataProvider</code> in a demo{" "}
          <code>DemoDelayingDataProvider</code> and binds it to the{" "}
          <code>suggestions</code> attribute instead.
        </li>
      </ul>
    ),
  },
  "suggestion-item-text": {
    description: (
      <>
        <p>
          This demo shows how to specify <code>suggestion-item-text</code> to
          use for rendering the selected suggestion in the main field as well as
          suggestions in the dropdown.
        </p>
        <p>
          <b>NOTE</b>: <code>ojValueAction</code> events are only fired after
          pressing Enter or selecting a suggestion from the dropdown.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-input-search</code> element.
        </li>
        <li>
          Specify an <code>aria-label</code> attribute to make the element
          accessible.
        </li>
        <li>
          Bind the <code>on-oj-value-action</code> attribute to a listener that
          will conduct a search on the given text when received. The{" "}
          <code>ojValueAction</code> event is fired when pressing Enter or
          selecting a suggestion from the dropdown.
        </li>
        <li>
          Create an <code>ArrayDataProvider</code> from an array.
        </li>
        <li>
          Bind the <code>suggestions</code> attribute to the{" "}
          <code>ArrayDataProvider</code>.
        </li>
        <li>
          Specify the name of a top-level data field as the value of the{" "}
          <code>suggestion-item-text</code> attribute of the{" "}
          <code>oj-input-search</code>.
        </li>
      </ul>
    ),
  },
  "suggestion-item-template": {
    description: (
      <>
        <p>
          This demo shows how to specify a{" "}
          <code>suggestionItemTemplate</code> slot to use for rendering the
          suggestions in the dropdown.
        </p>
        <p>
          <b>NOTE</b>: <code>ojValueAction</code> events are only fired after
          pressing Enter or selecting a suggestion from the dropdown.
        </p>
      </>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-input-search</code> element.
        </li>
        <li>
          Specify an <code>aria-label</code> attribute to make the element
          accessible.
        </li>
        <li>
          Bind the <code>on-oj-value-action</code> attribute to a listener that
          will conduct a search on the given text when received. The{" "}
          <code>ojValueAction</code> event is fired when pressing Enter or
          selecting a suggestion from the dropdown.
        </li>
        <li>
          Create an <code>ArrayDataProvider</code> from an array.
        </li>
        <li>
          Bind the <code>suggestions</code> attribute to the{" "}
          <code>ArrayDataProvider</code>.
        </li>
        <li>
          Specify the name of a top-level data field as the value of the{" "}
          <code>suggestion-item-text</code> attribute of the{" "}
          <code>oj-input-search</code> to use for rendering the selected
          suggestion in the main field.
        </li>
        <li>
          Specify child elements of the <code>suggestionItemTemplate</code>{" "}
          slot and bind their attributes to properties of the template context,
          as appropriate.
        </li>
        <li>
          Use <code>oj-highlight-text</code> to apply matching search text
          highlighting in the suggestions.
        </li>
      </ul>
    ),
  },
  hero: {
    description: (
      <p>
        This demo shows how to style <code>oj-input-search</code> as a hero
        element on the page.
      </p>
    ),
    recipe: (
      <ul>
        <li>
          Create an <code>oj-input-search</code> element.
        </li>
        <li>
          Specify the <code>oj-input-search-hero</code> style class on{" "}
          <code>oj-input-search</code>.
        </li>
        <li>
          See the other Input Search demos on this page for more information
          about configuring a basic <code>oj-input-search</code> with or
          without suggestions.
        </li>
      </ul>
    ),
  },
};
