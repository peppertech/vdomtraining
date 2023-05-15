import Table from "./table";
import Treeview from "./treeview";
import ListView from "./listview";
import DataGrid from "./datagrid";
import { h } from "preact";

const Collection = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
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
          <h2 class="oj-typography-heading-sm"> Treeview </h2>
          <Treeview />
        </div>
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> DataGrid </h2>
          <DataGrid />
        </div>
      </div>
    </div>
  );
};
export default Collection;
