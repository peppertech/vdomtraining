// @ts-nocheck
import 'preact';

export const filmStripVerticalFilmStripNavDotsRecipe = (
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
          basic vertical FilmStrip demo
        </a>
        {" "}
        for more information about configuring a basic vertical oj-film-strip.
      </li>
      <li>
        Hide the navigation arrows built into the oj-film-strip by setting the
        {" "}
        <code className={"prettyprint"}>arrow-visibility</code>
        {" "}
        attribute to
        {" "}
        <code className={"prettyprint"}>hidden</code>
        .
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
        Specify a vertical JET oj-paging-control adjacent to the oj-film-strip that can be used to
        change pages on the FilmStrip. Set the
        {" "}
        <code className={"prettyprint"}>page-size</code>
        {" "}
        attribute to
        {" "}
        <code className={"prettyprint"}>0</code>
        {" "}
        to allow the FilmStrip to drive the size of the logical page.
      </li>
      <li>
        Change the oj-paging-control's
        {" "}
        <code className={"prettyprint"}>page-options</code>
        {" "}
        attribute to
        {" "}
        <code className={"prettyprint"}>{'{'}"type": "dots"{'}'}</code>
        {" "}
        to set the paging-control to show dots.
      </li>
      <li>
        In the ViewModel, set the oj-paging-control's
        {" "}
        <code className={"prettyprint"}>data</code>
        {" "}
        attribute to point to the oj-film-strip PagingModel, once the filmstrip busy context is
        resolved.
      </li>
    </ol>
  </>
);
