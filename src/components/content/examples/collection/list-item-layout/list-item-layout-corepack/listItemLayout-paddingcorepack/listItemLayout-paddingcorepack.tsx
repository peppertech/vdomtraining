import "css!./demo.css";
import "oj-c/badge";
import "oj-c/button";
import "oj-c/list-item-layout";
import "oj-c/list-view";
import type { CListViewElement } from "oj-c/list-view";
import "oj-c/selector";
import { KeySetImpl,type ImmutableKeySet } from "ojs/ojkeyset";
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

type EmployeeItemContext = CListViewElement.ItemTemplateContext<Employee["id"], Employee>;
type EmployeeSelectedChangedEvent = CListViewElement.selectedChanged<Employee["id"], Employee>;

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

const renderItem = (context: EmployeeItemContext) => (
  <oj-c-list-item-layout aria-label={`Details for ${context.data.name}`} inset="none">
    <oj-c-selector slot="selector" aria-label={`Select ${context.data.name}`} />
    <div slot="leading">
      <oj-c-badge label="Leading Slot" />
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
      <oj-c-badge label="Trailing Slot" />
    </div>
    <div slot="action">
      <oj-c-button label="Action Slot" size="sm" />
    </div>
    <div slot="quaternary" class="oj-typography-body-sm oj-text-color-secondary">
      Quaternary slot
    </div>
    <div slot="navigation" class="oj-typography-body-sm oj-text-color-secondary">
      <a href="#" tabIndex={context.isTabbable ? 0 : -1}>
        Navigation
      </a>
    </div>
  </oj-c-list-item-layout>
);

export const ListItemLayoutPaddingcorepack = () => {
  const [selectedItems, setSelectedItems] = useState<ImmutableKeySet<string>>(new KeySetImpl<string>());
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<Employee["id"], Employee>(EMPLOYEES, {
        keyAttributes: "id"
      }),
    []
  );

  const handleSelectedChanged = (event: EmployeeSelectedChangedEvent) => {
    setSelectedItems(event.detail.value ?? new KeySetImpl<string>());
  };

  return (
    <div id="listitemlayout">
      <div class="oj-sm-padding-4x-vertical">
        This demo is an example of the `inset` prop set to `none` which removes padding around the list item layout.
      </div>
      <oj-c-list-view
        id="listviewone"
        aria-label="Example of all available slot"
        data={dataProvider}
        gridlines={{ item: "visible", bottom: "visible" }}
        class="demo-list-view1 oj-sm-padding-2x-vertical"
        selected={selectedItems}
        selectionMode="multiple"
        onselectedChanged={handleSelectedChanged}
        item={{ enterKeyFocusBehavior: "focusWithin" }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-c-list-view>
    </div>
  );
};

export default ListItemLayoutPaddingcorepack;
