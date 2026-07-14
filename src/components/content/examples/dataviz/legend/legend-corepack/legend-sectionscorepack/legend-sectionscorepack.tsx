import "css!./demo.css";
import "oj-c/legend";
import "oj-c/legend-item";
import "oj-c/legend-section";
import { ColorAttributeGroupHandler,ShapeAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import type { JSX } from 'preact';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type LegendSectionItem = {
  type: 'Brand' | 'Year';
  label: string;
};

type LegendSection = {
  label: string;
  items: LegendSectionItem[];
};

const brandYear: LegendSection[] = [
  {
    label: 'Brand',
    items: [
      { type: 'Brand', label: 'Coke' },
      { type: 'Brand', label: 'Pepsi' },
      { type: 'Brand', label: 'Snapple' },
      { type: 'Brand', label: 'Nestle' }
    ]
  },
  {
    label: 'Year',
    items: [
      { type: 'Year', label: '2011' },
      { type: 'Year', label: '2012' },
      { type: 'Year', label: '2013' },
      { type: 'Year', label: '2014' }
    ]
  }
];

const colorHandler = new ColorAttributeGroupHandler();
const shapeHandler = new ShapeAttributeGroupHandler();
const dataProvider = new ArrayTreeDataProvider<string, LegendSection | LegendSectionItem>(brandYear, {
  keyAttributes: 'label',
  childrenAttribute: 'items'
});

export const LegendSectionscorepack = (): JSX.Element => {
  const sectionTemplateRenderer = ($current: { data: LegendSection }): JSX.Element => (
    <oj-c-legend-section text={$current.data.label} />
  );

  const itemTemplateRenderer = ($current: { data: LegendSectionItem }): JSX.Element => (
    <oj-c-legend-item
      shortDesc={$current.data.label}
      text={$current.data.label}
      color={$current.data.type === 'Brand' ? colorHandler.getValue($current.data.label) : '#a6acb1'}
      markerShape={$current.data.type === 'Year' ? shapeHandler.getValue($current.data.label) : 'square'}
    />
  );

  return (
    <div id="legend-container">
      <oj-c-legend id="legend1" orientation="vertical" data={dataProvider}>
        <template slot="sectionTemplate" render={sectionTemplateRenderer} />
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-c-legend>
    </div>
  );
};

export default LegendSectionscorepack;
