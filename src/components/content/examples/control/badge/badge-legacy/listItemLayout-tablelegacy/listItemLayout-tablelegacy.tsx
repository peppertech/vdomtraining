import { useEffect, useMemo, useState } from "preact/hooks";
import type { ComponentProps } from "preact";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { IntlNumberConverter } from "ojs/ojconverter-number";
import { ojTable } from "ojs/ojtable";
import "ojs/ojtable";
import "ojs/ojavatar";
import "ojs/ojlistitemlayout";

interface DataInfo {
  Average: number;
  EmployeeId: number;
  HighSpending: string;
  Job: string;
  ManualApproval: number;
  Name: string;
  OutOfPolicyExpense: number;
  Photo: string;
  Spending: number;
  SpendingProfile: "Good" | "Fair" | "Poor";
}

type ScreenRange = "sm" | "md" | "lg" | "xl";
type TableColumns = ComponentProps<"oj-table">["columns"];
type CellContext = ojTable.CellTemplateContext<DataInfo["EmployeeId"], DataInfo>;

const TEAM_MEMBERS: DataInfo[] = [
  {
    EmployeeId: 1,
    Photo: "/styles/images/listItemImages/placeholder-female-01.png",
    Name: "Amy Bartlet",
    Job: "M5 - Principal Sales Director",
    SpendingProfile: "Poor",
    Spending: 12432,
    Average: 1.52,
    ManualApproval: 2,
    HighSpending: "Meals",
    OutOfPolicyExpense: 6
  },
  {
    EmployeeId: 2,
    Photo: "/styles/images/listItemImages/placeholder-male-01.png",
    Name: "Andy Jones",
    Job: "M4 - Senior Sales Director",
    SpendingProfile: "Fair",
    Spending: 10032,
    Average: 1.23,
    ManualApproval: 2,
    HighSpending: "Meals",
    OutOfPolicyExpense: 6
  },
  {
    EmployeeId: 3,
    Photo: "/styles/images/listItemImages/placeholder-male-02.png",
    Name: "Andrew Bugsy",
    Job: "IC4 - Senior Sales Consultant",
    SpendingProfile: "Good",
    Spending: 1232,
    Average: -0.85,
    ManualApproval: 1,
    HighSpending: "Taxi",
    OutOfPolicyExpense: 0
  },
  {
    EmployeeId: 4,
    Photo: "/styles/images/listItemImages/placeholder-female-02.png",
    Name: "Anne Barnes",
    Job: "IC3 - Senior Sales Consultant",
    SpendingProfile: "Good",
    Spending: 832,
    Average: -0.9,
    ManualApproval: 1,
    HighSpending: "Office Supplies",
    OutOfPolicyExpense: 4
  },
  {
    EmployeeId: 5,
    Photo: "/styles/images/listItemImages/placeholder-male-03.png",
    Name: "Bob Jones",
    Job: "IC2 - Junior Sales Consultant",
    SpendingProfile: "Good",
    Spending: 0,
    Average: 0,
    ManualApproval: 0,
    HighSpending: "N/A",
    OutOfPolicyExpense: 0
  },
  {
    EmployeeId: 6,
    Photo: "/styles/images/listItemImages/placeholder-female-03.png",
    Name: "Bart Buckler",
    Job: "IC2 - Junior Sales Consultant",
    SpendingProfile: "Poor",
    Spending: 15000,
    Average: 1.89,
    ManualApproval: 1,
    HighSpending: "Travel",
    OutOfPolicyExpense: 8
  }
];

const getViewportWidth = () => (typeof window === "undefined" ? 1280 : innerWidth);

const getScreenRange = (width: number): ScreenRange => {
  if (width < 768) {
    return "sm";
  }
  if (width < 1024) {
    return "md";
  }
  if (width < 1440) {
    return "lg";
  }
  return "xl";
};

const getProfileBadgeClass = (value: DataInfo["SpendingProfile"]) => {
  switch (value) {
    case "Good":
      return "oj-badge oj-badge-success";
    case "Poor":
      return "oj-badge oj-badge-danger";
    default:
      return "oj-badge";
  }
};

const formatAverage = (value: number) => {
  if (value > 0) {
    return `+${value * 100}%`;
  }
  if (value === 0) {
    return "-";
  }
  return `${value * 100}%`;
};

const renderEmployeeNameTemplate = (cell: CellContext) => (
  <oj-list-item-layout>
    <oj-avatar
      slot="leading"
      size="xs"
      src={cell.item.data.Photo}
      aria-label={`Avatar of ${cell.item.data.Name}`}
    />
    <div class="oj-line-clamp-1">{cell.item.data.Name}</div>
    <div slot="secondary" class="oj-line-clamp-2">
      {cell.item.data.Job}
    </div>
  </oj-list-item-layout>
);

const renderSpendingProfileTemplate = (cell: CellContext) => (
  <span class={getProfileBadgeClass(cell.item.data.SpendingProfile)}>
    {cell.item.data.SpendingProfile}
  </span>
);

