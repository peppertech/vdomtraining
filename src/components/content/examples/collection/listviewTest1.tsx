import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojlistview";
import "ojs/ojlistitemlayout";
import "ojs/ojavatar";
import "ojs/ojtoolbar";
import "ojs/ojselector";
import "oj-c/list-view"
import "oj-c/list-item-layout"
import "oj-c/button"
import "oj-c/input-text"
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import peopleData from "text!./data/peopleData.json";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { ojListView } from "ojs/ojlistview";
import { SelectorElement } from "ojs/ojselector";
import { CListViewElement } from "oj-c/list-view";

type Employee = {
  id: number;
  image: string;
  name: string;
  department: string;
  startdate: string;
  isNew: boolean;
  isRename: boolean
  numberOfChildren:number
};

type Props = {
  level: { id: string }
  handleAdd: (e: Event, { }, data: object) => void
}

const dataProvider = new MutableArrayDataProvider<Employee["id"], Employee>(
  JSON.parse(peopleData),
  {
    keyAttributes: "id",
  }
);
type ListViewProps = ComponentProps<"oj-list-view">;
const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible" };
const INIT_SELECTEDITEMS = new KeySetImpl([]) as KeySet<Employee["id"]>;

const ListViewTest1 = (props: Props) => {
  const [selectedItems, setselectedItems] =
    useState<KeySet<Employee["id"]>>(INIT_SELECTEDITEMS);
  
const [showAvatar,setShowAvatar] = useState<boolean>(false);

  const handleSelectedChanged = (
    event: ojListView.selectedChanged<Employee["id"], Employee>
  ) => {
    setselectedItems(event.detail.value as KeySet<number>);
    console.log("Selected: ", selectedItems);
  };

  const handleSelectedKeyChanged = (
    event: SelectorElement.selectedKeysChanged<Employee["id"]>
  ) => {
    setselectedItems(event.detail.value as KeySet<number>);
  };
  const renderListItem = useCallback(
    (item: ojListView.ItemTemplateContext<Employee["id"], Employee>) => {
      return (
        <li>
          <oj-c-list-item-layout>
            {/* <oj-selector
              aria-label="selector"
              slot="selector"
              selectedKeys={selectedItems}
              onselectedKeysChanged={handleSelectedKeyChanged}
              selectionMode="multiple"
              rowKey={item.data.id}
              id={"listview_checkboxset" + item.data.id}
            ></oj-selector> */}
            <div slot="leading">
            {showAvatar && <oj-avatar
              shape="square"
              // slot="leading"
              // key={item.data.id}
              size="sm"
              aria-label={`avatar for ${item.data.name}`}
              src={item.data.image}
            ></oj-avatar>}
            </div>
            <div class="oj-typography-body-md oj-typography-bold">
              {item.data.name}
            </div>
            <div slot="secondary" class="oj-typography-body-sm">
              {item.data.department}
            </div>
            <div slot="action">
              <oj-toolbar aria-label="Actions" chroming="borderless">
                <oj-button
                  id={"save" + item.data.id}
                  display="icons"
                  class="oj-button-sm"
                >
                  <span slot="startIcon" class="oj-ux-ico-save"></span>
                  Save
                </oj-button>
                <oj-button
                  id={"download" + item.data.id}
                  display="icons"
                  class="oj-button-sm"
                >
                  <span slot="startIcon" class="oj-ux-ico-download"></span>
                  Download
                </oj-button>
                <oj-button
                  id={"print" + item.data.id}
                  display="icons"
                  class="oj-button-sm"
                >
                  <span slot="startIcon" class="oj-ux-ico-print"></span>
                  Print
                </oj-button>
              </oj-toolbar>
            </div>
          </oj-c-list-item-layout>
        </li>
      );
    },
    [selectedItems, showAvatar]
  );

  const handleSelection = (e: any, data: any) => {
    console.log('Selection')
  }
  const switchToRenameMode = (e: any, item: any) => {
    console.log('Dbl-click')
  }
  const dataChanged = () => { }
  const onEscape = (e: any, isRename: any) => { }
  const onFocusOut = (e: any, isRename: any) => { }

  const toggleAvatar = () => {
    setShowAvatar(!showAvatar);
  }

  // const renderListItem:CListViewElement.RenderItemTemplate<Employee['id'],Employee> = (item) => {
  //   const data = item.data;
  //   const isNew = data.isNew;
  //   const isRename = data.isRename;
  //   if (isNew || isRename) {
  //     return <div class={"custom-list-item" + props.level.id + " oj-flex oj-sm-flex-wrap-nowrap  "}>
  //       <div class="oj-flex-item oj-smt-padding-1x-horizontal">
  //         <oj-c-input-text labelEdge="none" id="tempRow" value={isRename ? data.name : ""} autofocus={true} placeholder="Member name"></oj-c-input-text>
  //       </div>
  //     </div>
  //   }
  //   return <div onClick={e => handleSelection(e, data)} style="align-items: center;" class={"custom-list-item" + props.level.id + " oj-flex oj-sm-flex-wrap-nowrap  "}>
  //     <div class="oj-flex-item oj-sm-padding-2x-start">
  //       <span onDblClick={e => switchToRenameMode(e, item)}>{data.name}</span>
  //     </div>

  //     {
  //       data.numberOfChildren > 0 ? <div class="oj-flex-item oj-sm-padding-2x-end oj-sm-flex-initial">
  //         <oj-c-button chroming="borderless" display="icons" onojAction={e => props.handleAdd(e, props.level.id, data)} label="Show children">
  //           <span
  //             slot="endIcon"
  //             class="oj-sm-margin-2x-start oj-sm-align-items-flex-end oj-ux-ico-chevron-right"></span>
  //         </oj-c-button>
  //       </div> : ""
  //     }
  //   </div>
  // }
  return (
    // <div class="oj-md-margin-4x-horizontal">
    //   <oj-list-view
    //     id="listview"
    //     aria-label="list of employees"
    //     data={dataProvider}
    //     gridlines={gridlinesItemVisible}
    //     selectionMode="multiple"
    //     onselectedChanged={handleSelectedChanged}
    //     selected={selectedItems}
    //     class="listview-sizing"
    //   >
    //     <template slot="itemTemplate" render={renderListItem}></template>
    //   </oj-list-view>
    // </div>
    <div class="oj-flex-item oj-sm-flex-1">
      <oj-button onojAction={toggleAvatar}>Toggle Avatar</oj-button>
      <oj-c-list-view
        data-oj-context
        style="height: calc(100vh - 160px)"
        id={"listview" + props.level.id}
        aria-label="list using collection"
        class="demo-list"
        data={dataProvider}
        ondataChanged={dataChanged}
        selection-mode="multiple">
        <template slot="itemTemplate" render={renderListItem} />
      </oj-c-list-view>
    </div>
  );
};
export default ListViewTest1;
