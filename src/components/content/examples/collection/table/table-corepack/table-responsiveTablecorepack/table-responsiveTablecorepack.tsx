import "css!./demo.css";
import "oj-c/table";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import type { ComponentProps } from "preact";
import { useEffect,useMemo,useState } from "preact/hooks";
import * as deptData from "text!./departmentData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

interface Department {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
  EmployeeCount: number;
  Type: string;
  Currency: string;
  Rating: number;
  TargetComplete: number;
}

type ColumnKey =
  | "departmentId"
  | "departmentName"
  | "locationId"
  | "managerId"
  | "employeeCount"
  | "type"
  | "currency"
  | "rating"
  | "targetComplete";
type TableColumns = NonNullable<ComponentProps<"oj-c-table">["columns"]>;
type ScreenRange = "sm" | "md" | "lg" | "xl";

const columns: TableColumns = {
  departmentId: {
    field: "DepartmentId",
    headerText: "Department Id"
  },
  departmentName: {
    field: "DepartmentName",
    headerText: "Department Name"
  },
  locationId: {
    field: "LocationId",
    headerText: "Location Id"
  },
  managerId: {
    field: "ManagerId",
    headerText: "Manager Id"
  },
  employeeCount: {
    field: "EmployeeCount",
    headerText: "Employee Count",
    horizontalAlignment: "right"
  },
  type: {
    field: "Type",
    headerText: "Type"
  },
  currency: {
    field: "Currency",
    headerText: "Currency"
  },
  rating: {
    field: "Rating",
    headerText: "Rating",
    horizontalAlignment: "right"
  },
  targetComplete: {
    field: "TargetComplete",
    headerText: "Target Complete",
    horizontalAlignment: "right"
  }
};

const getScreenRange = (): ScreenRange => {
  const xlQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.XL_UP);
  const lgQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);
  const mdQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);

  if (xlQuery && matchMedia(xlQuery).matches) {
    return "xl";
  }
  if (lgQuery && matchMedia(lgQuery).matches) {
    return "lg";
  }
  if (mdQuery && matchMedia(mdQuery).matches) {
    return "md";
  }
  return "sm";
};

const getColumnOrder = (screenRange: ScreenRange): ColumnKey[] => {
  if (screenRange === "xl") {
    return [
      "departmentId",
      "departmentName",
      "locationId",
      "managerId",
      "employeeCount",
      "type",
      "rating",
      "currency",
      "targetComplete"
    ];
  }
  if (screenRange === "lg") {
    return [
      "departmentId",
      "departmentName",
      "locationId",
      "managerId",
      "employeeCount",
      "type",
      "rating"
    ];
  }
  if (screenRange === "md") {
    return ["departmentId", "departmentName", "locationId", "managerId"];
  }
  return ["departmentId", "departmentName"];
};

export const TableResponsiveTablecorepack = () => {
  const departments = useMemo(() => JSON.parse(deptData) as Department[], []);
  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<Department["DepartmentId"], Department>(departments, {
        keyAttributes: "DepartmentId"
      }),
    [departments]
  );
  const [screenRange, setScreenRange] = useState<ScreenRange>(() => getScreenRange());

  useEffect(() => {
    const queries = [
      ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP),
      ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP),
      ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.XL_UP)
    ].filter((query): query is string => Boolean(query));

    const mediaQueryLists = queries.map((query) => matchMedia(query));
    const handleChange = () => setScreenRange(getScreenRange());

    mediaQueryLists.forEach((mediaQueryList) => mediaQueryList.addEventListener("change", handleChange));
    return () =>
      mediaQueryLists.forEach((mediaQueryList) =>
        mediaQueryList.removeEventListener("change", handleChange)
      );
  }, []);

  return (
    <oj-c-table
      id="table"
      aria-label="Departments"
      data={dataProvider}
      columns={columns}
      columnOrder={getColumnOrder(screenRange)}
      row={{ accessibleRowHeader: "departmentName" }}
      class="demo-table-container"
    />
  );
};

export default TableResponsiveTablecorepack;