const renderSpendingTemplate = (cell: CellContext, converter: IntlNumberConverter) => (
  <div>{converter.format(cell.item.data.Spending)}</div>
);

const renderAverageTemplate = (cell: CellContext) => <div>{formatAverage(cell.item.data.Average)}</div>;

const renderManualApprovalTemplate = (cell: CellContext) => <div>{cell.item.data.ManualApproval}</div>;

const renderHighSpendingTemplate = (cell: CellContext) => <div>{cell.item.data.HighSpending}</div>;

const renderOutOfPolicyExpenseTemplate = (cell: CellContext) => (
  <div>{cell.item.data.OutOfPolicyExpense}</div>
);

const getColumns = (screenRange: ScreenRange): TableColumns => {
  const nameColumn = {
    headerText: "Name",
    template: "empNameTemplate",
    style: "text-align:left;",
    sortable: "disabled",
    id: "name"
  } as const;
  const profileColumn = {
    headerText: screenRange === "sm" ? "Spending" : "Spending Profile",
    template: "spendingProfileTemplate",
    sortProperty: "SpendingProfile",
    style: screenRange === "sm" ? "text-align:left;" : "text-align:center;",
    footerStyle: screenRange === "sm" ? "text-align:left;" : "text-align:center;",
    id: "profile"
  } as const;
  const totalColumn = {
    headerText: "Total Spending",
    template: "spendingTemplate",
    sortProperty: "Spending",
    headerStyle: "text-align:right",
    style: "text-align:right;",
    footerStyle: "text-align:right;",
    id: "total"
  } as const;
  const averageColumn = {
    headerText: "Comparison to Average",
    field: "Average",
    template: "averageTemplate",
    style: "text-align:center;",
    footerStyle: "text-align:center;",
    id: "average"
  } as const;
  const manualApprovalColumn = {
    headerText: "Manual Approval",
    field: "ManualApproval",
    template: "manualapprovalTemplate",
    style: "text-align:center;",
    footerStyle: "text-align:center;",
    id: "approval"
  } as const;
  const highSpendingColumn = {
    headerText: "High Spending",
    field: "HighSpending",
    template: "highspendingTemplate",
    style: "text-align:center;",
    footerStyle: "text-align:center;",
    id: "high"
  } as const;
  const outOfPolicyExpenseColumn = {
    headerText: "Out Of Policy Expense",
    field: "OutOfPolicyExpense",
    template: "outofpolicyexpenseTemplate",
    style: "text-align:center;",
    footerStyle: "text-align:center;",
    id: "expense"
  } as const;

  switch (screenRange) {
    case "sm":
      return [nameColumn, profileColumn];
    case "md":
      return [nameColumn, profileColumn, totalColumn, averageColumn];
    case "lg":
      return [nameColumn, profileColumn, totalColumn, averageColumn, manualApprovalColumn, highSpendingColumn];
    default:
      return [
        nameColumn,
        profileColumn,
        totalColumn,
        averageColumn,
        manualApprovalColumn,
        highSpendingColumn,
        outOfPolicyExpenseColumn
      ];
  }
};

export const ListItemLayoutTablelegacy = () => {
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(getViewportWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const screenRange = getScreenRange(viewportWidth);
  const columns = useMemo(() => getColumns(screenRange), [screenRange]);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<DataInfo["EmployeeId"], DataInfo>(TEAM_MEMBERS, {
        keyAttributes: "EmployeeId"
      }),
    []
  );
  const spendingConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: "currency",
        currency: "USD",
        currencyDisplay: "symbol"
      }),
    []
  );
  const ojTableProps: Partial<ComponentProps<"oj-table">> = {
    accessibility: { rowHeader: "name" },
    columnsDefault: { sortable: "enabled" }
  };

  return (
    <div id="tabledemo">
      <div>
        <h1 class="oj-typography-subheading-sm">Team Overview</h1>
      </div>
      <div>
        <oj-table
          id="table"
          horizontalGridVisible="enabled"
          aria-label="Sales Representative Table"
          data={dataProvider}
          columns={columns}
          {...ojTableProps}
        >
          <template slot="empNameTemplate" render={renderEmployeeNameTemplate} />
          <template slot="spendingProfileTemplate" render={renderSpendingProfileTemplate} />
          <template
            slot="spendingTemplate"
            render={(cell) => renderSpendingTemplate(cell as CellContext, spendingConverter)}
          />
          <template slot="averageTemplate" render={renderAverageTemplate} />
          <template slot="manualapprovalTemplate" render={renderManualApprovalTemplate} />
          <template slot="highspendingTemplate" render={renderHighSpendingTemplate} />
          <template slot="outofpolicyexpenseTemplate" render={renderOutOfPolicyExpenseTemplate} />
        </oj-table>
      </div>
    </div>
  );
};

export default ListItemLayoutTablelegacy;
