// @ts-nocheck
import { h, render } from 'preact';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { useMemo, useState } from 'preact/hooks';
import * as data from 'text!../../data/cookbook/dataVisualizations/pictoChart/resources/tooltipData.json';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import { ojPictoChart } from 'ojs/ojpictochart';
import 'ojs/ojgauge';
import 'ojs/ojlegend';
import 'ojs/ojpictochart';

type ProductName = 'iPhone' | 'iPad' | 'Mac';
type ChartItem = {
  name: ProductName;
  count: number;
  rating: number;
};
type LegendSection = {
  name: string;
  items: ChartItem[];
};
type PictoItemTemplateContext = {
  data: ChartItem;
};
type LegendItemTemplateContext = {
  data: ChartItem;
};
type LegendSectionTemplateContext = {
  data: LegendSection;
};

const chartData = JSON.parse(data as string) as ChartItem[];

export const PictoChartTooltip = () => {
  const [pictoChartItems] = useState(chartData);
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const imageMap = useMemo<Record<ProductName, string>>(
    () => ({
      iPhone: '../images/pictoChart/iphone.png',
      iPad: '../images/pictoChart/ipad.png',
      Mac: '../images/pictoChart/macBook.png'
    }),
    []
  );
  const dataProvider = useMemo(
    () => new ArrayDataProvider<ChartItem['name'], ChartItem>(pictoChartItems, { keyAttributes: 'name' }),
    [pictoChartItems]
  );
  const legendData = useMemo<LegendSection[]>(() => [{ name: 'Products', items: chartData }], []);
  const legendDataProvider = useMemo(
    () =>
      new ArrayTreeDataProvider<LegendSection['name'] | ChartItem['name'], LegendSection | ChartItem>(
        legendData,
        {
          keyAttributes: 'name',
          childrenAttribute: 'items'
        }
      ),
    [legendData]
  );

  const getImage = (name: ProductName) => {
    return imageMap[name];
  };

  const getRatingValue = (productName: ProductName) => {
    return chartData.find((item) => item.name === productName)?.rating ?? 0;
  };

  const renderPictoItem = (item: PictoItemTemplateContext) => {
    return (
      <oj-picto-chart-item
        name={item.data.name}
        source={getImage(item.data.name)}
        color={colorHandler.getValue(item.data.name)}
        count={item.data.count}
      />
    );
  };

  const renderLegendItem = (item: LegendItemTemplateContext) => {
    return (
      <oj-legend-item
        short-desc={`Product: ${item.data.name}`}
        text={item.data.name}
        symbol-type="image"
        source={getImage(item.data.name)}
      />
    );
  };

  const renderLegendSection = (section: LegendSectionTemplateContext) => {
    return <oj-legend-section text={section.data.name} />;
  };

  const tooltipFunction = (dataContext: ojPictoChart.TooltipContext<string>) => {
    const tooltipElem = document.createElement('div');
    (dataContext.parentElement as HTMLElement).style.borderWidth = '4px';

    render(
      <div class="oj-sm-padding-2x" style={{ minWidth: '150px' }}>
        <div class="oj-typography-bold">{dataContext.name}</div>
        <div>{dataContext.count},000 units</div>
        <div>Rating: {getRatingValue(dataContext.name as ProductName)} / 5</div>
      </div>,
      tooltipElem
    );

    return { insert: tooltipElem };
  };

  const pictoChartProps = { 'tooltip.renderer': tooltipFunction };

  return (
    <div id="chart-container">
      <div class="oj-typography-bold oj-sm-margin-2x-vertical">
        Apple Product Sales and Ratings (2015-Q1)
      </div>
      <div class="oj-flex oj-sm-flex-items-initial">
        <oj-picto-chart
          id="pictochart1"
          column-count="10"
          data={dataProvider}
          animation-on-data-change="auto"
          class="oj-flex-item oj-sm-margin-4x-end"
          {...pictoChartProps}
        >
          <template slot="itemTemplate" render={renderPictoItem} />
        </oj-picto-chart>
        <oj-legend
          id="legend"
          orientation="vertical"
          data={legendDataProvider}
          symbol-width="20"
          class="oj-flex-item"
        >
          <template slot="itemTemplate" render={renderLegendItem} />
          <template slot="sectionTemplate" render={renderLegendSection} />
        </oj-legend>
      </div>
    </div>
  );
};

export default PictoChartTooltip;
