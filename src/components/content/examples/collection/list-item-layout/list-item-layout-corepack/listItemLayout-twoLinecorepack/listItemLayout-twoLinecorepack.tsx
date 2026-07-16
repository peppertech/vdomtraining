import "css!./demo.css";
import "oj-c/avatar";
import "oj-c/badge";
import "oj-c/list-item-layout";
import "oj-c/list-view";
import type { CListViewElement } from "oj-c/list-view";
import "oj-c/selector";
import { KeySetImpl,type ImmutableKeySet } from "ojs/ojkeyset";
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

interface Person {
  id: string;
  image: string;
  initials: string;
  name: string;
}

interface Employee {
  email: string;
  id: string;
  image: string;
  name: string;
  phone: string;
  position: string;
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
type PersonItemContext = CListViewElement.ItemTemplateContext<Person["id"], Person>;
type PersonSelectedChangedEvent = CListViewElement.selectedChanged<Person["id"], Person>;
type EmployeeItemContext = CListViewElement.ItemTemplateContext<Employee["id"], Employee>;
type EmployeeSelectedChangedEvent = CListViewElement.selectedChanged<Employee["id"], Employee>;
type PaymentItemContext = CListViewElement.ItemTemplateContext<Payment["id"], Payment>;

const PEOPLE: Person[] = [
  { id: "id1", image: "/styles/images/listItemImages/placeholder-male-01.png", name: "Chris Black", initials: "CB" },
  { id: "id2", image: "/styles/images/listItemImages/placeholder-female-01.png", name: "Christine Cooper", initials: "CC" },
  { id: "id3", image: "/styles/images/listItemImages/placeholder-male-06.png", name: "Kurt Marchris", initials: "KM" }
];

const EMPLOYEES: Employee[] = [
  {
    id: "id1",
    image: "/styles/images/listItemImages/placeholder-male-01.png",
    name: "Chris Black",
    position: "OCI GTM Channel Director EMEA",
    email: "cblack@email.com",
    phone: "(206) 334-9990",
    startdate: "2003"
  },
  {
    id: "id2",
    image: "/styles/images/listItemImages/placeholder-female-01.png",
    name: "Christine Cooper",
    position: "Senior Principal Escalation Manager",
    email: "ccopper@email.com",
    phone: "(324) 908-1287",
    startdate: "2004"
  },
  {
    id: "id3",
    image: "/styles/images/listItemImages/placeholder-male-06.png",
    name: "Kurt Marchris",
    position: "Customer Service Analyst",
    email: "kmarchris@email.com",
    phone: "(408) 788-5647",
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
      return "orange";
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

const renderOverviewItem: import("ojs/ojvcomponent").TemplateSlot<PersonItemContext> = (context) => (
  <oj-c-list-item-layout aria-label={`Details for ${context.data.name}`}>
    <oj-c-selector slot="selector" aria-label={`Select ${context.data.name}`} />
    <div slot="leading">
      <oj-c-badge label="Leading Slot" />
    </div>
    <div class="oj-typography-body-md">Default slot</div>
    <div slot="secondary" class="oj-typography-body-sm">
      Secondary slot
    </div>
    <div slot="metadata" class="oj-typography-body-sm oj-text-color-secondary">
      Metadata slot
    </div>
  </oj-c-list-item-layout>
);

const renderEmployeeItem: import("ojs/ojvcomponent").TemplateSlot<EmployeeItemContext> = (context) => (
  <oj-c-list-item-layout aria-label={`Details for ${context.data.name}`}>
    <oj-c-selector slot="selector" aria-label={`Select ${context.data.name}`} />
    <oj-c-avatar
      slot="leading"
      size="xs"
      src={context.data.image}
      aria-label={`Avatar of ${context.data.name}`}
      title={`Avatar of ${context.data.name}`}
    />
    <div class="oj-typography-body-md oj-typography-bold" aria-label={`Name ${context.data.name}`}>
      {context.data.name}
    </div>
    <div
      slot="secondary"
      class="oj-typography-body-sm"
      aria-label={`Designation ${context.data.position}`}
    >
      {context.data.position}
    </div>
    <div
      slot="metadata"
      class="oj-typography-body-sm oj-text-color-secondary"
      aria-label={`Start date ${context.data.startdate}`}
    >
      {context.data.startdate}
    </div>
  </oj-c-list-item-layout>
);

const renderPaymentItem: import("ojs/ojvcomponent").TemplateSlot<PaymentItemContext> = (context) => (
  <oj-c-list-item-layout aria-label={`Details for ${context.data.default}`}>
    <oj-c-avatar
      slot="leading"
      background={getIconBackground(context.data.type)}
      size="xs"
      aria-label="Circular icon with type icon"
      iconClass={getIconClass(context.data.type)}
      shape="circle"
    />
    <div class="oj-typography-body-md">{context.data.default}</div>
    <div slot="secondary" class="oj-typography-body-sm">
      {context.data.secondary}
    </div>
    <div slot="metadata" class="oj-typography-body-md oj-text-color-secondary" aria-label={`Cost ${context.data.meta}`}>
      {context.data.meta}
    </div>
  </oj-c-list-item-layout>
);

export const ListItemLayoutTwoLinecorepack = () => {
  const [overviewSelectedItems, setOverviewSelectedItems] = useState<ImmutableKeySet<string>>(
    new KeySetImpl<string>()
  );
  const [employeeSelectedItems, setEmployeeSelectedItems] = useState<ImmutableKeySet<string>>(
    new KeySetImpl<string>()
  );

  const overviewDataProvider = useMemo(
    () =>
      new ArrayDataProvider<Person["id"], Person>(PEOPLE, {
        keyAttributes: "id"
      }),
    []
  );
  const employeeDataProvider = useMemo(
    () =>
      new ArrayDataProvider<Employee["id"], Employee>(EMPLOYEES, {
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

  const handleOverviewSelectedChanged = (event: PersonSelectedChangedEvent) => {
    setOverviewSelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  const handleEmployeeSelectedChanged = (event: EmployeeSelectedChangedEvent) => {
    setEmployeeSelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  return (
    <div id="listitemlayout">
      <div class="oj-sm-padding-4x-vertical">This demo shows where the various slot contents go.</div>
      <oj-c-list-view
        id="listviewone"
        aria-label="Example of all available slot"
        data={overviewDataProvider}
        gridlines={{ item: "visible", bottom: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={overviewSelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleOverviewSelectedChanged}
      >
        <template slot="itemTemplate" render={renderOverviewItem} />
      </oj-c-list-view>

      <div class="oj-sm-padding-4x-vertical">Employee list example</div>
      <oj-c-list-view
        id="listviewtwo"
        aria-label="Employee information"
        data={employeeDataProvider}
        gridlines={{ item: "visible", bottom: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={employeeSelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleEmployeeSelectedChanged}
      >
        <template slot="itemTemplate" render={renderEmployeeItem} />
      </oj-c-list-view>

      <div class="oj-sm-padding-4x-vertical">Recurring payments example</div>
      <oj-c-list-view
        id="listviewthree"
        aria-label="Available products"
        data={paymentDataProvider}
        gridlines={{ item: "visible", bottom: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
      >
        <template slot="itemTemplate" render={renderPaymentItem} />
      </oj-c-list-view>
    </div>
  );
};

export default ListItemLayoutTwoLinecorepack;
