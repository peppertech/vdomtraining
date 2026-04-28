import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as rowDataText from 'text!../data/cookbook/dataVisualizations/gantt/taskDepTemplates/rowData.json';
import * as depDataText from 'text!../data/cookbook/dataVisualizations/gantt/taskDepTemplates/depData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojgantt';
import 'css!./demo.css';

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttTaskProps = ComponentProps<'oj-gantt-task'>;
type GanttStart = GanttProps['start'];
type GanttEnd = GanttProps['end'];
type TextDirection = 'ltr' | 'rtl';

type GanttTask = {
  id: string;
  workId: string;
  label: string;
  assignee: string;
  begin: string;
  finish: string;
  profile: string;
};

type GanttRowData = {
  workId: string;
  tasks: GanttTask[];
};

type GanttDependency = {
  id: string;
  predecessor: string;
  successor: string;
  relation: NonNullable<ComponentProps<'oj-gantt-dependency'>['type']>;
};

type RowMappingTemplateContext = {
  data: GanttRowData;
};

type TaskMappingTemplateContext = {
  data: GanttTask;
};

type DependencyTemplateContext = {
  data: GanttDependency;
};

type TaskContentTemplateContext = {
  data: GanttTask;
  itemData: GanttTask;
  content: {
    width: number;
    height: number;
  };
};

type DependencyContentTemplateContext = {
  content: {
    predecessorX: number;
    predecessorY: number;
    successorX: number;
    successorY: number;
  };
  state: {
    focused: boolean;
  };
};

type TooltipTemplateContext = {
  itemData: GanttTask;
  data: {
    start: string;
    end: string;
  };
};

const rowData = JSON.parse(rowDataText as string) as GanttRowData[];
const depData = JSON.parse(depDataText as string) as GanttDependency[];

