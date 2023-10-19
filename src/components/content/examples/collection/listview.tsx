import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojlistview";
import "ojs/ojlistitemlayout";
import "ojs/ojavatar";
import "ojs/ojtoolbar";
import "ojs/ojselector";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import * as peopleData from "text!./data/peopleData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { ojListView } from "ojs/ojlistview";

type Employee = {
  id: number;
  image: string;
  name: string;
  department: string;
  startdate: string;
};

const dataProvider = new MutableArrayDataProvider<Employee["id"], Employee>(
  JSON.parse(peopleData),
  {
    keyAttributes: "id",
  }
);
type ListViewProps = ComponentProps<"oj-list-view">;
const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible" };
const INIT_SELECTEDITEMS = new KeySetImpl([]) as KeySet<Employee["id"]>;

const ListView = () => {
  const [selectedItems, setselectedItems] =
    useState<KeySet<Employee["id"]>>(INIT_SELECTEDITEMS);

  /* TODO:  workout the proper type for this event */
  const handleSelectedChanged = (event: any) => {
    setselectedItems(event.detail.value);
  };

  const renderListItem = useCallback(
    (item: ojListView.ItemTemplateContext<Employee["id"], Employee>) => {
      return (
        <li>
          <oj-list-item-layout>
            <oj-selector
              aria-label="selector"
              slot="selector"
              selectedKeys={selectedItems}
              onselectedKeysChanged={handleSelectedChanged}
              selectionMode="multiple"
              rowKey={item.data.id}
              id={"listview_checkboxset" + item.data.id}></oj-selector>
            <oj-avatar
              slot="leading"
              shape="square"
              size="sm"
              src={item.data.image}></oj-avatar>
            <div class="oj-typography-body-md oj-typography-bold">
              {item.data.name}
            </div>
            <div slot="secondary" class="oj-typography-body-sm">
              {item.data.department}
            </div>
            <div slot="action">
              <oj-toolbar aria-label="Toolbar" chroming="borderless">
                <oj-button
                  id={"save" + item.data.id}
                  display="icons"
                  class="oj-button-sm">
                  <span slot="startIcon" class="oj-ux-ico-save"></span>
                  Save
                </oj-button>
                <oj-button
                  id={"download" + item.data.id}
                  display="icons"
                  class="oj-button-sm">
                  <span slot="startIcon" class="oj-ux-ico-download"></span>
                  Download
                </oj-button>
                <oj-button
                  id={"print" + item.data.id}
                  display="icons"
                  class="oj-button-sm">
                  <span slot="startIcon" class="oj-ux-ico-print"></span>
                  Print
                </oj-button>
              </oj-toolbar>
            </div>
          </oj-list-item-layout>
        </li>
      );
    },
    [selectedItems]
  );

  return (
    <div class="oj-md-margin-4x-horizontal">
      <oj-list-view
        id="listview"
        aria-label="list of employees"
        data={dataProvider}
        gridlines={gridlinesItemVisible}
        selectionMode="multiple"
        onselectedChanged={handleSelectedChanged}
        selected={selectedItems}
        class="listview-sizing">
        <template slot="itemTemplate" render={renderListItem}></template>
      </oj-list-view>
    </div>
  );
};
export default ListView;
