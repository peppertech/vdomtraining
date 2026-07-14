import 'css!./demo.css';
import 'ojs/ojlegend';
import 'ojs/ojthematicmap';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/usaRainfallShaped.json';
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/usa_states.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];

const geo = JSON.parse(geoText as string);
const rainfallData = JSON.parse(jsonDataText as string);

export const ThematicMapShapedData = () => {
  const mapProvider = useMemo<ThematicMapProvider>(
    () => ({
      geo,
      propertiesKeys: {
        id: 'Name',
        shortLabel: 'CC3',
        longLabel: 'Name'
      }
    }),
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(rainfallData, {
        keyAttributes: 'location'
      }),
    []
  );
  const legendSections = useMemo(
    () => [
      {
        items: [
          { text: '0-20', color: '#42C0FB' },
          { text: '21-30', color: '#35A4DF' },
          { text: '31-40', color: '#2888C3' },
          { text: '41-50', color: '#1A6BA7' },
          { text: '51+', color: '#0D4F8B' }
        ]
      }
    ],
    []
  );
  const legendDataProvider = useMemo(
    () =>
      new ArrayDataProvider(legendSections, {
        keyAttributes: 'text'
      }),
    [legendSections]
  );

  return (
    <div id="mapdemo">
      <oj-thematic-map
        id="thematicmap1"
        areaData={dataProvider}
        mapProvider={mapProvider}
        class="demo-thematicmap-min-width"
        aria-label="Thematic map showing data corresponding to geographic locations or regions"
      />
      <div class="oj-typography-bold oj-sm-margin-2x-top oj-helper-text-align-center">
        Annual Rainfall (Inches)
      </div>
      <oj-legend
        id="legend1"
        halign="center"
        orientation="horizontal"
        data={legendDataProvider}
        aria-label="legend showing annual rainfall categorised in five ranges"
      />
    </div>
  );
};

export default ThematicMapShapedData;
