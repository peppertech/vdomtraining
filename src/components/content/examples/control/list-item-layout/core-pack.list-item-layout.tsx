import { h, ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/avatar";
import "oj-c/button";
import "oj-c/list-item-layout";
import "oj-c/list-view";
import "oj-c/selector";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { ImmutableKeySet, KeySetImpl } from "ojs/ojkeyset";
import { CListViewElement } from "oj-c/list-view";
import * as peopleData from "text!../../collection/data/peopleData.json";

type BasePerson = {
  id: number;
  name: string;
  title: string;
  image: string;
  department: string;
};

type Employee = BasePerson & {
  initials: string;
  position: string;
  email: string;
  startdate: string;
};

type Product = {
  id: number;
  model: string;
  name: string;
  status: string;
  image: string;
};

const people = JSON.parse(peopleData as string) as BasePerson[];

const startDates = [
  "January 12, 2020",
  "March 03, 2021",
  "July 18, 2019",
  "September 24, 2022",
  "February 11, 2018",
  "May 29, 2023",
  "August 14, 2021",
];

const employees: Employee[] = people.map((person, index) => {
  const initials = person.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return {
    ...person,
    initials,
    position: person.title,
    email: `${person.name.toLowerCase().replace(/[^a-z0-9]+/g, ".")}@oracle.com`,
    startdate: startDates[index % startDates.length],
  };
});

const products: Product[] = [
  {
    id: 1,
    model: "GB-1200",
    name: "Garden Hose Reel",
    status: "In Stock",
    image: "images/formControls/distribution.jpg",
  },
  {
    id: 2,
    model: "PR-440",
    name: "Pruning Shears",
    status: "Low Stock",
    image: "images/formControls/education.jpg",
  },
  {
    id: 3,
    model: "SP-980",
    name: "Sprinkler Pro",
    status: "Back Ordered",
    image: "images/formControls/travel.jpg",
  },
];

type ListViewProps = ComponentProps<"oj-c-list-view">;

const gridlines: ListViewProps["gridlines"] = { item: "visible" };

const emptySelection = <K extends string | number>() =>
  new KeySetImpl<K>([]) as ImmutableKeySet<K>;

const CorePackListItemLayoutDemo = () => {
  const [overviewSelection, setOverviewSelection] = useState<
    ImmutableKeySet<Employee["id"]>
  >(() => emptySelection<Employee["id"]>());
  const [employeeSelection, setEmployeeSelection] = useState<
    ImmutableKeySet<Employee["id"]>
  >(() => emptySelection<Employee["id"]>());

  const employeeDataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<Employee["id"], Employee>(employees, {
        keyAttributes: "id",
      }),
    [],
  );

  const productDataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<Product["id"], Product>(products, {
        keyAttributes: "id",
      }),
    [],
  );

  const handleOverviewSelectionChanged = useCallback(
    (event: Parameters<NonNullable<ListViewProps["onselectedChanged"]>>[0]) => {
      setOverviewSelection(event.detail.value as ImmutableKeySet<Employee["id"]>);
    },
    [],
  );

  const handleEmployeeSelectionChanged = useCallback(
    (event: Parameters<NonNullable<ListViewProps["onselectedChanged"]>>[0]) => {
      setEmployeeSelection(event.detail.value as ImmutableKeySet<Employee["id"]>);
    },
    [],
  );

  const renderOverviewItem = useCallback(
    (
      item: CListViewElement.ItemTemplateContext<Employee["id"], Employee>,
    ) => (
      <oj-c-list-item-layout aria-label={`Details for ${item.data.name}`}>
        <oj-c-selector slot="selector" aria-label="selector"></oj-c-selector>
        <div slot="leading" class="oj-typography-body-sm">
          <span class="oj-badge" style={{ minWidth: "7rem" }}>
            Leading Slot
          </span>
        </div>
        <div
          slot="overline"
          class="oj-typography-body-xs oj-text-color-secondary oj-line-clamp-1"
        >
          Overline slot has a long sentence that truncates
        </div>
        <div class="oj-typography-body-md">
          Default slot also has a long text but it wraps.
        </div>
        <div slot="secondary" class="oj-typography-body-sm">
          Secondary slot
        </div>
        <div slot="tertiary" class="oj-typography-body-xs oj-text-color-secondary">
          Tertiary slot
        </div>
        <div slot="metadata" class="oj-typography-body-sm oj-text-color-secondary">
          Metadata slot
        </div>
        <div slot="trailing" class="oj-typography-body-sm">
          <span class="oj-badge" style={{ minWidth: "7rem" }}>
            Trailing Slot
          </span>
        </div>
        <div slot="action">
          <oj-c-button
            id={`corePackBasicBtn${item.data.id}`}
            size="sm"
            chroming="outlined"
            label="Action Slot"
          ></oj-c-button>
        </div>
        <div slot="quaternary" class="oj-typography-body-sm oj-text-color-secondary">
          Quaternary slot
        </div>
        <div slot="navigation" class="oj-typography-body-sm oj-text-color-secondary">
          <a href="#">Navigation slot</a>
        </div>
      </oj-c-list-item-layout>
    ),
    [],
  );

  const renderEmployeeItem = useCallback(
    (
      item: CListViewElement.ItemTemplateContext<Employee["id"], Employee>,
    ) => (
      <oj-c-list-item-layout aria-label={`Details for ${item.data.name}`}>
        <oj-c-selector
          slot="selector"
          aria-label={item.data.name}
        ></oj-c-selector>
        <oj-c-avatar
          slot="leading"
          size="xs"
          src={item.data.image}
          title={`Avatar of ${item.data.name}`}
        ></oj-c-avatar>
        <div class="oj-typography-body-md oj-typography-bold">{item.data.name}</div>
        <div slot="secondary" class="oj-typography-body-sm">
          {item.data.position}
        </div>
        <div slot="tertiary" class="oj-typography-body-xs oj-text-color-secondary">
          {item.data.email}
        </div>
        <div slot="metadata" class="oj-typography-body-sm oj-text-color-secondary">
          {item.data.startdate}
        </div>
      </oj-c-list-item-layout>
    ),
    [],
  );

  const renderProductItem = useCallback(
    (item: CListViewElement.ItemTemplateContext<Product["id"], Product>) => (
      <oj-c-list-item-layout
        aria-label={`Details for ${item.data.name}`}
        verticalAlignment="top"
      >
        <div slot="overline" class="oj-typography-body-xs oj-text-color-secondary">
          Gardening
        </div>
        <div class="oj-typography-body-md">{item.data.model}</div>
        <div slot="secondary" class="oj-typography-body-sm oj-typography-semi-bold">
          {item.data.name}
        </div>
        <div slot="tertiary" class="oj-typography-body-xs">
          {item.data.status}
        </div>
        <div slot="trailing" class="oj-typography-body-sm">
          <img
            src={item.data.image}
            alt="trailing image"
            width="96"
            height="96"
          />
        </div>
        <div slot="navigation" class="oj-typography-body-sm">
          <a href="#">Add to cart</a>
        </div>
      </oj-c-list-item-layout>
    ),
    [],
  );

  const renderActionItem = useCallback(
    (
      item: CListViewElement.ItemTemplateContext<Employee["id"], Employee>,
    ) => (
      <oj-c-list-item-layout aria-label={`Details for ${item.data.name}`}>
        <oj-c-avatar
          slot="leading"
          size="xs"
          src={item.data.image}
          title={`Avatar of ${item.data.name}`}
        ></oj-c-avatar>
        <div class="oj-typography-body-md oj-typography-bold">{item.data.name}</div>
        <div slot="secondary" class="oj-typography-body-sm">
          {item.data.department}
        </div>
        <div slot="action" class="oj-flex oj-sm-flex-wrap-nowrap">
          <oj-c-button
            id={`save-${item.data.id}`}
            size="sm"
            chroming="borderless"
            display="icons"
          >
            <span slot="startIcon" class="oj-ux-ico-save"></span>
            Save
          </oj-c-button>
          <oj-c-button
            id={`download-${item.data.id}`}
            size="sm"
            chroming="borderless"
            display="icons"
          >
            <span slot="startIcon" class="oj-ux-ico-download"></span>
            Download
          </oj-c-button>
          <oj-c-button
            id={`print-${item.data.id}`}
            size="sm"
            chroming="borderless"
            display="icons"
          >
            <span slot="startIcon" class="oj-ux-ico-print"></span>
            Print
          </oj-c-button>
        </div>
      </oj-c-list-item-layout>
    ),
    [],
  );

  return (
    <div
      id="core-pack-listitemlayout"
      class="oj-web-applayout-max-width oj-web-applayout-content"
    >
      <div class="oj-sm-padding-4x-vertical">
        This demo shows an overview of all of the possible slots.
      </div>
      <oj-c-list-view
        id="core-pack-listviewone"
        aria-label="Example of all available slots"
        data={employeeDataProvider}
        gridlines={gridlines}
        class="oj-sm-padding-2x-vertical"
        selected={overviewSelection}
        selectionMode="multiple"
        onselectedChanged={handleOverviewSelectionChanged}
      >
        <template slot="itemTemplate" render={renderOverviewItem}></template>
      </oj-c-list-view>

      <div class="oj-sm-padding-4x-vertical">
        Below are some of the best practices examples.
      </div>
      <div class="oj-sm-padding-2x-vertical">
        Three line sample with Leading, Selector and Metadata slots
      </div>
      <p>The sample below uses leading image.</p>
      <oj-c-list-view
        id="core-pack-listviewtwo"
        aria-label="Employee information"
        data={employeeDataProvider}
        class="oj-sm-padding-2x-vertical"
        gridlines={gridlines}
        selected={employeeSelection}
        selectionMode="multiple"
        onselectedChanged={handleEmployeeSelectionChanged}
      >
        <template slot="itemTemplate" render={renderEmployeeItem}></template>
      </oj-c-list-view>

      <div class="oj-sm-padding-4x-vertical">
        Overline/Quaternary sample with Trailing slot and Navigation
      </div>
      <p>The sample below uses trailing image.</p>
      <oj-c-list-view
        id="core-pack-listviewimage"
        aria-label="Available products"
        data={productDataProvider}
        gridlines={gridlines}
        class="oj-sm-padding-2x-vertical"
      >
        <template slot="itemTemplate" render={renderProductItem}></template>
      </oj-c-list-view>

      <div class="oj-sm-padding-4x-vertical">Action Slot sample with buttons</div>
      <p>
        The best practice is not to use selector as well as action slot on the same
        list item layout. The sample below uses just the action slot.
      </p>
      <oj-c-list-view
        id="core-pack-listviewfour"
        aria-label="Employee information with action"
        data={employeeDataProvider}
        class="oj-sm-padding-2x-vertical"
        gridlines={gridlines}
      >
        <template slot="itemTemplate" render={renderActionItem}></template>
      </oj-c-list-view>
    </div>
  );
};

export default CorePackListItemLayoutDemo;
