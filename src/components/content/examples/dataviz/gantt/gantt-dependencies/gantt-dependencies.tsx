import 'css!./demo.css';
import 'ojs/ojgantt';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as depDataText from 'text!../data/cookbook/dataVisualizations/gantt/dependencies/depData.json';
import * as rowDataText from 'text!../data/cookbook/dataVisualizations/gantt/dependencies/rowData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type GanttProps = ComponentProps<'oj-gantt'>;

type DependencyTask = {
  id: string;
  begin: string;
  finish: string;
  name: string;
  labelPosition?: ComponentProps<'oj-gantt-task'>['labelPosition'];
  status?: string;
};

type DependencyRow = {
  id: string;
  tasks: DependencyTask[];
};

type DependencyLine = {
  id: string;
  predecessor: string;
  successor: string;
  relation?: ComponentProps<'oj-gantt-dependency'>['type'];
  status?: string;
};

type TaskTemplateContext = {
  data: DependencyTask;
};

type DependencyTemplateContext = {
  data: DependencyLine;
};

const rowData = JSON.parse(rowDataText as string) as DependencyRow[];
const depData = JSON.parse(depDataText as string) as DependencyLine[];

export const GanttDependencies = () => {
  const rowDataProvider = useMemo(
    () =>
      new ArrayDataProvider<DependencyRow['id'], DependencyRow>(rowData, {
        keyAttributes: 'id'
      }),
    []
  );
  const dependencyDataProvider = useMemo(
    () =>
      new ArrayDataProvider<DependencyLine['id'], DependencyLine>(depData, {
        keyAttributes: 'id'
      }),
    []
  );
  const projectStartDate = useMemo(() => new Date('Jan 1, 2021').toISOString(), []);
  const projectEndDate = useMemo(() => new Date('May 15, 2021').toISOString(), []);
  const gridlines: GanttProps['gridlines'] = { vertical: 'visible' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'months',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'weeks',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const ganttProps: Partial<GanttProps> = { gridlines, majorAxis, minorAxis };

  const taskMappingTemplateRenderer = (task: TaskTemplateContext) => {
    return (
      <oj-gantt-task
        taskId={task.data.id}
        start={task.data.begin}
        end={task.data.finish}
        label={task.data.name}
        labelPosition={task.data.labelPosition}
        svgClassName={task.data.status === 'critical' ? 'demo-critical-taskbar' : ''}
      />
    );
  };

  const dependencyTemplateRenderer = (dependency: DependencyTemplateContext) => {
    return (
      <oj-gantt-dependency
        predecessorTaskId={dependency.data.predecessor}
        successorTaskId={dependency.data.successor}
        type={dependency.data.relation}
        svgClassName={dependency.data.status === 'critical' ? 'demo-critical-connector' : ''}
      />
    );
  };

  return (
    <>
      <div class="demo-gantt-no-height-div">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <marker
              id="demoCriticalMarker"
              markerUnits="userSpaceOnUse"
              viewBox="0 0 8 14"
              refX="8"
              refY="7"
              markerWidth="8"
              markerHeight="14"
              orient="auto"
            >
              <path class="demo-critical-marker-path" d="M0,0L8,7,0,14" strokeWidth="2px" fill="none" />
            </marker>
          </defs>
        </svg>
      </div>
      <oj-gantt
        id="gantt"
        aria-label="Gantt With Dependencies"
        start={projectStartDate}
        end={projectEndDate}
        rowData={rowDataProvider}
        dependencyData={dependencyDataProvider}
        class="demo-gantt"
        {...ganttProps}
      >
        <template slot="taskMappingTemplate" render={taskMappingTemplateRenderer} />
        <template slot="dependencyTemplate" render={dependencyTemplateRenderer} />
      </oj-gantt>
    </>
  );
};

export default GanttDependencies;
