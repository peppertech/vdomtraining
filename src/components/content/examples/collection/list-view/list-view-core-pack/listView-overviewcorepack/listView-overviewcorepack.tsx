import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useCallback, useMemo, useRef, useState } from 'preact/hooks';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import { KeySetImpl, type ImmutableKeySet } from 'ojs/ojkeyset';
import type { CListViewElement } from 'oj-c/list-view';
import 'css!./demo.css';
import 'ojs/ojbutton';
import 'ojs/ojoption';
import 'ojs/ojrefresher';
import 'ojs/ojswipeactions';
import 'oj-c/avatar';
import 'oj-c/button';
import 'oj-c/input-text';
import 'oj-c/list-item-layout';
import 'oj-c/list-view';
import 'oj-c/selector';
import 'oj-c/selector-all';

type Task = {
  taskId: number;
  taskName: string;
  type: string;
  description: string;
  dateCreated: string;
  dateCompleted: string | null;
  status: string;
};

type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type ItemActionEvent = CListViewElement.ojItemAction<Task['taskId'], Task>;
type ItemTemplateContext = CListViewElement.ItemTemplateContext<Task['taskId'], Task>;
type SelectedChangedEvent = CListViewElement.selectedChanged<Task['taskId'], Task>;

const INITIAL_TASKS: Task[] = [
  {
    taskId: 0,
    taskName: 'Send latest files to Christine',
    type: 'Send',
    description: 'Veniam ut esse ut non ex qui est officia anim dolore laboris.',
    dateCreated: 'Sunday, January 24, 2021 5:25 PM',
    dateCompleted: 'Monday, January 25, 2021 11:26 PM',
    status: 'Completed'
  },
  {
    taskId: 1,
    taskName: 'Ping Kevin',
    type: 'Ping',
    description: 'Labore eiusmod reprehenderit in commodo enim laborum veniam eiusmod tempor eu et.',
    dateCreated: 'Sunday, January 24, 2021 1:53 AM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 2,
    taskName: 'Send latest files to Adam',
    type: 'Send',
    description: 'Officia ipsum quis aute non. Ea eiusmod mollit ullamco sunt dolor.',
    dateCreated: 'Friday, January 1, 2021 2:43 AM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 3,
    taskName: 'Send latest files to Chris',
    type: 'Send',
    description: 'Aliquip mollit tempor ex anim eu velit qui est minim enim ad proident nostrud.',
    dateCreated: 'Friday, January 22, 2021 4:07 AM',
    dateCompleted: 'Sunday, January 24, 2021 5:20 AM',
    status: 'Completed'
  },
  {
    taskId: 4,
    taskName: 'Ping Ben',
    type: 'Ping',
    description: 'Esse id ea pariatur est deserunt proident id do non nulla eiusmod aute.',
    dateCreated: 'Saturday, January 16, 2021 2:57 AM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 5,
    taskName: 'Send latest files to Byron',
    type: 'Send',
    description: 'Lorem eiusmod aliqua culpa occaecat pariatur Lorem adipisicing anim in mollit commodo.',
    dateCreated: 'Tuesday, January 5, 2021 12:44 AM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 6,
    taskName: 'Follow-up with Carlos',
    type: 'Follow-up',
    description: 'Sunt magna sint occaecat eu esse quis duis cupidatat ea.',
    dateCreated: 'Monday, January 11, 2021 6:47 PM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 7,
    taskName: 'Call Ben',
    type: 'Call',
    description: 'Dolor nulla aute anim culpa consectetur ut occaecat anim.',
    dateCreated: 'Thursday, January 7, 2021 10:40 AM',
    dateCompleted: 'Saturday, January 16, 2021 10:17 AM',
    status: 'Completed'
  },
  {
    taskId: 8,
    taskName: 'Call Edwin',
    type: 'Call',
    description: 'Excepteur dolor sunt incididunt aute do commodo tempor veniam velit incididunt elit nisi id.',
    dateCreated: 'Monday, January 25, 2021 3:27 AM',
    dateCompleted: 'Thursday, January 28, 2021 9:54 PM',
    status: 'Completed'
  },
  {
    taskId: 9,
    taskName: 'Follow-up with Ben',
    type: 'Follow-up',
    description: 'Consequat do culpa tempor aute. Occaecat cupidatat voluptate sunt voluptate eu incididunt non in ut fugiat ea.',
    dateCreated: 'Wednesday, January 6, 2021 5:06 PM',
    dateCompleted: 'Thursday, January 21, 2021 1:38 AM',
    status: 'Completed'
  },
  {
    taskId: 10,
    taskName: 'Send latest files to Garry',
    type: 'Send',
    description: 'Sunt fugiat officia ex reprehenderit et amet elit deserunt quis enim.',
    dateCreated: 'Wednesday, January 20, 2021 9:55 AM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 11,
    taskName: 'Follow-up with Holmes',
    type: 'Follow-up',
    description: 'Consectetur esse cillum tempor officia incididunt.',
    dateCreated: 'Sunday, January 17, 2021 1:00 AM',
    dateCompleted: 'Thursday, January 21, 2021 10:03 PM',
    status: 'Completed'
  },
  {
    taskId: 12,
    taskName: 'Call Christine',
    type: 'Call',
    description: 'Commodo adipisicing in irure culpa nulla Lorem velit veniam.',
    dateCreated: 'Friday, January 29, 2021 1:24 AM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 13,
    taskName: 'Ping Alina',
    type: 'Ping',
    description: 'Veniam veniam anim velit deserunt veniam nostrud.',
    dateCreated: 'Thursday, January 14, 2021 1:17 PM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 14,
    taskName: 'Follow-up with Eleanor',
    type: 'Follow-up',
    description: 'Minim ipsum eiusmod id ipsum cupidatat excepteur nostrud proident irure est tempor.',
    dateCreated: 'Tuesday, January 19, 2021 11:35 AM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 15,
    taskName: 'Follow-up with Mason',
    type: 'Follow-up',
    description: 'Ex qui anim nulla anim sit duis irure.',
    dateCreated: 'Monday, January 18, 2021 9:54 AM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 16,
    taskName: 'Send latest files to Kevin',
    type: 'Send',
    description: 'Consectetur laboris nulla proident do amet officia minim incididunt officia.',
    dateCreated: 'Thursday, January 14, 2021 4:26 PM',
    dateCompleted: 'Saturday, January 30, 2021 6:16 PM',
    status: 'Completed'
  },
  {
    taskId: 17,
    taskName: 'Send latest files to Carlos',
    type: 'Send',
    description: 'Nisi aliquip esse aute incididunt amet non pariatur do.',
    dateCreated: 'Sunday, January 10, 2021 9:27 PM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 18,
    taskName: 'Send latest files to Kev',
    type: 'Send',
    description: 'Irure adipisicing id aute consectetur adipisicing voluptate ex enim consequat eiusmod voluptate.',
    dateCreated: 'Sunday, January 3, 2021 5:00 AM',
    dateCompleted: 'Thursday, January 21, 2021 9:54 AM',
    status: 'Completed'
  },
  {
    taskId: 19,
    taskName: 'Call Jan',
    type: 'Call',
    description: 'Eu elit aliquip exercitation irure proident et veniam nostrud sit.',
    dateCreated: 'Friday, January 29, 2021 3:15 AM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 20,
    taskName: 'Call Holmes',
    type: 'Call',
    description: 'Commodo excepteur cupidatat magna velit quis voluptate mollit ipsum in anim.',
    dateCreated: 'Monday, January 25, 2021 4:20 PM',
    dateCompleted: 'Saturday, January 30, 2021 11:35 PM',
    status: 'Completed'
  },
  {
    taskId: 21,
    taskName: 'Follow-up with Harris',
    type: 'Follow-up',
    description: 'Labore excepteur sunt aliquip consectetur occaecat sit do nostrud esse sunt veniam cillum excepteur Lorem.',
    dateCreated: 'Tuesday, January 26, 2021 2:00 PM',
    dateCompleted: 'Friday, January 29, 2021 4:14 AM',
    status: 'Completed'
  },
  {
    taskId: 22,
    taskName: 'Follow-up with Kevin',
    type: 'Follow-up',
    description: 'Nisi occaecat sint aliqua amet ex labore reprehenderit elit irure dolore Lorem commodo consectetur aliqua.',
    dateCreated: 'Monday, January 18, 2021 5:35 AM',
    dateCompleted: 'Sunday, January 24, 2021 3:51 PM',
    status: 'Completed'
  },
  {
    taskId: 23,
    taskName: 'Send latest files to Tin',
    type: 'Send',
    description: 'Velit irure nisi proident eiusmod ea eiusmod cillum tempor eu deserunt quis veniam.',
    dateCreated: 'Friday, January 8, 2021 5:06 PM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 24,
    taskName: 'Ping Carlos',
    type: 'Ping',
    description: 'Ut mollit exercitation et anim do dolor enim excepteur sit laboris.',
    dateCreated: 'Monday, January 18, 2021 4:06 AM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 25,
    taskName: 'Call Carlos',
    type: 'Call',
    description: 'Esse ad nisi exercitation occaecat ad sit eu sint. Duis mollit duis exercitation consequat quis incididunt.',
    dateCreated: 'Sunday, January 17, 2021 11:03 PM',
    dateCompleted: 'Tuesday, January 26, 2021 6:23 AM',
    status: 'Completed'
  },
  {
    taskId: 26,
    taskName: 'Send latest files to Grant',
    type: 'Send',
    description: 'Exercitation elit tempor consequat aute fugiat nulla.',
    dateCreated: 'Monday, January 18, 2021 2:16 PM',
    dateCompleted: 'Sunday, January 24, 2021 6:32 PM',
    status: 'Completed'
  },
  {
    taskId: 27,
    taskName: 'Send latest files to Richard',
    type: 'Send',
    description: 'Velit non nulla consectetur nulla tempor ad eiusmod qui qui. Lorem dolor labore id elit sit deserunt.',
    dateCreated: 'Wednesday, January 20, 2021 12:11 PM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 28,
    taskName: 'Call Josef',
    type: 'Call',
    description: 'Laboris esse quis mollit ea esse ex fugiat excepteur.',
    dateCreated: 'Friday, January 15, 2021 9:04 PM',
    dateCompleted: 'Wednesday, January 27, 2021 3:52 PM',
    status: 'Completed'
  },
  {
    taskId: 29,
    taskName: 'Send latest files to Camilia',
    type: 'Send',
    description: 'Qui quis sit in adipisicing velit exercitation pariatur aliquip exercitation eiusmod.',
    dateCreated: 'Monday, January 25, 2021 10:09 AM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 30,
    taskName: 'Call Mason',
    type: 'Call',
    description: 'Veniam eiusmod consectetur ad occaecat nostrud cupidatat minim consequat incididunt eiusmod.',
    dateCreated: 'Tuesday, January 19, 2021 1:15 AM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 31,
    taskName: 'Call Ellis',
    type: 'Call',
    description: 'Occaecat incididunt sit reprehenderit nostrud quis aliquip cupidatat culpa cupidatat enim sint in.',
    dateCreated: 'Sunday, January 3, 2021 2:06 AM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 32,
    taskName: 'Send latest files to Steve',
    type: 'Send',
    description: 'Quis esse Lorem incididunt excepteur laboris ea ut consectetur non Lorem dolor in.',
    dateCreated: 'Sunday, January 17, 2021 4:46 AM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 33,
    taskName: 'Ping Lana',
    type: 'Ping',
    description: 'Ullamco eiusmod Lorem reprehenderit et deserunt in duis cupidatat non magna dolore pariatur commodo adipisicing.',
    dateCreated: 'Thursday, January 7, 2021 3:02 PM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 34,
    taskName: 'Call Murray',
    type: 'Call',
    description: 'Laboris cupidatat consequat exercitation esse laboris ullamco fugiat incididunt voluptate enim elit officia.',
    dateCreated: 'Sunday, January 24, 2021 8:18 AM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 35,
    taskName: 'Follow-up with Murray',
    type: 'Follow-up',
    description: 'Do deserunt magna elit anim enim magna eiusmod consectetur ea mollit proident.',
    dateCreated: 'Friday, January 15, 2021 9:01 AM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 36,
    taskName: 'Send latest files to Harry',
    type: 'Send',
    description: 'Lorem laboris ullamco nisi ullamco.',
    dateCreated: 'Saturday, January 9, 2021 9:33 PM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 37,
    taskName: 'Follow-up with Christine',
    type: 'Follow-up',
    description: 'Reprehenderit ad est ea et ex aliquip laborum reprehenderit excepteur anim amet incididunt.',
    dateCreated: 'Saturday, January 23, 2021 1:01 PM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 38,
    taskName: 'Send latest files to Alina',
    type: 'Send',
    description: 'Ex occaecat cupidatat cupidatat duis enim non ut cupidatat.',
    dateCreated: 'Saturday, January 9, 2021 6:40 PM',
    dateCompleted: 'Saturday, January 23, 2021 8:08 PM',
    status: 'Completed'
  },
  {
    taskId: 39,
    taskName: 'Send latest files to Perry',
    type: 'Send',
    description: 'Culpa do duis fugiat ea nulla in excepteur aliqua minim.',
    dateCreated: 'Monday, January 25, 2021 12:59 AM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 40,
    taskName: 'Call Cameron',
    type: 'Call',
    description: 'Duis elit qui ea anim mollit tempor.',
    dateCreated: 'Wednesday, January 20, 2021 4:47 AM',
    dateCompleted: 'Friday, January 22, 2021 10:55 PM',
    status: 'Completed'
  },
  {
    taskId: 41,
    taskName: 'Follow-up with Natalie',
    type: 'Follow-up',
    description: 'Lorem sint incididunt ea nisi consectetur duis mollit aute qui adipisicing.',
    dateCreated: 'Monday, January 18, 2021 1:47 PM',
    dateCompleted: 'Saturday, January 30, 2021 7:24 AM',
    status: 'Completed'
  },
  {
    taskId: 42,
    taskName: 'Send latest files to Sofia',
    type: 'Send',
    description: 'Et Lorem occaecat exercitation labore tempor incididunt dolore id.',
    dateCreated: 'Friday, January 1, 2021 8:20 AM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 43,
    taskName: 'Send latest files to Brooke',
    type: 'Send',
    description: 'Nisi minim consequat proident enim minim ad tempor eiusmod velit Lorem enim amet.',
    dateCreated: 'Sunday, January 3, 2021 12:04 PM',
    dateCompleted: 'Tuesday, January 12, 2021 12:12 PM',
    status: 'Completed'
  },
  {
    taskId: 44,
    taskName: 'Follow-up with Martin',
    type: 'Follow-up',
    description: 'Dolor aliquip est incididunt nulla id laboris pariatur fugiat proident.',
    dateCreated: 'Wednesday, January 20, 2021 9:25 AM',
    dateCompleted: 'Saturday, January 23, 2021 9:25 AM',
    status: 'Completed'
  },
  {
    taskId: 45,
    taskName: 'Send latest files to Fenton',
    type: 'Send',
    description: 'Eiusmod ipsum Lorem incididunt officia magna consequat qui quis.',
    dateCreated: 'Monday, January 11, 2021 6:36 AM',
    dateCompleted: null,
    status: 'Work in Progress'
  },
  {
    taskId: 46,
    taskName: 'Send latest files to Ben',
    type: 'Send',
    description: 'Cillum deserunt veniam labore aute amet reprehenderit id ut id amet deserunt anim.',
    dateCreated: 'Sunday, January 3, 2021 9:12 PM',
    dateCompleted: 'Monday, January 4, 2021 7:15 PM',
    status: 'Completed'
  },
  {
    taskId: 47,
    taskName: 'Call Moore',
    type: 'Call',
    description: 'Ea quis velit id exercitation laboris et nostrud fugiat exercitation enim.',
    dateCreated: 'Sunday, January 17, 2021 4:29 AM',
    dateCompleted: null,
    status: 'Not Started'
  },
  {
    taskId: 48,
    taskName: 'Call Fowler',
    type: 'Call',
    description: 'Non velit do proident fugiat excepteur esse commodo adipisicing ad esse est eu.',
    dateCreated: 'Friday, January 22, 2021 4:25 PM',
    dateCompleted: 'Monday, January 25, 2021 6:40 AM',
    status: 'Completed'
  },
  {
    taskId: 49,
    taskName: 'Call Foster',
    type: 'Call',
    description: 'Dolor adipisicing ut duis proident consequat aute.',
    dateCreated: 'Friday, January 15, 2021 2:13 PM',
    dateCompleted: 'Wednesday, January 27, 2021 4:30 AM',
    status: 'Completed'
  }
];

