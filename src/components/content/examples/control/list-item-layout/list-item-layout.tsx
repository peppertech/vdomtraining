import { h, ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojavatar";
import "ojs/ojbutton";
import "ojs/ojlistitemlayout";
import "ojs/ojlistview";
import "ojs/ojselector";
import "ojs/ojtoolbar";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySet, KeySetImpl } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";
import { SelectorElement } from "ojs/ojselector";
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
  const nameParts = person.name.split(" ");
  const initials = nameParts
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

type ListViewProps = ComponentProps<"oj-list-view">;

const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const emptySelection = <K extends string | number>() =>
  new KeySetImpl<K>([]) as KeySet<K>;

const ListItemLayoutDemo = () => {
  const [selectorSelectedItems, setSelectorSelectedItems] = useState<
    KeySet<Employee["id"]>
  >(emptySelection<Employee["id"]>());
  const [selectorSelectedItems1, setSelectorSelectedItems1] = useState<
    KeySet<Employee["id"]>
  >(emptySelection<Employee["id"]>());

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
    (event: ojListView.selectedChanged<Employee["id"], Employee>) => {
      setSelectorSelectedItems(event.detail.value as KeySet<Employee["id"]>);
    },
    [],
  );

  const handleEmployeeSelectionChanged = useCallback(
    (event: ojListView.selectedChanged<Employee["id"], Employee>) => {
      setSelectorSelectedItems1(event.detail.value as KeySet<Employee["id"]>);
    },
    [],
  );

  const handleOverviewSelectorChanged = useCallback(
    (event: SelectorElement.selectedKeysChanged<Employee["id"]>) => {
      setSelectorSelectedItems(event.detail.value as KeySet<Employee["id"]>);
    },
    [],
  );

  const handleEmployeeSelectorChanged = useCallback(
    (event: SelectorElement.selectedKeysChanged<Employee["id"]>) => {
      setSelectorSelectedItems1(event.detail.value as KeySet<Employee["id"]>);
    },
    [],
  );

  const renderOverviewItem = useCallback(
    (item: ojListView.ItemTemplateContext<Employee["id"], Employee>) => (
      <li>
        <oj-list-item-layout aria-label={`Details for ${item.data.name}`}>
          <oj-selector
            aria-label="selector"
            slot="selector"
            selectedKeys={selectorSelectedItems}
            onselectedKeysChanged={handleOverviewSelectorChanged}
            rowKey={item.data.id}
          ></oj-selector>
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
          <div
            slot="tertiary"
            class="oj-typography-body-xs oj-text-color-secondary"
          >
            Tertiary slot
          </div>
          <div
            slot="metadata"
            class="oj-typography-body-sm oj-text-color-secondary"
          >
            Metadata slot
          </div>
          <div slot="trailing" class="oj-typography-body-sm">
            <span class="oj-badge" style={{ minWidth: "7rem" }}>
              Trailing Slot
            </span>
          </div>
          <div slot="action">
            <oj-button
              chroming="outlined"
              class="oj-button-sm"
              id={`basicBtn${item.data.id}`}
            >
              Action Slot
            </oj-button>
          </div>
          <div
            slot="quaternary"
            class="oj-typography-body-sm oj-text-color-secondary"
          >
            Quaternary slot
          </div>
          <div
            slot="navigation"
            class="oj-typography-body-sm oj-text-color-secondary"
          >
            <a href="#">Navigation slot</a>
          </div>
        </oj-list-item-layout>
      </li>
    ),
    [handleOverviewSelectorChanged, selectorSelectedItems],
  );

  const renderEmployeeItem = useCallback(
    (item: ojListView.ItemTemplateContext<Employee["id"], Employee>) => (
      <li>
        <oj-list-item-layout aria-label={`Details for ${item.data.name}`}>
          <oj-selector
            aria-label={item.data.name}
            slot="selector"
            selectedKeys={selectorSelectedItems1}
            onselectedKeysChanged={handleEmployeeSelectorChanged}
            rowKey={item.data.id}
          ></oj-selector>
          <oj-avatar
            slot="leading"
            role="img"
            size="xs"
            initials={item.data.initials}
            src={item.data.image}
            aria-label={`Avatar of ${item.data.name}`}
            title={`Avatar of ${item.data.name}`}
          ></oj-avatar>
          <div
            aria-label={`name ${item.data.name}`}
            class="oj-typography-body-md oj-typography-bold"
          >
            {item.data.name}
          </div>
          <div
            aria-label={`designation ${item.data.position}`}
            slot="secondary"
            class="oj-typography-body-sm"
          >
            {item.data.position}
          </div>
          <div
            aria-label={`email id ${item.data.email}`}
            slot="tertiary"
            class="oj-typography-body-xs oj-text-color-secondary"
          >
            <div>{item.data.email}</div>
          </div>
          <div
            aria-label={`Joining Date ${item.data.startdate}`}
            slot="metadata"
            class="oj-typography-body-sm oj-text-color-secondary"
          >
            {item.data.startdate}
          </div>
        </oj-list-item-layout>
      </li>
    ),
    [handleEmployeeSelectorChanged, selectorSelectedItems1],
  );

  const renderProductItem = useCallback(
    (item: ojListView.ItemTemplateContext<Product["id"], Product>) => (
      <li>
        <oj-list-item-layout aria-label={`Details for ${item.data.name}`}>
          <div
            slot="overline"
            aria-label="Department Gardening"
            class="oj-typography-body-xs oj-text-color-secondary"
          >
            Gardening
          </div>
          <div
            class="oj-typography-body-md"
            aria-label={`Model Id ${item.data.model}`}
          >
            {item.data.model}
          </div>
          <div
            slot="secondary"
            aria-label={`Name ${item.data.name}`}
            class="oj-typography-body-sm oj-typography-semi-bold"
          >
            {item.data.name}
          </div>
          <div
            slot="tertiary"
            aria-label={`Status: ${item.data.status}`}
            class="oj-typography-body-xs"
          >
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
        </oj-list-item-layout>
      </li>
    ),
    [],
  );

  const renderActionItem = useCallback(
    (item: ojListView.ItemTemplateContext<Employee["id"], Employee>) => (
      <li>
        <oj-list-item-layout aria-label={`Details for ${item.data.name}`}>
          <oj-avatar
            slot="leading"
            role="img"
            size="xs"
            initials={item.data.initials}
            src={item.data.image}
            aria-label={`Avatar of ${item.data.name}`}
            title={`Avatar of ${item.data.name}`}
          ></oj-avatar>
          <div
            aria-label={`Name ${item.data.name}`}
            class="oj-typography-body-md oj-typography-bold"
          >
            {item.data.name}
          </div>
          <div
            slot="secondary"
            aria-label={`Department ${item.data.department}`}
            class="oj-typography-body-sm"
          >
            {item.data.department}
          </div>
          <div slot="action">
            <oj-toolbar
              id={`myToolbar1${item.data.id}`}
              aria-label="Toolbar"
              aria-controls="controlled"
              chroming="borderless"
            >
              <oj-button id={`save${item.data.id}`} display="icons" class="oj-button-sm">
                <span slot="startIcon" class="oj-ux-ico-save"></span>
                Save
              </oj-button>
              <oj-button
                id={`download${item.data.id}`}
                display="icons"
                class="oj-button-sm"
              >
                <span slot="startIcon" class="oj-ux-ico-download"></span>
                Download
              </oj-button>
              <oj-button id={`print${item.data.id}`} display="icons" class="oj-button-sm">
                <span slot="startIcon" class="oj-ux-ico-print"></span>
                Print
              </oj-button>
            </oj-toolbar>
          </div>
        </oj-list-item-layout>
      </li>
    ),
    [],
  );

  return (
    <div id="listitemlayout" class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-sm-padding-4x-vertical">
        This demo shows an overview of all of the possible slots.
      </div>
      <oj-list-view
        id="listviewone"
        aria-label="Example of all available slots"
        data={employeeDataProvider}
        gridlines={gridlines}
        class="oj-sm-padding-2x-vertical"
        selected={selectorSelectedItems}
        selectionMode="multiple"
        onselectedChanged={handleOverviewSelectionChanged}
      >
        <template slot="itemTemplate" render={renderOverviewItem}></template>
      </oj-list-view>

      <div class="oj-sm-padding-4x-vertical">
        Below are some of the best practices examples.
      </div>
      <div class="oj-sm-padding-2x-vertical">
        Three line sample with Leading, Selector and Metadata slots
      </div>
      <p>The sample below uses leading image.</p>
      <oj-list-view
        id="listviewtwo"
        aria-label="Employee information"
        data={employeeDataProvider}
        class="oj-sm-padding-2x-vertical"
        gridlines={gridlines}
        selected={selectorSelectedItems1}
        selectionMode="multiple"
        onselectedChanged={handleEmployeeSelectionChanged}
      >
        <template slot="itemTemplate" render={renderEmployeeItem}></template>
      </oj-list-view>

      <div class="oj-sm-padding-4x-vertical">
        Overline/Quaternary sample with Trailing slot and Navigation
      </div>
      <p>The sample below uses trailing image.</p>
      <oj-list-view
        id="listviewimage"
        aria-label="Available products"
        data={productDataProvider}
        gridlines={gridlines}
        class="oj-sm-padding-2x-vertical"
      >
        <template slot="itemTemplate" render={renderProductItem}></template>
      </oj-list-view>

      <div class="oj-sm-padding-4x-vertical">Action Slot sample with Toolbar</div>
      <p>
        The best practice is not to use selector as well as action slot on the same
        list item layout. The sample below uses just the action slot.
      </p>
      <oj-list-view
        id="listviewfour"
        aria-label="Employee information with action"
        data={employeeDataProvider}
        class="oj-sm-padding-2x-vertical"
        gridlines={gridlines}
      >
        <template slot="itemTemplate" render={renderActionItem}></template>
      </oj-list-view>
    </div>
  );
};

export default ListItemLayoutDemo;
