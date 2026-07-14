import 'ojs/ojchart';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as chartDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type PyramidChartDatum = {
  id: number;
  series: string;
  group: string;
  value: number;
};

const chartData = JSON.parse(chartDataText as string) as PyramidChartDatum[];

export const PyramidChartLegend = () => {
  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, PyramidChartDatum>(chartData, { keyAttributes: 'id' }),
    []
  );

  const itemTemplateRenderer = (item: { data: PyramidChartDatum }) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series} />
  );

  const seriesTemplateRenderer = () => <oj-chart-series displayInLegend="on" />;

  return (
    <div id="chart-container">
      <oj-chart
        id="pyramidChart"
        type="pyramid"
        data={dataProvider}
        animationOnDataChange="auto"
        hideAndShowBehavior="withoutRescale"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
        <template slot="seriesTemplate" render={seriesTemplateRenderer} />
      </oj-chart>
    </div>
  );
};

export default PyramidChartLegend;
