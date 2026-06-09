// @ts-nocheck
import { h } from 'preact';

export const filmStripFilmStripDeferredRenderingRecipe = (
  <>
    <ol>
      <li>
        Please see the
        {" "}
        <a href={"#"}>
          FilmStrip PagingControl demo
        </a>
        {" "}
        for more information about configuring an oj-film-strip with an oj-paging-control.
      </li>
      <li>
        In the View, define each item in an
        {" "}
        <code className={"prettyprint"}>oj-defer</code>
        {" "}
        tag to defer rendering of the content until the item is displayed.
      </li>
      <li>
        Deferred item will defer evaluation of its bindings until the item is displayed. This technique
        can help improve the performance of initial page display, especially in cases where rendering
        items is expensive.
      </li>
    </ol>
  </>
);
