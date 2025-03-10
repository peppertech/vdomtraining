import {ComponentProps} from "preact"
import { useCallback } from "preact/hooks"
import "ojs/ojlistview";
import { testData } from "./test1Data";
import { ojListView } from "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type Item = {
  _id: string,
  age: string,
  name: string
}
const listDP = new MutableArrayDataProvider(testData, { keyAttributes: "_id" })

export function List() {

  const renderListItem = useCallback((item: ojListView.ItemTemplateContext<Item['_id'], Item>) => {
    return (<li>
      <div>{item.data.name}</div>
    </li>)
  }, [])

  return (
    <div>
      <oj-list-view
        scrollPolicyOptions={{scroller:"#app-body" }}
        data={listDP}
      >
        <template slot="itemTemplate" render={renderListItem}></template>
      </oj-list-view>
    </div>
  );
};