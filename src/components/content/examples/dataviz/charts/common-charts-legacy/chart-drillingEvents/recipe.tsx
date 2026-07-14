// @ts-nocheck
import 'preact';

export const chartDrillingEventsRecipe = (
  <>
    <ol>
      <li>
        Set the
        {" "}
        <b><i>drilling</i></b>
        {" "}
        attribute to either
        {" "}
        <i>groupsOnly</i>
        ,
        <i>seriesOnly</i>
        , or
        {" "}
        <i>on</i>
        .
      </li>
      <li>
        Set
        {" "}
        <i>multi-series-drilling</i>
        {" "}
        to
        {" "}
        <i>on</i>
        {" "}
        to enable drilling on objects representing multiple series. e.g. other slice and legend item in
        pie charts.
      </li>
      <li>
        Listen to the
        {" "}
        <b><i>ojItemDrill, ojGroupDrill, ojSeriesDrill or ojMultiSeriesDrill</i></b>
        {" "}
        events and handle them as needed. See example on the
        {" "}
        <a href={"#"}>
          Drilling Example demo page.
        </a>
      </li>
    </ol>
  </>
);
