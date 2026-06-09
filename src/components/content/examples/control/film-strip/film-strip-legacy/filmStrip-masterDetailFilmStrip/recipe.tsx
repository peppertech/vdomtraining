// @ts-nocheck
import { h } from 'preact';

export const filmStripMasterDetailFilmStripRecipe = (
  <>
    HTML Markup:
    <ol>
      <li>Create a detail oj-film-strip element showing single item at a time as shown.</li>
      <li>
        In the HTML, specify a group of sibling elements to be laid out by the detail oj-film-strip.
      </li>
      <li>Create a master oj-film-strip element showing multiple items at a time as shown.</li>
      <li>
        In the HTML, specify a group of sibling elements to be laid out by the master oj-film-strip.
      </li>
      <li>
        Listen to
        {" "}
        <code className={"prettyprint"}>beforePage</code>
        {" "}
        events on the detail oj-film-strip's PagingModel in order to highlight the associated item in
        the master oj-film-strip, and to change pages in the master oj-film-strip when necessary.
      </li>
      <li>
        Listen to click events on the items in the master oj-film-strip in order to change pages in the
        detail oj-film-strip to show the associated item.
      </li>
    </ol>
  </>
);
