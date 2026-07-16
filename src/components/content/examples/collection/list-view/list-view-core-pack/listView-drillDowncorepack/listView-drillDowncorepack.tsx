// @ts-nocheck
import 'css!./demo.css';
import 'oj-c/button';
import 'oj-c/list-view';
import type { CListViewElement } from 'oj-c/list-view';
import 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface TodoTask {
    id: number;
    name: string;
    date: string;
    content: string;
}

export const ListViewDrillDowncorepack = () => {
  const listViewRef = useRef<CListViewElement<TodoTask['id'], TodoTask> | null>(null);
  const page1Ref = useRef<HTMLDivElement | null>(null);
  const page2Ref = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [previousElementKey, setPreviousElementKey] = useState<TodoTask['id'] | null>(null);
  const [currentItemOverride, setCurrentItemOverride] = useState<{ rowKey: TodoTask['id'] } | undefined>();
  const itemConfig = useMemo(() => ({ enterKeyFocusBehavior: 'none' as const }), []);

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
  ], []);
  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keys: data.map((value) => {
          return value.id;
      })
  }), [data]);

  const gotoList = () => {
      slide();
      setDisabled(true);
      if (previousElementKey != null) {
          setCurrentItemOverride({ rowKey: previousElementKey });
      }
      listViewRef.current?.focus();
  };

  const gotoContent = (event: CListViewElement.ojItemAction<TodoTask['id'], TodoTask>) => {
      const context = event.detail.context;
      if (context != null) {
          const key = context.item.metadata.key;
          setPreviousElementKey(key);
          setCurrentItemOverride(undefined);
          setContent(context.item.data.content);
          slide();
          setDisabled(false);
      }
  };

  const slide = () => {
      page1Ref.current?.classList.toggle('demo-page1-hide');
      page2Ref.current?.classList.toggle('demo-page2-hide');
  };

  const renderItem: import("ojs/ojvcomponent").TemplateSlot<{ data: TodoTask }> = (item) => (
    <>
      <div class="oj-flex oj-sm-justify-content-space-between oj-sm-align-items-center">
        <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
        <div class="oj-flex oj-sm-align-items-center">
          <span>{item.data.date}</span>
          <div aria-label="Press enter to see detail" role="img">
            <div role="presentation" class="oj-sm-margin-2x-start oj-listview-drill-icon" />
          </div>
        </div>
      </div>
    </>
  );

  return (
      <div id="listviewContainer" class="demo-container">
            <div ref={page1Ref} id="page1" class="demo-page">
                    <oj-c-list-view ref={listViewRef} id="listview" aria-label="drill down list" data={dataProvider} currentItemOverride={currentItemOverride} item={itemConfig} onojItemAction={gotoContent}>
                              <template slot="itemTemplate" render={renderItem} />
                          </oj-c-list-view>
                </div>
            <div ref={page2Ref} id="page2" class="demo-page demo-page2-hide">
                    <oj-c-button id="buttonIcon2" label="Back" onojAction={gotoList} disabled={disabled}>
                              <span slot="startIcon" class="oj-ux-ico-chevron-left" />
                          </oj-c-button>
                    <div class="oj-sm-margin-2x-top demo-panel"><span>{content}</span></div>
                </div>
        </div>
    );
};

export default ListViewDrillDowncorepack;
