import "css!./demo.css";
import "oj-c/badge";
import "oj-c/list-item-layout";
import "oj-c/list-view";
import type { CListViewElement } from "oj-c/list-view";
import "oj-c/selector";
import { KeySetImpl,type ImmutableKeySet } from "ojs/ojkeyset";
import { useMemo,useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

interface Person {
  id: string;
  image: string;
  initials: string;
  name: string;
}

interface Country {
  default: string;
  icon: string;
  id: string;
  meta: string;
}

type PersonItemContext = CListViewElement.ItemTemplateContext<Person["id"], Person>;
type PersonSelectedChangedEvent = CListViewElement.selectedChanged<Person["id"], Person>;
type CountryItemContext = CListViewElement.ItemTemplateContext<Country["id"], Country>;
type CountrySelectedChangedEvent = CListViewElement.selectedChanged<Country["id"], Country>;

const PEOPLE: Person[] = [
  {
    id: "id1",
    image: "/styles/images/listItemImages/placeholder-male-01.png",
    name: "Chris Black",
    initials: "CB"
  },
  {
    id: "id2",
    image: "/styles/images/listItemImages/placeholder-female-01.png",
    name: "Christine Cooper",
    initials: "CC"
  },
  {
    id: "id3",
    image: "/styles/images/listItemImages/placeholder-male-06.png",
    name: "Kurt Marchris",
    initials: "KM"
  }
];

const COUNTRIES: Country[] = [
  { id: "id1", icon: "oj-ux-flg-us", default: "United States of America", meta: "USD" },
  { id: "id2", icon: "oj-ux-flg-cn", default: "China", meta: "Yuan" },
  { id: "id3", icon: "oj-ux-flg-in", default: "India", meta: "Rupees" }
];

const renderOverviewItem: import("ojs/ojvcomponent").TemplateSlot<PersonItemContext> = (context) => (
  <oj-c-list-item-layout aria-label={`Details for ${context.data.name}`}>
    <oj-c-selector slot="selector" aria-label={`Select ${context.data.name}`} />
    <div slot="leading">
      <oj-c-badge label="Leading Slot" />
    </div>
    <div class="oj-typography-body-md">Default slot</div>
    <div slot="metadata" class="oj-typography-body-sm oj-text-color-secondary">
      Metadata slot
    </div>
  </oj-c-list-item-layout>
);

const renderCountryItem: import("ojs/ojvcomponent").TemplateSlot<CountryItemContext> = (context) => (
  <oj-c-list-item-layout aria-label={`Details for ${context.data.default}`}>
    <oj-c-selector slot="selector" aria-label={`Check box for ${context.data.meta}`} />
    <div slot="leading" class={`demo-image ${context.data.icon}`} aria-label="Country icon" role="img" />
    <div class="oj-typography-body-md">{context.data.default}</div>
    <div slot="metadata" class="oj-typography-body-sm oj-text-color-secondary">
      {context.data.meta}
    </div>
  </oj-c-list-item-layout>
);

export default function ListItemLayoutOneLinecorepack() {
  const [overviewSelectedItems, setOverviewSelectedItems] = useState<ImmutableKeySet<string>>(
    new KeySetImpl<string>()
  );
  const [countrySelectedItems, setCountrySelectedItems] = useState<ImmutableKeySet<string>>(
    new KeySetImpl<string>()
  );

  const peopleDataProvider = useMemo(
    () =>
      new ArrayDataProvider<Person["id"], Person>(PEOPLE, {
        keyAttributes: "id"
      }),
    []
  );
  const countryDataProvider = useMemo(
    () =>
      new ArrayDataProvider<Country["id"], Country>(COUNTRIES, {
        keyAttributes: "id"
      }),
    []
  );

  const handleOverviewSelectedChanged = (event: PersonSelectedChangedEvent) => {
    setOverviewSelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  const handleCountrySelectedChanged = (event: CountrySelectedChangedEvent) => {
    setCountrySelectedItems(event.detail.value ?? new KeySetImpl<string>());
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
        selected={overviewSelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleOverviewSelectedChanged}
      >
        <template slot="itemTemplate" render={renderOverviewItem} />
      </oj-c-list-view>

      <div class="oj-sm-padding-4x-vertical">Currency example</div>
      <oj-c-list-view
        id="listviewthree"
        aria-label="Available products"
        data={countryDataProvider}
        gridlines={{ item: "visible", bottom: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={countrySelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleCountrySelectedChanged}
      >
        <template slot="itemTemplate" render={renderCountryItem} />
      </oj-c-list-view>
    </div>
  );
};
