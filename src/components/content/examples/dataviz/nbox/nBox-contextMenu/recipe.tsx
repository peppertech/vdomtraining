// @ts-nocheck
import 'preact';

export const nBoxContextMenuRecipe = (
  <>
    <ul>
      <li>
        To trigger a context menu on NBox, create an oj-menu element as a child of the oj-n-box element.
      </li>
      <li>Specify a slot attribute with value 'contextMenu' on the oj-menu element.</li>
      <li>
        For the non keyboard use case, use the
        {" "}
        <i><b>getContextByNode</b></i>
        {" "}
        method to determine the object that triggered the context menu. The structure of the returned
        context object is described in the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojNBox.html#getContextByNode"}>API doc</a>
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
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the
        {" "}
        <i><b>shortDesc</b></i>
        {" "}
        attribute in the component options object with meaningful descriptors as the NBox component does
        not provide a default descriptor.
      </li>
    </ul>
  </>
);
