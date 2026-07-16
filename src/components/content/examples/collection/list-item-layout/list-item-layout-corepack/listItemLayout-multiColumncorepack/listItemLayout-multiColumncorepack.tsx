import "css!./demo.css";
import "oj-c/badge";
import "oj-c/list-item-layout";
import "oj-c/list-view";
import type { CListViewElement } from "oj-c/list-view";
import { useMemo } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

interface TaskRow {
  code1: string;
  code2: string;
  code3: string;
  id: string;
  orgName: string;
  phone: string;
  status: "Approved" | "Pending" | "InProgress";
  symbol: string;
  taskCode: string;
  taskName: string;
  userName: string;
}

type TaskRowContext = CListViewElement.ItemTemplateContext<TaskRow["id"], TaskRow>;

const TASK_ROWS: TaskRow[] = [
  {
    id: "id1",
    status: "Approved",
    userName: "Tania Choat",
    taskName: "Magic Cube 3x3x3 stickerless, bright colors, magnetized.",
    phone: "(206) 334-9990",
    taskCode: "204",
    symbol: "USD",
    orgName: "Vision Operations",
    code1: "10503683",
    code2: "100100004256766",
    code3: "300100174420067"
  },
  {
    id: "id2",
    status: "Pending",
    userName: "Tania Choat",
    taskName: "Display Adapter - Apple USBC Digital AV Multiport Adapter.",
    phone: "(520) 708-3424",
    taskCode: "204",
    symbol: "USD",
    orgName: "Printer",
    code1: "10503983",
    code2: "200879654112",
    code3: "23415267800"
  },
  {
    id: "id3",
    status: "InProgress",
    userName: "Tania Choat",
    taskName: "Printer Upgrade.",
    phone: "(480) 765-1287",
    taskCode: "204",
    symbol: "USD",
    orgName: "Vision Operations",
    code1: "2309872",
    code2: "54626789100",
    code3: "90008765100"
  },
  {
    id: "id4",
    status: "Approved",
    userName: "Tania Choat",
    taskName: "Sheraton Hotel.",
    phone: "(206) 890-1287",
    taskCode: "204",
    symbol: "USD",
    orgName: "Hotel",
    code1: "162345",
    code2: "100100004256766",
    code3: "300100100100002"
  },
  {
    id: "id5",
    status: "Pending",
    userName: "Tania Choat",
    taskName: "Magic Cube 3x3x3 stickerless, bright colors, magnetized.",
    phone: "(408) 908-9876",
    taskCode: "204",
    symbol: "USD",
    orgName: "Vision Operations",
    code1: "10503686",
    code2: "100100004256766",
    code3: "300100100100003"
  },
  {
    id: "id6",
    status: "Pending",
    userName: "Tania Choat",
    taskName: "GoodYear Tire.",
    phone: "(208) 348-1887",
    taskCode: "204",
    symbol: "USD",
    orgName: "Flags",
    code1: "10503690",
    code2: "100100004256766",
    code3: "300100100100005"
  }
];

const getBadgeVariant = (status: TaskRow["status"]) => {
  switch (status) {
    case "Pending":
      return "warning";
    case "InProgress":
      return "info";
    case "Approved":
      return "success";
    default:
      return "neutral";
  }
};

const renderTaskItem: import("ojs/ojvcomponent").TemplateSlot<TaskRowContext> = (context) => (
  <oj-c-list-item-layout aria-label={`Details for ${context.data.userName}`}>
    <div
      slot="leading"
      class="oj-typography-body-sm demo-badge-width"
      aria-label={`Status ${context.data.status}`}
    >
      <oj-c-badge variant={getBadgeVariant(context.data.status)} label={context.data.status} />
    </div>
    <div class="oj-typography-body-md">
      <div class="oj-flex oj-sm-align-items-center">
        <div class="oj-flex-item demo-list-item-layout oj-md-padding-4x-end">
          <oj-c-list-item-layout inset="none" aria-label={`Task ${context.data.taskName}`}>
            {context.data.taskName}
            <div slot="secondary" class="oj-typography-body-sm" aria-label={`Name ${context.data.userName}`}>
              {context.data.userName}
            </div>
            <div slot="tertiary" class="oj-typography-body-xs oj-text-color-secondary" aria-label={`Phone ${context.data.phone}`}>
              {context.data.phone}
            </div>
          </oj-c-list-item-layout>
        </div>
        <div class="oj-flex-item demo-list-item-layout1 oj-md-padding-4x-end oj-sm-only-hide">
          <oj-c-list-item-layout inset="none" aria-label={`Details for ${context.data.orgName}`}>
            <div slot="overline" class="oj-typography-body-xs oj-text-color-secondary" aria-label={`Symbol ${context.data.symbol}`}>
              {context.data.symbol}
            </div>
            <div class="oj-typography-body-md" aria-label={`Organization ${context.data.orgName}`}>
              {context.data.orgName}
            </div>
            <div slot="metadata" class="oj-typography-body-sm oj-text-color-secondary" aria-label={`Task id ${context.data.taskCode}`}>
              {context.data.taskCode}
            </div>
          </oj-c-list-item-layout>
        </div>
        <div class="oj-flex-item demo-list-item-layout1 oj-sm-only-hide">
          <oj-c-list-item-layout inset="none" aria-label="List of codes">
            <div slot="overline" class="oj-typography-body-xs">
              {context.data.code1}
            </div>
            <div class="oj-typography-body-md">{context.data.code2}</div>
            <div slot="tertiary" class="oj-typography-body-xs oj-text-color-secondary">
              {context.data.code3}
            </div>
          </oj-c-list-item-layout>
        </div>
      </div>
    </div>
    <div slot="metadata" class="oj-typography-body-sm oj-text-color-secondary" aria-label={`Task id ${context.data.taskCode}`}>
      {context.data.taskCode}
    </div>
  </oj-c-list-item-layout>
);

export const ListItemLayoutMultiColumncorepack = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<TaskRow["id"], TaskRow>(TASK_ROWS, {
        keyAttributes: "id"
      }),
    []
  );

  return (
    <div id="listitemlayout">
      <oj-c-list-view
        id="listviewtwo"
        aria-label="Multicolumn with list item layout"
        data={dataProvider}
        class="oj-sm-padding-2x-vertical"
        gridlines={{ item: "visible", bottom: "visible" }}
        selectionMode="multiple"
      >
        <template slot="itemTemplate" render={renderTaskItem} />
      </oj-c-list-view>
    </div>
  );
};

export default ListItemLayoutMultiColumncorepack;
