import { ComponentProps } from "preact";
import { useRef } from "preact/hooks";
import "ojs/ojchart";
import { ojChart } from "ojs/ojchart";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
//import * as data from "text!./data/basicData.json";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import Converter = require("ojs/ojconverter");

type chartItem = {
  id: number;
  series: string;
  group: string;
  value: number;
};

const data = [
  {
    "id": 0,
    "series": "Success",
    "group": "x",
    "value": 100000000
  },
  {
    "id": 1,
    "series": "Error",
    "group": "x",
    "value": 10
  }
]


const numberConverter = new IntlNumberConverter({
  style: "percent",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
}) as unknown as Converter<string>;

type ChartProps = ComponentProps<"oj-chart">;
const xaxisConfig: ChartProps["xAxis"] = {
  tickLabel: { rotation: "auto", rendered: "on" },
};
const valueFormatOptions: ChartProps['valueFormats'] = {
  label: { converter: numberConverter }
}
const legendOptions: ChartProps['legend'] = {
  rendered: "auto"
}



const dataProvider: MutableArrayDataProvider<chartItem["id"], chartItem> =
  new MutableArrayDataProvider(data, {
    keyAttributes: "id",
  });
// const dataProvider: MutableArrayDataProvider<chartItem["id"], chartItem> =
//   new MutableArrayDataProvider(JSON.parse(data), {
//     keyAttributes: "id",
//   });

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




const hiddenCategoriesChanged = () => { }

const renderChartSeries = (item: ojChart.ItemTemplateContext<chartItem["id"], chartItem>) => {
  return (
    <oj-chart-item
      value={item.data.value}
      groupId={[item.data.group]}
      seriesId={item.data.series}></oj-chart-item>
  )
}
const getPieChartToolTip = (context: any) => {
  return `Series:\t${context.series}\nValue: ${context.value}`;
}

const renderPieChartItem = (item: ojChart.ItemTemplateContext<chartItem["id"], chartItem>) => {
  return (
    <oj-chart-item
      drilling="on"
      value={item.data.value}
      shortDesc={getPieChartToolTip}
      groupId={[item.data.group]}
      seriesId={item.data.series}
      labelStyle={{ fontSize: "10px" }}></oj-chart-item>
  )
}

const webServerTrafficAverageLatency = "Something"

const ChartTest1 = () => {

  const pieChartref = useRef(null)

  return (
    <div class="oj-md-margin-4x-horizontal">
      <div class="oj-flex oj-sm-justify-content-center oj-sm-flex-direction-column">
        <div class="oj-flex-item oj-typography-body-lg oj-typography-bold ">Web Server</div>
        <div class="oj-flex-item oj-typography-body-md oj-helper-margin-bottom-md" >
          <span> Total Average Latency :  {webServerTrafficAverageLatency} ms</span>
        </div>
      </div>
      <oj-chart
        id="pieChartWeb"
        aria-label="Service Health Metrics Overall Performance graph"
        type="pie"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        hoverBehavior="dim"
        hideAndShowBehavior="withRescale"
        ref={pieChartref}
        class="chart-sizing"
        legend={legendOptions}
        valueFormats={valueFormatOptions}
        onhiddenCategoriesChanged={hiddenCategoriesChanged}
      >
        <template slot="itemTemplate" data-oj-as="series" render={renderPieChartItem}></template>
      </oj-chart>
    </div>
  );
};
export default ChartTest1;


// <oj-chart
//   id="pieChartWeb"
//   aria-label="Service Health Metrics Overall Performance graph"
//   type="pie"
//   data={webPiedataProvider.current}
//   animationOnDisplay="auto"
//   animationOnDataChange="auto"
//   hoverBehavior="dim"
//   ref={pieChartref}
//   class="chart-sizing"
//   legend={{
//     rendered: "off"
//   }}
//   valueFormats={{
//     label: {
//       converter: numberConverter
//     }
//   }}
//   onhiddenCategoriesChanged={hiddenCategoriesChanged}
// >
//   <template slot="itemTemplate" render={renderPieChartItem}></template>
//   <div class="oj-flex oj-sm-justify-content-center oj-sm-flex-direction-column">
//     <div class="oj-flex-item oj-typography-body-lg oj-typography-bold ">Web Server</div>
//     <div class="oj-flex-item oj-typography-body-md oj-helper-margin-bottom-md" >
//       <span> Total Average Latency :  {webServerTrafficAverageLatency} ms</span>
//     </div>
//   </div>
//   <template slot="seriesTemplate" data-oj-as="series" render={renderChartSeries}></template>
// </oj-chart>
