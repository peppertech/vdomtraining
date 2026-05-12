import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojButton } from 'ojs/ojbutton';
import 'oj-c/list-view';
import 'ojs/ojbutton';

interface Data {
    id: string;
    name: string;
}

export const ListViewNoDatacorepack = () => {
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
      const taskId = currentTarget?.getAttribute('data-task-id');

      if (taskId == null) {
          return;
      }

      setData((currentData) => currentData.filter((item) => item.id !== taskId));
  };

  const renderItem = (item: { data: Data }) => {
      return (
          <li class="demo-item">
              <div class="oj-flex oj-sm-justify-content-space-between oj-sm-align-items-center">
                  <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
                  <oj-button data-task-id={item.data.id} onojAction={handleRemoveTask} display="icons" chroming="borderless">
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
          <oj-c-list-view id="listview" aria-label="simple todo list" data={dataProvider} class="demo-list">
                <template slot="itemTemplate" render={renderItem} />
                <template slot="noData" render={renderNoData} />
            </oj-c-list-view>
      </div>
    );
};

export default ListViewNoDatacorepack;
