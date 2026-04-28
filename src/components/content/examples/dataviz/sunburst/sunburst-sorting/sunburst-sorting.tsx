import { h } from 'preact';
import type { ComponentProps, JSX } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { JetElementCustomEvent } from 'ojs/index';
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';
import 'ojs/ojformlayout';
import 'ojs/ojsunburst';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/usaMeanIncome.json';
import '../../../../../jet-composites/demo-radioset-enum/loader';

type SortingValue = NonNullable<ComponentProps<'oj-sunburst'>['sorting']>;
type IncomeNode = {
  label: string;
  population: number;
  meanIncome: number;
  nodes?: IncomeNode[];
};

type NodeTemplateContext = {
  data: IncomeNode;
};

const sunburstProps = {
  'nodeDefaults.labelDisplay': 'rotated'
} as Partial<ComponentProps<'oj-sunburst'>>;

const chartData = JSON.parse(jsonDataText as string) as IncomeNode[];

export const SunburstSorting = (): JSX.Element => {
  const [sortingValue, setSortingValue] = useState<SortingValue>('on');
  const maxIncomeRef = useRef(70000);
  const minIncome = 35000;
  const colors = useMemo(() => getColorValuesFromPalette('viridis'), []);
  const sunburstData = useMemo(
    () =>
      new ArrayTreeDataProvider(chartData, {
        keyAttributes: 'label',
        childrenAttribute: 'nodes'
      }),
    []
  );

  const handleSortingValueValueChanged = (event: JetElementCustomEvent<SortingValue>): void => {
    setSortingValue(event.detail.value);
  };

  const getColor = (meanIncome: number): string =>
    getColorValue(colors, (meanIncome - minIncome) / (maxIncomeRef.current - minIncome));

  const getShortDesc = (label: string, population: number, meanIncome: number): string =>
    `&lt;b&gt;${label}&lt;/b&gt;&lt;br/&gt;Population: ${population}&lt;br/&gt;Income: ${meanIncome}`;

  const nodeTemplateRenderer = ($current: NodeTemplateContext): JSX.Element => (
    <oj-sunburst-node
      label={$current.data.label}
      value={$current.data.population}
      color={getColor($current.data.meanIncome)}
      shortDesc={getShortDesc(
        $current.data.label,
        $current.data.population,
        $current.data.meanIncome
      )}
    />
  );

  return (
    <div id="sunburst-container">
      <oj-form-layout aria-controls="sunburst">
        <demo-radioset-enum
          onvalueChanged={handleSortingValueValueChanged}
          value={sortingValue}
          enumValues={['on', 'off']}
          direction="row"
          labelHint="Sorting"
        />
      </oj-form-layout>
      <oj-sunburst
        id="sunburst"
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        colorLabel="Median Household Income"
        sizeLabel="Population"
        data={sunburstData}
        sorting={sortingValue}
        {...sunburstProps}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-sunburst>
    </div>
  );
};

export default SunburstSorting;
