import type { ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { KeySetImpl, type KeySet } from "ojs/ojkeyset";
import type { ojListView } from "ojs/ojlistview";
import "css!./demo.css";
import "ojs/ojavatar";
import "ojs/ojlistitemlayout";
import "ojs/ojlistview";
import "ojs/ojselector";

interface Activity {
  activity: string;
  id: string;
  status: "Open" | "In Progress" | "Completed";
}

interface Person {
  email: string;
  id: string;
  image: string;
  name: string;
  phone: string;
  position: string;
  startdate: string;
}

interface Product {
  id: string;
  image: string;
  model: string;
  name: string;
  status: string;
}

interface DocumentItem {
  company: string;
  date: string;
  id: string;
  name: string;
  type: "pdf" | "doc";
}

type AvatarBackground = NonNullable<ComponentProps<"oj-avatar">["background"]>;
type ActivityItemContext = ojListView.ItemTemplateContext<Activity["id"], Activity>;
type ActivitySelectedChangedEvent = ojListView.selectedChanged<Activity["id"], Activity>;
type PersonItemContext = ojListView.ItemTemplateContext<Person["id"], Person>;
type PersonSelectedChangedEvent = ojListView.selectedChanged<Person["id"], Person>;
type ProductItemContext = ojListView.ItemTemplateContext<Product["id"], Product>;
type DocumentItemContext = ojListView.ItemTemplateContext<DocumentItem["id"], DocumentItem>;

const ACTIVITIES: Activity[] = [
  { id: "id1", activity: "Content Creation", status: "Open" },
  { id: "id2", activity: "Consumer Behavior and Brand Strategy", status: "In Progress" },
  { id: "id3", activity: "Marketing Analysis, User Acquisition", status: "Completed" }
];

const PEOPLE: Person[] = [
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

const PRODUCTS: Product[] = [
  {
    id: "id1",
    image: "/styles/images/listItemImages/rake.png",
    model: "2351654564",
    name: "22-tine steel leaf rake",
    status: "Not available"
  },
  {
    id: "id2",
    image: "/styles/images/listItemImages/shrubrake.png",
    model: "2351654297",
    name: "Collector series 8in, Poly Shrub Rake",
    status: "In Stock"
  },
  {
    id: "id3",
    image: "/styles/images/listItemImages/specialtyrake.png",
    model: "2351654982",
    name: "15in, Adjustable Thatch Rake",
    status: "In Stock"
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

const getBadgeVariant = (status: Activity["status"]) => {
  switch (status) {
    case "Open":
      return "oj-badge oj-badge-warning";
    case "In Progress":
      return "oj-badge oj-badge-info";
    case "Completed":
      return "oj-badge oj-badge-success";
    default:
      return "oj-badge";
  }
};

const getIconBackground = (type: DocumentItem["type"]): AvatarBackground =>
  type === "pdf" ? "purple" : "teal";

const getIconClass = (type: DocumentItem["type"]) =>
  type === "pdf" ? "oj-ux-ico-file-pdf" : "oj-ux-ico-file-doc";

const renderOverviewItem = (context: ActivityItemContext) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.activity}`}>
    <oj-selector slot="selector" aria-label={`Select ${context.data.activity}`} />
    <div slot="leading">
      <span class="oj-badge">Leading Slot</span>
    </div>
    <div class="oj-typography-body-md">Default Slot</div>
  </oj-list-item-layout>
);

const renderActivityItem = (context: ActivityItemContext) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.activity}`}>
    <oj-selector slot="selector" aria-label={`Select ${context.data.activity}`} />
    <div
      slot="leading"
      class="oj-typography-body-sm demo-badge-width"
      aria-label={`Status ${context.data.status}`}
    >
      <span class={getBadgeVariant(context.data.status)}>{context.data.status}</span>
    </div>
    <div class="oj-typography-body-md" aria-label={`Activity ${context.data.activity}`}>
      {context.data.activity}
    </div>
  </oj-list-item-layout>
);

const renderPersonItem = (context: PersonItemContext) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.name}`}>
    <oj-selector slot="selector" aria-label={`Select ${context.data.name}`} />
    <oj-avatar
      slot="leading"
      size="xs"
      src={context.data.image}
      aria-label={`Avatar of ${context.data.name}`}
      title={`Avatar of ${context.data.name}`}
    />
    <div class="oj-typography-body-md oj-typography-bold">{context.data.name}</div>
  </oj-list-item-layout>
);

const renderProductItem = (context: ProductItemContext) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.name}`}>
    <div slot="leading" class="oj-typography-body-sm">
      <img src={context.data.image} alt="Product" width={96} height={96} />
    </div>
    <div
      slot="overline"
      class="oj-typography-body-xs oj-text-color-secondary"
      aria-label="Department Gardening"
    >
      Gardening
    </div>
    <div class="oj-typography-body-md" aria-label={`Model ${context.data.model}`}>
      {context.data.model}
    </div>
    <div
      slot="secondary"
      class="oj-typography-body-sm oj-typography-semi-bold"
      aria-label={`Name ${context.data.name}`}
    >
      {context.data.name}
    </div>
    <div slot="tertiary" class="oj-typography-body-xs" aria-label={`Status ${context.data.status}`}>
      {context.data.status}
    </div>
  </oj-list-item-layout>
);

