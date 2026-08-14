import "css!./demo.css";
import "ojs/ojavatar";
import "ojs/ojbutton";
import { KeySetImpl,type KeySet } from "ojs/ojkeyset";
import "ojs/ojlistitemlayout";
import "ojs/ojlistview";
import type { ojListView } from "ojs/ojlistview";
import "ojs/ojmenu";
import "ojs/ojselector";
import "ojs/ojtoolbar";
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

type AvatarBackground = "pink" | "purple" | "teal";
type EmployeeItemContext = ojListView.ItemTemplateContext<Employee["id"], Employee>;
type EmployeeSelectedChangedEvent = ojListView.selectedChanged<Employee["id"], Employee>;
type EmployeeInfoItemContext = ojListView.ItemTemplateContext<EmployeeInfo["id"], EmployeeInfo>;
type EmployeeInfoSelectedChangedEvent = ojListView.selectedChanged<
  EmployeeInfo["id"],
  EmployeeInfo
>;
type PaymentItemContext = ojListView.ItemTemplateContext<Payment["id"], Payment>;
type ButtonsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-buttonset-one">["onvalueChanged"]>
>[0];
type SelectorSelectedKeysChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-selector">["onselectedKeysChanged"]>
>[0];
type SelectorSelectedKeysChangedHandler = NonNullable<
  ComponentProps<"oj-selector">["onselectedKeysChanged"]
>;

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

const renderOverviewItem = (
  context: EmployeeItemContext,
  selectedItems: KeySet<string>,
  onSelectedKeysChanged: SelectorSelectedKeysChangedHandler
) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.name}`}>
    <oj-selector
      slot="selector"
      aria-label={`Select ${context.data.name}`}
      selectedKeys={selectedItems}
      onselectedKeysChanged={onSelectedKeysChanged}
      selectionMode="multiple"
      rowKey={context.data.id}
    />
    <div class="oj-typography-body-md">Default slot</div>
    <div slot="action">
      <oj-button chroming="borderless" label="Action Slot" class="oj-button-sm" />
    </div>
  </oj-list-item-layout>
);

const renderPaymentItem = (context: PaymentItemContext) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.default}`}>
    <oj-avatar
      slot="leading"
      size="xs"
      background={getIconBackground(context.data.type)}
      icon-class={getIconClass(context.data.type)}
      aria-label="Circular icon with type icon"
      shape="circle"
    />
    <div class="oj-typography-body-md">{context.data.default}</div>
    <div slot="secondary" class="oj-typography-body-sm">
      {context.data.secondary}
    </div>
    <div slot="action">
      <oj-menu-button chroming="borderless" class="oj-button-sm" display="icons">
        Actions
        <oj-menu id={`paymentMenu${context.data.id}`} slot="menu" aria-label="Payment actions">
          <oj-option value="save">
            <span slot="startIcon" class="oj-ux-ico-save" />
            Save
          </oj-option>
          <oj-option value="download">
            <span slot="startIcon" class="oj-ux-ico-download" />
            Download
          </oj-option>
          <oj-option value="print">
            <span slot="startIcon" class="oj-ux-ico-print" />
            Print...
          </oj-option>
        </oj-menu>
      </oj-menu-button>
    </div>
  </oj-list-item-layout>
);

