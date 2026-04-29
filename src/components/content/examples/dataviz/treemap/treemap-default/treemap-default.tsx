// @ts-nocheck
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!./usaMeanIncomeSubregion.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';
import 'ojs/ojtreemap';
import { ojTreemap } from 'ojs/ojtreemap';

type TreemapNodeDatum = {
  label: string;
  population: number;
  meanIncome: number;
  nodes?: TreemapNodeDatum[];
};

type TreemapNodeContext = ojTreemap.NodeTemplateContext<string, TreemapNodeDatum>;

const jsonData = JSON.parse(jsonDataText as string) as TreemapNodeDatum[];
const maxIncome = 70000;
const minIncome = 35000;

const getShortDesc = (label: string, population: number, meanIncome: number): string =>
  `&lt;b&gt;${label}&lt;/b&gt;&lt;br/&gt;Population: ${population}&lt;br/&gt;Income: ${meanIncome}`;

export const TreemapDefault = () => {
  const treemapData = useMemo(
    () =>
      new ArrayTreeDataProvider(jsonData, {
        keyAttributes: 'label',
        childrenAttribute: 'nodes'
      }),
    []
  );

  const colors = useMemo(() => getColorValuesFromPalette('viridis'), []);

  const getColor = (meanIncome: number): string =>
    getColorValue(colors, (meanIncome - minIncome) / (maxIncome - minIncome));

  const nodeTemplateRenderer = ($current: TreemapNodeContext) => (
    <oj-treemap-node
      label={$current.data.label}
      value={$current.data.population}
      color={getColor($current.data.meanIncome)}
      shortDesc={getShortDesc($current.data.label, $current.data.population, $current.data.meanIncome)}
    />
  );

  return (
    <div id="treemap-container">
      <oj-treemap
        id="treemap1"
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        data={treemapData}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-treemap>
    </div>
  );
};

export default TreemapDefault;
