import { h, Component, ComponentChild } from "preact";
import { FormElements } from "./formelements";
import { Chart } from "./chart";
import { Table } from "./table";
import { Treeview } from "./treeview";
import { ListView } from "./listview";
import { Legend } from "./legend";
import { DataGrid } from "./datagrid";

export class ExampleContent extends Component {
  render(): ComponentChild {
    return (
      <div class="oj-web-applayout-max-width oj-web-applayout-content">
        <h1 class="oj-typography-heading-lg"> Examples </h1>
        <hr />
        <div class="oj-flex">
          <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
            <h3 class="oj-typography-heading-xs"> Table </h3>
            <Table />
          </div>
          <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
            <h3 class="oj-typography-heading-xs"> ListView </h3>
            <ListView />
          </div>
          <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
            <h3 class="oj-typography-heading-xs"> Form Elements </h3>
            <FormElements />
          </div>
          <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
            <h3 class="oj-typography-heading-xs"> Chart </h3>
            <Chart />
          </div>
          <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
            <h3 class="oj-typography-heading-xs"> Treeview </h3>
            <Treeview />
          </div>
          <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
            <h3 class="oj-typography-heading-xs"> Standalone Legend </h3>
            <Legend />
          </div>
          <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
            <h3 class="oj-typography-heading-xs"> DataGrid </h3>
            <DataGrid />
          </div>
        </div>
      </div>
    );
  }
}
