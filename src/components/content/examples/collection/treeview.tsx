import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojmenu";
import "ojs/ojtreeview";
import * as treeviewData from "text!./data/treeviewData.json";
import ArrayTreeDataProvider = require("ojs/ojarraytreedataprovider");
import { ojTreeView } from "ojs/ojtreeview";
import { KeySetImpl, KeySet } from "ojs/ojkeyset";

interface TreeviewItem {
  title: string;
  id: string;
  children?: Array<TreeviewItem>;
}

const actionColumn = (
  item: ojTreeView.ItemTemplateContext<TreeviewItem["id"], TreeviewItem>
) => (
  <li>
    <span class="oj-treeview-item-icon"></span>
    <span class="oj-treeview-item-text">{item.data.title}</span>
  </li>
);

const data: ArrayTreeDataProvider<TreeviewItem["id"], TreeviewItem> =
  new ArrayTreeDataProvider(JSON.parse(treeviewData), {
    keyAttributes: "id",
  });

const INIT_SELECTED = new KeySetImpl([]) as KeySet<TreeviewItem["id"]>;

const Treeview = () => {
  const [selected, setselected] = useState(INIT_SELECTED);
  const [listofSelected, setlistofSelected] = useState("nothing selected yet");

  const handleSelectedChanged = useCallback(
    (event: ojTreeView.selectedChanged<TreeviewItem["id"], TreeviewItem>) => {
      setselected(event.detail.value);
      let tempArray: Array<string> = [];
      (event.detail.value as KeySetImpl<string>)
        .values()
        .forEach((value: string) => {
          tempArray.push(value);
        });
      let list: string = tempArray.toString().replaceAll(",", " ");
      setlistofSelected(list != "" ? list : "Nothing selected");
    },
    [selected, setselected]
  );

  return (
    <div class="oj-md-margin-4x-horizontal">
      <oj-tree-view
        id="treeview"
        data={data}
        onselectedChanged={handleSelectedChanged}
        selectionMode="leafOnly"
        aria-label="Tree View with JSON Data">
        <template slot="itemTemplate" render={actionColumn} />
      </oj-tree-view>
      <div class="selected-list">{listofSelected}</div>
    </div>
  );
};
export default Treeview;
