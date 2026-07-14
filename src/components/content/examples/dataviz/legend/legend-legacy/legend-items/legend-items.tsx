import 'ojs/ojlegend';
import type { JSX } from 'preact';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type LegendIconItem = {
  text: string;
  symbolType: 'line' | 'lineWithMarker' | 'marker' | 'image';
  color?: string;
  markerShape?: string;
  markerColor?: string;
  borderColor?: string;
  pattern?: string;
  source?: string;
};

const items: LegendIconItem[] = [
  { text: 'line', symbolType: 'line', color: '#267db3' },
  {
    text: 'lineWithMarker',
    symbolType: 'lineWithMarker',
    markerShape: 'diamond',
    color: '#68c182',
    markerColor: '#efdd14',
    borderColor: '#68c182'
  },
  {
    text: 'marker',
    symbolType: 'marker',
    markerShape: 'human',
    color: '#fad55c'
  },
  {
    text: 'marker with pattern fill',
    symbolType: 'marker',
    markerShape: 'circle',
    color: '#ed6647',
    pattern: 'smallDiamond'
  },
  {
    text: 'image',
    symbolType: 'image',
    source: 'components/content/examples/dataviz/legend/legend-corepack/legend-itemscorepack/ipad.png'
  }
];

const dataProvider = new ArrayDataProvider<LegendIconItem['text'], LegendIconItem>(items, {
  keyAttributes: 'text'
});

export const LegendItems = (): JSX.Element => {
  return (
    <div id="legend-container">
      <oj-legend
        id="legend1"
        orientation="vertical"
        data={dataProvider}
        symbolWidth={20}
        symbolHeight={20}
        aria-label="legend item"
      />
    </div>
  );
};

export default LegendItems;
