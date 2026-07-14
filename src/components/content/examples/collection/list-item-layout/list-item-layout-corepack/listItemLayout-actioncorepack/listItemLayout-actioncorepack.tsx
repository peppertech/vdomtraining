import "css!./demo.css";
import "oj-c/avatar";
import "oj-c/button";
import "oj-c/buttonset-single";
import "oj-c/list-item-layout";
import "oj-c/list-view";
import type { CListViewElement } from "oj-c/list-view";
import "oj-c/menu-button";
import "oj-c/selector";
import "oj-c/toolbar";
import { Toolbar } from "oj-c/toolbar";
import { KeySetImpl,type ImmutableKeySet } from "ojs/ojkeyset";
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

interface Employee {
  id: string;
  image: string;
  initials: string;
  name: string;
}

interface EmployeeInfo {
  department: string;
  id: string;
  image: string;
  name: string;
  startdate: string;
}

interface Payment {
  default: string;
  id: string;
  meta: string;
  secondary: string;
  type: "one" | "two" | "three";
}

type AvatarBackground = NonNullable<ComponentProps<"oj-c-avatar">["background"]>;
type ButtonsetItem = NonNullable<ComponentProps<"oj-c-buttonset-single">["items"]>[number];
type MenuItems = NonNullable<ComponentProps<"oj-c-menu-button">["items"]>;
type ToolbarItems = NonNullable<ComponentProps<typeof Toolbar>["items"]>;
type EmployeeItemContext = CListViewElement.ItemTemplateContext<Employee["id"], Employee>;
type EmployeeSelectedChangedEvent = CListViewElement.selectedChanged<Employee["id"], Employee>;
type EmployeeInfoItemContext = CListViewElement.ItemTemplateContext<EmployeeInfo["id"], EmployeeInfo>;
type EmployeeInfoSelectedChangedEvent = CListViewElement.selectedChanged<
  EmployeeInfo["id"],
  EmployeeInfo
>;
type PaymentItemContext = CListViewElement.ItemTemplateContext<Payment["id"], Payment>;
type ButtonsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-buttonset-single">["onvalueChanged"]>
>[0];

const EMPLOYEES: Employee[] = [
  { id: "id1", image: "/styles/images/listItemImages/placeholder-male-01.png", name: "Chris Black", initials: "CB" },
  { id: "id2", image: "/styles/images/listItemImages/placeholder-female-01.png", name: "Christine Cooper", initials: "CC" },
  { id: "id3", image: "/styles/images/listItemImages/placeholder-male-06.png", name: "Kurt Marchris", initials: "KM" }
];

const EMPLOYEE_INFOS: EmployeeInfo[] = [
  {
    id: "id1",
    image: "/styles/images/listItemImages/placeholder-male-01.png",
    name: "Chris Black",
    department: "Engineering",
    startdate: "2003"
  },
  {
    id: "id2",
    image: "/styles/images/listItemImages/placeholder-female-01.png",
    name: "Christine Cooper",
    department: "Global Support",
    startdate: "2004"
  },
  {
    id: "id3",
    image: "/styles/images/listItemImages/placeholder-male-06.png",
    name: "Kurt Marchris",
    department: "Customer Support",
    startdate: "2003"
  }
];

const PAYMENTS: Payment[] = [
  {
    id: "id1",
    default: "Office space installment",
    secondary: "in 3 days",
    meta: "-$15,000",
    type: "one"
  },
  { id: "id2", default: "Payroll", secondary: "in 5 days", meta: "-$62,000", type: "two" },
  {
    id: "id3",
    default: "Car fleet insurance",
    secondary: "in 7 days",
    meta: "-$5,270",
    type: "three"
  }
];

const ACTION_ITEMS = [
  { value: "View", label: "View", startIcon: { class: "oj-ux-ico-view" } },
  { value: "Delete", label: "Delete", startIcon: { class: "oj-ux-ico-file-remove" } }
] satisfies ButtonsetItem[];

