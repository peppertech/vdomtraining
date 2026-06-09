// @ts-nocheck
import { h } from 'preact';

export const ganttContextMenuRecipe = (
  <>
    <ol>
      <li>
        To trigger a context menu on Gantt, create an oj-menu element as a child of oj-gantt element.
      </li>
      <li>Specifies a slot attribute with value 'contextMenu' on the oj-menu element.</li>
      <li>
        For the non keyboard use case, use the
        {" "}
        <i><b>getContextByNode</b></i>
        {" "}
        method to determine the object that triggered the context menu. The structure of the returned
        context object is described in the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojGantt.html#getContextByNode"}>API doc</a>
        .
      </li>
      <li>
        For the keyboard use case, set
        {" "}
        <b><i>selection-mode</i></b>
        {" "}
        to 'single' and use the
        {" "}
        <b><i>selection</i></b>
        {" "}
        API to determine the object that triggered the context menu. This should be done and is required
        for the context menu interaction to be fully accessible.
      </li>
    </ol>
  </>
);
