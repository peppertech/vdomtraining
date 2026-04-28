import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import * as data from 'text!../data/cookbook/dataVisualizations/gantt/customBars/taskData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojgantt';
import 'css!./demo.css';

type GanttProps = ComponentProps<'oj-gantt'>;
type ScreenRange = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

type TaskItem = {
  id?: string;
  begin: string;
  finish: string;
  name: string;
  labelPosition?: ComponentProps<'oj-gantt-task'>['labelPosition'];
};

const resolveScreenRange = (): ScreenRange => {
  const width = window.innerWidth;
  if (width < 600) {
    return 'sm';
  }
  if (width < 1024) {
    return 'md';
  }
  if (width < 1440) {
    return 'lg';
  }
  if (width < 1920) {
    return 'xl';
  }
  return 'xxl';
};

const taskData = JSON.parse(data as string) as TaskItem[];

export const GanttControls = () => {
  const [screenRange, setScreenRange] = useState<ScreenRange>(() => resolveScreenRange());

  useEffect(() => {
    const onResize = () => setScreenRange(resolveScreenRange());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(taskData, {
        keyAttributes: 'id'
      }),
    []
  );

  const taskTemplateRenderer = (task: { data: TaskItem }) => (
    <oj-gantt-task
      start={task.data.begin}
      end={task.data.finish}
      label={task.data.name}
      labelPosition={task.data.labelPosition ?? 'end'}
    />
  );

  const gridlines: GanttProps['gridlines'] = { horizontal: 'visible', vertical: 'visible' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'months',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'weeks',
    zoomOrder: ['quarters', 'months', 'weeks', 'days']
  };
  const ganttProps: Partial<GanttProps> = { gridlines, majorAxis, minorAxis };

  return (
    <div id="gantt-container">
      <p>
        Currently in <b class="oj-typography-subheading-sm">{screenRange}</b> screen range.
      </p>
      <oj-gantt
        id="gantt"
        aria-label="Responsive Gantt Demo"
        start="2016-01-01T05:00:00.000Z"
        end="2016-12-31T05:00:00.000Z"
        viewportStart="2016-01-31T05:00:00.000Z"
        viewportEnd="2016-03-27T04:00:00.000Z"
        selectionMode="single"
        taskData={dataProvider}
        class="demo-gantt"
        {...ganttProps}
      >
        <template slot="taskTemplate" render={taskTemplateRenderer} />
      </oj-gantt>
    </div>
  );
};

export default GanttControls;
