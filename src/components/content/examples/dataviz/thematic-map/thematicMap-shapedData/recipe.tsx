// @ts-nocheck
import 'preact';

export const thematicMapShapedDataRecipe = (
  <>
    <ol>
      <li>
        Create an
        {" "}
        <code>ArrayDataProvider</code>
        {" "}
        from an array of data, or a JSON source and use data binding to bind to the 'area-data'
        attribute. The data supplied to the ArrayDataProvider should be of type
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojThematicMap.html#Area"}>ojThematicMap.Area</a>
      </li>
      <li>
        oj-thematic-map also allows DataProviders for link and marker data via the 'link-data' and
        'marker-data' attributes respectively. See the
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojThematicMap.html#Link"}>ojThematicMap.Link</a>
        {" "}
        or
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojThematicMap.html#Marker"}>ojThematicMap.Marker</a>
        {" "}
        doc for more information.
      </li>
    </ol>
  </>
);
