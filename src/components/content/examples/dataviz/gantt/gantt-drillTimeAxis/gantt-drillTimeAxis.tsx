import 'css!./demo.css';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojgantt';
import * as TimeUtils from 'ojs/ojtimeutils';
import 'preact';
import type { ComponentProps } from 'preact';
import { useEffect,useMemo,useRef,useState } from 'preact/hooks';
import * as daysData from 'text!../data/cookbook/dataVisualizations/gantt/drillTimeAxis/rowDataDays.json';
import * as weeksData from 'text!../data/cookbook/dataVisualizations/gantt/drillTimeAxis/rowDataWeeks.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type GanttProps = ComponentProps<'oj-gantt'>;
type ScreenRange = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type AxisScale = 'weeks' | 'days' | 'hours';
type AxisDrillable = 'on' | 'off';

type ResourceScheduleTask = {
  id: string;
  begin: string;
  finish: string;
  name: string;
};

type ResourceSchedule = {
  resource: string;
  schedule: ResourceScheduleTask[];
};

type ScaleConfig = {
  majorAxis: {
    scale: AxisScale;
    drillable: AxisDrillable;
    converter?: {
      weeks: {
        format: (isoDate: string) => string;
        parse: (value: string) => string;
      };
    };
  };
  minorAxis: {
    scale: AxisScale;
    drillable: AxisDrillable;
  };
  viewportDuration: Record<ScreenRange, number>;
  dataProvider: ArrayDataProvider<string, ResourceSchedule>;
};

const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MS_IN_WEEK = 7 * MS_IN_DAY;

