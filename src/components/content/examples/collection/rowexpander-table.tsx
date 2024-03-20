import { ComponentProps } from "preact";
import "ojs/ojrowexpander";
import "ojs/ojtable";
import { ojTable } from "ojs/ojtable";
import * as jsonDataStr from "text!./data/projectData.json";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import FlattenedTreeDataProviderView = require("ojs/ojflattenedtreedataproviderview");

type TableRow = {
  id: string;
  name: string;
  resource: string;
  start: string;
  end: string;
};

type TableProps = ComponentProps<"oj-table">;

const setSelectionMode: TableProps["selectionMode"] = {
  row: "single",
  column: "none",
};

export const RowExpanderTable = () => {
  const arrayTreeDataProvider = new FlattenedTreeDataProviderView(
    new MutableArrayTreeDataProvider(JSON.parse(jsonDataStr), "id", {
      keyAttributeScope: "global",
    })
  );

  const columns = [
    {
      headerText: "Task Name",
      sortProperty: "name",
      weight: 2,
      minWidth: "13rem",
      id: "name",
    },
    {
      headerText: "Resource",
      sortProperty: "resource",
      minWidth: "9rem",
      id: "resource",
    },
    {
      headerText: "Start Date",
      sortProperty: "start",
      minWidth: "8rem",
      id: "start",
    },
    {
      headerText: "End Date",
      sortProperty: "end",
      minWidth: "8rem",
      id: "end",
    },
  ];

  const rowTemplate = (
    row: ojTable.RowTemplateContext<TableRow["id"], TableRow>
  ) => {
    return (
      <tr>
        <td>
          <oj-row-expander
            data-oj-clickthrough={"disabled"}
            context={row}
          ></oj-row-expander>
          <span>{row.item.data.name}</span>
        </td>
        <td>
          <span>{row.item.data.resource}</span>
        </td>
        <td>
          <span>{row.item.data.start}</span>
        </td>
        <td>
          <span>{row.item.data.end}</span>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <oj-table
        id="table"
        aria-label="Project tasks"
        selectionMode={setSelectionMode}
        data={arrayTreeDataProvider}
        columns={columns}
        class="table-sizing"
      >
        <template slot="rowTemplate" render={rowTemplate} />
      </oj-table>
    </div>
  );
};
