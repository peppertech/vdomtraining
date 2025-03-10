import Table from "./table";
import TableWithFormEdit from "./table-form-edit";
import GroupByTable from "./group-by-table";
import Treeview from "./treeview";
import ListView from "./listview";
import DataGrid from "./datagrid";
import CardView from "./cardview";
import { RowExpanderTable } from "./rowexpander-table";
import { Content } from "./test1";
import "preact";

const Collection = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-flex oj-sm-flex-items-1">
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-xl">
          <h2 class="oj-typography-heading-sm"> Table </h2>
          <Table />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-xl">
          <h2 class="oj-typography-heading-sm"> Table With Form Edit </h2>
          <TableWithFormEdit />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-lg">
          <h2 class="oj-typography-heading-sm"> ListView </h2>
          <ListView />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md">
          <h2 class="oj-typography-heading-sm"> Treeview </h2>
          <Treeview />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-xl">
          <h2 class="oj-typography-heading-sm"> DataGrid </h2>
          <DataGrid />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-xl">
          <h2 class="oj-typography-heading-sm"> Group By Table </h2>
          <GroupByTable />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-xl">
          <h2 class="oj-typography-heading-sm"> Row Expander Table </h2>
          <RowExpanderTable />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-xl">
          <h2 class="oj-typography-heading-sm"> Card View </h2>
          <CardView />
        </div>
        {/* <Content/> */}
      </div>
    </div>
  );
};
export default Collection;
