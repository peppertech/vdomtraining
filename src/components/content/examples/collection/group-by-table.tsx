import { ComponentProps } from "preact";
import "ojs/ojtable";
import { ojTable } from "ojs/ojtable";
import { Item } from "ojs/ojdataprovider";
import "ojs/ojrowexpander";
import * as groupData from "text!./data/groupdata.json";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import FlattenedTreeDataProviderView = require("ojs/ojflattenedtreedataproviderview");
import { KeySetImpl } from "ojs/ojkeyset";

type Dept = {
  probability?: string;
  description?: string;
  id: string;
  account?: string;
  salesstage: string;
  amount?: number;
  paymentdate?: string;
  children?: object;
  count?: number;
  accText?: string;
};

type TableProps = ComponentProps<"oj-table">;

const dataArray = JSON.parse(groupData);

const setSelectionMode: TableProps["selectionMode"] = {
  row: "multiple",
  column: "multiple",
};
const setScrollPolicy: TableProps["scrollPolicyOptions"] = {
  fetchSize: 10,
  maxCount: 500,
};

const columnsDef: TableProps["columns"] = [
  {
    headerText: "Probability",
    id: "probability",
    field: "probability",
  },
  {
    headerText: "Description",
    id: "description",
    field: "description",
  },
  {
    headerText: "Account",
    id: "account",
    field: "account",
  },
  {
    headerText: "Sales Stage",
    id: "salesStage",
    field: "salesstage",
  },
  {
    headerText: "Amount",
    headerClassName: "oj-helper-text-align-end",
    className: "oj-helper-text-align-end",
    id: "amount",
    field: "amount",
  },
  {
    headerText: "Payment Date",
    headerClassName: "oj-helper-text-align-end",
    className: "oj-helper-text-align-end",
    id: "paymentDate",
    field: "paymentdate",
  },
];

const dataprovider: MutableArrayTreeDataProvider<Dept["id"], Dept> =
  new MutableArrayTreeDataProvider(dataArray, "id", {
    keyAttributeScope: "global",
  });

const expanded = new KeySetImpl(["3"]);
const flattenedTreeDataProviderView = new FlattenedTreeDataProviderView(
  dataprovider,
  {
    expanded: expanded,
  }
);

const setRowSelectable = (item: Item<Dept["id"], Dept>) => {
  if (item.metadata.treeDepth === 0) {
    return "off";
  }
  return "on";
};

const setRowSticky = (item: Item<Dept["id"], Dept>) => {
  if (item.metadata.treeDepth === 0) {
    return "on";
  }
  return "off";
};

const setRowOptions: TableProps["row"] = {
  selectable: setRowSelectable,
  sticky: setRowSticky,
};

const rowItemTemplate = (row: ojTable.RowTemplateContext<Dept["id"], Dept>) => {
  return (
    <tr>
      {row.item.metadata.treeDepth === 0 && (
        <td
          colSpan={6}
          aria-label={row.item.data.accText}
          class="oj-sm-padding-0-start"
        >
          <div class="oj-flex-bar oj-sm-align-items-center">
            <div class="oj-sm-padding-2x-horizontal">
              <oj-row-expander
                context={row}
                data-oj-clickthrough="disabled"
              ></oj-row-expander>
            </div>
            <div tabIndex={0} class="oj-typography-subheading-xs">
              {row.item.data.salesstage}
            </div>
            <div class="oj-flex-bar-end oj-sm-text-align-end">
              <div tabIndex={0}>
                <span class="oj-typography-body-xs oj-text-color-secondary oj-typography-semi-bold">
                  Results
                </span>
                <div class="oj-sm-margin-0 oj-typography-body-md oj-typography-semi-bold">
                  {row.item.data.count}
                </div>
              </div>
              <div tabIndex={0} class="oj-sm-padding-10x-start">
                <span class="oj-typography-body-xs oj-text-color-secondary oj-typography-semi-bold">
                  Amount
                </span>
                <div class="oj-sm-margin-0 oj-typography-body-md oj-typography-semi-bold">
                  {row.item.data.amount}
                </div>
              </div>
            </div>
          </div>
        </td>
      )}
      {row.item.metadata.treeDepth === 1 && (
        <>
          <td>
            <span>{row.item.data.probability}</span>
          </td>
          <td>
            <span>{row.item.data.description}</span>
          </td>
          <td>
            <span>{row.item.data.account}</span>
          </td>
          <td>
            <span>{row.item.data.salesstage}</span>
          </td>
          <td>
            <span>{row.item.data.amount}</span>
          </td>
          <td>
            <span>{row.item.data.paymentdate}</span>
          </td>
        </>
      )}
    </tr>
  );
};

const GroupByTable = () => {
  return (
    <oj-table
      id="table"
      class="demo-table-container"
      aria-label="Group By Data Demo"
      accessibility={{ rowHeader: "salesStage" }}
      scrollPolicyOptions={setScrollPolicy}
      data={flattenedTreeDataProviderView}
      selectionMode={setSelectionMode}
      row={setRowOptions}
      columns={columnsDef}
    >
      <template slot="rowTemplate" render={rowItemTemplate}></template>
    </oj-table>
  );
};
export default GroupByTable;
