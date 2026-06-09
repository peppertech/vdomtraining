import { h } from 'preact';

export const nBoxDefaultRecipe = (
  <>
    <ol>
      <li>Create an oj-n-box element</li>
      <li>
        Create an
        {" "}
        <i>ArrayDataProvider</i>
        {" "}
        and set it using the
        {" "}
        <b>data</b>
        {" "}
        attribute.
      </li>
      <li>
        Specify array data for rows and columns using the
        {" "}
        <b>rows</b>
        {" "}
        and
        {" "}
        <b>columns</b>
        {" "}
        attributes respectively.
      </li>
      <li>
        Use the
        {" "}
        <b>cells</b>
        {" "}
        attribute to provide cell specific properties (e.g. shortDesc).
      </li>
      <li>
        Configure nodes by adding an
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojNBoxNode.html"}>oj-n-box-node</a>
        {" "}
        element as content for the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojNBox.html#nodeTemplate"}>nodeTemplate</a>
        {" "}
        slot and setting its properties based on the DataProvider rows.
      </li>
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the
        {" "}
        <i><b>shortDesc</b></i>
        {" "}
        property with meaningful descriptors as the oj-n-box element does not provide a default
        descriptor.
      </li>
    </ol>
  </>
);
