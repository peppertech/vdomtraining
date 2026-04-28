// @ts-nocheck
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/world_countries.json';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/globalGDP.json';
import 'css!./demo.css';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojthematicmap';
import '../../../../../jet-composites/demo-input-json/loader';
import '../../../../../jet-composites/demo-select-enum/loader';

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];

const geo = JSON.parse(geoText as string);
const gdpData = JSON.parse(jsonDataText as string);

export const ThematicMapStyles = () => {
  const [borderWidth, setBorderWidth] = useState(0.75);
  const [borderStyle, setBorderStyle] = useState('solid');
  const [borderColor, setBorderColor] = useState('blue');
  const [markerLabel, setMarkerLabel] = useState({ color: 'white' });
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
  const handler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(gdpData, {
        keyAttributes: 'Country'
      }),
    []
  );
  const styles = useMemo(
    () => ({
      dataMarkerDefaults: {
        borderColor,
        borderWidth,
        borderStyle,
        labelStyle: markerLabel
      }
    }),
    [borderColor, borderWidth, borderStyle, markerLabel]
  );
  const getColor = (country: string) => handler.getValue(country);
  const markerTemplateRenderer = ($current: any) => {
    return (
      <oj-thematic-map-marker
        location={$current.data.Country}
        value={$current.data.GDP}
        shortDesc={'$' + $current.data.GDP + ' Million'}
        color={getColor($current.data.Country)}
        label={Math.sqrt($current.data.GDP) > 800 ? $current.data.Country : null}
      />
    );
  };

  return (
    <div id="mapdemo" class="oj-flex oj-sm-align-items-center">
      <oj-thematic-map
        id="map1"
        animationOnDisplay="auto"
        mapProvider={mapProvider}
        markerData={dataProvider}
        styleDefaults={styles}
        class="oj-flex-item oj-sm-padding-2x-horizontal demo-thematicmap-min-width"
      >
        <template slot="markerTemplate" render={markerTemplateRenderer} />
      </oj-thematic-map>
      <oj-form-layout class="oj-flex-item oj-sm-margin-4x-top" aria-controls="map1">
        <oj-input-text
          id="borderWidth"
          value={borderWidth}
          onvalueChanged={(event: any) => setBorderWidth(event.detail.value ?? 0)}
          labelHint="Marker Border Width"
        />
        <oj-input-text
          id="borderColor"
          value={borderColor}
          onvalueChanged={(event: any) => setBorderColor(event.detail.value ?? '')}
          labelHint="Marker Border Color"
        />
        <demo-select-enum
          id="select1"
          labelHint="Marker Border Style"
          value={borderStyle}
          onvalueChanged={(event: any) => setBorderStyle(event.detail.value ?? 'solid')}
          enumValues={['none', 'solid']}
        />
        <demo-input-json
          id="markerLabel"
          value={markerLabel}
          onvalueChanged={(event: any) => setMarkerLabel(event.detail.value ?? {})}
          labelHint="Marker Label Style"
        />
      </oj-form-layout>
    </div>
  );
};

export default ThematicMapStyles;
