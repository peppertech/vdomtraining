// @ts-nocheck
import { h } from 'preact';

export const thematicMapBasemapsEndpointsDescription = (
  <>
    <p>A thematic map is an interactive data visualization that displays data corresponding to geographic locations or regions.
                 Applications are required to supply a mapProvider for a valid thematic map.</p><p>
      This demo shows how to set the
      {" "}
      <code>map-provider</code>
      {" "}
      attribute using map data from the Oracle Spatial team's REST endpoints. Thematic Map supports
      rendering of GeoJSON geographic areas which the application sets via the
      {" "}
      <code>map-provider</code>
      {" "}
      attribute. For more information on the endpoints check out the
      {" "}
      <a href={"https://confluence.oraclecorp.com/confluence/display/JETPublic/Developer+Guide+to+using+Oracle+Spatial+maps+data"}>
        Developer Guide to using Oracle Spatial Maps.
      </a>
      {" "}
      <b>Permission is required to use Oracle Spatial maps.</b>
      {" "}
      For more information read under the
      {" "}
      <a href={"https://confluence.oraclecorp.com/confluence/display/OSGT/Usage+and+Expansion+Approval;"}>
        "Will your application be using a HERE dataset?"
      </a>
      {" "}
      section. For higher fidelity in border shapes, provide the component with higher fidelity basemap
      data.
    </p>
  </>
);
