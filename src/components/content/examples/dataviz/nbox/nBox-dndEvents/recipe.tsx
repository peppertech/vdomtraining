// @ts-nocheck
import { h } from 'preact';

export const nBoxDndEventsRecipe = (
  <>
    <ol>
      <li>
        To set the NBox as a drag source, set the
        <a target={"_blank"} href={"jsdocs/oj.ojNBox.html#dnd.drag"}>dnd.drag</a>
        property accordingly.
      </li>
      <li>
        To set the NBox as a drop target, set the
        <a target={"_blank"} href={"jsdocs/oj.ojNBox.html#dnd.drop"}>dnd.drop</a>
        property accordingly.
      </li>
      <li>
        To enable cut, copy and/or paste, set the
        <a target={"_blank"} href={"jsdocs/oj.ojNBox.html#dataTransferOptions"}>data-transfer-options</a>
        for cut, copy and paste to enable.
      </li>
      <li>
        Listen to the
        <a target={"_blank"} href={"jsdocs/oj.ojNBox.html#event:cutRequest"}>on-oj-cut-request</a>
        ,
        <a target={"_blank"} href={"jsdocs/oj.ojNBox.html#event:copyRequest"}>on-oj-copy-request</a>
        and
        <a target={"_blank"} href={"jsdocs/oj.ojNBox.html#event:pasteRequest"}>on-oj-paste-request</a>
        events.
      </li>
      <li>
        <b>Accessibility</b>
        : Create an
        <a href={"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions"}>
          ARIA live region
        </a>
        to announce the node cut/copy/paste.
      </li>
    </ol>
  </>
);
