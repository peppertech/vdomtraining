import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as rowDataText from 'text!../data/cookbook/dataVisualizations/gantt/shapedData/rowData.json';
import * as depDataText from 'text!../data/cookbook/dataVisualizations/gantt/shapedData/depData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojgantt';
import 'css!./demo.css';

type GanttProps = ComponentProps<'oj-gantt'>;

type ShapedRow = {
  id: string;
  label?: string;
  tasks: Array<Record<string, unknown>>;
};

type ShapedDependency = {
  id: string;
  predecessor: string;
  successor: string;
};

const rowData = JSON.parse(rowDataText as string) as ShapedRow[];
const depData = JSON.parse(depDataText as string) as ShapedDependency[];

export const GanttShapedData = () => {
  const rowDataProvider = useMemo(
    () =>
      new ArrayDataProvider<ShapedRow['id'], ShapedRow>(rowData, {
        keyAttributes: 'id'
      }),
    []
  );
  const dependenciesDataProvider = useMemo(
    () =>
      new ArrayDataProvider<ShapedDependency['id'], ShapedDependency>(depData, {
        keyAttributes: 'id'
      }),
    []
  );
  const projectStartDate = useMemo(() => new Date('Jan 1, 2016').toISOString(), []);
  const projectEndDate = useMemo(() => new Date('Dec 31, 2016').toISOString(), []);
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
  const ganttProps: Partial<GanttProps> = { gridlines, rowAxis, majorAxis, minorAxis };

  return (
    <oj-gantt
      id="gantt"
      start={projectStartDate}
      end={projectEndDate}
      selectionMode="single"
      rowData={rowDataProvider}
      dependencyData={dependenciesDataProvider}
      class="demo-gantt"
      aria-label="Project Gantt"
      {...ganttProps}
    />
  );
};

export default GanttShapedData;
