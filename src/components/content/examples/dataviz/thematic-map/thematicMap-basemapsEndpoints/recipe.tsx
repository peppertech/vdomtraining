// @ts-nocheck
import { h } from 'preact';

export const thematicMapBasemapsEndpointsRecipe = (
  <>
    <ol>
      <li>
        <b>The GeoJSON</b>
        : The demo uses GeoJSON from Oracle Spatial team's REST endpoints. For more information on the
        endpoints check out the
        {" "}
        <a href={"https://confluence.oraclecorp.com/confluence/display/JETPublic/Developer+Guide+to+using+Oracle+Spatial+maps+data"}>
          Developer Guide to using Oracle Spatial Maps.
        </a>
        {" "}
        <b>Please keep in mind that permission is required to use Spatial Maps data.</b>
      </li>

      <li>
        <b>The projection</b>
        : The demo presents geojson with unprojected data: latitude, longitude coordinates.
      </li>
      <li>
        <b>Simplification of the GeoJSON</b>
        {" "}
        This demo used an online tool
        {" "}
        <a href={"http://mapshaper.org"}>mapshaper</a>
        {" "}
        to simplify shapes to the desired level of detail. Note that due to the simplification process,
        some small countries were removed from some of the sample maps.
      </li>
      <li>
        <b>Setup the map-provider object</b>
        : The map-provider object should be setup as follows:
        <ul>
          <li>geo: The JSON object containing the data from your GeoJSON file.</li>
          <li>
            propertiesKeys: The object containing key mappings to lookup area info.
            <ul>
              <li>
                id: The required key in the Feature "properties" object that will be used as the area ID
                and maps to a data area's location property.
              </li>
              <li>
                shortLabel: An optional key in the Feature "properties" object that will be used as the
                area short label.
              </li>
              <li>
                longLabel: An optional key in the Feature "properties" object that will be used as the
                area long label.
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ol>
  </>
);
