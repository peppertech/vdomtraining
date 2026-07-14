// @ts-nocheck
import 'preact';

export const filmStripFilmStripLazyRenderingRecipe = (
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
        Include flags in the ViewModel to indicate whether an item has been rendered. Only render the
        first item initially.
      </li>
      <li>
        In the View, conditionally render content in each item based on whether that item is rendered.
      </li>
      <li>
        In the ViewModel, listen for
        {" "}
        <code className={"prettyprint"}>page</code>
        {" "}
        events from the oj-film-strip's PagingModel and render items that will be displayed on the
        logical page that have not yet been rendered.
      </li>
      <li>
        If you want to defer fetching data for an item until it is rendered, you could render temporary
        placeholder content in the item until the data is fetched, for example the text "Fetching
        data...".
      </li>
    </ol>
  </>
);
