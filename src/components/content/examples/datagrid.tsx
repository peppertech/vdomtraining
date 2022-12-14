import { h, ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojdatagrid";
import { ojDataGrid } from "ojs/ojdatagrid";
import * as popData from "text!./population.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { RowDataGridProvider } from "ojs/ojrowdatagridprovider";
import { IntlNumberConverter } from "ojs/ojconverter-number";

type States = {
  states: string;
  [propName: string]: number | string;
};

const populationData = JSON.parse(popData);
const mutableArrayDataProvider = new MutableArrayDataProvider<string, States>(
  populationData
);

const getColumnHeaderClassName = (
  headerContext: ojDataGrid.HeaderContext<number, string | number>
) => {
  return getAlignmentClassNameByIndex(headerContext.index);
};
const getCellClassName = (
  cellContext: ojDataGrid.CellContext<number, string | number>
) => {
  return getAlignmentClassNameByIndex(cellContext.indexes.column);
};

const getAlignmentClassNameByIndex = (index: number) => {};

type DataGridProps = ComponentProps<"oj-data-grid">;

const cellStyle: DataGridProps["cell"] = {
  className: getCellClassName,
};

const numberConverter = new IntlNumberConverter({ useGrouping: true });

// typing is a bit messed up here.  To many required properties. Need to file a bug for this.
const headerStyle: DataGridProps["header"] = {
  column: {
    className: getColumnHeaderClassName,
    resizable: {
      height: "disable",
    },
    label: {},
  },
  columnEnd: {
    label: {},
    resizable: {
      height: "disable",
    },
  },
  row: {
    label: {},
    style: "width:165px",
    resizable: {
      width: "disable",
    },
  },
  rowEnd: {
    label: {},
    resizable: {
      width: "disable",
    },
  },
};

const dataGridDP = new RowDataGridProvider<string | number, string, States>(
  mutableArrayDataProvider,
  {
    columns: {
      rowHeader: ["states"],
    },
    columnHeaders: {
      column: "attributeName",
    },
    headerLabels: {
      column: ["Years"],
      row: ["States"],
    },
  }
);

const cellRenderer = (cell: ojDataGrid.CellTemplateContext<States>) => {
  return <span>{numberConverter.format(cell.item.data.data as number)}</span>;
};

const DataGrid = () => {
  const [dataGridProvider, setDataGridProvider] = useState(dataGridDP);

  return (
    <div class="oj-md-margin-4x-horizontal">
      <h3 id="dataGridLabel" class="oj-typography-heading-xs">
        State Population by Year
      </h3>
      <oj-data-grid
        id="datagrid"
        class="demo-data-grid"
        aria-labelledby="dataGridLabel"
        header={headerStyle}
        cell={cellStyle}
        data={dataGridProvider}>
        <template slot="cellTemplate" render={cellRenderer} />
      </oj-data-grid>
    </div>
  );
};
export default DataGrid;
