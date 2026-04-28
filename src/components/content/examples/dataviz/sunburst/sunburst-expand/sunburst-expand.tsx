// @ts-nocheck
import { h } from 'preact';
import { useMemo, useRef } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { ObservableKeySet } from 'ojs/ojkeyset';
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';
import 'ojs/ojsunburst';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/usaMeanIncomeSubregion.json';

type IncomeNode = {
  label: string;
  population: number;
  meanIncome: number;
  nodes?: IncomeNode[];
};

const data = JSON.parse(jsonDataText as string) as IncomeNode[];

export const SunburstExpand = () => {
  const maxIncomeRef = useRef(70000);
  const expandedNodes = useMemo(
    () => new ObservableKeySet().add(['United States', 'Midwest Region', 'West Region', 'Pacific']),
    []
  );
  const sunburstData = useMemo(
    () =>
      new ArrayTreeDataProvider(data, {
        keyAttributes: 'label',
        childrenAttribute: 'nodes'
      }),
    []
  );
  const colors = useMemo(() => getColorValuesFromPalette('viridis'), []);
  const minIncome = 35000;

  const getColor = (meanIncome: number): string =>
    getColorValue(colors, (meanIncome - minIncome) / (maxIncomeRef.current - minIncome));

  const getShortDesc = (label: string, population: number, meanIncome: number): string =>
    `&lt;b&gt;${label}&lt;/b&gt;&lt;br/&gt;Population: ${population}&lt;br/&gt;Income: ${meanIncome}`;

  const nodeTemplateRenderer = ($current: any) => (
    <oj-sunburst-node
      label={$current.data.label}
      value={$current.data.population}
      color={getColor($current.data.meanIncome)}
      shortDesc={getShortDesc($current.data.label, $current.data.population, $current.data.meanIncome)}
    />
  );

  return (
    <div id="sunburst-container">
      <oj-sunburst
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        data={sunburstData}
        expanded={expandedNodes}
        {...({ 'nodeDefaults.labelDisplay': 'rotated', 'nodeDefaults.showDisclosure': 'on' } as any)}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-sunburst>
    </div>
  );
};

export default SunburstExpand;
