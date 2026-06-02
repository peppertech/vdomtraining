// @ts-nocheck
import { h } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import "ojs/ojactioncard";
import "../../../../../../jet-composites/demo-profile-card-layout/loader";
import "ojs/ojavatar";
import "ojs/ojbutton";
import "ojs/ojbuttonsetone";
import "ojs/ojlistitemlayout";
import "ojs/ojlistview";
import "ojs/ojoption";

type Layout = "card" | "list";

type Data = {
  id: number;
  name: string;
  title: string;
  phone?: number;
  initials: string;
  image: string;
};

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(() =>
    window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const peopleData: Data[] = [
  {
    id: 1,
    name: "Chris Black",
    title: "Oracle Cloud Infrastructure GTM Channel Director EMEA",
    phone: 14184556091,
    initials: "CB",
    image: "/styles/images/hcm/placeholder-male-01.png",
  },
  {
    id: 2,
    name: "Christine Cooper",
    title: "Senior Principal Escalation Manager",
    phone: 16195668098,
    initials: "CC",
    image: "/styles/images/hcm/placeholder-female-01.png",
  },
  {
    id: 3,
    name: "Chris Benalamore",
    title: "Area Business Operations Director EMEA & JAPAC",
    phone: 16194559090,
    initials: "CJ",
    image: "/styles/images/hcm/placeholder-male-03.png",
  },
  {
    id: 4,
    name: "Christopher Johnson",
    title: "Vice-President HCM Application Development",
    phone: 13037662355,
    initials: "SC",
    image: "/styles/images/hcm/placeholder-male-04.png",
  },
  {
    id: 5,
    name: "Samire Christian",
    title: "Consulting Project Technical Manager",
    phone: 16195647455,
    initials: "SM",
    image: "/styles/images/hcm/placeholder-male-05.png",
  },
  {
    id: 6,
    name: "Kurt Marchris",
    title: "Customer Service Analyst",
    initials: "KM",
    image: "/styles/images/hcm/placeholder-male-06.png",
  },
  {
    id: 7,
    name: "Zelda Christian Cooperman",
    title: "Senior Principal Escalation Manager",
    phone: 16195668098,
    initials: "ZC",
    image: "/styles/images/hcm/placeholder-female-02.png",
  },
  {
    id: 8,
    name: "Christian Wu",
    title: "Senior Principal Escalation Manager",
    phone: 16195668098,
    initials: "CW",
    image: "/styles/images/hcm/placeholder-male-07.png",
  },
  {
    id: 9,
    name: "Jennifer Christy",
    title: "Area Business Operations Director EMEA & JAPAC",
    phone: 16194559090,
    initials: "JC",
    image: "/styles/images/hcm/placeholder-female-03.png",
  },
  {
    id: 10,
    name: "Christine Ellis",
    title: "Vice-President HCM Application Development",
    phone: 13037662355,
    initials: "CE",
    image: "/styles/images/hcm/placeholder-female-04.png",
  },
  {
    id: 11,
    name: "Patrick Chrismon",
    title: "Consulting Project Technical Manager",
    phone: 16195647455,
    initials: "PC",
    image: "/styles/images/hcm/placeholder-male-08.png",
  },
  {
    id: 12,
    name: "Alfred Marchris",
    title: "Principal Developer",
    phone: 16195668098,
    initials: "AM",
    image: "/styles/images/hcm/placeholder-male-13.png",
  },
];

const layoutViewRadios = [
  { id: "card" as Layout, icon: "oj-ux-ico-grid-view-small" },
  { id: "list" as Layout, icon: "oj-ux-ico-list-round" },
];

export const ListViewCardLayoutListView = () => {
  const [activeLayout, setActiveLayout] = useState<Layout>("card");
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<Data["id"], Data>(peopleData, {
        keyAttributes: "id",
      }),
    [],
  );
  const smQuery = useMemo(
    () =>
      ResponsiveUtils.getFrameworkQuery(
        ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY,
      ),
    [],
  );
  const isSmall = useMediaQuery(smQuery);
  const effectiveLayout = isSmall ? "list" : activeLayout;

  const handleActiveLayoutValueChanged = (
    event: PropertyChangedEvent<Layout>,
  ) => {
    setActiveLayout(event.detail.value);
  };

  return (
    <div id="listviewContainer">
      {!isSmall ? (
        <div class="oj-flex oj-sm-justify-content-flex-end">
          <oj-buttonset-one
            display="icons"
            onvalueChanged={handleActiveLayoutValueChanged}
            value={activeLayout}
            chroming="borderless"
            class="oj-flex-item oj-sm-flex-initial oj-buttonset-width-auto"
            aria-label="Choose layout view."
          >
            {layoutViewRadios.map((layout) => (
              <oj-option value={layout.id} id={layout.id}>
                <span slot="startIcon" class={layout.icon} />
                <span>{layout.id}</span>
              </oj-option>
            ))}
          </oj-buttonset-one>
        </div>
      ) : null}
      <div class="demo-card-container">
        <oj-list-view
          id="listview"
          aria-label="list with card layout"
          data={dataProvider}
          display={effectiveLayout}
          class={
            effectiveLayout === "card"
              ? "oj-listview-item-padding-off oj-sm-padding-2x-bottom"
              : "oj-listview-item-padding-off"
          }
        >
          <template
            slot="itemTemplate"
            render={(item) => {
              const data = item.item.data as Data;

              if (effectiveLayout === "list") {
                return (
                  <oj-list-item-layout>
                    <span class="oj-typography-body-md">{data.name}</span>
                    <oj-avatar slot="leading" size="xs" src={data.image} />
                    <span
                      slot="secondary"
                      class="oj-typography-body-sm oj-text-color-secondary"
                    >
                      {data.title}
                    </span>
                  </oj-list-item-layout>
                );
              }

              return (
                <li class="demo-card">
                  <oj-action-card>
                    <demo-profile-card-layout
                      name={data.name}
                      work-title={data.title}
                      initials={data.initials}
                      image={data.image}
                    />
                  </oj-action-card>
                </li>
              );
            }}
          />
        </oj-list-view>
      </div>
    </div>
  );
};

export default ListViewCardLayoutListView;
