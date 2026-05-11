import { h } from "preact";
import { useMemo } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "../../../../../jet-composites/demo-profile-card-layout/loader";
import "../../../../../jet-composites/demo-responsive-buttonset/loader";
import "css!./demo.css";
import "oj-c/button";
import "oj-c/card-view";

interface EmployeeData {
  email: string;
  id: number;
  image: string;
  initials: string;
  name: string;
  status: string;
  title: string;
}

type CardItemContext = {
  data: EmployeeData;
  isTabbable?: boolean;
  item: { data: EmployeeData; metadata: { key: EmployeeData["id"] } };
};

const STATUS_OPTIONS = [{ value: "In Office" }, { value: "Out of Office" }] as const;
const EMPLOYEES: EmployeeData[] = [
  {
    id: 1,
    name: "Chris Black",
    initials: "CB",
    title: "Oracle Cloud Infrastructure GTM Channel Director EMEA",
    image: "/styles/images/hcm/placeholder-male-01.png",
    email: "chris.black@acme.com",
    status: "In Office"
  },
  {
    id: 2,
    name: "Christine Cooper",
    initials: "CC",
    title: "Senior Principal Escalation Manager",
    image: "/styles/images/hcm/placeholder-female-01.png",
    email: "christine.cooper@acme.com",
    status: "In Office"
  },
  {
    id: 3,
    name: "Chris Benalamore",
    initials: "CB",
    title: "Area Business Operations Director EMEA & JAPAC",
    email: "chris.benalamore@acme.com",
    image: "/styles/images/hcm/placeholder-male-03.png",
    status: "Out of Office"
  },
  {
    id: 4,
    name: "Christopher Johnson",
    initials: "CJ",
    title: "Vice-President HCM Application Development",
    email: "christopher.johnson@acme.com",
    image: "/styles/images/hcm/placeholder-male-04.png",
    status: "In Office"
  },
  {
    id: 5,
    name: "Samire Christian",
    initials: "SC",
    email: "samire.christian@acme.com",
    title: "Consulting Project Technical Manager",
    image: "/styles/images/hcm/placeholder-male-05.png",
    status: "In Office"
  },
  {
    id: 6,
    name: "Kurt Marchris",
    initials: "KM",
    title: "Customer Service Analyst",
    email: "kurt.marchris@acme.com",
    image: "/styles/images/hcm/placeholder-male-06.png",
    status: "Out of Office"
  },
  {
    id: 7,
    name: "Zelda Christian Cooperman",
    initials: "ZC",
    title: "Senior Principal Escalation Manager",
    email: "zelda.christian.cooperman@acme.com",
    image: "/styles/images/hcm/placeholder-female-02.png",
    status: "Out of Office"
  }
];

const renderCard = (context: CardItemContext) => (
  <div class="oj-panel">
    {h("demo-profile-card-layout", {
      layout: "tabbable",
      name: context.data.name,
      workTitle: context.data.title,
      image: context.data.image,
    })}
    <div class="oj-flex oj-sm-padding-4x-bottom">
      <span class="oj-flex oj-sm-padding-8x-start oj-typography-body-md oj-text-color-primary">
        <a
          href="#"
          aria-label={`Send email to ${context.data.email}`}
          tabIndex={context.isTabbable ? 0 : -1}
        >
          {context.data.email}
        </a>
      </span>
    </div>
    <div class="oj-flex oj-sm-padding-8x-start oj-sm-padding-4x-bottom">
      <demo-responsive-buttonset
        class="demo-responsive-buttonset"
        value={context.data.status}
        options={STATUS_OPTIONS}
        data-oj-manage-tabs=""
      />
    </div>
    <div class="oj-flex oj-sm-padding-8x-start oj-sm-padding-8x-bottom">
      <oj-c-button display="icons" label={`Info for ${context.data.name}`} />
    </div>
  </div>
);

export const CardViewManageTabStopcorepack = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<EmployeeData["id"], EmployeeData>(EMPLOYEES, {
        keyAttributes: "id"
      }),
    []
  );

  return (
    <oj-c-card-view aria-label="Card with focusable content" data={dataProvider} id="cardview">
      <template slot="itemTemplate" render={renderCard} />
    </oj-c-card-view>
  );
};

export default CardViewManageTabStopcorepack;
