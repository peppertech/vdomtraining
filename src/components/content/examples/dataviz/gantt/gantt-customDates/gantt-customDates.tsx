import 'css!./demo.css';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojgantt';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as rowDataText from 'text!../data/cookbook/dataVisualizations/gantt/customDates/rowData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttStart = NonNullable<GanttProps['start']>;
type GanttEnd = NonNullable<GanttProps['end']>;
type FiscalPeriodScale = {
  name: string;
  labelPosition: 'center';
  formatter: (date: string) => string;
  getNextDate: (date: string) => string;
  getPreviousDate: (date: string) => string;
};

type CustomDateTask = {
  id: string;
  name?: string;
  start: string;
  end: string;
};

type CustomDateRow = {
  id: string;
  tasks: CustomDateTask[];
};

type RowMappingTemplateContext = {
  data: CustomDateRow;
};

const rowData = JSON.parse(rowDataText as string) as CustomDateRow[];

export const GanttCustomDates = () => {
  const projectStartDate = useMemo<GanttStart>(
    () => new Date('2021-02-07T00:00:00.000Z').toISOString(),
    []
  );
  const projectEndDate = useMemo<GanttEnd>(
    () => new Date('2021-12-31T00:00:00.000Z').toISOString(),
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<CustomDateRow['id'], CustomDateRow>(rowData, {
        keyAttributes: 'id'
      }),
    []
  );
  const dayConverter = useMemo(
    () =>
      new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'long'
      }),
    []
  );
  const fiscalPeriodScale = useMemo<FiscalPeriodScale>(
    () => ({
      name: 'fiscalPeriod',
      labelPosition: 'center',
      formatter: (date: string) => {
        const current = new Date(date);
        const year = current.getUTCFullYear();
        const startOfYear = Date.UTC(year, 0, 1);
        const offset = current.getTime() - startOfYear;
        const period = Math.floor(offset / (28 * 24 * 60 * 60 * 1000)) + 1;
        return `FY${year} P${period}`;
      },
      getNextDate: (date: string) =>
        new Date(new Date(date).getTime() + 28 * 24 * 60 * 60 * 1000).toISOString(),
      getPreviousDate: (date: string) => {
        const current = new Date(date);
        current.setUTCHours(0, 0, 0, 0);
        const startOfYear = new Date(Date.UTC(current.getUTCFullYear(), 0, 1));
        const diff = current.getTime() - startOfYear.getTime();
        const periodStart =
          startOfYear.getTime() +
          Math.floor(diff / (28 * 24 * 60 * 60 * 1000)) * 28 * 24 * 60 * 60 * 1000;
        return new Date(periodStart).toISOString();
      }
    }),
    []
  );
  const gridlines: GanttProps['gridlines'] = { vertical: 'visible' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: fiscalPeriodScale,
    zoomOrder: [fiscalPeriodScale, 'months', 'weeks']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'weeks',
    converter: { days: dayConverter }
  };
  const ganttProps: Partial<GanttProps> = { gridlines, majorAxis, minorAxis };

  const rowMappingTemplateRenderer = (row: RowMappingTemplateContext) => {
    return <oj-gantt-row label={row.data.tasks[0]?.name ?? row.data.id} tasks={row.data.tasks} />;
  };

  return (
    <oj-gantt
      id="gantt"
      aria-label="Custom Dates"
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

export default GanttCustomDates;
