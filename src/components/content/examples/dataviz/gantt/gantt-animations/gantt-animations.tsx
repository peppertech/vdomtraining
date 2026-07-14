import 'css!./demo.css';
import 'ojs/ojbutton';
import 'ojs/ojgantt';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttTaskProps = ComponentProps<'oj-gantt-task'>;

type Task = {
  id: string;
  start: string;
  end: string;
  label: string;
  progress: GanttTaskProps['progress'];
};

type Row = {
  id: string;
  tasks: Task[];
};

type RowMappingTemplateContext = {
  data: Row;
};

type TaskMappingTemplateContext = {
  data: Task;
};

const week = 7 * 24 * 60 * 60 * 1000;

const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const randomTask = (id: string, label: string): Task => {
  const start = randomDate(new Date(2016, 0, 1), new Date(2016, 4, 1));
  const end = randomDate(new Date(start), new Date(start.getTime() + 4 * week));
  return {
    id,
    start: start.toISOString(),
    end: end.toISOString(),
    label,
    progress: { value: Math.random() }
  };
};

const generateRandomData = (numRows: number, numTasksPerRow: number): Row[] => {
  return Array.from({ length: numRows }, (_, rowIndex) => ({
    id: `r_${rowIndex}`,
    tasks: Array.from({ length: numTasksPerRow }, (_, taskIndex) =>
      randomTask(`t_${rowIndex}_${taskIndex}`, `Label ${rowIndex}_${taskIndex}`)
    )
  }));
};

export const GanttAnimations = () => {
  const [numTasksPerRow, setNumTasksPerRow] = useState<number>(3);
  const [data, setData] = useState<Row[]>(() => generateRandomData(6, 3));
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<Row['id'], Row>(data, {
        keyAttributes: 'id'
      }),
    [data]
  );

  const updateData = () => {
    setData(generateRandomData(6, numTasksPerRow));
  };

  const addRemoveTask = () => {
    const nextTasksPerRow = numTasksPerRow >= 5 ? 2 : numTasksPerRow + 1;
    setNumTasksPerRow(nextTasksPerRow);
    setData(generateRandomData(6, nextTasksPerRow));
  };

  const rowMappingTemplateRenderer = (row: RowMappingTemplateContext) => {
    return <oj-gantt-row tasks={row.data.tasks} label={row.data.id} />;
  };

  const taskMappingTemplateRenderer = (task: TaskMappingTemplateContext) => {
    return (
      <oj-gantt-task
        taskId={task.data.id}
        start={task.data.start}
        end={task.data.end}
        label={task.data.label}
        progress={task.data.progress}
      />
    );
  };

  const gridlines: GanttProps['gridlines'] = { vertical: 'visible' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'months',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'weeks',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const taskDefaults: GanttProps['taskDefaults'] = { labelPosition: 'end' };
  const ganttProps: Partial<GanttProps> = { gridlines, majorAxis, minorAxis, taskDefaults };

  return (
    <div id="gantt-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="h1" class="oj-typography-subheading-md">
          Options To Control The Gantt Below
        </h2>
        <oj-toolbar id="demoToolBar" aria-label="Animation Toolbar" aria-controls="controlled" chroming="outlined">
          <oj-button id="button1" aria-controls="gantt" onojAction={updateData}>
            Update Values
          </oj-button>
          <oj-button id="button2" aria-controls="gantt" onojAction={addRemoveTask}>
            Add/Remove Task
          </oj-button>
        </oj-toolbar>
      </div>
      <oj-gantt
        id="gantt"
        aria-label="Animations Demo"
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        start="2016-01-01T05:00:00.000Z"
        end="2016-12-31T05:00:00.000Z"
        selectionMode="single"
        viewportStart="2016-01-01T05:00:00.000Z"
        viewportEnd="2016-06-01T04:00:00.000Z"
        rowData={dataProvider}
        class="demo-gantt"
        {...ganttProps}
      >
        <template slot="rowMappingTemplate" render={rowMappingTemplateRenderer} />
        <template slot="taskMappingTemplate" render={taskMappingTemplateRenderer} />
      </oj-gantt>
    </div>
  );
};

export default GanttAnimations;
