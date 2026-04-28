import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as rowDataText from 'text!../data/cookbook/dataVisualizations/gantt/drill/rowData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojgantt';
import 'css!./demo.css';

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttStart = NonNullable<GanttProps['start']>;
type GanttEnd = NonNullable<GanttProps['end']>;

type Task = {
  id: string;
  label?: string;
  name?: string;
  start: string;
  end: string;
};

type Row = {
  id: string;
  tasks: Task[];
  subTasks?: Row[];
};

type Crumb = {
  id: string;
  label: string;
  rows: Row[];
};

type RowMappingTemplateContext = {
  data: Row;
};

const rowData = JSON.parse(rowDataText as string) as Row[];

export const GanttDrill = () => {
  const data = rowData;
  const homeCrumb = useMemo<Crumb>(
    () => ({
      id: 'root',
      label: 'Home',
      rows: data
    }),
    [data]
  );
  const [breadcrumbs, setBreadcrumbs] = useState<Crumb[]>([homeCrumb]);
  const currentRows = breadcrumbs[breadcrumbs.length - 1]?.rows ?? data;
  const projectStartDate = useMemo<GanttStart>(
    () => new Date('2016-01-01T00:00:00.000Z').toISOString(),
    []
  );
  const projectEndDate = useMemo<GanttEnd>(
    () => new Date('2016-12-31T00:00:00.000Z').toISOString(),
    []
  );
  const rowDataProvider = useMemo(
    () =>
      new ArrayDataProvider<Row['id'], Row>(currentRows, {
        keyAttributes: 'id'
      }),
    [currentRows]
  );
  const gridlines: GanttProps['gridlines'] = { vertical: 'visible' };
  const rowAxis: GanttProps['rowAxis'] = { rendered: 'on', width: '188px' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'months',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'weeks',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const ganttProps: Partial<GanttProps> = { gridlines, rowAxis, majorAxis, minorAxis };

  const handleDrill = (row: Row) => {
    if (!row.subTasks?.length) {
      return;
    }
    setBreadcrumbs((prev) => [
      ...prev,
      {
        id: row.id,
        label: row.tasks[0]?.label ?? row.id,
        rows: row.subTasks ?? []
      }
    ]);
  };

  const handleBreadcrumb = (crumbId: string) => {
    if (crumbId === 'root') {
      setBreadcrumbs([homeCrumb]);
      return;
    }
    const crumbIndex = breadcrumbs.findIndex((crumb) => crumb.id === crumbId);
    if (crumbIndex >= 0) {
      setBreadcrumbs(breadcrumbs.slice(0, crumbIndex + 1));
    }
  };

  const rowMappingTemplateRenderer = (row: RowMappingTemplateContext) => {
    return (
      <oj-gantt-row
        label={row.data.tasks[0]?.label ?? row.data.id}
        labelStyle={row.data.subTasks?.length ? { fontWeight: 'bold' } : {}}
        tasks={row.data.tasks}
      />
    );
  };

  return (
    <div id="container" class="oj-flex oj-sm-flex-direction-column oj-sm-flex-wrap-nowrap">
      <div id="breadcrumbs" class="oj-flex oj-sm-flex-items-initial oj-sm-flex-wrap-wrap">
        {breadcrumbs.map((crumb, index) => (
          <div class="oj-flex oj-sm-align-items-center" key={crumb.id}>
            {index > 0 && <span class="oj-sm-padding-2x-horizontal">&gt;</span>}
            {index < breadcrumbs.length - 1 ? (
              <button class="oj-button-link" type="button" onClick={() => handleBreadcrumb(crumb.id)}>
                {crumb.label}
              </button>
            ) : (
              <span class="oj-flex-item oj-sm-padding-2x-horizontal">{crumb.label}</span>
            )}
          </div>
        ))}
      </div>
      <div class="oj-sm-margin-2x-vertical">
        {currentRows.filter((row) => row.subTasks?.length).map((row) => (
          <button class="oj-button-sm oj-sm-margin-2x-end" type="button" key={row.id} onClick={() => handleDrill(row)}>
            Drill into {row.tasks[0]?.label ?? row.id}
          </button>
        ))}
      </div>
      <oj-gantt
        id="gantt"
        start={projectStartDate}
        end={projectEndDate}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        aria-label="Gantt Breadcrumbs demo"
        rowData={rowDataProvider}
        class="demo-gantt"
        {...ganttProps}
      >
        <template slot="rowMappingTemplate" render={rowMappingTemplateRenderer} />
      </oj-gantt>
    </div>
  );
};

export default GanttDrill;
