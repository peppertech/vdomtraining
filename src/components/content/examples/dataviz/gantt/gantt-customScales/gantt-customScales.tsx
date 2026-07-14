import 'css!./demo.css';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojgantt';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as taskDataText from 'text!../data/cookbook/dataVisualizations/gantt/customScales/taskData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttStart = NonNullable<GanttProps['start']>;
type GanttEnd = NonNullable<GanttProps['end']>;
type CustomScale = {
  name: string;
  labelPosition: 'center';
  formatter: (date: string) => string;
  getNextDate: (date: string) => string;
  getPreviousDate: (date: string) => string;
};

type CustomScaleTask = {
  id: string;
  start: string;
  end: string;
  label?: string;
};

type CustomScaleRow = {
  id: string;
  label: string;
  tasks: CustomScaleTask[];
};

type RowMappingTemplateContext = {
  data: CustomScaleRow;
};

const taskData = JSON.parse(taskDataText as string) as CustomScaleTask[];

export const GanttCustomScales = () => {
  const hour = 60 * 60 * 1000;
  const converter = useMemo(
    () =>
      new IntlDateTimeConverter({
        hour: '2-digit',
        hour12: true
      }),
    []
  );
  const projectStartDate = useMemo<GanttStart>(
    () => new Date('2021-01-03T00:00:00.000Z').toISOString(),
    []
  );
  const projectEndDate = useMemo<GanttEnd>(
    () => new Date('2021-01-04T12:00:00.000Z').toISOString(),
    []
  );
  const rowData = useMemo<CustomScaleRow[]>(
    () => [
      {
        id: 'customScaleRow',
        label: 'Custom Scale Window',
        tasks: taskData
      }
    ],
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<CustomScaleRow['id'], CustomScaleRow>(rowData, {
        keyAttributes: 'id'
      }),
    [rowData]
  );
  const createHourScale = (hours: number): CustomScale => ({
    name: `${hours}hr`,
    labelPosition: 'center',
    formatter: (date: string) => converter.format(date) ?? '',
    getNextDate: (date: string) => new Date(new Date(date).getTime() + hours * hour).toISOString(),
    getPreviousDate: (date: string) => {
      const current = new Date(date);
      current.setMinutes(0, 0, 0);
      current.setHours(Math.floor(current.getHours() / hours) * hours);
      return current.toISOString();
    }
  });
  const custom6HrScale = useMemo(() => createHourScale(6), [converter]);
  const custom3HrScale = useMemo(() => createHourScale(3), [converter]);
  const gridlines: GanttProps['gridlines'] = { horizontal: 'visible', vertical: 'visible' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: custom6HrScale,
    zoomOrder: ['days', custom6HrScale, custom3HrScale, 'hours']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: custom3HrScale,
    zoomOrder: ['days', custom6HrScale, custom3HrScale, 'hours']
  };
  const ganttProps: Partial<GanttProps> = { gridlines, majorAxis, minorAxis };

  const rowMappingTemplateRenderer = (row: RowMappingTemplateContext) => {
    return <oj-gantt-row label={row.data.label} tasks={row.data.tasks} />;
  };

  return (
    <oj-gantt
      id="gantt"
      aria-label="Custom Scales"
      start={projectStartDate}
      end={projectEndDate}
      rowData={dataProvider}
      class="demo-gantt"
      {...ganttProps}
    >
      <template slot="rowMappingTemplate" render={rowMappingTemplateRenderer} />
    </oj-gantt>
  );
};

export default GanttCustomScales;
