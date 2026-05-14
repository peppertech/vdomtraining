import { useMemo, useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { KeySetImpl, type KeySet } from "ojs/ojkeyset";
import type { ojListView } from "ojs/ojlistview";
import "css!./demo.css";
import "ojs/ojbutton";
import "ojs/ojlistitemlayout";
import "ojs/ojlistview";
import "ojs/ojselector";

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

type EmployeeItemContext = ojListView.ItemTemplateContext<Employee["id"], Employee>;
type EmployeeSelectedChangedEvent = ojListView.selectedChanged<Employee["id"], Employee>;

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
  <oj-list-item-layout
    aria-label={`Details for ${context.data.name}`}
    {...{ "vertical-alignment": "top" }}
  >
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

export const ListItemLayoutVerticalAlignmentlegacy = () => {
  const [selectedItems, setSelectedItems] = useState<KeySet<string>>(new KeySetImpl<string>());
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
        This demo shows all of the possible slots aligned using the alignment prop.
      </div>
      <oj-list-view
        id="listviewone"
        aria-label="Example of opt-in top alignment"
        data={dataProvider}
        gridlines={{ item: "visible" }}
        class="demo-list-view1 oj-sm-padding-2x-vertical"
        selected={selectedItems}
        selectionMode="multiple"
        onselectedChanged={handleSelectedChanged}
        item={{ enterKeyFocusBehavior: "focusWithin" }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-list-view>
    </div>
  );
};

export default ListItemLayoutVerticalAlignmentlegacy;
