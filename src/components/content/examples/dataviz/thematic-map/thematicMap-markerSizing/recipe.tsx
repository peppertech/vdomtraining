// @ts-nocheck
import 'preact';

export const thematicMapMarkerSizingRecipe = (
  <>
    <ul>
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the
        {" "}
        <code>short-desc</code>
        {" "}
        attribute in the component options object with meaningful descriptors as the Thematic Map does
        not provide a default descriptor.
      </li>
      <li>
        To have Thematic Map calculate marker dimensions based on some data value, pass the data value
        to the oj-thematic-map-marker
        {" "}
        <code>value</code>
        {" "}
        attribute.
      </li>
    </ul>
  </>
);
