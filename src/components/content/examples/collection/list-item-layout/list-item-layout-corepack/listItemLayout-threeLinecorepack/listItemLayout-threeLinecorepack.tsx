import type { ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { KeySetImpl, type ImmutableKeySet } from "ojs/ojkeyset";
import type { CListViewElement } from "oj-c/list-view";
import "css!./demo.css";
import "oj-c/avatar";
import "oj-c/badge";
import "oj-c/list-item-layout";
import "oj-c/list-view";
import "oj-c/selector";

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

interface DocumentItem {
  company: string;
  date: string;
  id: string;
  name: string;
  type: "pdf" | "doc";
}

type AvatarBackground = NonNullable<ComponentProps<"oj-c-avatar">["background"]>;
type PersonItemContext = CListViewElement.ItemTemplateContext<Person["id"], Person>;
type PersonSelectedChangedEvent = CListViewElement.selectedChanged<Person["id"], Person>;
type EmployeeItemContext = CListViewElement.ItemTemplateContext<Employee["id"], Employee>;
type EmployeeSelectedChangedEvent = CListViewElement.selectedChanged<Employee["id"], Employee>;
type DocumentItemContext = CListViewElement.ItemTemplateContext<DocumentItem["id"], DocumentItem>;

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

const DOCUMENTS: DocumentItem[] = [
  {
    id: "id1",
    name: "Inspection Report",
    company: "Cadwell Inspection Agency",
    date: "01/20/2003",
    type: "pdf"
  },
  {
    id: "id2",
    name: "Waiver for Grant Street Garage",
    company: "City Council Office",
    date: "11/09/2004",
    type: "doc"
  },
  {
    id: "id3",
    name: "Patent Declaration (Signed Copy)",
    company: "City Patent Office",
    date: "03/18/2003",
    type: "pdf"
  }
];

const getIconBackground = (type: DocumentItem["type"]): AvatarBackground =>
  type === "pdf" ? "orange" : "teal";

const getIconClass = (type: DocumentItem["type"]) =>
  type === "pdf" ? "oj-ux-ico-file-pdf" : "oj-ux-ico-file-doc";

const renderOverviewItem = (context: PersonItemContext) => (
  <oj-c-list-item-layout aria-label={`Details for ${context.data.name}`}>
    <oj-c-selector slot="selector" aria-label={`Select ${context.data.name}`} />
    <div slot="leading" class="oj-typography-body-sm">
      <oj-c-badge label="Leading Slot" />
    </div>
    <div class="oj-typography-body-md">Default slot</div>
    <div slot="secondary" class="oj-typography-body-sm">
      Secondary slot
    </div>
    <div slot="tertiary" class="oj-typography-body-xs oj-text-color-secondary">
      Tertiary slot
    </div>
    <div slot="metadata" class="oj-typography-body-sm oj-text-color-secondary">
      Metadata slot
    </div>
  </oj-c-list-item-layout>
);

const renderEmployeeItem = (context: EmployeeItemContext) => (
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
      slot="tertiary"
      class="oj-typography-body-xs oj-text-color-secondary"
      aria-label={`Email ${context.data.email}`}
    >
      {context.data.email}
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

const renderDocumentItem = (context: DocumentItemContext) => (
  <oj-c-list-item-layout aria-label={`Details for ${context.data.company}`}>
    <oj-c-avatar
      slot="leading"
      background={getIconBackground(context.data.type)}
      size="xs"
      aria-label="Circular icon with type icon"
      iconClass={getIconClass(context.data.type)}
      shape="circle"
    />
    <div class="oj-typography-body-md" aria-label={`Name ${context.data.name}`}>
      {context.data.name}
    </div>
    <div slot="secondary" class="oj-typography-body-sm" aria-label={`Company ${context.data.company}`}>
      {context.data.company}
    </div>
    <div
      slot="tertiary"
      class="oj-typography-body-xs oj-text-color-secondary"
      aria-label={`Last modified on ${context.data.date}`}
    >
      {`Last modified on ${context.data.date}`}
    </div>
  </oj-c-list-item-layout>
);

export const ListItemLayoutThreeLinecorepack = () => {
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
  const documentDataProvider = useMemo(
    () =>
      new ArrayDataProvider<DocumentItem["id"], DocumentItem>(DOCUMENTS, {
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
      <div class="oj-sm-only-hide">
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
      </div>

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

      <div class="oj-sm-padding-4x-vertical">Document list example</div>
      <oj-c-list-view
        id="listviewthree"
        aria-label="Available documents"
        data={documentDataProvider}
        gridlines={{ item: "visible", bottom: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
      >
        <template slot="itemTemplate" render={renderDocumentItem} />
      </oj-c-list-view>
    </div>
  );
};

export default ListItemLayoutThreeLinecorepack;
