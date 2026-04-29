// @ts-nocheck
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonDataText from 'text!../treemap-default/usaMeanIncomeSubregion.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'ojs/ojtreemap';
import { ojTreemap } from 'ojs/ojtreemap';

type HighlightMode = NonNullable<ComponentProps<'oj-treemap'>['highlightMode']>;
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

export const TreemapHighlighting = () => {
  const [highlight, setHighlight] = useState<HighlightMode>('categories');

  const treemapData = useMemo(
    () =>
      new ArrayTreeDataProvider(jsonData, {
        keyAttributes: 'label',
        childrenAttribute: 'nodes'
      }),
    []
  );
  const colors = useMemo(() => getColorValuesFromPalette('viridis'), []);

  const handleHighlightChanged = (event: RadiosetValueChangedEvent): void => {
    setHighlight((event.detail.value as HighlightMode | null) ?? 'categories');
  };

  const getColor = (meanIncome: number): string =>
    getColorValue(colors, (meanIncome - minIncome) / (maxIncome - minIncome));

  const nodeTemplateRenderer = ($current: TreemapNodeContext) => {
    const color = getColor($current.data.meanIncome);
    return (
      <oj-treemap-node
        label={$current.data.label}
        categories={[color]}
        value={$current.data.population}
        color={color}
        shortDesc={getShortDesc($current.data.label, $current.data.population, $current.data.meanIncome)}
      />
    );
  };

  return (
    <div id="treemap-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="h1" class="oj-typography-subheading-md">
          Options To Control The Treemap Below
        </h2>
        <oj-radioset
          value={highlight}
          class="oj-choice-direction-row"
          labelHint="Highlight Mode"
          labelEdge="inside"
          aria-controls="treemap1"
          onvalueChanged={handleHighlightChanged}
        >
          <oj-option value="categories">categories</oj-option>
          <oj-option value="descendants">descendants</oj-option>
        </oj-radioset>
      </div>
      <oj-treemap id="treemap1" hoverBehavior="dim" highlightMode={highlight} data={treemapData}>
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-treemap>
    </div>
  );
};

export default TreemapHighlighting;
