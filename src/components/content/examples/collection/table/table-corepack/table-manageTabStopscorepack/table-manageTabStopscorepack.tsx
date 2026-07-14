import "css!./demo.css";
import "oj-c/rating-gauge";
import "oj-c/table";
import type { CTableElement } from "oj-c/table";
import * as preact from 'preact';
import { type ComponentProps } from 'preact';
import { useMemo } from "preact/hooks";
import * as empData from "text!./employeeData.json";
import "../../../../../../jet-composites/demo-memory-card/loader";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

interface Employee {
  id: number;
  name: string;
  image: string;
  rating: number;
}

type ColumnKey = "col1" | "col2" | "col3";
type TableColumns = NonNullable<ComponentProps<"oj-c-table">["columns"]>;
type CardTemplateContext = CTableElement.CellTemplateContext<Employee["id"], Employee, ColumnKey>;
type LinkTemplateContext = CTableElement.CellTemplateContext<Employee["id"], Employee, ColumnKey>;
type RatingTemplateContext = CTableElement.CellTemplateContext<Employee["id"], Employee, ColumnKey>;

const columns: TableColumns = {
  col1: {
    field: "image",
    headerText: "Third-Party Component",
    padding: { top: "disabled", bottom: "disabled" },
    tooltip: "disabled",
    template: "card"
  },
  col2: {
    field: "name",
    headerText: "Tabbable Content",
    padding: { top: "disabled", bottom: "disabled" },
    template: "link"
  },
  col3: {
    field: "rating",
    headerText: "Core Pack Component",
    tooltip: "disabled",
    template: "rating"
  }
};

const renderCardTemplate = (context: CardTemplateContext) =>
  preact.h("demo-memory-card", {
    class: "demo-card-sizing",
    "value-image": String(context.data ?? ""),
    "data-oj-manage-tabs": ""
  });

const renderLinkTemplate = (context: LinkTemplateContext) => (
  <a href="#" tabIndex={context.isTabbable ? 0 : -1}>
    {String(context.data ?? "")}
  </a>
);

const renderRatingTemplate = (context: RatingTemplateContext) => {
  const rating = Number(context.data ?? 0);
  return <oj-c-rating-gauge size="sm" value={rating} readonly aria-label={`${rating} out of 5`} />;
};

export const TableManageTabStopscorepack = () => {
  const employees = useMemo(() => JSON.parse(empData) as Employee[], []);
  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<Employee["id"], Employee>(employees, {
        keyAttributes: "id"
      }),
    [employees]
  );

  return (
    <oj-c-table
      id="table"
      aria-label="Employees"
      data={dataProvider}
      columns={columns}
      layout="fixed"
      row={{ accessibleRowHeader: "col2" }}
      class="demo-table-container"
    >
      <template slot="card" render={renderCardTemplate} />
      <template slot="link" render={renderLinkTemplate} />
      <template slot="rating" render={renderRatingTemplate} />
    </oj-c-table>
  );
};

export default TableManageTabStopscorepack;
