import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as chartDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import 'ojs/ojchart';

const chartData = JSON.parse(chartDataText as string);

export const FunnelChartLegend = () => {
  const dataProvider = useMemo(() => new ArrayDataProvider(chartData, {
      keyAttributes: 'id'
  }), []);

    const itemTemplateRenderer = ($current: any) => {
      return <oj-chart-item value={$current.data.value} groupId={[$current.data.group]} seriesId={$current.data.series}/>;
  };

  const seriesTemplateRenderer = ($current: any) => {
      return <oj-chart-series displayInLegend="on"/>;
  };

return (
      <div id="chart-container">
            <oj-chart id="funnelChart" type="funnel" data={dataProvider} hideAndShowBehavior="withoutRescale" animationOnDataChange="auto">
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                    <template slot="seriesTemplate" render={seriesTemplateRenderer} />
                </oj-chart>
        </div>
    );
};

export default FunnelChartLegend;

