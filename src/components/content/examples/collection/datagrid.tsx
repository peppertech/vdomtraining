import { h, ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojdatagrid";
import "ojs/ojbutton";
import "ojs/ojtoolbar";
import { ojDataGrid } from "ojs/ojdatagrid";
import * as popData from "text!./data/population.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { RowDataGridProvider } from "ojs/ojrowdatagridprovider";
import { IntlNumberConverter } from "ojs/ojconverter-number";

type States = {
  states: string;
  [propName: string]: number | string;
};

type SortState = {
  key: string;
  direction: "ascending" | "descending";
} | null;

const populationData = JSON.parse(popData) as States[];
const FREE_STATE: States = {
  states: "FreeState",
  "2000": 5160586,
  "2001": 5273477,
  "2002": 5396255,
  "2003": 5510364,
  "2004": 5652404,
  "2005": 5839077,
  "2006": 6029141,
  "2007": 6167681,
  "2008": 6280362,
  "2009": 6343154,
  "2010": 6407342,
  "2011": 6473416,
  "2012": 6556344,
  "2013": 6634690,
  "2014": 6732873,
  "2015": 6832810,
  "2016": 6944767,
  "2017": 7048088,
  "2018": 7164228,
  "2019": 7291843,
  "2020": 7421401,
};

const clonePopulationData = () => populationData.map((entry) => ({ ...entry }));

const sortRows = (rows: States[], sortState: SortState) => {
  if (sortState == null) {
    return rows;
  }

  return [...rows].sort((left, right) => {
    const leftValue = left[sortState.key];
    const rightValue = right[sortState.key];

    if (typeof leftValue === "number" && typeof rightValue === "number") {
      return sortState.direction === "ascending"
        ? leftValue - rightValue
        : rightValue - leftValue;
    }

    const comparison = String(leftValue).localeCompare(String(rightValue));
    return sortState.direction === "ascending" ? comparison : -comparison;
  });
};

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
    sortable: "enable",
    resizable: {
      width: "enable",
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
      width: "enable",
      height: "enable",
    },
  },
  rowEnd: {
    label: {},
    resizable: {
      width: "enable",
      height: "enable",
    },
  },
};
const cellRenderer = (cell: ojDataGrid.CellTemplateContext<States>) => {
  return <span>{numberConverter.format(cell.item.data.data as number)}</span>;
};

const DataGrid = () => {
  const [rows, setRows] = useState<States[]>(() => clonePopulationData());
  const [sortState, setSortState] = useState<SortState>(null);

  const mutableArrayDataProvider = new MutableArrayDataProvider<string, States>(
    rows,
    {
      keyAttributes: "states",
    }
  );

  const dataDP = new RowDataGridProvider<string | number, string, States>(
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
      itemMetadata: {
        columnHeader: (item) => ({
          sortDirection:
            String(item.data.data) === sortState?.key
              ? sortState.direction
              : "unsorted",
        }),
      },
    }
  );

  const changePopulation = () => {
    setRows((currentRows) => {
      const nextRows = currentRows.some((row) => row.states === FREE_STATE.states)
        ? currentRows
        : [FREE_STATE, ...currentRows];
      return sortRows(nextRows, sortState);
    });
  };

  const resetPopulation = () => {
    setSortState(null);
    setRows(clonePopulationData());
  };

  const handleSortRequest = (
    event: ojDataGrid.ojSortRequest<{ data: string | number }>
  ) => {
    const nextSortState = {
      key: String(event.detail.item.data.data),
      direction: event.detail.direction,
    } satisfies NonNullable<SortState>;

    setSortState(nextSortState);
    setRows((currentRows) => sortRows(currentRows, nextSortState));
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      
      <oj-data-grid
        id="datagrid"
        class="demo-data-grid"
        aria-labelledby="dataGridLabel"
        header={headerStyle}
        cell={cellStyle}
        data={dataDP}
        onojSortRequest={handleSortRequest}>
        <template slot="cellTemplate" render={cellRenderer} />
      </oj-data-grid>
      <oj-toolbar>
        <oj-button
          onojAction={changePopulation}
          label="Add new State"></oj-button>
        <oj-button onojAction={resetPopulation} label="Reset"></oj-button>
      </oj-toolbar>
    </div>
  );
};

export default DataGrid;
