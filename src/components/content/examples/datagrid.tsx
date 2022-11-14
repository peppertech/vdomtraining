import { h, FunctionalComponent, ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojdatagrid";
import "ojs/ojmenu";
import { ojDataGrid } from "ojs/ojdatagrid";
import * as popData from "text!./population.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { RowDataGridProvider } from "ojs/ojrowdatagridprovider";
import {Item} from "ojs/ojdataprovider";

type States = {
  states: string;
  [propName: string]: number | string;
};

const populationData = JSON.parse(popData);
const mutableArrayDataProvider = new MutableArrayDataProvider<string, States>(
  populationData
);
const getColumnHeaderStyle = (headerContext) => {
  if (headerContext.index === 0) {
    return 'width: 165px;';
  }
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

const getAlignmentClassNameByIndex = (index: number) => {
  if (index === 0) {
    return 'oj-sm-justify-content-flex-start oj-sm-text-align-start';
  }
};

type DataGridProps = ComponentProps<"oj-data-grid">;


const cellStyle: DataGridProps["cell"] = {
  className: getCellClassName
}

// typing is a bit messed up here.  To many required properties. Need to file a bug for this.
const headerStyle: DataGridProps["header"] = {
  column:{
    style: getColumnHeaderStyle,
    className:getColumnHeaderClassName,
    resizable:{
      height:'disable'
    },
    label:{}
  },
  columnEnd:{
    label:{},
    resizable:{
      height:'disable'
    }
  },
  row:{
    label:{},
    resizable:{
      width:'disable'
    }
  },
  rowEnd:{
    label:{},
    resizable:{
      width:'disable'
    }
  }
}


let columns:any;

const dataGridDP = new RowDataGridProvider<string | number, string, States>(
  mutableArrayDataProvider,
  {
    columns: {
      databody: (item: Item<string, States>) => {
        // Show States First
        let keys = Object.keys(item.data);
        keys.splice(keys.indexOf("states"), 1);
        keys.unshift("states");
        columns = keys;
        return keys;
      },
    },
    columnHeaders: {
      column: () => {
        let returnVal = columns.slice();
        returnVal[0] = "States";
        return returnVal;
      }
    }
  }
);

export const DataGrid: FunctionalComponent = () => {
  const [dataGridProvider, setDataGridProvider] = useState(dataGridDP);


  return (
    <div class="oj-md-margin-4x-horizontal">
      <oj-data-grid
        id="datagrid"
        class="demo-data-grid"
        aria-label="Data Grid Layout Demo" 
        header={headerStyle}
        cell={cellStyle}
        data={dataGridProvider}></oj-data-grid>
    </div>
  );
};
