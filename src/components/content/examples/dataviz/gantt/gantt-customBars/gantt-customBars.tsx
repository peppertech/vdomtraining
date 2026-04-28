import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/gantt/customBars/taskData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';
import 'ojs/ojgantt';
import 'css!./demo.css';

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttTaskProps = ComponentProps<'oj-gantt-task'>;

type CustomBarTask = {
  id: string;
  resource: string;
  begin: string;
  finish: string;
  name: string;
  type: string;
};

type RowTemplateContext = {
  id: string;
};

type TaskTemplateContext = {
  data: CustomBarTask;
};

const data = JSON.parse(dataText as string) as CustomBarTask[];

export const GanttCustomBars = () => {
  const projectStartDate = IntlConverterUtils.dateToLocalIso(new Date('2016-01-01T00:00:00'));
  const projectEndDate = IntlConverterUtils.dateToLocalIso(new Date('2016-01-02T00:00:00'));
  const viewportStart = projectStartDate;
  const viewportEnd = IntlConverterUtils.dateToLocalIso(new Date('2016-01-01T15:00:00'));
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<CustomBarTask['id'], CustomBarTask>(data, {
        keyAttributes: 'id'
      }),
    []
  );

  const getTaskHeight = (taskType: string): GanttTaskProps['height'] => {
    switch (taskType) {
      case 'hold1':
        return 3;
      case 'hold2':
        return 10;
      case 'calendar':
        return 16;
      default:
        return undefined;
    }
  };

  const getSvgClassName = (taskType: string) => {
    let svgClassName = 'demo-gantt-task';
    switch (taskType) {
      case 'hold1':
        svgClassName += ' demo-gantt-task-hold1';
        break;
      case 'hold2':
        svgClassName += ' demo-gantt-task-hold2';
        break;
      case 'calendar':
        svgClassName += ' demo-gantt-task-calendar';
        break;
    }
    return svgClassName;
  };

  const rowTemplateRenderer = (row: RowTemplateContext) => {
    return <oj-gantt-row label={row.id} />;
  };

  const taskTemplateRenderer = (task: TaskTemplateContext) => {
    const overlap: GanttTaskProps['overlap'] = {
      behavior: task.data.type === 'calendar' ? 'overlay' : 'stagger'
    };
    const taskProps: Partial<GanttTaskProps> = { overlap };

    return (
      <oj-gantt-task
        rowId={task.data.resource}
        start={IntlConverterUtils.dateToLocalIsoDateString(new Date(task.data.begin))}
        end={IntlConverterUtils.dateToLocalIsoDateString(new Date(task.data.finish))}
        label={task.data.name}
        height={getTaskHeight(task.data.type)}
        svgClassName={getSvgClassName(task.data.type)}
        {...taskProps}
      />
    );
  };

  const gridlines: GanttProps['gridlines'] = { horizontal: 'visible', vertical: 'visible' };
  const rowDefaults: GanttProps['rowDefaults'] = { height: 40 };
  const rowAxis: GanttProps['rowAxis'] = { rendered: 'on' };
  const majorAxis: GanttProps['majorAxis'] = { scale: 'days' };
  const minorAxis: GanttProps['minorAxis'] = { scale: 'hours' };
  const taskDefaults: GanttProps['taskDefaults'] = {
    overlap: { behavior: 'stagger', offset: 6 },
    labelPosition: 'innerCenter'
  };
  const ganttProps: Partial<GanttProps> = {
    gridlines,
    rowDefaults,
    rowAxis,
    majorAxis,
    minorAxis,
    taskDefaults
  };

  return (
    <oj-gantt
      id="gantt"
      aria-label="Customize Task Bars"
      start={projectStartDate}
      end={projectEndDate}
      viewportStart={viewportStart}
      viewportEnd={viewportEnd}
      selectionMode="single"
      taskData={dataProvider}
      class="demo-gantt"
      {...ganttProps}
    >
      <template slot="rowTemplate" render={rowTemplateRenderer} />
      <template slot="taskTemplate" render={taskTemplateRenderer} />
    </oj-gantt>
  );
};

export default GanttCustomBars;
