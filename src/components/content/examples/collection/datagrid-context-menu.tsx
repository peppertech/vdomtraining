import { ComponentProps } from "preact";
import { useRef, useState, useEffect } from "preact/hooks";
import "ojs/ojdatagrid";
import "ojs/ojbutton";
import "ojs/ojtoolbar";
import "ojs/ojmenu";
import { ojMenu } from "ojs/ojmenu";
import { ojDataGrid } from "ojs/ojdatagrid";
import popData from "text!./data/population.json";
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

// Return an alignment class based on column index
//  - First column (state names) → start aligned (text)
//  - Other columns (years/numbers) → end aligned (numeric)
const getAlignmentClassNameByIndex = (index: number): string | undefined => {
  if (index === 0) return "oj-helper-text-align-start";
  if (index > 0) return "oj-helper-text-align-end";
  return undefined;
};

type DataGridProps = ComponentProps<"oj-data-grid">;

const cellStyle: DataGridProps["cell"] = {
  className: getCellClassName,
};

const numberConverter = new IntlNumberConverter({ useGrouping: true });

const headerStyle: DataGridProps["header"] = {
  column: {
    className: getColumnHeaderClassName,
    hidable: "disable",
    resizable: {
      // Columns resize horizontally → width
      width: "enable",
    },
    label: {},
  },
  columnEnd: {
    label: {},
    resizable: {
      // Columns resize horizontally → width
      width: "disable",
    },
  },
  row: {
    label: {},
    hidable: "disable",
    style: "width:165px",
    resizable: {
      // Rows resize vertically → height
      height: "enable",
    },
  },
  rowEnd: {
    label: {},
    resizable: {
      // Rows resize vertically → height
      height: "disable",
    },
  },
};

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
  }
);
const cellRenderer = (cell: ojDataGrid.CellTemplateContext<States>) => {
  return <span>{numberConverter.format(cell.item.data.data as number)}</span>;
};

type MenuItem = {
  id: string,
  label?: string,
  value: string,
  iconClass?: string,
  children?: Array<MenuItem>,
  command?: string
}
const initMenuItems: Array<MenuItem> = [
  { id: "myFirstItem", label: "My First Item", value: "My First Item" },
  {
    id: "myOtherItem", label: "My Other Item", value: "My Other Item", children: [
      { id: "inbox", label: "Inbox", value: "Inbox", iconClass: 'oj-ux-ico-inbox' },
      { id: "archive", label: "Archive", value: "Archive", iconClass: 'oj-ux-ico-archive' },
    ]
  },
  { id: "resizeWidth", value: "Resize Width", command: "oj-datagrid-resizeWidth" }
]

const DataGridContextMenu = () => {
  const menuRef = useRef<ojMenu>(null);
  const [menuItems, setMenuItems] = useState<Array<MenuItem>>(initMenuItems)
  const changePopulation = () => {
    let tempData = Object.assign([], populationData);
    tempData.unshift({
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
    });
    mutableArrayDataProvider.data = tempData;
  };

  const resetPopulation = () => {
    mutableArrayDataProvider.data = populationData;
  };

  useEffect(() => {
    // Log and optionally refresh the JET menu after menuItems change
    console.log("menuItems changed:", menuItems);
    (menuRef.current as ojMenu)?.refresh?.();
  }, [menuItems])

  const myActionFunction = (e: ojMenu.ojMenuAction) => {
    console.log("menuAction called: ", e.detail.selectedValue);
  }

  const myBeforeOpenFunction = (e: ojMenu.ojBeforeOpen) => {
    let tempArray = [...initMenuItems];
    const launcher = e.detail?.openOptions?.launcher;
    // Guard: launcher may be undefined or a string selector
    if (!launcher || typeof launcher === "string") return;
    tempArray.push({
      id: "new_item",
      label: "New Item",
      value: "New Item",
      children: [{
        id: "new_subitem",
        label: "New Sub Item",
        value: "New Sub Item",
        iconClass: "oj-ux-ico-truck"
      }]
    },
      {
        id: "resizeHeight",
        value: "Resize Height",
        command: "oj-datagrid-resizeHeight"
      })
    setMenuItems(tempArray);
    // refresh of the menu handled in useEffect after menuItems updated.

    // Launcher is an Element. Oracle JET attaches a non-standard expando
    // 'data-oj-cellContext' on the launcher for DataGrid context menus.
    const el = launcher as HTMLElement & { [key: string]: unknown };
    let cellCtx: any = (el as any)[0]["data-oj-cellContext"];

    const state: string | undefined = cellCtx?.metadata?.rowItem?.data?.states;
    if (state) {
      console.log("beforeOpen called: ", state);
    }
  };


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
        data={dataDP}>
        <template slot="cellTemplate" render={cellRenderer} />
        <oj-menu
          ref={menuRef}
          slot="contextMenu"
          onojMenuAction={myActionFunction}
          onojBeforeOpen={myBeforeOpenFunction}
          aria-label="Employee Edit">
          {menuItems.map((item) => (
            <oj-option
              id={item.id}
              value={item.value}
              data-oj-command={item.command}
            >
              {item.iconClass && (
                <span class={item.iconClass} slot="startIcon" />
              )}
              {item.label}
              {item.children && (
                <oj-menu id="zoom_menu" aria-label="menu with actions">
                  {item.children.map((subItem) => (
                    <oj-option id={subItem.id} value={subItem.value}>
                      {subItem.iconClass && (
                        <span class={subItem.iconClass} slot="startIcon" />
                      )}
                      {subItem.label}
                    </oj-option>
                  ))}
                </oj-menu>
              )}
            </oj-option>
          ))}
        </oj-menu>
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
export default DataGridContextMenu;
