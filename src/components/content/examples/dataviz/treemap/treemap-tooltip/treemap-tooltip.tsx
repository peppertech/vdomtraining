// @ts-nocheck
import { h } from 'preact';
import { useMemo, useRef } from 'preact/hooks';
import ArrayDataProvider from 'ojs/ojarraydataprovider';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import * as jsonData from 'text!../data/cookbook/dataVisualizations/treeView/resources/usaMeanIncomeSubregion.json';
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';
import 'ojs/ojtreemap';
import 'ojs/ojchart';
import { ojTreemap } from 'ojs/ojtreemap';

export const TreemapTooltip = () => {
  const maxIncomeRef = useRef<number>(70000);

  const tooltipElem = document.createElement('div');
  const data = JSON.parse(jsonData) as DatavizChartDatum[];
  const treemapData = useMemo(() => new ArrayTreeDataProvider(data, {
      keyAttributes: 'label',
      childrenAttribute: 'nodes'
  }), [data]);
  const minIncome = 35000;
  const colors = getColorValuesFromPalette('viridis', 4);

  const getColor = (meanIncome: number) => {
      return getColorValue(colors, (meanIncome - minIncome) / (maxIncomeRef.current - minIncome));
  };

  const tooltipFunction = (dataContext: ojTreemap.TooltipContext<string, ojTreemap.Node<string>>) => {
      const pieChart = tooltipElem.children[1] as ojTreemap<string, ojTreemap.Node<string>>;
      const chartItems = [
          {
              value: dataContext.value % 50,
              groupId: ['Group'],
              color: colors[0],
              seriesId: '1stQuartile'
          },
          {
              value: dataContext.value % 51,
              groupId: ['Group'],
              color: colors[1],
              seriesId: '2ndQuartile'
          },
          {
              value: dataContext.value % 52,
              groupId: ['Group'],
              color: colors[2],
              seriesId: '3rdQuartile'
          },
          {
              value: dataContext.value % 53,
              groupId: ['Group'],
              color: colors[3],
              seriesId: '4thQuartile'
          }
      ];
      pieChart.data = new ArrayDataProvider(chartItems, {
          keyAttributes: 'seriesId'
      });
      const textElems = tooltipElem.children[0];
      textElems.children[0].textContent = dataContext.label;
      textElems.children[2].textContent = dataContext.value.toString();
      // Return the elem to be inserted
      return { insert: tooltipElem };
  };

  return (
      <div id="treemap-container">
            <oj-treemap animation-on-display="auto" animation-on-data-change="auto" data={treemapData} {...{ 'tooltip.renderer': tooltipFunction }}>
                    <template slot="nodeTemplate" render={($current) => (
                            <oj-treemap-node label={$current.data.label} value={$current.data.population} color={getColor($current.data.meanIncome)} short-desc={$current.data.label + ':' + $current.data.population} />
                          )} />
                </oj-treemap>
        </div>
    );
};

export default TreemapTooltip;
