import 'css!./demo.css';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojgantt';
import 'ojs/ojgauge';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/gantt/tooltipTemplate/rowData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type GanttProps = ComponentProps<'oj-gantt'>;

type Task = {
  id: string;
  begin: string;
  finish: string;
  name: string;
  progressValue: number;
};

type RowData = {
  resource: string;
  tasks: Task[];
};

type RowMappingTemplateContext = {
  data: RowData;
};

type TaskMappingTemplateContext = {
  data: Task;
  rowData: {
    label: string;
  };
};

type TooltipTemplateContext = {
  rowData: {
    label: string;
  };
  data: {
    start: string;
    end: string;
  };
  itemData: Task;
  color: string;
};

const data = JSON.parse(dataText as string) as RowData[];

export const GanttTooltipTemplate = () => {
  const dateConverter = useMemo(
    () =>
      new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'long'
      }),
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<RowData['resource'], RowData>(data, {
        keyAttributes: 'resource'
      }),
    []
  );
  const projectStartDate = useMemo(() => new Date('Jan 3, 2021').toISOString(), []);
  const projectEndDate = useMemo(() => new Date('Jan 12, 2021').toISOString(), []);

  const getShortDesc = (task: Task, resource: string) => {
    const assignmentString = `Assigned to ${resource}`;
    const startTimeString = `Start Date is ${dateConverter.format(task.begin)}`;
    const endTimeString = `End Date is ${dateConverter.format(task.finish)}`;
    const progressString = `Progress is ${task.progressValue}`;
    return `${assignmentString}, ${startTimeString}, ${endTimeString}, ${progressString}`;
  };

  const getSvgClassName = (taskName: string) => {
    switch (taskName) {
      case 'Day Shift':
        return 'demo-dayshift-taskbar';
      case 'Night Shift':
        return 'demo-nightshift-taskbar';
      case 'Evening Shift':
        return 'demo-eveningshift-taskbar';
      default:
        return '';
    }
  };

  const rowMappingTemplateRenderer = (row: RowMappingTemplateContext) => {
    return <oj-gantt-row label={row.data.resource} tasks={row.data.tasks} />;
  };

  const taskMappingTemplateRenderer = (task: TaskMappingTemplateContext) => {
    return (
      <oj-gantt-task
        taskId={task.data.id}
        start={task.data.begin}
        end={task.data.finish}
        label={task.data.name}
        svgClassName={getSvgClassName(task.data.name)}
        shortDesc={getShortDesc(task.data, task.rowData.label)}
      />
    );
  };

  const tooltipTemplateRenderer = (tooltip: TooltipTemplateContext) => {
    return (
      <div>
        <div class="oj-sm-float-start">
          <span>
            <b>{`Assigned: ${tooltip.rowData.label}`}</b>
          </span>
          <br />
          <span>{`Start Date: ${dateConverter.format(tooltip.data.start)}`}</span>
          <br />
          <span>{`End Date: ${dateConverter.format(tooltip.data.end)}`}</span>
        </div>
        <oj-status-meter-gauge
          id="gauge"
          min={0}
          max={100}
          value={tooltip.itemData.progressValue}
          orientation="circular"
          color={tooltip.color}
          readonly={true}
          class="oj-sm-float-end oj-sm-padding-2x-start demo-gantt-tooltip-gauge"
          aria-label="status meter gauge showing progress in tooltip"
        />
      </div>
    );
  };

  const rowAxis: GanttProps['rowAxis'] = { rendered: 'on' };
  const gridlines: GanttProps['gridlines'] = { vertical: 'visible' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'weeks',
    zoomOrder: ['months', 'weeks', 'days', 'hours']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'days',
    zoomOrder: ['weeks', 'days', 'hours', 'minutes']
  };
  const ganttProps: Partial<GanttProps> = { rowAxis, gridlines, majorAxis, minorAxis };

  return (
    <div id="gantt-container">
      <oj-gantt
        id="gantt"
        aria-label="Custom Tooltip Renderer"
        start={projectStartDate}
        end={projectEndDate}
        selectionMode="single"
        rowData={dataProvider}
        class="demo-gantt"
        {...ganttProps}
      >
        <template slot="rowMappingTemplate" render={rowMappingTemplateRenderer} />
        <template slot="taskMappingTemplate" render={taskMappingTemplateRenderer} />
        <template slot="tooltipTemplate" render={tooltipTemplateRenderer} />
      </oj-gantt>
    </div>
  );
};

export default GanttTooltipTemplate;
