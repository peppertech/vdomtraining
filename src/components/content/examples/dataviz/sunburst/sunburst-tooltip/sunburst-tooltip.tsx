// @ts-nocheck
import { h } from 'preact';
import { useMemo, useRef } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import "css!./demo.css";
import 'ojs/ojchart';
import 'ojs/ojsunburst';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/usaMeanIncomeSubregion.json';
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';

type SunburstNode = {
  label: string;
  population: number;
  meanIncome: number;
  nodes?: SunburstNode[];
};

const data = JSON.parse(jsonDataText as string) as SunburstNode[];

export const SunburstTooltip = () => {
  const maxIncomeRef = useRef(70000);
  const tooltipElem = useMemo(() => {
    const element = document.createElement('div');

    element.style.borderWidth = '4px';
    element.innerHTML =
      '<div class="oj-sm-float-start oj-sm-padding-4x">' +
      '<span class="oj-typography-bold oj-text-color-secondary"></span>' +
      '<br>' +
      '<span class="demo-font-italic"></span>' +
      '</div>' +
      '<oj-chart type="pie" data-oj-binding-provider="none" ' +
      'style-defaults.data-label-position="none" legend.rendered="off" ' +
      'class="oj-sm-float-end demo-chart-size"></oj-chart>';

    return element;
  }, []);
  const sunburstData = useMemo(
    () =>
      new ArrayTreeDataProvider(data, {
        keyAttributes: 'label',
        childrenAttribute: 'nodes'
      }),
    []
  );
  const colors = useMemo(() => getColorValuesFromPalette('viridis', 4), []);
  const minIncome = 35000;

  const getColor = (meanIncome: number): string =>
    getColorValue(colors, (meanIncome - minIncome) / (maxIncomeRef.current - minIncome));

  const tooltipFunction = (dataContext: DatavizTooltipContext<DatavizChartDatum>) => {
    const pieChart = tooltipElem.children[1];
    const chartItems = [
      { value: dataContext.value % 50, groupId: ['Group'], color: colors[0], seriesId: '1stQuartile' },
      { value: dataContext.value % 51, groupId: ['Group'], color: colors[1], seriesId: '2ndQuartile' },
      { value: dataContext.value % 52, groupId: ['Group'], color: colors[2], seriesId: '3rdQuartile' },
      { value: dataContext.value % 53, groupId: ['Group'], color: colors[3], seriesId: '4thQuartile' }
    ];

    pieChart.data = new ArrayDataProvider(chartItems, {
      keyAttributes: 'seriesId'
    });

    const textElems = tooltipElem.children[0];
    textElems.children[0].textContent = dataContext.label;
    textElems.children[2].textContent = String(dataContext.value);

    return { insert: tooltipElem };
  };

  const nodeTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => (
    <oj-sunburst-node
      label={$current.data.label}
      value={$current.data.population}
      color={getColor($current.data.meanIncome)}
      shortDesc={`${$current.data.label}:${$current.data.population}`}
    />
  );

  return (
    <div id="sunburst-container">
      <oj-sunburst
        animationOnDisplay="auto"
        colorLabel="Median Household Income"
        sizeLabel="Population"
        data={sunburstData}
        {...({ 'nodeDefaults.labelDisplay': 'rotated', 'tooltip.renderer': tooltipFunction } as DatavizSunburstProps)}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-sunburst>
    </div>
  );
};

export default SunburstTooltip;
