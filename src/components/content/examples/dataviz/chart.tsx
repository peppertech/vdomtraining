import { ComponentProps } from "preact";
import "ojs/ojchart";
import { ojChart } from "ojs/ojchart";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import data from "text!./data/basicData.json";
// import * as data from "text!./data/basicData.json";
import { useCallback } from "preact/hooks";

type chartItem = {
  id: number;
  series: string;
  group: string;
  value: number;
};

type ChartProps = ComponentProps<"oj-chart">;
const xaxisConfig: ChartProps["xAxis"] = {
  tickLabel: { rotation: "auto", rendered: "on" },
};

const dataProvider: MutableArrayDataProvider<chartItem["id"], chartItem> =
  new MutableArrayDataProvider(JSON.parse(data), {
  // new MutableArrayDataProvider(JSON.parse(data), {
    keyAttributes: "id",
  });

const renderChartItem = (
  item: ojChart.ItemTemplateContext<chartItem["id"], chartItem>
) => {
  return (
    <oj-chart-item
      value={item.data.value}
      groupId={[item.data.group]}
      seriesId={item.data.series}></oj-chart-item>
  );
};

const selectionChangedHandler = (item:any)=>{
  console.log("I'm in the selection changed event handler: ", item.detail.selectionData[0].itemData)
}

const Chart = () => {
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
        selectionMode="single"
        onselectionChanged={selectionChangedHandler}
        class="chart-sizing">
        <template slot="itemTemplate" render={renderChartItem}></template>
      </oj-chart>
    </div>
  );
};
export default Chart;