export const GanttTaskDepTemplates = () => {
  const rowDataProvider = useMemo(
    () =>
      new ArrayDataProvider<GanttRowData['workId'], GanttRowData>(rowData, {
        keyAttributes: 'workId'
      }),
    []
  );
  const dependenciesDataProvider = useMemo(
    () =>
      new ArrayDataProvider<GanttDependency['id'], GanttDependency>(depData, {
        keyAttributes: 'id'
      }),
    []
  );
  const projectStartDate = useMemo<GanttStart>(() => new Date('Jan 3, 2021').toISOString(), []);
  const projectEndDate = useMemo<GanttEnd>(() => new Date('Oct 3, 2021').toISOString(), []);
  const currentDate = useMemo(() => new Date('Mar 28, 2021'), []);
  const dir = (document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr') as TextDirection;
  const dateConverter = useMemo(
    () =>
      new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'long'
      }),
    []
  );
  const referenceObjects = useMemo(
    () => [{ value: currentDate.toISOString() }],
    [currentDate]
  );

  const getTaskStatus = (taskData: GanttTask) => {
    return new Date(taskData.finish) < currentDate ? 'Completed' : 'In Progress';
  };

  const getTaskShortDesc = (taskData: GanttTask) => {
    return `${taskData.workId}, ${taskData.label}, assigned to ${taskData.assignee}, Spans ${dateConverter.format(taskData.begin)} to ${dateConverter.format(taskData.finish)}, ${getTaskStatus(taskData)}`;
  };

  const getTaskStatusClass = (taskData: GanttTask) => {
    return getTaskStatus(taskData) === 'Completed' ? 'demoGanttStatusDone' : 'demo-gantt-status-progress';
  };

  const getDepPath = (content: DependencyContentTemplateContext['content']) => {
    return `M ${content.predecessorX} ${content.predecessorY} L ${content.successorX} ${content.successorY}`;
  };

  const rowMappingTemplateRenderer = (row: RowMappingTemplateContext) => {
    return <oj-gantt-row label={row.data.workId} tasks={row.data.tasks} />;
  };

  const taskMappingTemplateRenderer = (task: TaskMappingTemplateContext) => {
    const progress: GanttTaskProps['progress'] = { value: 0 };
    return (
      <oj-gantt-task
        taskId={task.data.id}
        start={task.data.begin}
        end={task.data.finish}
        label={task.data.label}
        shortDesc={getTaskShortDesc(task.data)}
        progress={progress}
      />
    );
  };

  const dependencyTemplateRenderer = (dependency: DependencyTemplateContext) => {
    return (
      <oj-gantt-dependency
        predecessorTaskId={dependency.data.predecessor}
        successorTaskId={dependency.data.successor}
        type={dependency.data.relation}
      />
    );
  };

  const taskContentTemplateRenderer = (task: TaskContentTemplateContext) => {
    const translateX = dir === 'ltr' ? 10 : -10;
    return (
      <svg>
        <g>
          <rect
            class={getTaskStatusClass(task.data)}
            x={dir === 'ltr' ? 0 : -task.content.width}
            y={0}
            width={task.content.width}
            height={task.content.height / 12}
          />
          <g transform={`translate(${translateX})`}>
            <text class="oj-typography-subheading-xs" dominantBaseline="middle" x={0} y={task.content.height / 4}>
              {task.itemData.label}
            </text>
            <text class="oj-typography-body-xs" dominantBaseline="middle" x={0} y={task.content.height / 2}>
              {`Status: ${getTaskStatus(task.data)}`}
            </text>
            <image class="demo-gantt-avatar" href={task.itemData.profile} x={0} y={(task.content.height * 3) / 5} />
          </g>
        </g>
      </svg>
    );
  };

  const dependencyContentTemplateRenderer = (dep: DependencyContentTemplateContext) => {
    return (
      <svg>
        <path class="demo-gantt-dep-line" d={getDepPath(dep.content)} strokeWidth={dep.state.focused ? 3 : 1} />
      </svg>
    );
  };

  const tooltipTemplateRenderer = (tooltip: TooltipTemplateContext) => {
    return (
      <div class="oj-flex oj-sm-flex-direction-column">
        <span>{`Assignee: ${tooltip.itemData.assignee}`}</span>
        <span>{`Start: ${dateConverter.format(tooltip.data.start)}`}</span>
        <span>{`End: ${dateConverter.format(tooltip.data.end)}`}</span>
      </div>
    );
  };

  const gridlines: GanttProps['gridlines'] = { vertical: 'visible' };
  const rowAxis: GanttProps['rowAxis'] = { rendered: 'on' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'months',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'weeks',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const taskDefaults: GanttProps['taskDefaults'] = {
    height: 80,
    borderRadius: '5',
    labelPosition: 'none'
  };
  const valueFormats: GanttProps['valueFormats'] = {
    progress: { tooltipDisplay: 'off' }
  };
  const ganttProps: Partial<GanttProps> = {
    gridlines,
    rowAxis,
    majorAxis,
    minorAxis,
    taskDefaults,
    valueFormats
  };

  return (
    <div id="container">
      <svg height="0" width="0">
        <defs>
          <marker
            id="demoCircleMarker"
            viewBox="0 0 12 12"
            refX="6"
            refY="6"
            markerWidth="12"
            markerHeight="12"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <circle class="demo-circle-marker" cx="6" cy="6" r="5" />
          </marker>
          <marker
            id="demoArrowMarker"
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="12"
            markerHeight="12"
            orient="auto-start-reverse"
            markerUnits="userSpaceOnUse"
          >
            <path class="demo-arrow-marker" d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
      </svg>
      <oj-gantt
        start={projectStartDate}
        end={projectEndDate}
        selectionMode="single"
        rowData={rowDataProvider}
        dependencyData={dependenciesDataProvider}
        referenceObjects={referenceObjects}
        aria-label={`Gantt Chart. Current date is ${currentDate.toString()}`}
        class="demo-gantt"
        {...ganttProps}
      >
        <template slot="rowMappingTemplate" render={rowMappingTemplateRenderer} />
        <template slot="taskMappingTemplate" render={taskMappingTemplateRenderer} />
        <template slot="dependencyTemplate" render={dependencyTemplateRenderer} />
        <template slot="taskContentTemplate" render={taskContentTemplateRenderer} />
        <template slot="dependencyContentTemplate" render={dependencyContentTemplateRenderer} />
        <template slot="tooltipTemplate" render={tooltipTemplateRenderer} />
      </oj-gantt>
    </div>
  );
};

export default GanttTaskDepTemplates;
