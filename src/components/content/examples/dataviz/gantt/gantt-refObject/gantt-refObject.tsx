import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as taskDataText from 'text!../data/cookbook/dataVisualizations/gantt/refObject/taskData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import * as TimeUtils from 'ojs/ojtimeutils';
import 'ojs/ojgantt';
import 'css!./demo.css';

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttStart = NonNullable<GanttProps['start']>;
type GanttEnd = NonNullable<GanttProps['end']>;
type GanttReferenceObjects = NonNullable<GanttProps['referenceObjects']>;

type RefObjectTask = {
  id: string;
  rowId: string;
  start: string;
  end: string;
  label: string;
};

type RowTemplateContext = {
  id: string;
};

const taskData = JSON.parse(taskDataText as string) as RefObjectTask[];

export const GanttRefObject = () => {
  const tasksDataProvider = useMemo(
    () =>
      new ArrayDataProvider<RefObjectTask['id'], RefObjectTask>(taskData, {
        keyAttributes: 'id'
      }),
    []
  );
  const projectStartDate = useMemo<GanttStart>(() => new Date('Jan 1, 2016').toISOString(), []);
  const projectEndDate = useMemo<GanttEnd>(() => new Date('Dec 31, 2016').toISOString(), []);
  const dateConverter = useMemo(
    () =>
      new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'long'
      }),
    []
  );
  const currentDate = useMemo(() => new Date('Jan 12, 2016').toISOString(), []);
  const currentDateFormatted = dateConverter.format(currentDate) ?? '';
  const weeksConverter = useMemo(
    () =>
      new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'long'
      }),
    []
  );
  const daysConverter = useMemo(() => new IntlDateTimeConverter({ weekday: 'narrow' }), []);
  const weekends = TimeUtils.getWeekendReferenceObjects(projectStartDate, projectEndDate) as GanttReferenceObjects;
  const today = useMemo<GanttReferenceObjects>(
    () => [
      {
        value: currentDate,
        shortDesc: `Current Date: ${currentDateFormatted}`
      }
    ],
    [currentDate, currentDateFormatted]
  );
  const timeBuckets = useMemo<GanttReferenceObjects>(
    () => [
      {
        type: 'area',
        start: new Date('Jan 14, 2016').toISOString(),
        end: new Date('Jan 15, 2016').toISOString(),
        svgStyle: { fill: '#32925e', opacity: '0.08' },
        shortDesc: 'Time Bucket 1'
      },
      {
        type: 'area',
        start: new Date('Jan 26, 2016').toISOString(),
        end: new Date('Jan 28, 2016').toISOString(),
        svgStyle: { fill: '#eb9632', opacity: '0.08' },
        shortDesc: 'Time Bucket 2'
      }
    ],
    []
  );
  const referenceObjects = useMemo<GanttReferenceObjects>(
    () => [...weekends, ...today, ...timeBuckets],
    [timeBuckets, today, weekends]
  );
  const gridlines: GanttProps['gridlines'] = { horizontal: 'visible', vertical: 'visible' };
  const rowAxis: GanttProps['rowAxis'] = { rendered: 'on' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'weeks',
    zoomOrder: ['weeks', 'days'],
    converter: { weeks: weeksConverter, days: daysConverter }
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'days',
    zoomOrder: ['weeks', 'days'],
    converter: { weeks: weeksConverter, days: daysConverter }
  };
  const taskDefaults: GanttProps['taskDefaults'] = { labelPosition: 'none' };
  const ganttProps: Partial<GanttProps> = {
    gridlines,
    rowAxis,
    majorAxis,
    minorAxis,
    taskDefaults
  };

  const rowTemplateRenderer = (row: RowTemplateContext) => {
    return <oj-gantt-row label={row.id} />;
  };

  return (
    <oj-gantt
      id="gantt"
      start={projectStartDate}
      end={projectEndDate}
      selectionMode="single"
      referenceObjects={referenceObjects}
      taskData={tasksDataProvider}
      aria-label={`Gantt Chart. Current date is ${currentDateFormatted}`}
      class="demo-gantt"
      {...ganttProps}
    >
      <template slot="rowTemplate" render={rowTemplateRenderer} />
    </oj-gantt>
  );
};

export default GanttRefObject;