const createSelectedKeys = (keys: Task['taskId'][] = []) =>
  new KeySetImpl<Task['taskId']>(keys) as ImmutableKeySet<Task['taskId']>;

type ListMode = 'view' | 'edit';
type PanelMode = 'add' | 'edit' | null;
type DraftTaskField = Exclude<keyof Task, 'taskId'>;

type ButtonsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-buttonset-one'>['onvalueChanged']>
>[0];
type ReorderEvent = CListViewElement.ojReorder<Task['taskId']>;

const createDraftTask = (taskId: Task['taskId']): Task => ({
  taskId,
  taskName: '',
  type: 'Follow-up',
  description: '',
  dateCreated: new Date().toString(),
  dateCompleted: null,
  status: 'Not Started'
});

const getSelectedIds = (tasks: Task[], selected: ImmutableKeySet<Task['taskId']>) => {
  const selectedKeys = selected.keys;
  if (selectedKeys.all) {
    return tasks
      .filter((task) => !selectedKeys.deletedKeys.has(task.taskId))
      .map((task) => task.taskId);
  }

  return tasks
    .filter((task) => selectedKeys.keys.has(task.taskId))
    .map((task) => task.taskId);
};

const formatDate = (dateString: string | null) => {
  if (!dateString) {
    return 'Not completed';
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'full',
    timeStyle: 'short'
  }).format(date);
};

