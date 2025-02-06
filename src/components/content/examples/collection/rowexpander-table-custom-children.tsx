import { ComponentProps } from "preact";
import { useCallback } from "preact/hooks";
import "ojs/ojrowexpander";
import "ojs/ojtable";
import { ojTable } from "ojs/ojtable";
import * as jsonDataStr from "text!./data/projectData.json";
import * as jsonPeopleStr from "text!./data/peopleData.json";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import FlattenedTreeDataProviderView = require("ojs/ojflattenedtreedataproviderview");

type TableRow = {
  id: string;
  name: string;
  resource: string;
  start: string;
  end: string;
  children?: Array<TableRow>;
  detail?: string;
};

type TableProps = ComponentProps<"oj-table">;

const setSelectionMode: TableProps["selectionMode"] = {
  row: "single",
  column: "none",
};

export const RowExpanderCustomTable = () => {
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

  const childRender = useCallback(
    (row: ojTable.RowTemplateContext<TableRow["id"], TableRow>) => {
      const childData = JSON.parse(jsonPeopleStr); //await (await fetch(jsonPeopleStr)).json();
      const currentRowName = row.item.data.id.slice(1, 2);
      return (
        <tr>
          {/* @ts-ignore */}
          <td colspan={1} style="padding-left:4rem">
            <div style="color:red">{row.item.data.name}</div>
          </td>
          {/* @ts-ignore */}
          <td colspan={3} style="padding-left:4rem">
            <div style="color:red">{childData[currentRowName].name}</div>
            <div style="color:purple">
              {childData[currentRowName].department}
            </div>
          </td>
        </tr>
      );
    },
    []
  );

  const rowTemplate = (
    row: ojTable.RowTemplateContext<TableRow["id"], TableRow>
  ) => {
    return (
      <>
        {row.item.metadata.treeDepth === 0 && (
          <tr>
            <td>
              <oj-row-expander
                context={row}
                data-oj-clickthrough={"disabled"}
                //onojExpand={childRender}
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
        )}
        {row.item.metadata.treeDepth === 1 && childRender(row)}
      </>
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
