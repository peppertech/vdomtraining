import 'css!./demo.css';
import 'ojs/ojlegend';
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import 'ojs/ojthematicmap';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/usaRainfall.json';
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/usa_states.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type RainfallDatum = {
  State: string;
  Inches: number;
};

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];

const geo = JSON.parse(geoText as string);
const rainfallData = JSON.parse(jsonDataText as string) as RainfallDatum[];

export const ThematicMapDefault = () => {
  const colors = useMemo(() => getColorValuesFromPalette('viridis', 5), []);
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
        keyAttributes: 'State'
      }),
    []
  );
  const legendSections = useMemo(
    () => [
      {
        items: [
          { text: '0-20', color: colors[0] },
          { text: '21-30', color: colors[1] },
          { text: '31-40', color: colors[2] },
          { text: '41-50', color: colors[3] },
          { text: '51+', color: colors[4] }
        ]
      }
    ],
    [colors]
  );
  const legendDataProvider = useMemo(
    () =>
      new ArrayDataProvider(legendSections, {
        keyAttributes: 'text'
      }),
    [legendSections]
  );
  const getRainfallColor = (rainfall: number) => {
    if (rainfall <= 20) return colors[0];
    if (rainfall <= 30) return colors[1];
    if (rainfall <= 40) return colors[2];
    if (rainfall <= 50) return colors[3];
    return colors[4];
  };
  const areaTemplateRenderer = (area: DatavizTemplateContext<DatavizChartDatum>) => {
    return (
      <oj-thematic-map-area
        color={getRainfallColor(area.data.Inches)}
        location={area.data.State}
        shortDesc={area.data.Inches + ' inches of annual rainfall'}
      />
    );
  };

  return (
    <div id="mapdemo">
      <oj-thematic-map
        id="thematicmap1"
        areaData={dataProvider}
        mapProvider={mapProvider}
        class="demo-thematicmap-min-width"
      >
        <template slot="areaTemplate" render={areaTemplateRenderer} />
      </oj-thematic-map>
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

export default ThematicMapDefault;
