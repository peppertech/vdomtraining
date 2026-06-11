// @ts-nocheck
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/uk_27700.json';
import * as cityDataText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/ukIrelandCities.json';
import 'css!./demo.css';
import 'ojs/ojthematicmap';

type City = {
  long: number;
  lat: number;
  city: string;
};

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];

const geo = JSON.parse(geoText as string);
const cityData = JSON.parse(cityDataText as string) as City[];
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

const projectToBritishNationalGrid = (longitude: number, latitude: number) => {
  const a = 6377563.396;
  const b = 6356256.909;
  const f0 = 0.9996012717;
  const lat0 = toRadians(49);
  const lon0 = toRadians(-2);
  const n0 = -100000;
  const e0 = 400000;
  const e2 = 1 - (b * b) / (a * a);
  const n = (a - b) / (a + b);
  const lat = toRadians(latitude);
  const lon = toRadians(longitude);
  const sinLat = Math.sin(lat);
  const cosLat = Math.cos(lat);
  const tanLat = Math.tan(lat);
  const nu = (a * f0) / Math.sqrt(1 - e2 * sinLat * sinLat);
  const rho = (a * f0 * (1 - e2)) / Math.pow(1 - e2 * sinLat * sinLat, 1.5);
  const eta2 = nu / rho - 1;
  const latDiff = lat - lat0;
  const latSum = lat + lat0;
  const m =
    b *
    f0 *
    ((1 + n + (5 / 4) * n * n + (5 / 4) * n * n * n) * latDiff -
      (3 * n + 3 * n * n + (21 / 8) * n * n * n) * Math.sin(latDiff) * Math.cos(latSum) +
      ((15 / 8) * n * n + (15 / 8) * n * n * n) * Math.sin(2 * latDiff) * Math.cos(2 * latSum) -
      (35 / 24) * n * n * n * Math.sin(3 * latDiff) * Math.cos(3 * latSum));
  const dLon = lon - lon0;
  const dLon2 = dLon * dLon;
  const dLon3 = dLon2 * dLon;
  const dLon4 = dLon2 * dLon2;
  const dLon5 = dLon4 * dLon;
  const dLon6 = dLon4 * dLon2;
  const northing =
    n0 +
    m +
    (nu / 2) * sinLat * cosLat * dLon2 +
    (nu / 24) * sinLat * Math.pow(cosLat, 3) * (5 - tanLat * tanLat + 9 * eta2) * dLon4 +
    (nu / 720) * sinLat * Math.pow(cosLat, 5) * (61 - 58 * tanLat * tanLat + Math.pow(tanLat, 4)) * dLon6;
  const easting =
    e0 +
    nu * cosLat * dLon +
    (nu / 6) * Math.pow(cosLat, 3) * (nu / rho - tanLat * tanLat) * dLon3 +
    (nu / 120) *
      Math.pow(cosLat, 5) *
      (5 - 18 * tanLat * tanLat + Math.pow(tanLat, 4) + 14 * eta2 - 58 * tanLat * tanLat * eta2) *
      dLon5;

  return [easting, northing];
};

export const ThematicMapCoordinates = () => {
  const mapProvider = useMemo<ThematicMapProvider>(
    () => ({
      geo,
      propertiesKeys: {
        id: 'NAME',
        longLabel: 'NAME'
      }
    }),
    []
  );
  const cities = useMemo(
    () =>
      cityData.map((city) => {
        const coords = projectToBritishNationalGrid(city.long, city.lat);

        return {
          city: city.city,
          projectedLatitude: coords[1],
          projectedLongitude: coords[0]
        };
      }),
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(cities, {
        keyAttributes: 'city'
      }),
    [cities]
  );
  const areas = useMemo(
    () => [
      { id: 'a1', location: 'Scotland', color: 'rgb(255, 181, 77)' },
      { id: 'a2', location: 'Wales', color: 'rgb(255, 181, 77)' },
      { id: 'a3', location: 'Northern Ireland', color: 'rgb(255, 181, 77)' },
      { id: 'a4', location: 'England', color: 'rgb(255, 181, 77)' },
      { id: 'a5', location: 'Channel Islands', color: 'rgb(255, 181, 77)' },
      { id: 'a6', location: 'Wales', color: 'rgb(255, 181, 77)' }
    ],
    []
  );
  const markerTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
    return (
      <oj-thematic-map-marker
        x={$current.data.projectedLongitude}
        y={$current.data.projectedLatitude}
        shortDesc={$current.data.city}
      />
    );
  };

  return (
    <oj-thematic-map
      id="map1"
      markerData={dataProvider}
      areas={areas}
      zooming="auto"
      panning="auto"
      mapProvider={mapProvider}
      class="demo-thematicmap-min-width"
    >
      <template slot="markerTemplate" render={markerTemplateRenderer} />
    </oj-thematic-map>
  );
};

export default ThematicMapCoordinates;
