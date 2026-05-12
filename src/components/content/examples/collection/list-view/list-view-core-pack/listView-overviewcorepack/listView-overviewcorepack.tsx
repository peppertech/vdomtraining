import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import { KeySetImpl, type ImmutableKeySet } from 'ojs/ojkeyset';
import type { CListViewElement } from 'oj-c/list-view';
import 'css!./demo.css';
import 'oj-c/button';
import 'oj-c/input-text';
import 'oj-c/list-item-layout';
import 'oj-c/list-view';

type Task = {
  id: number;
  title: string;
  date: string;
  detail: string;
};

type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type ItemActionEvent = CListViewElement.ojItemAction<Task['id'], Task>;
type ItemTemplateContext = CListViewElement.ItemTemplateContext<Task['id'], Task>;
type FirstSelectedItemEvent = CListViewElement.ojFirstSelectedItem<Task['id'], Task>;
type SelectedChangedEvent = CListViewElement.selectedChanged<Task['id'], Task>;

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: 'Prepare list view examples',
    date: 'Apr 29',
    detail: 'Review the collection demos and make sure the list view recipes are wired.'
  },
  {
    id: 2,
    title: 'Review release notes',
    date: 'Apr 30',
    detail: 'Check component behavior changes before publishing the cookbook update.'
  },
  {
    id: 3,
    title: 'Follow up on design review',
    date: 'May 02',
    detail: 'Capture feedback from the review and update the remaining examples.'
  }
];

const createSelectedKeys = (keys: Task['id'][] = []) =>
  new KeySetImpl<Task['id']>(keys) as ImmutableKeySet<Task['id']>;

const getSelectedIds = (tasks: Task[], selected: ImmutableKeySet<Task['id']>) =>
  tasks.filter((task) => selected.has(task.id)).map((task) => task.id);

const getFirstSelectedKey = (selected: ImmutableKeySet<Task['id']>, tasks: Task[]) => {
  if (selected.keys.all) {
    return tasks[0]?.id ?? null;
  }

  const [key] = Array.from(selected.keys.keys.values());
  return typeof key === 'number' ? key : null;
};

const renderNoData = () => (
  <div class="demo-overview-no-data oj-typography-body-md oj-text-color-secondary">
    No tasks to display
  </div>
);