const MENU_ITEMS = [
  { key: "save", label: "Save", startIcon: { class: "oj-ux-ico-save" }, disabled: false },
  {
    key: "download",
    label: "Download",
    startIcon: { class: "oj-ux-ico-download" },
    disabled: false
  },
  { key: "print", label: "Print...", startIcon: { class: "oj-ux-ico-print" }, disabled: false }
] satisfies MenuItems;

const TOOLBAR_ITEMS = [
  {
    type: "buttonset-single",
    key: "buttonset1",
    display: "icons",
    items: [
      {
        value: "save",
        label: "Save",
        startIcon: { class: "oj-ux-ico-save" }
      },
      {
        value: "download",
        label: "Download",
        startIcon: { class: "oj-ux-ico-download" }
      },
      {
        value: "print",
        label: "Print",
        startIcon: { class: "oj-ux-ico-print" }
      }
    ]
  }
] satisfies ToolbarItems;

const getIconBackground = (type: Payment["type"]): AvatarBackground => {
  switch (type) {
    case "one":
      return "pink";
    case "two":
      return "teal";
    default:
      return "purple";
  }
};

const getIconClass = (type: Payment["type"]) => {
  switch (type) {
    case "one":
      return "oj-ux-ico-office";
    case "two":
      return "oj-ux-ico-money";
    default:
      return "oj-ux-ico-car";
  }
};

const renderOverviewItem = (context: EmployeeItemContext) => (
  <oj-c-list-item-layout aria-label={`Details for ${context.data.name}`}>
    <oj-c-selector slot="selector" aria-label={`Select ${context.data.name}`} />
    <div class="oj-typography-body-md">Default slot</div>
    <div slot="action">
      <oj-c-button chroming="borderless" label="Action Slot" size="sm" />
    </div>
  </oj-c-list-item-layout>
);

const renderPaymentItem = (context: PaymentItemContext) => (
  <oj-c-list-item-layout aria-label={`Details for ${context.data.default}`}>
    <oj-c-avatar
      slot="leading"
      size="xs"
      background={getIconBackground(context.data.type)}
      iconClass={getIconClass(context.data.type)}
      aria-label="Circular icon with type icon"
      shape="circle"
    />
    <div class="oj-typography-body-md">{context.data.default}</div>
    <div slot="secondary" class="oj-typography-body-sm">
      {context.data.secondary}
    </div>
    <div slot="action">
      <oj-c-menu-button
        chroming="borderless"
        items={MENU_ITEMS}
        size="sm"
        display="icons"
        label="Actions"
      />
    </div>
  </oj-c-list-item-layout>
);

