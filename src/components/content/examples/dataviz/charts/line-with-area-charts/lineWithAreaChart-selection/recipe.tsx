import { h } from 'preact';

export const lineWithAreaChartSelectionRecipe = (
  <>
    <ol>
      <li>
        Set
        <i><b>selection-mode</b></i>
        to either
        <i>'none'</i>
        ,
        <i>'single'</i>
        , or
        <i>'multiple'</i>
        .
      </li>
      <li>
        Initially select data items by passing them to the
        <i><b>selection</b></i>
        attribute.
      </li>
      <li>
        To catch and process events triggered by the selection/de-selection of a data item, bind an
        event listener using the
        <a target={"_blank"} href={"jsdocs/oj.ojChart.html#selection"}>
          <i><b>on-selection-changed</b></i>
        </a>
        attribute.
      </li>
    </ol>
  </>
);
