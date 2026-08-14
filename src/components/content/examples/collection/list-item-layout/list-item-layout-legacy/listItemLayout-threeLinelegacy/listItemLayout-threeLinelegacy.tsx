import "css!./demo.css";
import "ojs/ojavatar";
import { KeySetImpl,type KeySet } from "ojs/ojkeyset";
import "ojs/ojlistitemlayout";
import "ojs/ojlistview";
import type { ojListView } from "ojs/ojlistview";
import "ojs/ojselector";
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

interface DocumentItem {
  company: string;
  date: string;
  id: string;
  name: string;
  type: "pdf" | "doc";
}

type AvatarBackground = NonNullable<ComponentProps<"oj-avatar">["background"]>;
type PersonItemContext = ojListView.ItemTemplateContext<Person["id"], Person>;
type PersonSelectedChangedEvent = ojListView.selectedChanged<Person["id"], Person>;
type EmployeeItemContext = ojListView.ItemTemplateContext<Employee["id"], Employee>;
type EmployeeSelectedChangedEvent = ojListView.selectedChanged<Employee["id"], Employee>;
type DocumentItemContext = ojListView.ItemTemplateContext<DocumentItem["id"], DocumentItem>;
type SelectorSelectedKeysChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-selector">["onselectedKeysChanged"]>
>[0];
type SelectorSelectedKeysChangedHandler = NonNullable<
  ComponentProps<"oj-selector">["onselectedKeysChanged"]
>;

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

const renderOverviewItem = (
  context: PersonItemContext,
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
    <div slot="leading" class="oj-typography-body-sm">
      <span class="oj-badge">Leading Slot</span>
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
  </oj-list-item-layout>
);

const renderEmployeeItem = (
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
    <oj-avatar
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
  </oj-list-item-layout>
);

const renderDocumentItem = (context: DocumentItemContext) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.company}`}>
    <oj-avatar
      slot="leading"
      background={getIconBackground(context.data.type)}
      size="xs"
      aria-label="Circular icon with type icon"
      icon-class={getIconClass(context.data.type)}
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
  </oj-list-item-layout>
);

export default function ListItemLayoutThreeLinelegacy() {
  const [overviewSelectedItems, setOverviewSelectedItems] = useState<KeySet<string>>(
    new KeySetImpl<string>()
  );
  const [employeeSelectedItems, setEmployeeSelectedItems] = useState<KeySet<string>>(
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

  const renderOverviewItemTemplate = (context: PersonItemContext) =>
    renderOverviewItem(
      context,
      overviewSelectedItems,
      handleOverviewSelectorSelectedKeysChanged
    );

  const renderEmployeeItemTemplate = (context: EmployeeItemContext) =>
    renderEmployeeItem(
      context,
      employeeSelectedItems,
      handleEmployeeSelectorSelectedKeysChanged
    );

  return (
    <div id="listitemlayout">
      <div class="oj-sm-only-hide">
        <div class="oj-sm-padding-4x-vertical">This demo shows where the various slot contents go.</div>
        <oj-list-view
          id="listviewone"
          aria-label="Example of all available slot"
          data={overviewDataProvider}
          gridlines={{ item: "visible" }}
          class="demo-list-view oj-sm-padding-2x-vertical"
          selected={overviewSelectedItems}
          selectionMode="multiple"
          onselectedChanged={handleOverviewSelectedChanged}
        >
          <template slot="itemTemplate" render={renderOverviewItemTemplate} />
        </oj-list-view>
      </div>

      <div class="oj-sm-padding-4x-vertical">Employee list example</div>
      <oj-list-view
        id="listviewtwo"
        aria-label="Employee information"
        data={employeeDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={employeeSelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleEmployeeSelectedChanged}
      >
        <template slot="itemTemplate" render={renderEmployeeItemTemplate} />
      </oj-list-view>

      <div class="oj-sm-padding-4x-vertical">Document list example</div>
      <oj-list-view
        id="listviewthree"
        aria-label="Available documents"
        data={documentDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
      >
        <template slot="itemTemplate" render={renderDocumentItem} />
      </oj-list-view>
    </div>
  );
};
