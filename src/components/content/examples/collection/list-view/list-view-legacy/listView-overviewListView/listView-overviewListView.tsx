import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { KeySet, KeySetImpl } from 'ojs/ojkeyset';
import { ojListView } from 'ojs/ojlistview';
import 'ojs/ojbutton';
import 'ojs/ojlistview';

type TodoTask = {
  id: number;
  name: string;
  date: string;
  content: string;
};

const tasks: TodoTask[] = [
  { id: 0, name: 'Todo list for work', date: 'Apr 29', content: 'Add one more ListView example' },
  { id: 1, name: 'Running routes', date: 'Apr 3', content: 'Office to kitchen and back' },
  { id: 2, name: 'Groceries', date: 'Apr 1', content: 'Milk, bread, vegetables' }
];

export const ListViewOverviewListView = () => {
  const [selection, setSelection] = useState<KeySet<TodoTask['id']>>(
    new KeySetImpl([]) as KeySet<TodoTask['id']>
  );
  const [activeTask, setActiveTask] = useState<TodoTask | null>(null);
  const dataProvider = useMemo(
    () => new ArrayDataProvider<TodoTask['id'], TodoTask>(tasks, { keyAttributes: 'id' }),
    []
  );

  const handleSelectedChanged = (
    event: ojListView.selectedChanged<TodoTask['id'], TodoTask>
  ) => {
    const nextSelection = event.detail.value as KeySet<TodoTask['id']>;
    setSelection(nextSelection);
    const key = Array.from(((nextSelection as any).values() as Set<TodoTask['id']>))[0];
    setActiveTask(tasks.find((task) => task.id === key) ?? null);
  };

  return (
    <div class="demo-container">
      <div class="demo-view-container">
        <oj-list-view
          id="listview"
          aria-label="list view overview"
          data={dataProvider}
          selected={selection}
          selection-mode="single"
          onselectedChanged={handleSelectedChanged}
        >
          <template
            slot="itemTemplate"
            render={(item: ojListView.ItemTemplateContext<TodoTask['id'], TodoTask>) => (
              <li>
                <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
                <span class="oj-typography-body-xs oj-text-color-secondary oj-sm-margin-2x-start">
                  {item.data.date}
                </span>
              </li>
            )}
          />
        </oj-list-view>
        {activeTask ? (
          <div class="demo-panel oj-sm-margin-4x-top">
            <span>{activeTask.content}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ListViewOverviewListView;