const resolveScreenRange = (): ScreenRange => {
  const width = innerWidth;
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

const weeklyRows = JSON.parse(weeksData as string) as ResourceSchedule[];
const dailyRows = JSON.parse(daysData as string) as ResourceSchedule[];

const projectStartDate = new Date('Jan 03, 2021');
const projectEndDate = new Date('Jan 31, 2021');
const projectStartTime = projectStartDate.getTime();
const projectEndTime = projectEndDate.getTime();

const weeksConfig: ScaleConfig = {
  majorAxis: {
    scale: 'weeks',
    drillable: 'off',
    converter: {
      weeks: {
        format: (isoDate: string) => {
          const weekNumber = (new Date(isoDate).getTime() - projectStartTime) / MS_IN_WEEK + 1;
          return `Week ${weekNumber}`;
        },
        parse: (value: string) => value
      }
    }
  },
  minorAxis: {
    scale: 'days',
    drillable: 'on'
  },
  viewportDuration: {
    sm: MS_IN_DAY * 2,
    md: MS_IN_DAY * 7,
    lg: MS_IN_DAY * 14,
    xl: MS_IN_DAY * 14,
    xxl: MS_IN_DAY * 14
  },
  dataProvider: new ArrayDataProvider(weeklyRows, {
    keyAttributes: 'resource'
  })
};

const daysConfig: ScaleConfig = {
  majorAxis: {
    scale: 'days',
    drillable: 'on'
  },
  minorAxis: {
    scale: 'hours',
    drillable: 'off'
  },
  viewportDuration: {
    sm: MS_IN_DAY * 0.125,
    md: MS_IN_DAY * 0.25,
    lg: MS_IN_DAY * 0.5,
    xl: MS_IN_DAY * 0.5,
    xxl: MS_IN_DAY * 0.5
  },
  dataProvider: new ArrayDataProvider(dailyRows, {
    keyAttributes: 'resource'
  })
};

const clamp = (time: number): number => Math.max(projectStartTime, Math.min(time, projectEndTime));

const computeViewport = (config: ScaleConfig, range: ScreenRange, startTime: number) => {
  const viewportDuration = config.viewportDuration[range];
  const viewportStartTime = clamp(Math.min(startTime, projectEndTime - viewportDuration));
  const viewportEndTime = clamp(viewportStartTime + viewportDuration);
  return {
    viewportStart: new Date(viewportStartTime).toISOString(),
    viewportEnd: new Date(viewportEndTime).toISOString()
  };
};

export const GanttDrillTimeAxis = () => {
  const liveRegionRef = useRef<HTMLDivElement | null>(null);
  const initialRange = resolveScreenRange();
  const initialViewport = computeViewport(weeksConfig, initialRange, projectStartTime);
  const [screenRange, setScreenRange] = useState<ScreenRange>(initialRange);
  const [scaleConfig, setScaleConfig] = useState<ScaleConfig>(weeksConfig);
  const [viewportStart, setViewportStart] = useState<string>(initialViewport.viewportStart);
  const [viewportEnd, setViewportEnd] = useState<string>(initialViewport.viewportEnd);
  const [currentViewportStartTime, setCurrentViewportStartTime] = useState<number>(projectStartTime);
  const dateConverter = useMemo(() => new IntlDateTimeConverter({ formatType: 'date' }), []);
  const dateTimeConverter = useMemo(
    () => new IntlDateTimeConverter({ formatType: 'datetime' }),
    []
  );

  const applyScaleConfig = (config: ScaleConfig, startTime: number, range: ScreenRange) => {
    const viewport = computeViewport(config, range, startTime);
    setScaleConfig(config);
    setViewportStart(viewport.viewportStart);
    setViewportEnd(viewport.viewportEnd);
  };

  const handleMinorAxisDrill = (event: CustomEvent<{ intervalStart: string }>) => {
    applyScaleConfig(daysConfig, new Date(event.detail.intervalStart).getTime(), screenRange);
  };

  const handleMajorAxisDrill = (event: CustomEvent<{ intervalStart: string }>) => {
    applyScaleConfig(weeksConfig, new Date(event.detail.intervalStart).getTime(), screenRange);
  };

  const handleViewportChange = (event: CustomEvent<{ viewportStart: string }>) => {
    setCurrentViewportStartTime(new Date(event.detail.viewportStart).getTime());
  };

  const handleWindowResize = () => {
    const range = resolveScreenRange();
    setScreenRange(range);
    applyScaleConfig(scaleConfig, currentViewportStartTime || projectStartTime, range);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [scaleConfig, currentViewportStartTime]);

  useEffect(() => {
    const liveRegion = liveRegionRef.current;
    if (!liveRegion) {
      return;
    }
    if (scaleConfig.majorAxis.scale === 'weeks') {
      liveRegion.textContent = `Showing weekly schedules starting on ${dateConverter.format(viewportStart)}`;
      return;
    }
    liveRegion.textContent = `Showing daily schedules starting on ${dateTimeConverter.format(viewportStart)}`;
  }, [dateConverter, dateTimeConverter, scaleConfig.majorAxis.scale, viewportStart]);

  const referenceObjects = TimeUtils.getWeekendReferenceObjects(
    new Date('Jan 01, 2021').toISOString(),
    projectEndDate.toISOString()
  );

  const rowMappingTemplateRenderer = (row: { data: ResourceSchedule }) => (
    <oj-gantt-row tasks={row.data.schedule} label={row.data.resource} />
  );

  const taskMappingTemplateRenderer = (task: { data: ResourceScheduleTask }) => (
    <oj-gantt-task
      taskId={task.data.id}
      start={task.data.begin}
      end={task.data.finish}
      label={task.data.name}
    />
  );

  const gridlines: GanttProps['gridlines'] = { vertical: 'visible', horizontal: 'visible' };
  const rowAxis: GanttProps['rowAxis'] = { rendered: 'on' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: scaleConfig.majorAxis.scale,
    drillable: scaleConfig.majorAxis.drillable,
    converter: scaleConfig.majorAxis.converter,
    zoomOrder: ['weeks', 'days', 'hours']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: scaleConfig.minorAxis.scale,
    drillable: scaleConfig.minorAxis.drillable,
    zoomOrder: ['weeks', 'days', 'hours']
  };
  const taskDefaults: GanttProps['taskDefaults'] = { labelPosition: 'innerCenter' };
  const ganttProps: Partial<GanttProps> = {
    gridlines,
    rowAxis,
    majorAxis,
    minorAxis,
    taskDefaults
  };

  return (
    <div id="container">
      <oj-gantt
        start={projectStartDate.toISOString()}
        end={projectEndDate.toISOString()}
        referenceObjects={referenceObjects}
        viewportStart={viewportStart}
        viewportEnd={viewportEnd}
        zooming="off"
        rowData={scaleConfig.dataProvider}
        aria-label="Employee Schedule"
        class="demo-gantt"
        onojMajorAxisDrill={handleMajorAxisDrill}
        onojMinorAxisDrill={handleMinorAxisDrill}
        onojViewportChange={handleViewportChange}
        {...ganttProps}
      >
        <template slot="rowMappingTemplate" render={rowMappingTemplateRenderer} />
        <template slot="taskMappingTemplate" render={taskMappingTemplateRenderer} />
      </oj-gantt>
      <div ref={liveRegionRef} id="timeAxisDrillInfo" aria-live="polite" class="oj-helper-hidden-accessible"></div>
    </div>
  );
};

export default GanttDrillTimeAxis;