export const ListViewOverviewcorepack = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<Task['id']>(INITIAL_TASKS[0].id);
  const [selected, setSelected] = useState<ImmutableKeySet<Task['id']>>(
    createSelectedKeys([INITIAL_TASKS[0].id])
  );
  const [draftTitle, setDraftTitle] = useState(INITIAL_TASKS[0].title);
  const nextIdRef = useRef(Math.max(...INITIAL_TASKS.map((task) => task.id)) + 1);

  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<Task['id'], Task>(tasks, {
        keyAttributes: 'id'
      }),
    [tasks]
  );
  const activeTask = tasks.find((task) => task.id === activeTaskId) ?? tasks[0] ?? null;
  const selectedIds = getSelectedIds(tasks, selected);

  const selectTask = (task: Task | null) => {
    setActiveTaskId(task?.id ?? 0);
    setSelected(task ? createSelectedKeys([task.id]) : createSelectedKeys());
    setDraftTitle(task?.title ?? '');
  };

  const handleSelectedChanged = (event: SelectedChangedEvent) => {
    const nextSelected = event.detail.value ?? createSelectedKeys();
    setSelected(nextSelected);

    const selectedKey = getFirstSelectedKey(nextSelected, tasks);
    const nextActiveTask = tasks.find((task) => task.id === selectedKey) ?? null;
    if (nextActiveTask) {
      setActiveTaskId(nextActiveTask.id);
      setDraftTitle(nextActiveTask.title);
    }
  };

  const handleFirstSelectedItem = (event: FirstSelectedItemEvent) => {
    if (typeof event.detail.key === 'number') {
      setActiveTaskId(event.detail.key);
      setDraftTitle(event.detail.data.title);
    }
  };

  const handleItemAction = (event: ItemActionEvent) => {
    const key = event.detail.context.item.metadata.key;
    const nextActiveTask = tasks.find((task) => task.id === key) ?? null;
    selectTask(nextActiveTask);
  };

  const handleDraftTitleChanged = (event: InputTextValueChangedEvent) => {
    setDraftTitle(event.detail.value ?? '');
  };

  const handleAddTask = () => {
    const title = draftTitle.trim() || `New task ${nextIdRef.current}`;
    const nextTask: Task = {
      id: nextIdRef.current,
      title,
      date: 'Today',
      detail: 'Newly added task from the overview demo.'
    };
    nextIdRef.current += 1;
    setTasks((currentTasks) => [nextTask, ...currentTasks]);
    selectTask(nextTask);
    setIsEditMode(false);
  };

  const handleUpdateTask = () => {
    if (!activeTask) {
      return;
    }

    const title = draftTitle.trim();
    if (title.length === 0) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === activeTask.id ? { ...task, title } : task))
    );
  };

  const handleRemoveTasks = () => {
    if (selectedIds.length === 0) {
      return;
    }

    setTasks((currentTasks) => {
      const remainingTasks = currentTasks.filter((task) => !selected.has(task.id));
      const nextActiveTask = remainingTasks[0] ?? null;
      selectTask(nextActiveTask);
      return remainingTasks;
    });
  };

  const handleToggleMode = () => {
    const nextEditMode = !isEditMode;
    setIsEditMode(nextEditMode);
    if (!nextEditMode && activeTask) {
      setSelected(createSelectedKeys([activeTask.id]));
    }
  };

  const renderItem = (item: ItemTemplateContext) => (
    <oj-c-list-item-layout>
      <span class="oj-typography-body-md oj-text-color-primary">{item.data.title}</span>
      <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
        {item.data.detail}
      </span>
      <span slot="tertiary" class="oj-typography-body-xs oj-text-color-secondary">
        {item.data.date}
      </span>
    </oj-c-list-item-layout>
  );

  return (
    <div class="demo-overview-layout">
      <div class="demo-overview-toolbar oj-bg-neutral-30">
        <oj-c-input-text
          id="overviewTaskTitle"
          labelHint="Task title"
          value={draftTitle}
          onvalueChanged={handleDraftTitleChanged}
        />
        <div class="demo-overview-toolbar__actions">
          <oj-c-button label="Add" onojAction={handleAddTask} />
          <oj-c-button label="Update" onojAction={handleUpdateTask} disabled={!activeTask} />
          <oj-c-button label="Remove" onojAction={handleRemoveTasks} disabled={selectedIds.length === 0} />
          <oj-c-button label={isEditMode ? 'View Mode' : 'Edit Mode'} onojAction={handleToggleMode} />
        </div>
      </div>
      <div class="demo-overview-content">
        <oj-c-list-view
          id="listview"
          aria-label="list view overview"
          data={dataProvider}
          selected={selected}
          selectionMode={isEditMode ? 'multipleToggle' : 'singleRequired'}
          onselectedChanged={handleSelectedChanged}
          onojFirstSelectedItem={handleFirstSelectedItem}
          onojItemAction={handleItemAction}
          item={{ enterKeyFocusBehavior: 'none' }}
          gridlines={{ item: 'visible', bottom: 'visible' }}
          class="demo-overview-list oj-listview-item-padding-off"
        >
          <template slot="itemTemplate" render={renderItem} />
          <template slot="noData" render={renderNoData} />
        </oj-c-list-view>
        <section class="demo-overview-detail oj-bg-neutral-30" aria-live="polite">
          {activeTask ? (
            <>
              <div class="oj-typography-subheading-sm oj-text-color-primary">
                {activeTask.title}
              </div>
              <div class="oj-typography-body-sm oj-text-color-secondary">{activeTask.date}</div>
              <p class="oj-typography-body-md">{activeTask.detail}</p>
            </>
          ) : (
            <div class="oj-typography-body-md oj-text-color-secondary">No task selected</div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ListViewOverviewcorepack;
