// @ts-nocheck
import 'preact';

export const sunburstDefaultRecipe = (
  <>
    <ol>
      <li>Create an oj-sunburst element.</li>
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
        inside your oj-sunburst with
        {" "}
        <b><i>oj-sunburst-node</i></b>
        {" "}
        as a child element. For more details about
        {" "}
        <b><i>oj-sunburst-node</i></b>
        {" "}
        see
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojSunburstNode.html"}>ojSunburstNode</a>
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
        <i><b>shortDesc</b></i>
        {" "}
        with meaningful descriptors as the oj-sunburst element does not provide a default descriptor.
      </li>
    </ol>
  </>
);
