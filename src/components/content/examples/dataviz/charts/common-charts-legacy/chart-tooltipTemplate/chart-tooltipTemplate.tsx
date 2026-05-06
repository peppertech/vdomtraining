import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/departmentHiresData.json';
import 'ojs/ojchart';
import 'ojs/ojgauge';

import ArrayDataProvider = require('ojs/ojarraydataprovider');
import "css!./demo.css";

const data = JSON.parse(dataText as string);

export const ChartTooltipTemplate = () => {
  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), []);

    const itemTemplateRenderer = (item: any) => {
    return <oj-chart-item groupId={[item.data.season]} seriesId={item.data.department} value={item.data.value}/>;
};
  const tooltipTemplateRenderer = ($current: any) => {
    return <div class="oj-flex">
                                              <div class="oj-flex-item">
                                                              <span><b>{$current.group}</b></span>
                                                              <br />
                                                              <span>{'Supervisor: ' + $current.itemData.supervisor}</span>
                                                              <br />
                                                              <span><i>{$current.series}</i></span>
                                                          </div>
                                              <oj-status-meter-gauge class="oj-flex-item demo-status-meter-gauge" id="gauge" min={0} max={Number($current.itemData.totalDeptHires)} value={Number($current.value)} orientation="circular" color={$current.color} readonly aria-label="status meter gauge showing department wise new hires in tooltip"/>
                                          </div>;
};

return (
      <div id="chart-container">
            <h5>New Hires Per Department</h5>
            <oj-chart id="barChart" type="bar" data={dataProvider} aria-label="bar chart with five series over two groups">
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                    <template slot="tooltipTemplate" render={tooltipTemplateRenderer} />
                </oj-chart>
        </div>
    );
};

export default ChartTooltipTemplate;

