import "oj-c/card-view";
import "oj-c/selection-card";
import "oj-c/selector";
import "oj-c/selector-all";
import {
  AllKeySetImpl,
  KeySetImpl,
  type ImmutableKeySet
} from "ojs/ojkeyset";
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
type CardViewSelectedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-card-view">["onselectedChanged"]>
>[0];
type SelectorAllSelectedKeysChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-selector-all">["onselectedKeysChanged"]>
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

const getDisplayValue = (selected: ImmutableKeySet<number>) => {
  if (selected.isAddAll()) {
    const deletedValues = Array.from((selected as AllKeySetImpl<number>).deletedValues());
    return deletedValues.length === 0
      ? "Everything selected"
      : `Everything selected except: ${JSON.stringify(deletedValues)}`;
  }

  return JSON.stringify(Array.from((selected as KeySetImpl<number>).values()));
};

export const CardViewMultipleSelectioncorepack = () => {
  const [selectedItems, setSelectedItems] = useState<ImmutableKeySet<number>>(new KeySetImpl<number>());
  const [selectedIds, setSelectedIds] = useState("");

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<EmployeeData["id"], EmployeeData>(EMPLOYEES, {
        keyAttributes: "id"
      }),
    []
  );

  const handleSelectedChanged = (event: CardViewSelectedChangedEvent) => {
    const nextSelectedItems = event.detail.value ?? new KeySetImpl<number>();
    setSelectedItems(nextSelectedItems);
    setSelectedIds(getDisplayValue(nextSelectedItems));
  };

  const handleSelectAllChanged = (event: SelectorAllSelectedKeysChangedEvent) => {
    const nextSelectedItems = event.detail.value ?? new KeySetImpl<number>();
    setSelectedItems(nextSelectedItems);
    setSelectedIds(getDisplayValue(nextSelectedItems));
  };

  const renderCard = (context: CardItemContext) => (
    <oj-c-selection-card selected={selectedItems.has(context.item.metadata.key)}>
      <div>
        {preact.h("demo-profile-card-layout", {
          name: context.data.name,
          workTitle: context.data.title,
          initials: context.data.initials,
          image: context.data.image,
        })}
        <oj-c-selector aria-label={`Check box for ${context.data.name}`} />
      </div>
    </oj-c-selection-card>
  );

  return (
    <div id="cardviewContainer">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-4x-top oj-sm-margin-4x-bottom">
        <div class="oj-typography-body-sm oj-text-color-secondary">
          <label for="curr-selection-value">Current Selection:&nbsp;</label>
          <span id="curr-selection-value">{getDisplayValue(selectedItems)}</span>
          <br />
          <br />
          <label for="selected-item-ids-value">IDs from Selected Change Event:&nbsp;</label>
          <span id="selected-item-ids-value">{selectedIds}</span>
        </div>

        <div class="oj-flex">
          <div class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-align-items-center">
            <div class="oj-flex-item">
              <oj-c-selector-all
                selectedKeys={selectedItems}
                onselectedKeysChanged={handleSelectAllChanged}
                id="selectAll"
                aria-label="select all"
              />
            </div>
            <div class="oj-flex-item">
              <div class="container">
                <div>
                  <span>Select All</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <oj-c-card-view
        id="cardview"
        aria-label="card view shows selection features"
        selectionMode="multiple"
        selected={selectedItems}
        onselectedChanged={handleSelectedChanged}
        data={dataProvider}
      >
        <template slot="itemTemplate" render={renderCard} />
      </oj-c-card-view>
    </div>
  );
};

export default CardViewMultipleSelectioncorepack;
