import 'css!./demo.css';
import 'ojs/ojthematicmap';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as flightDataText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/flightData.json';
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/world_countries.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];
type AirportDatum = { city: string; outgoing: number; incoming: number; longitude: number; latitude: number };

const geo = JSON.parse(geoText as string);
const flightData = JSON.parse(flightDataText as string);

export const ThematicMapLinks = () => {
  const mapProvider = useMemo<ThematicMapProvider>(
    () => ({
      geo,
      propertiesKeys: {
        id: 'CC3',
        shortLabel: 'CC3',
        longLabel: 'NAME'
      }
    }),
    []
  );
  const airports = useMemo(
    () =>
      flightData.airports.map((airport: AirportDatum) => ({
        city: airport.city,
        outgoing: airport.outgoing,
        incoming: airport.incoming,
        longitude: airport.longitude,
        latitude: airport.latitude
      })),
    []
  );
  const airportDataProvider = useMemo(
    () =>
      new ArrayDataProvider(airports, {
        keyAttributes: 'city'
      }),
    [airports]
  );
  const flightDataProvider = useMemo(
    () =>
      new ArrayDataProvider(flightData.flights, {
        keyAttributes: 'flight'
      }),
    []
  );
  const markerTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
    return (
      <oj-thematic-map-marker
        x={$current.data.longitude}
        y={$current.data.latitude}
        shortDesc={
          $current.data.city +
          ': ' +
          $current.data.outgoing +
          ' outgoing, ' +
          $current.data.incoming +
          ' incoming'
        }
      />
    );
  };
  const linkTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
    return (
      <oj-thematic-map-link
        startLocation={{ id: $current.data.start }}
        endLocation={{ id: $current.data.end }}
        shortDesc={'Flight ' + $current.data.flight + ': ' + $current.data.start + ' to ' + $current.data.end}
      />
    );
  };

  return (
    <oj-thematic-map
      id="map1"
      panning="auto"
      zooming="auto"
      selectionMode="single"
      markerData={airportDataProvider}
      mapProvider={mapProvider}
      linkData={flightDataProvider}
      class="demo-thematicmap-min-width"
    >
      <template slot="markerTemplate" render={markerTemplateRenderer} />
      <template slot="linkTemplate" render={linkTemplateRenderer} />
    </oj-thematic-map>
  );
};

export default ThematicMapLinks;
