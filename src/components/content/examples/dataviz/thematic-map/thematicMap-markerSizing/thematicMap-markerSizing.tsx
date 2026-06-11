import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/usa_states.json';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/usageData.json';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'css!./demo.css';
import 'ojs/ojthematicmap';

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];

const geo = JSON.parse(geoText as string);
const usageData = JSON.parse(jsonDataText as string);

export const ThematicMapMarkerSizing = () => {
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
  const markerColor = useMemo(() => new ColorAttributeGroupHandler().getValue('user'), []);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(usageData, {
        keyAttributes: 'state'
      }),
    []
  );
  const markerTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
    return (
      <oj-thematic-map-marker
        color={markerColor}
        location={$current.data.state}
        value={$current.data.users}
        shortDesc={$current.data.users + ' daily users'}
      />
    );
  };

  return (
    <oj-thematic-map
      id="map1"
      animationOnDisplay="auto"
      markerData={dataProvider}
      mapProvider={mapProvider}
      class="demo-thematicmap-min-width"
    >
      <template slot="markerTemplate" render={markerTemplateRenderer} />
    </oj-thematic-map>
  );
};

export default ThematicMapMarkerSizing;
