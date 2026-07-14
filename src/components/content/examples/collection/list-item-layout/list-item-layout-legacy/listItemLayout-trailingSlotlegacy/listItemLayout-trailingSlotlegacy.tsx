import "css!./demo.css";
import { KeySetImpl,type KeySet } from "ojs/ojkeyset";
import "ojs/ojlistitemlayout";
import "ojs/ojlistview";
import type { ojListView } from "ojs/ojlistview";
import "ojs/ojselector";
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

interface Activity {
  activity: string;
  id: string;
  status: string;
}

interface Product {
  id: string;
  image: string;
  model: string;
  name: string;
  status: string;
}

type ActivityItemContext = ojListView.ItemTemplateContext<Activity["id"], Activity>;
type ActivitySelectedChangedEvent = ojListView.selectedChanged<Activity["id"], Activity>;
type ProductItemContext = ojListView.ItemTemplateContext<Product["id"], Product>;
type SelectorSelectedKeysChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-selector">["onselectedKeysChanged"]>
>[0];
type SelectorSelectedKeysChangedHandler = NonNullable<
  ComponentProps<"oj-selector">["onselectedKeysChanged"]
>;

const ACTIVITIES: Activity[] = [
  { id: "id1", activity: "Content Creation", status: "Open" },
  { id: "id2", activity: "Consumer Behavior and Brand Strategy", status: "In Progress" },
  { id: "id3", activity: "Marketing Analysis, User Acquisition", status: "Completed" }
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

const renderOverviewItem = (
  context: ActivityItemContext,
  selectedItems: KeySet<string>,
  onSelectedKeysChanged: SelectorSelectedKeysChangedHandler
) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.activity}`}>
    <oj-selector
      slot="selector"
      aria-label={`Select ${context.data.activity}`}
      selectedKeys={selectedItems}
      onselectedKeysChanged={onSelectedKeysChanged}
      selectionMode="multiple"
      rowKey={context.data.id}
    />
    <div class="oj-typography-body-md">Default Slot</div>
    <div slot="trailing">
      <span class="oj-badge">Trailing Slot</span>
    </div>
  </oj-list-item-layout>
);

const renderActivityItem = (
  context: ActivityItemContext,
  selectedItems: KeySet<string>,
  onSelectedKeysChanged: SelectorSelectedKeysChangedHandler
) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.activity}`}>
    <oj-selector
      slot="selector"
      aria-label={`Select ${context.data.activity}`}
      selectedKeys={selectedItems}
      onselectedKeysChanged={onSelectedKeysChanged}
      selectionMode="multiple"
      rowKey={context.data.id}
    />
    <div class="oj-typography-body-md">{context.data.activity}</div>
    <div slot="trailing" class="oj-typography-body-sm" aria-label={`Status ${context.data.status}`}>
      <span class={getBadgeVariant(context.data.status)}>{context.data.status}</span>
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
    <div slot="trailing" class="oj-typography-body-sm">
      <img src={context.data.image} alt="Product" width={96} height={96} />
    </div>
  </oj-list-item-layout>
);

export const ListItemLayoutTrailingSlotlegacy = () => {
  const [overviewSelectedItems, setOverviewSelectedItems] = useState<KeySet<string>>(
    new KeySetImpl<string>()
  );
  const [activitySelectedItems, setActivitySelectedItems] = useState<KeySet<string>>(
    new KeySetImpl<string>()
  );

  const activityDataProvider = useMemo(
    () =>
      new ArrayDataProvider<Activity["id"], Activity>(ACTIVITIES, {
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

  const handleOverviewSelectedChanged = (event: ActivitySelectedChangedEvent) => {
    setOverviewSelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  const handleActivitySelectedChanged = (event: ActivitySelectedChangedEvent) => {
    setActivitySelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  const handleOverviewSelectorSelectedKeysChanged = (
    event: SelectorSelectedKeysChangedEvent
  ) => {
    setOverviewSelectedItems(
      (event.detail.value as KeySet<string> | null | undefined) ??
        new KeySetImpl<string>()
    );
  };

  const handleActivitySelectorSelectedKeysChanged = (
    event: SelectorSelectedKeysChangedEvent
  ) => {
    setActivitySelectedItems(
      (event.detail.value as KeySet<string> | null | undefined) ??
        new KeySetImpl<string>()
    );
  };

  const renderOverviewItemTemplate = (context: ActivityItemContext) =>
    renderOverviewItem(
      context,
      overviewSelectedItems,
      handleOverviewSelectorSelectedKeysChanged
    );

  const renderActivityItemTemplate = (context: ActivityItemContext) =>
    renderActivityItem(
      context,
      activitySelectedItems,
      handleActivitySelectorSelectedKeysChanged
    );

  return (
    <div id="listitemlayout">
      <div class="oj-sm-only-hide">
        <div class="oj-sm-padding-4x-vertical">This demo shows where the various slot contents go.</div>
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
          <template slot="itemTemplate" render={renderOverviewItemTemplate} />
        </oj-list-view>
      </div>

      <div class="oj-sm-padding-4x-vertical">This demo shows trailing slot having badges.</div>
      <oj-list-view
        id="listviewbadge"
        aria-label="Available activity"
        data={activityDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={activitySelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleActivitySelectedChanged}
      >
        <template slot="itemTemplate" render={renderActivityItemTemplate} />
      </oj-list-view>

      <div class="oj-sm-padding-4x-vertical">This demo shows trailing slot having images.</div>
      <oj-list-view
        id="listviewimage"
        aria-label="Available products"
        data={productDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
      >
        <template slot="itemTemplate" render={renderProductItem} />
      </oj-list-view>
    </div>
  );
};

export default ListItemLayoutTrailingSlotlegacy;
