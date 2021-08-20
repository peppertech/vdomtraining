import { h, FunctionalComponent, ComponentProps } from "preact";
import "ojs/ojchart";
import { ojChart } from "ojs/ojchart";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import * as data from "text!./basicData.json";

type chartItem = {
  id: number;
  series: string;
  group: string;
  value: number;
};

type ChartProps = ComponentProps<"oj-chart">;
const xaxisConfig: ChartProps["xAxis"] = {
  tickLabel: { rotation: "auto", rendered: "on" }
};

const dataProvider: MutableArrayDataProvider<chartItem["id"], chartItem> =
  new MutableArrayDataProvider(JSON.parse(data), {
    keyAttributes: "id"
  });

// should be using type of :ojChart.ItemTemplateContext<IchartItem['id'],IchartItem>
// waiting on bug fix JET-45437
const renderChartItem = (item) => {
  return (
    <oj-chart-item
      value={item.data.value}
      groupId={[item.data.group]}
      seriesId={item.data.series}></oj-chart-item>
  );
};

export const Chart: FunctionalComponent = () => {
  return (
    <div class="oj-md-margin-4x-horizontal">
      <oj-chart
        aria-label="sample bar chart"
        id="barChart"
        type="bar"
        orientation="vertical"
        stack="off"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        hoverBehavior="dim"
        hideAndShowBehavior="withRescale"
        xAxis={xaxisConfig}
        class="chart-sizing">
        <template slot="itemTemplate" render={renderChartItem}></template>
      </oj-chart>
    </div>
  );
};
