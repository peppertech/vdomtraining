import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import 'ojs/ojchart';

import ArrayDataProvider = require('ojs/ojarraydataprovider');
import "css!./demo.css";

export const ChartCustomStyling = () => {
  const chartData = useMemo(() => {
      const valueCache: Record<number, number> = {};
      const getValue = (id: number) => {
          if (valueCache[id] != null) {
              return valueCache[id];
          }
          valueCache[id] = 10 + Math.round(Math.random() * 50);
          return valueCache[id];
      };

      return Array.from({ length: 12 }, (_unused: unknown, index: number) => ({
          id: index + 1,
          series: `Series ${index + 1}`,
          group: 'Group 1',
          value: getValue(index + 1)
      }));
  }, []);
  const dataProvider = useMemo(() => new ArrayDataProvider(chartData, {
      keyAttributes: 'id'
  }), [chartData]);

    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
    return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
};
  const itemTemplateRenderer2 = (item: DatavizTemplateContext<DatavizChartDatum>) => {
    return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
};

return (
      <div id="chart-container">
            <div class="oj-flex">
                    <div class="oj-flex-item oj-sm-odd-cols-12 oj-md-odd-cols-6">
                              <h6 class="oj-helper-text-align-center oj-sm-margin-0">Default Colors</h6>
                              <oj-chart id="pieChart" type="pie" data={dataProvider}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer} />
                                      </oj-chart>
                          </div>
                    <div class="oj-flex-item oj-sm-odd-cols-12 oj-md-odd-cols-6">
                              <h6 class="oj-helper-text-align-center oj-sm-margin-0">Custom Colors</h6>
                              <oj-chart class="demo-dvt-color-palette" id="pieChart2" type="pie" data={dataProvider}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer2} />
                                      </oj-chart>
                          </div>
                </div>
        </div>
    );
};

export default ChartCustomStyling;
