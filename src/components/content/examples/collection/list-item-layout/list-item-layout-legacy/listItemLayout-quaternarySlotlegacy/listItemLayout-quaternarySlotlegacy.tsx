import "css!./demo.css";
import "ojs/ojlistitemlayout";
import "ojs/ojlistview";
import type { ojListView } from "ojs/ojlistview";
import { useMemo } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

interface Product {
  cost: string;
  id: string;
  image: string;
  model: string;
  name: string;
  status: string;
}

type ProductItemContext = ojListView.ItemTemplateContext<Product["id"], Product>;

const PRODUCTS: Product[] = [
  {
    id: "id1",
    image: "/styles/images/listItemImages/rake.png",
    model: "2351654564",
    name: "22-tine steel leaf rake",
    status: "Not available",
    cost: "$25.99"
  },
  {
    id: "id2",
    image: "/styles/images/listItemImages/shrubrake.png",
    model: "2351654297",
    name: "Collector series 8in, Poly Shrub Rake",
    status: "In Stock",
    cost: "$15.50"
  },
  {
    id: "id3",
    image: "/styles/images/listItemImages/specialtyrake.png",
    model: "2351654982",
    name: "15in, Adjustable Thatch Rake",
    status: "In Stock",
    cost: "$22.00"
  }
];

const renderOverviewItem = (context: ProductItemContext) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.name}`}>
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
    <div slot="trailing">
      <span class="oj-badge">Trailing Slot</span>
    </div>
    <div slot="quaternary" class="oj-typography-body-sm oj-text-color-secondary">
      Quaternary
    </div>
    <div slot="navigation" class="oj-typography-body-sm oj-text-color-secondary">
      <a href="#">
        Navigation
      </a>
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
    <div slot="quaternary" class="oj-typography-body-sm" aria-label={`Cost ${context.data.cost}`}>
      {context.data.cost}
    </div>
    <div slot="navigation" class="oj-typography-body-sm">
      <a href="#">
        Add to cart
      </a>
    </div>
  </oj-list-item-layout>
);

export default function ListItemLayoutQuaternarySlotlegacy() {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<Product["id"], Product>(PRODUCTS, {
        keyAttributes: "id"
      }),
    []
  );

  return (
    <div id="listitemlayout">
      <div class="oj-sm-only-hide">
        <div class="oj-sm-padding-4x-vertical">This demo shows where the various slot contents go.</div>
        <oj-list-view
          id="listviewone"
          aria-label="Example of all available slot"
          data={dataProvider}
          gridlines={{ item: "visible" }}
          class="demo-list-view oj-sm-padding-2x-vertical"
        >
          <template slot="itemTemplate" render={renderOverviewItem} />
        </oj-list-view>
      </div>

      <div class="oj-sm-padding-4x-vertical">Quaternary sample with Trailing slot and Navigation</div>
      <oj-list-view
        id="listviewimage"
        aria-label="Available products"
        data={dataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        item={{ enterKeyFocusBehavior: "focusWithin" }}
      >
        <template slot="itemTemplate" render={renderProductItem} />
      </oj-list-view>
    </div>
  );
};
