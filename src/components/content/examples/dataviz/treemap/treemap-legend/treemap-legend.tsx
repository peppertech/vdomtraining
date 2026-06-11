// @ts-nocheck
import { h } from 'preact';
import { useMemo, useRef } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';
import * as jsonData from 'text!../data/cookbook/dataVisualizations/treeView/resources/usaMeanIncomeSubregion.json';
import 'ojs/ojtreemap';
import 'ojs/ojlegend';

export const TreemapLegend = () => {
  const maxIncomeRef = useRef<number>(70000);

  const data = JSON.parse(jsonData) as DatavizChartDatum[];
  const treemapData = useMemo(() => new ArrayTreeDataProvider(data, {
      keyAttributes: 'label',
      childrenAttribute: 'nodes'
  }), [data]);
  const minIncome = 35000;
  const colors = getColorValuesFromPalette('viridis', 4);
  const legendSections = useMemo(() => [
      {
          items: [
              {
                  text: 'First Quartile',
                  color: colors[0]
              },
              {
                  text: 'Second Quartile',
                  color: colors[1]
              },
              {
                  text: 'Third Quartile',
                  color: colors[2]
              },
              {
                  text: 'Fourth Quartile',
                  color: colors[3]
              }
          ]
      }
  ], [colors]);
  const legendData = useMemo(() => new ArrayTreeDataProvider(legendSections, {
      childrenAttribute: 'items'
  }), [legendSections]);

  const getColor = (meanIncome: number) => {
      return getColorValue(colors, (meanIncome - minIncome) / (maxIncomeRef.current - minIncome));
  };

  const getShortDesc = (label: string, population: number, meanIncome: number) => {
      return ('&lt;b&gt;' +
          label +
          '&lt;/b&gt;&lt;br/&gt;Population: ' +
          population +
          '&lt;br/&gt;Income: ' +
          meanIncome +
          '&lt;br/&gt;' +
          meanIncome);
  };

  return (
      <div id="demo-container" class="demo-max-width">
            <oj-treemap animation-on-display="auto" color-label="Median Household Income" size-label="Population" data={treemapData}>
                    <template slot="nodeTemplate" render={($current) => (
                            <oj-treemap-node label={$current.data.label} value={$current.data.population} color={getColor($current.data.meanIncome)} short-desc={getShortDesc($current.data.label, $current.data.population, $current.data.meanIncome)} />
                          )} />
                </oj-treemap>
            <oj-legend orientation="horizontal" halign="center" data={legendData}>
                    <template slot="itemTemplate" render={($current) => (
                            <oj-legend-item short-desc={$current.data.text} text={$current.data.text} color={$current.data.color} />
                          )} />
                </oj-legend>
        </div>
    );
};

export default TreemapLegend;
