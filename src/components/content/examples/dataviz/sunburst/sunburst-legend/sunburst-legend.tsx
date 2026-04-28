import { h } from 'preact';
import type { ComponentProps, JSX } from 'preact';
import { useMemo, useRef } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';
import 'ojs/ojlegend';
import 'ojs/ojsunburst';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/usaMeanIncomeSubregion.json';

type IncomeNode = {
  label: string;
  population: number;
  meanIncome: number;
  nodes?: IncomeNode[];
};

type LegendItem = {
  text: string;
  color: string;
};

type LegendSection = {
  items: LegendItem[];
};

type NodeTemplateContext = {
  data: IncomeNode;
};

type LegendItemTemplateContext = {
  data: LegendItem;
};

const sunburstProps = {
  'nodeDefaults.labelDisplay': 'rotated'
} as Partial<ComponentProps<'oj-sunburst'>>;

const chartData = JSON.parse(jsonDataText as string) as IncomeNode[];

export const SunburstLegend = (): JSX.Element => {
  const maxIncomeRef = useRef(70000);
  const minIncome = 35000;
  const colors = useMemo(() => getColorValuesFromPalette('viridis', 4), []);

  const legendSections = useMemo<LegendSection[]>(
    () => [
      {
        items: [
          { text: 'First Quartile', color: colors[0] },
          { text: 'Second Quartile', color: colors[1] },
          { text: 'Third Quartile', color: colors[2] },
          { text: 'Fourth Quartile', color: colors[3] }
        ]
      }
    ],
    [colors]
  );
  const sunburstData = useMemo(
    () =>
      new ArrayTreeDataProvider(chartData, {
        keyAttributes: 'label',
        childrenAttribute: 'nodes'
      }),
    []
  );
  const legendData = useMemo(
    () =>
      new ArrayTreeDataProvider(legendSections, {
        childrenAttribute: 'items'
      }),
    [legendSections]
  );

  const getColor = (meanIncome: number): string =>
    getColorValue(colors, (meanIncome - minIncome) / (maxIncomeRef.current - minIncome));

  const getShortDesc = (label: string, population: number, meanIncome: number): string =>
    `&lt;b&gt;${label}&lt;/b&gt;&lt;br/&gt;Population: ${population}&lt;br/&gt;Income: ${meanIncome}&lt;br/&gt;${meanIncome}`;

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

  const legendItemTemplateRenderer = ($current: LegendItemTemplateContext): JSX.Element => (
    <oj-legend-item
      shortDesc={$current.data.text}
      text={$current.data.text}
      color={$current.data.color}
    />
  );

  return (
    <div id="demo-container" class="demo-max-width">
      <oj-sunburst
        id="sunburst1"
        animationOnDisplay="auto"
        colorLabel="Median Household Income"
        sizeLabel="Population"
        data={sunburstData}
        {...sunburstProps}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-sunburst>
      <oj-legend
        orientation="horizontal"
        halign="center"
        textStyle={{ fontSize: '14px' }}
        data={legendData}
      >
        <template slot="itemTemplate" render={legendItemTemplateRenderer} />
      </oj-legend>
    </div>
  );
};

export default SunburstLegend;
