// @ts-nocheck
import { h } from 'preact';

export const filmStripFilmStripPagingTextRecipe = (
  <>
    <ol>
      <li>
        This demo uses the
        {" "}
        <a href={"#"}>ojModule</a>
        {" "}
        binding to manage the View and ViewModel for the filmstrip and paging control.
      </li>
      <li>
        Please see the
        {" "}
        <a href={"#"}>
          basic FilmStrip demo
        </a>
        {" "}
        for more information about configuring a basic oj-film-strip.
      </li>
      <li>
        In the View, include text describing the logical page currently shown by the oj-film-strip.
      </li>
      <li>
        Set
        {" "}
        <code className={"prettyprint"}>data-oj-context</code>
        {" "}
        marker attribute in oj-film-strip to define the busy context for the filmstrip. Please check
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.BusyContext.html"}>Busy Context API</a>
        {" "}
        for more information.
      </li>
      <li>
        In the ViewModel, listen for the oj-film-strip's PagingModel
        {" "}
        <code className={"prettyprint"}>page</code>
        {" "}
        events in order to update the above descriptive text.
      </li>
    </ol>
  </>
);