export default function ListItemLayoutActionlegacy() {
  const [overviewSelectedItems, setOverviewSelectedItems] = useState<KeySet<string>>(
    new KeySetImpl<string>()
  );
  const [employeeSelectedItems, setEmployeeSelectedItems] = useState<KeySet<string>>(
    new KeySetImpl<string>()
  );
  const [toolbarSelectedItems, setToolbarSelectedItems] = useState<KeySet<string>>(
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

  const handleOverviewSelectorSelectedKeysChanged = (
    event: SelectorSelectedKeysChangedEvent
  ) => {
    setOverviewSelectedItems(
      (event.detail.value as KeySet<string> | null | undefined) ??
        new KeySetImpl<string>()
    );
  };

  const handleEmployeeSelectorSelectedKeysChanged = (
    event: SelectorSelectedKeysChangedEvent
  ) => {
    setEmployeeSelectedItems(
      (event.detail.value as KeySet<string> | null | undefined) ??
        new KeySetImpl<string>()
    );
  };

  const handleToolbarSelectorSelectedKeysChanged = (
    event: SelectorSelectedKeysChangedEvent
  ) => {
    setToolbarSelectedItems(
      (event.detail.value as KeySet<string> | null | undefined) ??
        new KeySetImpl<string>()
    );
  };

  const renderOverviewItemTemplate = (context: EmployeeItemContext) =>
    renderOverviewItem(
      context,
      overviewSelectedItems,
      handleOverviewSelectorSelectedKeysChanged
    );

  const renderEmployeeActionItem = (context: EmployeeInfoItemContext) => {
    const handleValueChanged = (event: ButtonsetValueChangedEvent) => {
      setButtonsetValues((currentValues) => ({
        ...currentValues,
        [context.data.id]: event.detail.value ?? "View"
      }));
    };

    return (
      <oj-list-item-layout aria-label={`Details for ${context.data.name}`}>
        <oj-selector
          slot="selector"
          aria-label={`Select ${context.data.name}`}
          selectedKeys={employeeSelectedItems}
          onselectedKeysChanged={handleEmployeeSelectorSelectedKeysChanged}
          selectionMode="multiple"
          rowKey={context.data.id}
        />
        <div class="oj-typography-body-md oj-typography-bold">{context.data.name}</div>
        <div
          slot="secondary"
          class="oj-typography-body-sm"
          aria-label={`Department ${context.data.department}`}
        >
          {context.data.department}
        </div>
        <div slot="action">
          <oj-buttonset-one
            chroming="borderless"
            display="icons"
            class="oj-buttonset-width-auto"
            value={buttonsetValues[context.data.id]}
            onvalueChanged={handleValueChanged}
            aria-label={`Choose action for ${context.data.name}`}
          >
            <oj-option value="View">
              <span slot="startIcon" class="oj-ux-ico-view" />
              View
            </oj-option>
            <oj-option value="Delete">
              <span slot="startIcon" class="oj-ux-ico-file-remove" />
              Delete
            </oj-option>
          </oj-buttonset-one>
        </div>
      </oj-list-item-layout>
    );
  };

  const renderToolbarItem = (context: EmployeeInfoItemContext) => (
    <oj-list-item-layout aria-label={`Details for ${context.data.name}`}>
      <oj-selector
        slot="selector"
        aria-label={`Select ${context.data.name}`}
        selectedKeys={toolbarSelectedItems}
        onselectedKeysChanged={handleToolbarSelectorSelectedKeysChanged}
        selectionMode="multiple"
        rowKey={context.data.id}
      />
      <div class="oj-typography-body-md oj-typography-bold">{context.data.name}</div>
      <div
        slot="secondary"
        class="oj-typography-body-sm"
        aria-label={`Department ${context.data.department}`}
      >
        {context.data.department}
      </div>
      <div slot="action">
        <oj-toolbar aria-label="Toolbar">
          <oj-button id={`toolbarSave${context.data.id}`} display="icons" class="oj-button-sm">
            <span slot="startIcon" class="oj-ux-ico-save" />
            Save
          </oj-button>
          <oj-button id={`toolbarDownload${context.data.id}`} display="icons" class="oj-button-sm">
            <span slot="startIcon" class="oj-ux-ico-download" />
            Download
          </oj-button>
          <oj-button id={`toolbarPrint${context.data.id}`} display="icons" class="oj-button-sm">
            <span slot="startIcon" class="oj-ux-ico-print" />
            Print
          </oj-button>
        </oj-toolbar>
      </div>
    </oj-list-item-layout>
  );

  return (
    <div id="listitemlayout">
      <div class="oj-sm-only-hide">
        <div class="oj-sm-padding-4x-vertical">This demo uses button as content for the Action slot.</div>
        <oj-list-view
          id="listviewone"
          aria-label="Example of all available slot"
          data={employeeDataProvider}
          gridlines={{ item: "visible" }}
          class="demo-list-view oj-sm-padding-2x-vertical"
          selected={overviewSelectedItems}
          selectionMode="multiple"
          onselectedChanged={handleOverviewSelectedChanged}
        >
          <template slot="itemTemplate" render={renderOverviewItemTemplate} />
        </oj-list-view>
      </div>

      <div class="oj-sm-padding-4x-vertical">This demo shows Action slot with ButtonSet</div>
      <oj-list-view
        id="listviewtwo"
        aria-label="Employee Information"
        data={employeeInfoDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={employeeSelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleEmployeeSelectedChanged}
      >
        <template slot="itemTemplate" render={renderEmployeeActionItem} />
      </oj-list-view>

      <div class="oj-sm-padding-4x-vertical">This demo shows Action slot with MenuButton</div>
      <oj-list-view
        id="listviewthree"
        aria-label="Available Products"
        data={paymentDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
      >
        <template slot="itemTemplate" render={renderPaymentItem} />
      </oj-list-view>

      <div class="oj-sm-padding-4x-vertical">This demo shows Action Slot with Toolbar</div>
      <oj-list-view
        id="listviewfour"
        aria-label="Employee Information with Action"
        data={employeeInfoDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={toolbarSelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleToolbarSelectedChanged}
      >
        <template slot="itemTemplate" render={renderToolbarItem} />
      </oj-list-view>
    </div>
  );
};
