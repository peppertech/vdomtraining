import Chart from "./chart";
import { DrillChart } from "./chart-drill";
import Legend from "./legend";
import { h } from "preact";

const DataViz = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-flex oj-sm-flex-items-1">
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
          <h2 class="oj-typography-heading-sm"> Chart </h2>
          <Chart />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
          <h2 class="oj-typography-heading-sm"> Standalone Legend </h2>
          <Legend />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
          <h2 class="oj-typography-heading-sm"> Drillable Chart </h2>
          <DrillChart />
        </div>
      </div>
    </div>
  );
};
export default DataViz;
