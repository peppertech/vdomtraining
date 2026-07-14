import "css!./demo.css";
import "ojs/ojavatar";
import "ojs/ojbutton";
import { KeySetImpl,type KeySet } from "ojs/ojkeyset";
import "ojs/ojlistitemlayout";
import "ojs/ojlistview";
import type { ojListView } from "ojs/ojlistview";
import "ojs/ojselector";
import "ojs/ojtoolbar";
import { useMemo,useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

interface Employee {
  department: string;
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

type EmployeeItemContext = ojListView.ItemTemplateContext<Employee["id"], Employee>;
type EmployeeSelectedChangedEvent = ojListView.selectedChanged<Employee["id"], Employee>;
type ProductItemContext = ojListView.ItemTemplateContext<Product["id"], Product>;

const EMPLOYEES: Employee[] = [
  {
    id: "id1",
    image: "/styles/images/listItemImages/placeholder-male-01.png",
    name: "Chris Black",
    position: "OCI GTM Channel Director EMEA",
    email: "cblack@email.com",
    phone: "(206) 334-9990",
    startdate: "2003",
    department: "Engineering"
  },
  {
    id: "id2",
    image: "/styles/images/listItemImages/placeholder-female-01.png",
    name: "Christine Cooper",
    position: "Senior Principal Escalation Manager",
    email: "ccopper@email.com",
    phone: "(324) 908-1287",
    startdate: "2004",
    department: "Global Support"
  },
  {
    id: "id3",
    image: "/styles/images/listItemImages/placeholder-male-06.png",
    name: "Kurt Marchris",
    position: "Customer Service Analyst",
    email: "kmarchris@email.com",
    phone: "(408) 788-5647",
    startdate: "2003",
    department: "Customer Support"
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

const renderOverviewItem = (context: EmployeeItemContext) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.name}`}>
    <oj-selector slot="selector" aria-label={`Select ${context.data.name}`} />
    <div slot="leading">
      <span class="oj-badge">Leading Slot</span>
    </div>
    <div slot="overline" class="oj-typography-body-xs oj-text-color-secondary oj-line-clamp-1">
      Overline slot truncates text if the text is too long like this.
    </div>
    <div class="oj-typography-body-md">
      Default slot can wrap text to the next line if the text is long like this.
    </div>
    <div slot="secondary" class="oj-typography-body-sm">
      Secondary slot will wrap itself if it needs to when the sentence gets long.
    </div>
    <div slot="tertiary" class="oj-typography-body-xs oj-text-color-secondary">
      Tertiary slot also will wrap itself if it needs to when the sentence gets long.
    </div>
    <div slot="metadata" class="oj-typography-body-sm oj-text-color-secondary">
      Metadata slot
    </div>
    <div slot="trailing">
      <span class="oj-badge">Trailing Slot</span>
    </div>
    <div slot="action">
      <oj-button label="Action Slot" class="oj-button-sm" />
    </div>
    <div slot="quaternary" class="oj-typography-body-sm oj-text-color-secondary">
      Quaternary slot
    </div>
    <div slot="navigation" class="oj-typography-body-sm oj-text-color-secondary">
      <a href="#">
        Navigation
      </a>
    </div>
  </oj-list-item-layout>
);

const renderEmployeeItem = (context: EmployeeItemContext) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.name}`}>
    <oj-selector slot="selector" aria-label={`Select ${context.data.name}`} />
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
      aria-label={`Joining date ${context.data.startdate}`}
    >
      {context.data.startdate}
    </div>
  </oj-list-item-layout>
);

const renderProductItem = (context: ProductItemContext) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.name}`}>
    <div
      slot="overline"
      class="oj-typography-body-xs oj-text-color-secondary"
      aria-label="Department Gardening"
    >
      Gardening
    </div>
    <div class="oj-typography-body-md" aria-label={`Model id ${context.data.model}`}>
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
    <div slot="trailing" class="oj-typography-body-sm">
      <img src={context.data.image} alt="Product" width={96} height={96} />
    </div>
    <div slot="navigation" class="oj-typography-body-sm">
      <a href="#">
        Add to cart
      </a>
    </div>
  </oj-list-item-layout>
);

const renderToolbarItem = (context: EmployeeItemContext) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.name}`}>
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
      aria-label={`Department ${context.data.department}`}
    >
      {context.data.department}
    </div>
    <div slot="action">
      <oj-toolbar aria-label="Toolbar">
        <oj-button id={`overviewSave${context.data.id}`} display="icons" class="oj-button-sm">
          <span slot="startIcon" class="oj-ux-ico-save" />
          Save
        </oj-button>
        <oj-button id={`overviewDownload${context.data.id}`} display="icons" class="oj-button-sm">
          <span slot="startIcon" class="oj-ux-ico-download" />
          Download
        </oj-button>
        <oj-button id={`overviewPrint${context.data.id}`} display="icons" class="oj-button-sm">
          <span slot="startIcon" class="oj-ux-ico-print" />
          Print
        </oj-button>
      </oj-toolbar>
    </div>
  </oj-list-item-layout>
);

