import 'ojs/ojoption';
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';
import 'ojs/ojradioset';
import 'ojs/ojsunburst';
import 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/usaMeanIncomeSubregion.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type HighlightMode = 'categories' | 'descendants';
type IncomeNode = {
  label: string;
  population: number;
  meanIncome: number;
  nodes?: IncomeNode[];
};

const data = JSON.parse(jsonDataText as string) as IncomeNode[];

export const SunburstHighlighting = () => {
  const [highlight, setHighlight] = useState<HighlightMode>('categories');
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

  const nodeTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
    const nodeColor = getColor($current.data.meanIncome);
    return (
      <oj-sunburst-node
        label={$current.data.label}
        value={$current.data.population}
        color={nodeColor}
        categories={[nodeColor]}
        shortDesc={getShortDesc($current.data.label, $current.data.population, $current.data.meanIncome)}
      />
    );
  };

  return (
    <div id="sunburst-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="h1" class="oj-typography-subheading-md">Options To Control The Sunburst Below</h2>
        <oj-radioset
          onvalueChanged={(event: DatavizValueChangedEvent<HighlightMode>) => setHighlight(event.detail.value)}
          value={highlight}
          class="oj-choice-direction-row"
          labelHint="Highlight Mode"
          labelEdge="inside"
          aria-controls="sunburst1"
        >
          <oj-option value="categories">categories</oj-option>
          <oj-option value="descendants">descendants</oj-option>
        </oj-radioset>
      </div>
      <oj-sunburst
        id="sunburst1"
        animationOnDisplay="auto"
        colorLabel="Median Household Income"
        sizeLabel="Population"
        hoverBehavior="dim"
        highlightMode={highlight}
        data={sunburstData}
        {...({ 'nodeDefaults.labelDisplay': 'rotated' } as DatavizSunburstProps)}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-sunburst>
    </div>
  );
};

export default SunburstHighlighting;
