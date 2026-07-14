import 'ojs/ojformlayout';
import 'ojs/ojoption';
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';
import 'ojs/ojradioset';
import 'ojs/ojtreemap';
import { ojTreemap } from 'ojs/ojtreemap';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!./usaMeanIncome.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type SortingMode = NonNullable<ComponentProps<'oj-treemap'>['sorting']>;
type RadiosetValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0];
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

export const TreemapSorting = () => {
  const [sortingValue, setSortingValue] = useState<SortingMode>('on');

  const treemapData = useMemo(
    () =>
      new ArrayTreeDataProvider(jsonData, {
        keyAttributes: 'label',
        childrenAttribute: 'nodes'
      }),
    []
  );
  const colors = useMemo(() => getColorValuesFromPalette('viridis'), []);

  const handleSortingChanged = (event: RadiosetValueChangedEvent): void => {
    setSortingValue((event.detail.value as SortingMode | null) ?? 'on');
  };

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
      <oj-form-layout aria-controls="treemap">
        <oj-radioset
          value={sortingValue}
          class="oj-choice-direction-row"
          labelHint="Sorting"
          onvalueChanged={handleSortingChanged}
        >
          <oj-option value="on">on</oj-option>
          <oj-option value="off">off</oj-option>
        </oj-radioset>
      </oj-form-layout>
      <oj-treemap
        id="treemap"
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        sorting={sortingValue}
        colorLabel="Median Household Income"
        sizeLabel="Population"
        layout="sliceAndDiceHorizontal"
        data={treemapData}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-treemap>
    </div>
  );
};

export default TreemapSorting;