export const ListItemLayoutOverviewlegacy = () => {
  const [overviewSelectedItems, setOverviewSelectedItems] = useState<KeySet<string>>(
    new KeySetImpl<string>()
  );
  const [employeeSelectedItems, setEmployeeSelectedItems] = useState<KeySet<string>>(
    new KeySetImpl<string>()
  );

  const employeeDataProvider = useMemo(
    () =>
      new ArrayDataProvider<Employee["id"], Employee>(EMPLOYEES, {
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

  const handleOverviewSelectedChanged = (event: EmployeeSelectedChangedEvent) => {
    setOverviewSelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  const handleEmployeeSelectedChanged = (event: EmployeeSelectedChangedEvent) => {
    setEmployeeSelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  return (
    <div id="listitemlayout">
      <div class="oj-sm-only-hide">
        <div class="oj-sm-padding-4x-vertical">This demo shows an overview of all of the possible slots.</div>
        <oj-list-view
          id="listviewone"
          aria-label="Example of all available slot"
          data={employeeDataProvider}
          gridlines={{ item: "visible" }}
          class="demo-list-view1 oj-sm-padding-2x-vertical"
          selected={overviewSelectedItems}
          selectionMode="multiple"
          onselectedChanged={handleOverviewSelectedChanged}
          item={{ enterKeyFocusBehavior: "focusWithin" }}
        >
          <template slot="itemTemplate" render={renderOverviewItem} />
        </oj-list-view>
      </div>

      <div class="oj-sm-padding-4x-vertical">Below are some of the best practices examples.</div>
      <div class="oj-sm-padding-2x-vertical">Three line sample with Leading, Selector and Metadata slots</div>
      <p>The sample below uses leading image.</p>
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
        <template slot="itemTemplate" render={renderEmployeeItem} />
      </oj-list-view>

      <div class="oj-sm-padding-4x-vertical">Overline/Quaternary sample with Trailing slot and Navigation</div>
      <p>The sample below uses trailing image.</p>
      <oj-list-view
        id="listviewimage"
        aria-label="Available products"
        data={productDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        item={{ enterKeyFocusBehavior: "focusWithin" }}
      >
        <template slot="itemTemplate" render={renderProductItem} />
      </oj-list-view>

      <div class="oj-sm-padding-4x-vertical">Action Slot sample with Toolbar</div>
      <p>
        The best practice is not to use selector as well as action slot on the same list item layout.
        The sample below uses just the action slot.
      </p>
      <oj-list-view
        id="listviewfour"
        aria-label="Employee information with action"
        data={employeeDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
      >
        <template slot="itemTemplate" render={renderToolbarItem} />
      </oj-list-view>
    </div>
  );
};

export default ListItemLayoutOverviewlegacy;
