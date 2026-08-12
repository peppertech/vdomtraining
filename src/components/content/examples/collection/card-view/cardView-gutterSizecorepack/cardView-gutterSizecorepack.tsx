import "oj-c/card-view";
import "oj-c/radioset";
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

type CardGutterSize = NonNullable<ComponentProps<"oj-c-card-view">["gutterSize"]>;
type RadiosetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];
type CardItemContext = {
  data: EmployeeData;
  isTabbable?: boolean;
  item: { data: EmployeeData; metadata: { key: EmployeeData["id"] } };
};

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
  }
];

const GUTTER_OPTIONS: { label: CardGutterSize; value: CardGutterSize }[] = [
  { value: "xs", label: "xs" },
  { value: "sm", label: "sm" },
  { value: "md", label: "md" },
  { value: "lg", label: "lg" },
  { value: "xl", label: "xl" }
];

const renderCard: import("ojs/ojvcomponent").TemplateSlot<CardItemContext> = (context) => (
  <div class="oj-panel">
    {preact.h("demo-profile-card-layout", {
      name: context.data.name,
      workTitle: context.data.title,
      initials: context.data.initials,
      image: context.data.image,
    })}
  </div>
);

export default function CardViewGutterSizecorepack() {
  const [gutterSize, setGutterSize] = useState<CardGutterSize>("sm");
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<EmployeeData["id"], EmployeeData>(EMPLOYEES, {
        keyAttributes: "id"
      }),
    []
  );

  const handleGutterSizeChanged = (event: RadiosetValueChangedEvent) => {
    const nextValue = event.detail.value as CardGutterSize | null;
    if (nextValue) {
      setGutterSize(nextValue);
    }
  };

  return (
    <div id="cardviewContainer">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-4x-top oj-sm-margin-4x-bottom">
        <oj-c-radioset
          id="gutterSize"
          direction="row"
          labelEdge="start"
          labelStartWidth="20%"
          labelHint="Gutter size"
          options={GUTTER_OPTIONS}
          value={gutterSize}
          onvalueChanged={handleGutterSizeChanged}
        />
      </div>
      <oj-c-card-view
        id="cardview"
        gutterSize={gutterSize}
        aria-label="cardview with different gutter size"
        data={dataProvider}
      >
        <template slot="itemTemplate" render={renderCard} />
      </oj-c-card-view>
    </div>
  );
}
