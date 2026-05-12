// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojlistview';
import 'ojs/ojbutton';
import { ojListView } from 'ojs/ojlistview';

interface TodoTask {
    id: number;
    name: string;
    date: string;
    content: string;
}

export const ListViewDrillableListView = () => {
  const [content, setContent] = useState<any>('');
  const [disabled, setDisabled] = useState<any>(true);

  const data = useMemo(() => [
      {
          id: 0,
          name: 'Potential cat names',
          date: 'Apr 30',
          content: 'Mew, Furball, Puss'
      },
      {
          id: 1,
          name: 'Todo list for work',
          date: 'Apr 29',
          content: 'Add one more'
      },
      {
          id: 2,
          name: 'Chicken recipes',
          date: 'Apr 15',
          content: 'Fried, Shake & Bake, Sautee'
      },
      {
          id: 3,
          name: 'Running routes',
          date: 'Apr 3',
          content: 'Bedroom to kitchen and back'
      },
      {
          id: 4,
          name: 'Groceries',
          date: 'Apr 1',
          content: 'Milk, bread, meat, veggie, can, etc.'
      },
      { id: 5, name: 'Party guest list', date: 'Mar 29', content: '' },
      { id: 6, name: 'Weekend projects', date: 'Mar 2', content: 'TBD' }
  ], [content]);
  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keys: data.map((value) => {
          return value.id;
      })
  }), [data]);
  const previousElementKey: any = null;

  const gotoList = () => {
      slide();
      setDisabled(true);
      const listView = document.getElementById('listview') as ojListView<TodoTask['id'], TodoTask>;
      listView.currentItem = previousElementKey;
      listView.focus();
  };

  const gotoContent = (event: ojListView.ojItemAction<TodoTask['id'], TodoTask>) => {
      if (event.detail.context != null) {
          let key = event.detail.context.key;
          previousElementKey;
          let row = data[key];
          setContent(row.content);
          slide();
          setDisabled(false);
      }
  };

  const slide = () => {
      document.getElementById('page1').classList.toggle('demo-page1-hide');
      document.getElementById('page2').classList.toggle('demo-page2-hide');
  };

  return (
      <div id="listviewContainer" class="demo-container">
            <div id="page1" class="demo-page">
                    <oj-list-view id="listview" aria-label="drill down list" data={dataProvider} onojItemAction={gotoContent}>
                              <template slot="itemTemplate" render={(item) => (
                                        <>
                                            <div class="oj-flex oj-sm-justify-content-space-between oj-sm-align-items-center">
                                                            <span oj-typography-body-md oj-text-color-primary>{item.data.name}</span>
                                                            <div class="oj-flex oj-sm-align-items-center">
                                                                              <span>{item.data.date}</span>
                                                                              <div aria-label="Press enter to see detail" role="img">
                                                                                                  <div role="presentation" class="oj-sm-margin-2x-start oj-listview-drill-icon" />
                                                                                              </div>
                                                                          </div>
                                                        </div>
                                        </>
                                      )} />
                          </oj-list-view>
                </div>
            <div id="page2" class="demo-page demo-page2-hide">
                    <oj-button id="buttonIcon2" onojAction={gotoList} disabled={disabled}>
                              <span slot="startIcon" class="oj-ux-ico-chevron-left" />
                              Back
                          </oj-button>
                    <div class="oj-sm-margin-2x-top demo-panel"><span>{content}</span></div>
                </div>
        </div>
    );
};

export default ListViewDrillableListView;
