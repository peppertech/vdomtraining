// @ts-nocheck
import { h } from 'preact';

export const treemapDefaultRecipe = (
  <>
    <ol>
      <li>Create an oj-treemap element.</li>
      <li>
        Supply the data items using the
        {" "}
        <i><b>data</b></i>
        {" "}
        attribute.
      </li>
      <li>
        Create an
        {" "}
        <code>ArrayTreeDataProvider</code>
        {" "}
        from an array of data, or a JSON source.
      </li>
      <li>
        Add a template called
        {" "}
        <b><i>nodeTemplate</i></b>
        {" "}
        inside your oj-treemap with
        {" "}
        <b><i>oj-treemap-node</i></b>
        {" "}
        as a child element. For more details about
        {" "}
        <b><i>oj-treemap-node</i></b>
        {" "}
        see
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojTreemapNode.html"}>ojTreemapNode</a>
        .
      </li>
      <li>
        Optionally set the 'data-oj-as' attribute on the template element to set the alias for the
        $current context for individual templates.
      </li>
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the
        {" "}
        <i><b>short-desc</b></i>
        {" "}
        with meaningful descriptors as the oj-treemap element does not provide a default descriptor.
      </li>
    </ol>
  </>
);
