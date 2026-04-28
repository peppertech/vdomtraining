// @ts-nocheck
import { h } from 'preact';

export const thematicMapCoordinatesRecipe = (
  <>
    <ol>
      <li>
        The data used for the UK map is GeoJSON with unprojected data made up of latitude and longitude
        coordinates.
      </li>
      <li>
        Project the latitude and longitude coordinates to the British National Grid projection
        (EPSG:27700) used by this demo's map before passing them to the marker template.
      </li>
    </ol>
  </>
);
