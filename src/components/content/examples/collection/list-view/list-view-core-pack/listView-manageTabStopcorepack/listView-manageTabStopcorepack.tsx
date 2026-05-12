import { useMemo } from "preact/hooks";
import "css!./demo.css";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "../../../../../../jet-composites/demo-responsive-buttonset/loader";
import type { CListViewElement } from "oj-c/list-view";
import "oj-c/avatar";
import "oj-c/button";
import "oj-c/list-item-layout";
import "oj-c/list-view";

interface Employee {
  email: string;
  id: string;
  image: string;
  name: string;
  status: string;
}

type ItemTemplateContext = CListViewElement.ItemTemplateContext<Employee["id"], Employee>;

const STATUS_OPTIONS = [{ value: "In Office" }, { value: "Out of Office" }] as const;
const EMPLOYEES: Employee[] = [
  {
    id: "e1",
    name: "Chris Black",
    email: "chris.black@acme.com",
    image: "./placeholder-male-01.png",
    status: "In Office"
  },
  {
    id: "e2",
    name: "Christine Cooper",
    email: "christine.cooper@acme.com",
    image: "./placeholder-female-01.png",
    status: "In Office"
  },
  {
    id: "e3",
    name: "Chris Benalamore",
    email: "chris.benalamore@acme.com",
    image: "./placeholder-male-03.png",
    status: "Out of Office"
  },
  {
    id: "e4",
    name: "Christopher Johnson",
    email: "christopher.johnson@acme.com",
    image: "./placeholder-male-04.png",
    status: "In Office"
  },
  {
    id: "e5",
    name: "Samire Christian",
    email: "samire.christian@acme.com",
    image: "./placeholder-male-05.png",
    status: "In Office"
  },
  {
    id: "e6",
    name: "Kurt Marchris",
    email: "kurt.marchris@acme.com",
    image: "./placeholder-male-06.png",
    status: "Out of Office"
  },
  {
    id: "e7",
    name: "Zelda Christian Cooperman",
    email: "zelda.christian.cooperman@acme.com",
    image: "./placeholder-female-02.png",
    status: "Out of Office"
  }
];

const renderItem = (context: ItemTemplateContext) => (
  <oj-c-list-item-layout>
    <span class="oj-typography-body-md oj-text-color-primary">{context.data.name}</span>
    <oj-c-avatar slot="leading" size="xs" src={context.data.image} />
    <span slot="secondary" class="oj-typography-body-md oj-text-color-primary">
      <a
        href="#"
        aria-label={`Send email to ${context.data.email}`}
        tabIndex={context.isTabbable ? 0 : -1}
      >
        {context.data.email}
      </a>
    </span>
    <demo-responsive-buttonset
      class="demo-responsive-buttonset"
      slot="trailing"
      value={context.data.status}
      options={STATUS_OPTIONS}
      data-oj-manage-tabs=""
    />
    <oj-c-button slot="action" display="icons" label={`Info for ${context.data.name}`}>
      <span slot="startIcon" class="oj-ux-ico-information" />
    </oj-c-button>
  </oj-c-list-item-layout>
);

export const ListViewManageTabStopcorepack = () => {
  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<Employee["id"], Employee>(EMPLOYEES, {
        keyAttributes: "id"
      }),
    []
  );

  return (
    <oj-c-list-view
      id="listview"
      aria-label="List with focusable content"
      data={dataProvider}
      item={{ enterKeyFocusBehavior: "focusWithin" }}
    >
      <template slot="itemTemplate" render={renderItem} />
    </oj-c-list-view>
  );
};

export default ListViewManageTabStopcorepack;
