// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayTreeDataProvider from 'ojs/ojarraytreedataprovider';
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';
import * as jsonData from 'text!../data/cookbook/dataVisualizations/treeView/resources/usaMeanIncomeSubregion.json';
import 'ojs/ojtreemap';

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const TreemapIsolate = () => {
  const [isolatedNode, setIsolatedNode] = useState<any>('Northeast Region');

  const maxIncomeRef = useRef<any>(70000);

  const data: any = JSON.parse(jsonData);
  const treemapData = useMemo(() => new ArrayTreeDataProvider(data, {
      keyAttributes: 'label',
      childrenAttribute: 'nodes'
  }), [data]);
  const minIncome: any = 35000;
  const colors: any = getColorValuesFromPalette('viridis');

  const handleIsolatedNodeIsolatedNodeChanged = (event: PropertyChangedEvent<any>) => {
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
                            <>
                                <oj-treemap-node label={$current.data.label} value={$current.data.population} color={getColor($current.data.meanIncome)} short-desc={getShortDesc($current.data.label, $current.data.population, $current.data.meanIncome)} />
                            </>
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
