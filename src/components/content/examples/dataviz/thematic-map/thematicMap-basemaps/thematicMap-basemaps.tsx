// @ts-nocheck
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as africaText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/africa_countries.json';
import * as asiaText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/asia_countries.json';
import * as australiaText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/australia_countries.json';
import * as europeText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/europe_countries.json';
import * as northAmericaText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/north_america_countries.json';
import * as southAmericaText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/south_america_countries.json';
import * as worldText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/world_countries.json';
import 'css!./demo.css';
import 'ojs/ojformlayout';
import 'ojs/ojthematicmap';
import '../../../../../jet-composites/demo-select-enum/loader';

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];

const mapGeoLookup = {
  Africa: JSON.parse(africaText as string),
  Asia: JSON.parse(asiaText as string),
  Australia: JSON.parse(australiaText as string),
  Europe: JSON.parse(europeText as string),
  'North America': JSON.parse(northAmericaText as string),
  'South America': JSON.parse(southAmericaText as string),
  World: JSON.parse(worldText as string)
};

export const ThematicMapBasemaps = () => {
  const [map, setMap] = useState('World');
  const geo = mapGeoLookup[map] ?? mapGeoLookup.World;
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(geo.features, {
        keyAttributes: '@index'
      }),
    [geo]
  );
  const mapProvider = useMemo<ThematicMapProvider>(
    () => ({
      geo,
      propertiesKeys: {
        id: 'CC3',
        shortLabel: 'CC3',
        longLabel: 'NAME'
      }
    }),
    [geo]
  );
  const handler = useMemo(() => new ColorAttributeGroupHandler(), [map]);
  const getColor = (id: string) => handler.getValue(id);
  const areaTemplateRenderer = (area: any) => {
    return (
      <oj-thematic-map-area
        color={getColor(area.data.properties.CC3)}
        location={area.data.properties.CC3}
      />
    );
  };

  return (
    <div id="mapdemo">
      <oj-form-layout aria-controls="map1">
        <demo-select-enum
          id="mapSelect"
          value={map}
          labelHint="Map"
          onvalueChanged={(event: any) => setMap(event.detail.value ?? 'World')}
          enumValues={['Africa', 'Asia', 'Australia', 'Europe', 'North America', 'South America', 'World']}
        />
      </oj-form-layout>
      <oj-thematic-map
        id="map1"
        areaData={dataProvider}
        zooming="auto"
        panning="auto"
        animationOnDisplay="auto"
        selectionMode="single"
        mapProvider={mapProvider}
        class="demo-thematicmap-min-width"
      >
        <template slot="areaTemplate" render={areaTemplateRenderer} />
      </oj-thematic-map>
    </div>
  );
};

export default ThematicMapBasemaps;
