// @ts-nocheck
import { h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';
import * as jsonData from 'text!../data/cookbook/dataVisualizations/treeView/resources/usaMeanIncomeSubregion.json';
import 'ojs/ojtreemap';

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const TreemapIsolate = () => {
  const [isolatedNode, setIsolatedNode] = useState<string>('Northeast Region');

  const maxIncomeRef = useRef<number>(70000);

  const data = JSON.parse(jsonData) as DatavizChartDatum[];
  const treemapData = useMemo(() => new ArrayTreeDataProvider(data, {
      keyAttributes: 'label',
      childrenAttribute: 'nodes'
  }), [data]);
  const minIncome = 35000;
  const colors = getColorValuesFromPalette('viridis');

  const handleIsolatedNodeIsolatedNodeChanged = (event: PropertyChangedEvent<string>) => {
    setIsolatedNode(event.detail.value);
  };

  const getColor = (meanIncome: number) => {
      return getColorValue(colors, (meanIncome - minIncome) / (maxIncomeRef.current - minIncome));
  };

  const getShortDesc = (label: string, population: number, meanIncome: number) => {
      return ('&lt;b&gt;' +
          label +
          '&lt;/b&gt;&lt;br/&gt;Population: ' +
          population +
          '&lt;br/&gt;Income: ' +
          meanIncome);
  };

  return (
      <div id="treemap-container">
            <oj-treemap id="treemap" animation-on-display="auto" animation-on-data-change="auto" data={treemapData} onisolatedNodeChanged={handleIsolatedNodeIsolatedNodeChanged} isolated-node={isolatedNode}>
                    <template slot="nodeTemplate" render={($current) => (
                            <oj-treemap-node label={$current.data.label} value={$current.data.population} color={getColor($current.data.meanIncome)} short-desc={getShortDesc($current.data.label, $current.data.population, $current.data.meanIncome)} />
                          )} />
                </oj-treemap>
            <div class="oj-typography-heading-xs oj-sm-padding-2x">
                    Isolated Node:
                    <span>{isolatedNode}</span>
                </div>
        </div>
    );
};

export default TreemapIsolate;
