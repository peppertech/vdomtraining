// @ts-nocheck
import { render } from "preact";
import type { ComponentProps } from "preact";
import { useMemo } from "preact/hooks";
import FlattenedTreeDataProviderView = require("ojs/ojflattenedtreedataproviderview");
import ArrayTreeDataProvider = require("ojs/ojarraytreedataprovider");
import * as locationDataText from "text!../../data/cookbook/dataCollections/rowExpanderDataGrid/virtualRowExpander/locations.json";
import * as departmentDataText from "text!../../data/cookbook/dataCollections/rowExpanderDataGrid/virtualRowExpander/departments.json";
import * as employeeDataText from "text!../../data/cookbook/dataCollections/rowExpanderDataGrid/virtualRowExpander/employees.json";
import "ojs/ojrowexpander";
import "ojs/ojdatagrid";
import "css!./demo.css";

type Location = {
  LocationId: number;
  City: string;
  State: string;
};

type Department = {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
};

type Employee = {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  Salary: number;
  DepartmentId: number;
};

type TreeRow = {
  id: string;
  name: string;
  data: string | number;
  children?: TreeRow[];
};

const createRenderer = (factory: any) => (context: any) => {
  const container = document.createElement("div");
  render(factory(context), container);
  return { insert: container };
};

const locations = (JSON.parse(locationDataText as string).Locations ??
  []) as Location[];
const departments = (JSON.parse(departmentDataText as string).Departments ??
  []) as Department[];
const employees = (JSON.parse(employeeDataText as string).Employees ??
  []) as Employee[];

const buildTreeRows = (): TreeRow[] =>
  locations.map((location) => ({
    id: `location-${location.LocationId}`,
    name: location.City,
    data: location.State,
    children: departments
      .filter((department) => department.LocationId === location.LocationId)
      .map((department) => ({
        id: `department-${department.DepartmentId}`,
        name: department.DepartmentName,
        data: "Department",
        children: employees
          .filter((employee) => employee.DepartmentId === department.DepartmentId)
          .map((employee) => ({
            id: `employee-${employee.EmployeeId}`,
            name: `${employee.FirstName} ${employee.LastName}`,
            data: employee.Salary,
          })),
      })),
  }));

export const RowExpanderDataGridVirtualRowExpander = () => {
  const dataSource = useMemo(() => {
    const treeDataProvider = new ArrayTreeDataProvider<
      TreeRow["id"],
      TreeRow
    >(buildTreeRows(), {
      keyAttributes: "id",
    });

    return new FlattenedTreeDataProviderView(treeDataProvider);
  }, []);

  const columnHeaderRenderer = createRenderer((context: any) => {
    if (context.key === "id") return <span>Node</span>;
    if (context.key === "name") return <span>Name</span>;
    if (context.key === "data") return <span>Data</span>;
    return <span>{String(context.key)}</span>;
  });

  const cellRenderer = createRenderer((context: any) => (
    <>
      {context.keys?.column === "id" && <oj-row-expander context={context} />}
      <span>{String(context.data ?? "")}</span>
    </>
  ));

  const ojDataGridProps: Partial<ComponentProps<"oj-data-grid">> = {
    selectionMode: {
      cell: "single",
    },
    header: {
      column: {
        renderer: columnHeaderRenderer,
        style: "width:150px;",
        resizable: {
          width: "enable",
        },
      },
    },
    cell: {
      className: "oj-sm-justify-content-flex-start",
      renderer: cellRenderer,
    },
  };

  return (
    <oj-data-grid
      id="datagrid"
      class="demo-rowexpander-virtualrow"
      aria-label="Data Grid with Virtual Collection Row Expander"
      data={dataSource}
      {...ojDataGridProps}
    />
  );
};

export default RowExpanderDataGridVirtualRowExpander;
