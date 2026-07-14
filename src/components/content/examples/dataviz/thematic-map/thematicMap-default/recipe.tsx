// @ts-nocheck
import 'preact';

export const thematicMapDefaultRecipe = (
  <>
    <ul>
      <li>
        <b>Creating the base map:</b>
        {" "}
        This demo uses a custom USA states map with Alaska and Hawaii in separate projections within the
        map bounds. At a minimum a Thematic Map needs to indicate a
        {" "}
        <code>map-provider</code>
        {" "}
        object with the geographic areas, area ids, and optional labels to be used for rendering. See
        the
        {" "}
        <a href={"#"}>Styling demo</a>
        {" "}
        for how to style this layer. See the
        {" "}
        <a href={"#"}>
          Generating Maps demo
        </a>
        {" "}
        for more information on how to create the GeoJSON object.
      </li>
      <li>
        <b>Adding data:</b>
        {" "}
        Data items can be provided via the
        {" "}
        <code>area-data</code>
        ,
        <code>marker-data</code>
        , and
        {" "}
        <code>link-data</code>
        {" "}
        attributes. Data items should use different styling to represent various data dimensions. See
        the
        {" "}
        <a href={"#"}>
          Projecting Coordinates demo
        </a>
        {" "}
        for how to render markers and the
        {" "}
        <a href={"#"}>Links demo</a>
        {" "}
        for how to render links.
      </li>
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the
        {" "}
        <code>shortDesc</code>
        {" "}
        properties of data items with meaningful descriptors as the Thematic Map component does not
        provide any default descriptors.
      </li>
    </ul>
  </>
);