const renderDocumentItem = (context: DocumentItemContext) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.company}`}>
    <oj-avatar
      slot="leading"
      size="xs"
      background={getIconBackground(context.data.type)}
      aria-label="Circular icon with type icon"
      icon-class={getIconClass(context.data.type)}
      shape="circle"
    />
    <div class="oj-typography-body-md" aria-label={`Name ${context.data.name}`}>
      {context.data.name}
    </div>
  </oj-list-item-layout>
);

export const ListItemLayoutLeadingSlotlegacy = () => {
  const [overviewSelectedItems, setOverviewSelectedItems] = useState<KeySet<string>>(
    new KeySetImpl<string>()
  );
  const [activitySelectedItems, setActivitySelectedItems] = useState<KeySet<string>>(
    new KeySetImpl<string>()
  );
  const [personSelectedItems, setPersonSelectedItems] = useState<KeySet<string>>(
    new KeySetImpl<string>()
  );

  const activityDataProvider = useMemo(
    () =>
      new ArrayDataProvider<Activity["id"], Activity>(ACTIVITIES, {
        keyAttributes: "id"
      }),
    []
  );
  const personDataProvider = useMemo(
    () =>
      new ArrayDataProvider<Person["id"], Person>(PEOPLE, {
        keyAttributes: "id"
      }),
    []
  );
  const productDataProvider = useMemo(
    () =>
      new ArrayDataProvider<Product["id"], Product>(PRODUCTS, {
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

  const handleOverviewSelectedChanged = (event: ActivitySelectedChangedEvent) => {
    setOverviewSelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  const handleActivitySelectedChanged = (event: ActivitySelectedChangedEvent) => {
    setActivitySelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  const handlePersonSelectedChanged = (event: PersonSelectedChangedEvent) => {
    setPersonSelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  return (
    <div id="listitemlayout">
      <div class="oj-sm-only-hide">
        <div class="oj-sm-padding-4x-vertical">This demo shows where the leading slot contents go.</div>
        <oj-list-view
          id="listviewone"
          aria-label="Example of all available slot"
          data={activityDataProvider}
          gridlines={{ item: "visible" }}
          class="demo-list-view oj-sm-padding-2x-vertical"
          selected={overviewSelectedItems}
          selectionMode="multiple"
          onselectedChanged={handleOverviewSelectedChanged}
        >
          <template slot="itemTemplate" render={renderOverviewItem} />
        </oj-list-view>
      </div>

      <div class="oj-sm-padding-4x-vertical">The demo shows Leading slot with badges.</div>
      <oj-list-view
        id="listviewbadge"
        aria-label="Employee information"
        data={activityDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={activitySelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleActivitySelectedChanged}
      >
        <template slot="itemTemplate" render={renderActivityItem} />
      </oj-list-view>

      <div class="oj-sm-padding-4x-vertical">The demo shows Leading slot with Avatar</div>
      <oj-list-view
        id="listviewicon"
        aria-label="Employee information with actions"
        data={personDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={personSelectedItems}
        selectionMode="multiple"
        onselectedChanged={handlePersonSelectedChanged}
      >
        <template slot="itemTemplate" render={renderPersonItem} />
      </oj-list-view>

      <div class="oj-sm-padding-4x-vertical">This demo shows leading slot having images.</div>
      <oj-list-view
        id="listviewimage2"
        aria-label="Available products"
        data={productDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
      >
        <template slot="itemTemplate" render={renderProductItem} />
      </oj-list-view>

      <div class="oj-sm-padding-4x-vertical">The demo shows Leading slot with Icon-based Avatar</div>
      <oj-list-view
        id="listviewicon2"
        aria-label="Employee information with actions"
        data={documentDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
      >
        <template slot="itemTemplate" render={renderDocumentItem} />
      </oj-list-view>
    </div>
  );
};

export default ListItemLayoutLeadingSlotlegacy;
