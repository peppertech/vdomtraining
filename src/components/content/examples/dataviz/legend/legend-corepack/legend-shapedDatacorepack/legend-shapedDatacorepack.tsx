import "css!./demo.css";
import "oj-c/legend";
import "oj-c/legend-item";
import "oj-c/legend-section";
import type { JSX } from 'preact';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type LegendItem = {
  text: string;
  color?: string;
  markerShape: string;
};

type LegendSection = {
  title: string;
  items: LegendItem[];
};

const brandYear: LegendSection[] = [
  {
    title: 'Brand',
    items: [
      { text: 'Coke', color: '#267db3', markerShape: 'square' },
      { text: 'Pepsi', color: '#68c182', markerShape: 'square' },
      { text: 'Snapple', color: '#fad55c', markerShape: 'square' },
      { text: 'Nestle', color: '#ed6647', markerShape: 'square' }
    ]
  },
  {
    title: 'Year',
    items: [
      { text: '2011', markerShape: 'square' },
      { text: '2012', markerShape: 'circle' },
      { text: '2013', markerShape: 'diamond' },
      { text: '2014', markerShape: 'plus' }
    ]
  }
];

const fruits: LegendItem[] = [
  { text: 'Blueberries', color: '#267db3', markerShape: 'square' },
  { text: 'Kiwis', color: '#68c182', markerShape: 'square' },
  { text: 'Bananas', color: '#fad55c', markerShape: 'square' },
  { text: 'Apples', color: '#ed6647', markerShape: 'square' },
  { text: 'Grapes', color: '#8561c8', markerShape: 'square' }
];

const itemDataProvider = new ArrayDataProvider<string, LegendItem>(fruits, {
  keyAttributes: 'text'
});
const sectionDataProvider = new ArrayTreeDataProvider<number, LegendSection | LegendItem>(brandYear, {
  keyAttributes: '@index',
  childrenAttribute: 'items'
});

export const LegendShapedDatacorepack = (): JSX.Element => {
  return (
    <div id="legend-container">
      <h3>Items</h3>
      <oj-c-legend id="legend1" orientation="vertical" data={itemDataProvider} aria-label="Legend of fruits" />
      <h3>Sections and Items</h3>
      <oj-c-legend
        id="legend2"
        orientation="vertical"
        data={sectionDataProvider}
        aria-label="Legend showing different brands and years"
      />
    </div>
  );
};

export default LegendShapedDatacorepack;
