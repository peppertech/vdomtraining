import Chart from "./chart";
import { DrillChart } from "./chart-drill";
import GanttOverview from "./gantt-overview";
import Legend from "./legend";
import MeterCircle from "./meter-circle";
import RatingGaugeComp from "./rating-gauge";
import "preact";
import { LSChart } from "./test1";

const DataViz = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-flex oj-sm-flex-items-1">
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md">
          <h2 class="oj-typography-heading-sm"> Chart </h2>
          <Chart />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-sm">
          <h2 class="oj-typography-heading-sm"> Standalone Legend </h2>
          <Legend />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md">
          <h2 class="oj-typography-heading-sm"> Drillable Chart </h2>
          <DrillChart />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md">
          <h2 class="oj-typography-heading-sm"> Rating Gauge (CorePack) </h2>
          <RatingGaugeComp/>
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md">
          <h2 class="oj-typography-heading-sm"> Rating Gauge (CorePack) </h2>
          <MeterCircle cpuCores={8} metricName="Testing" />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md">
          <h2 class="oj-typography-heading-sm"> Gantt </h2>
          <GanttOverview />
        </div>
      </div>
    </div>
  );
};
export default DataViz;
