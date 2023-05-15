import Chart from "./chart";
import Legend from "./legend";
import { h } from "preact";

const DataViz = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> Chart </h2>
          <Chart />
        </div>
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> Standalone Legend </h2>
          <Legend />
        </div>
      </div>
    </div>
  );
};
export default DataViz;
