import "oj-c/action-card";
import "oj-c/card-view";
import * as preact from 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from "preact/hooks";
import "../../../../../jet-composites/demo-profile-card-layout/loader";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

interface EmployeeData {
  id: number;
  image: string;
  initials: string;
  name: string;
  title: string;
}

type CardItemContext = {
  data: EmployeeData;
  isTabbable?: boolean;
  item: { data: EmployeeData; metadata: { key: EmployeeData["id"] } };
};
type ActionCardActionEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-action-card">["onojAction"]>
>[0];

const EMPLOYEES: EmployeeData[] = [
  {
    id: 1,
    name: "Chris Black",
    initials: "CB",
    title: "Oracle Cloud Infrastructure GTM Channel Director EMEA",
    image: "/styles/images/hcm/placeholder-male-01.png"
  },
  {
    id: 2,
    name: "Christine Cooper",
    initials: "CC",
    title: "Senior Principal Escalation Manager",
    image: "/styles/images/hcm/placeholder-female-01.png"
  },
  {
    id: 3,
    name: "Chris Benalamore",
    initials: "CB",
    title: "Area Business Operations Director EMEA & JAPAC",
    image: "/styles/images/hcm/placeholder-male-03.png"
  },
  {
    id: 4,
    name: "Christopher Johnson",
    initials: "CJ",
    title: "Vice-President HCM Application Development",
    image: "/styles/images/hcm/placeholder-male-04.png"
  },
  {
    id: 5,
    name: "Samire Christian",
    initials: "SC",
    title: "Consulting Project Technical Manager",
    image: "/styles/images/hcm/placeholder-male-05.png"
  },
  {
    id: 6,
    name: "Kurt Marchris",
    initials: "KM",
    title: "Customer Service Analyst",
    image: "/styles/images/hcm/placeholder-male-06.png"
  },
  {
    id: 7,
    name: "Zelda Christian Cooperman",
    initials: "ZC",
    title: "Senior Principal Escalation Manager",
    image: "/styles/images/hcm/placeholder-female-02.png"
  }
];

export default function CardViewActionCardBehaviorcorepack() {
  const [actionName, setActionName] = useState("");
  const [actionReason, setActionReason] = useState("");

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<EmployeeData["id"], EmployeeData>(EMPLOYEES, {
        keyAttributes: "id"
      }),
    []
  );

  const renderCard: import("ojs/ojvcomponent").TemplateSlot<CardItemContext> = (context) => {
    const handleAction = (event: ActionCardActionEvent) => {
      setActionName(context.data.name);
      setActionReason("action");
    };

    return (
      <oj-c-action-card id={String(context.data.id)} onojAction={handleAction}>
        {preact.h("demo-profile-card-layout", {
          name: context.data.name,
          workTitle: context.data.title,
          initials: context.data.initials,
          image: context.data.image,
        })}
      </oj-c-action-card>
    );
  };

  return (
    <div id="cardviewContainer">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-4x-top oj-sm-margin-4x-bottom">
        <div class="oj-typography-body-md oj-text-color-primary">
          <label for="action-name-value">Perform action on:</label>{" "}
          <span id="action-name-value">{actionName}</span>
          {actionName !== "" ? (
            <>
              {" "}
              <label for="action-reason-value">via</label>{" "}
              <span id="action-reason-value">{actionReason}</span>
            </>
          ) : null}
        </div>
      </div>
      <oj-c-card-view
        id="cardview"
        focusBehavior="content"
        aria-label="cardview content focus behavior"
        data={dataProvider}
      >
        <template slot="itemTemplate" render={renderCard} />
      </oj-c-card-view>
    </div>
  );
}