export const ListItemLayoutActioncorepack = () => {
  const [overviewSelectedItems, setOverviewSelectedItems] = useState<ImmutableKeySet<string>>(
    new KeySetImpl<string>()
  );
  const [employeeSelectedItems, setEmployeeSelectedItems] = useState<ImmutableKeySet<string>>(
    new KeySetImpl<string>()
  );
  const [toolbarSelectedItems, setToolbarSelectedItems] = useState<ImmutableKeySet<string>>(
    new KeySetImpl<string>()
  );
  const [buttonsetValues, setButtonsetValues] = useState<Record<string, string>>(
    Object.fromEntries(EMPLOYEE_INFOS.map(({ id }) => [id, "View"]))
  );

  const employeeDataProvider = useMemo(
    () =>
      new ArrayDataProvider<Employee["id"], Employee>(EMPLOYEES, {
        keyAttributes: "id"
      }),
    []
  );
  const employeeInfoDataProvider = useMemo(
    () =>
      new ArrayDataProvider<EmployeeInfo["id"], EmployeeInfo>(EMPLOYEE_INFOS, {
        keyAttributes: "id"
      }),
    []
  );
  const paymentDataProvider = useMemo(
    () =>
      new ArrayDataProvider<Payment["id"], Payment>(PAYMENTS, {
        keyAttributes: "id"
      }),
    []
  );

  const handleOverviewSelectedChanged = (event: EmployeeSelectedChangedEvent) => {
    setOverviewSelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  const handleEmployeeSelectedChanged = (event: EmployeeInfoSelectedChangedEvent) => {
    setEmployeeSelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  const handleToolbarSelectedChanged = (event: EmployeeInfoSelectedChangedEvent) => {
    setToolbarSelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  const renderEmployeeActionItem = (context: EmployeeInfoItemContext) => {
    const handleValueChanged = (event: ButtonsetValueChangedEvent) => {
      setButtonsetValues((currentValues) => ({
        ...currentValues,
        [context.data.id]: event.detail.value ?? "View"
      }));
    };

    return (
      <oj-c-list-item-layout aria-label={`Details for ${context.data.name}`}>
        <oj-c-selector slot="selector" aria-label={`Select ${context.data.name}`} />
        <div class="oj-typography-body-md oj-typography-bold">{context.data.name}</div>
        <div
          slot="secondary"
          class="oj-typography-body-sm"
          aria-label={`Department ${context.data.department}`}
        >
          {context.data.department}
        </div>
        <div slot="action">
          <oj-c-buttonset-single
            chroming="borderless"
            items={ACTION_ITEMS}
            display="icons"
            layoutWidth="auto"
            value={buttonsetValues[context.data.id]}
            onvalueChanged={handleValueChanged}
            aria-label={`Choose action for ${context.data.name}`}
          />
        </div>
      </oj-c-list-item-layout>
    );
  };

  const renderToolbarItem = (context: EmployeeInfoItemContext) => (
    <oj-c-list-item-layout aria-label={`Details for ${context.data.name}`}>
      <oj-c-selector slot="selector" aria-label={`Select ${context.data.name}`} />
      <div class="oj-typography-body-md oj-typography-bold">{context.data.name}</div>
      <div
        slot="secondary"
        class="oj-typography-body-sm"
        aria-label={`Department ${context.data.department}`}
      >
        {context.data.department}
      </div>
      <div slot="action">
        <oj-c-toolbar aria-label="Toolbar" spacing="sm" items={TOOLBAR_ITEMS} />
      </div>
    </oj-c-list-item-layout>
  );

  return (
    <div id="listitemlayout">
      <div class="oj-sm-only-hide">
        <div class="oj-sm-padding-4x-vertical">This demo uses button as content for the Action slot.</div>
        <oj-c-list-view
          id="listviewone"
          aria-label="Example of all available slot"
          data={employeeDataProvider}
          gridlines={{ item: "visible", bottom: "visible" }}
          class="demo-list-view oj-sm-padding-2x-vertical"
          selected={overviewSelectedItems}
          selectionMode="multiple"
          onselectedChanged={handleOverviewSelectedChanged}
        >
          <template slot="itemTemplate" render={renderOverviewItem} />
        </oj-c-list-view>
      </div>

      <div class="oj-sm-padding-4x-vertical">This demo shows Action slot with ButtonSet</div>
      <oj-c-list-view
        id="listviewtwo"
        aria-label="Employee Information"
        data={employeeInfoDataProvider}
        gridlines={{ item: "visible", bottom: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={employeeSelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleEmployeeSelectedChanged}
      >
        <template slot="itemTemplate" render={renderEmployeeActionItem} />
      </oj-c-list-view>

      <div class="oj-sm-padding-4x-vertical">This demo shows Action slot with MenuButton</div>
      <oj-c-list-view
        id="listviewthree"
        aria-label="Available Products"
        data={paymentDataProvider}
        gridlines={{ item: "visible", bottom: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
      >
        <template slot="itemTemplate" render={renderPaymentItem} />
      </oj-c-list-view>

      <div class="oj-sm-padding-4x-vertical">This demo shows Action Slot with Toolbar</div>
      <oj-c-list-view
        id="listviewfour"
        aria-label="Employee Information with Action"
        data={employeeInfoDataProvider}
        gridlines={{ item: "visible", bottom: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={toolbarSelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleToolbarSelectedChanged}
      >
        <template slot="itemTemplate" render={renderToolbarItem} />
      </oj-c-list-view>
    </div>
  );
};

export default ListItemLayoutActioncorepack;
