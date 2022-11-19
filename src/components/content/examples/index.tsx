import { h } from "preact";
import FormElements from "./formelements";
import Chart from "./chart";
import Table from "./table";
import Treeview from "./treeview";
import ListView from "./listview";
import Legend from "./legend";
import DataGrid from "./datagrid";

const ExampleContent = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h1 class="oj-typography-heading-lg"> Examples </h1>
      <hr />
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> Table </h2>
          <Table />
        </div>
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> ListView </h2>
          <ListView />
        </div>
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> Form Elements </h2>
          <FormElements />
        </div>
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> Chart </h2>
          <Chart />
        </div>
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> Treeview </h2>
          <Treeview />
        </div>
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> Standalone Legend </h2>
          <Legend />
        </div>
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> DataGrid </h2>
          <DataGrid />
        </div>
      </div>
    </div>
  );
};
export default ExampleContent;
