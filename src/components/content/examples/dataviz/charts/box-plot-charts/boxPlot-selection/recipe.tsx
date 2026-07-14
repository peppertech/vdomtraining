// @ts-nocheck
import 'preact';

export const boxPlotSelectionRecipe = (
  <>
    <ol>
      <li>
        Set
        {" "}
        <i><b>selection-mode</b></i>
        {" "}
        to either
        {" "}
        <i>'none'</i>
        ,
        <i>'single'</i>
        , or
        {" "}
        <i>'multiple'</i>
        .
      </li>
      <li>
        Initially select data items by passing them to the
        {" "}
        <i><b>selection</b></i>
        {" "}
        attribute.
      </li>
      <li>
        To catch and process events triggered by the selection/de-selection of a data item, bind an
        event listener using the
        {" "}
        <i>on-selection-changed</i>
        {" "}
        attribute. See documentation for more detail.
      </li>
    </ol>
  </>
);
