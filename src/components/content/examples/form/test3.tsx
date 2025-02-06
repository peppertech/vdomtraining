import { useState, useEffect, useRef } from "preact/hooks";
import "oj-c/list-view";
import "oj-c/list-item-layout";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import "ojs/ojlistitemlayout";
import "oj-c/button";
import { CListViewElement } from "oj-c/list-view";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type Item = {
  id: number;
  label: string;
};

const items1 = [
  {
    id: 0,
    label: "zero",
  },
];

const items2 = [
  {
    id: 1,
    label: "one",
  },
  {
    id: 2,
    label: "two",
  },
  {
    id: 3,
    label: "three",
  },
];

export function Test3() {
  const [val, setVal] = useState<boolean>(false);
  const revisionsDP = useRef(
    new MutableArrayDataProvider<string, Item>(items1, {
      keyAttributes: "id",
    })
  );

  // Respond to state change by mutating the data in the DP
  useEffect(() => {
    revisionsDP.current.data = val ? items2 : items1;
  }, [revisionsDP, val]);

  // Button click handler triggers a re-render
  const toggle = () => {
    setVal(!val);
  };

  const renderItemC = (
    item: ojListView.ItemTemplateContext<Item["id"], Item>
  ) => <oj-c-list-item-layout>{item.data.label}</oj-c-list-item-layout>;

  const renderItem = (
    item: ojListView.ItemTemplateContext<Item["id"], Item>
  ) => <oj-list-item-layout>{item.data.label}</oj-list-item-layout>;

  return (
    <div>
      Click the button to toggle between "0" and "1,2,3" in each list view. The
      two lists should be the same
      <div class="oj-flex">
        <div class="oj-sm-flex-1  oj-sm-margin-4x">
          <div>oj-c-list-view</div>
          <oj-c-list-view data={revisionsDP.current} class="oj-bg-neutral-20">
            <template slot="itemTemplate" render={renderItemC}></template>
          </oj-c-list-view>
        </div>
        <div class="oj-sm-flex-1 oj-sm-margin-4x">
          <div>oj-list-view</div>
          <oj-list-view data={revisionsDP.current} class="oj-bg-neutral-20">
            <template slot="itemTemplate" render={renderItem}></template>
          </oj-list-view>
        </div>
      </div>
      <hr></hr>
      <oj-c-button onojAction={toggle} label="toggle"></oj-c-button>
    </div>
  );
}
