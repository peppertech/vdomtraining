import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';
import 'ojs/ojsunburst';
import 'preact';
import { useMemo,useRef } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/usaMeanIncomeSubregion.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type IncomeNode = {
  label: string;
  population: number;
  meanIncome: number;
  nodes?: IncomeNode[];
};

const data = JSON.parse(jsonDataText as string) as IncomeNode[];

export const SunburstDefault = () => {
  const maxIncomeRef = useRef(70000);
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

  const nodeTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => (
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
        colorLabel="Median Household Income"
        sizeLabel="Population"
        data={sunburstData}
        {...({ 'nodeDefaults.labelDisplay': 'rotated' } as DatavizSunburstProps)}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-sunburst>
    </div>
  );
};

export default SunburstDefault;