const getIconColor = (type: Task['type']) => {
  switch (type) {
    case 'Send':
      return 'blue';
    case 'Call':
      return 'green';
    case 'Follow-up':
      return 'purple';
    case 'Ping':
      return 'orange';
    default:
      return 'neutral';
  }
};

const getIconClass = (type: Task['type']) => {
  switch (type) {
    case 'Send':
      return 'oj-ux-ico-send';
    case 'Call':
      return 'oj-ux-ico-call';
    case 'Follow-up':
      return 'oj-ux-ico-email-reply';
    case 'Ping':
      return 'oj-ux-ico-message';
    default:
      return 'oj-ux-ico-task';
  }
};

const getBadgeClass = (status: Task['status']) => {
  switch (status) {
    case 'Not Started':
      return 'oj-badge oj-badge-warning';
    case 'Completed':
      return 'oj-badge oj-badge-success';
    case 'Work in Progress':
      return 'oj-badge oj-badge-info';
    default:
      return 'oj-badge';
  }
};

const renderNoData = () => (
  <div class="demo-overview-no-data oj-flex oj-sm-align-items-center">
    <div class="oj-flex oj-sm-align-items-center oj-sm-flex-direction-column">
      <h5>There are no tasks!</h5>
    </div>
  </div>
);

export const ListViewOverviewcorepack = () => {
  const [tasks, setTasks] = useState<Task[]>(() => [...INITIAL_TASKS]);
  const [mode, setMode] = useState<ListMode>('view');
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [activeTaskId, setActiveTaskId] = useState<Task['taskId'] | null>(null);
  const [selected, setSelected] = useState<ImmutableKeySet<Task['taskId']>>(
    createSelectedKeys()
  );
  const nextIdRef = useRef(Math.max(...INITIAL_TASKS.map((task) => task.taskId)) + 1);
  const [draftTask, setDraftTask] = useState<Task>(() => createDraftTask(nextIdRef.current));

  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<Task['taskId'], Task>([...INITIAL_TASKS], {
        keyAttributes: 'taskId'
      }),
    []
  );
  const listViewItemConfig = useMemo(() => ({ enterKeyFocusBehavior: 'none' as const }), []);
  const gridlines = useMemo(() => ({ item: 'visible' as const, bottom: 'visible' as const }), []);
  const scrollPolicyOptions = useMemo(() => ({ fetchSize: 15 }), []);
  const reorderable = useMemo(() => ({ items: 'enabled' as const }), []);
  const activeTask =
    activeTaskId == null ? null : tasks.find((task) => task.taskId === activeTaskId) ?? null;
  const selectedIds = getSelectedIds(tasks, selected);

  const applyTasks = useCallback(
    (nextTasks: Task[]) => {
      dataProvider.data = nextTasks;
      setTasks(nextTasks);
    },
    [dataProvider]
  );

  const selectTask = (task: Task | null) => {
    setActiveTaskId(task?.taskId ?? null);
    setDraftTask(task ? { ...task } : createDraftTask(nextIdRef.current));
  };

  const handleSelectedChanged = (event: SelectedChangedEvent) => {
    const nextSelected = event.detail.value ?? createSelectedKeys();
    setSelected(nextSelected);
  };

  const handleSelectorSelectedKeysChanged = (event: SelectedChangedEvent) => {
    setSelected(event.detail.value ?? createSelectedKeys());
  };

  const handleItemAction = (event: ItemActionEvent) => {
    const key = event.detail.context.item.metadata.key;
    const nextActiveTask = tasks.find((task) => task.taskId === key) ?? null;
    selectTask(nextActiveTask);
    setPanelMode(nextActiveTask ? 'edit' : null);
  };

  const updateDraftTask = (field: DraftTaskField, value: string) => {
    setDraftTask((currentDraft) => ({
      ...currentDraft,
      [field]: field === 'dateCompleted' && value.trim().length === 0 ? null : value
    }));
  };

  const handleDraftFieldChanged =
    (field: DraftTaskField) => (event: InputTextValueChangedEvent) => {
      updateDraftTask(field, event.detail.value ?? '');
    };

  const handleOpenAddPanel = () => {
    const nextDraftTask = createDraftTask(nextIdRef.current);
    setDraftTask(nextDraftTask);
    setActiveTaskId(null);
    setPanelMode('add');
    setMode('view');
  };

  const handleUpdateTask = () => {
    if (!activeTask) {
      return;
    }

    const taskName = draftTask.taskName.trim();
    if (taskName.length === 0) {
      return;
    }

    const updatedTask = { ...draftTask, taskName, taskId: activeTask.taskId };
    applyTasks(
      tasks.map((task) =>
        task.taskId === activeTask.taskId ? updatedTask : task
      )
    );
    selectTask(updatedTask);
  };

  const handleCreateTask = () => {
    const taskName = draftTask.taskName.trim();
    if (taskName.length === 0) {
      return;
    }

    const nextTask = { ...draftTask, taskName, taskId: nextIdRef.current };
    nextIdRef.current += 1;
    applyTasks([nextTask, ...tasks]);
    setPanelMode(null);
    selectTask(null);
  };

  const handleClosePanel = () => {
    setPanelMode(null);
    selectTask(null);
  };

  const handleModeChanged = (event: ButtonsetValueChangedEvent) => {
    const nextMode = event.detail.value as ListMode | undefined;
    if (!nextMode) {
      return;
    }

    setMode(nextMode);
    setSelected(createSelectedKeys());
  };

  const handleCompleteTask = (taskId: Task['taskId']) => {
    applyTasks(
      tasks.map((task) =>
        task.taskId === taskId
          ? { ...task, status: 'Completed', dateCompleted: new Date().toString() }
          : task
      )
    );
  };

  const removeTaskIds = (taskIds: Task['taskId'][]) => {
    const removedIds = new Set(taskIds);
    const remainingTasks = tasks.filter((task) => !removedIds.has(task.taskId));
    applyTasks(remainingTasks);
    setSelected(createSelectedKeys());
    if (activeTask && removedIds.has(activeTask.taskId)) {
      selectTask(null);
      setPanelMode(null);
    }
  };

  const handleSwipeAction = (event: any, item: ItemTemplateContext) => {
    const action = event.target.value;
    if (action === 'complete') {
      handleCompleteTask(item.data.taskId);
    } else if (action === 'trash') {
      removeTaskIds([item.data.taskId]);
    }
  };

  const handleDeleteSelectedTasks = () => {
    if (selectedIds.length > 0) {
      removeTaskIds(selectedIds);
    }
  };

  const handleReorder = (event: ReorderEvent) => {
    const taskById = new Map(tasks.map((task) => [task.taskId, task]));
    const reorderedTasks = event.detail.reorderedKeys
      .map((taskId) => taskById.get(taskId))
      .filter((task): task is Task => task != null);
    if (reorderedTasks.length === tasks.length) {
      applyTasks(reorderedTasks);
    }
  };

  const refreshFunc = () =>
    new Promise<void>((resolve) => {
      setTimeout(resolve, 1000);
    });

  const renderTaskLayout = (item: ItemTemplateContext, isEditItem = false) => (
    <oj-c-list-item-layout>
      <span class="oj-typography-body-md oj-text-color-primary">{item.data.taskName}</span>
      {isEditItem ? (
        <oj-c-selector
          slot="selector"
          selectedKeys={selected as any}
          rowKey={item.data.taskId}
          selectionMode="multiple"
          onselectedKeysChanged={handleSelectorSelectedKeysChanged}
        />
      ) : null}
      <oj-c-avatar
        slot="leading"
        background={getIconColor(item.data.type) as any}
        size="xs"
        iconClass={getIconClass(item.data.type)}
        aria-label="Circular icon with type icon"
        shape="circle"
      />
      <span class={getBadgeClass(item.data.status)} slot={isEditItem ? 'trailing' : 'metadata'}>
        {item.data.status}
      </span>
      {!isEditItem ? (
        <span
          slot="trailing"
          role="presentation"
          class="oj-sm-margin-2x-start oj-sm-align-items-flex-end oj-ux-ico-chevron-right"
        />
      ) : null}
      <span slot="tertiary" class="oj-line-clamp-2 oj-typography-body-xs oj-text-color-secondary">
        {item.data.description}
      </span>
      <div slot="quaternary" class="oj-typography-body-xs oj-text-color-secondary">
        <div>{formatDate(item.data.dateCreated)}</div>
        <div>{formatDate(item.data.dateCompleted)}</div>
      </div>
    </oj-c-list-item-layout>
  );

  const renderViewItem = (item: ItemTemplateContext) => (
    <div class="oj-swipeactions-container">
      <oj-swipe-actions onojAction={(event: any) => handleSwipeAction(event, item)}>
        {renderTaskLayout(item)}
        <template
          slot="start"
          render={() => (
            <oj-option class="oj-swipeactions-default" value="complete">
              Complete
              <span class="oj-ux-ico-check" slot="startIcon" />
            </oj-option>
          )}
        />
        <template
          slot="end"
          render={() => (
            <oj-option class="oj-swipeactions-danger oj-swipeactions-default" value="trash">
              Delete
              <span class="oj-ux-ico-trash" slot="startIcon" />
            </oj-option>
          )}
        />
      </oj-swipe-actions>
    </div>
  );

  const renderEditItem = (item: ItemTemplateContext) => <div>{renderTaskLayout(item, true)}</div>;

  return (
    <div class="demo-overview-layout">
      <div class="demo-overview-toolbar">
        <div class="demo-overview-toolbar__actions">
          <oj-c-button
            id="addButton"
            chroming="outlined"
            label="Create New Task"
            onojAction={handleOpenAddPanel}
          />
          {tasks.length > 0 ? (
            <oj-c-button
              id="removeButton"
              chroming="outlined"
              label="Delete Task(s)"
              disabled={selectedIds.length === 0}
              onojAction={handleDeleteSelectedTasks}
            />
          ) : null}
        </div>
        <oj-buttonset-one
          id="mode"
          display="icons"
          value={mode}
          aria-label="Choose edit/view mode"
          chroming="borderless"
          onvalueChanged={handleModeChanged}
        >
          <oj-option value="edit">
            <span slot="startIcon" class="oj-ux-ico-edit" />
            Edit To-Do List
          </oj-option>
          <oj-option value="view">
            <span slot="startIcon" class="oj-ux-ico-list" />
            View To-Do List
          </oj-option>
        </oj-buttonset-one>
      </div>
      <div class={panelMode ? 'demo-overview-content demo-overview-content--with-panel' : 'demo-overview-content'}>
        <div>
          {mode === 'view' ? (
            <oj-refresher
              id="refresher"
              refreshContent={refreshFunc}
              text="Checking for updates"
            >
              <oj-c-list-view
                id="listviewViewMode"
                aria-label="To-Do list"
                data={dataProvider}
                onojItemAction={handleItemAction}
                item={listViewItemConfig}
                gridlines={gridlines}
                scrollPolicyOptions={scrollPolicyOptions}
                class="demo-overview-list demo-list-view-mode oj-listview-item-padding-off"
              >
                <template slot="itemTemplate" render={renderViewItem} />
                <template slot="noData" render={renderNoData} />
              </oj-c-list-view>
            </oj-refresher>
          ) : (
            <>
              {tasks.length > 0 ? (
                <oj-c-list-item-layout>
                  <oj-c-selector-all
                    slot="selector"
                    selectedKeys={selected as any}
                    id="selectAll"
                    aria-label="Select all"
                    onselectedKeysChanged={handleSelectorSelectedKeysChanged}
                  />
                  <span id="selectAllText">Select All</span>
                </oj-c-list-item-layout>
              ) : null}
              <oj-c-list-view
                id="listviewEditMode"
                aria-label="To-Do list"
                data={dataProvider}
                selected={selected}
                selectionMode="multiple"
                onselectedChanged={handleSelectedChanged}
                item={listViewItemConfig}
                gridlines={gridlines}
                reorderable={reorderable}
                onojReorder={handleReorder}
                scrollPolicyOptions={scrollPolicyOptions}
                class="demo-overview-list demo-list-edit-mode oj-listview-item-padding-off"
              >
                <template slot="itemTemplate" render={renderEditItem} />
                <template slot="noData" render={renderNoData} />
              </oj-c-list-view>
            </>
          )}
        </div>
        {panelMode ? (
          <section class="demo-overview-detail oj-bg-neutral-30" aria-live="polite">
            <div class="oj-typography-subheading-sm oj-text-color-primary">
              {panelMode === 'add' ? 'Create New Task' : 'Edit Task'}
            </div>
            <div class="demo-overview-detail__metadata oj-typography-body-sm oj-text-color-secondary">
              <div>Task ID: {draftTask.taskId}</div>
              <div>Created: {formatDate(draftTask.dateCreated)}</div>
              <div>Completed: {formatDate(draftTask.dateCompleted)}</div>
            </div>
            <oj-c-input-text
              id="overviewTaskName"
              labelHint="Task name"
              value={draftTask.taskName}
              onvalueChanged={handleDraftFieldChanged('taskName')}
            />
            <oj-c-input-text
              id="overviewTaskType"
              labelHint="Type"
              value={draftTask.type}
              onvalueChanged={handleDraftFieldChanged('type')}
            />
            <oj-c-input-text
              id="overviewTaskStatus"
              labelHint="Status"
              value={draftTask.status}
              onvalueChanged={handleDraftFieldChanged('status')}
            />
            <oj-c-input-text
              id="overviewTaskDescription"
              labelHint="Description"
              value={draftTask.description}
              onvalueChanged={handleDraftFieldChanged('description')}
            />
            <oj-c-input-text
              id="overviewTaskDateCreated"
              labelHint="Date created"
              value={draftTask.dateCreated}
              onvalueChanged={handleDraftFieldChanged('dateCreated')}
            />
            <oj-c-input-text
              id="overviewTaskDateCompleted"
              labelHint="Date completed"
              value={draftTask.dateCompleted ?? ''}
              onvalueChanged={handleDraftFieldChanged('dateCompleted')}
            />
            <div class="demo-overview-detail__actions">
              <oj-c-button
                label={panelMode === 'add' ? 'Create' : 'Update'}
                onojAction={panelMode === 'add' ? handleCreateTask : handleUpdateTask}
                disabled={draftTask.taskName.trim().length === 0}
              />
              <oj-c-button label="Cancel" chroming="outlined" onojAction={handleClosePanel} />
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default ListViewOverviewcorepack;
