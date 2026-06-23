import type { ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { KeySetImpl, type KeySet } from "ojs/ojkeyset";
import type { ojListView } from "ojs/ojlistview";
import "css!./demo.css";
import "ojs/ojlistitemlayout";
import "ojs/ojlistview";
import "ojs/ojselector";

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

type PersonItemContext = ojListView.ItemTemplateContext<Person["id"], Person>;
type PersonSelectedChangedEvent = ojListView.selectedChanged<Person["id"], Person>;
type CountryItemContext = ojListView.ItemTemplateContext<Country["id"], Country>;
type CountrySelectedChangedEvent = ojListView.selectedChanged<Country["id"], Country>;
type SelectorSelectedKeysChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-selector">["onselectedKeysChanged"]>
>[0];
type SelectorSelectedKeysChangedHandler = NonNullable<
  ComponentProps<"oj-selector">["onselectedKeysChanged"]
>;

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
    <div slot="leading">
      <span class="oj-badge">Leading Slot</span>
    </div>
    <div class="oj-typography-body-md">Default slot</div>
    <div slot="metadata" class="oj-typography-body-sm oj-text-color-secondary">
      Metadata slot
    </div>
  </oj-list-item-layout>
);

const renderCountryItem = (
  context: CountryItemContext,
  selectedItems: KeySet<string>,
  onSelectedKeysChanged: SelectorSelectedKeysChangedHandler
) => (
  <oj-list-item-layout aria-label={`Details for ${context.data.default}`}>
    <oj-selector
      slot="selector"
      aria-label={`Check box for ${context.data.meta}`}
      selectedKeys={selectedItems}
      onselectedKeysChanged={onSelectedKeysChanged}
      selectionMode="multiple"
      rowKey={context.data.id}
    />
    <div slot="leading" class={`demo-image ${context.data.icon}`} aria-label="Country icon" role="img" />
    <div class="oj-typography-body-md">{context.data.default}</div>
    <div slot="metadata" class="oj-typography-body-sm oj-text-color-secondary">
      {context.data.meta}
    </div>
  </oj-list-item-layout>
);

export const ListItemLayoutOneLinelegacy = () => {
  const [overviewSelectedItems, setOverviewSelectedItems] = useState<KeySet<string>>(
    new KeySetImpl<string>()
  );
  const [countrySelectedItems, setCountrySelectedItems] = useState<KeySet<string>>(
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

  const handleOverviewSelectorSelectedKeysChanged = (
    event: SelectorSelectedKeysChangedEvent
  ) => {
    setOverviewSelectedItems(
      (event.detail.value as KeySet<string> | null | undefined) ??
        new KeySetImpl<string>()
    );
  };

  const handleCountrySelectorSelectedKeysChanged = (
    event: SelectorSelectedKeysChangedEvent
  ) => {
    setCountrySelectedItems(
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

  const renderCountryItemTemplate = (context: CountryItemContext) =>
    renderCountryItem(
      context,
      countrySelectedItems,
      handleCountrySelectorSelectedKeysChanged
    );

  return (
    <div id="listitemlayout">
      <div class="oj-sm-padding-4x-vertical">This demo shows where the various slot contents go.</div>
      <oj-list-view
        id="listviewone"
        aria-label="Example of all available slot"
        data={peopleDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={overviewSelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleOverviewSelectedChanged}
      >
        <template slot="itemTemplate" render={renderOverviewItemTemplate} />
      </oj-list-view>

      <div class="oj-sm-padding-4x-vertical">Currency example</div>
      <oj-list-view
        id="listviewthree"
        aria-label="Available products"
        data={countryDataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view oj-sm-padding-2x-vertical"
        selected={countrySelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleCountrySelectedChanged}
      >
        <template slot="itemTemplate" render={renderCountryItemTemplate} />
      </oj-list-view>
    </div>
  );
};

export default ListItemLayoutOneLinelegacy;
