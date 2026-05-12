import { useMemo, useState } from "preact/hooks";
import type { ComponentProps } from "preact";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "ojs/ojswitch";
import type { CListViewElement } from "oj-c/list-view";
import "oj-c/list-view";

interface Employee {
  email: string;
  id: number;
  name: string;
  title: string;
}

type SwitchValueChangedEvent = Parameters<NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>>[0];
type ItemTemplateContext = CListViewElement.ItemTemplateContext<Employee["id"], Employee>;

const EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: "Chris Black",
    title: "Oracle Cloud Infrastructure GTM Channel Director EMEA",
    email: "chris.black@oracle.com"
  },
  {
    id: 2,
    name: "Christine Cooper",
    title: "Senior Principal Escalation Manager",
    email: "christine.cooper@oracle.com"
  },
  {
    id: 3,
    name: "Chris Benalamore",
    title: "Area Business Operations Director EMEA & JAPAC",
    email: "chris.benalamore@oracle.com"
  },
  {
    id: 4,
    name: "Christopher Johnson",
    title: "Vice-President HCM Application Development",
    email: "christopher.johnson@oracle.com"
  },
  {
    id: 5,
    name: "Samire Christian",
    title: "Consulting Project Technical Manager",
    email: "samire.christian@oracle.com"
  },
  {
    id: 6,
    name: "Kurt Marchris",
    title: "Customer Service Analyst",
    email: "kurt.marchris@oracle.com"
  },
  {
    id: 7,
    name: "Zelda Christian Cooperman",
    title: "Senior Principal Escalation Manager",
    email: "zelda.christian.cooperman@oracle.com"
  }
];

const renderItem = (context: ItemTemplateContext) => (
  <div class="oj-flex oj-sm-flex-direction-column">
    <span class="oj-typography-body-md oj-text-color-primary">{context.data.name}</span>
    <span class="oj-typography-body-sm oj-text-color-secondary">{context.data.title}</span>
    <span class="oj-typography-body-sm oj-text-color-secondary">{context.data.email}</span>
  </div>
);

export const ListViewItemPaddingcorepack = () => {
  const [paddingEnabled, setPaddingEnabled] = useState(true);
  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<Employee["id"], Employee>(EMPLOYEES, {
        keyAttributes: "id"
      }),
    []
  );

  const handlePaddingChanged = (event: SwitchValueChangedEvent) => {
    setPaddingEnabled(event.detail.value ?? false);
  };

  return (
    <div id="listViewContainer">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-switch
          id="item-padding"
          value={paddingEnabled}
          labelEdge="inside"
          labelHint="Enable Item Padding"
          onvalueChanged={handlePaddingChanged}
        />
      </div>
      <oj-c-list-view
        id="listview"
        aria-label="Basic list"
        data={dataProvider}
        item={{ padding: paddingEnabled ? "enabled" : "disabled" }}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-c-list-view>
    </div>
  );
};

export default ListViewItemPaddingcorepack;
