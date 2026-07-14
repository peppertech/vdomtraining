import 'ojs/ojbutton';
import { ojButton } from 'ojs/ojbutton';
import 'ojs/ojlistview';
import { ojListView } from 'ojs/ojlistview';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface Data {
    id: string;
    name: string;
}

export const ListViewNoDataListView = () => {
  const [data, setData] = useState<Data[]>([]);

  const dataProvider = useMemo(() => new ArrayDataProvider<Data['id'], Data>(data, {
      keyAttributes: 'id'
  }), [data]);

  const addNewTask = (_event: ojButton.ojAction) => {
      setData((currentData) => [
          ...currentData,
          {
              id: `t${currentData.length + 1}`,
              name: 'New task'
          }
      ]);
  };

  const handleRemoveTask = (event: ojButton.ojAction) => {
      const currentTarget = event.currentTarget as HTMLElement | null;
      const indexAttribute = currentTarget?.getAttribute('data-index');

      if (indexAttribute == null) {
          return;
      }

      const index = Number(indexAttribute);

      if (Number.isNaN(index)) {
          return;
      }

      setData((currentData) => currentData.filter((_item, currentIndex) => currentIndex !== index));
  };

  const renderItem = (item: ojListView.ItemTemplateContext<Data['id'], Data>) => {
      return (
          <li class="demo-item">
              <div class="oj-flex oj-sm-justify-content-space-between oj-sm-align-items-center">
                  <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
                  <oj-button data-index={String(item.index)} onojAction={handleRemoveTask} display="icons" chroming="borderless">
                      <span slot="startIcon" class="oj-ux-ico-delete-circle" />
                  </oj-button>
              </div>
          </li>
      );
  };

  const renderNoData = () => {
      return (
          <div class="oj-flex oj-sm-align-items-center demo-nodata-content">
              <div class="oj-flex oj-sm-align-items-center oj-sm-flex-direction-column demo-nodata-inner">
                  <h5>All Tasks Completed!</h5>
                  <oj-button onojAction={addNewTask}>+ New Task</oj-button>
              </div>
          </div>
      );
  };

  return (
      <div>
          <h4>My Tasks</h4>
          <oj-list-view id="listview" aria-label="simple todo list" data={dataProvider} class="demo-list">
                <template slot="itemTemplate" render={renderItem} />
                <template slot="noData" render={renderNoData} />
            </oj-list-view>
      </div>
    );
};

export default ListViewNoDataListView;
