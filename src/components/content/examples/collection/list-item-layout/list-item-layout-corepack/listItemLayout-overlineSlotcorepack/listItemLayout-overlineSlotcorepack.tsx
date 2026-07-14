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

interface DocumentItem {
  company: string;
  date: string;
  department: string;
  id: string;
  name: string;
  type: "pdf" | "doc";
}

type AvatarBackground = NonNullable<ComponentProps<"oj-c-avatar">["background"]>;
type PersonItemContext = CListViewElement.ItemTemplateContext<Person["id"], Person>;
type DocumentItemContext = CListViewElement.ItemTemplateContext<DocumentItem["id"], DocumentItem>;
type PersonSelectedChangedEvent = CListViewElement.selectedChanged<Person["id"], Person>;

const PEOPLE: Person[] = [
  { id: "id1", image: "/styles/images/listItemImages/placeholder-male-01.png", name: "Chris Black", initials: "CB" },
  { id: "id2", image: "/styles/images/listItemImages/placeholder-female-01.png", name: "Christine Cooper", initials: "CC" },
  { id: "id3", image: "/styles/images/listItemImages/placeholder-male-06.png", name: "Kurt Marchris", initials: "KM" }
];

const DOCUMENTS: DocumentItem[] = [
  {
    id: "id1",
    name: "Inspection Report",
    company: "Cadwell Inspection Agency",
    date: "01/20/2003",
    type: "pdf",
    department: "Public Works Dept."
  },
  {
    id: "id2",
    name: "Waiver for Grant Street Garage",
    company: "City Council Office",
    date: "11/09/2004",
    type: "doc",
    department: "Parking and Transportation Dept."
  },
  {
    id: "id3",
    name: "Patent Declaration (Signed Copy)",
    company: "City Patent Office",
    date: "03/18/2003",
    type: "pdf",
    department: "Department of Commerce"
  }
];

const getIconBackground = (type: DocumentItem["type"]): AvatarBackground =>
  type === "pdf" ? "pink" : "teal";

const getIconClass = (type: DocumentItem["type"]) =>
  type === "pdf" ? "oj-ux-ico-file-pdf" : "oj-ux-ico-file-doc";

const renderOverviewItem = (context: PersonItemContext) => (
  <oj-c-list-item-layout aria-label={`Details for ${context.data.name}`}>
    <oj-c-selector slot="selector" aria-label={`Select ${context.data.name}`} />
    <div slot="leading">
      <oj-c-badge label="Leading Slot" />
    </div>
    <div slot="overline" class="oj-typography-body-xs oj-text-color-secondary">
      Overline slot
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

const renderDocumentItem = (context: DocumentItemContext) => (
  <oj-c-list-item-layout aria-label={`Details for ${context.data.name}`}>
    <oj-c-avatar
      slot="leading"
      background={getIconBackground(context.data.type)}
      size="xs"
      aria-label="Circular icon with type icon"
      iconClass={getIconClass(context.data.type)}
      shape="circle"
    />
    <div
      slot="overline"
      class="oj-typography-body-xs oj-text-color-secondary"
      aria-label={`Department ${context.data.department}`}
    >
      {context.data.department}
    </div>
    <div class="oj-typography-body-md" aria-label={`Name ${context.data.name}`}>
      {context.data.name}
    </div>
    <div slot="secondary" class="oj-typography-body-sm" aria-label={`Company ${context.data.company}`}>
      {context.data.company}
    </div>
    <div slot="tertiary" class="oj-typography-body-xs oj-text-color-secondary">
      {`Last modified on ${context.data.date}`}
    </div>
  </oj-c-list-item-layout>
);

export const ListItemLayoutOverlineSlotcorepack = () => {
  const [selectedItems, setSelectedItems] = useState<ImmutableKeySet<string>>(new KeySetImpl<string>());

  const peopleDataProvider = useMemo(
    () =>
      new ArrayDataProvider<Person["id"], Person>(PEOPLE, {
        keyAttributes: "id"
      }),
    []
  );
  const documentsDataProvider = useMemo(
    () =>
      new ArrayDataProvider<DocumentItem["id"], DocumentItem>(DOCUMENTS, {
        keyAttributes: "id"
      }),
    []
  );

  const handleSelectedChanged = (event: PersonSelectedChangedEvent) => {
    setSelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  return (
    <div id="listitemlayout">
      <div class="oj-sm-padding-4x-vertical">This demo shows where the various slot contents go.</div>
      <oj-c-list-view
        id="listviewone"
        aria-label="Example of all available slot"
        data={peopleDataProvider}
        gridlines={{ item: "visible", bottom: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={selectedItems}
        selectionMode="multiple"
        onselectedChanged={handleSelectedChanged}
      >
        <template slot="itemTemplate" render={renderOverviewItem} />
      </oj-c-list-view>

      <div class="oj-sm-padding-4x-vertical">Document list example</div>
      <oj-c-list-view
        id="listviewthree"
        aria-label="Document list"
        data={documentsDataProvider}
        gridlines={{ item: "visible", bottom: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
      >
        <template slot="itemTemplate" render={renderDocumentItem} />
      </oj-c-list-view>
    </div>
  );
};

export default ListItemLayoutOverlineSlotcorepack;
