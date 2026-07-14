import 'css!./demo.css';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojlegend';
import 'ojs/ojthematicmap';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as salesRepsText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/usaSalesReps.json';
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/usa_states.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];

const geo = JSON.parse(geoText as string);
const salesReps = JSON.parse(salesRepsText as string);

export const ThematicMapInlineTemplates = () => {
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
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(salesReps, {
        keyAttributes: 'name'
      }),
    []
  );
  const getColor = (name: string, state?: { selected?: boolean; hovered?: boolean }, isInverted?: boolean, isOuterCircle?: boolean) => {
    let color = colorHandler.getValue((name.length % 3).toString());
    if (state && state.selected && isOuterCircle) color = 'black';
    else if (state && state.hovered && !isOuterCircle) color = 'white';
    if (isInverted) {
      color = color === 'white' ? colorHandler.getValue((name.length % 3).toString()) : 'white';
    }
    return color;
  };
  const getInitials = (fullName: string) =>
    fullName
      .split(' ')
      .map((name) => name.substring(0, 1))
      .join('');
  const markerTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
    return (
      <oj-thematic-map-marker
        location={$current.data.state}
        shortDesc={$current.data.name}
        color={getColor($current.data.name)}
      />
    );
  };
  const markerContentTemplateRenderer = ($current: DatavizThematicMapMarkerContentContext<DatavizChartDatum>) => {
    return (
      <svg width="100" height="100">
        <g transform="translate(6,6)">
          <circle
            cx="20"
            cy="20"
            r="26"
            fill={getColor($current.itemData.name, $current.state, false, true)}
          />
          <circle
            cx="20"
            cy="20"
            fill={getColor($current.itemData.name, $current.state, true)}
            r="23"
          />
          <text
            fill={getColor($current.itemData.name, $current.state)}
            class="oj-typography-subheading-md"
            text-anchor="middle"
            x="20"
            y="30"
          >
            {getInitials($current.itemData.name)}
          </text>
        </g>
      </svg>
    );
  };

  return (
    <div id="thematicmap-container">
      <oj-thematic-map
        id="map1"
        animationOnDisplay="auto"
        markerData={dataProvider}
        mapProvider={mapProvider}
        selectionMode="single"
        panning="auto"
        zooming="auto"
        class="demo-thematicmap-min-width"
      >
        <template slot="markerTemplate" render={markerTemplateRenderer} />
        <template slot="markerContentTemplate" render={markerContentTemplateRenderer} />
      </oj-thematic-map>
    </div>
  );
};

export default ThematicMapInlineTemplates;
